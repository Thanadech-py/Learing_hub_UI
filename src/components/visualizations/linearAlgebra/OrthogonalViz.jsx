import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function OrthogonalViz() {
  const [labMode, setLabMode] = useState('projection'); // 'projection' | 'least-squares'
  const [vx, setVx] = useState(3);
  const [vy, setVy] = useState(4);
  const [ux, setUx] = useState(4);
  const [uy, setUy] = useState(1);

  // Least squares slope and intercept
  const [lsSlope, setLsSlope] = useState(0.8);
  const [lsIntercept, setLsIntercept] = useState(0.5);

  const canvasRef = useRef(null);

  // Vector projection: p = ((v·u) / (u·u)) u
  const dotVU = vx * ux + vy * uy;
  const dotUU = ux * ux + uy * uy;
  const projScalar = dotUU > 0 ? dotVU / dotUU : 0;
  const px = projScalar * ux;
  const py = projScalar * uy;

  // Orthogonal error vector e = v - p
  const ex = vx - px;
  const ey = vy - py;
  const lenError = Math.hypot(ex, ey);

  // Data points for least squares regression
  const dataPoints = [
    { x: 1, y: 1.2 },
    { x: 2, y: 2.3 },
    { x: 3, y: 2.7 },
    { x: 4, y: 3.9 },
    { x: 5, y: 4.4 },
  ];

  // Compute sum of squared errors
  let sse = 0;
  dataPoints.forEach((pt) => {
    const yModel = lsSlope * pt.x + lsIntercept;
    sse += (pt.y - yModel) ** 2;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    if (labMode === 'projection') {
      // ----------------------------------------
      // MODE 1: VECTOR PROJECTION & ORTHOGONAL RESIDUAL
      // ----------------------------------------
      const originX = width / 2 - 50;
      const originY = height / 2 + 30;
      const scale = 40;

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

      // Draw Subspace Line along vector u (faint dashed yellow)
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(originX - 10 * ux * scale, originY + 10 * uy * scale);
      ctx.lineTo(originX + 10 * ux * scale, originY - 10 * uy * scale);
      ctx.stroke();
      ctx.setLineDash([]);

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
      const pV = toPx(vx, vy);
      const pU = toPx(ux, uy);
      const pProj = toPx(px, py);

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

      // Draw Line vector u
      drawVector(p0, pU, '#f59e0b', 'u (Subspace Direction)', 2);

      // Draw original vector v
      drawVector(p0, pV, '#a78bfa', `v = [${vx}, ${vy}]ᵀ`, 3);

      // Draw projection vector p
      drawVector(p0, pProj, '#22c55e', `p = proj_u(v) = [${px.toFixed(2)}, ${py.toFixed(2)}]ᵀ`, 4);

      // Draw Perpendicular Error Vector e = v - p (red)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(pV.x, pV.y);
      ctx.lineTo(pProj.x, pProj.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`Perpendicular Error e (Length = ${lenError.toFixed(2)})`, (pV.x + pProj.x) / 2 + 10, (pV.y + pProj.y) / 2);
    } else {
      // ----------------------------------------
      // MODE 2: LEAST SQUARES LINEAR REGRESSION
      // ----------------------------------------
      const originX = 100;
      const originY = height - 60;
      const scaleX = 100;
      const scaleY = 50;

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(width - 40, originY);
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, 30);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText('x (Features) →', width - 90, originY + 20);
      ctx.fillText('y (Target b) ↑', originX - 70, 40);

      // Draw Best Fit Line y = slope*x + intercept
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const x0 = 0.5;
      const x1 = 5.5;
      ctx.moveTo(originX + x0 * scaleX, originY - (lsSlope * x0 + lsIntercept) * scaleY);
      ctx.lineTo(originX + x1 * scaleX, originY - (lsSlope * x1 + lsIntercept) * scaleY);
      ctx.stroke();

      // Plot Data Points and Vertical Residual Lines
      dataPoints.forEach((pt) => {
        const px = originX + pt.x * scaleX;
        const pyData = originY - pt.y * scaleY;
        const pyModel = originY - (lsSlope * pt.x + lsIntercept) * scaleY;

        // Residual line (error e_i)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(px, pyData);
        ctx.lineTo(px, pyModel);
        ctx.stroke();
        ctx.setLineDash([]);

        // Data point dot
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(px, pyData, 6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(`Least Squares Model: y = ${lsSlope.toFixed(2)}x + ${lsIntercept.toFixed(2)}`, 130, 50);
      ctx.fillStyle = '#ef4444';
      ctx.fillText(`Sum of Squared Errors (SSE): ${sse.toFixed(3)}`, 130, 70);
    }
  }, [labMode, vx, vy, ux, uy, px, py, lenError, lsSlope, lsIntercept, sse]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Orthogonal Projections & Least Squares</h3>
          <span className="viz-header__tag">AᵀA x̂ = Aᵀb</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${labMode === 'projection' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setLabMode('projection')}
          >
            Vector Projection & Residual
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${labMode === 'least-squares' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setLabMode('least-squares')}
          >
            Least Squares Regression Fit
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        {labMode === 'projection' ? (
          <>
            <MetricBadge label="Target Vector v" value={`[${vx}, ${vy}]ᵀ`} unit="" />
            <MetricBadge label="Subspace Vector u" value={`[${ux}, ${uy}]ᵀ`} unit="" />
            <MetricBadge label="Projection p" value={`[${px.toFixed(2)}, ${py.toFixed(2)}]ᵀ`} unit="" highlight />
            <MetricBadge label="Orthogonal Error e" value={`||v - p|| = ${lenError.toFixed(2)}`} unit="Perpendicular!" highlight />
            <MetricBadge label="Dot Product e · u" value="0.000" unit="Strictly 0" />
          </>
        ) : (
          <>
            <MetricBadge label="Model Slope" value={lsSlope.toFixed(2)} unit="" />
            <MetricBadge label="Model Intercept" value={lsIntercept.toFixed(2)} unit="" />
            <MetricBadge label="Squared Residuals (SSE)" value={sse.toFixed(3)} unit="" highlight />
            <MetricBadge label="Optimal Sol x̂" value="(AᵀA)⁻¹ Aᵀb" unit="" />
          </>
        )}
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        {labMode === 'projection' ? (
          <div className="viz-sliders-grid">
            <SliderControl label="Vector v_x" value={vx} min={-5} max={5} step={0.5} unit="" onChange={setVx} />
            <SliderControl label="Vector v_y" value={vy} min={-5} max={5} step={0.5} unit="" onChange={setVy} />
            <SliderControl label="Subspace u_x" value={ux} min={-5} max={5} step={0.5} unit="" onChange={setUx} />
            <SliderControl label="Subspace u_y" value={uy} min={-5} max={5} step={0.5} unit="" onChange={setUy} />
          </div>
        ) : (
          <div className="viz-sliders-grid">
            <SliderControl label="Regression Slope" value={lsSlope} min={0.2} max={1.6} step={0.05} unit="" onChange={setLsSlope} />
            <SliderControl label="Regression Intercept" value={lsIntercept} min={-1.0} max={2.0} step={0.1} unit="" onChange={setLsIntercept} />
          </div>
        )}
      </div>
    </div>
  );
}
