import { Link } from 'react-router-dom';
import './IntegrationSeriesNav.css';

export const INTEGRATION_SERIES_TOPICS = [
  { id: 'integrals', title: 'Foundations & FTC', icon: '🏛️', tag: 'Riemann & FTC' },
  { id: 'u-substitution', title: 'u-Substitution', icon: '🔄', tag: 'Chain Rule Reverse' },
  { id: 'integration-by-parts', title: 'Integration by Parts', icon: '✂️', tag: 'Product Rule & DI' },
  { id: 'trigonometric-integrals', title: 'Trig Integrals', icon: '📐', tag: 'Powers of Sin/Cos' },
  { id: 'trigonometric-substitution', title: 'Trig Substitution', icon: '🔺', tag: 'Radicals & Triangles' },
  { id: 'partial-fractions', title: 'Partial Fractions', icon: '🧩', tag: 'Rational Functions' },
  { id: 'improper-integrals', title: 'Improper Integrals', icon: '♾️', tag: 'Infinite & Singular' },
];

export function isIntegrationTopic(topicId) {
  return INTEGRATION_SERIES_TOPICS.some((t) => t.id === topicId);
}

export default function IntegrationSeriesNav({ currentTopicId, subjectId = 'mathematics' }) {
  if (!isIntegrationTopic(currentTopicId)) return null;

  const currentIndex = INTEGRATION_SERIES_TOPICS.findIndex((t) => t.id === currentTopicId);

  return (
    <nav className="integration-series-nav" aria-label="Integration Techniques Series">
      <div className="integration-series-nav__header">
        <div className="integration-series-nav__badge">
          <span className="integration-series-nav__pulse" aria-hidden="true" />
          Integration Techniques Series
        </div>
        <span className="integration-series-nav__counter">
          Step {currentIndex + 1} of {INTEGRATION_SERIES_TOPICS.length}
        </span>
      </div>

      <div className="integration-series-nav__steps">
        {INTEGRATION_SERIES_TOPICS.map((item, idx) => {
          const isActive = item.id === currentTopicId;
          const isPast = idx < currentIndex;

          return (
            <Link
              key={item.id}
              to={`/subjects/${subjectId}/${item.id}`}
              className={`integration-step-chip ${
                isActive
                  ? 'integration-step-chip--active'
                  : isPast
                  ? 'integration-step-chip--past'
                  : ''
              }`}
              title={`${item.title}: ${item.tag}`}
            >
              <span className="integration-step-chip__num">{idx + 1}</span>
              <span className="integration-step-chip__icon" aria-hidden="true">{item.icon}</span>
              <span className="integration-step-chip__title">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
