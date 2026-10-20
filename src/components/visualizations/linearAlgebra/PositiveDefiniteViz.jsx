import { useState, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';
import {
  useIsometric3D,
  IsometricToolbar,
  project3D,
  draw3DGrid,
  draw3DAxes,
  drawOrientationGizmo,
} from './viz3dUtils.jsx';

const PRESETS = {
  'Steep Symmetric Basin (S ≻ 0)': {
    a: 2.0,
    b: 0.0,
    c: 2.0,
    probeX: 0.8,
    probeY: 0.6,
  },
  'Tilted Elliptical Canyon (S ≻ 0)': {
    a: 2.2,
    b: 1.1,
    c: 1.8,
    probeX: 0.9,
    probeY: -0.5,
  },
  'Hyperbolic Saddle Pass (Indefinite)': {
    a: 1.0,
    b: 1.8,
    c: 1.0,
    probeX: 0.7,
    probeY: -0.7,
  },
  'Valley Ridge (Semi-Definite)': {
    a: 1.2,
    b: 1.2,
    c: 1.2,
    probeX: 0.8,
    probeY: 0.8,
  },
};

export default function PositiveDefiniteViz() {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(0.0);
  const [c, setC] = useState(2.0);
  const [probeX, setProbeX] = useState(0.8);
  const [probeY, setProbeY] = useState(0.6);
  const [activePreset, setActivePreset] = useState('Steep Symmetric Basin (S ≻ 0)');

  const {
    canvasRef,
    camera,
    setPreset,
  } = useIsometric3D('Isometric', { baseScale: 44, snap: 0.1, clampRange: 3.5 });

  // Invariants: Determinant det(S) = ac - b^2, Trace tr(S) = a + c
  const detS = a * c - b * b;
  const traceS = a + c;

  // Eigenvalues for 2x2: m = tr/2, rad = sqrt(m^2 - det)
  const m = traceS / 2;
  const disc = Math.max(0, m * m - detS);
  const rad = Math.sqrt(disc);
  const lam1 = m + rad;
  const lam2 = m - rad;

  // Energy at probe point: z = a*x^2 + 2*b*x*y + c*y^2
  const probeZ = a * probeX * probeX + 2 * b * probeX * probeY + c * probeY * probeY;

  // Classify definiteness
  let definiteness = 'Indefinite (Saddle)';
  let defColor = '#f59e0b';
  if (detS > 0.001) {
    if (a > 0) {
      definiteness = 'Positive Definite (S ≻ 0)';
      defColor = '#10b981';
    } else {
      definiteness = 'Negative Definite (S ≺ 0)';
      defColor = '#ef4444';
    }
  } else if (Math.abs(detS) <= 0.001) {
    definiteness = 'Positive Semi-Definite (S ⪰ 0)';
    defColor = '#38bdf8';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    draw3DGrid(ctx, camera, width, height, { range: 2.5, gridStep: 0.8 });
    draw3DAxes(ctx, camera, width, height, { axisLength: 2.6 });

    // Render 3D Wireframe Paraboloid Surface z = a*x^2 + 2b*xy + c*y^2
    const N = 16;
    const range = 1.4;
    const step = (range * 2) / N;

    ctx.save();
    ctx.lineWidth = 1.0;

    // Draw lines along x (constant y)
    for (let j = 0; j <= N; j++) {
      const yVal = -range + j * step;
      ctx.beginPath();
      let first = true;
      for (let i = 0; i <= N; i++) {
        const xVal = -range + i * step;
        const zVal = (a * xVal * xVal + 2 * b * xVal * yVal + c * yVal * yVal) * 0.4;
        const clampedZ = Math.max(-2.5, Math.min(2.8, zVal));
        const pt = project3D([xVal, yVal, clampedZ], camera, width, height);
        if (first) {
          ctx.moveTo(pt.x, pt.y);
          first = false;
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      const alpha = 0.2 + (j / N) * 0.4;
      ctx.strokeStyle =
        detS > 0 && a > 0
          ? `rgba(56, 189, 248, ${alpha})`
          : detS < 0
          ? `rgba(245, 158, 11, ${alpha})`
          : `rgba(239, 68, 68, ${alpha})`;
      ctx.stroke();
    }

    // Draw lines along y (constant x)
    for (let i = 0; i <= N; i++) {
      const xVal = -range + i * step;
      ctx.beginPath();
      let first = true;
      for (let j = 0; j <= N; j++) {
        const yVal = -range + j * step;
        const zVal = (a * xVal * xVal + 2 * b * xVal * yVal + c * yVal * yVal) * 0.4;
        const clampedZ = Math.max(-2.5, Math.min(2.8, zVal));
        const pt = project3D([xVal, yVal, clampedZ], camera, width, height);
        if (first) {
          ctx.moveTo(pt.x, pt.y);
          first = false;
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.strokeStyle =
        detS > 0 && a > 0
          ? 'rgba(52, 211, 153, 0.35)'
          : detS < 0
          ? 'rgba(245, 158, 11, 0.35)'
          : 'rgba(239, 68, 68, 0.35)';
      ctx.stroke();
    }
    ctx.restore();

    // Draw probe point on surface
    const probeZClamped = Math.max(-2.5, Math.min(2.8, probeZ * 0.4));
    const ptProbe = project3D([probeX, probeY, probeZClamped], camera, width, height);
    const ptFloor = project3D([probeX, probeY, 0], camera, width, height);

    // Drop line to floor
    ctx.save();
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.beginPath();
    ctx.moveTo(ptFloor.x, ptFloor.y);
    ctx.lineTo(ptProbe.x, ptProbe.y);
    ctx.stroke();

    // Floor point
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.arc(ptFloor.x, ptFloor.y, 3, 0, Math.PI * 2);
    ctx.fill();

    // Surface Beacon
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(ptProbe.x, ptProbe.y, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px var(--font-mono, monospace)';
    ctx.fillText(`E = ${probeZ.toFixed(2)}`, ptProbe.x + 8, ptProbe.y - 4);
    ctx.restore();

    drawOrientationGizmo(ctx, camera, width, height);
  }, [camera, a, b, c, probeX, probeY, probeZ, detS]);

  const applyPreset = (key) => {
    setActivePreset(key);
    const p = PRESETS[key];
    if (p) {
      setA(p.a);
      setB(p.b);
      setC(p.c);
      setProbeX(p.probeX);
      setProbeY(p.probeY);
    }
  };

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Positive Definiteness & 3D Quadratic Bowl</h3>
          <span className="viz-header__tag">xᵀAx &gt; 0 • Elliptic Paraboloid • Curvature</span>
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

      {/* Metrics & Test Verification */}
      <div className="viz-metrics-bar">
        <MetricBadge
          label="Definiteness Class"
          value={definiteness}
          highlight
        />
        <MetricBadge
          label="Sylvester Minor det(S)"
          value={`ac - b² = ${detS.toFixed(2)}`}
        />
        <MetricBadge
          label="Eigenvalues"
          value={`λ₁ = ${lam1.toFixed(2)}, λ₂ = ${lam2.toFixed(2)}`}
        />
        <MetricBadge
          label="Energy at Probe Point"
          value={`xᵀSx = ${probeZ.toFixed(2)}`}
        />
      </div>

      {/* Matrix Controls */}
      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Matrix Entry a = s₁₁"
            value={a}
            min={-3.0}
            max={3.5}
            step={0.1}
            onChange={(v) => setA(Number(v))}
          />
          <SliderControl
            label="Off-Diagonal b = s₁₂ = s₂₁"
            value={b}
            min={-2.5}
            max={2.5}
            step={0.1}
            onChange={(v) => setB(Number(v))}
          />
          <SliderControl
            label="Matrix Entry c = s₂₂"
            value={c}
            min={-3.0}
            max={3.5}
            step={0.1}
            onChange={(v) => setC(Number(v))}
          />
          <SliderControl
            label="Probe Coordinate x"
            value={probeX}
            min={-1.2}
            max={1.2}
            step={0.05}
            onChange={(v) => setProbeX(Number(v))}
          />
          <SliderControl
            label="Probe Coordinate y"
            value={probeY}
            min={-1.2}
            max={1.2}
            step={0.05}
            onChange={(v) => setProbeY(Number(v))}
          />
        </div>
      </div>
    </div>
  );
}
