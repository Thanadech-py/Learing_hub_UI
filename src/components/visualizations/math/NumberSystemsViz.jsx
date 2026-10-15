import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function NumberSystemsViz() {
  const [opMode, setOpMode] = useState('addition'); // 'addition' | 'multiplication'
  const [z1Real, setZ1Real] = useState(2);
  const [z1Imag, setZ1Imag] = useState(1.5);
  const [z2Real, setZ2Real] = useState(1);
  const [z2Imag, setZ2Imag] = useState(2);

  const canvasRef = useRef(null);

  // Derived values for z1
  const mod1 = Math.hypot(z1Real, z1Imag);
  const arg1Rad = Math.atan2(z1Imag, z1Real);
  const arg1Deg = ((arg1Rad * 180) / Math.PI).toFixed(1);

  // Derived values for z2
  const mod2 = Math.hypot(z2Real, z2Imag);
  const arg2Rad = Math.atan2(z2Imag, z2Real);
  const arg2Deg = ((arg2Rad * 180) / Math.PI).toFixed(1);

  // Operation result
  let resReal = 0;
  let resImag = 0;
  if (opMode === 'addition') {
    resReal = z1Real + z2Real;
    resImag = z1Imag + z2Imag;
  } else {
    // Multiplication: (a + bi)(c + di) = (ac - bd) + (ad + bc)i
    resReal = z1Real * z2Real - z1Imag * z2Imag;
    resImag = z1Real * z2Imag + z1Imag * z2Real;
  }
  const resMod = Math.hypot(resReal, resImag);
  const resArgRad = Math.atan2(resImag, resReal);
  const resArgDeg = ((resArgRad * 180) / Math.PI).toFixed(1);

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
    const scale = 38; // pixels per unit

    // Draw Grid lines
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

    // Concentric modulus guide rings
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.setLineDash([3, 4]);
    for (let r = 1; r <= 6; r++) {
      ctx.beginPath();
      ctx.arc(originX, originY, r * scale, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    // Real Axis
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.stroke();
    // Imaginary Axis
    ctx.beginPath();
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('Real Axis (Re) →', width - 110, originY - 10);
    ctx.fillText('↑ Imaginary Axis (Im)', originX + 10, 32);

    // Helper: to canvas pixels
    const toPx = (re, im) => ({
      x: originX + re * scale,
      y: originY - im * scale,
    });

    const p0 = { x: originX, y: originY };
    const p1 = toPx(z1Real, z1Imag);
    const p2 = toPx(z2Real, z2Imag);
    const pRes = toPx(resReal, resImag);

    // Draw Vector Helper
    const drawVector = (from, to, color, label, widthLine = 3) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = widthLine;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // Arrowhead
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x - 10 * Math.cos(angle - Math.PI / 6), to.y - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(to.x - 10 * Math.cos(angle + Math.PI / 6), to.y - 10 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      // Point circle
      ctx.beginPath();
      ctx.arc(to.x, to.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = color;
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(label, to.x + 8, to.y - 6);
    };

    // If Addition: draw parallelogram dashed lines
    if (opMode === 'addition') {
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      // z1 to z1+z2
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(pRes.x, pRes.y);
      ctx.stroke();
      // z2 to z1+z2
      ctx.beginPath();
      ctx.moveTo(p2.x, p2.y);
      ctx.lineTo(pRes.x, pRes.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw z1, z2, and result
    drawVector(p0, p1, '#38bdf8', `z₁ = ${z1Real} + ${z1Imag}i`);
    drawVector(p0, p2, '#a78bfa', `z₂ = ${z2Real} + ${z2Imag}i`);
    drawVector(
      p0,
      pRes,
      '#22c55e',
      opMode === 'addition'
        ? `z₁ + z₂ = ${resReal.toFixed(1)} + ${resImag.toFixed(1)}i`
        : `z₁ · z₂ = ${resReal.toFixed(1)} + ${resImag.toFixed(1)}i`,
      4
    );

    // Angle arcs
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(originX, originY, 26, 0, -arg1Rad, arg1Rad < 0);
    ctx.stroke();

    ctx.strokeStyle = '#a78bfa';
    ctx.beginPath();
    ctx.arc(originX, originY, 34, 0, -arg2Rad, arg2Rad < 0);
    ctx.stroke();
  }, [opMode, z1Real, z1Imag, z2Real, z2Imag, resReal, resImag, arg1Rad, arg2Rad]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Complex Plane & Argand Diagram</h3>
          <span className="viz-header__tag">
            {opMode === 'addition' ? 'Vector Parallelogram Addition' : 'Euler Rotation & Scale (r₁r₂, θ₁+θ₂)'}
          </span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${opMode === 'addition' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setOpMode('addition')}
          >
            Addition (z₁ + z₂)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${opMode === 'multiplication' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setOpMode('multiplication')}
          >
            Multiplication (z₁ · z₂)
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="z₁ Cartesian" value={`${z1Real} + ${z1Imag}i`} unit="" />
        <MetricBadge label="z₁ Polar" value={`${mod1.toFixed(2)} ∠ ${arg1Deg}°`} unit="" />
        <MetricBadge label="z₂ Cartesian" value={`${z2Real} + ${z2Imag}i`} unit="" />
        <MetricBadge label="z₂ Polar" value={`${mod2.toFixed(2)} ∠ ${arg2Deg}°`} unit="" />
        <MetricBadge
          label={opMode === 'addition' ? 'Result (z₁ + z₂)' : 'Result (z₁ · z₂)'}
          value={`${resReal.toFixed(2)} + ${resImag.toFixed(2)}i`}
          unit={`(${resMod.toFixed(2)} ∠ ${resArgDeg}°)`}
          highlight
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '380px' }}>
        <canvas ref={canvasRef} width={800} height={380} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="z₁ Real Part Re(z₁)"
            value={z1Real}
            min={-4}
            max={4}
            step={0.5}
            unit=""
            onChange={setZ1Real}
          />
          <SliderControl
            label="z₁ Imag Part Im(z₁)"
            value={z1Imag}
            min={-4}
            max={4}
            step={0.5}
            unit="i"
            onChange={setZ1Imag}
          />
          <SliderControl
            label="z₂ Real Part Re(z₂)"
            value={z2Real}
            min={-4}
            max={4}
            step={0.5}
            unit=""
            onChange={setZ2Real}
          />
          <SliderControl
            label="z₂ Imag Part Im(z₂)"
            value={z2Imag}
            min={-4}
            max={4}
            step={0.5}
            unit="i"
            onChange={setZ2Imag}
          />
        </div>
      </div>
    </div>
  );
}
