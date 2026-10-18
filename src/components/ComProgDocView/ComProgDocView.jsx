import { useState } from 'react';
import { Link } from 'react-router-dom';
import { C_HANDBOOK_PARTS, C_HANDBOOK_DOCS } from '../../data/comProgTopics/cHandbookDocs.js';
import { PY_HANDBOOK_PARTS, PY_HANDBOOK_DOCS } from '../../data/comProgTopics/pyHandbookDocs.js';
import CodeSyntaxInspector from '../CodeSyntaxInspector/CodeSyntaxInspector.jsx';
import './ComProgDocView.css';

/**
 * Helper: renders inline backtick `code` segments as styled <code> pills.
 */
function renderInlineCode(text) {
  if (!text || typeof text !== 'string') return text;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={idx} className="w3doc-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/**
 * Renders visual diagrams derived from CLI_WS/source lecture slides.
 */
function LectureDiagram({ diagram }) {
  if (!diagram) return null;

  if (diagram.type === 'memory-cells') {
    return (
      <div className="w3doc-diagram">
        <div className="w3doc-diagram__header">
          <span>🎓 {diagram.title}</span>
          <span className="w3doc-diagram__badge">Hardware Byte Cells</span>
        </div>
        <div className="w3doc-mem-grid">
          {diagram.cells.map((cell, i) => (
            <div key={i} className="w3doc-mem-cell">
              <span className="w3doc-mem-cell__addr">{cell.addr}</span>
              <strong className="w3doc-mem-cell__val">{cell.val}</strong>
              <span className="w3doc-mem-cell__type">{cell.type}</span>
              <span className="w3doc-mem-cell__note">{cell.note}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (diagram.type === 'ipo-flowchart') {
    return (
      <div className="w3doc-diagram">
        <div className="w3doc-diagram__header">
          <span>🎓 {diagram.title}</span>
          <span className="w3doc-diagram__badge">IPO & ANSI Flowchart</span>
        </div>
        <div className="w3doc-ipo-grid">
          {diagram.ipoExamples.map((ex, i) => (
            <div key={i} className="w3doc-ipo-card">
              <div className="w3doc-ipo-card__title">{ex.name}</div>
              <div className="w3doc-ipo-steps">
                <div className="w3doc-ipo-step w3doc-ipo-step--in">
                  <span>1. INPUT</span>
                  <strong>{ex.input}</strong>
                </div>
                <span className="w3doc-ipo-arrow">➔</span>
                <div className="w3doc-ipo-step w3doc-ipo-step--proc">
                  <span>2. PROCESS</span>
                  <strong>{ex.process}</strong>
                </div>
                <span className="w3doc-ipo-arrow">➔</span>
                <div className="w3doc-ipo-step w3doc-ipo-step--out">
                  <span>3. OUTPUT</span>
                  <strong>{ex.output}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w3doc-flowchart-symbols">
          {diagram.symbols.map((sym, i) => (
            <div key={i} className="w3doc-symbol-row">
              <span className="w3doc-symbol-shape">{sym.shape}</span>
              <span className="w3doc-symbol-desc">{renderInlineCode(sym.meaning)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (diagram.type === 'string-cells') {
    return (
      <div className="w3doc-diagram">
        <div className="w3doc-diagram__header">
          <span>🎓 {diagram.title}</span>
          <span className="w3doc-diagram__badge">Null-Terminated Char Array</span>
        </div>
        <div className="w3doc-string-arrays">
          {diagram.arrays.map((arr, i) => (
            <div key={i} className="w3doc-string-row">
              <code className="w3doc-string-row__label">{arr.name}</code>
              <div className="w3doc-string-boxes">
                {arr.cells.map((ch, idx) => {
                  const isNull = ch === '\\0';
                  return (
                    <div
                      key={idx}
                      className={`w3doc-char-box ${isNull ? 'w3doc-char-box--null' : ''}`}
                    >
                      <span className="w3doc-char-box__idx">[{idx}]</span>
                      <strong className="w3doc-char-box__ch">{ch}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (diagram.type === 'py-references') {
    return (
      <div className="w3doc-diagram">
        <div className="w3doc-diagram__header">
          <span>🎓 {diagram.title}</span>
          <span className="w3doc-diagram__badge">Name → Heap PyObject</span>
        </div>
        <div className="w3doc-pyref-list">
          {diagram.bindings.map((b, i) => (
            <div key={i} className="w3doc-pyref-row">
              <div className="w3doc-pyref-name">
                <span>Variable Name</span>
                <code>{b.varName}</code>
              </div>
              <span className="w3doc-pyref-arrow">{b.arrow}</span>
              <div className="w3doc-pyref-obj">
                <span className="w3doc-pyref-obj__meta">
                  type: <strong>{b.objType}</strong> · id: <code>{b.objId}</code>
                </span>
                <strong className="w3doc-pyref-obj__val">{b.objVal}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

/**
 * W3Schools + Handbook Documentation View for C Programming & Python Programming.
 */
export default function ComProgDocView({
  subjectId,
  topicId,
  rawTopicData,
  activeSubPage,
  isTopicHomePage,
  subCurrentIndex,
  prevSubPage,
  nextSubPage,
  syntaxItems = [],
  onTryCodeInIDE,
  renderInteractiveLab,
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [showChapterMenu, setShowChapterMenu] = useState(true);

  const isPython = topicId === 'py-programming';
  const partsList = isPython ? PY_HANDBOOK_PARTS : C_HANDBOOK_PARTS;
  const docsMap = isPython ? PY_HANDBOOK_DOCS : C_HANDBOOK_DOCS;

  const activeSubId = activeSubPage?.id || 'foundations';
  const docEntry = docsMap[activeSubId] || docsMap.foundations;
  const subPages = rawTopicData?.subPages || [];

  const handleCopy = (code, id) => {
    navigator.clipboard?.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const getSubPageUrl = (spId, idx) =>
    idx === 0
      ? `/subjects/${subjectId}/${topicId}`
      : `/subjects/${subjectId}/${topicId}/${spId}`;

  const prevUrl = prevSubPage
    ? getSubPageUrl(prevSubPage.id, subCurrentIndex - 1)
    : `/subjects/${subjectId}`;
  const nextUrl = nextSubPage
    ? getSubPageUrl(nextSubPage.id, subCurrentIndex + 1)
    : null;

  return (
    <div className="w3doc-shell">
      {/* Left W3Schools-Style Tutorial Chapter Sidebar */}
      <aside className={`w3doc-sidebar ${showChapterMenu ? 'w3doc-sidebar--open' : 'w3doc-sidebar--collapsed'}`}>
        <div className="w3doc-sidebar__top">
          <div className="w3doc-sidebar__brand">
            <span className="w3doc-sidebar__lang-icon">{isPython ? '🐍' : '⚡'}</span>
            <div>
              <h2 className="w3doc-sidebar__title">{rawTopicData.title}</h2>
              <span className="w3doc-sidebar__sub">
                {isPython ? 'Python 3.12 Tutorial & Reference' : 'ISO C99/C11 Tutorial & Reference'}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="w3doc-sidebar__toggle"
            onClick={() => setShowChapterMenu((v) => !v)}
            title={showChapterMenu ? 'Collapse tutorial chapters' : 'Expand tutorial chapters'}
          >
            {showChapterMenu ? '❮' : '❯'}
          </button>
        </div>

        {showChapterMenu && (
          <nav className="w3doc-sidebar__nav" aria-label="Tutorial Chapters">
            {partsList.map((group, gIdx) => (
              <div key={gIdx} className="w3doc-part-group">
                <div className="w3doc-part-heading">{group.part}</div>
                <ul className="w3doc-chapter-list">
                  {group.chapters.map((chId) => {
                    const spIdx = subPages.findIndex((s) => s.id === chId);
                    const sp = subPages[spIdx];
                    if (!sp) return null;
                    const isActive =
                      (isTopicHomePage && spIdx === 0) || activeSubPage?.id === sp.id;
                    return (
                      <li key={sp.id}>
                        <Link
                          to={getSubPageUrl(sp.id, spIdx)}
                          className={`w3doc-chapter-link ${isActive ? 'w3doc-chapter-link--active' : ''}`}
                        >
                          <span className="w3doc-chapter-link__num">
                            {String(spIdx + 1).padStart(2, '0')}
                          </span>
                          <span className="w3doc-chapter-link__text">{sp.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        )}
      </aside>

      {/* Main Documentation Article & Interactive IDE Column */}
      <div className="w3doc-main">
        {/* Top W3Schools Navigation Bar */}
        <div className="w3doc-nav-bar">
          <Link to={prevUrl} className="w3doc-nav-btn w3doc-nav-btn--prev">
            ❮ {prevSubPage ? `Prev: ${prevSubPage.title}` : `Back to Com-Prog`}
          </Link>

          <div className="w3doc-nav-meta">
            <span className="w3doc-nav-meta__pill">
              Chapter {subCurrentIndex + 1} of {subPages.length}
            </span>
            {!showChapterMenu && (
              <button
                type="button"
                className="w3doc-show-chapters-btn"
                onClick={() => setShowChapterMenu(true)}
              >
                📚 Show Tutorial Index
              </button>
            )}
          </div>

          {nextUrl ? (
            <Link to={nextUrl} className="w3doc-nav-btn w3doc-nav-btn--next">
              Next: {nextSubPage.title} ❯
            </Link>
          ) : (
            <Link to={`/subjects/${subjectId}`} className="w3doc-nav-btn w3doc-nav-btn--next">
              All Com-Prog Topics ❯
            </Link>
          )}
        </div>

        {/* Document Handbook Header Banner (Matching CLI_WS/Document PDF style) */}
        <header className="w3doc-hero">
          <div className="w3doc-hero__eyebrow-row">
            <span className="w3doc-hero__chapter-badge">
              {docEntry?.chapterBadge || `CHAPTER ${subCurrentIndex + 1}`}
            </span>
            <span className="w3doc-hero__part-badge">
              {docEntry?.partBadge || activeSubPage?.tag || 'COMPREHENSIVE MASTER HANDBOOK'}
            </span>
          </div>

          <h1 className="w3doc-hero__title">
            {activeSubPage?.title || rawTopicData.title}
          </h1>

          {activeSubPage?.subtitle && (
            <p className="w3doc-hero__subtitle">{activeSubPage.subtitle}</p>
          )}

          {/* Quick Jump to Sections on This Page */}
          {docEntry?.sections?.length > 0 && (
            <div className="w3doc-jump-bar">
              <span className="w3doc-jump-bar__label">On this page:</span>
              {docEntry.sections.map((sec) => (
                <a
                  key={sec.num}
                  href={`#doc-sec-${sec.num}`}
                  className="w3doc-jump-chip"
                >
                  {sec.num} {sec.title.split('&')[0].trim()}
                </a>
              ))}
              <a href="#interactive-lab" className="w3doc-jump-chip w3doc-jump-chip--ide">
                💻 Interactive IDE & Visualizer
              </a>
              <a href="#equations-section" className="w3doc-jump-chip">
                🔍 Syntax Reference
              </a>
            </div>
          )}
        </header>

        {/* Numbered Handbook Documentation Sections (1.1, 1.2, 1.3...) */}
        <div className="w3doc-sections-flow">
          {docEntry?.sections?.map((sec) => (
            <section
              key={sec.num}
              id={`doc-sec-${sec.num}`}
              className="w3doc-section"
            >
              <h2 className="w3doc-section__heading">
                <span className="w3doc-section__num">{sec.num}</span>
                <span>{sec.title}</span>
              </h2>

              {sec.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="w3doc-paragraph">
                  {renderInlineCode(p)}
                </p>
              ))}

              {sec.bullets?.length > 0 && (
                <ul className="w3doc-bullet-list">
                  {sec.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="w3doc-bullet-item">
                      {renderInlineCode(b)}
                    </li>
                  ))}
                </ul>
              )}

              {/* Visual Lecture Slide Diagram */}
              {sec.diagram && <LectureDiagram diagram={sec.diagram} />}

              {/* Structured Handbook Reference Table */}
              {sec.table && (
                <div className="w3doc-table-wrap">
                  <table className="w3doc-table">
                    <thead>
                      <tr>
                        {sec.table.headers.map((h, hIdx) => (
                          <th key={hIdx}>{renderInlineCode(h)}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{renderInlineCode(cell)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* W3Schools-Style "Example" Box with "Try it Yourself »" */}
              {sec.example && (
                <div className="w3doc-example-card">
                  <div className="w3doc-example-card__header">
                    <div className="w3doc-example-card__title">
                      <span className="w3doc-example-card__dot" />
                      <span>{sec.example.title}</span>
                    </div>
                    <div className="w3doc-example-card__actions">
                      <button
                        type="button"
                        className="w3doc-copy-btn"
                        onClick={() => handleCopy(sec.example.code, sec.num)}
                      >
                        {copiedId === sec.num ? '✓ Copied' : '📋 Copy'}
                      </button>
                      <button
                        type="button"
                        className="w3doc-try-btn"
                        onClick={() =>
                          onTryCodeInIDE?.(
                            sec.example.code,
                            sec.example.output,
                            sec.example.title
                          )
                        }
                      >
                        Try it Yourself in IDE ❯
                      </button>
                    </div>
                  </div>

                  <pre className="w3doc-example-card__code">
                    <code>{sec.example.code}</code>
                  </pre>

                  {sec.example.output && (
                    <div className="w3doc-output-box">
                      <div className="w3doc-output-box__label">
                        SAMPLE EXECUTION OUTPUT
                      </div>
                      <pre className="w3doc-output-box__pre">
                        <code>{sec.example.output}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* Handbook Callout Box (Tip / Critical / Warning) */}
              {sec.callout && (
                <div className={`w3doc-callout w3doc-callout--${sec.callout.type}`}>
                  <div className="w3doc-callout__title">
                    <span>
                      {sec.callout.type === 'tip'
                        ? '💡'
                        : sec.callout.type === 'critical'
                        ? '⚡'
                        : '⚠️'}
                    </span>
                    <strong>{sec.callout.title}</strong>
                  </div>
                  <p className="w3doc-callout__body">
                    {renderInlineCode(sec.callout.body)}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Embedded Interactive IDE & Data/Memory Visualizer Workbench */}
        <div className="w3doc-lab-dock">
          {renderInteractiveLab?.()}
        </div>

        {/* Code Syntax & Grammar Reference Cards */}
        {syntaxItems.length > 0 && (
          <section id="equations-section" className="w3doc-syntax-section">
            <div className="w3doc-syntax-section__header">
              <span className="w3doc-section__num">Syntax</span>
              <div>
                <h2 className="w3doc-syntax-section__title">
                  Grammar Rules, Compiler Mechanics & Token Breakdown
                </h2>
                <p className="w3doc-syntax-section__sub">
                  Detailed breakdown of syntax templates, under-the-hood execution, and token constraints.
                </p>
              </div>
            </div>

            <div className="topic-syntax-list">
              {syntaxItems.map((item, idx) => (
                <CodeSyntaxInspector
                  key={idx}
                  syntaxItem={item}
                  index={idx}
                  onLoadToIDE={(snippet) =>
                    onTryCodeInIDE?.(snippet, item.expectedOutput, item.title)
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Bottom W3Schools Prev / Next Chapter Navigation Bar */}
        <div className="w3doc-nav-bar w3doc-nav-bar--bottom">
          <Link to={prevUrl} className="w3doc-nav-btn w3doc-nav-btn--prev">
            ❮ {prevSubPage ? `Previous: ${prevSubPage.title}` : `Back to Com-Prog`}
          </Link>

          <span className="w3doc-nav-meta__pill">
            {rawTopicData.title} · Chapter {subCurrentIndex + 1} of {subPages.length}
          </span>

          {nextUrl ? (
            <Link to={nextUrl} className="w3doc-nav-btn w3doc-nav-btn--next">
              Next Chapter: {nextSubPage.title} ❯
            </Link>
          ) : (
            <Link to={`/subjects/${subjectId}`} className="w3doc-nav-btn w3doc-nav-btn--next">
              Finish & Return to Com-Prog ❯
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
