import { useMemo } from 'react';
import katex from 'katex';
import './MathView.css';

/**
 * MathView renders mathematical expressions using KaTeX.
 *
 * @param {Object} props
 * @param {string} props.math - The LaTeX expression string
 * @param {boolean} [props.block=false] - Whether to render as display math (block) or inline
 * @param {string} [props.className] - Additional class name
 */
export default function MathView({ math = '', block = false, className = '' }) {
  const html = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      return `<code class="math-fallback">${math}</code>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`math-view math-view--block ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`math-view math-view--inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
