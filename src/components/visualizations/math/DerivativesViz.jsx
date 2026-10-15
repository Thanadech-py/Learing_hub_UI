import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function DerivativesViz() {
  const [funcCurve, setFuncCurve] = useState('cubic'); // 'cubic' | 'sine' | 'parabola'
  const [x0, setX0] = useState(1.0); // evaluation point
  const [stepH, setStepH] = useState(0.8); // secant step h

  const canvasRef = useRef(null);

  // Evaluate f(x) and analytical f'(x)
  const evalF = (x) => {
    switch (funcCurve) {
      case 'cubic':
        return 0.3 * (x * x * x - 3 * x);
      case 'sine':
        return Math.sin(x);
      case 'parabola':
        return 0.4 * x * x - 1;
      default:
        return x;
    }
  };

  const evalDeriv = (x) => {
    switch (funcCurve) {
      case 'cubic':
        return 0.3 * (3 * x * x - 3);
      case 'sine':
        return Math.cos(x);
      case 'parabola':
        return 0.8 * x;
      default:
        return 1;
    }
  };

  const y0 = evalF(x0);
  const yH = evalF(x0 + stepH);
  const secantSlope = (yH - y0) / stepH;
  const tangentSlope = evalDeriv(x0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Split Canvas: Top for f(x) & Tangent line, Bottom for f'(x) derivative curve
    const topH = 240;
    const bottomH = 140;
    const originX = width / 2;
    const originY1 = topH / 2 + 10;
    const originY2 = topH + bottomH / 2 + 10;
    const scaleX = 55;
    const scaleY = 35;

    // Divider line
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, topH);
    ctx.lineTo(width, topH);
    ctx.stroke();

    // Top Area: Axes for f(x)
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, originY1);
    ctx.lineTo(width - 30, originY1);
    ctx.moveTo(originX, 15);
    ctx.lineTo(originX, topH - 15);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('f(x) Curve & Tangent Line', 40, 24);

    // Plot f(x) curve
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let px = 40; px < width - 40; px += 2) {
      const xVal = (px - originX) / scaleX;
      const py = originY1 - evalF(xVal) * scaleY;
      if (px === 40) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Secant Line (faint dashed yellow)
    const px0 = originX + x0 * scaleX;
    const py0 = originY1 - y0 * scaleY;
    const pxH = originX + (x0 + stepH) * scaleX;
    const pyH = originY1 - yH * scaleY;

    if (Math.abs(stepH) > 0.05) {
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px0 - 80, py0 - secantSlope * -80 * (scaleY / scaleX));
      ctx.lineTo(px0 + 80, py0 - secantSlope * 80 * (scaleY / scaleX));
      ctx.stroke();
      ctx.setLineDash([]);

      // Secant point (x0+h, y(x0+h))
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(pxH, pyH, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Exact Tangent Line (Bright cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const tanSpan = 110;
    ctx.moveTo(px0 - tanSpan, py0 + tangentSlope * tanSpan * (scaleY / scaleX));
    ctx.lineTo(px0 + tanSpan, py0 - tangentSlope * tanSpan * (scaleY / scaleX));
    ctx.stroke();

    // Tangent point (x0, y0)
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(px0, py0, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Bottom Area: Axes for f'(x)
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, originY2);
    ctx.lineTo(width - 30, originY2);
    ctx.moveTo(originX, topH + 15);
    ctx.lineTo(originX, height - 15);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText("Synchronized Derivative Plot f'(x)", 40, topH + 24);

    // Plot f'(x) curve (Bright cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 40; px < width - 40; px += 2) {
      const xVal = (px - originX) / scaleX;
      const py = originY2 - evalDeriv(xVal) * scaleY * 0.7;
      if (px === 40) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Current derivative point dot on f'(x)
    const derivPy = originY2 - tangentSlope * scaleY * 0.7;
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(px0, derivPy, 6, 0, Math.PI * 2);
    ctx.fill();

    // Vertical dashed synchronization line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(px0, py0);
    ctx.lineTo(px0, derivPy);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [funcCurve, x0, stepH, y0, yH, secantSlope, tangentSlope]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Derivative & Tangent Line Laboratory</h3>
          <span className="viz-header__tag">f'(x) = lim(h→0) [f(x+h) - f(x)] / h</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${funcCurve === 'cubic' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFuncCurve('cubic')}
          >
            Cubic (0.3(x³ - 3x))
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${funcCurve === 'sine' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFuncCurve('sine')}
          >
            Sine (sin x)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${funcCurve === 'parabola' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFuncCurve('parabola')}
          >
            Parabola (0.4x² - 1)
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Point x₀" value={x0.toFixed(2)} unit="" />
        <MetricBadge label="f(x₀)" value={y0.toFixed(2)} unit="" />
        <MetricBadge label="Secant Step (h)" value={stepH.toFixed(2)} unit="" />
        <MetricBadge label="Secant Slope (Δy/h)" value={secantSlope.toFixed(3)} unit="" />
        <MetricBadge label="Exact Derivative f'(x₀)" value={tangentSlope.toFixed(3)} unit="Slope" highlight />
      </div>

      <div className="viz-canvas-area" style={{ height: '390px' }}>
        <canvas ref={canvasRef} width={800} height={390} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Evaluation Coordinate (x₀)"
            value={x0}
            min={-3}
            max={3}
            step={0.1}
            unit=""
            onChange={setX0}
          />
          <SliderControl
            label="Secant Step Size (h)"
            value={stepH}
            min={0.02}
            max={1.5}
            step={0.02}
            unit=""
            onChange={setStepH}
          />
        </div>
      </div>
    </div>
  );
}
