import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const ROOT_DRIVE_FOLDER_ID = '1e1yRFC7MD98dXJmGUiiDjbOkMCwyGKLl';

function parseEmbeddedEntries(html) {
  if (!html) return [];
  const entries = [];
  const regex = /id="entry-([a-zA-Z0-9_-]+)"[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    entries.push({
      id: match[1],
      name: match[2]
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .trim(),
    });
  }
  return entries;
}

async function fetchFolderEntries(folderId) {
  const url = `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(folderId)}#list`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const html = await res.text();
  return parseEmbeddedEntries(html);
}

/**
 * Vite plugin that provides a zero-config `/__gdrive_sync` endpoint during development/preview.
 * Scans the public Google Drive folder (1e1yRFC7MD98dXJmGUiiDjbOkMCwyGKLl) for subject folders
 * and PDF files so new folders/files on Google Drive appear dynamically right out of the box.
 */
function googleDriveSyncPlugin() {
  let cachedPayload = null;
  let cachedAt = 0;
  const TTL_MS = 60 * 1000;

  const handler = async (req, res, next) => {
    if (!req.url || !req.url.startsWith('/__gdrive_sync')) {
      return next();
    }

    try {
      const isForce = req.url.includes('refresh=1');
      if (!isForce && cachedPayload && Date.now() - cachedAt < TTL_MS) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(cachedPayload));
        return;
      }

      const rootEntries = await fetchFolderEntries(ROOT_DRIVE_FOLDER_ID);
      const subjects = [];
      const files = [];

      await Promise.all(
        rootEntries.map(async (sub) => {
          if (/\.pdf$/i.test(sub.name)) return;
          const subjectId = sub.name.toLowerCase().replace(/\s+/g, '-');
          subjects.push({
            id: subjectId,
            folderId: sub.id,
            folderName: sub.name,
            description: '',
          });

          const childEntries = await fetchFolderEntries(sub.id);
          await Promise.all(
            childEntries.map(async (child) => {
              if (/\.pdf$/i.test(child.name)) {
                const lang = /\(\s*TH\s*\)|_TH\.pdf|-TH\.pdf/i.test(child.name) ? 'th' : 'en';
                files.push({
                  id: child.id,
                  name: child.name,
                  subjectId,
                  lang,
                });
              } else {
                const subName = child.name.toLowerCase().trim();
                const detectedLang = subName === 'th' || subName === 'thai' ? 'th' : 'en';
                const langFiles = await fetchFolderEntries(child.id);
                langFiles.forEach((lf) => {
                  if (/\.pdf$/i.test(lf.name)) {
                    files.push({
                      id: lf.id,
                      name: lf.name,
                      subjectId,
                      lang: detectedLang,
                    });
                  }
                });
              }
            })
          );
        })
      );

      cachedPayload = {
        ok: true,
        rootFolderId: ROOT_DRIVE_FOLDER_ID,
        syncedAt: new Date().toISOString(),
        subjects,
        files,
      };
      cachedAt = Date.now();

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(cachedPayload));
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ ok: false, error: err?.message || 'Drive scan error' }));
    }
  };

  return {
    name: 'learning-hub-gdrive-sync',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [react(), googleDriveSyncPlugin()],
  base: './',
  server: {
    // Listen on all interfaces (IPv4 + IPv6) so http://localhost, http://127.0.0.1,
    // and access from WSL/VM/remote hosts all work.
    host: true,
    port: 5173,
  },
});
