import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function VolumeSolidsRevolutionViz() {
  const [method, setMethod] = useState('disk'); // 'disk' | 'washer' | 'shell'
  const [numSlices, setNumSlices] = useState(12);
  const [highlightSlice, setHighlightSlice] = useState(6);
  const canvasRef = useRef(null);

  const a = 0.25;
  const b = 3.0;
  const dx = (b - a) / numSlices;

  const rOuter = (x) => {
    if (method === 'disk') return 0.9 * Math.sqrt(x) + 0.35;
    if (method === 'washer') return 0.95 * Math.sqrt(x) + 0.45;
    return 1.35 * Math.sin(0.85 * x) + 0.55;
  };

  const rInner = (x) => {
    if (method === 'washer') return 0.38 * x + 0.15;
    return 0;
  };

  let totalVolume = 0;
  for (let i = 0; i < numSlices; i++) {
    const xm = a + (i + 0.5) * dx;
    const Ro = rOuter(xm);
    const Ri = rInner(xm);
    if (method === 'shell') {
      totalVolume += 2 * Math.PI * xm * Ro * dx;
    } else {
      totalVolume += Math.PI * (Ro * Ro - Ri * Ri) * dx;
    }
  }

  const safeSlice = Math.min(highlightSlice, numSlices - 1);
  const xStar = a + (safeSlice + 0.5) * dx;
  const RoStar = rOuter(xStar);
  const RiStar = rInner(xStar);
  const dV =
    method === 'shell'
      ? 2 * Math.PI * xStar * RoStar * dx
      : Math.PI * (RoStar * RoStar - RiStar * RiStar) * dx;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Split 2D layout: Left = Region & Revolved Mirror Profile, Right = 2D Cross-Section / Unrolled Shell
    const leftOriginX = 65;
    const leftOriginY = height / 2;
    const scaleX = 125;
    const scaleY = 78;

    const toPx = (x, y) => [leftOriginX + x * scaleX, leftOriginY - y * scaleY];

    // Grid on left panel
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= 3.5; gx += 0.5) {
      const [px] = toPx(gx, 0);
      ctx.beginPath();
      ctx.moveTo(px, 30);
      ctx.lineTo(px, height - 30);
      ctx.stroke();
    }
    for (let gy = -2.5; gy <= 2.5; gy += 0.5) {
      const [, py] = toPx(0, gy);
      ctx.beginPath();
      ctx.moveTo(40, py);
      ctx.lineTo(500, py);
      ctx.stroke();
    }

    // Divider line
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(520, 20);
    ctx.lineTo(520, height - 20);
    ctx.stroke();

    // Axes on left panel
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, leftOriginY);
    ctx.lineTo(500, leftOriginY);
    ctx.moveTo(leftOriginX, 30);
    ctx.lineTo(leftOriginX, height - 30);
    ctx.stroke();

    // Axis of revolution indicator
    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    if (method === 'shell') {
      ctx.moveTo(leftOriginX, 35);
      ctx.lineTo(leftOriginX, height - 35);
    } else {
      ctx.moveTo(45, leftOriginY);
      ctx.lineTo(495, leftOriginY);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    if (method === 'shell') {
      ctx.fillText('↻ Revolved around y-axis (x = 0)', leftOriginX + 10, 46);
    } else {
      ctx.fillText('↻ Revolved around x-axis (y = 0)', 315, leftOriginY + 18);
    }

    // Draw Slices & Mirror reflection
    for (let i = 0; i < numSlices; i++) {
      const xL = a + i * dx;
      const xR = xL + dx;
      const xm = 0.5 * (xL + xR);
      const Ro = rOuter(xm);
      const Ri = rInner(xm);
      const isSelected = i === safeSlice;

      const [pxL, pyTop] = toPx(xL, Ro);
      const [pxR, pyBot] = toPx(xR, Ri);

      ctx.fillStyle = isSelected ? 'rgba(250, 204, 21, 0.42)' : 'rgba(56, 189, 248, 0.22)';
      ctx.strokeStyle = isSelected ? '#facc15' : '#38bdf8';
      ctx.lineWidth = isSelected ? 2.2 : 1.2;
      ctx.fillRect(pxL, pyTop, pxR - pxL, pyBot - pyTop);
      ctx.strokeRect(pxL, pyTop, pxR - pxL, pyBot - pyTop);

      // Revolved mirror below x-axis for disk/washer
      if (method !== 'shell') {
        const [, pyMirrorTop] = toPx(xL, -Ri);
        const [, pyMirrorBot] = toPx(xR, -Ro);
        ctx.fillStyle = isSelected ? 'rgba(250, 204, 21, 0.18)' : 'rgba(56, 189, 248, 0.08)';
        ctx.strokeStyle = isSelected ? 'rgba(250, 204, 21, 0.65)' : 'rgba(56, 189, 248, 0.3)';
        ctx.fillRect(pxL, pyMirrorTop, pxR - pxL, pyMirrorBot - pyMirrorTop);
        ctx.strokeRect(pxL, pyMirrorTop, pxR - pxL, pyMirrorBot - pyMirrorTop);
      }
    }

    // Draw Outer Curve R(x) & Mirror
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = a; x <= b; x += 0.03) {
      const [px, py] = toPx(x, rOuter(x));
      if (x === a) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    if (method !== 'shell') {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = a; x <= b; x += 0.03) {
        const [px, py] = toPx(x, -rOuter(x));
        if (x === a) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Inner Curve r(x) for Washer
    if (method === 'washer') {
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = a; x <= b; x += 0.03) {
        const [px, py] = toPx(x, rInner(x));
        if (x === a) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // RIGHT PANEL: Cross-Sectional Element Diagram at x = x*
    const cx = 680;
    const cy = height / 2 + 10;
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      method === 'disk'
        ? `2D Disk Cross-Section at x* = ${xStar.toFixed(2)}`
        : method === 'washer'
        ? `2D Washer Cross-Section at x* = ${xStar.toFixed(2)}`
        : `Cylindrical Shell Element at x* = ${xStar.toFixed(2)}`,
      cx,
      46
    );

    if (method === 'disk' || method === 'washer') {
      const outerPx = RoStar * 58;
      const innerPx = RiStar * 58;

      // Outer circle
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(cx, cy, outerPx, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Inner hole for washer
      if (method === 'washer' && innerPx > 0) {
        ctx.fillStyle = '#080d1a';
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, innerPx, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // Radius vectors
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + outerPx, cy);
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(`R = ${RoStar.toFixed(2)}`, cx + outerPx / 2, cy - 8);

      if (method === 'washer') {
        ctx.strokeStyle = '#f43f5e';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy - innerPx);
        ctx.stroke();
        ctx.fillStyle = '#f43f5e';
        ctx.fillText(`r = ${RiStar.toFixed(2)}`, cx + 32, cy - innerPx / 2);
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(
        method === 'disk'
          ? `A(x*) = π R² = ${(Math.PI * RoStar * RoStar).toFixed(2)}`
          : `A(x*) = π(R² − r²) = ${(Math.PI * (RoStar * RoStar - RiStar * RiStar)).toFixed(2)}`,
        cx,
        height - 56
      );
      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(`ΔV = A(x*) Δx = ${dV.toFixed(3)}`, cx, height - 34);
    } else {
      // Unrolled Cylindrical Shell slab: width = 2πx*, height = f(x*)
      const slabW = Math.min(240, Math.max(60, 2 * Math.PI * xStar * 14));
      const slabH = Math.min(200, Math.max(40, RoStar * 85));
      const sx = cx - slabW / 2;
      const sy = cy - slabH / 2;

      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.5;
      ctx.fillRect(sx, sy, slabW, slabH);
      ctx.strokeRect(sx, sy, slabW, slabH);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(`Circumference 2πx* = ${(2 * Math.PI * xStar).toFixed(2)}`, cx, sy - 10);
      ctx.fillStyle = '#34d399';
      ctx.fillText(`h = ${RoStar.toFixed(2)}`, sx + slabW + 32, cy);
      ctx.fillStyle = '#facc15';
      ctx.fillText(`ΔV = 2πx* f(x*) Δx = ${dV.toFixed(3)}`, cx, height - 34);
    }

    ctx.textAlign = 'left';
  }, [method, numSlices, safeSlice, a, b, dx, xStar, RoStar, RiStar, dV]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Volume of Solids of Revolution</h3>
          <span className="viz-header__tag">Disk, Washer & Cylindrical Shell Methods</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${method === 'disk' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMethod('disk')}
          >
            Disk: π R(x)² dx
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${method === 'washer' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMethod('washer')}
          >
            Washer: π(R² − r²) dx
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${method === 'shell' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMethod('shell')}
          >
            Shell: 2π x f(x) dx
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Total Volume V" value={totalVolume.toFixed(3)} unit="cubic units" highlight />
        <MetricBadge label="Sample x*" value={xStar.toFixed(2)} unit={`slice #${safeSlice + 1}`} />
        <MetricBadge
          label={method === 'shell' ? 'Shell Radius x*' : 'Outer Radius R(x*)'}
          value={method === 'shell' ? xStar.toFixed(2) : RoStar.toFixed(2)}
          unit={method === 'washer' ? `r(x*) = ${RiStar.toFixed(2)}` : ''}
        />
        <MetricBadge label="Slice Volume ΔV" value={dV.toFixed(3)} unit={`Δx = ${dx.toFixed(2)}`} />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Number of Elements (n)"
            value={numSlices}
            min={4}
            max={36}
            step={1}
            unit=" elements"
            onChange={(val) => {
              setNumSlices(val);
              if (highlightSlice >= val) setHighlightSlice(val - 1);
            }}
          />
          <SliderControl
            label="Inspect Slice (i)"
            value={safeSlice}
            min={0}
            max={numSlices - 1}
            step={1}
            unit=""
            onChange={setHighlightSlice}
          />
        </div>
      </div>
    </div>
  );
}
