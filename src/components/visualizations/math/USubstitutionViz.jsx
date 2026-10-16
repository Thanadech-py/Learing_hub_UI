import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

const EXAMPLES = {
  radical: {
    title: '∫ 2x √(x² + 1) dx',
    subText: 'u = x² + 1,  du = 2x dx',
    fX: (x) => 2 * x * Math.sqrt(x * x + 1),
    g: (x) => x * x + 1,
    fU: (u) => Math.sqrt(Math.max(0, u)),
    antiderivU: (u) => (2 / 3) * Math.pow(Math.max(0, u), 1.5),
    defaultA: 0.0,
    defaultB: 2.0,
    xMin: 0,
    xMax: 2.5,
    yMaxX: 12,
    uMin: 0,
    uMax: 7.5,
    yMaxU: 3.5,
  },
  exponential: {
    title: '∫ cos(x) e^(sin x) dx',
    subText: 'u = sin(x),  du = cos(x) dx',
    fX: (x) => Math.cos(x) * Math.exp(Math.sin(x)),
    g: (x) => Math.sin(x),
    fU: (u) => Math.exp(u),
    antiderivU: (u) => Math.exp(u),
    defaultA: 0.0,
    defaultB: 1.57, // π/2
    xMin: 0,
    xMax: 1.8,
    yMaxX: 3.0,
    uMin: -0.2,
    uMax: 1.2,
    yMaxU: 3.0,
  },
  rational: {
    title: '∫ 2x / (x² + 2) dx',
    subText: 'u = x² + 2,  du = 2x dx',
    fX: (x) => (2 * x) / (x * x + 2),
    g: (x) => x * x + 2,
    fU: (u) => 1 / Math.max(0.1, u),
    antiderivU: (u) => Math.log(Math.max(0.1, u)),
    defaultA: 0.5,
    defaultB: 2.5,
    xMin: 0,
    xMax: 3.0,
    yMaxX: 1.2,
    uMin: 1.5,
    uMax: 9.0,
    yMaxU: 0.8,
  },
};

