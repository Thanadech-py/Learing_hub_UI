import { load as parseYaml } from 'js-yaml';

/**
 * Parses a raw Markdown document containing YAML frontmatter (`--- ... ---`)
 * into structured metadata (`frontmatter`) and Markdown body (`markdownBody`).
 */
export function parseMarkdownDoc(rawMarkdown) {
  if (!rawMarkdown || typeof rawMarkdown !== 'string') {
    return { frontmatter: {}, markdownBody: '' };
  }

  const trimmed = rawMarkdown.trimStart();
  const match = trimmed.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {}, markdownBody: rawMarkdown.trim() };
  }

  try {
    const frontmatter = parseYaml(match[1]) || {};
    const markdownBody = (match[2] || '').trim();
    return { frontmatter, markdownBody };
  } catch (err) {
    console.error('[Mini-DB Parser] Failed to parse YAML frontmatter:', err);
    return { frontmatter: {}, markdownBody: rawMarkdown.trim() };
  }
}
