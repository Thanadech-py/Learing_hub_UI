import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function LinearCombinationsViz() {
  const [c1, setC1] = useState(1.5);
  const [c2, setC2] = useState(-1.0);
  const [v1x, setV1x] = useState(2);
  const [v1y, setV1y] = useState(1);
  const [v2x, setV2x] = useState(0);
  const [v2y, setV2y] = useState(2);

  const canvasRef = useRef(null);

  // Result vector w = c1*v1 + c2*v2
  const wx = c1 * v1x + c2 * v2x;
  const wy = c1 * v1y + c2 * v2y;

  // Check linear dependence: det [v1, v2] = v1x*v2y - v1y*v2x
  const detBasis = v1x * v2y - v1y * v2x;
  const isDependent = Math.abs(detBasis) < 1e-4;

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
    const scale = 34; // px per unit

    // If Independent, draw the oblique coordinate grid spanned by v1 and v2
    if (!isDependent) {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        // Lines parallel to v2 shifted by i*v1
        ctx.beginPath();
        ctx.moveTo(
          originX + (i * v1x - 6 * v2x) * scale,
          originY - (i * v1y - 6 * v2y) * scale
        );
        ctx.lineTo(
          originX + (i * v1x + 6 * v2x) * scale,
          originY - (i * v1y + 6 * v2y) * scale
        );
        ctx.stroke();

        // Lines parallel to v1 shifted by i*v2
        ctx.beginPath();
        ctx.moveTo(
          originX + (-6 * v1x + i * v2x) * scale,
          originY - (-6 * v1y + i * v2y) * scale
        );
        ctx.lineTo(
          originX + (6 * v1x + i * v2x) * scale,
          originY - (6 * v1y + i * v2y) * scale
        );
        ctx.stroke();
      }
    } else {
      // Dependent: Draw the single 1D span line (orange)
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(originX - 10 * v1x * scale, originY + 10 * v1y * scale);
      ctx.lineTo(originX + 10 * v1x * scale, originY - 10 * v1y * scale);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    const toPx = (x, y) => ({
      x: originX + x * scale,
      y: originY - y * scale,
    });

    const p0 = { x: originX, y: originY };
    const pV1 = toPx(v1x, v1y);
    const pV2 = toPx(v2x, v2y);
    const pC1V1 = toPx(c1 * v1x, c1 * v1y);
    const pW = toPx(wx, wy);

    const drawVector = (from, to, color, label, widthLine = 3) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = widthLine;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(to.x, to.y);
      ctx.lineTo(to.x - 9 * Math.cos(angle - Math.PI / 6), to.y - 9 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(to.x - 9 * Math.cos(angle + Math.PI / 6), to.y - 9 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = color;
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(label, to.x + 8, to.y - 4);
    };

    // Draw component vectors
    drawVector(p0, pV1, '#38bdf8', 'v₁');
    drawVector(p0, pV2, '#a78bfa', 'v₂');

    // Dashed path: 0 -> c1*v1 -> c1*v1 + c2*v2
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(pC1V1.x, pC1V1.y);
    ctx.lineTo(pW.x, pW.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw resultant w = c1*v1 + c2*v2
    drawVector(p0, pW, '#22c55e', `w = ${c1.toFixed(1)}v₁ + ${c2.toFixed(1)}v₂`, 4);
  }, [c1, c2, v1x, v1y, v2x, v2y, wx, wy, isDependent]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Linear Combinations & Span Visualizer</h3>
          <span className="viz-header__tag">w = c₁v₁ + c₂v₂</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Weight c₁" value={c1.toFixed(1)} unit="" />
        <MetricBadge label="Weight c₂" value={c2.toFixed(1)} unit="" />
        <MetricBadge label="Combination w" value={`[${wx.toFixed(1)}, ${wy.toFixed(1)}]ᵀ`} unit="" highlight />
        <MetricBadge
          label="Span Condition"
          value={isDependent ? 'Linearly Dependent' : 'Linearly Independent'}
          unit={isDependent ? 'Span is 1D Line' : 'Spans Entire ℝ²'}
          highlight={!isDependent}
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Scalar Weight c₁" value={c1} min={-3} max={3} step={0.25} unit="" onChange={setC1} />
          <SliderControl label="Scalar Weight c₂" value={c2} min={-3} max={3} step={0.25} unit="" onChange={setC2} />
          <SliderControl label="Vector v₁_x" value={v1x} min={-3} max={3} step={0.5} unit="" onChange={setV1x} />
          <SliderControl label="Vector v₁_y" value={v1y} min={-3} max={3} step={0.5} unit="" onChange={setV1y} />
          <SliderControl label="Vector v₂_x" value={v2x} min={-3} max={3} step={0.5} unit="" onChange={setV2x} />
          <SliderControl label="Vector v₂_y" value={v2y} min={-3} max={3} step={0.5} unit="" onChange={setV2y} />
        </div>
      </div>
    </div>
  );
}
