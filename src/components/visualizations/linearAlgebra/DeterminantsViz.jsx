import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function DeterminantsViz() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(1.5);

  const canvasRef = useRef(null);

  const det = a * d - b * c;
  const absDet = Math.abs(det);
  const isSingular = Math.abs(det) < 1e-4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2 + 20;
    const scale = 55; // px per Cartesian unit

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
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, originY);
    ctx.lineTo(width - 30, originY);
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    // 1. Original Unit Square (dashed gray)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(originX, originY - scale, scale, scale);
    ctx.setLineDash([]);
    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('Original Area = 1', originX + 8, originY - scale / 2);

    // 2. Transformed Parallelogram
    const p0 = { x: originX, y: originY };
    const p1 = { x: originX + a * scale, y: originY - c * scale };
    const p2 = { x: originX + (a + b) * scale, y: originY - (c + d) * scale };
    const p3 = { x: originX + b * scale, y: originY - d * scale };

    ctx.fillStyle = isSingular
      ? 'rgba(239, 68, 68, 0.5)'
      : det > 0
      ? 'rgba(34, 197, 94, 0.3)'
      : 'rgba(245, 158, 11, 0.3)';

    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = isSingular ? '#ef4444' : det > 0 ? '#22c55e' : '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Column 1: [a, c]ᵀ (Cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();

    // Draw Column 2: [b, d]ᵀ (Purple)
    ctx.strokeStyle = '#a78bfa';
    ctx.beginPath();
    ctx.moveTo(p0.x, p0.y);
    ctx.lineTo(p3.x, p3.y);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`Col 1: [${a}, ${c}]ᵀ`, p1.x + 8, p1.y);
    ctx.fillStyle = '#a78bfa';
    ctx.fillText(`Col 2: [${b}, ${d}]ᵀ`, p3.x + 8, p3.y);

    // Center area callout
    const centerX = (p0.x + p1.x + p2.x + p3.x) / 4;
    const centerY = (p0.y + p1.y + p2.y + p3.y) / 4;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Area = ${absDet.toFixed(2)}`, centerX, centerY);
    ctx.textAlign = 'left';
  }, [a, b, c, d, det, absDet, isSingular]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Determinant & Parallelogram Area Scaler</h3>
          <span className="viz-header__tag">det(A) = ad - bc</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Signed Determinant" value={det.toFixed(2)} unit="" highlight />
        <MetricBadge label="Parallelogram Area" value={absDet.toFixed(2)} unit="sq units" highlight />
        <MetricBadge label="Orientation" value={det > 0 ? 'Normal (Counterclockwise)' : det < 0 ? 'Flipped (Clockwise)' : 'Collapsed (Zero Area)'} unit="" />
        <MetricBadge label="Invertibility" value={isSingular ? 'Singular (No Inverse)' : 'Invertible (A⁻¹ Exists)'} unit="" />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="a (Col 1 x)" value={a} min={-3} max={3} step={0.25} unit="" onChange={setA} />
          <SliderControl label="c (Col 1 y)" value={c} min={-3} max={3} step={0.25} unit="" onChange={setC} />
          <SliderControl label="b (Col 2 x)" value={b} min={-3} max={3} step={0.25} unit="" onChange={setB} />
          <SliderControl label="d (Col 2 y)" value={d} min={-3} max={3} step={0.25} unit="" onChange={setD} />
        </div>
      </div>
    </div>
  );
}
