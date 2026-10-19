import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './LanguageSlider.css';

/**
 * Top-bar animated sliding language switcher between English (ENG) and Thai (ไทย).
 */
export default function LanguageSlider() {
  const { lang, setLang, toggleLang } = useLanguage();
  const isThai = lang === 'th';

  return (
    <div
      className="lang-slider"
      role="group"
      aria-label="Language switcher (English / Thai)"
      onClick={toggleLang}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLang();
        }
      }}
      tabIndex={0}
      title={isThai ? 'Switch language to English' : 'เปลี่ยนภาษาอธิบายเป็นภาษาไทย (Thai)'}
    >
      {/* Animated sliding thumb */}
      <span
        className={`lang-slider__thumb ${isThai ? 'lang-slider__thumb--th' : 'lang-slider__thumb--en'}`}
        aria-hidden="true"
      />

      <button
        type="button"
        className={`lang-slider__option ${!isThai ? 'lang-slider__option--active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setLang('en');
        }}
        aria-pressed={!isThai}
      >
        <span className="lang-slider__flag" aria-hidden="true">🇬🇧</span>
        <span className="lang-slider__code">ENG</span>
      </button>

      <button
        type="button"
        className={`lang-slider__option ${isThai ? 'lang-slider__option--active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setLang('th');
        }}
        aria-pressed={isThai}
      >
        <span className="lang-slider__flag" aria-hidden="true">🇹🇭</span>
        <span className="lang-slider__code">ไทย</span>
      </button>
    </div>
  );
}
