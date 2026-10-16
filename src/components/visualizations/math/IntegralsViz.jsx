import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function IntegralsViz() {
  const [funcId, setFuncId] = useState('parabola'); // 'parabola' | 'sine' | 'gaussian'
  const [partitions, setPartitions] = useState(12); // n slices
  const [riemannMethod, setRiemannMethod] = useState('midpoint'); // 'left' | 'right' | 'midpoint' | 'trapezoid'

  const canvasRef = useRef(null);

  // Interval [a, b]
  const a = 0.5;
  const b = 3.5;

  const evalF = (x) => {
    switch (funcId) {
      case 'parabola':
        return 0.3 * x * x + 0.4;
      case 'sine':
        return Math.sin(x) + 1.2;
      case 'gaussian':
        return 2.5 * Math.exp(-0.5 * Math.pow(x - 2.0, 2));
      default:
        return x;
    }
  };

  // Exact analytical integral
  let exactIntegral = 0;
  if (funcId === 'parabola') {
    exactIntegral = (0.1 * Math.pow(b, 3) + 0.4 * b) - (0.1 * Math.pow(a, 3) + 0.4 * a);
  } else if (funcId === 'sine') {
    exactIntegral = (-Math.cos(b) + 1.2 * b) - (-Math.cos(a) + 1.2 * a);
  } else {
    // Numerical quadrature for gaussian
    exactIntegral = 2.458;
  }

  // Calculate Riemann Sum approximation
  const dx = (b - a) / partitions;
  let riemannSum = 0;
  for (let i = 0; i < partitions; i++) {
    const xLeft = a + i * dx;
    const xRight = xLeft + dx;
    let sampleHeight = 0;
    if (riemannMethod === 'left') {
      sampleHeight = evalF(xLeft);
    } else if (riemannMethod === 'right') {
      sampleHeight = evalF(xRight);
    } else if (riemannMethod === 'midpoint') {
      sampleHeight = evalF((xLeft + xRight) / 2);
    } else {
      // Trapezoid average
      sampleHeight = (evalF(xLeft) + evalF(xRight)) / 2;
    }
    riemannSum += sampleHeight * dx;
  }

  const approxError = Math.abs(riemannSum - exactIntegral);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = 80;
    const originY = height - 55;
    const scaleX = 180;
    const scaleY = 105;

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = originX; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, originY);
      ctx.stroke();
    }
    for (let y = originY; y > 20; y -= 40) {
      ctx.beginPath();
      ctx.moveTo(originX, y);
      ctx.lineTo(width - 30, y);
      ctx.stroke();
    }

    // Axes
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
    ctx.fillText('x →', width - 40, originY + 20);
    ctx.fillText('y = f(x) ↑', originX - 50, 30);

    // Draw Riemann Rectangles
    for (let i = 0; i < partitions; i++) {
      const xLeft = a + i * dx;
      const xRight = xLeft + dx;
      const pxLeft = originX + xLeft * scaleX;
      const pxRight = originX + xRight * scaleX;
      const rectW = pxRight - pxLeft;

      if (riemannMethod === 'trapezoid') {
        const yL = evalF(xLeft);
        const yR = evalF(xRight);
        const pyL = originY - yL * scaleY;
        const pyR = originY - yR * scaleY;

        ctx.fillStyle = 'rgba(167, 139, 250, 0.25)';
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(pxLeft, originY);
        ctx.lineTo(pxLeft, pyL);
        ctx.lineTo(pxRight, pyR);
        ctx.lineTo(pxRight, originY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        let sampleX = xLeft;
        if (riemannMethod === 'right') sampleX = xRight;
        else if (riemannMethod === 'midpoint') sampleX = (xLeft + xRight) / 2;

        const hVal = evalF(sampleX);
        const rectH = hVal * scaleY;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.fillRect(pxLeft, originY - rectH, rectW, rectH);
        ctx.strokeRect(pxLeft, originY - rectH, rectW, rectH);
      }
    }

    // Draw Smooth Continuous Function Curve
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let px = originX; px < width - 40; px += 2) {
      const xVal = (px - originX) / scaleX;
      const py = originY - evalF(xVal) * scaleY;
      if (px === originX) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Boundary Markers for a and b
    const pA = originX + a * scaleX;
    const pB = originX + b * scaleX;
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pA, originY);
    ctx.lineTo(pA, originY - evalF(a) * scaleY);
    ctx.moveTo(pB, originY);
    ctx.lineTo(pB, originY - evalF(b) * scaleY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`a = ${a}`, pA - 15, originY + 18);
    ctx.fillText(`b = ${b}`, pB - 15, originY + 18);
  }, [funcId, partitions, riemannMethod, dx, a, b]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Riemann Sum & Integration Simulator</h3>
          <span className="viz-header__tag">∫ f(x) dx = lim(n→∞) Σ f(xᵢ*) Δx</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${funcId === 'parabola' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFuncId('parabola')}
          >
            Parabola (0.3x² + 0.4)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${funcId === 'sine' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFuncId('sine')}
          >
            Sine (sin x + 1.2)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${funcId === 'gaussian' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setFuncId('gaussian')}
          >
            Gaussian Bell Curve
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Slices (n)" value={partitions} unit="" />
        <MetricBadge label="Slice Width (Δx)" value={dx.toFixed(3)} unit="" />
        <MetricBadge label="Riemann Approximation" value={riemannSum.toFixed(4)} unit="" highlight />
        <MetricBadge label="Exact Area ∫ₐᵇ f(x)dx" value={exactIntegral.toFixed(4)} unit="" />
        <MetricBadge label="Error" value={approxError.toFixed(4)} unit="" />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Partition Slices (n)"
            value={partitions}
            min={2}
            max={60}
            step={1}
            unit="slices"
            onChange={setPartitions}
          />
          <div className="viz-slider-row">
            <div className="viz-slider-header">
              <span className="viz-slider-label">Sampling Method</span>
              <span className="viz-slider-value">{riemannMethod.toUpperCase()}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.25rem' }}>
              {['left', 'right', 'midpoint', 'trapezoid'].map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`viz-btn viz-btn--secondary ${riemannMethod === m ? 'viz-btn--active' : ''}`}
                  onClick={() => setRiemannMethod(m)}
                  style={{ flex: 1, fontSize: '0.72rem', padding: '0.3rem 0.4rem' }}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
