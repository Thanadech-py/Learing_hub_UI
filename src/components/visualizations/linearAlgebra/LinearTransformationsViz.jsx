import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function LinearTransformationsViz() {
  const [transPreset, setTransPreset] = useState('rotate'); // 'rotate' | 'shear' | 'scale' | 'custom'
  const [rotAngleDeg, setRotAngleDeg] = useState(30);
  const [shearK, setShearK] = useState(1.0);
  const [scaleX, setScaleX] = useState(1.5);
  const [scaleY, setScaleY] = useState(1.0);

  const canvasRef = useRef(null);

  // Compute 2x2 matrix [[a, b], [c, d]]
  let a = 1, b = 0, c = 0, d = 1;
  if (transPreset === 'rotate') {
    const rad = (rotAngleDeg * Math.PI) / 180;
    a = Math.cos(rad);
    b = -Math.sin(rad);
    c = Math.sin(rad);
    d = Math.cos(rad);
  } else if (transPreset === 'shear') {
    a = 1;
    b = shearK;
    c = 0;
    d = 1;
  } else if (transPreset === 'scale') {
    a = scaleX;
    b = 0;
    c = 0;
    d = scaleY;
  }

  const det = a * d - b * c;

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
    const scale = 50; // px per Cartesian unit

    // 1. Draw Transformed Grid Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    const gridRange = 5;

    for (let i = -gridRange; i <= gridRange; i++) {
      // Lines of constant original x = i (transformed along column 2)
      ctx.beginPath();
      const pTop = {
        x: originX + (a * i + b * -gridRange) * scale,
        y: originY - (c * i + d * -gridRange) * scale,
      };
      const pBot = {
        x: originX + (a * i + b * gridRange) * scale,
        y: originY - (c * i + d * gridRange) * scale,
      };
      ctx.moveTo(pTop.x, pTop.y);
      ctx.lineTo(pBot.x, pBot.y);
      ctx.stroke();

      // Lines of constant original y = j (transformed along column 1)
      ctx.beginPath();
      const pL = {
        x: originX + (a * -gridRange + b * i) * scale,
        y: originY - (c * -gridRange + d * i) * scale,
      };
      const pR = {
        x: originX + (a * gridRange + b * i) * scale,
        y: originY - (c * gridRange + d * i) * scale,
      };
      ctx.moveTo(pL.x, pL.y);
      ctx.lineTo(pR.x, pR.y);
      ctx.stroke();
    }

    // 2. Transformed Unit Square Area (Parallelogram)
    ctx.fillStyle = det >= 0 ? 'rgba(34, 197, 94, 0.25)' : 'rgba(239, 68, 68, 0.25)';
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + a * scale, originY - c * scale);
    ctx.lineTo(originX + (a + b) * scale, originY - (c + d) * scale);
    ctx.lineTo(originX + b * scale, originY - d * scale);
    ctx.closePath();
    ctx.fill();

    // 3. Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, originY);
    ctx.lineTo(width - 20, originY);
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    // 4. Draw Transformed Basis Vectors T(î) and T(ĵ)
    const drawVec = (vx, vy, color, label) => {
      const px = originX + vx * scale;
      const py = originY - vy * scale;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(px, py);
      ctx.stroke();

      const angle = Math.atan2(py - originY, px - originX);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - 10 * Math.cos(angle - Math.PI / 6), py - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(px - 10 * Math.cos(angle + Math.PI / 6), py - 10 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText(label, px + 8, py - 4);
    };

    drawVec(a, c, '#38bdf8', `T(î) = [${a.toFixed(2)}, ${c.toFixed(2)}]ᵀ`);
    drawVec(b, d, '#a78bfa', `T(ĵ) = [${b.toFixed(2)}, ${d.toFixed(2)}]ᵀ`);
  }, [a, b, c, d, det]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Linear Transformation Grid Warper</h3>
          <span className="viz-header__tag">T(î) and T(ĵ)</span>
        </div>
        <div className="viz-mode-tabs">
          {['rotate', 'shear', 'scale'].map((p) => (
            <button
              key={p}
              type="button"
              className={`viz-mode-btn ${transPreset === p ? 'viz-mode-btn--active' : ''}`}
              onClick={() => setTransPreset(p)}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Column 1: T(î)" value={`[${a.toFixed(2)}, ${c.toFixed(2)}]ᵀ`} unit="" highlight />
        <MetricBadge label="Column 2: T(ĵ)" value={`[${b.toFixed(2)}, ${d.toFixed(2)}]ᵀ`} unit="" highlight />
        <MetricBadge label="Determinant" value={det.toFixed(2)} unit="Area Scale" />
        <MetricBadge label="Orientation" value={det >= 0 ? 'Preserved' : 'Reversed (Flipped)'} unit="" />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        {transPreset === 'rotate' && (
          <SliderControl
            label="Rotation Angle (θ)"
            value={rotAngleDeg}
            min={-180}
            max={180}
            step={5}
            unit="°"
            onChange={setRotAngleDeg}
          />
        )}
        {transPreset === 'shear' && (
          <SliderControl
            label="Shear Factor (k)"
            value={shearK}
            min={-2}
            max={2}
            step={0.2}
            unit=""
            onChange={setShearK}
          />
        )}
        {transPreset === 'scale' && (
          <div className="viz-sliders-grid">
            <SliderControl label="Horizontal Scale (s_x)" value={scaleX} min={-2} max={3} step={0.25} unit="" onChange={setScaleX} />
            <SliderControl label="Vertical Scale (s_y)" value={scaleY} min={-2} max={3} step={0.25} unit="" onChange={setScaleY} />
          </div>
        )}
      </div>
    </div>
  );
}
