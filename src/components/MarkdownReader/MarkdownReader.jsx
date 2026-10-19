import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './MarkdownReader.css';

const ALERT_TYPES = {
  '[!NOTE]': { label: 'Note', icon: 'ℹ️', className: 'md-alert--note' },
  '[!TIP]': { label: 'Engineering Tip', icon: '💡', className: 'md-alert--tip' },
  '[!IMPORTANT]': { label: 'Key Principle', icon: '⚡', className: 'md-alert--important' },
  '[!WARNING]': { label: 'Common Pitfall', icon: '⚠️', className: 'md-alert--warning' },
  '[!CAUTION]': { label: 'Critical Caution', icon: '🚨', className: 'md-alert--caution' },
};

export default function MarkdownReader({ content, sourceFile, onTryCodeInIDE }) {
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  if (!content) return null;

  const handleCopy = (codeText) => {
    navigator.clipboard?.writeText(codeText);
    setCopiedSnippet(codeText);
    setTimeout(() => setCopiedSnippet(null), 1800);
  };

  return (
    <article className="md-reader">
      {sourceFile && (
        <div className="md-reader__db-badge">
          <span className="md-reader__db-dot" aria-hidden="true" />
          <span className="md-reader__db-label">Mini-Database Record:</span>
          <code className="md-reader__db-path">{sourceFile}</code>
          <span className="md-reader__db-tag">YAML + Markdown</span>
        </div>
      )}

      <div className="md-reader__body">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            blockquote({ children }) {
              // Detect GitHub-style alert syntax: > [!NOTE] ...
              const childArray = Array.isArray(children) ? children : [children];
              let rawFirstText = '';
              try {
                const firstP = childArray.find((c) => c?.props?.children);
                if (firstP) {
                  const pChildren = Array.isArray(firstP.props.children)
                    ? firstP.props.children
                    : [firstP.props.children];
                  if (typeof pChildren[0] === 'string') {
                    rawFirstText = pChildren[0].trim();
                  }
                }
              } catch {
                // fallback to standard blockquote
              }

              const matchedKey = Object.keys(ALERT_TYPES).find((k) =>
                rawFirstText.startsWith(k)
              );

              if (matchedKey) {
                const alertMeta = ALERT_TYPES[matchedKey];
                return (
                  <div className={`md-alert ${alertMeta.className}`}>
                    <div className="md-alert__header">
                      <span aria-hidden="true">{alertMeta.icon}</span>
                      <strong>{alertMeta.label}</strong>
                    </div>
                    <div className="md-alert__content">{children}</div>
                  </div>
                );
              }

              return <blockquote className="md-blockquote">{children}</blockquote>;
            },

            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeString = String(children).replace(/\n$/, '');
              const isMultiLine = codeString.includes('\n') || Boolean(match);

              if (!inline && isMultiLine) {
                const lang = match ? match[1] : 'text';
                const isCopied = copiedSnippet === codeString;

                return (
                  <div className="md-codeblock">
                    <div className="md-codeblock__header">
                      <span className="md-codeblock__lang">{lang.toUpperCase()}</span>
                      <div className="md-codeblock__actions">
                        <button
                          type="button"
                          className="md-codeblock__btn"
                          onClick={() => handleCopy(codeString)}
                        >
                          {isCopied ? '✓ Copied' : '📋 Copy'}
                        </button>
                        {onTryCodeInIDE && (lang === 'c' || lang === 'python' || lang === 'py') && (
                          <button
                            type="button"
                            className="md-codeblock__btn md-codeblock__btn--try"
                            onClick={() => onTryCodeInIDE(codeString)}
                          >
                            Try in IDE ❯
                          </button>
                        )}
                      </div>
                    </div>
                    <pre className="md-codeblock__pre">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                );
              }

              return (
                <code className="md-inline-code" {...props}>
                  {children}
                </code>
              );
            },

            table({ children }) {
              return (
                <div className="md-table-wrapper">
                  <table className="md-table">{children}</table>
                </div>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
