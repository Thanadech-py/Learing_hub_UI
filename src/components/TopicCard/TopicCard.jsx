import { Link } from 'react-router-dom';
import './TopicCard.css';

/**
 * One topic row on a subject page.
 * Clicking navigates to the dedicated topic page with explanations and interactive visualizations.
 */
export default function TopicCard({ topic, index, subjectId = 'physics' }) {
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
              🚧 {status || 'In Development'}
            </span>
          ) : (
            level && (
              <span className={`topic-card__level topic-card__level--${level.toLowerCase()}`}>
                {level}
              </span>
            )
          )}
        </div>
        {description && <p className="topic-card__description">{description}</p>}
      </div>

      <div className="topic-card__action" aria-hidden="true">
        <span>{inDevelopment ? 'In Development' : 'Explore'}</span>
        <span className="topic-card__arrow">{inDevelopment ? '🚧' : '→'}</span>
      </div>
    </Link>
  );
}
