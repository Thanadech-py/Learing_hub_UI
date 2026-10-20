import { useState, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';
import {
  useIsometric3D,
  IsometricToolbar,
  project3D,
  draw3DGrid,
  draw3DAxes,
  drawOrientationGizmo,
  draw3DVector,
} from './viz3dUtils.jsx';

const PRESETS = {
  'Dominant Growth (λ₁=1.25, λ₂=0.7)': {
    lam1: 1.25,
    lam2: 0.7,
    lam3: 0.3,
    steps: 7,
    u0: [1.0, 1.2, 0.4],
  },
  'Decay to Origin (Stable Sink)': {
    lam1: 0.82,
    lam2: 0.65,
    lam3: 0.45,
    steps: 8,
    u0: [2.0, 2.0, 1.5],
  },
  'Markov Steady State (λ₁=1.00)': {
    lam1: 1.0,
    lam2: 0.5,
    lam3: 0.2,
    steps: 6,
    u0: [1.8, 1.0, 1.2],
  },
  'Fibonacci Golden Ratio (φ ≈ 1.62)': {
    lam1: 1.618,
    lam2: -0.618,
    lam3: 0.0,
    steps: 6,
    u0: [0.8, 0.5, 0.0],
  },
};

function norm3(v) {
  return Math.hypot(v[0], v[1], v[2]);
}

export default function DiagonalizationViz() {
  const [lam1, setLam1] = useState(1.25);
  const [lam2, setLam2] = useState(0.7);
  const [lam3, setLam3] = useState(0.3);
  const [steps, setSteps] = useState(7);
  const [u0, setU0] = useState([1.0, 1.2, 0.4]);
  const [activePreset, setActivePreset] = useState('Dominant Growth (λ₁=1.25, λ₂=0.7)');

  const {
    canvasRef,
    camera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
    baseScale,
    centerOffset,
  } = useIsometric3D('Isometric', { baseScale: 40, snap: 0.1, clampRange: 4.0 });

  // Eigenvectors basis: x1 along [2, 1, 0.5], x2 along [-1, 2, 0.5], x3 along [0, 0, 2]
  const x1 = [2.0, 0.8, 0.4];
  const x2 = [-0.6, 1.8, 0.2];
  const x3 = [0.2, -0.4, 1.8];

  // Calculate discrete trajectory points u_k = c1*lam1^k*x1 + c2*lam2^k*x2 + c3*lam3^k*x3
  // Approximate projection weights c1, c2, c3
  const c1 = 0.5;
  const c2 = 0.5;
  const c3 = 0.3;

  const trajectory = [];
  for (let k = 0; k <= steps; k++) {
    const p1 = Math.pow(lam1, k) * c1;
    const p2 = Math.pow(lam2, k) * c2;
    const p3 = Math.pow(lam3, k) * c3;
    trajectory.push([
      p1 * x1[0] + p2 * x2[0] + p3 * x3[0],
      p1 * x1[1] + p2 * x2[1] + p3 * x3[1],
      p1 * x1[2] + p2 * x2[2] + p3 * x3[2],
    ]);
  }

  const currentUk = trajectory[trajectory.length - 1] || u0;
  const dominantMag = Math.max(Math.abs(lam1), Math.abs(lam2), Math.abs(lam3));
  const systemState =
    Math.abs(dominantMag - 1.0) < 0.03
      ? 'Steady State (||u_k|| → const)'
      : dominantMag > 1.0
      ? 'Dominant Explosion (||u_k|| → ∞)'
      : 'Asymptotic Sink (||u_k|| → 0)';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    draw3DGrid(ctx, camera, width, height, { range: 3.2, gridStep: 0.8 });
    draw3DAxes(ctx, camera, width, height, { axisLength: 3.0 });

    // Draw Eigenvector directions (dashed rays)
    const pX1 = project3D(x1, camera, width, height);
    const pO = project3D([0, 0, 0], camera, width, height);
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pO.x, pO.y);
    ctx.lineTo(pX1.x, pX1.y);
    ctx.stroke();
    ctx.restore();

    // Draw Eigenvector axes labels
    draw3DVector(ctx, camera, width, height, x1, {
      color: '#38bdf8',
      label: 'x₁ (Dominant)',
      lineWidth: 2,
    });
    draw3DVector(ctx, camera, width, height, x2, {
      color: '#a78bfa',
      label: 'x₂',
      lineWidth: 1.5,
    });

    // Draw trajectory trail connecting points u_0, u_1, ..., u_k
    ctx.save();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < trajectory.length; i++) {
      const pt = project3D(trajectory[i], camera, width, height);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();

    // Draw trajectory dots and step labels
    trajectory.forEach((pt3d, i) => {
      const pt = project3D(pt3d, camera, width, height);
      ctx.fillStyle = i === trajectory.length - 1 ? '#ef4444' : i === 0 ? '#10b981' : '#fbbf24';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, i === trajectory.length - 1 ? 5.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();

      if (i === 0 || i === trajectory.length - 1) {
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11px var(--font-sans, sans-serif)';
        ctx.fillText(`u_${i}`, pt.x + 8, pt.y - 4);
      }
    });
    ctx.restore();

    // Draw current u_k vector from origin
    draw3DVector(ctx, camera, width, height, currentUk, {
      color: '#ef4444',
      label: `u_${steps}`,
      lineWidth: 3,
    });

    drawOrientationGizmo(ctx, camera, width, height);
  }, [camera, lam1, lam2, lam3, steps, u0, trajectory, currentUk]);

  const applyPreset = (key) => {
    setActivePreset(key);
    const p = PRESETS[key];
    if (p) {
      setLam1(p.lam1);
      setLam2(p.lam2);
      setLam3(p.lam3);
      setSteps(p.steps);
      setU0(p.u0);
    }
  };

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Matrix Powers & Diagonalization uₖ = Aᵏ u₀</h3>
          <span className="viz-header__tag">Eigen-basis Evolution • Spectral Decomposition</span>
        </div>
      </header>

      {/* Preset Buttons */}
      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Presets:</span>
        {Object.keys(PRESETS).map((key) => (
          <button
            key={key}
            type="button"
            className={`viz-preset-chip ${activePreset === key ? 'viz-preset-chip--active' : ''}`}
            onClick={() => applyPreset(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {/* 3D Isometric Canvas Area */}
      <div className="viz-canvas-area" style={{ height: '480px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
        />
        <canvas
          ref={canvasRef}
          width={720}
          height={480}
          style={{ width: '100%', height: '100%', cursor: 'grab' }}
        />
      </div>

      {/* Live State Badges */}
      <div className="viz-metrics-bar">
        <MetricBadge label="System Dynamics" value={systemState} highlight />
        <MetricBadge label="Current Step" value={`k = ${steps}`} />
        <MetricBadge
          label="Dominant Growth Factor"
          value={`|λ₁|^${steps} = ${Math.pow(Math.abs(lam1), steps).toFixed(2)}`}
        />
        <MetricBadge
          label="Vector Norm ||u_k||"
          value={norm3(currentUk).toFixed(2)}
        />
      </div>

      {/* Sliders Panel */}
      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Iteration Steps k"
            value={steps}
            min={0}
            max={12}
            step={1}
            onChange={(v) => setSteps(Number(v))}
            unit=" steps"
          />
          <SliderControl
            label="Dominant Eigenvalue λ₁"
            value={lam1}
            min={-2.0}
            max={2.0}
            step={0.05}
            onChange={(v) => setLam1(Number(v))}
          />
          <SliderControl
            label="Subordinate Eigenvalue λ₂"
            value={lam2}
            min={-1.5}
            max={1.5}
            step={0.05}
            onChange={(v) => setLam2(Number(v))}
          />
        </div>
      </div>
    </div>
  );
}