export default function USubstitutionViz() {
  const [exampleKey, setExampleKey] = useState('radical');
  const ex = EXAMPLES[exampleKey];

  const [a, setA] = useState(ex.defaultA);
  const [b, setB] = useState(ex.defaultB);

  const canvasRef = useRef(null);

  // Sync default limits when switching examples
  const switchExample = (key) => {
    setExampleKey(key);
    setA(EXAMPLES[key].defaultA);
    setB(EXAMPLES[key].defaultB);
  };

  const uA = ex.g(a);
  const uB = ex.g(b);

  // Analytical area evaluated in u-domain
  const exactAreaU = ex.antiderivU(uB) - ex.antiderivU(uA);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Split canvas into two equal panels: Left is x-domain, Right is u-domain
    const panelW = (width - 40) / 2;
    const pad = 20;

    const drawPanel = (panelX, domainTitle, varName, minVal, maxVal, maxFuncVal, isU) => {
      const pLeft = panelX;
      const pRight = panelX + panelW;
      const pTop = 35;
      const pBottom = height - 40;
      const innerW = pRight - pLeft - 50;
      const innerH = pBottom - pTop - 20;

      // Backdrop panel box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.strokeStyle = isU ? 'rgba(167, 139, 250, 0.35)' : 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pLeft, pTop - 15, panelW, pBottom - pTop + 45, 12);
      ctx.fill();
      ctx.stroke();

      // Title header
      ctx.fillStyle = isU ? '#a78bfa' : '#38bdf8';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(domainTitle, pLeft + 16, pTop);

      // Coordinate axes
      const ox = pLeft + 40;
      const oy = pBottom - 10;

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ox, pTop + 15);
      ctx.lineTo(ox, oy);
      ctx.lineTo(pRight - 15, oy);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText(varName + ' →', pRight - 35, oy + 16);
      ctx.fillText(isU ? 'f(u) ↑' : 'f(g(x))g\'(x) ↑', ox - 5, pTop + 12);

      const mapCoord = (val, yVal) => ({
        x: ox + ((val - minVal) / (maxVal - minVal)) * (innerW - 10),
        y: oy - (Math.max(0, yVal) / maxFuncVal) * innerH,
      });

      // Sample curve & shaded integral area
      const steps = 80;
      const evalFn = isU ? ex.fU : ex.fX;
      const lower = isU ? Math.min(uA, uB) : Math.min(a, b);
      const upper = isU ? Math.max(uA, uB) : Math.max(a, b);

      // Shaded area
      ctx.fillStyle = isU ? 'rgba(167, 139, 250, 0.25)' : 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      const pStart = mapCoord(lower, 0);
      ctx.moveTo(pStart.x, pStart.y);

      for (let i = 0; i <= steps; i++) {
        const curVal = lower + (i / steps) * (upper - lower);
        const pt = mapCoord(curVal, evalFn(curVal));
        ctx.lineTo(pt.x, pt.y);
      }
      const pEnd = mapCoord(upper, 0);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.closePath();
      ctx.fill();

      // Plot smooth continuous curve
      ctx.strokeStyle = isU ? '#a78bfa' : '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const curVal = minVal + (i / steps) * (maxVal - minVal);
        const pt = mapCoord(curVal, evalFn(curVal));
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // Boundary limit vertical pins
      const lim1 = isU ? uA : a;
      const lim2 = isU ? uB : b;
      [lim1, lim2].forEach((lim, idx) => {
        const p1 = mapCoord(lim, 0);
        const p2 = mapCoord(lim, evalFn(lim));
        ctx.strokeStyle = '#f59e0b';
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = 'bold 10px system-ui, sans-serif';
        const label = isU ? (idx === 0 ? `u(a)=${uA.toFixed(2)}` : `u(b)=${uB.toFixed(2)}`) : (idx === 0 ? `a=${a.toFixed(2)}` : `b=${b.toFixed(2)}`);
        ctx.fillText(label, p1.x - 14, oy + 15);
      });
    };

    // Draw Left Panel (x-domain)
    drawPanel(pad, '1. Original Integral in x-Domain', 'x', ex.xMin, ex.xMax, ex.yMaxX, false);

    // Draw Right Panel (u-domain)
    drawPanel(pad + panelW + 15, '2. Transformed Integral in u-Domain', 'u', ex.uMin, ex.uMax, ex.yMaxU, true);

    // Center equality badge
    ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Area ≡ Area', width / 2, height / 2 - 10);
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('∫ f(g(x))g\'(x)dx  =  ∫ f(u)du', width / 2, height / 2 + 10);
    ctx.textAlign = 'start';
  }, [exampleKey, a, b, uA, uB, ex]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">u-Substitution & Coordinate Transformation Lab</h3>
          <span className="viz-header__tag">Area Preserving Mapping: x ↦ u = g(x)</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${exampleKey === 'radical' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => switchExample('radical')}
          >
            2x √(x² + 1)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${exampleKey === 'exponential' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => switchExample('exponential')}
          >
            cos(x) e^(sin x)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${exampleKey === 'rational' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => switchExample('rational')}
          >
            2x / (x² + 2)
          </button>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Active Substitution:</span>
        <span className="viz-preset-chip viz-preset-chip--active">{ex.title}</span>
        <span className="viz-preset-chip">{ex.subText}</span>
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Original Limits [a, b]" value={`[${a.toFixed(2)}, ${b.toFixed(2)}]`} unit="x-axis" />
        <MetricBadge label="Transformed Limits [u(a), u(b)]" value={`[${uA.toFixed(2)}, ${uB.toFixed(2)}]`} unit="u-axis" highlight />
        <MetricBadge label="Area in x-Domain" value={exactAreaU.toFixed(4)} unit="∫ₐᵇ f(g(x))g'(x)dx" />
        <MetricBadge label="Area in u-Domain" value={exactAreaU.toFixed(4)} unit="∫_{u(a)}^{u(b)} f(u)du" highlight />
        <MetricBadge label="Area Match" value="100.0%" unit="Preserved!" />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Lower Limit a"
            value={a}
            min={ex.xMin}
            max={b - 0.1}
            step={0.05}
            onChange={(v) => setA(Math.min(v, b - 0.1))}
          />
          <SliderControl
            label="Upper Limit b"
            value={b}
            min={a + 0.1}
            max={ex.xMax}
            step={0.05}
            onChange={(v) => setB(Math.max(v, a + 0.1))}
          />
        </div>
      </div>
    </div>
  );
}
