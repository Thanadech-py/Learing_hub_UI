import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectById } from '../../data/subjects/index.js';
import { getTopicData, getAllTopicsForSubject } from '../../data/topicRegistry.js';
import { getSubjectVisualization } from '../../components/visualizations/index.js';
import EquationInspector from '../../components/EquationInspector/EquationInspector.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import './TopicPage.css';

export default function TopicPage() {
  const { subjectId, topicId } = useParams();
  const subject = getSubjectById(subjectId);

  // Load topic details from unified data registry
  const topicData = getTopicData(subjectId, topicId);
  const allSubjectTopics = getAllTopicsForSubject(subjectId);

  // Find index for next/prev navigation
  const currentIndex = allSubjectTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIndex > 0 ? allSubjectTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allSubjectTopics.length - 1 ? allSubjectTopics[currentIndex + 1] : null;

  useEffect(() => {
    if (topicData) {
      document.title = `${topicData.title} · Learning Space`;
    } else {
      document.title = 'Topic · Learning Space';
    }
  }, [topicData]);

  if (!subject) {
    return <NotFound />;
  }

  if (!topicData) {
    return (
      <div className="topic-not-found">
        <nav className="topic-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/subjects/${subject.id}`}>{subject.title}</Link>
          <span aria-hidden="true">/</span>
          <span>{topicId}</span>
        </nav>
        <section className="not-found">
          <p className="eyebrow">Coming Soon</p>
          <h1 className="not-found__title">Topic in development</h1>
          <p className="not-found__text">
            The topic page for "{topicId}" is currently being prepared with interactive visualizations.
          </p>
          <Link to={`/subjects/${subject.id}`} className="not-found__link">
            ← Back to {subject.title}
          </Link>
        </section>
      </div>
    );
  }

  const VizComponent = getSubjectVisualization(subjectId, topicId);

  return (
    <div className="topic-page" style={{ '--accent': subject.accent }}>
      {/* Breadcrumb Navigation */}
      <nav className="topic-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/subjects/${subject.id}`}>{subject.title}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{topicData.title}</span>
      </nav>

      {/* Hero Header */}
      <header className="topic-hero">
        <div className="topic-hero__meta">
          <span className="eyebrow">{subject.title}</span>
          {topicData.level && (
            <span className={`topic-level-badge topic-level-badge--${topicData.level.toLowerCase()}`}>
              {topicData.level}
            </span>
          )}
          {topicData.estimatedTime && (
            <span className="topic-time-badge">{topicData.estimatedTime}</span>
          )}
        </div>

        <h1 className="topic-hero__title">{topicData.title}</h1>
        {topicData.subtitle && <p className="topic-hero__subtitle">{topicData.subtitle}</p>}

        {topicData.overview && (
          <div className="topic-hero__overview">
            {topicData.overview.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </header>

      {/* Quick Nav Anchors */}
      <div className="topic-anchors">
        <a href="#interactive-lab" className="topic-anchor-btn">
          🔭 Interactive Lab
        </a>
        <a href="#equations-section" className="topic-anchor-btn">
          📐 Equations & Variables ({topicData.equations?.length || 0})
        </a>
        <a href="#concepts-section" className="topic-anchor-btn">
          💡 Core Concepts ({topicData.keyConcepts?.length || 0})
        </a>
      </div>

      {/* Section 1: Interactive Lab & Visualization */}
      <section id="interactive-lab" className="topic-section">
        <div className="topic-section__header">
          <span className="topic-section__number">01</span>
          <div>
            <h2 className="topic-section__title">Interactive Visualization Lab</h2>
            <p className="topic-section__desc">
              Manipulate physical parameters in real time to develop intuitive visual mastery of the laws.
            </p>
          </div>
        </div>

        {VizComponent ? (
          <VizComponent />
        ) : (
          <div className="topic-viz-placeholder">
            Visualization for this topic is loading...
          </div>
        )}
      </section>

      {/* Section 2: Equations & Variable Interconnections */}
      <section id="equations-section" className="topic-section">
        <div className="topic-section__header">
          <span className="topic-section__number">02</span>
          <div>
            <h2 className="topic-section__title">Governing Equations & Variable Analysis</h2>
            <p className="topic-section__desc">
              Every variable broken down in detail: physical meaning, SI units, and how it directly or inversely connects to the other variables.
            </p>
          </div>
        </div>

        <div className="topic-equations-list">
          {topicData.equations?.map((eq, idx) => (
            <EquationInspector key={idx} equation={eq} index={idx} />
          ))}
        </div>
      </section>

      {/* Section 3: Core Concepts & Insights */}
      {topicData.keyConcepts?.length > 0 && (
        <section id="concepts-section" className="topic-section">
          <div className="topic-section__header">
            <span className="topic-section__number">03</span>
            <div>
              <h2 className="topic-section__title">Core Physical Concepts & Intuition</h2>
              <p className="topic-section__desc">
                Foundational principles, thought experiments, and key insights to ground mathematical derivations.
              </p>
            </div>
          </div>

          <div className="topic-concepts-grid">
            {topicData.keyConcepts.map((concept, i) => (
              <article key={i} className="concept-card">
                <span className="concept-card__icon" aria-hidden="true">💡</span>
                <h3 className="concept-card__title">{concept.title}</h3>
                <p className="concept-card__content">{concept.content}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Topic Pagination (Prev / Next) */}
      <footer className="topic-pagination">
        {prevTopic ? (
          <Link
            to={`/subjects/${subject.id}/${prevTopic.id}`}
            className="topic-pagination-link topic-pagination-link--prev"
          >
            <span className="topic-pagination-dir">← Previous Topic</span>
            <span className="topic-pagination-title">{prevTopic.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic && (
          <Link
            to={`/subjects/${subject.id}/${nextTopic.id}`}
            className="topic-pagination-link topic-pagination-link--next"
          >
            <span className="topic-pagination-dir">Next Topic →</span>
            <span className="topic-pagination-title">{nextTopic.title}</span>
          </Link>
        )}
      </footer>
    </div>
  );
}
