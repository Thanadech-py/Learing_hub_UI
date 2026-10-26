/**
 * Dynamic Google Drive Folder Synchronization Service
 *
 * Automatically syncs subject folders and PDF handbooks from the Google Drive repository:
 * https://drive.google.com/drive/folders/1e1yRFC7MD98dXJmGUiiDjbOkMCwyGKLl
 *
 * Capabilities:
 * 1. Matches existing files in HANDBOOKS_CATALOG and updates their Google Drive File IDs, downloadUrl, previewUrl, and fileSize.
 * 2. Automatically discovers NEW subject folders (e.g. 'mathematics', 'robotics', 'chemistry') added on Google Drive
 *    and generates dynamic Subject Filter Tabs with icons, bilingual labels, and accent colors.
 * 3. Automatically discovers NEW PDF files uploaded into any subject folder (or its 'th' / 'en' subfolders),
 *    pairs Thai & English editions of the same volume into a single release block, extracts volume codes/titles/tags,
 *    and parses optional Google Drive file descriptions.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  HANDBOOKS_CATALOG,
  GOOGLE_DRIVE_ROOT_FOLDER_ID,
  isValidDriveId,
  toDriveDownloadUrl,
  toDrivePreviewUrl,
  hydrateHandbookEntry,
} from '../data/handbooksRegistry.js';

const STORAGE_CACHE_KEY = 'learning_hub_gdrive_sync_cache_v1';
const CACHE_MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Known subject metadata presets (used when existing or known subject folders appear on Drive).
 * Any completely new folder name on Drive will also be auto-formatted with a clean fallback icon & color.
 */
export const SUBJECT_METADATA_PRESETS = {
  physics: {
    id: 'physics',
    icon: '⚛️',
    labelEn: 'Physics',
    labelTh: 'ฟิสิกส์',
    accent: '#38bdf8',
    codePrefix: 'PHY',
  },
  'linear-algebra': {
    id: 'linear-algebra',
    icon: '📐',
    labelEn: 'Linear Algebra',
    labelTh: 'พีชคณิตเชิงเส้น',
    accent: '#a78bfa',
    codePrefix: 'LA',
  },
  'com-prog': {
    id: 'com-prog',
    icon: '💻',
    labelEn: 'Programming',
    labelTh: 'การเขียนโปรแกรม',
    accent: '#34d399',
    codePrefix: 'CP',
  },
  mathematics: {
    id: 'mathematics',
    icon: '∫',
    labelEn: 'Mathematics',
    labelTh: 'คณิตศาสตร์',
    accent: '#f59e0b',
    codePrefix: 'MATH',
  },
  chemistry: {
    id: 'chemistry',
    icon: '⚗️',
    labelEn: 'Chemistry',
    labelTh: 'เคมี',
    accent: '#f43f5e',
    codePrefix: 'CHEM',
  },
  electronics: {
    id: 'electronics',
    icon: '⚡',
    labelEn: 'Electronics & Circuits',
    labelTh: 'อิเล็กทรอนิกส์และวงจร',
    accent: '#eab308',
    codePrefix: 'ELEC',
  },
  robotics: {
    id: 'robotics',
    icon: '🤖',
    labelEn: 'Robotics & ROS',
    labelTh: 'หุ่นยนต์และระบบอัตโนมัติ',
    accent: '#ec4899',
    codePrefix: 'ROB',
  },
  microcontroller: {
    id: 'microcontroller',
    icon: '🎛️',
    labelEn: 'Microcontrollers',
    labelTh: 'ไมโครคอนโทรลเลอร์',
    accent: '#06b6d4',
    codePrefix: 'MCU',
  },
};

const DYNAMIC_ACCENT_PALETTE = ['#f59e0b', '#ec4899', '#06b6d4', '#f43f5e', '#84cc16', '#14b8a6', '#eab308'];

/**
 * Normalize a filename for fuzzy matching between Drive and local catalog entries.
 * Strips language suffixes like (TH), (EN), file extensions, and normalizes punctuation/spaces.
 */
