import { parseMarkdownDoc } from './parser.js';
import { normalizeDbRecord } from './schema.js';

/**
 * File-based Mini-Database Client
 * Automatically indexes all `.md` files with YAML frontmatter inside `src/database/content/`.
 */
const rawDocModules =
  typeof import.meta !== 'undefined' && typeof import.meta.glob === 'function'
    ? import.meta.glob('./content/**/*.md', {
        query: '?raw',
        eager: true,
        import: 'default',
      })
    : {};

// Map of key (`subjectId/topicId` or `subjectId/topicId/subTopicId`) -> normalized record
const dbRecords = new Map();

for (const [filePath, rawText] of Object.entries(rawDocModules)) {
  const cleanPath = filePath.replace('./content/', '').replace(/\.md$/, '');
  const parts = cleanPath.split('/');
  const subjectId = parts[0];
  const topicId = parts[1];
  const rawSub = parts.length > 2 ? parts[2] : null;
  const subTopicId = rawSub === '_index' ? null : rawSub;

  const { frontmatter, markdownBody } = parseMarkdownDoc(rawText);
  const record = normalizeDbRecord(frontmatter, markdownBody, {
    subjectId,
    topicId,
    subTopicId,
    cleanPath,
  });

  const key = subTopicId ? `${subjectId}/${topicId}/${subTopicId}` : `${subjectId}/${topicId}`;
  dbRecords.set(key, record);
}

export const db = {
  /**
   * Retrieve a topic or sub-topic record directly from the Markdown/YAML mini-database.
   */
  getTopic(subjectId, topicId, subTopicId = null) {
    if (subTopicId) {
      return dbRecords.get(`${subjectId}/${topicId}/${subTopicId}`) || null;
    }
    return dbRecords.get(`${subjectId}/${topicId}`) || null;
  },

  /**
   * Enriches or overrides a topic object (and any of its subPages) with records
   * present in the Markdown/YAML mini-database.
   */
  resolveTopicWithDb(legacyTopic, subjectId, topicId) {
    const rootRecord = this.getTopic(subjectId, topicId, null);

    // Collect all sub-topic records under subjectId/topicId/*
    const subRecords = Array.from(dbRecords.values()).filter(
      (rec) => rec._dbMeta.subjectId === subjectId && rec._dbMeta.topicId === topicId && rec._dbMeta.subTopicId
    );

    if (!legacyTopic && !rootRecord && subRecords.length === 0) {
      return null;
    }

    // Start from legacy topic if available, overlaid with root markdown record if present
    const mergedTopic = legacyTopic
      ? {
          ...legacyTopic,
          ...(rootRecord
            ? {
                ...rootRecord,
                overview: legacyTopic.overview?.length ? legacyTopic.overview : rootRecord.overview,
                equations: legacyTopic.equations?.length ? legacyTopic.equations : rootRecord.equations,
                keyConcepts: legacyTopic.keyConcepts?.length
                  ? legacyTopic.keyConcepts
                  : rootRecord.keyConcepts,
                subPages: legacyTopic.subPages,
              }
            : {}),
        }
      : { ...rootRecord };

    // If topic has subPages, enrich each matching subPage with its Markdown/YAML record
    if (Array.isArray(mergedTopic.subPages) && mergedTopic.subPages.length > 0) {
      mergedTopic.subPages = mergedTopic.subPages.map((sp, idx) => {
        // First subPage may correspond to either _index or its own subPage id
        const subRec =
          this.getTopic(subjectId, topicId, sp.id) || (idx === 0 ? rootRecord : null);
        if (!subRec) return sp;

        return {
          ...sp,
          ...subRec,
          id: sp.id,
          icon: subRec.icon || sp.icon,
          tag: subRec.tag || sp.tag,
          overview: sp.overview?.length ? sp.overview : subRec.overview,
          equations: sp.equations?.length ? sp.equations : subRec.equations,
          keyConcepts: sp.keyConcepts?.length ? sp.keyConcepts : subRec.keyConcepts,
        };
      });
    }

    return mergedTopic;
  },

  /**
   * List all Markdown/YAML records for a given subject.
   */
  getAllForSubject(subjectId) {
    return Array.from(dbRecords.values()).filter((doc) => doc._dbMeta.subjectId === subjectId);
  },

  /**
   * Full-text search across all Markdown/YAML records in the mini-database.
   */
  search(query) {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase();
    return Array.from(dbRecords.values()).filter(
      (doc) =>
        doc.title?.toLowerCase().includes(q) ||
        doc.subtitle?.toLowerCase().includes(q) ||
        doc.markdownBody?.toLowerCase().includes(q)
    );
  },

  /**
   * Return summary statistics of the loaded Markdown/YAML mini-database.
   */
  getStats() {
    return {
      totalRecords: dbRecords.size,
      paths: Array.from(dbRecords.keys()),
    };
  },
};

export default db;
