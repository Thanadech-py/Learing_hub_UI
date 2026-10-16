import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function AreaBetweenCurvesViz() {
  const [preset, setPreset] = useState('parabola-line'); // 'parabola-line' | 'crossing-cubic' | 'horizontal-dy'
  const [slices, setSlices] = useState(16);
  const [inspectIdx, setInspectIdx] = useState(8);
  const canvasRef = useRef(null);

  const fTop = (x) => {
    if (preset === 'parabola-line') return 4 - 0.5 * x * x;
    if (preset === 'crossing-cubic') return 0.35 * (x * x * x - 4 * x) + 2.2;
    return Math.sqrt(Math.max(0, x));
  };

  const gBot = (x) => {
    if (preset === 'parabola-line') return 0.5 * x + 1.0;
    if (preset === 'crossing-cubic') return 2.2;
    return 0.25 * x * x;
  };

  const bounds =
    preset === 'parabola-line'
      ? [-2.5, 1.5]
      : preset === 'crossing-cubic'
      ? [-2.0, 2.0]
      : [0.0, 2.52];

  const [a, b] = bounds;
  const dx = (b - a) / slices;

  let approxArea = 0;
  let signedNet = 0;
  for (let i = 0; i < slices; i++) {
    const xm = a + (i + 0.5) * dx;
    const diff = fTop(xm) - gBot(xm);
    approxArea += Math.abs(diff) * dx;
    signedNet += diff * dx;
  }

  const safeIdx = Math.min(inspectIdx, slices - 1);
  const xSample = a + (safeIdx + 0.5) * dx;
  const sliceHeight = Math.abs(fTop(xSample) - gBot(xSample));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = preset === 'horizontal-dy' ? 140 : width / 2 + 20;
    const originY = height - 70;
    const scaleX = preset === 'horizontal-dy' ? 210 : 125;
    const scaleY = 82;

    const toPx = (x, y) => [originX + x * scaleX, originY - y * scaleY];

    // Subtle Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let gx = -4; gx <= 4; gx += 0.5) {
      const [px] = toPx(gx, 0);
      if (px >= 30 && px <= width - 30) {
        ctx.beginPath();
        ctx.moveTo(px, 25);
        ctx.lineTo(px, height - 35);
        ctx.stroke();
      }
    }
    for (let gy = -1; gy <= 5; gy += 0.5) {
      const [, py] = toPx(0, gy);
      if (py >= 25 && py <= height - 35) {
        ctx.beginPath();
        ctx.moveTo(30, py);
        ctx.lineTo(width - 30, py);
        ctx.stroke();
      }
    }

    // Coordinate Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, originY);
    ctx.lineTo(width - 30, originY);
    ctx.moveTo(originX, 25);
    ctx.lineTo(originX, height - 35);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('x →', width - 55, originY - 8);
    ctx.fillText('y ↑', originX + 8, 38);

    // Draw Riemann Strips between curves
    for (let i = 0; i < slices; i++) {
      const xL = a + i * dx;
      const xR = xL + dx;
      const xm = 0.5 * (xL + xR);
      const y1 = fTop(xm);
      const y2 = gBot(xm);
      const isPositive = y1 >= y2;
      const isSelected = i === safeIdx;

      const [pxL, pyTop] = toPx(xL, Math.max(y1, y2));
      const [pxR, pyBot] = toPx(xR, Math.min(y1, y2));

      ctx.fillStyle = isSelected
        ? 'rgba(250, 204, 21, 0.42)'
        : isPositive
        ? 'rgba(56, 189, 248, 0.24)'
        : 'rgba(244, 114, 182, 0.24)';
      ctx.strokeStyle = isSelected
        ? '#facc15'
        : isPositive
        ? '#38bdf8'
        : '#f472b6';
      ctx.lineWidth = isSelected ? 2.2 : 1.2;

      ctx.fillRect(pxL, pyTop, pxR - pxL, pyBot - pyTop);
      ctx.strokeRect(pxL, pyTop, pxR - pxL, pyBot - pyTop);
    }

    // Draw Upper Curve f(x)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const minDrawX = preset === 'horizontal-dy' ? 0 : -3.2;
    const maxDrawX = preset === 'horizontal-dy' ? 3.0 : 3.2;
    for (let x = minDrawX; x <= maxDrawX; x += 0.03) {
      const [px, py] = toPx(x, fTop(x));
      if (x === minDrawX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Draw Lower Curve g(x)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = minDrawX; x <= maxDrawX; x += 0.03) {
      const [px, py] = toPx(x, gBot(x));
      if (x === minDrawX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Highlight Inspected Slice Endpoints
    const [sx, sy1] = toPx(xSample, fTop(xSample));
    const [, sy2] = toPx(xSample, gBot(xSample));
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(sx, sy1, 5, 0, Math.PI * 2);
    ctx.arc(sx, sy2, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(
      `ΔA = |f(x*) - g(x*)| Δx = ${sliceHeight.toFixed(2)} × ${dx.toFixed(2)}`,
      Math.min(width - 280, Math.max(40, sx + 12)),
      (sy1 + sy2) / 2
    );

    // Legend
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(42, 34, 245, 64);
    ctx.strokeStyle = '#334155';
    ctx.strokeRect(42, 34, 245, 64);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('─── Upper / First Curve f(x)', 54, 56);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('─── Lower / Second Curve g(x)', 54, 78);
  }, [preset, slices, safeIdx, a, b, dx, xSample, sliceHeight]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Area Between Curves Simulator</h3>
          <span className="viz-header__tag">A = ∫ₐᵇ |f(x) − g(x)| dx</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${preset === 'parabola-line' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setPreset('parabola-line')}
          >
            Parabola vs. Line
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${preset === 'crossing-cubic' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setPreset('crossing-cubic')}
          >
            Crossing Cubic (|f − g|)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${preset === 'horizontal-dy' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setPreset('horizontal-dy')}
          >
            Radical vs. Quadratic
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Total Enclosed Area" value={approxArea.toFixed(4)} unit="sq. units" highlight />
        <MetricBadge label="Signed Net ∫(f−g)dx" value={signedNet.toFixed(4)} unit="" />
        <MetricBadge label="Sample x*" value={xSample.toFixed(2)} unit={`in [${a}, ${b}]`} />
        <MetricBadge label="Slice Height |f−g|" value={sliceHeight.toFixed(3)} unit={`Δx = ${dx.toFixed(3)}`} />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Riemann Strips (n)"
            value={slices}
            min={4}
            max={48}
            step={2}
            unit=" slices"
            onChange={(val) => {
              setSlices(val);
              if (inspectIdx >= val) setInspectIdx(val - 1);
            }}
          />
          <SliderControl
            label="Inspect Strip Index (i)"
            value={safeIdx}
            min={0}
            max={slices - 1}
            step={1}
            unit=""
            onChange={setInspectIdx}
          />
        </div>
      </div>
    </div>
  );
}
