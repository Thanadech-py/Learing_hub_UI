import { useMemo, useState, useRef, useLayoutEffect } from 'react';
import katex from 'katex';
import EquationModal from './EquationModal.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './MathView.css';

/**
 * MathView renders mathematical expressions using KaTeX with intelligent auto-fit
 * and full-screen expandable inspection support.
 *
 * @param {Object} props
 * @param {string} props.math - The LaTeX expression string
 * @param {boolean} [props.block=false] - Whether to render as display math (block) or inline
 * @param {string} [props.className] - Additional class name
 * @param {boolean} [props.fit=true] - Auto-scale font-size if formula exceeds container width (block mode)
 * @param {number} [props.minScale=0.62] - Minimum scale ratio before allowing overflow scroll
 * @param {boolean} [props.expandable=false] - Show fullscreen expansion button
 * @param {string} [props.title] - Title for fullscreen modal
 * @param {string} [props.description] - Description for fullscreen modal
 */
export default function MathView({
  math = '',
  block = false,
  className = '',
  fit = true,
  minScale = 0.62,
  expandable = false,
  title = '',
  description = '',
}) {
  const { t } = useLanguage();
  const [scale, setScale] = useState(1);
  const [needsScroll, setNeedsScroll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);
  const mathRef = useRef(null);

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

  // Dynamic Auto-Fit measurement
  useLayoutEffect(() => {
    if (!block || !fit || typeof window === 'undefined') return;

    const container = containerRef.current;
    const mathEl = mathRef.current;
    if (!container || !mathEl) return;

    const calculateScale = () => {
      // Reset scale to 1 temporarily to measure natural width
      container.style.setProperty('--math-scale', '1');
      const innerKatex = mathEl.querySelector('.katex-html') || mathEl;
      const naturalWidth = innerKatex.scrollWidth || innerKatex.offsetWidth;
      const containerWidth = container.clientWidth;

      // Available width accounts for left/right padding and possible expand button
      const padding = expandable ? 48 : 24;
      const availableWidth = Math.max(120, containerWidth - padding);

      if (naturalWidth > availableWidth && naturalWidth > 0) {
        const calculated = Math.max(minScale, availableWidth / naturalWidth);
        const rounded = Math.round(calculated * 100) / 100;
        setScale(rounded);
        container.style.setProperty('--math-scale', String(rounded));
        setNeedsScroll(calculated <= minScale && naturalWidth * calculated > availableWidth);
      } else {
        setScale(1);
        container.style.setProperty('--math-scale', '1');
        setNeedsScroll(false);
      }
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [block, fit, math, expandable, minScale]);

  if (block) {
    return (
      <div
        ref={containerRef}
        className={`math-view math-view--block ${needsScroll ? 'math-view--overflow' : ''} ${className}`}
        style={{ '--math-scale': scale }}
      >
        <div
          ref={mathRef}
          className="math-view__inner"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {expandable && (
          <button
            type="button"
            className="math-view__expand-btn"
            onClick={() => setIsModalOpen(true)}
            title={t('Expand equation to fullscreen (⤢)', 'ขยายสมการดูเต็มจอ (⤢)')}
            aria-label={t('Expand equation', 'ขยายสมการ')}
          >
            <span aria-hidden="true">⤢</span>
          </button>
        )}

        {isModalOpen && (
          <EquationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            latex={math}
            title={title}
            description={description}
          />
        )}
      </div>
    );
  }

  return (
    <span
      className={`math-view math-view--inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
