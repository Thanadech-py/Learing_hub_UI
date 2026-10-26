/**
 * ============================================================================
 * Learning Hub — Google Drive Dynamic Handbooks Folder API (Google Apps Script)
 * ============================================================================
 *
 * Security Architecture:
 * 1. Read-Only Scope: Uses strictly `DriveApp.getFolderById` / `getFolders` / `getFiles`.
 *    Zero write, modify, or delete methods are ever called.
 * 2. Locked Root Folder ID: `ROOT_FOLDER_ID` is hardcoded server-side. External callers
 *    cannot pass arbitrary folder IDs to inspect other folders in your Google Drive.
 * 3. Anti-Abuse Cooldown Rate Limiting: Protects your daily Apps Script quota against
 *    repeated `?refresh=1` requests by enforcing a minimum 60-second cooldown between
 *    live Drive scans.
 *
 * Recommended `appsscript.json` Manifest (Project Settings -> Show "appsscript.json"):
 * {
 *   "timeZone": "Asia/Bangkok",
 *   "dependencies": {},
 *   "exceptionLogging": "STACKDRIVER",
 *   "runtimeVersion": "V8",
 *   "oauthScopes": [
 *     "https://www.googleapis.com/auth/drive.readonly"
 *   ],
 *   "webapp": {
 *     "executeAs": "USER_DEPLOYING",
 *     "access": "ANYONE_ANONYMOUS"
 *   }
 * }
 * ============================================================================
 */

const ROOT_FOLDER_ID = '1e1yRFC7MD98dXJmGUiiDjbOkMCwyGKLl';
const CACHE_KEY = 'LEARNING_HUB_HANDBOOKS_TREE_V1';
const COOLDOWN_KEY = 'LEARNING_HUB_LAST_SCAN_TS_V1';
const CACHE_TTL_SECONDS = 300; // 5 minutes standard cache
const MIN_REFRESH_COOLDOWN_MS = 60 * 1000; // 60 seconds minimum cooldown against ?refresh=1 spam

function doGet(e) {
  try {
    const requestedRefresh =
      e && e.parameter && (e.parameter.refresh === '1' || e.parameter.refresh === 'true');
    const cache = CacheService.getScriptCache();
    const cached = cache.get(CACHE_KEY);
    const lastScanTs = Number(cache.get(COOLDOWN_KEY) || '0');
    const now = Date.now();

    // Serve from cache if:
    // 1. Normal request and cache exists, OR
    // 2. ?refresh=1 was requested, but a live scan already ran less than 60 seconds ago (Anti-Abuse Guard)
    if (cached && (!requestedRefresh || now - lastScanTs < MIN_REFRESH_COOLDOWN_MS)) {
      return ContentService.createTextOutput(cached).setMimeType(ContentService.MimeType.JSON);
    }

    const payload = scanHandbooksRootFolder(ROOT_FOLDER_ID);
    const jsonString = JSON.stringify(payload);

    try {
      cache.put(CACHE_KEY, jsonString, CACHE_TTL_SECONDS);
      cache.put(COOLDOWN_KEY, String(now), CACHE_TTL_SECONDS);
    } catch (cacheErr) {
      // Ignore cache size limits if catalog grows very large
    }

    return ContentService.createTextOutput(jsonString).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    const errorPayload = {
      ok: false,
      error: 'Unable to synchronize handbook catalog at this time.',
      timestamp: new Date().toISOString(),
    };
    return ContentService.createTextOutput(JSON.stringify(errorPayload)).setMimeType(ContentService.MimeType.JSON);
  }
}

function scanHandbooksRootFolder(rootFolderId) {
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  const subjects = [];
  const files = [];

  const subjectFolders = rootFolder.getFolders();
  while (subjectFolders.hasNext()) {
    const subjectFolder = subjectFolders.next();
    if (subjectFolder.isTrashed()) continue;

    const rawFolderName = subjectFolder.getName().trim();
    const subjectId = rawFolderName.toLowerCase().replace(/\s+/g, '-');
    const folderDesc = subjectFolder.getDescription() || '';

    subjects.push({
      id: subjectId,
      folderId: subjectFolder.getId(),
      folderName: rawFolderName,
      description: folderDesc,
      updatedTime: subjectFolder.getLastUpdated().toISOString(),
    });

    // 1. Scan PDF files placed directly inside the subject folder
    collectFilesInFolder(subjectFolder, subjectId, null, files);

    // 2. Scan language subfolders (e.g., 'th', 'en') or topic subfolders
    const subFolders = subjectFolder.getFolders();
    while (subFolders.hasNext()) {
      const subFolder = subFolders.next();
      if (subFolder.isTrashed()) continue;

      const subName = subFolder.getName().trim().toLowerCase();
      const detectedLang =
        subName === 'th' || subName === 'thai'
          ? 'th'
          : subName === 'en' || subName === 'english'
          ? 'en'
          : null;
      collectFilesInFolder(subFolder, subjectId, detectedLang, files);
    }
  }

  return {
    ok: true,
    rootFolderId: rootFolderId,
    syncedAt: new Date().toISOString(),
    subjects: subjects,
    files: files,
  };
}

function collectFilesInFolder(folder, subjectId, explicitLang, targetList) {
  const fileIter = folder.getFiles();
  while (fileIter.hasNext()) {
    const file = fileIter.next();
    if (file.isTrashed()) continue;

    const name = file.getName();
    const mime = file.getMimeType();
    if (!/\.pdf$/i.test(name) && mime !== 'application/pdf') {
      continue;
    }

    const sizeBytes = file.getSize();
    const fileId = file.getId();
    const lang = explicitLang || inferLangFromFilename(name);

    targetList.push({
      id: fileId,
      name: name,
      subjectId: subjectId,
      lang: lang,
      sizeBytes: sizeBytes,
      fileSize: formatBytes(sizeBytes),
      description: file.getDescription() || '',
      createdTime: file.getDateCreated().toISOString(),
      updatedTime: file.getLastUpdated().toISOString(),
      downloadUrl: 'https://drive.google.com/uc?export=download&id=' + fileId,
      previewUrl: 'https://drive.google.com/file/d/' + fileId + '/view',
    });
  }
}

function inferLangFromFilename(filename) {
  if (/\(\s*TH\s*\)|_TH\.pdf|-TH\.pdf|\bThai\b/i.test(filename)) {
    return 'th';
  }
  return 'en';
}

function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return '0 KB';
  const kb = bytes / 1024;
  if (kb < 1024) {
    return Math.max(1, Math.round(kb)) + ' KB';
  }
  const mb = kb / 1024;
  return mb.toFixed(1) + ' MB';
}
