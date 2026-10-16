import { useState } from 'react';
import './CodeSyntaxInspector.css';

/**
 * CodeSyntaxInspector renders a comprehensive code-based syntax breakdown.
 * Explains how programming syntax works under the hood (compiler/runtime mechanics),
 * step-by-step rules to program following the syntax, token breakdowns, and common pitfalls.
 */
export default function CodeSyntaxInspector({ syntaxItem, index, onLoadToIDE }) {
  const [copied, setCopied] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);

  if (!syntaxItem) return null;

  const {
    title = 'Syntax Specification',
    tag,
    language = 'c',
    syntax = '',
    howItWorks = [],
    howToProgram = [],
    tokens = [],
    pitfalls = [],
    codeExample = '',
    expectedOutput = '',
  } = syntaxItem;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const workItems = Array.isArray(howItWorks) ? howItWorks : [howItWorks].filter(Boolean);
  const progItems = Array.isArray(howToProgram) ? howToProgram : [howToProgram].filter(Boolean);
  const pitfallItems = Array.isArray(pitfalls) ? pitfalls : [pitfalls].filter(Boolean);

  return (
    <article className="syntax-card">
      {/* Header */}
      <header className="syntax-card__header">
        <div className="syntax-card__title-row">
          <span className="syntax-card__badge">Syntax #{index != null ? index + 1 : 1}</span>
          <h3 className="syntax-card__title">{title}</h3>
        </div>
        <div className="syntax-card__tags">
          {tag && <span className="syntax-card__tag">{tag}</span>}
          <span className="syntax-card__lang-badge">{language.toUpperCase()}</span>
        </div>
      </header>

      {/* Syntax Specification Box */}
      <div className="syntax-card__pattern-box">
        <div className="syntax-card__pattern-header">
          <span className="syntax-card__pattern-label">Grammar / Syntax Pattern</span>
          <button
            type="button"
            className="syntax-card__copy-btn"
            onClick={() => handleCopy(syntax)}
            title="Copy syntax template"
          >
            {copied ? '✓ Copied' : '📋 Copy Pattern'}
          </button>
        </div>
        <pre className="syntax-card__code">
          <code>{syntax}</code>
        </pre>
      </div>

      {/* Two-Column Deep Dive: Under-the-Hood Mechanics vs How to Program */}
      <div className="syntax-card__breakdown-grid">
        {/* Column 1: How Does This Syntax Work */}
        <section className="syntax-panel syntax-panel--mechanics">
          <h4 className="syntax-panel__heading">
            <span aria-hidden="true">⚙️</span> How Does This Syntax Work?
          </h4>
          <p className="syntax-panel__subtext">
            Compiler translation, machine execution, memory allocation, and runtime semantics:
          </p>
          <ul className="syntax-panel__list">
            {workItems.map((item, i) => (
              <li key={i} className="syntax-panel__list-item">
                <span className="syntax-panel__bullet">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Column 2: How to Program Following This Syntax */}
        <section className="syntax-panel syntax-panel--programming">
          <h4 className="syntax-panel__heading">
            <span aria-hidden="true">📝</span> How to Program Following This Syntax
          </h4>
          <p className="syntax-panel__subtext">
            Step-by-step programming guidelines, declaration rules, and standard idioms:
          </p>
          <ol className="syntax-panel__ordered-list">
            {progItems.map((item, i) => (
              <li key={i} className="syntax-panel__ordered-item">
                <span className="syntax-panel__step-num">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Token Anatomy Breakdown */}
      {tokens.length > 0 && (
        <section className="syntax-card__tokens-section">
          <div className="syntax-card__tokens-header">
            <h4 className="syntax-card__tokens-title">
              <span>🔍 Syntax Anatomy & Token Breakdown</span>
              <span className="syntax-card__tokens-count">{tokens.length} elements</span>
            </h4>
            <span className="syntax-card__tokens-hint">Click any token to inspect constraints</span>
          </div>

          <div className="syntax-card__tokens-grid">
            {tokens.map((tok, idx) => {
              const isSelected = selectedToken === (tok.token || idx);
              return (
                <div
                  key={idx}
                  className={`token-card ${isSelected ? 'token-card--active' : ''}`}
                  onClick={() => setSelectedToken(isSelected ? null : tok.token || idx)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                >
                  <div className="token-card__top">
                    <code className="token-card__code">{tok.token}</code>
                    <span className="token-card__role">{tok.role}</span>
                  </div>
                  <p className="token-card__desc">{tok.description}</p>
                  {tok.rules && (
                    <div className="token-card__rules">
                      <span className="token-card__rule-label">Valid Rules:</span> {tok.rules}
                    </div>
                  )}
                  {tok.pitfall && (
                    <div className="token-card__pitfall">
                      <span className="token-card__pitfall-label">⚠️ Watch out:</span> {tok.pitfall}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Common Pitfalls & Antipatterns */}
      {pitfallItems.length > 0 && (
        <section className="syntax-card__pitfalls">
          <h4 className="syntax-card__pitfalls-title">
            <span aria-hidden="true">⚠️</span> Common Mistakes & Undefined Behaviors to Avoid
          </h4>
          <ul className="syntax-card__pitfalls-list">
            {pitfallItems.map((p, i) => (
              <li key={i} className="syntax-card__pitfall-item">
                <span className="syntax-card__pitfall-icon">✖</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Working Code Example & IDE Action */}
      {codeExample && (
        <section className="syntax-card__example">
          <div className="syntax-card__example-header">
            <span className="syntax-card__example-badge">💻 Verified Code Example</span>
            <div className="syntax-card__example-actions">
              {onLoadToIDE && (
                <button
                  type="button"
                  className="syntax-card__ide-btn"
                  onClick={() => onLoadToIDE(codeExample)}
                  title="Load this code snippet directly into the Interactive IDE above"
                >
                  🚀 Test in IDE Above
                </button>
              )}
              <button
                type="button"
                className="syntax-card__example-copy-btn"
                onClick={() => handleCopy(codeExample)}
              >
                📋 Copy Example
              </button>
            </div>
          </div>
          <pre className="syntax-card__example-code">
            <code>{codeExample}</code>
          </pre>
          {expectedOutput && (
            <div className="syntax-card__example-output">
              <span className="syntax-card__output-label">Expected Output:</span>
              <pre className="syntax-card__output-text">
                <code>{expectedOutput}</code>
              </pre>
            </div>
          )}
        </section>
      )}
    </article>
  );
}
