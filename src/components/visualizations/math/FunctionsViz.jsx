import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function FunctionsViz() {
  const [parentType, setParentType] = useState('sine'); // 'quadratic' | 'cubic' | 'sine' | 'exponential' | 'rational'
  const [showInverse, setShowInverse] = useState(false);
  const [paramA, setParamA] = useState(1.5); // Amplitude / Vertical scale
  const [paramB, setParamB] = useState(1.0); // Frequency / Horizontal scale
  const [paramC, setParamC] = useState(0.0); // Horizontal Shift
  const [paramD, setParamD] = useState(0.0); // Vertical Shift

  const canvasRef = useRef(null);

  // Parent function evaluation
  const evaluateParent = (x, type) => {
    switch (type) {
      case 'quadratic':
        return x * x;
      case 'cubic':
        return x * x * x * 0.2;
      case 'sine':
        return Math.sin(x);
      case 'exponential':
        return Math.exp(Math.min(3, Math.max(-3, x * 0.7))) - 1;
      case 'rational':
        return Math.abs(x) < 0.05 ? NaN : 1 / x;
      default:
        return x;
    }
  };

  const evaluateTransformed = (x) => {
    const inner = paramB * (x - paramC);
    const val = evaluateParent(inner, parentType);
    return isNaN(val) ? NaN : paramA * val + paramD;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2;
    const scale = 36; // pixels per Cartesian unit

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = originX % scale; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = originY % scale; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('x →', width - 40, originY - 8);
    ctx.fillText('y ↑', originX + 10, 30);

    // Diagonal mirror line y = x (if inverse mode active)
    if (showInverse) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(originX - 200, originY + 200);
      ctx.lineTo(originX + 200, originY - 200);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('y = x (Mirror Line)', originX + 120, originY - 130);
    }

    // Plot Parent Function (Faint gray-blue)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    const xRange = (width / scale) / 2;
    let started = false;
    for (let px = 0; px < width; px += 2) {
      const xVal = (px - originX) / scale;
      const yVal = evaluateParent(xVal, parentType);
      if (!isNaN(yVal) && Math.abs(yVal) < 15) {
        const py = originY - yVal * scale;
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
    ctx.setLineDash([]);

    // Plot Transformed Function g(x) = A * f(B(x - C)) + D (Bright Purple/Violet)
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    started = false;
    for (let px = 0; px < width; px += 2) {
      const xVal = (px - originX) / scale;
      const yVal = evaluateTransformed(xVal);
      if (!isNaN(yVal) && Math.abs(yVal) < 15) {
        const py = originY - yVal * scale;
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

    // Plot Inverse Curve f^-1 (swapping x and y coordinates)
    if (showInverse) {
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      started = false;
      for (let t = -xRange; t <= xRange; t += 0.05) {
        const yVal = evaluateTransformed(t);
        if (!isNaN(yVal) && Math.abs(yVal) < 15) {
          // Invert: x coordinate becomes yVal, y coordinate becomes t
          const invPx = originX + yVal * scale;
          const invPy = originY - t * scale;
          if (!started) {
            ctx.moveTo(invPx, invPy);
            started = true;
          } else {
            ctx.lineTo(invPx, invPy);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
    }
  }, [parentType, showInverse, paramA, paramB, paramC, paramD]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Function Transformation Laboratory</h3>
          <span className="viz-header__tag">g(x) = A · f(B(x - C)) + D</span>
        </div>
        <div className="viz-mode-tabs">
          {['quadratic', 'cubic', 'sine', 'exponential', 'rational'].map((t) => (
            <button
              key={t}
              type="button"
              className={`viz-mode-btn ${parentType === t ? 'viz-mode-btn--active' : ''}`}
              onClick={() => setParentType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Parent Type" value={parentType.toUpperCase()} unit="" />
        <MetricBadge label="Vertical Scale (A)" value={paramA} unit={paramA < 0 ? 'Reflected' : ''} highlight />
        <MetricBadge label="Horizontal Freq (B)" value={paramB} unit="" />
        <MetricBadge label="Horizontal Shift (C)" value={paramC > 0 ? `+${paramC}` : paramC} unit="units" />
        <MetricBadge label="Vertical Shift (D)" value={paramD > 0 ? `+${paramD}` : paramD} unit="units" />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Vertical Scale / Amplitude (A)"
            value={paramA}
            min={-3}
            max={3}
            step={0.25}
            unit=""
            onChange={setParamA}
          />
          <SliderControl
            label="Horizontal Frequency / Scale (B)"
            value={paramB}
            min={0.25}
            max={3}
            step={0.25}
            unit=""
            onChange={setParamB}
          />
          <SliderControl
            label="Horizontal Translation (C)"
            value={paramC}
            min={-4}
            max={4}
            step={0.5}
            unit="units"
            onChange={setParamC}
          />
          <SliderControl
            label="Vertical Translation (D)"
            value={paramD}
            min={-4}
            max={4}
            step={0.5}
            unit="units"
            onChange={setParamD}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button
            type="button"
            className={`viz-btn ${showInverse ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
            onClick={() => setShowInverse(!showInverse)}
          >
            {showInverse ? '✓ Showing Inverse Function f⁻¹(x)' : 'Show Inverse Reflection across y = x'}
          </button>
          <button
            type="button"
            className="viz-btn viz-btn--secondary"
            onClick={() => {
              setParamA(1);
              setParamB(1);
              setParamC(0);
              setParamD(0);
            }}
          >
            Reset to Standard Form
          </button>
        </div>
      </div>
    </div>
  );
}
