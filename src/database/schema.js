/**
 * Normalizes a parsed Markdown + YAML frontmatter record into a unified topic
 * record compatible with TopicPage, EquationInspector, and MarkdownReader.
 */
export function normalizeDbRecord(frontmatter, markdownBody, meta) {
  const { subjectId, topicId, subTopicId, cleanPath } = meta;

  return {
    id: frontmatter.id || subTopicId || topicId,
    title: frontmatter.title || topicId,
    subtitle: frontmatter.subtitle || '',
    tag: frontmatter.tag || frontmatter.category || '',
    icon: frontmatter.icon || null,
    level: frontmatter.level || 'Intermediate',
    estimatedTime: frontmatter.estimatedTime || '25 min read + interactive lab',
    overview: Array.isArray(frontmatter.overview)
      ? frontmatter.overview
      : frontmatter.overview
      ? [frontmatter.overview]
      : [],
    equations: Array.isArray(frontmatter.equations) ? frontmatter.equations : [],
    keyConcepts: Array.isArray(frontmatter.keyConcepts) ? frontmatter.keyConcepts : [],
    interactiveGuide: frontmatter.interactiveGuide || '',
    interactiveLab: frontmatter.interactiveLab || { defaultMode: '2d', has3D: true },
    markdownBody: markdownBody || '',
    isMarkdownDbRecord: true,
    _dbMeta: {
      subjectId,
      topicId,
      subTopicId: subTopicId || null,
      path: cleanPath,
      sourceFile: `src/database/content/${cleanPath}.md`,
    },
  };
}
