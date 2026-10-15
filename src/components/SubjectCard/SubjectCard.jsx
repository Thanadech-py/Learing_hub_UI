import { Link } from 'react-router-dom';
import SubjectIcon from './SubjectIcon.jsx';
import './SubjectCard.css';

// How many topic chips to preview on the Home card.
const PREVIEW_COUNT = 4;

export default function SubjectCard({ subject }) {
  const { id, title, description, icon, accent, topics } = subject;
  const preview = topics.slice(0, PREVIEW_COUNT);
  const remaining = topics.length - preview.length;

  return (
    <Link
      className="subject-card"
      to={`/subjects/${id}`}
      style={{ '--accent': accent }}
      aria-label={`Open ${title}`}
    >
      <div className="subject-card__icon">
        <SubjectIcon name={icon} />
      </div>

      <h3 className="subject-card__title">{title}</h3>
      <p className="subject-card__description">{description}</p>

      <ul className="subject-card__topics">
        {preview.map((topic) => (
          <li key={topic.id}>{topic.title}</li>
        ))}
        {remaining > 0 && (
          <li className="subject-card__more">+{remaining} more</li>
        )}
      </ul>

      <span className="subject-card__cta">
        Start learning <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
