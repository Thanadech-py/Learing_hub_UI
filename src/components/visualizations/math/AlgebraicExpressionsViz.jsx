import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function AlgebraicExpressionsViz() {
  const [labMode, setLabMode] = useState('parabola'); // 'parabola' | 'completing-square'
  const [coeffA, setCoeffA] = useState(1);
  const [coeffB, setCoeffB] = useState(-4);
  const [coeffC, setCoeffC] = useState(3);

  // Geometric Completing Square Dimension: x^2 + b*x
  const [geomX, setGeomX] = useState(4);
  const [geomB, setGeomB] = useState(4);

  const canvasRef = useRef(null);

  // Discriminant and roots
  const discriminant = coeffB * coeffB - 4 * coeffA * coeffC;
  const vertexH = -coeffB / (2 * coeffA);
  const vertexK = coeffC - (coeffB * coeffB) / (4 * coeffA);

  let rootsText = '';
  if (discriminant > 0) {
    const r1 = ((-coeffB + Math.sqrt(discriminant)) / (2 * coeffA)).toFixed(2);
    const r2 = ((-coeffB - Math.sqrt(discriminant)) / (2 * coeffA)).toFixed(2);
    rootsText = `x₁ = ${r1}, x₂ = ${r2} (2 Real Roots)`;
  } else if (Math.abs(discriminant) < 1e-6) {
    const r = (-coeffB / (2 * coeffA)).toFixed(2);
    rootsText = `x = ${r} (1 Repeated Root)`;
  } else {
    const realP = (-coeffB / (2 * coeffA)).toFixed(2);
    const imagP = (Math.sqrt(-discriminant) / (2 * Math.abs(coeffA))).toFixed(2);
    rootsText = `${realP} ± ${imagP}i (2 Complex Roots)`;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    if (labMode === 'parabola') {
      // ----------------------------------------
      // MODE 1: PARABOLA GRAPH & ROOTS
      // ----------------------------------------
      const originX = width / 2;
      const originY = height / 2 + 30;
      const scaleX = 28;
      const scaleY = 16;

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

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText('x →', width - 40, originY - 8);
      ctx.fillText('y ↑', originX + 10, 30);

      // Plot y = ax^2 + bx + c
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const minX = -12;
      const maxX = 12;
      for (let xVal = minX; xVal <= maxX; xVal += 0.1) {
        const yVal = coeffA * xVal * xVal + coeffB * xVal + coeffC;
        const px = originX + xVal * scaleX;
        const py = originY - yVal * scaleY;
        if (xVal === minX) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Plot Vertex
      const vx = originX + vertexH * scaleX;
      const vy = originY - vertexK * scaleY;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(vx, vy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`Vertex (${vertexH.toFixed(2)}, ${vertexK.toFixed(2)})`, vx + 10, vy);

      // Plot Real Roots (if any)
      if (discriminant >= 0) {
        const r1 = (-coeffB + Math.sqrt(discriminant)) / (2 * coeffA);
        const r2 = (-coeffB - Math.sqrt(discriminant)) / (2 * coeffA);
        [r1, r2].forEach((r) => {
          const rx = originX + r * scaleX;
          ctx.fillStyle = '#22c55e';
          ctx.beginPath();
          ctx.arc(rx, originY, 6, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    } else {
      // ----------------------------------------
      // MODE 2: GEOMETRIC COMPLETING THE SQUARE
      // ----------------------------------------
      const startX = 140;
      const startY = 80;
      const pxScale = 30; // 30 px per unit of x
      const xSize = geomX * pxScale;
      const bHalf = (geomB / 2) * pxScale;

      // 1. Central square: x * x
      ctx.fillStyle = 'rgba(167, 139, 250, 0.35)';
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 2;
      ctx.fillRect(startX, startY, xSize, xSize);
      ctx.strokeRect(startX, startY, xSize, xSize);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`x² Area (${geomX} × ${geomX})`, startX + xSize / 2, startY + xSize / 2);

      // 2. Right rectangle: x * (b/2)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.strokeStyle = '#38bdf8';
      ctx.fillRect(startX + xSize, startY, bHalf, xSize);
      ctx.strokeRect(startX + xSize, startY, bHalf, xSize);
      ctx.fillStyle = '#7dd3fc';
      ctx.fillText(`(b/2)x`, startX + xSize + bHalf / 2, startY + xSize / 2);

      // 3. Bottom rectangle: (b/2) * x
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.fillRect(startX, startY + xSize, xSize, bHalf);
      ctx.strokeRect(startX, startY + xSize, xSize, bHalf);
      ctx.fillText(`(b/2)x`, startX + xSize / 2, startY + xSize + bHalf / 2 + 4);

      // 4. Missing corner completing the square: (b/2) * (b/2)
      ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
      ctx.strokeStyle = '#22c55e';
      ctx.setLineDash([4, 4]);
      ctx.fillRect(startX + xSize, startY + xSize, bHalf, bHalf);
      ctx.strokeRect(startX + xSize, startY + xSize, bHalf, bHalf);
      ctx.setLineDash([]);
      ctx.fillStyle = '#86efac';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`+(b/2)²`, startX + xSize + bHalf / 2, startY + xSize + bHalf / 2 + 4);
      ctx.textAlign = 'left';

      // Explanation callout
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 14px system-ui, sans-serif';
      ctx.fillText(`Completed Square of Side (x + b/2) = (${geomX} + ${geomB / 2}) = ${geomX + geomB / 2}`, 460, 120);

      ctx.font = '12px system-ui, sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`• Original Area: x² + bx = ${geomX * geomX} + ${geomB * geomX} = ${geomX * geomX + geomB * geomX}`, 460, 160);
      ctx.fillText(`• Missing Corner Added: (b/2)² = ${(geomB / 2) ** 2}`, 460, 185);
      ctx.fillStyle = '#86efac';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText(`• Total Square: (x + ${geomB / 2})² = ${(geomX + geomB / 2) ** 2}`, 460, 220);
    }
  }, [labMode, coeffA, coeffB, coeffC, discriminant, vertexH, vertexK, geomX, geomB]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Algebraic Polynomials & Geometry</h3>
          <span className="viz-header__tag">
            {labMode === 'parabola' ? 'Parabola Roots & Discriminant' : 'Geometric Completing The Square'}
          </span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${labMode === 'parabola' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setLabMode('parabola')}
          >
            Parabola Roots & Form
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${labMode === 'completing-square' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setLabMode('completing-square')}
          >
            Completing the Square
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        {labMode === 'parabola' ? (
          <>
            <MetricBadge
              label="Equation"
              value={`${coeffA}x² ${coeffB >= 0 ? '+' : ''}${coeffB}x ${coeffC >= 0 ? '+' : ''}${coeffC}`}
              unit=""
              highlight
            />
            <MetricBadge label="Discriminant (Δ)" value={discriminant.toFixed(1)} unit="" />
            <MetricBadge label="Vertex (h, k)" value={`(${vertexH.toFixed(2)}, ${vertexK.toFixed(2)})`} unit="" />
            <MetricBadge label="Roots" value={rootsText} unit="" highlight />
          </>
        ) : (
          <>
            <MetricBadge label="Base Length (x)" value={geomX} unit="" />
            <MetricBadge label="Linear Coeff (b)" value={geomB} unit="" />
            <MetricBadge label="Half Coeff (b/2)" value={geomB / 2} unit="" />
            <MetricBadge label="Completed Square" value={`(x + ${geomB / 2})²`} unit="" highlight />
          </>
        )}
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        {labMode === 'parabola' ? (
          <div className="viz-sliders-grid">
            <SliderControl
              label="Leading Coeff (a)"
              value={coeffA}
              min={-3}
              max={3}
              step={0.5}
              unit=""
              onChange={(val) => setCoeffA(val === 0 ? 0.5 : val)}
            />
            <SliderControl
              label="Linear Coeff (b)"
              value={coeffB}
              min={-8}
              max={8}
              step={1}
              unit=""
              onChange={setCoeffB}
            />
            <SliderControl
              label="Constant Term (c)"
              value={coeffC}
              min={-6}
              max={6}
              step={1}
              unit=""
              onChange={setCoeffC}
            />
          </div>
        ) : (
          <div className="viz-sliders-grid">
            <SliderControl
              label="Square Base Side (x)"
              value={geomX}
              min={2}
              max={6}
              step={0.5}
              unit=""
              onChange={setGeomX}
            />
            <SliderControl
              label="Rectangle Width (b)"
              value={geomB}
              min={1}
              max={6}
              step={1}
              unit=""
              onChange={setGeomB}
            />
          </div>
        )}
      </div>
    </div>
  );
}
