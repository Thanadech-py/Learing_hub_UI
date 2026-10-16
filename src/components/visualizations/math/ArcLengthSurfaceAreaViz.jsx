import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function ArcLengthSurfaceAreaViz() {
  const [curveType, setCurveType] = useState('catenary'); // 'catenary' | 'semi-cubic' | 'sine'
  const [segments, setSegments] = useState(10);
  const [focusSeg, setFocusSeg] = useState(5);
  const canvasRef = useRef(null);

  const a = 0.0;
  const b = 3.0;
  const dx = (b - a) / segments;

  const evalY = (x) => {
    if (curveType === 'catenary') return 0.55 * Math.cosh(0.75 * x);
    if (curveType === 'semi-cubic') return 0.45 * Math.pow(x + 0.3, 1.5);
    return 1.15 + 0.75 * Math.sin(1.2 * x);
  };

  let polyLength = 0;
  let surfaceArea = 0;
  for (let i = 0; i < segments; i++) {
    const x0 = a + i * dx;
    const x1 = x0 + dx;
    const y0 = evalY(x0);
    const y1 = evalY(x1);
    const dy = y1 - y0;
    const ds = Math.hypot(dx, dy);
    polyLength += ds;
    surfaceArea += 2 * Math.PI * (0.5 * (y0 + y1)) * ds;
  }

  let exactArcLen = 0;
  const fineN = 300;
  const fineDx = (b - a) / fineN;
  for (let i = 0; i < fineN; i++) {
    const x0 = a + i * fineDx;
    const dy = evalY(x0 + fineDx) - evalY(x0);
    exactArcLen += Math.hypot(fineDx, dy);
  }

  const safeSeg = Math.min(focusSeg, segments - 1);
  const sx0 = a + safeSeg * dx;
  const sx1 = sx0 + dx;
  const sy0 = evalY(sx0);
  const sy1 = evalY(sx1);
  const sDy = sy1 - sy0;
  const sDs = Math.hypot(dx, sDy);
  const slope = sDy / dx;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = 70;
    const originY = height - 65;
    const scaleX = 135;
    const scaleY = 115;

    const toPx = (x, y) => [originX + x * scaleX, originY - y * scaleY];

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= 3.2; gx += 0.5) {
      const [px] = toPx(gx, 0);
      ctx.beginPath();
      ctx.moveTo(px, 25);
      ctx.lineTo(px, originY);
      ctx.stroke();
    }
    for (let gy = 0; gy <= 3.5; gy += 0.5) {
      const [, py] = toPx(0, gy);
      if (py >= 25) {
        ctx.beginPath();
        ctx.moveTo(originX, py);
        ctx.lineTo(520, py);
        ctx.stroke();
      }
    }

    // Divider line
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(540, 20);
    ctx.lineTo(540, height - 20);
    ctx.stroke();

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX - 15, originY);
    ctx.lineTo(520, originY);
    ctx.moveTo(originX, 25);
    ctx.lineTo(originX, originY + 15);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('x →', 495, originY + 20);
    ctx.fillText('y = f(x) ↑', originX - 25, 20);

    // Smooth true curve
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = a; x <= b; x += 0.02) {
      const [px, py] = toPx(x, evalY(x));
      if (x === a) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Polygonal Chords & Pythagorean Right Triangles
    for (let i = 0; i < segments; i++) {
      const x0 = a + i * dx;
      const x1 = x0 + dx;
      const y0 = evalY(x0);
      const y1 = evalY(x1);
      const isSelected = i === safeSeg;

      const [px0, py0] = toPx(x0, y0);
      const [px1, py1] = toPx(x1, y1);

      // Right triangle legs dx and dy
      ctx.strokeStyle = isSelected ? '#facc15' : 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(px0, py0);
      ctx.lineTo(px1, py0);
      ctx.lineTo(px1, py1);
      ctx.stroke();
      ctx.setLineDash([]);

      // Hypotenuse Δs chord
      ctx.strokeStyle = isSelected ? '#facc15' : '#34d399';
      ctx.lineWidth = isSelected ? 3.2 : 2;
      ctx.beginPath();
      ctx.moveTo(px0, py0);
      ctx.lineTo(px1, py1);
      ctx.stroke();

      ctx.fillStyle = isSelected ? '#facc15' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(px0, py0, isSelected ? 4.5 : 3, 0, Math.PI * 2);
      ctx.fill();
      if (i === segments - 1) {
        ctx.beginPath();
        ctx.arc(px1, py1, isSelected ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // RIGHT PANEL: Magnified Differential Triangle Zoom
    const zoomCx = 690;
    const zoomCy = height / 2 + 25;
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Magnified Segment #${safeSeg + 1}`, zoomCx, 48);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(`x ∈ [${sx0.toFixed(2)}, ${sx1.toFixed(2)}]`, zoomCx, 68);

    const triW = 160;
    const rawH = Math.min(160, Math.max(-160, slope * 110));
    const tx0 = zoomCx - triW / 2;
    const ty0 = zoomCy + rawH / 2;
    const tx1 = zoomCx + triW / 2;
    const ty1 = zoomCy - rawH / 2;

    // Triangle fill
    ctx.fillStyle = 'rgba(250, 204, 21, 0.14)';
    ctx.beginPath();
    ctx.moveTo(tx0, ty0);
    ctx.lineTo(tx1, ty0);
    ctx.lineTo(tx1, ty1);
    ctx.closePath();
    ctx.fill();

    // Horizontal leg Δx
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(tx0, ty0);
    ctx.lineTo(tx1, ty0);
    ctx.stroke();

    // Vertical leg Δy
    ctx.strokeStyle = '#f472b6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(tx1, ty0);
    ctx.lineTo(tx1, ty1);
    ctx.stroke();

    // Hypotenuse Δs
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(tx0, ty0);
    ctx.lineTo(tx1, ty1);
    ctx.stroke();

    // Labels on triangle
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`Δx = ${dx.toFixed(3)}`, (tx0 + tx1) / 2, ty0 + (rawH >= 0 ? 20 : -10));

    ctx.fillStyle = '#f472b6';
    ctx.fillText(`Δy = ${sDy.toFixed(3)}`, tx1 + 38, (ty0 + ty1) / 2);

    ctx.fillStyle = '#facc15';
    ctx.fillText(`Δs = ${sDs.toFixed(3)}`, (tx0 + tx1) / 2 - 22, (ty0 + ty1) / 2 - 12);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px system-ui, sans-serif';
    ctx.fillText(`√(1 + (Δy/Δx)²) = ${Math.hypot(1, slope).toFixed(3)}`, zoomCx, height - 58);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`Δs = √(1 + [f'(x)]²) Δx`, zoomCx, height - 36);
    ctx.textAlign = 'left';
  }, [curveType, segments, safeSeg, a, b, dx, sx0, sx1, sDy, sDs, slope]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Arc Length & Surface Area Simulator</h3>
          <span className="viz-header__tag">ds = √(dx² + dy²) = √(1 + [f'(x)]²) dx</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${curveType === 'catenary' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setCurveType('catenary')}
          >
            Catenary (cosh x)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${curveType === 'semi-cubic' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setCurveType('semi-cubic')}
          >
            Semi-Cubical (x^1.5)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${curveType === 'sine' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setCurveType('sine')}
          >
            Sine Wave
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Polygonal Sum ΣΔs" value={polyLength.toFixed(4)} unit="units" highlight />
        <MetricBadge label="Exact Arc Length L" value={exactArcLen.toFixed(4)} unit="units" />
        <MetricBadge label="Segment Slope Δy/Δx" value={slope.toFixed(3)} unit={`Δs = ${sDs.toFixed(3)}`} />
        <MetricBadge label="Surface Area ∫2πy ds" value={surfaceArea.toFixed(2)} unit="sq. units" />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Polygonal Chords (n)"
            value={segments}
            min={3}
            max={36}
            step={1}
            unit=" chords"
            onChange={(val) => {
              setSegments(val);
              if (focusSeg >= val) setFocusSeg(val - 1);
            }}
          />
          <SliderControl
            label="Inspect Chord (i)"
            value={safeSeg}
            min={0}
            max={segments - 1}
            step={1}
            unit=""
            onChange={setFocusSeg}
          />
        </div>
      </div>
    </div>
  );
}
