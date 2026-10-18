import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

const TABULAR_EXAMPLES = [
  {
    id: 'poly-exp',
    title: '∫ x² e^x dx',
    uName: 'x²',
    dvName: 'e^x dx',
    rows: [
      { d: 'x²', i: 'e^x', sign: '+', term: '+ x² e^x' },
      { d: '2x', i: 'e^x', sign: '-', term: '- 2x e^x' },
      { d: '2', i: 'e^x', sign: '+', term: '+ 2 e^x' },
      { d: '0', i: 'e^x', sign: 'stop', term: 'Terminates at 0' },
    ],
    finalResult: 'e^x (x² - 2x + 2) + C',
  },
  {
    id: 'poly-trig',
    title: '∫ x³ cos(x) dx',
    uName: 'x³',
    dvName: 'cos(x) dx',
    rows: [
      { d: 'x³', i: 'cos(x)', sign: '+', term: '+ x³ sin(x)' },
      { d: '3x²', i: 'sin(x)', sign: '-', term: '- 3x² (-cos(x)) = + 3x² cos(x)' },
      { d: '6x', i: '-cos(x)', sign: '+', term: '+ 6x (-sin(x)) = - 6x sin(x)' },
      { d: '6', i: '-sin(x)', sign: '-', term: '- 6 (cos(x)) = - 6 cos(x)' },
      { d: '0', i: 'cos(x)', sign: 'stop', term: 'Terminates at 0' },
    ],
    finalResult: '(x³ - 6x) sin(x) + (3x² - 6) cos(x) + C',
  },
  {
    id: 'exp-cos-cyclic',
    title: '∫ e^(ax) cos(bx) dx (Cyclic)',
    uName: 'cos(bx)',
    dvName: 'e^(ax) dx',
    rows: [
      { d: 'cos(bx)', i: 'e^(ax)', sign: '+', term: '+ (1/a) e^(ax) cos(bx)' },
      { d: '-b sin(bx)', i: '(1/a) e^(ax)', sign: '-', term: '+ (b/a²) e^(ax) sin(bx)' },
      { d: '-b² cos(bx)', i: '(1/a²) e^(ax)', sign: 'loop', term: 'Row integral: - (b²/a²) ∫ e^(ax) cos(bx) dx' },
    ],
    finalResult: '[e^(ax) / (a² + b²)] · (a cos(bx) + b sin(bx)) + C',
  },
  {
    id: 'exp-sin-cyclic',
    title: '∫ e^(ax) sin(bx) dx (Cyclic)',
    uName: 'sin(bx)',
    dvName: 'e^(ax) dx',
    rows: [
      { d: 'sin(bx)', i: 'e^(ax)', sign: '+', term: '+ (1/a) e^(ax) sin(bx)' },
      { d: 'b cos(bx)', i: '(1/a) e^(ax)', sign: '-', term: '- (b/a²) e^(ax) cos(bx)' },
      { d: '-b² sin(bx)', i: '(1/a²) e^(ax)', sign: 'loop', term: 'Row integral: - (b²/a²) ∫ e^(ax) sin(bx) dx' },
    ],
    finalResult: '[e^(ax) / (a² + b²)] · (a sin(bx) - b cos(bx)) + C',
  },
  {
    id: 'exp-tan-cancel',
    title: '∫ e^(ax)[a tan(bx) + b sec²(bx)] dx',
    uName: 'tan(bx)',
    dvName: 'a e^(ax) dx',
    rows: [
      { d: 'tan(bx)', i: 'a e^(ax)', sign: '+', term: '+ e^(ax) tan(bx)' },
      { d: 'b sec²(bx)', i: 'e^(ax)', sign: 'cancel', term: '- ∫ b e^(ax) sec²(bx) dx (Cancels + ∫ b e^(ax) sec²(bx) dx!)' },
    ],
    finalResult: 'e^(ax) tan(bx) + C',
  },
];

