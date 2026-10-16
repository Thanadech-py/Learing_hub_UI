import { useState } from 'react';
import MathView from '../MathView/MathView.jsx';
import './EquationInspector.css';

/**
 * EquationInspector renders an equation with an in-depth breakdown of every variable,
 * its physical meaning, SI units, and how it connects/influences other variables.
 */
export default function EquationInspector({ equation, index }) {
  const [activeVar, setActiveVar] = useState(null);

  if (!equation) return null;

  const { name, latex, summary, exampleLatex, exampleDescription, variables = [], conditions = [] } = equation;

  return (
    <article className="eq-card">
      <header className="eq-card__header">
        <div className="eq-card__title-row">
          <span className="eq-card__badge">Equation {index != null ? `#${index + 1}` : ''}</span>
          <h3 className="eq-card__title">{name}</h3>
        </div>
        {conditions.length > 0 && (
          <div className="eq-card__conditions">
            <span className="eq-card__cond-label">Applies when:</span>
            {conditions.map((cond, i) => (
              <span key={i} className="eq-card__cond-tag">{cond}</span>
            ))}
          </div>
        )}
      </header>

      {/* Main Formula */}
      <div className="eq-card__formula-box">
        <MathView math={latex} block className="eq-card__formula" />
      </div>

      {summary && <p className="eq-card__summary">{summary}</p>}

      {exampleLatex && (
        <div className="eq-card__example-box">
          <div className="eq-card__example-header">
            <span className="eq-card__example-badge">🧮 Worked Matrix / Vector Calculation</span>
            {exampleDescription && <span className="eq-card__example-desc">{exampleDescription}</span>}
          </div>
          <MathView math={exampleLatex} block className="eq-card__example-math" />
        </div>
      )}

      {/* Variable Breakdown */}
      <div className="eq-card__variables-section">
        <h4 className="eq-card__subheading">
          <span>Variable Breakdown & Interconnections</span>
          <span className="eq-card__count">{variables.length} variables</span>
        </h4>

        <div className="eq-card__vars-grid">
          {variables.map((v) => {
            const isSelected = activeVar === v.symbol;
            return (
              <div
                key={v.symbol}
                className={`var-card ${isSelected ? 'var-card--active' : ''}`}
                onClick={() => setActiveVar(isSelected ? null : v.symbol)}
                tabIndex={0}
                role="button"
                aria-pressed={isSelected}
              >
                <div className="var-card__top">
                  <span className="var-card__symbol">
                    <MathView math={v.symbol} />
                  </span>
                  <div className="var-card__identity">
                    <span className="var-card__name">{v.name}</span>
                    {v.unit && (
                      <span className="var-card__unit">
                        Unit: <MathView math={v.unit} />
                      </span>
                    )}
                  </div>
                </div>

                <p className="var-card__desc">{v.description}</p>

                {v.connections && (
                  <div className="var-card__connections">
                    <span className="var-card__conn-label">How it connects:</span>
                    <p className="var-card__conn-text">{v.connections}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
