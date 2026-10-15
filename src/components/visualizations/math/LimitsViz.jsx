import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function LimitsViz() {
  const [funcId, setFuncId] = useState('hole'); // 'hole' | 'sinc' | 'rational'
  const [approachX, setApproachX] = useState(1.05); // x slider approaching c
  const [epsilon, setEpsilon] = useState(0.4); // ε band

  const canvasRef = useRef(null);

  // Target point c and analytical limit L
  let targetC = 1.0;
  let targetL = 2.0;

  if (funcId === 'sinc') {
    targetC = 0.0;
    targetL = 1.0;
  } else if (funcId === 'rational') {
    targetC = 2.0;
    targetL = 4.0;
  }

  // Function evaluation
  const evaluateFunc = (x) => {
    if (funcId === 'hole') {
      // (x^2 - 1) / (x - 1) -> hole at x = 1, L = 2
      if (Math.abs(x - 1) < 1e-4) return NaN;
      return (x * x - 1) / (x - 1);
    } else if (funcId === 'sinc') {
      // sin(x) / x -> hole at x = 0, L = 1
      if (Math.abs(x) < 1e-4) return NaN;
      return Math.sin(x) / x;
    } else {
      // (x^2 - 4) / (x - 2) -> hole at x = 2, L = 4
      if (Math.abs(x - 2) < 1e-4) return NaN;
      return (x * x - 4) / (x - 2);
    }
  };

  const currentY = evaluateFunc(approachX);
  const diffFromLimit = isNaN(currentY) ? 0 : Math.abs(currentY - targetL);
  const insideEpsilon = diffFromLimit < epsilon;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2 + 40;
    const scaleX = 60;
    const scaleY = 50;

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += scaleX) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += scaleY) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, originY);
    ctx.lineTo(width - 30, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    // Epsilon Band: L - ε to L + ε (horizontal shaded strip)
    const yL = originY - targetL * scaleY;
    const yTop = originY - (targetL + epsilon) * scaleY;
    const yBottom = originY - (targetL - epsilon) * scaleY;

    ctx.fillStyle = insideEpsilon ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';
    ctx.fillRect(40, yTop, width - 80, yBottom - yTop);

    ctx.strokeStyle = insideEpsilon ? '#22c55e' : '#ef4444';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(40, yTop);
    ctx.lineTo(width - 40, yTop);
    ctx.moveTo(40, yBottom);
    ctx.lineTo(width - 40, yBottom);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(`L + ε = ${(targetL + epsilon).toFixed(2)}`, width - 110, yTop - 4);
    ctx.fillText(`L - ε = ${(targetL - epsilon).toFixed(2)}`, width - 110, yBottom + 12);

    // Plot Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    let started = false;
    for (let px = 40; px < width - 40; px += 2) {
      const xVal = (px - originX) / scaleX;
      const yVal = evaluateFunc(xVal);
      if (!isNaN(yVal)) {
        const py = originY - yVal * scaleY;
        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();

    // Draw Open Hole at x = c
    const holePx = originX + targetC * scaleX;
    const holePy = originY - targetL * scaleY;
    ctx.fillStyle = '#080d1a';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(holePx, holePy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`Hole: f(${targetC}) is Undefined (0/0)`, holePx + 10, holePy - 10);
    ctx.fillStyle = '#22c55e';
    ctx.fillText(`Limit L = ${targetL}`, holePx + 10, holePy + 16);

    // Draw Approaching Point x
    const curPx = originX + approachX * scaleX;
    const curPy = isNaN(currentY) ? holePy : originY - currentY * scaleY;

    ctx.fillStyle = insideEpsilon ? '#22c55e' : '#f59e0b';
    ctx.beginPath();
    ctx.arc(curPx, curPy, 7, 0, Math.PI * 2);
    ctx.fill();

    // Vertical dashed dropped line to axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(curPx, originY);
    ctx.lineTo(curPx, curPy);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [funcId, approachX, epsilon, targetC, targetL, currentY, insideEpsilon]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Limits & Epsilon-Delta Simulator</h3>
          <span className="viz-header__tag">lim(x→c) f(x) = L</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${funcId === 'hole' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setFuncId('hole');
              setApproachX(1.15);
            }}
          >
            (x² - 1)/(x - 1) at x→1
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${funcId === 'sinc' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setFuncId('sinc');
              setApproachX(0.4);
            }}
          >
            sin(x)/x at x→0
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${funcId === 'rational' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setFuncId('rational');
              setApproachX(2.2);
            }}
          >
            (x² - 4)/(x - 2) at x→2
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Target Point (c)" value={targetC} unit="" />
        <MetricBadge label="Analytical Limit (L)" value={targetL} unit="" highlight />
        <MetricBadge label="Current Input (x)" value={approachX.toFixed(3)} unit="" />
        <MetricBadge label="Output f(x)" value={isNaN(currentY) ? '0/0 (Hole)' : currentY.toFixed(3)} unit="" />
        <MetricBadge
          label="Status"
          value={insideEpsilon ? '✓ Inside ε-band' : 'Outside ε-band'}
          unit={`|f(x) - L| = ${diffFromLimit.toFixed(3)}`}
          highlight={insideEpsilon}
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Approach Coordinate (x)"
            value={approachX}
            min={targetC - 1.5}
            max={targetC + 1.5}
            step={0.02}
            unit=""
            onChange={setApproachX}
          />
          <SliderControl
            label="Epsilon Output Tolerance (ε)"
            value={epsilon}
            min={0.1}
            max={1.0}
            step={0.05}
            unit=""
            onChange={setEpsilon}
          />
        </div>
      </div>
    </div>
  );
}
