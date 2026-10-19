import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { formatLevelBadge } from '../../i18n/thaiTranslations.js';
import './TopicCard.css';

/**
 * One topic row on a subject page.
 * Clicking navigates to the dedicated topic page with explanations and interactive visualizations.
 */
export default function TopicCard({ topic, index, subjectId = 'physics' }) {
  const { lang, t } = useLanguage();
  const { id, title, description, level, inDevelopment, status } = topic;
  const number = String(index + 1).padStart(2, '0');

  return (
    <Link
      to={`/subjects/${subjectId}/${id}`}
      className={`topic-card ${inDevelopment ? 'topic-card--in-dev' : ''}`}
      aria-label={`Open topic: ${title}${inDevelopment ? ' (In Development)' : ''}`}
    >
      <span className="topic-card__number" aria-hidden="true">
        {number}
      </span>

      <div className="topic-card__body">
        <div className="topic-card__header">
          <h3 className="topic-card__title">{title}</h3>
          {inDevelopment ? (
            <span className="topic-card__dev-badge">
              🚧 {t(status || 'In Development', 'กำลังพัฒนา (In Development)')}
            </span>
          ) : (
            level && (
              <span className={`topic-card__level topic-card__level--${level.toLowerCase()}`}>
                {formatLevelBadge(level, lang)}
              </span>
            )
          )}
        </div>
        {description && <p className="topic-card__description">{description}</p>}
      </div>

      <div className="topic-card__action" aria-hidden="true">
        <span>
          {inDevelopment
            ? t('In Development', 'กำลังพัฒนา')
            : t('Explore', 'เริ่มเรียน')}
        </span>
        <span className="topic-card__arrow">{inDevelopment ? '🚧' : '→'}</span>
      </div>
    </Link>
  );
}
