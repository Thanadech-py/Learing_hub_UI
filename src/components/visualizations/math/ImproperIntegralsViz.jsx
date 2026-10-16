import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function ImproperIntegralsViz() {
  const [mode, setMode] = useState('ptest'); // 'ptest' | 'horn'
  const [pPower, setPPower] = useState(1.8); // p in 1/x^p
  const [boundR, setBoundR] = useState(6.0); // upper limit R

  const canvasRef = useRef(null);

  // Exact finite-bound integral of 1/x^p from 1 to R:
  // If p == 1: ln(R)
  // If p != 1: [x^(1-p) / (1-p)]_1^R = (R^(1-p) - 1) / (1 - p) = (1 - R^(1-p)) / (p - 1)
  let currentArea = 0;
  if (Math.abs(pPower - 1.0) < 0.05) {
    currentArea = Math.log(boundR);
  } else {
    currentArea = (1 - Math.pow(boundR, 1 - pPower)) / (pPower - 1);
  }

  // Theoretical infinite ceiling as R -> ∞
  const infiniteCeiling = pPower > 1.0 ? 1 / (pPower - 1) : Infinity;
  const isConvergent = pPower > 1.0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'ptest') {
      const originX = 80;
      const originY = height - 55;
      const maxPlotX = 10;
      const scaleX = (width - 120) / maxPlotX;
      const scaleY = 230;

      // Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 1; x <= maxPlotX; x += 1) {
        const px = originX + x * scaleX;
        ctx.beginPath();
        ctx.moveTo(px, 30);
        ctx.lineTo(px, originY);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX - 20, originY);
      ctx.lineTo(width - 20, originY);
      ctx.moveTo(originX, 30);
      ctx.lineTo(originX, originY + 20);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText('x → (R → ∞)', width - 80, originY + 18);
      ctx.fillText('y = 1 / xᵖ ↑', originX - 60, 40);

      const toPx = (x, y) => ({
        x: originX + x * scaleX,
        y: originY - y * scaleY,
      });

      // Shaded area from x = 1 to x = boundR
      const steps = 100;
      ctx.fillStyle = isConvergent ? 'rgba(34, 197, 94, 0.25)' : 'rgba(244, 63, 94, 0.25)';
      ctx.beginPath();
      const p1 = toPx(1, 0);
      ctx.moveTo(p1.x, p1.y);

      for (let i = 0; i <= steps; i++) {
        const x = 1 + (i / steps) * (boundR - 1);
        const y = 1 / Math.pow(x, pPower);
        const pt = toPx(x, y);
        ctx.lineTo(pt.x, pt.y);
      }
      const pR = toPx(boundR, 0);
      ctx.lineTo(pR.x, pR.y);
      ctx.closePath();
      ctx.fill();

      // Plot continuous curve y = 1 / x^p
      ctx.strokeStyle = isConvergent ? '#22c55e' : '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = 0.8 + (i / 200) * (maxPlotX - 0.8);
        const y = 1 / Math.pow(x, pPower);
        const pt = toPx(x, y);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      // Lower bound x = 1 line
      const pt1Top = toPx(1, 1);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(pt1Top.x, pt1Top.y);
      ctx.stroke();

      // Dynamic Upper bound x = R pin
      const ptRTop = toPx(boundR, 1 / Math.pow(boundR, pPower));
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pR.x, pR.y);
      ctx.lineTo(ptRTop.x, ptRTop.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(pR.x, pR.y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`R = ${boundR.toFixed(1)}`, pR.x - 14, originY + 20);

      // Convergence status watermark banner
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillStyle = isConvergent ? '#22c55e' : '#f43f5e';
      const statusMsg = isConvergent
        ? `CONVERGENT: Area bounded by Ceiling = 1 / (p - 1) = ${infiniteCeiling.toFixed(3)}`
        : `DIVERGENT: Area → ∞ as R → ∞ (p ≤ 1)`;
      ctx.fillText(statusMsg, originX + 30, 60);
    } else {
      // Gabriel's Horn 3D Canvas Visualization
      const cx = 80;
      const cy = height / 2;
      const hornLen = width - 140;

      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText("Gabriel's Horn Paradox: y = 1/x for x ≥ 1 rotated around x-axis", 50, 45);

      // Draw trumpet profile curves
      const steps = 60;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;

      // Upper curve
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const xVal = 1 + (i / steps) * (boundR - 1);
        const rVal = (1 / xVal) * 90;
        const px = cx + (i / steps) * hornLen;
        if (i === 0) ctx.moveTo(px, cy - rVal);
        else ctx.lineTo(px, cy - rVal);
      }
      ctx.stroke();

      // Lower curve
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const xVal = 1 + (i / steps) * (boundR - 1);
        const rVal = (1 / xVal) * 90;
        const px = cx + (i / steps) * hornLen;
        if (i === 0) ctx.moveTo(px, cy + rVal);
        else ctx.lineTo(px, cy + rVal);
      }
      ctx.stroke();

      // Shaded volume interior
      ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const xVal = 1 + (i / steps) * (boundR - 1);
        const rVal = (1 / xVal) * 90;
        const px = cx + (i / steps) * hornLen;
        if (i === 0) ctx.moveTo(px, cy - rVal);
        else ctx.lineTo(px, cy - rVal);
      }
      for (let i = steps; i >= 0; i--) {
        const xVal = 1 + (i / steps) * (boundR - 1);
        const rVal = (1 / xVal) * 90;
        const px = cx + (i / steps) * hornLen;
        ctx.lineTo(px, cy + rVal);
      }
      ctx.closePath();
      ctx.fill();

      // Circular cross-section ellipse at throat x = 1
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 18, 90, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Circular cross-section ellipse at lip x = boundR
      const rLip = (1 / boundR) * 90;
      ctx.beginPath();
      ctx.ellipse(cx + hornLen, cy, Math.max(4, rLip * 0.25), rLip, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Comparative Callout Text
      const hornVol = Math.PI * (1 - 1 / boundR);
      const hornSurf = 2 * Math.PI * Math.log(boundR);

      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(`Enclosed Volume V = π(1 - 1/R) = ${hornVol.toFixed(3)} → FINITE (π ≈ 3.1416)`, cx + 25, cy - 105);

      ctx.fillStyle = '#f43f5e';
      ctx.fillText(`Surface Area A > 2π ln(R) = ${hornSurf.toFixed(2)} → INFINITE (∞)`, cx + 25, cy + 120);
    }
  }, [mode, pPower, boundR, isConvergent, infiniteCeiling, currentArea]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Improper Integrals & Asymptotic Convergence Lab</h3>
          <span className="viz-header__tag">p-Test Benchmark • Gabriel's Horn Paradox</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'ptest' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('ptest')}
          >
            p-Integral Tail Test (1/xᵖ)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'horn' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('horn')}
          >
            Gabriel's Horn Paradox
          </button>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Convergence Criterion:</span>
        <span className={`viz-preset-chip ${isConvergent ? 'viz-preset-chip--active' : ''}`}>
          {isConvergent ? `p = ${pPower.toFixed(2)} > 1 (Convergent)` : `p = ${pPower.toFixed(2)} ≤ 1 (Divergent)`}
        </span>
        <span className="viz-preset-chip">
          {isConvergent ? `Infinite Ceiling: 1/(p - 1) = ${infiniteCeiling.toFixed(3)}` : 'Accumulated Area → ∞'}
        </span>
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Power Exponent p" value={pPower.toFixed(2)} unit="" />
        <MetricBadge label="Truncated Limit R" value={boundR.toFixed(1)} unit="approaching ∞" />
        <MetricBadge label="Accumulated Area ∫₁ᴿ 1/xᵖ dx" value={currentArea.toFixed(4)} unit="" highlight />
        <MetricBadge
          label="Total Infinite Tail"
          value={isConvergent ? infiniteCeiling.toFixed(4) : 'DIVERGES (∞)'}
          unit={isConvergent ? 'Finite Real Limit' : 'Explodes'}
          highlight
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Exponent p in 1 / xᵖ"
            value={pPower}
            min={0.4}
            max={3.0}
            step={0.1}
            onChange={setPPower}
          />
          <SliderControl
            label="Upper Limit Boundary R (Expanding to ∞)"
            value={boundR}
            min={2.0}
            max={10.0}
            step={0.2}
            onChange={setBoundR}
          />
        </div>
      </div>
    </div>
  );
}
