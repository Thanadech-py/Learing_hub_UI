import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubjectById } from '../../data/subjects/index.js';
import { getTopicData, getAllTopicsForSubject } from '../../data/topicRegistry.js';
import { getSubjectVisualization } from '../../components/visualizations/index.js';
import Universal3DViz from '../../components/visualizations/shared/Universal3DViz.jsx';
import EquationInspector from '../../components/EquationInspector/EquationInspector.jsx';
import CodeSyntaxInspector from '../../components/CodeSyntaxInspector/CodeSyntaxInspector.jsx';
import IntegratedIDE from '../../components/visualizations/comProg/IntegratedIDE.jsx';
import { getCodeSyntaxForTopic } from '../../data/comProgTopics/codeSyntaxRegistry.js';
import MathView from '../../components/MathView/MathView.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import './TopicPage.css';

export default function TopicPage() {
  const { subjectId, topicId, subTopicId } = useParams();
  const subject = getSubjectById(subjectId);
  const [layoutMode, setLayoutMode] = useState('split'); // 'split' (side-by-side) | 'stacked'
  // 2D vs 3D visualization option for standard topics
  const [vizDimension, setVizDimension] = useState(
    subjectId === 'linear-algebra' ? '3d' : '2d'
  );
  // Dedicated mode for Com-Prog: 'ide' (interactive test editor) | '2d' (data/memory viz) | '3d' (system architecture)
  const [comProgVizMode, setComProgVizMode] = useState('ide');

  const handleDimensionSwitch = (mode) => {
    setVizDimension(mode);
    window.dispatchEvent(new CustomEvent('viz-dimension-change', { detail: mode }));
  };

  // Sync default dimension when switching subjects
  useEffect(() => {
    setVizDimension(subjectId === 'linear-algebra' ? '3d' : '2d');
    setComProgVizMode('ide');
  }, [subjectId, topicId]);

  // Load topic details from unified data registry
  const rawTopicData = getTopicData(subjectId, topicId);
  const allSubjectTopics = getAllTopicsForSubject(subjectId);

  // Determine if topic has internal sub-pages (e.g. Integrals techniques, Waves)
  const hasSubPages = Boolean(rawTopicData?.subPages?.length);
  const isTopicHomePage = !subTopicId || subTopicId === rawTopicData?.subPages?.[0]?.id;
  const activeSubId = subTopicId || (hasSubPages ? rawTopicData.subPages[0].id : null);
  const activeSubPage = hasSubPages
    ? rawTopicData.subPages.find((sp) => sp.id === activeSubId) || rawTopicData.subPages[0]
    : null;

  // The active content to display (sub-page if active, otherwise topic)
  const currentContent = activeSubPage || rawTopicData;

  const isComProg = subjectId === 'com-prog';
  const comProgSyntaxItems = isComProg
    ? getCodeSyntaxForTopic(topicId, activeSubPage?.id, currentContent)
    : [];

  // Other sub-topics to display as navigation cards
  const otherSubTopicCards = hasSubPages
    ? rawTopicData.subPages.filter((sp, idx) => (isTopicHomePage ? idx > 0 : sp.id !== activeSubPage?.id))
    : [];

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
    if (activeSubPage && !isTopicHomePage) {
      document.title = `${activeSubPage.title} · ${rawTopicData.title} · Learning Space`;
    } else if (rawTopicData) {
      document.title = `${rawTopicData.title} · Learning Space`;
    } else {
      document.title = 'Topic · Learning Space';
    }
  }, [rawTopicData, activeSubPage, isTopicHomePage]);

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
        {hasSubPages && !isTopicHomePage ? (
          <>
            <Link to={`/subjects/${subject.id}/${topicId}`}>{rawTopicData.title}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{activeSubPage.title}</span>
          </>
        ) : (
          <span aria-current="page">{rawTopicData.title}</span>
        )}
      </nav>

      {/* Sub-Topic Back-to-Home Banner when viewing a specific sub-topic page */}
      {hasSubPages && !isTopicHomePage && (
        <div className="subtopic-return-bar">
          <Link to={`/subjects/${subject.id}/${topicId}`} className="subtopic-return-btn">
            ← Back to {rawTopicData.title} Home Page
          </Link>
          <span className="subtopic-return-meta">
            Chapter {subCurrentIndex + 1} of {rawTopicData.subPages.length} · {activeSubPage.tag || activeSubPage.title}
          </span>
        </div>
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
          {hasSubPages && !isTopicHomePage ? activeSubPage.title : rawTopicData.title}
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

      {/* Sub-Pages Ribbon Bar when a topic has connected sub-topics */}
      {hasSubPages && (
        <nav className="topic-subpages-bar" aria-label="Sub-topic chapters">
          <div className="topic-subpages-header">
            <span className="topic-subpages-header__title">
              📚 Chapters & Techniques in {rawTopicData.title}
            </span>
            <span className="topic-subpages-header__counter">
              {rawTopicData.subPages.length} Connected Sub-Topics
            </span>
          </div>
          <div className="topic-subpages-tabs">
            {rawTopicData.subPages.map((sp, idx) => {
              const isActive = (isTopicHomePage && idx === 0) || activeSubPage?.id === sp.id;
              const linkTarget =
                idx === 0
                  ? `/subjects/${subject.id}/${topicId}`
                  : `/subjects/${subject.id}/${topicId}/${sp.id}`;
              return (
                <Link
                  key={sp.id}
                  to={linkTarget}
                  className={`topic-subpage-tab ${isActive ? 'topic-subpage-tab--active' : ''}`}
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

      {/* Quick Nav Anchors + 2D/3D Switcher + Layout Mode Switcher */}
      <div className="topic-anchors-bar">
        <div className="topic-anchors">
          <a href="#interactive-lab" className="topic-anchor-btn">
            {isComProg ? '💻 Interactive IDE Lab' : '🔭 Interactive Lab'}
          </a>
          <a href="#equations-section" className="topic-anchor-btn">
            {isComProg
              ? `📝 Code Syntax & Mechanics (${comProgSyntaxItems.length})`
              : `📐 Equations & Variables (${currentContent.equations?.length || 0})`}
          </a>
          {currentContent.keyConcepts?.length > 0 && (
            <a href="#concepts-section" className="topic-anchor-btn">
              💡 Core Concepts ({currentContent.keyConcepts.length})
            </a>
          )}
          {hasSubPages && otherSubTopicCards.length > 0 && (
            <a href="#subtopics-cards-section" className="topic-anchor-btn topic-anchor-btn--highlight">
              🗂️ {isTopicHomePage ? `Sub-Topic Cards (${otherSubTopicCards.length})` : 'Other Sub-Topics'}
            </a>
          )}
        </div>

        <div className="topic-toolbar-controls">
          {/* Visualization Option Toggle */}
          {isComProg ? (
            <div className="topic-layout-toggle" role="group" aria-label="Com-Prog workspace view mode">
              <span className="topic-layout-toggle__label">Mode:</span>
              <button
                type="button"
                className={`topic-layout-btn ${comProgVizMode === 'ide' ? 'topic-layout-btn--active' : ''}`}
                onClick={() => setComProgVizMode('ide')}
                title="Switch to Interactive Testing IDE"
              >
                <span aria-hidden="true">💻</span> IDE Lab
              </button>
              <button
                type="button"
                className={`topic-layout-btn ${comProgVizMode === '2d' ? 'topic-layout-btn--active' : ''}`}
                onClick={() => setComProgVizMode('2d')}
                title="Switch to Data & Memory Visualizer"
              >
                <span aria-hidden="true">📊</span> Data Viz
              </button>
              <button
                type="button"
                className={`topic-layout-btn ${comProgVizMode === '3d' ? 'topic-layout-btn--active' : ''}`}
                onClick={() => setComProgVizMode('3d')}
                title="Switch to 3D System Architecture View"
              >
                <span aria-hidden="true">🧊</span> 3D View
              </button>
            </div>
          ) : (
            <div className="topic-layout-toggle" role="group" aria-label="Visualization dimension mode">
              <span className="topic-layout-toggle__label">Visualizer:</span>
              <button
                type="button"
                className={`topic-layout-btn ${vizDimension === '2d' ? 'topic-layout-btn--active' : ''}`}
                onClick={() => handleDimensionSwitch('2d')}
                title="Switch to 2D Interactive View"
              >
                <span aria-hidden="true">📊</span> 2D View
              </button>
              <button
                type="button"
                className={`topic-layout-btn ${vizDimension === '3d' ? 'topic-layout-btn--active' : ''}`}
                onClick={() => handleDimensionSwitch('3d')}
                title="Switch to 3D Isometric View (Drag to Orbit)"
              >
                <span aria-hidden="true">🧊</span> 3D View
              </button>
            </div>
          )}

          <div className="topic-layout-toggle" role="group" aria-label="Layout mode">
            <span className="topic-layout-toggle__label">Layout:</span>
            <button
              type="button"
              className={`topic-layout-btn ${layoutMode === 'split' ? 'topic-layout-btn--active' : ''}`}
              onClick={() => setLayoutMode('split')}
              title="Side-by-side: Wide Visualizer stays visible while scrolling through explanations"
            >
              <span aria-hidden="true">◫</span> Split Workbench
            </button>
            <button
              type="button"
              className={`topic-layout-btn ${layoutMode === 'stacked' ? 'topic-layout-btn--active' : ''}`}
              onClick={() => setLayoutMode('stacked')}
              title="Stacked view: Full-width visualization box"
            >
              <span aria-hidden="true">▭</span> Full-Width
            </button>
          </div>
        </div>
      </div>

      {/* Main Workbench Layout: Wide Visualizer stays with explanations */}
      <div className={`topic-workbench ${layoutMode === 'split' ? 'topic-workbench--split' : 'topic-workbench--stacked'}`}>
        {/* Sticky Wide Visualizer Pane */}
        <aside className="topic-workbench__viz-pane">
          <section id="interactive-lab" className="topic-section topic-section--viz">
            {isComProg ? (
              <>
                <div className="topic-section__header topic-section__header--viz">
                  <div className="topic-section__header-left">
                    <span className="topic-section__number">01</span>
                    <div>
                      <h2 className="topic-section__title">
                        {comProgVizMode === 'ide'
                          ? 'Integrated IDE & Code Execution Lab'
                          : comProgVizMode === '3d'
                          ? '3D System Architecture View'
                          : 'Interactive Data & Memory Visualizer'}
                      </h2>
                      <p className="topic-section__desc">
                        {comProgVizMode === 'ide'
                          ? 'Write, test, and execute code in real-time with simulated compiler output, runtime telemetry, and live memory tracing.'
                          : comProgVizMode === '3d'
                          ? 'Orbit in 3D space (drag to rotate, scroll to zoom) and inspect hardware architecture.'
                          : 'Inspect contiguous byte addresses, pointer arrows, heap allocations, and register bits in real time.'}
                      </p>
                    </div>
                  </div>

                  <div className="viz-dimension-switch viz-dimension-switch--comprog" role="group" aria-label="Toggle IDE, Data Viz, or 3D">
                    <button
                      type="button"
                      className={`viz-dimension-btn ${comProgVizMode === 'ide' ? 'viz-dimension-btn--active' : ''}`}
                      onClick={() => setComProgVizMode('ide')}
                      title="Interactive IDE for testing code"
                    >
                      💻 Interactive IDE
                    </button>
                    <button
                      type="button"
                      className={`viz-dimension-btn ${comProgVizMode === '2d' ? 'viz-dimension-btn--active' : ''}`}
                      onClick={() => setComProgVizMode('2d')}
                      title="Data & Memory Structure Visualizer"
                    >
                      📊 Data & Memory
                    </button>
                    <button
                      type="button"
                      className={`viz-dimension-btn ${comProgVizMode === '3d' ? 'viz-dimension-btn--active' : ''}`}
                      onClick={() => setComProgVizMode('3d')}
                      title="3D Isometric Architecture View"
                    >
                      🧊 3D System
                    </button>
                  </div>
                </div>

                {comProgVizMode === 'ide' ? (
                  <IntegratedIDE topicId={topicId} subTopicId={activeSubPage?.id} />
                ) : comProgVizMode === '3d' ? (
                  <Universal3DViz
                    subjectId={subjectId}
                    topicId={topicId}
                    subTopicId={activeSubPage?.id}
                  />
                ) : VizComponent ? (
                  <VizComponent />
                ) : (
                  <div className="topic-viz-placeholder">
                    Visualization for this topic is loading...
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="topic-section__header topic-section__header--viz">
                  <div className="topic-section__header-left">
                    <span className="topic-section__number">01</span>
                    <div>
                      <h2 className="topic-section__title">
                        {vizDimension === '3d' ? 'Interactive 3D Isometric Lab' : 'Interactive 2D Visualizer Lab'}
                      </h2>
                      <p className="topic-section__desc">
                        {vizDimension === '3d'
                          ? 'Orbit in 3D space (drag to rotate, scroll to zoom) and manipulate live parameters.'
                          : 'Manipulate mathematical & physical parameters in real time alongside the derivations.'}
                      </p>
                    </div>
                  </div>

                  <div className="viz-dimension-switch" role="group" aria-label="Toggle 2D or 3D Visualization">
                    <button
                      type="button"
                      className={`viz-dimension-btn ${vizDimension === '2d' ? 'viz-dimension-btn--active' : ''}`}
                      onClick={() => handleDimensionSwitch('2d')}
                    >
                      📊 2D Classic
                    </button>
                    <button
                      type="button"
                      className={`viz-dimension-btn ${vizDimension === '3d' ? 'viz-dimension-btn--active' : ''}`}
                      onClick={() => handleDimensionSwitch('3d')}
                    >
                      🧊 3D Isometric
                    </button>
                  </div>
                </div>

                {vizDimension === '3d' && subjectId !== 'linear-algebra' ? (
                  <Universal3DViz
                    subjectId={subjectId}
                    topicId={topicId}
                    subTopicId={activeSubPage?.id}
                  />
                ) : VizComponent ? (
                  <VizComponent />
                ) : (
                  <div className="topic-viz-placeholder">
                    Visualization for this topic is loading...
                  </div>
                )}
              </>
            )}
          </section>
        </aside>

        {/* Content & Explanations Pane */}
        <main className="topic-workbench__content-pane">
          {/* Section 2: Code Syntax Breakdown (Com-Prog) OR Equations & Variable Interconnections (Math/Physics) */}
          {isComProg ? (
            <section id="equations-section" className="topic-section topic-section--syntax">
              <div className="topic-section__header">
                <span className="topic-section__number">02</span>
                <div>
                  <h2 className="topic-section__title">Code Syntax & Language Mechanics</h2>
                  <p className="topic-section__desc">
                    Syntax patterns, compiler & runtime execution model, grammar templates, token breakdowns, and how to program strictly adhering to language specifications.
                  </p>
                </div>
              </div>

              <div className="topic-syntax-list">
                {comProgSyntaxItems.map((item, idx) => (
                  <CodeSyntaxInspector
                    key={idx}
                    syntaxItem={item}
                    index={idx}
                    onLoadToIDE={(snippet) => {
                      setComProgVizMode('ide');
                      window.dispatchEvent(
                        new CustomEvent('load-code-to-ide', { detail: { code: snippet } })
                      );
                      const labElem = document.getElementById('interactive-lab');
                      if (labElem) labElem.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                ))}
              </div>
            </section>
          ) : (
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
          )}

          {/* Section 3: Core Concepts & Insights */}
          {currentContent.keyConcepts?.length > 0 && (
            <section id="concepts-section" className="topic-section">
              <div className="topic-section__header">
                <span className="topic-section__number">03</span>
                <div>
                  <h2 className="topic-section__title">Core Concepts & Worked Examples</h2>
                  <p className="topic-section__desc">
                    Foundational principles, step-by-step calculations, and key geometric insights.
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
          {hasSubPages && !isTopicHomePage && (prevSubPage || nextSubPage) && (
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

      {/* Section 4: Sub-Topic Cards Directory (on Integral Home Page & Sub-Topic Pages) */}
      {hasSubPages && (
        <section id="subtopics-cards-section" className="topic-subtopics-directory">
          <div className="topic-section__header">
            <span className="topic-section__number">04</span>
            <div>
              <h2 className="topic-section__title">
                {isTopicHomePage
                  ? `${rawTopicData.title} — Sub-Topics & Techniques`
                  : `Explore More Chapters in ${rawTopicData.title}`}
              </h2>
              <p className="topic-section__desc">
                Select any sub-topic card below to open its dedicated explanation, governing equations, and interactive 2D/3D visualization page.
              </p>
            </div>
          </div>

          <div className="subtopics-cards-grid">
            {!isTopicHomePage && (
              <Link
                to={`/subjects/${subject.id}/${topicId}`}
                className="subtopic-nav-card subtopic-nav-card--home"
              >
                <div className="subtopic-nav-card__top">
                  <span className="subtopic-nav-card__badge">Chapter 1 · Home</span>
                  <span className="subtopic-nav-card__tag">Foundations</span>
                </div>
                <h3 className="subtopic-nav-card__title">
                  {rawTopicData.subPages[0].icon} {rawTopicData.subPages[0].title}
                </h3>
                <p className="subtopic-nav-card__desc">{rawTopicData.subPages[0].subtitle}</p>
                <div className="subtopic-nav-card__footer">
                  <span>{rawTopicData.subPages[0].equations?.length || 0} Core Formulas</span>
                  <span className="subtopic-nav-card__cta">← Back to Main Topic</span>
                </div>
              </Link>
            )}

            {otherSubTopicCards.map((sp) => {
              const chapNum = rawTopicData.subPages.findIndex((item) => item.id === sp.id) + 1;
              const previewEq = sp.equations?.[0]?.latex;
              return (
                <Link
                  key={sp.id}
                  to={`/subjects/${subject.id}/${topicId}/${sp.id}`}
                  className="subtopic-nav-card"
                >
                  <div className="subtopic-nav-card__top">
                    <span className="subtopic-nav-card__badge">Chapter {chapNum}</span>
                    {sp.tag && <span className="subtopic-nav-card__tag">{sp.tag}</span>}
                  </div>
                  <h3 className="subtopic-nav-card__title">
                    {sp.icon && <span aria-hidden="true">{sp.icon} </span>}
                    {sp.title}
                  </h3>
                  <p className="subtopic-nav-card__desc">{sp.subtitle}</p>
                  {previewEq && (
                    <div className="subtopic-nav-card__formula-preview">
                      <MathView math={previewEq} />
                    </div>
                  )}
                  <div className="subtopic-nav-card__footer">
                    <span>{sp.equations?.length || 0} Equations · 2D & 3D Lab</span>
                    <span className="subtopic-nav-card__cta">Open Page →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

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
