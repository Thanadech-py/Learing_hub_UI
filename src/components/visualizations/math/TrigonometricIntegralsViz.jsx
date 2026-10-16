import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function TrigonometricIntegralsViz() {
  const [family, setFamily] = useState('sincos'); // 'sincos' | 'sectan'
  const [mPower, setMPower] = useState(2); // power of sin or tan
  const [nPower, setNPower] = useState(3); // power of cos or sec
  const [upperLimitX, setUpperLimitX] = useState(Math.PI);

  const canvasRef = useRef(null);

  // Strategy detection
  let strategyBadge = '';
  let subAdvice = '';

  if (family === 'sincos') {
    const isNOdd = nPower % 2 === 1;
    const isMOdd = mPower % 2 === 1;

    if (isNOdd) {
      strategyBadge = 'Case 1: Cosine is Odd';
      subAdvice = `Save 1 factor of cos(x) for du. Convert remaining cos^${nPower - 1}(x) via (1 - sin² x), let u = sin(x).`;
    } else if (isMOdd) {
      strategyBadge = 'Case 2: Sine is Odd';
      subAdvice = `Save 1 factor of sin(x) for du. Convert remaining sin^${mPower - 1}(x) via (1 - cos² x), let u = cos(x).`;
    } else {
      strategyBadge = 'Case 3: Both Powers Even';
      subAdvice = `No single factor can be saved. Apply Half-Angle formulas: sin² x = (1 - cos 2x)/2, cos² x = (1 + cos 2x)/2.`;
    }
  } else {
    const isNEven = nPower > 0 && nPower % 2 === 0;
    const isMOdd = mPower % 2 === 1;

    if (isNEven) {
      strategyBadge = 'Case A: Secant is Even';
      subAdvice = `Save sec²(x) for du = d(tan x). Convert remaining sec^${nPower - 2}(x) via (1 + tan² x), let u = tan(x).`;
    } else if (isMOdd) {
      strategyBadge = 'Case B: Tangent is Odd';
      subAdvice = `Save sec(x)tan(x) for du = d(sec x). Convert tan^${mPower - 1}(x) via (sec² x - 1), let u = sec(x).`;
    } else {
      strategyBadge = 'Case C: Tangent Even, Secant Odd';
      subAdvice = `Convert tangents to secants using tan² x = sec² x - 1, then apply integration by parts on powers of sec(x).`;
    }
  }

  // Numerical quadrature for definite integral ∫_0^upperLimitX f(x) dx
  const evalFn = (x) => {
    if (family === 'sincos') {
      const s = Math.sin(x);
      const c = Math.cos(x);
      return Math.pow(s, mPower) * Math.pow(c, nPower);
    } else {
      // Clamped tan/sec to prevent division by zero near π/2
      const cosX = Math.cos(x);
      if (Math.abs(cosX) < 0.12) return 0;
      const t = Math.tan(x);
      const sec = 1 / cosX;
      return Math.pow(t, mPower) * Math.pow(sec, nPower);
    }
  };

  const stepsQuad = 200;
  let accumulatedArea = 0;
  const dx = upperLimitX / stepsQuad;
  for (let i = 0; i < stepsQuad; i++) {
    const midX = (i + 0.5) * dx;
    accumulatedArea += evalFn(midX) * dx;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = 60;
    const originY = height / 2 + 25;
    const maxDomain = family === 'sincos' ? Math.PI * 2 : 1.45; // up to ~1.45 rad for tan/sec
    const scaleX = (width - 100) / maxDomain;
    const scaleY = family === 'sincos' ? 140 : 38;

    // Grid & Zero-line
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x <= maxDomain; x += family === 'sincos' ? Math.PI / 2 : 0.4) {
      const px = originX + x * scaleX;
      ctx.beginPath();
      ctx.moveTo(px, 30);
      ctx.lineTo(px, height - 30);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX - 20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.moveTo(originX, 30);
    ctx.lineTo(originX, height - 30);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('x (rad) →', width - 60, originY + 18);
    ctx.fillText('f(x) ↑', originX - 40, 40);

    const toPx = (x, y) => ({
      x: originX + x * scaleX,
      y: originY - y * scaleY,
    });

    // Draw shaded area from 0 to upperLimitX
    const steps = 120;
    const drawUpper = Math.min(maxDomain, upperLimitX);

    ctx.fillStyle = accumulatedArea >= 0 ? 'rgba(56, 189, 248, 0.22)' : 'rgba(244, 63, 94, 0.22)';
    ctx.beginPath();
    const pStart = toPx(0, 0);
    ctx.moveTo(pStart.x, pStart.y);

    for (let i = 0; i <= steps; i++) {
      const curX = (i / steps) * drawUpper;
      const pt = toPx(curX, evalFn(curX));
      ctx.lineTo(pt.x, pt.y);
    }
    const pEnd = toPx(drawUpper, 0);
    ctx.lineTo(pEnd.x, pEnd.y);
    ctx.closePath();
    ctx.fill();

    // Plot continuous curve f(x)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const curX = (i / 200) * maxDomain;
      const pt = toPx(curX, evalFn(curX));
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();

    // Upper limit pin
    const pUpper = toPx(drawUpper, 0);
    const pUpperCurve = toPx(drawUpper, evalFn(drawUpper));
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pUpper.x, pUpper.y);
    ctx.lineTo(pUpperCurve.x, pUpperCurve.y);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(pUpper.x, pUpper.y, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`Upper Limit X = ${(upperLimitX / Math.PI).toFixed(2)}π`, pUpper.x - 30, originY + 28);
  }, [family, mPower, nPower, upperLimitX, accumulatedArea]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Trigonometric Integrals & Identity Reduction Lab</h3>
          <span className="viz-header__tag">
            {family === 'sincos' ? `∫ sin^${mPower}(x) cos^${nPower}(x) dx` : `∫ tan^${mPower}(x) sec^${nPower}(x) dx`}
          </span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${family === 'sincos' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFamily('sincos')}
          >
            Sine & Cosine Products
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${family === 'sectan' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFamily('sectan')}
          >
            Secant & Tangent Products
          </button>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Branching Rule:</span>
        <span className="viz-preset-chip viz-preset-chip--active">{strategyBadge}</span>
        <span className="viz-preset-chip">{subAdvice}</span>
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label={family === 'sincos' ? 'Power of sin(x)' : 'Power of tan(x)'} value={mPower} unit={mPower % 2 === 1 ? 'Odd' : 'Even'} />
        <MetricBadge label={family === 'sincos' ? 'Power of cos(x)' : 'Power of sec(x)'} value={nPower} unit={nPower % 2 === 1 ? 'Odd' : 'Even'} />
        <MetricBadge label="Upper Limit X" value={`${(upperLimitX / Math.PI).toFixed(2)}π`} unit="rad" />
        <MetricBadge label="Definite Integral ∫₀ˣ f(t) dt" value={accumulatedArea.toFixed(4)} unit="" highlight />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label={family === 'sincos' ? 'Power of sin (m)' : 'Power of tan (m)'}
            value={mPower}
            min={0}
            max={5}
            step={1}
            onChange={setMPower}
          />
          <SliderControl
            label={family === 'sincos' ? 'Power of cos (n)' : 'Power of sec (n)'}
            value={nPower}
            min={0}
            max={5}
            step={1}
            onChange={setNPower}
          />
          <SliderControl
            label="Integration Upper Bound X"
            value={upperLimitX}
            min={0.2}
            max={family === 'sincos' ? Math.PI * 2 : 1.4}
            step={0.05}
            formatValue={(v) => `${(v / Math.PI).toFixed(2)}π`}
            onChange={setUpperLimitX}
          />
        </div>
      </div>
    </div>
  );
}