export function normalizeHandbookKey(filename) {
  if (!filename) return '';
  return String(filename)
    .replace(/\.pdf$/i, '')
    .replace(/\(\s*(TH|EN|Thai|English|TH\/EN)\s*\)/gi, '')
    .replace(/[_\s-]+(TH|EN)$/i, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Format a slug like 'differential-equations' into 'Differential Equations'.
 */
export function formatSubjectSlug(slug) {
  if (!slug) return 'General';
  return String(slug)
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * Resolve subject metadata (icon, English/Thai title, accent color, code prefix)
 * for any folder discovered on Google Drive.
 * Also supports custom folder description syntax on Google Drive:
 *   "ชื่อภาษาไทย | English Name | 🧪 | #ff5500"
 */
export function resolveSubjectMeta(subjectId, folderObj = null, index = 0) {
  const cleanId = String(subjectId || 'general').toLowerCase().trim();
  const preset = SUBJECT_METADATA_PRESETS[cleanId];

  let customTh = null;
  let customEn = null;
  let customIcon = null;
  let customAccent = null;

  if (folderObj?.description) {
    const parts = folderObj.description.split('|').map((s) => s.trim()).filter(Boolean);
    if (parts[0]) customTh = parts[0];
    if (parts[1]) customEn = parts[1];
    if (parts[2]) customIcon = parts[2];
    if (parts[3] && /^#[0-9a-f]{3,8}$/i.test(parts[3])) customAccent = parts[3];
  }

  if (preset) {
    return {
      id: cleanId,
      icon: customIcon || preset.icon,
      labelEn: customEn || preset.labelEn,
      labelTh: customTh || preset.labelTh,
      accent: customAccent || preset.accent,
      codePrefix: preset.codePrefix,
    };
  }

  const defaultTitle = customEn || formatSubjectSlug(folderObj?.folderName || cleanId);
  const codePrefix = cleanId
    .split(/[-_\s]+/)
    .map((p) => p.slice(0, 2).toUpperCase())
    .join('')
    .slice(0, 4) || 'DOC';

  return {
    id: cleanId,
    icon: customIcon || '📁',
    labelEn: defaultTitle,
    labelTh: customTh || defaultTitle,
    accent: customAccent || DYNAMIC_ACCENT_PALETTE[index % DYNAMIC_ACCENT_PALETTE.length],
    codePrefix,
  };
}

/**
 * Parse optional metadata from a Google Drive file's Description field.
 * Supported lines/tokens in Drive File Description:
 *   titleTh: คณิตศาสตร์ เล่ม 1: แคลคูลัส
 *   code: MATH-01
 *   badge: Volume 01
 *   pages: 25
 *   topics: limits, derivatives
 *   #Calculus #Limits
 *   Any remaining text becomes the document synopsis/description!
 */
export function parseDriveFileDescription(rawDescription) {
  const result = {
    titleTh: null,
    titleEn: null,
    code: null,
    badge: null,
    badgeTh: null,
    pages: null,
    topicIds: [],
    tags: [],
    synopsisEn: '',
    synopsisTh: '',
  };

  if (!rawDescription || !rawDescription.trim()) return result;

  const lines = rawDescription.split(/\r?\n/);
  const freeTextLines = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const kvMatch = trimmed.match(/^([a-zA-Z_]+)\s*:\s*(.+)$/);
    if (kvMatch) {
      const key = kvMatch[1].toLowerCase();
      const val = kvMatch[2].trim();
      if (key === 'titleth' || key === 'title_th') {
        result.titleTh = val;
        return;
      }
      if (key === 'title' || key === 'titleen' || key === 'title_en') {
        result.titleEn = val;
        return;
      }
      if (key === 'code') {
        result.code = val.toUpperCase();
        return;
      }
      if (key === 'badge') {
        result.badge = val;
        return;
      }
      if (key === 'badgeth' || key === 'badge_th') {
        result.badgeTh = val;
        return;
      }
      if (key === 'pages' || key === 'page') {
        const num = parseInt(val, 10);
        if (!Number.isNaN(num)) result.pages = num;
        return;
      }
      if (key === 'topic' || key === 'topics' || key === 'topicids') {
        result.topicIds = val
          .split(/[,\s]+/)
          .map((t) => t.trim().toLowerCase())
          .filter(Boolean);
        return;
      }
    }

    // Extract #hashtags if present on the line
    const hashMatches = trimmed.match(/#([a-zA-Z0-9_-]+)/g);
    if (hashMatches && trimmed.startsWith('#')) {
      hashMatches.forEach((tag) => result.tags.push(tag.slice(1)));
      return;
    }

    freeTextLines.push(trimmed);
  });

  if (freeTextLines.length > 0) {
    const joined = freeTextLines.join(' ');
    result.synopsisEn = joined;
    result.synopsisTh = joined;
  }

  return result;
}

/**
 * Parse a PDF filename into structured handbook metadata when a new file is discovered on Google Drive.
 * Examples:
 *   "Mathematics - 01 Limits & Continuity.pdf" -> code: "MATH-01", badge: "Volume 01", cleanTitle: "Limits & Continuity"
 *   "C-Programming-Master-Handbook.pdf" -> code: "CP-DOC", badge: "Reference Guide", cleanTitle: "C Programming Master Handbook"
 */
export function parseHandbookFilename(filename, subjectMeta, index = 1) {
  const withoutExt = String(filename || 'Handbook.pdf')
    .replace(/\.pdf$/i, '')
    .replace(/\(\s*(TH|EN|Thai|English)\s*\)/gi, '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .trim();

  // Pattern 1: "<SubjectPrefix> - <VolNumber> <Title>" e.g. "Physics - 10 Electromagnetism"
  const volMatch = withoutExt.match(/^(?:[a-zA-Z\s-]+?-\s*)?(\d+(?:\.\d+)?)\s+(.+)$/);
  if (volMatch) {
    const volNum = volMatch[1];
    const rawTitle = volMatch[2].trim();
    const paddedVol = volNum.length === 1 ? `0${volNum}` : volNum;
    const code = `${subjectMeta.codePrefix}-${paddedVol}`;
    const badge = `Volume ${paddedVol}`;
    const badgeTh = `เล่มที่ ${paddedVol}`;
    const title = `${subjectMeta.labelEn} Volume ${volNum}: ${rawTitle} Handbook`;
    const titleTh = `${subjectMeta.labelTh} เล่ม ${volNum}: ${rawTitle}`;
    const autoTags = rawTitle
      .split(/[,&/-]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 2)
      .slice(0, 5);

    return {
      code,
      badge,
      badgeTh,
      title,
      titleTh,
      cleanTitle: rawTitle,
      tags: autoTags.length > 0 ? autoTags : [subjectMeta.labelEn, badge],
    };
  }

  // Pattern 2: General descriptive filename e.g. "Calculus-Master-Formula-Sheet.pdf"
  const readable = withoutExt.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  const paddedIdx = String(index).padStart(2, '0');
  const code = `${subjectMeta.codePrefix}-${paddedIdx}`;
  const autoTags = readable
    .split(/[,&/\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3 && !/^(handbook|master|guide|pdf)$/i.test(s))
    .slice(0, 5);

  return {
    code,
    badge: 'Reference Handbook',
    badgeTh: 'คู่มืออ้างอิง',
    title: `${subjectMeta.labelEn}: ${readable}`,
    titleTh: `${subjectMeta.labelTh}: ${readable}`,
    cleanTitle: readable,
    tags: autoTags.length > 0 ? autoTags : [subjectMeta.labelEn, 'Handbook'],
  };
}

/**
 * Merge the static HANDBOOKS_CATALOG with live files & subject folders fetched from Google Drive.
 */
export function mergeCatalogWithDriveData(drivePayload, baseCatalog = HANDBOOKS_CATALOG) {
  if (!drivePayload || !Array.isArray(drivePayload.files)) {
    return {
      catalog: baseCatalog,
      discoveredSubjects: [],
    };
  }

  const driveFiles = drivePayload.files;
  const driveSubjects = Array.isArray(drivePayload.subjects) ? drivePayload.subjects : [];

  // Clone base catalog entries so we can enrich them immutably
  const catalogById = new Map();
  const keyToCatalogId = new Map();

  baseCatalog.forEach((item) => {
    const cloned = {
      ...item,
      editions: {
        ...(item.editions?.th ? { th: { ...item.editions.th } } : {}),
        ...(item.editions?.en ? { en: { ...item.editions.en } } : {}),
      },
    };
    catalogById.set(item.id, cloned);

    // Index by subjectId + normalized filename for both main and language editions
    const baseKey = `${item.subjectId}::${normalizeHandbookKey(item.filename)}`;
    keyToCatalogId.set(baseKey, item.id);

    if (item.editions?.th?.filename) {
      keyToCatalogId.set(`${item.subjectId}::${normalizeHandbookKey(item.editions.th.filename)}`, item.id);
    }
    if (item.editions?.en?.filename) {
      keyToCatalogId.set(`${item.subjectId}::${normalizeHandbookKey(item.editions.en.filename)}`, item.id);
    }
  });

  // Group unmatched (newly uploaded) Drive files by subjectId + normalized filename
  // so TH and EN editions of the same new handbook merge into a single Download Block!
  const newGroups = new Map();

  driveFiles.forEach((df) => {
    if (!df || !isValidDriveId(df.id) || !df.name) return;
    const subjectId = String(df.subjectId || 'general').toLowerCase().trim();
    const normName = normalizeHandbookKey(df.name);
    const lookupKey = `${subjectId}::${normName}`;
    const lang = df.lang === 'th' ? 'th' : 'en';

    const matchedId = keyToCatalogId.get(lookupKey);
    if (matchedId && catalogById.has(matchedId)) {
      const existing = catalogById.get(matchedId);
      const existingEd = existing.editions?.[lang] || {};
      const parsedDesc = parseDriveFileDescription(df.description);

      existing.editions[lang] = {
        ...existingEd,
        lang,
        label: lang === 'th' ? 'ภาษาไทย (TH)' : 'English (EN)',
        shortLabel: lang.toUpperCase(),
        filename: df.name,
        driveId: df.id,
        downloadUrl: toDriveDownloadUrl(df.id),
        previewUrl: toDrivePreviewUrl(df.id),
        fileSize: df.fileSize || existingEd.fileSize || existing.fileSize || 'PDF',
        available: true,
        isGoogleDrive: true,
      };

      if (lang === 'en' || !existing.driveId) {
        existing.driveId = df.id;
        existing.downloadUrl = toDriveDownloadUrl(df.id);
        existing.previewUrl = toDrivePreviewUrl(df.id);
        if (df.fileSize) existing.fileSize = df.fileSize;
      }

      if (parsedDesc.pages) {
        existing.pages = { ...(existing.pages || {}), [lang]: parsedDesc.pages };
      }
      if (parsedDesc.topicIds.length > 0) {
        existing.topicIds = Array.from(new Set([...(existing.topicIds || []), ...parsedDesc.topicIds]));
      }
    } else {
      // Newly discovered file on Google Drive!
      if (!newGroups.has(lookupKey)) {
        newGroups.set(lookupKey, {
          subjectId,
          normName,
          primaryName: df.name,
          filesByLang: {},
          latestUpdated: df.updatedTime || df.createdTime || null,
        });
      }
      const group = newGroups.get(lookupKey);
      group.filesByLang[lang] = df;
    }
  });

  // Convert each newly discovered file group into a full Handbook Release Block
  const subjectCounters = {};
  newGroups.forEach((group, lookupKey) => {
    const { subjectId, primaryName, filesByLang } = group;
    subjectCounters[subjectId] = (subjectCounters[subjectId] || 0) + 1;

    const folderObj = driveSubjects.find((s) => s.id === subjectId) || null;
    const subjectMeta = resolveSubjectMeta(subjectId, folderObj, subjectCounters[subjectId]);
    const parsedName = parseHandbookFilename(primaryName, subjectMeta, subjectCounters[subjectId]);

    const thFile = filesByLang.th || null;
    const enFile = filesByLang.en || null;
    const primaryFile = enFile || thFile;

    const thDesc = parseDriveFileDescription(thFile?.description);
    const enDesc = parseDriveFileDescription(enFile?.description);

    const code = enDesc.code || thDesc.code || parsedName.code;
    const title = enDesc.titleEn || parsedName.title;
    const titleTh = thDesc.titleTh || enDesc.titleTh || parsedName.titleTh;
    const badge = enDesc.badge || parsedName.badge;
    const badgeTh = thDesc.badgeTh || enDesc.badgeTh || parsedName.badgeTh;

    const mergedTags = Array.from(
      new Set([...parsedName.tags, ...enDesc.tags, ...thDesc.tags])
    );
    const mergedTopics = Array.from(
      new Set([...enDesc.topicIds, ...thDesc.topicIds])
    );

    const editions = {};
    if (thFile) {
      editions.th = {
        lang: 'th',
        label: 'ภาษาไทย (TH)',
        shortLabel: 'TH',
        filename: thFile.name,
        driveId: thFile.id,
        downloadUrl: toDriveDownloadUrl(thFile.id),
        previewUrl: toDrivePreviewUrl(thFile.id),
        fileSize: thFile.fileSize || 'PDF',
        available: true,
        isGoogleDrive: true,
      };
    }
    if (enFile) {
      editions.en = {
        lang: 'en',
        label: 'English (EN)',
        shortLabel: 'EN',
        filename: enFile.name,
        driveId: enFile.id,
        downloadUrl: toDriveDownloadUrl(enFile.id),
        previewUrl: toDrivePreviewUrl(enFile.id),
        fileSize: enFile.fileSize || 'PDF',
        available: true,
        isGoogleDrive: true,
      };
    }

    const pages = {};
    if (thDesc.pages) pages.th = thDesc.pages;
    if (enDesc.pages) pages.en = enDesc.pages;

    const newEntry = hydrateHandbookEntry({
      id: `gdrive-${subjectId}-${ normSlug( lookupKey ) }`,
      code,
      title,
      titleTh,
      subjectId,
      subjectName: subjectMeta.labelEn,
      subjectNameTh: subjectMeta.labelTh,
      topicIds: mergedTopics,
      filename: primaryFile.name,
      driveId: primaryFile.id,
      downloadUrl: toDriveDownloadUrl(primaryFile.id),
      previewUrl: toDrivePreviewUrl(primaryFile.id),
      fileSize: primaryFile.fileSize || 'PDF',
      badge,
      badgeTh,
      series: 'core',
      isNew: true,
      isDynamicDriveEntry: true,
      pages: Object.keys(pages).length > 0 ? pages : undefined,
      author: 'Learning Hub Google Drive Repository',
      authorTh: 'คลังเอกสารออนไลน์ Learning Hub Google Drive',
      description:
        enDesc.synopsisEn ||
        `Official ${subjectMeta.labelEn} reference handbook (${parsedName.cleanTitle}) synchronized directly from the Learning Hub Google Drive repository.`,
      descriptionTh:
        thDesc.synopsisTh ||
        `เอกสารสรุปเนื้อหาและคู่มืออ้างอิงวิชา${subjectMeta.labelTh} (${parsedName.cleanTitle}) ซิงก์ข้อมูลโดยตรงจากคลัง Google Drive ของ Learning Hub`,
      tags: mergedTags,
      editions,
    });

    catalogById.set(newEntry.id, newEntry);
  });

  const mergedCatalog = Array.from(catalogById.values());

  // Build discovered subjects list (includes existing subjects + any new subject folders from Drive)
  const subjectIdsSet = new Set([
    'physics',
    'linear-algebra',
    'com-prog',
    ...driveSubjects.map((s) => s.id),
    ...mergedCatalog.map((h) => h.subjectId),
  ]);

  const discoveredSubjects = Array.from(subjectIdsSet).map((sid, idx) => {
    const folderObj = driveSubjects.find((s) => s.id === sid) || null;
    const meta = resolveSubjectMeta(sid, folderObj, idx);
    const count = mergedCatalog.filter((h) => h.subjectId === sid).length;
    return {
      ...meta,
      count,
      folderId: folderObj?.folderId || null,
    };
  }).filter((sub) => sub.count > 0 || driveSubjects.some((ds) => ds.id === sub.id));

  return {
    catalog: mergedCatalog,
    discoveredSubjects,
  };
}

function normSlug(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Parse Google Drive's public embedded folder HTML view (`embeddedfolderview?id=...#list`)
 * Used by the dev/proxy fallback scanner when VITE_GDRIVE_SYNC_URL is not configured.
 */
export function parseEmbeddedFolderHtml(html) {
  if (!html) return [];
  const entries = [];
  const entryRegex = /id="entry-([a-zA-Z0-9_-]+)"[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div>/g;
  let match;
  while ((match = entryRegex.exec(html)) !== null) {
    const id = match[1];
    const name = match[2]
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .trim();
    entries.push({ id, name });
  }
  return entries;
}

/**
 * Fetch live folder & file tree from Google Drive.
 * Priority:
 * 1. VITE_GDRIVE_SYNC_URL (Google Apps Script Web App JSON endpoint)
 * 2. Local Vite dev middleware endpoint `/__gdrive_sync` (zero-config automatic public folder scanner)
 */
export async function fetchGoogleDriveCatalog({ forceRefresh = false } = {}) {
  if (!forceRefresh) {
    try {
      const cachedRaw = sessionStorage.getItem(STORAGE_CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (cached && cached.timestamp && Date.now() - cached.timestamp < CACHE_MAX_AGE_MS) {
          return cached.payload;
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }

  const appsScriptUrl =
    typeof import.meta !== 'undefined' && import.meta.env?.VITE_GDRIVE_SYNC_URL
      ? import.meta.env.VITE_GDRIVE_SYNC_URL.trim()
      : '';

  let payload = null;

  // 1. Try configured Google Apps Script Web App URL
  if (appsScriptUrl) {
    const sep = appsScriptUrl.includes('?') ? '&' : '?';
    const targetUrl = forceRefresh ? `${appsScriptUrl}${sep}refresh=1` : appsScriptUrl;
    const response = await fetch(targetUrl, { method: 'GET', mode: 'cors' });
    if (response.ok) {
      const data = await response.json();
      if (data && data.ok && Array.isArray(data.files)) {
        payload = data;
      }
    }
  }

  // 2. Fallback: Try built-in zero-config dev scanner endpoint if available
  if (!payload) {
    try {
      const devUrl = forceRefresh ? `/__gdrive_sync?refresh=1` : `/__gdrive_sync`;
      const response = await fetch(devUrl);
      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (data && data.ok && Array.isArray(data.files)) {
            payload = data;
          }
        }
      }
    } catch {
      // Ignore if static host without dev middleware
    }
  }

  if (payload) {
    try {
      sessionStorage.setItem(
        STORAGE_CACHE_KEY,
        JSON.stringify({
          timestamp: Date.now(),
          payload,
        })
      );
    } catch {
      // Ignore storage write errors
    }
  }

  return payload;
}

/**
 * React Hook: useDynamicHandbooks()
 * Returns the live merged handbook catalog, discovered subject tabs, summary stats, and a manual sync trigger.
 */
export function useDynamicHandbooks() {
  const [state, setState] = useState(() => {
    const initialMerged = mergeCatalogWithDriveData(null, HANDBOOKS_CATALOG);
    return {
      catalog: initialMerged.catalog,
      discoveredSubjects: initialMerged.discoveredSubjects,
      isSyncing: false,
      lastSyncedAt: null,
      syncSource: 'built-in-gdrive-map',
      error: null,
    };
  });

  const syncNow = useCallback(async (forceRefresh = false) => {
    setState((prev) => ({ ...prev, isSyncing: true, error: null }));
    try {
      const payload = await fetchGoogleDriveCatalog({ forceRefresh });
      if (payload && Array.isArray(payload.files)) {
        const merged = mergeCatalogWithDriveData(payload, HANDBOOKS_CATALOG);
        setState({
          catalog: merged.catalog,
          discoveredSubjects: merged.discoveredSubjects,
          isSyncing: false,
          lastSyncedAt: payload.syncedAt || new Date().toISOString(),
          syncSource: 'live-gdrive-folder',
          error: null,
        });
      } else {
        setState((prev) => ({
          ...prev,
          isSyncing: false,
          lastSyncedAt: prev.lastSyncedAt || new Date().toISOString(),
        }));
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSyncing: false,
        error: err?.message || 'Sync error',
      }));
    }
  }, []);

  useEffect(() => {
    syncNow(false);
  }, [syncNow]);

  return {
    ...state,
    rootFolderId: GOOGLE_DRIVE_ROOT_FOLDER_ID,
    syncNow,
  };
}