export default function IntegrationByPartsViz() {
  const [viewMode, setViewMode] = useState('geom'); // 'geom' | 'tabular' | 'exptrig'

  // Geometric Mode State
  const [paramA, setParamA] = useState(1.0);
  const [paramB, setParamB] = useState(2.8);

  // Tabular Mode State
  const [tabIndex, setTabIndex] = useState(0);

  // Exponential-Trig Mode State
  const [expTrigType, setExpTrigType] = useState('cos'); // 'cos' | 'sin' | 'tan'
  const [expRateA, setExpRateA] = useState(0.5);
  const [trigFreqB, setTrigFreqB] = useState(2.0);

  const canvasRef = useRef(null);
  const expCanvasRef = useRef(null);

  // Smooth monotonic curve for geometric IBP demonstration
  const uFn = (t) => t;
  const vFn = (t) => 0.4 * t * t + 0.5;

  const uA = uFn(paramA);
  const vA = vFn(paramA);
  const uB = uFn(paramB);
  const vB = vFn(paramB);

  // Corner rectangle area [uv]_a^b = u(b)v(b) - u(a)v(a)
  const uvCornerArea = uB * vB - uA * vA;

  // Exact analytical integration:
  const intUdv = (0.8 / 3) * Math.pow(paramB, 3) - (0.8 / 3) * Math.pow(paramA, 3);
  const intVdu =
    (0.4 / 3) * Math.pow(paramB, 3) +
    0.5 * paramB -
    ((0.4 / 3) * Math.pow(paramA, 3) + 0.5 * paramA);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewMode !== 'geom') return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = 90;
    const originY = height - 65;
    const scaleU = 180;
    const scaleV = (height - 110) / 4.2;

    // Coordinate grid & axes
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let u = 0; u <= 4; u += 0.5) {
      const px = originX + u * scaleU;
      ctx.beginPath();
      ctx.moveTo(px, 25);
      ctx.lineTo(px, originY);
      ctx.stroke();
    }
    for (let v = 0; v <= 4; v += 0.5) {
      const py = originY - v * scaleV;
      ctx.beginPath();
      ctx.moveTo(originX, py);
      ctx.lineTo(width - 40, py);
      ctx.stroke();
    }

    // Axes lines
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, originY);
    ctx.lineTo(width - 30, originY);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('u(x) axis →', width - 115, originY + 35);
    ctx.fillText('↑ v(x) axis', 15, 35);

    const toPx = (u, v) => ({
      x: originX + u * scaleU,
      y: originY - v * scaleV,
    });

    // 1. Shade ∫ v du (Area between curve and u-axis from u(a) to u(b))
    ctx.fillStyle = 'rgba(167, 139, 250, 0.28)';
    ctx.beginPath();
    const pStartU = toPx(uA, 0);
    ctx.moveTo(pStartU.x, pStartU.y);
    for (let i = 0; i <= 50; i++) {
      const t = paramA + (i / 50) * (paramB - paramA);
      const pt = toPx(uFn(t), vFn(t));
      ctx.lineTo(pt.x, pt.y);
    }
    const pEndU = toPx(uB, 0);
    ctx.lineTo(pEndU.x, pEndU.y);
    ctx.closePath();
    ctx.fill();

    // 2. Shade ∫ u dv (Area between curve and v-axis from v(a) to v(b))
    ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
    ctx.beginPath();
    const pStartV = toPx(0, vA);
    ctx.moveTo(pStartV.x, pStartV.y);
    for (let i = 0; i <= 50; i++) {
      const t = paramA + (i / 50) * (paramB - paramA);
      const pt = toPx(uFn(t), vFn(t));
      ctx.lineTo(pt.x, pt.y);
    }
    const pEndV = toPx(0, vB);
    ctx.lineTo(pEndV.x, pEndV.y);
    ctx.closePath();
    ctx.fill();

    // Dashed bounding rectangles
    const pCornerB = toPx(uB, vB);
    const pCornerA = toPx(uA, vA);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(originX, pCornerB.y, pCornerB.x - originX, originY - pCornerB.y);
    ctx.strokeStyle = '#64748b';
    ctx.strokeRect(originX, pCornerA.y, pCornerA.x - originX, originY - pCornerA.y);
    ctx.setLineDash([]);

    // Draw curve (u(t), v(t))
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 80; i++) {
      const t = 0.5 + (i / 80) * 3.0;
      const pt = toPx(uFn(t), vFn(t));
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();

    // Endpoint dots
    [
      { pt: pCornerA, label: `(u(a), v(a)) = (${uA.toFixed(1)}, ${vA.toFixed(1)})` },
      { pt: pCornerB, label: `(u(b), v(b)) = (${uB.toFixed(1)}, ${vB.toFixed(1)})` },
    ].forEach((dot) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(dot.pt.x, dot.pt.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(dot.label, dot.pt.x + 8, dot.pt.y - 6);
    });

    // Area callout labels
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`∫ u dv = ${intUdv.toFixed(2)} (Cyan)`, pCornerA.x + 15, pCornerB.y + 35);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText(`∫ v du = ${intVdu.toFixed(2)} (Purple)`, pCornerA.x + 20, pCornerA.y - 20);
  }, [viewMode, paramA, paramB, uA, vA, uB, vB, intUdv, intVdu]);

  // Draw Exponential-Trig curves
  useEffect(() => {
    const canvas = expCanvasRef.current;
    if (!canvas || viewMode !== 'exptrig') return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const midY = height / 2;
    const leftX = 65;
    const plotW = width - 95;
    const xMin = -1.2;
    const xMax = 2.4;

    const toPx = (x, y) => ({
      x: leftX + ((x - xMin) / (xMax - xMin)) * plotW,
      y: midY - y * 48,
    });

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = -1; x <= 2.4; x += 0.5) {
      const p = toPx(x, 0);
      ctx.beginPath();
      ctx.moveTo(p.x, 20);
      ctx.lineTo(p.x, height - 25);
      ctx.stroke();
    }
    for (let y = -4; y <= 4; y += 1) {
      const p = toPx(0, y);
      ctx.beginPath();
      ctx.moveTo(leftX, p.y);
      ctx.lineTo(width - 30, p.y);
      ctx.stroke();
    }

    // Axes
    const origin = toPx(0, 0);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftX, origin.y);
    ctx.lineTo(width - 30, origin.y);
    ctx.moveTo(origin.x, 20);
    ctx.lineTo(origin.x, height - 25);
    ctx.stroke();

    const a = expRateA;
    const b = trigFreqB;
    const denom = a * a + b * b;

    const evalIntegrand = (x) => {
      if (expTrigType === 'cos') return Math.exp(a * x) * Math.cos(b * x);
      if (expTrigType === 'sin') return Math.exp(a * x) * Math.sin(b * x);
      const c = Math.cos(b * x);
      if (Math.abs(c) < 0.18) return NaN;
      return Math.exp(a * x) * (a * Math.tan(b * x) + b / (c * c));
    };

    const evalAntideriv = (x) => {
      if (expTrigType === 'cos') {
        return (Math.exp(a * x) / denom) * (a * Math.cos(b * x) + b * Math.sin(b * x));
      }
      if (expTrigType === 'sin') {
        return (Math.exp(a * x) / denom) * (a * Math.sin(b * x) - b * Math.cos(b * x));
      }
      const c = Math.cos(b * x);
      if (Math.abs(c) < 0.18) return NaN;
      return Math.exp(a * x) * Math.tan(b * x);
    };

    // Draw ±e^(ax) envelope
    if (expTrigType !== 'tan') {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      [1, -1].forEach((sgn) => {
        ctx.beginPath();
        for (let i = 0; i <= 160; i++) {
          const x = xMin + (i / 160) * (xMax - xMin);
          const p = toPx(x, sgn * Math.exp(a * x));
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    // Draw Integrand f(x) in Cyan
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let penDown = false;
    for (let i = 0; i <= 240; i++) {
      const x = xMin + (i / 240) * (xMax - xMin);
      const y = evalIntegrand(x);
      if (isNaN(y) || Math.abs(y) > 8) {
        penDown = false;
        continue;
      }
      const p = toPx(x, y);
      if (!penDown) {
        ctx.moveTo(p.x, p.y);
        penDown = true;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.stroke();

    // Draw Antiderivative F(x) in Emerald
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    penDown = false;
    for (let i = 0; i <= 240; i++) {
      const x = xMin + (i / 240) * (xMax - xMin);
      const y = evalAntideriv(x);
      if (isNaN(y) || Math.abs(y) > 8) {
        penDown = false;
        continue;
      }
      const p = toPx(x, y);
      if (!penDown) {
        ctx.moveTo(p.x, p.y);
        penDown = true;
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.stroke();

    // Legend
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('— Integrand f(x) (Cyan)', leftX + 15, 38);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('— Exact Antiderivative F(x) = ∫ f(x) dx (Green)', leftX + 200, 38);
  }, [viewMode, expTrigType, expRateA, trigFreqB]);

  const curTab = TABULAR_EXAMPLES[tabIndex];
  const denomVal = (expRateA * expRateA + trigFreqB * trigFreqB).toFixed(2);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Integration by Parts & Tabular DI Lab</h3>
          <span className="viz-header__tag">∫ u dv = uv - ∫ v du • Cyclic e^(ax)·Trig & DI Stepper</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${viewMode === 'geom' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setViewMode('geom')}
          >
            Geometric Area Proof
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${viewMode === 'exptrig' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setViewMode('exptrig')}
          >
            e^(ax) · (cos / sin / tan)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${viewMode === 'tabular' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setViewMode('tabular')}
          >
            Tabular (DI) Stepper
          </button>
        </div>
      </header>

      {viewMode === 'geom' ? (
        <>
          <div className="viz-metrics-bar">
            <MetricBadge label="Rectangle Area [uv]ₐᵇ" value={uvCornerArea.toFixed(3)} unit="u(b)v(b) - u(a)v(a)" highlight />
            <MetricBadge label="∫ u dv (Cyan)" value={intUdv.toFixed(3)} unit="" />
            <MetricBadge label="∫ v du (Purple)" value={intVdu.toFixed(3)} unit="" />
            <MetricBadge
              label="Area Sum: ∫ u dv + ∫ v du"
              value={(intUdv + intVdu).toFixed(3)}
              unit={`≡ [uv] (${uvCornerArea.toFixed(3)})`}
              highlight
            />
          </div>

          <div className="viz-canvas-area" style={{ height: '480px' }}>
            <canvas ref={canvasRef} width={840} height={480} />
          </div>

          <div className="viz-controls-panel">
            <div className="viz-sliders-grid">
              <SliderControl
                label="Lower Bound a"
                value={paramA}
                min={0.6}
                max={paramB - 0.2}
                step={0.1}
                onChange={(v) => setParamA(Math.min(v, paramB - 0.2))}
              />
              <SliderControl
                label="Upper Bound b"
                value={paramB}
                min={paramA + 0.2}
                max={3.4}
                step={0.1}
                onChange={(v) => setParamB(Math.max(v, paramA + 0.2))}
              />
            </div>
          </div>
        </>
      ) : viewMode === 'exptrig' ? (
        <>
          <div className="viz-presets-bar">
            <span className="viz-presets-bar__label">Select Exponential-Trig Family:</span>
            <button
              type="button"
              className={`viz-preset-chip ${expTrigType === 'cos' ? 'viz-preset-chip--active' : ''}`}
              onClick={() => setExpTrigType('cos')}
            >
              I = ∫ e^(ax) cos(bx) dx
            </button>
            <button
              type="button"
              className={`viz-preset-chip ${expTrigType === 'sin' ? 'viz-preset-chip--active' : ''}`}
              onClick={() => setExpTrigType('sin')}
            >
              I = ∫ e^(ax) sin(bx) dx
            </button>
            <button
              type="button"
              className={`viz-preset-chip ${expTrigType === 'tan' ? 'viz-preset-chip--active' : ''}`}
              onClick={() => setExpTrigType('tan')}
            >
              I = ∫ e^(ax)[a tan(bx) + b sec²(bx)] dx
            </button>
          </div>

          <div className="viz-metrics-bar">
            <MetricBadge label="Exponential Rate a" value={expRateA.toFixed(1)} unit="" />
            <MetricBadge label="Angular Freq b" value={trigFreqB.toFixed(1)} unit="rad" />
            <MetricBadge label="Denominator (a² + b²)" value={denomVal} unit={`${(expRateA * expRateA).toFixed(2)} + ${(trigFreqB * trigFreqB).toFixed(2)}`} highlight />
            <MetricBadge
              label="Closed-Form Antiderivative I"
              value={
                expTrigType === 'cos'
                  ? `(e^(${expRateA}x)/${denomVal})(${expRateA}cos(${trigFreqB}x) + ${trigFreqB}sin(${trigFreqB}x))`
                  : expTrigType === 'sin'
                  ? `(e^(${expRateA}x)/${denomVal})(${expRateA}sin(${trigFreqB}x) - ${trigFreqB}cos(${trigFreqB}x))`
                  : `e^(${expRateA}x) tan(${trigFreqB}x) + C`
              }
              unit=""
              highlight
            />
          </div>

          <div className="viz-canvas-area" style={{ height: '440px' }}>
            <canvas ref={expCanvasRef} width={840} height={440} />
          </div>

          <div className="viz-controls-panel">
            <div className="viz-sliders-grid">
              <SliderControl
                label="Exponential Rate (a)"
                value={expRateA}
                min={-1.5}
                max={1.5}
                step={0.1}
                onChange={setExpRateA}
              />
              <SliderControl
                label="Trig Frequency (b)"
                value={trigFreqB}
                min={0.5}
                max={5.0}
                step={0.5}
                onChange={setTrigFreqB}
              />
            </div>
          </div>
        </>
      ) : (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="viz-presets-bar" style={{ padding: 0, border: 'none' }}>
            <span className="viz-presets-bar__label">Select Example:</span>
            {TABULAR_EXAMPLES.map((ex, i) => (
              <button
                key={ex.id}
                type="button"
                className={`viz-preset-chip ${tabIndex === i ? 'viz-preset-chip--active' : ''}`}
                onClick={() => setTabIndex(i)}
              >
                {ex.title}
              </button>
            ))}
          </div>

          <div style={{ background: '#0b1020', borderRadius: '12px', border: '1px solid #1e293b', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Sign</th>
                  <th style={{ padding: '0.75rem 1rem' }}>D Column (Differentiate u)</th>
                  <th style={{ padding: '0.75rem 1rem' }}>I Column (Integrate dv)</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Diagonal Product Term</th>
                </tr>
              </thead>
              <tbody>
                {curTab.rows.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                    }}
                  >
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: row.sign === '+' ? '#22c55e' : row.sign === '-' ? '#f43f5e' : '#f59e0b' }}>
                      {row.sign}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#38bdf8', fontFamily: 'monospace', fontWeight: 600 }}>
                      {row.d}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#a78bfa', fontFamily: 'monospace', fontWeight: 600 }}>
                      {row.i}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', color: '#f59e0b', fontWeight: 600 }}>
                      {row.term}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="viz-hint">
            <strong>Assembled Antiderivative:</strong>{' '}
            <span style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: '0.95rem' }}>
              {curTab.title} = {curTab.finalResult}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
