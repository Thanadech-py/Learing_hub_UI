import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function VectorsViz() {
  const [ux, setUx] = useState(3);
  const [uy, setUy] = useState(1);
  const [vx, setVx] = useState(1);
  const [vy, setVy] = useState(3);
  const [scalarC, setScalarC] = useState(1.5);

  const canvasRef = useRef(null);

  // Vector lengths
  const lenU = Math.hypot(ux, uy);
  const lenV = Math.hypot(vx, vy);

  // Dot product
  const dotProd = ux * vx + uy * vy;
  const cosTheta = lenU > 0 && lenV > 0 ? Math.min(1, Math.max(-1, dotProd / (lenU * lenV))) : 0;
  const angleDeg = ((Math.acos(cosTheta) * 180) / Math.PI).toFixed(1);

  // Sum u + v
  const sumX = ux + vx;
  const sumY = uy + vy;
  const lenSum = Math.hypot(sumX, sumY);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2 - 40;
    const originY = height / 2 + 30;
    const scale = 36; // px per unit

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
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('x →', width - 40, originY - 8);
    ctx.fillText('y ↑', originX + 10, 30);

    const toPx = (x, y) => ({
      x: originX + x * scale,
      y: originY - y * scale,
    });

    const p0 = { x: originX, y: originY };
    const pU = toPx(ux, uy);
    const pV = toPx(vx, vy);
    const pSum = toPx(sumX, sumY);

    // Parallelogram dashed lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pU.x, pU.y);
    ctx.lineTo(pSum.x, pSum.y);
    ctx.moveTo(pV.x, pV.y);
    ctx.lineTo(pSum.x, pSum.y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Vector Helper
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
      ctx.lineTo(to.x - 10 * Math.cos(angle - Math.PI / 6), to.y - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(to.x - 10 * Math.cos(angle + Math.PI / 6), to.y - 10 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = color;
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(label, to.x + 8, to.y - 4);
    };

    drawVector(p0, pU, '#38bdf8', `u = [${ux}, ${uy}]`);
    drawVector(p0, pV, '#a78bfa', `v = [${vx}, ${vy}]`);
    drawVector(p0, pSum, '#22c55e', `u + v = [${sumX}, ${sumY}]`, 3.5);

    // Scaled vector c * u
    const pScaledU = toPx(ux * scalarC, uy * scalarC);
    drawVector(p0, pScaledU, '#f59e0b', `c·u (${scalarC}u)`, 2);
  }, [ux, uy, vx, vy, scalarC, sumX, sumY]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Vector Geometry & Operations Laboratory</h3>
          <span className="viz-header__tag">Addition, Dot Product, & Scaling</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Vector u" value={`[${ux}, ${uy}]ᵀ`} unit={`||u|| = ${lenU.toFixed(2)}`} />
        <MetricBadge label="Vector v" value={`[${vx}, ${vy}]ᵀ`} unit={`||v|| = ${lenV.toFixed(2)}`} />
        <MetricBadge label="Sum u + v" value={`[${sumX}, ${sumY}]ᵀ`} unit={`||u+v|| = ${lenSum.toFixed(2)}`} highlight />
        <MetricBadge label="Dot Product (u · v)" value={dotProd.toFixed(1)} unit="" highlight />
        <MetricBadge label="Angle Between" value={`${angleDeg}°`} unit={dotProd === 0 ? 'Orthogonal!' : ''} />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Vector u_x" value={ux} min={-5} max={5} step={0.5} unit="" onChange={setUx} />
          <SliderControl label="Vector u_y" value={uy} min={-5} max={5} step={0.5} unit="" onChange={setUy} />
          <SliderControl label="Vector v_x" value={vx} min={-5} max={5} step={0.5} unit="" onChange={setVx} />
          <SliderControl label="Vector v_y" value={vy} min={-5} max={5} step={0.5} unit="" onChange={setVy} />
          <SliderControl label="Scalar Multiplier c" value={scalarC} min={-3} max={3} step={0.25} unit="" onChange={setScalarC} />
        </div>
      </div>
    </div>
  );
}
