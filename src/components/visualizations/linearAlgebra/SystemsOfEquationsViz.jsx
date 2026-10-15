import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function SystemsOfEquationsViz() {
  const [a1, setA1] = useState(1);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(4);

  const [a2, setA2] = useState(2);
  const [b2, setB2] = useState(-1);
  const [c2, setC2] = useState(2);

  const canvasRef = useRef(null);

  // Determinant: a1*b2 - a2*b1
  const det = a1 * b2 - a2 * b1;
  const isParallel = Math.abs(det) < 1e-4;

  // Check if coincident
  const ratioA = a2 !== 0 ? a1 / a2 : 0;
  const ratioC = c2 !== 0 ? c1 / c2 : 0;
  const isCoincident = isParallel && Math.abs(ratioA - ratioC) < 1e-4;

  // Cramer's rule for solution (x*, y*)
  let solX = 0;
  let solY = 0;
  if (!isParallel) {
    solX = (c1 * b2 - c2 * b1) / det;
    solY = (a1 * c2 - a2 * c1) / det;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2;
    const scale = 36; // px per unit

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += scale) {
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
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    // Helper: Draw line a*x + b*y = c -> y = (c - a*x)/b
    const drawLine = (aCoeff, bCoeff, cCoeff, color, label) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();

      if (Math.abs(bCoeff) > 1e-4) {
        const xMin = -12;
        const xMax = 12;
        const y1 = (cCoeff - aCoeff * xMin) / bCoeff;
        const y2 = (cCoeff - aCoeff * xMax) / bCoeff;
        ctx.moveTo(originX + xMin * scale, originY - y1 * scale);
        ctx.lineTo(originX + xMax * scale, originY - y2 * scale);
      } else {
        // Vertical line x = c/a
        const xFix = cCoeff / aCoeff;
        ctx.moveTo(originX + xFix * scale, 0);
        ctx.lineTo(originX + xFix * scale, height);
      }
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(label, 40, color === '#38bdf8' ? 40 : 65);
    };

    drawLine(a1, b1, c1, '#38bdf8', `L₁: ${a1}x + ${b1}y = ${c1}`);
    drawLine(a2, b2, c2, '#a78bfa', `L₂: ${a2}x + ${b2}y = ${c2}`);

    // If Unique Solution: Draw glowing intersection dot
    if (!isParallel) {
      const px = originX + solX * scale;
      const py = originY - solY * scale;

      ctx.fillStyle = '#22c55e';
      ctx.shadowColor = '#22c55e';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(px, py, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText(`Intersection (${solX.toFixed(2)}, ${solY.toFixed(2)})`, px + 10, py - 10);
    }
  }, [a1, b1, c1, a2, b2, c2, isParallel, solX, solY]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Systems of Linear Equations (Ax = b)</h3>
          <span className="viz-header__tag">Intersection of 2D Hyperplanes</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Line 1" value={`${a1}x + ${b1}y = ${c1}`} unit="" />
        <MetricBadge label="Line 2" value={`${a2}x + ${b2}y = ${c2}`} unit="" />
        <MetricBadge label="Determinant det(A)" value={det.toFixed(1)} unit="" />
        <MetricBadge
          label="Solution State"
          value={isCoincident ? 'Infinite Solutions' : isParallel ? 'No Solution (Parallel)' : `(${solX.toFixed(2)}, ${solY.toFixed(2)})`}
          unit={isParallel ? 'Inconsistent' : 'Unique Solution'}
          highlight={!isParallel}
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Line 1: a₁" value={a1} min={-3} max={3} step={1} unit="" onChange={setA1} />
          <SliderControl label="Line 1: b₁" value={b1} min={-3} max={3} step={1} unit="" onChange={setB1} />
          <SliderControl label="Line 1: c₁" value={c1} min={-6} max={6} step={1} unit="" onChange={setC1} />
          <SliderControl label="Line 2: a₂" value={a2} min={-3} max={3} step={1} unit="" onChange={setA2} />
          <SliderControl label="Line 2: b₂" value={b2} min={-3} max={3} step={1} unit="" onChange={setB2} />
          <SliderControl label="Line 2: c₂" value={c2} min={-6} max={6} step={1} unit="" onChange={setC2} />
        </div>
      </div>
    </div>
  );
}
