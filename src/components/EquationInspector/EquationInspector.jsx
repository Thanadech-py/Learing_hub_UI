import { useState } from 'react';
import MathView from '../MathView/MathView.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import './EquationInspector.css';

/**
 * EquationInspector renders an equation with an in-depth breakdown of every variable,
 * its physical meaning, SI units, and how it connects/influences other variables.
 */
export default function EquationInspector({ equation, index }) {
  const { t } = useLanguage();
  const [activeVar, setActiveVar] = useState(null);

  if (!equation) return null;

  const { name, latex, summary, exampleLatex, exampleDescription, variables = [], conditions = [] } = equation;

  return (
    <article className="eq-card">
      <header className="eq-card__header">
        <div className="eq-card__title-row">
          <span className="eq-card__badge">
            {t('Equation', 'สมการที่')} {index != null ? `#${index + 1}` : ''}
          </span>
          <h3 className="eq-card__title">{name}</h3>
        </div>
        {conditions.length > 0 && (
          <div className="eq-card__conditions">
            <span className="eq-card__cond-label">{t('Applies when:', 'เงื่อนไขการใช้งาน:')}</span>
            {conditions.map((cond, i) => (
              <span key={i} className="eq-card__cond-tag">{cond}</span>
            ))}
          </div>
        )}
      </header>

      {/* Main Formula */}
      <div className="eq-card__formula-box">
        <MathView
          math={latex}
          block
          fit
          expandable
          title={name}
          description={summary}
          className="eq-card__formula"
        />
      </div>

      {summary && <p className="eq-card__summary">{summary}</p>}

      {exampleLatex && (
        <div className="eq-card__example-box">
          <div className="eq-card__example-header">
            <span className="eq-card__example-badge">
              {t('🧮 Worked Matrix / Vector Calculation', '🧮 ตัวอย่างการคำนวณเมทริกซ์ / เวกเตอร์')}
            </span>
            {exampleDescription && <span className="eq-card__example-desc">{exampleDescription}</span>}
          </div>
          <MathView
            math={exampleLatex}
            block
            fit
            expandable
            title={`${name || t('Worked Example', 'ตัวอย่างการคำนวณ')} — ${t('Worked Example', 'ตัวอย่างการคำนวณ')}`}
            description={exampleDescription}
            className="eq-card__example-math"
          />
        </div>
      )}

      {/* Variable Breakdown */}
      <div className="eq-card__variables-section">
        <h4 className="eq-card__subheading">
          <span>
            {t('Variable Breakdown & Interconnections', 'การแยกย่อยความหมายของตัวแปรและความเชื่อมโยง')}
          </span>
          <span className="eq-card__count">
            {t(`${variables.length} variables`, `${variables.length} ตัวแปร`)}
          </span>
        </h4>

        <div className="eq-card__vars-grid">
          {variables.map((v, vIdx) => {
            const isSelected = activeVar === (v.symbol || vIdx);
            return (
              <div
                key={v.symbol || vIdx}
                className={`var-card ${isSelected ? 'var-card--active' : ''}`}
                onClick={() => setActiveVar(isSelected ? null : v.symbol || vIdx)}
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
                        {t('Unit:', 'หน่วย:')} <MathView math={v.unit} />
                      </span>
                    )}
                  </div>
                </div>

                <p className="var-card__desc">{v.description}</p>

                {v.connections && (
                  <div className="var-card__connections">
                    <span className="var-card__conn-label">
                      {t('How it connects:', 'ความเชื่อมโยงกับตัวแปรอื่น:')}
                    </span>
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
