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
    id: 'poly-double',
    title: '∫ x² sin(2x) dx',
    uName: 'x²',
    dvName: 'sin(2x) dx',
    rows: [
      { d: 'x²', i: 'sin(2x)', sign: '+', term: '- (1/2) x² cos(2x)' },
      { d: '2x', i: '-(1/2)cos(2x)', sign: '-', term: '+ (1/2) x sin(2x)' },
      { d: '2', i: '-(1/4)sin(2x)', sign: '+', term: '+ (1/4) cos(2x)' },
      { d: '0', i: '(1/8)cos(2x)', sign: 'stop', term: 'Terminates at 0' },
    ],
    finalResult: '-(1/2) x² cos(2x) + (1/2) x sin(2x) + (1/4) cos(2x) + C',
  },
];

export default function IntegrationByPartsViz() {
  const [viewMode, setViewMode] = useState('geom'); // 'geom' | 'tabular'

  // Geometric Mode State (Parametric u-v plane for u(t) = t, v(t) = t^1.5 or similar)
  const [paramA, setParamA] = useState(1.0);
  const [paramB, setParamB] = useState(2.8);

  // Tabular Mode State
  const [tabIndex, setTabIndex] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState(3);

  const canvasRef = useRef(null);

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
  // v(t) = 0.4 t^2 + 0.5, dv = 0.8 t dt, so u dv = 0.8 t^2 dt
  // integral of 0.8 t^2 is (0.8/3) t^3
  const intUdv = (0.8 / 3) * Math.pow(paramB, 3) - (0.8 / 3) * Math.pow(paramA, 3);
  // integral of v du = integral of (0.4 t^2 + 0.5) dt = (0.4/3) t^3 + 0.5 t
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
      ctx.moveTo(px, 30);
      ctx.lineTo(px, originY);
      ctx.stroke();
    }
    for (let v = 0; v <= 4.5; v += 1) {
      const py = originY - v * scaleV;
      ctx.beginPath();
      ctx.moveTo(originX, py);
      ctx.lineTo(width - 40, py);
      ctx.stroke();
    }

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX - 20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, originY + 20);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('u = u(x) →', width - 70, originY + 20);
    ctx.fillText('v = v(x) ↑', originX - 60, 30);

    const toPx = (u, v) => ({
      x: originX + u * scaleU,
      y: originY - v * scaleV,
    });

    const steps = 60;

    // 1. Shaded Area for ∫ v du (Horizontal slices against u-axis) -> Purple
    ctx.fillStyle = 'rgba(167, 139, 250, 0.28)';
    ctx.beginPath();
    const p0A = toPx(uA, 0);
    ctx.moveTo(p0A.x, p0A.y);
    for (let i = 0; i <= steps; i++) {
      const t = paramA + (i / steps) * (paramB - paramA);
      const pt = toPx(uFn(t), vFn(t));
      ctx.lineTo(pt.x, pt.y);
    }
    const p0B = toPx(uB, 0);
    ctx.lineTo(p0B.x, p0B.y);
    ctx.closePath();
    ctx.fill();

    // 2. Shaded Area for ∫ u dv (Vertical slices against v-axis) -> Cyan
    ctx.fillStyle = 'rgba(56, 189, 248, 0.28)';
    ctx.beginPath();
    const pvA = toPx(0, vA);
    ctx.moveTo(pvA.x, pvA.y);
    for (let i = 0; i <= steps; i++) {
      const t = paramA + (i / steps) * (paramB - paramA);
      const pt = toPx(uFn(t), vFn(t));
      ctx.lineTo(pt.x, pt.y);
    }
    const pvB = toPx(0, vB);
    ctx.lineTo(pvB.x, pvB.y);
    ctx.closePath();
    ctx.fill();

    // Outer Bounding Box Lines (Corner rectangle)
    const pCornerA = toPx(uA, vA);
    const pCornerB = toPx(uB, vB);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(pCornerA.x, pCornerB.y, pCornerB.x - pCornerA.x, pCornerA.y - pCornerB.y);
    ctx.setLineDash([]);

    // Parametric Curve (u(t), v(t))
    ctx.strokeStyle = '#22c55e';
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

  const curTab = TABULAR_EXAMPLES[tabIndex];

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Integration by Parts & Tabular DI Lab</h3>
          <span className="viz-header__tag">∫ u dv = uv - ∫ v du • Geometric Area & DI Stepper</span>
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
            className={`viz-mode-btn ${viewMode === 'tabular' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setViewMode('tabular')}
          >
            Tabular (DI) Method Stepper
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

          <div className="viz-canvas-area" style={{ height: '500px' }}>
            <canvas ref={canvasRef} width={840} height={500} />
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
      ) : (
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="viz-presets-bar" style={{ padding: 0, border: 'none' }}>
            <span className="viz-presets-bar__label">Select Example:</span>
            {TABULAR_EXAMPLES.map((ex, i) => (
              <button
                key={ex.id}
                type="button"
                className={`viz-preset-chip ${tabIndex === i ? 'viz-preset-chip--active' : ''}`}
                onClick={() => {
                  setTabIndex(i);
                  setRevealedSteps(ex.rows.length);
                }}
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
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: row.sign === '+' ? '#22c55e' : row.sign === '-' ? '#f43f5e' : '#94a3b8' }}>
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
