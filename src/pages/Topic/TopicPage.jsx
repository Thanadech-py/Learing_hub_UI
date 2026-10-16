import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectById } from '../../data/subjects/index.js';
import { getTopicData, getAllTopicsForSubject } from '../../data/topicRegistry.js';
import { getSubjectVisualization } from '../../components/visualizations/index.js';
import EquationInspector from '../../components/EquationInspector/EquationInspector.jsx';
import MathView from '../../components/MathView/MathView.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import './TopicPage.css';

export default function TopicPage() {
  const { subjectId, topicId, subTopicId } = useParams();
  const subject = getSubjectById(subjectId);
  const [layoutMode, setLayoutMode] = useState('split'); // 'split' (side-by-side) | 'stacked'

  // Load topic details from unified data registry
  const rawTopicData = getTopicData(subjectId, topicId);
  const allSubjectTopics = getAllTopicsForSubject(subjectId);

  // Determine if topic has internal sub-pages (e.g. Integrals techniques)
  const hasSubPages = Boolean(rawTopicData?.subPages?.length);
  const activeSubId = subTopicId || (hasSubPages ? rawTopicData.subPages[0].id : null);
  const activeSubPage = hasSubPages
    ? rawTopicData.subPages.find((sp) => sp.id === activeSubId) || rawTopicData.subPages[0]
    : null;

  // The active content to display (sub-page if active, otherwise topic)
  const currentContent = activeSubPage || rawTopicData;

  // Find index for sub-page pagination inside the topic
  const subCurrentIndex = hasSubPages
    ? rawTopicData.subPages.findIndex((sp) => sp.id === (activeSubPage?.id || activeSubId))
    : -1;
  const prevSubPage = subCurrentIndex > 0 ? rawTopicData.subPages[subCurrentIndex - 1] : null;
  const nextSubPage =
    subCurrentIndex >= 0 && subCurrentIndex < rawTopicData.subPages.length - 1
      ? rawTopicData.subPages[subCurrentIndex + 1]
      : null;

  // Find index for overarching topic prev/next navigation
  const currentIndex = allSubjectTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIndex > 0 ? allSubjectTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allSubjectTopics.length - 1 ? allSubjectTopics[currentIndex + 1] : null;

  useEffect(() => {
    if (activeSubPage && activeSubPage.id !== 'foundations') {
      document.title = `${activeSubPage.title} · ${rawTopicData.title} · Learning Space`;
    } else if (rawTopicData) {
      document.title = `${rawTopicData.title} · Learning Space`;
    } else {
      document.title = 'Topic · Learning Space';
    }
  }, [rawTopicData, activeSubPage]);

  if (!subject) {
    return <NotFound />;
  }

  if (!rawTopicData) {
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

  const VizComponent = getSubjectVisualization(subjectId, topicId, activeSubPage?.id);

  return (
    <div className="topic-page" style={{ '--accent': subject.accent }}>
      {/* Breadcrumb Navigation */}
      <nav className="topic-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/subjects/${subject.id}`}>{subject.title}</Link>
        <span aria-hidden="true">/</span>
        {hasSubPages && activeSubPage && activeSubPage.id !== 'foundations' ? (
          <>
            <Link to={`/subjects/${subject.id}/${topicId}`}>{rawTopicData.title}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{activeSubPage.title}</span>
          </>
        ) : (
          <span aria-current="page">{rawTopicData.title}</span>
        )}
      </nav>

      {/* Topic Sub-Pages / Technique Ribbon (inside the topic) */}
      {hasSubPages && (
        <nav className="topic-subpages-bar" aria-label="Chapter techniques">
          <div className="topic-subpages-header">
            <div className="topic-subpages-header__title">
              <span aria-hidden="true">📚</span>
              <span>Techniques & Chapters in {rawTopicData.title}</span>
            </div>
            <span className="topic-subpages-header__counter">
              Chapter {subCurrentIndex + 1} of {rawTopicData.subPages.length}
            </span>
          </div>
          <div className="topic-subpages-tabs">
            {rawTopicData.subPages.map((sp, idx) => {
              const isActive = sp.id === activeSubPage.id;
              const targetUrl =
                sp.id === rawTopicData.subPages[0].id
                  ? `/subjects/${subject.id}/${topicId}`
                  : `/subjects/${subject.id}/${topicId}/${sp.id}`;

              return (
                <Link
                  key={sp.id}
                  to={targetUrl}
                  className={`topic-subpage-tab ${isActive ? 'topic-subpage-tab--active' : ''}`}
                  title={sp.subtitle || sp.title}
                >
                  <span className="topic-subpage-tab__num">{idx + 1}</span>
                  {sp.icon && <span aria-hidden="true">{sp.icon}</span>}
                  <span>{sp.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* Hero Header */}
      <header className="topic-hero">
        <div className="topic-hero__meta">
          <span className="eyebrow">{subject.title}</span>
          {rawTopicData.level && (
            <span className={`topic-level-badge topic-level-badge--${rawTopicData.level.toLowerCase()}`}>
              {rawTopicData.level}
            </span>
          )}
          {currentContent.estimatedTime && (
            <span className="topic-time-badge">{currentContent.estimatedTime}</span>
          )}
        </div>

        <h1 className="topic-hero__title">
          {hasSubPages && activeSubPage && activeSubPage.id !== 'foundations'
            ? activeSubPage.title
            : rawTopicData.title}
        </h1>
        {currentContent.subtitle && <p className="topic-hero__subtitle">{currentContent.subtitle}</p>}

        {currentContent.overview && (
          <div className="topic-hero__overview">
            {currentContent.overview.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </header>

      {/* Quick Nav Anchors + Layout Mode Switcher */}
      <div className="topic-anchors-bar">
        <div className="topic-anchors">
          <a href="#interactive-lab" className="topic-anchor-btn">
            🔭 Interactive Lab
          </a>
          <a href="#equations-section" className="topic-anchor-btn">
            📐 Equations & Variables ({currentContent.equations?.length || 0})
          </a>
          {currentContent.keyConcepts?.length > 0 && (
            <a href="#concepts-section" className="topic-anchor-btn">
              💡 Core Concepts ({currentContent.keyConcepts.length})
            </a>
          )}
        </div>

        <div className="topic-layout-toggle" role="group" aria-label="Layout mode">
          <span className="topic-layout-toggle__label">Layout:</span>
          <button
            type="button"
            className={`topic-layout-btn ${layoutMode === 'split' ? 'topic-layout-btn--active' : ''}`}
            onClick={() => setLayoutMode('split')}
            title="Side-by-side: Visualizer stays visible while scrolling through explanations"
          >
            <span aria-hidden="true">◫</span> Split Workbench
          </button>
          <button
            type="button"
            className={`topic-layout-btn ${layoutMode === 'stacked' ? 'topic-layout-btn--active' : ''}`}
            onClick={() => setLayoutMode('stacked')}
            title="Stacked view: Full-width sections"
          >
            <span aria-hidden="true">▭</span> Stacked Full-Width
          </button>
        </div>
      </div>

      {/* Main Workbench Layout: Visualizer stays with explanations */}
      <div className={`topic-workbench ${layoutMode === 'split' ? 'topic-workbench--split' : 'topic-workbench--stacked'}`}>
        {/* Sticky Visualizer Pane */}
        <aside className="topic-workbench__viz-pane">
          <section id="interactive-lab" className="topic-section topic-section--viz">
            <div className="topic-section__header">
              <span className="topic-section__number">01</span>
              <div>
                <h2 className="topic-section__title">
                  {subjectId === 'linear-algebra' ? 'Interactive 3D Visualizer Lab' : 'Interactive Visualizer Lab'}
                </h2>
                <p className="topic-section__desc">
                  Manipulate mathematical & physical parameters in real time alongside the governing derivations.
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
        </aside>

        {/* Content & Explanations Pane */}
        <main className="topic-workbench__content-pane">
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
              {currentContent.equations?.map((eq, idx) => (
                <EquationInspector key={idx} equation={eq} index={idx} />
              ))}
            </div>
          </section>

          {/* Section 3: Core Concepts & Insights */}
          {currentContent.keyConcepts?.length > 0 && (
            <section id="concepts-section" className="topic-section">
              <div className="topic-section__header">
                <span className="topic-section__number">03</span>
                <div>
                  <h2 className="topic-section__title">Core Concepts & Worked Examples</h2>
                  <p className="topic-section__desc">
                    Foundational principles, step-by-step matrix and vector calculations, and key geometric insights.
                  </p>
                </div>
              </div>

              <div className="topic-concepts-grid">
                {currentContent.keyConcepts.map((concept, i) => (
                  <article
                    key={i}
                    className={`concept-card ${concept.latex ? 'concept-card--with-calc' : ''}`}
                  >
                    <div className="concept-card__header-row">
                      <span className="concept-card__icon" aria-hidden="true">💡</span>
                      <h3 className="concept-card__title">{concept.title}</h3>
                    </div>
                    <p className="concept-card__content">{concept.content}</p>
                    {concept.latex && (
                      <div className="concept-card__calc-box">
                        <span className="concept-card__calc-label">
                          {concept.exampleLabel || 'Worked Calculation (Matrix / Vector Form)'}
                        </span>
                        <MathView math={concept.latex} block className="concept-card__formula" />
                        {concept.exampleNote && (
                          <p className="concept-card__calc-note">{concept.exampleNote}</p>
                        )}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Internal Sub-Topic Pagination (Prev / Next Technique inside chapter) */}
          {hasSubPages && (prevSubPage || nextSubPage) && (
            <nav className="subtopic-pagination" aria-label="Technique navigation">
              {prevSubPage ? (
                <Link
                  to={
                    prevSubPage.id === rawTopicData.subPages[0].id
                      ? `/subjects/${subject.id}/${topicId}`
                      : `/subjects/${subject.id}/${topicId}/${prevSubPage.id}`
                  }
                  className="subtopic-pagination__link"
                >
                  ← Previous: {prevSubPage.title}
                </Link>
              ) : (
                <div />
              )}

              {nextSubPage && (
                <Link
                  to={`/subjects/${subject.id}/${topicId}/${nextSubPage.id}`}
                  className="subtopic-pagination__link"
                >
                  Next: {nextSubPage.title} →
                </Link>
              )}
            </nav>
          )}
        </main>
      </div>

      {/* Bottom Topic Pagination (Prev / Next Subject Topic) */}
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
