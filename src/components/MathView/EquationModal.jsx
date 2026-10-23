import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import katex from 'katex';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './EquationModal.css';

export default function EquationModal({
  isOpen,
  onClose,
  latex = '',
  title = '',
  description = '',
}) {
  const { t } = useLanguage();
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setCopied(false);
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(2.5, z + 0.15));
      if (e.key === '-' || e.key === '_') setZoom((z) => Math.max(0.6, z - 0.15));
      if (e.key === '0') setZoom(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const html = (() => {
    try {
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return `<code class="math-fallback">${latex}</code>`;
    }
  })();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(latex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const modalContent = (
    <div className="eq-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="eq-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="eq-modal-header">
          <div className="eq-modal-title-group">
            <span className="eq-modal-badge">{t('Equation Inspector', 'เจาะลึกสมการ')}</span>
            {title && <h3 className="eq-modal-title">{title}</h3>}
          </div>
          <button
            type="button"
            className="eq-modal-close-btn"
            onClick={onClose}
            aria-label={t('Close', 'ปิด')}
          >
            ✕
          </button>
        </header>

        {description && <p className="eq-modal-desc">{description}</p>}

        <div className="eq-modal-stage">
          <div
            className="eq-modal-math-canvas"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <footer className="eq-modal-footer">
          <div className="eq-modal-zoom-controls">
            <button
              type="button"
              className="eq-modal-ctrl-btn"
              onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.15) * 100) / 100))}
              title={t('Zoom Out (-)', 'ย่อ (-)')}
            >
              −
            </button>
            <span className="eq-modal-zoom-val">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="eq-modal-ctrl-btn"
              onClick={() => setZoom((z) => Math.min(2.5, Math.round((z + 0.15) * 100) / 100))}
              title={t('Zoom In (+)', 'ขยาย (+)')}
            >
              +
            </button>
            <button
              type="button"
              className="eq-modal-ctrl-btn eq-modal-ctrl-btn--reset"
              onClick={() => setZoom(1)}
              title={t('Reset Zoom (0)', 'ขนาดปกติ (0)')}
            >
              100%
            </button>
          </div>

          <div className="eq-modal-actions">
            <button
              type="button"
              className={`eq-modal-copy-btn ${copied ? 'eq-modal-copy-btn--copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? (
                <>✓ {t('Copied LaTeX', 'คัดลอกสำเร็จ')}</>
              ) : (
                <>📋 {t('Copy LaTeX', 'คัดลอก LaTeX')}</>
              )}
            </button>
            <button
              type="button"
              className="eq-modal-done-btn"
              onClick={onClose}
            >
              {t('Close', 'ปิดหน้าต่าง')}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
