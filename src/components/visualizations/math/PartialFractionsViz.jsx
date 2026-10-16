import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function PartialFractionsViz() {
  const [root1, setRoot1] = useState(-1.5); // r1
  const [root2, setRoot2] = useState(2.0); // r2
  const [numP, setNumP] = useState(1.0); // p in px + q
  const [numQ, setNumQ] = useState(3.0); // q in px + q
  const [intA, setIntA] = useState(-0.5); // lower limit safely between r1 and r2
  const [intB, setIntB] = useState(1.2); // upper limit safely between r1 and r2

  const canvasRef = useRef(null);

  // Ensure roots don't collide
  const r1 = Math.min(root1, root2 - 0.5);
  const r2 = Math.max(root2, root1 + 0.5);

  // Heaviside Cover-up Method:
  // A = P(r1) / (r1 - r2)
  // B = P(r2) / (r2 - r1)
  const valP1 = numP * r1 + numQ;
  const valP2 = numP * r2 + numQ;
  const coeffA = valP1 / (r1 - r2);
  const coeffB = valP2 / (r2 - r1);

  // Clamped integration limits safely between r1 and r2
  const safeA = Math.max(r1 + 0.1, Math.min(intA, r2 - 0.2));
  const safeB = Math.max(safeA + 0.1, Math.min(intB, r2 - 0.1));

  // Analytical integral:
  // ∫ A/(x - r1) + B/(x - r2) dx = A ln|x - r1| + B ln|x - r2|
  const antideriv = (x) => coeffA * Math.log(Math.abs(x - r1)) + coeffB * Math.log(Math.abs(x - r2));
  const exactArea = antideriv(safeB) - antideriv(safeA);

  const evalComposite = (x) => {
    const denom = (x - r1) * (x - r2);
    if (Math.abs(denom) < 0.05) return 0;
    return (numP * x + numQ) / denom;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2 + 15;
    const scaleX = 85;
    const scaleY = 55;

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let px = originX % scaleX; px < width; px += scaleX) {
      ctx.beginPath();
      ctx.moveTo(px, 30);
      ctx.lineTo(px, height - 30);
      ctx.stroke();
    }
    for (let py = originY % scaleY; py < height; py += scaleY) {
      ctx.beginPath();
      ctx.moveTo(30, py);
      ctx.lineTo(width - 30, py);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, originY);
    ctx.lineTo(width - 30, originY);
    ctx.moveTo(originX, 30);
    ctx.lineTo(originX, height - 30);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('x →', width - 40, originY + 18);
    ctx.fillText('y ↑', originX - 30, 40);

    const toPx = (x, y) => ({
      x: originX + x * scaleX,
      y: originY - y * scaleY,
    });

    // Vertical Asymptotes at r1 and r2 (red dashed)
    [r1, r2].forEach((r) => {
      const px = originX + r * scaleX;
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(px, 30);
      ctx.lineTo(px, height - 30);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 10px system-ui, sans-serif';
      ctx.fillText(`x = ${r.toFixed(1)}`, px - 18, 45);
    });

    // Shaded Area between safeA and safeB
    const areaSteps = 80;
    ctx.fillStyle = exactArea >= 0 ? 'rgba(56, 189, 248, 0.22)' : 'rgba(244, 63, 94, 0.22)';
    ctx.beginPath();
    const pStart = toPx(safeA, 0);
    ctx.moveTo(pStart.x, pStart.y);

    for (let i = 0; i <= areaSteps; i++) {
      const x = safeA + (i / areaSteps) * (safeB - safeA);
      const pt = toPx(x, evalComposite(x));
      ctx.lineTo(pt.x, Math.max(30, Math.min(height - 30, pt.y)));
    }
    const pEnd = toPx(safeB, 0);
    ctx.lineTo(pEnd.x, pEnd.y);
    ctx.closePath();
    ctx.fill();

    // Plot Composite Function y = P(x)/Q(x) (Cyan solid)
    const plotSegment = (startX, endX) => {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;
      const segSteps = 80;
      for (let i = 0; i <= segSteps; i++) {
        const x = startX + (i / segSteps) * (endX - startX);
        const y = evalComposite(x);
        if (Math.abs(y) > 8) {
          started = false;
          continue;
        }
        const pt = toPx(x, y);
        if (!started) {
          ctx.moveTo(pt.x, pt.y);
          started = true;
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.stroke();
    };

    plotSegment(-4.5, r1 - 0.12);
    plotSegment(r1 + 0.12, r2 - 0.12);
    plotSegment(r2 + 0.12, 4.5);

    // Limit boundary markers
    [
      { x: safeA, label: `a=${safeA.toFixed(1)}` },
      { x: safeB, label: `b=${safeB.toFixed(1)}` },
    ].forEach((lim) => {
      const p = toPx(lim.x, 0);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(lim.label, p.x - 14, originY + 22);
    });
  }, [r1, r2, numP, numQ, safeA, safeB, exactArea]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Partial Fraction Decomposition & Rational Integration</h3>
          <span className="viz-header__tag">Heaviside Cover-Up: A/(x - r₁) + B/(x - r₂)</span>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Decomposed Form:</span>
        <span className="viz-preset-chip viz-preset-chip--active">
          ({numP}x + {numQ}) / [(x - {r1.toFixed(1)})(x - {r2.toFixed(1)})]
        </span>
        <span className="viz-preset-chip" style={{ color: '#a78bfa' }}>
          = {coeffA.toFixed(2)} / (x - {r1.toFixed(1)}) + {coeffB.toFixed(2)} / (x - {r2.toFixed(1)})
        </span>
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Coefficient A" value={coeffA.toFixed(2)} unit={`at root x = ${r1.toFixed(1)}`} highlight />
        <MetricBadge label="Coefficient B" value={coeffB.toFixed(2)} unit={`at root x = ${r2.toFixed(1)}`} highlight />
        <MetricBadge label="Integration Range" value={`[${safeA.toFixed(2)}, ${safeB.toFixed(2)}]`} unit="safe zone" />
        <MetricBadge label="Exact Area ∫ₐᵇ P/Q dx" value={exactArea.toFixed(4)} unit="A·ln|x-r₁| + B·ln|x-r₂|" highlight />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Root r₁ (Asymptote 1)" value={root1} min={-3.0} max={-0.5} step={0.1} onChange={setRoot1} />
          <SliderControl label="Root r₂ (Asymptote 2)" value={root2} min={0.5} max={3.0} step={0.1} onChange={setRoot2} />
          <SliderControl label="Numerator Slope (p)" value={numP} min={-2.0} max={2.0} step={0.2} onChange={setNumP} />
          <SliderControl label="Numerator Offset (q)" value={numQ} min={-4.0} max={4.0} step={0.5} onChange={setNumQ} />
          <SliderControl label="Lower Limit a" value={intA} min={r1 + 0.1} max={safeB - 0.2} step={0.1} onChange={setIntA} />
          <SliderControl label="Upper Limit b" value={intB} min={safeA + 0.2} max={r2 - 0.1} step={0.1} onChange={setIntB} />
        </div>
      </div>
    </div>
  );
}
