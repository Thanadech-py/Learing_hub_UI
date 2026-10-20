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
  'Distinct Orthogonal Spectrum': {
    lam1: 1.8,
    lam2: 1.2,
    lam3: 0.6,
    xVec: [1.2, 1.0, 0.8],
  },
  'Planar Flattening (λ₃ = 0)': {
    lam1: 2.0,
    lam2: 1.5,
    lam3: 0.0,
    xVec: [1.0, 1.4, 1.2],
  },
  'Isotropic Expansion (λ₁ = λ₂ = λ₃)': {
    lam1: 1.5,
    lam2: 1.5,
    lam3: 1.5,
    xVec: [1.0, 1.0, 1.0],
  },
  'Indefinite Saddle (λ₁ > 0, λ₂ < 0)': {
    lam1: 1.6,
    lam2: -1.2,
    lam3: 0.8,
    xVec: [1.2, 0.8, 0.6],
  },
};

function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function norm3(a) {
  return Math.hypot(a[0], a[1], a[2]);
}

function scale3(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}

export default function SymmetricMatricesViz() {
  const [lam1, setLam1] = useState(1.8);
  const [lam2, setLam2] = useState(1.2);
  const [lam3, setLam3] = useState(0.6);
  const [xVec, setXVec] = useState([1.2, 1.0, 0.8]);
  const [showTile1, setShowTile1] = useState(true);
  const [showTile2, setShowTile2] = useState(true);
  const [showTile3, setShowTile3] = useState(true);
  const [activePreset, setActivePreset] = useState('Distinct Orthogonal Spectrum');

  const {
    canvasRef,
    camera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
  } = useIsometric3D('Isometric', { baseScale: 40, snap: 0.1, clampRange: 3.5 });

  // Mutually orthogonal unit eigenvectors Q = [q1, q2, q3]
  // Pre-normalized orthogonal set: q1 = [2/3, 2/3, 1/3], q2 = [-2/3, 1/3, 2/3], q3 = [1/3, -2/3, 2/3]
  const q1 = [2 / 3, 2 / 3, 1 / 3];
  const q2 = [-2 / 3, 1 / 3, 2 / 3];
  const q3 = [1 / 3, -2 / 3, 2 / 3];

  // Spectral coordinates: c_i = q_i^T x
  const c1 = dot3(q1, xVec);
  const c2 = dot3(q2, xVec);
  const c3 = dot3(q3, xVec);

  // Projection tile components: term_i = lam_i * c_i * q_i
  const term1 = scale3(q1, lam1 * c1);
  const term2 = scale3(q2, lam2 * c2);
  const term3 = scale3(q3, lam3 * c3);

  // Transformed vector Sx = sum of active tiles
  const sX = [
    (showTile1 ? term1[0] : 0) + (showTile2 ? term2[0] : 0) + (showTile3 ? term3[0] : 0),
    (showTile1 ? term1[1] : 0) + (showTile2 ? term2[1] : 0) + (showTile3 ? term3[1] : 0),
    (showTile1 ? term1[2] : 0) + (showTile2 ? term2[2] : 0) + (showTile3 ? term3[2] : 0),
  ];

  // Dot products verifying mutual orthogonality
  const dot12 = dot3(q1, q2);
  const dot13 = dot3(q1, q3);
  const dot23 = dot3(q2, q3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    draw3DGrid(ctx, camera, width, height, { range: 3.0, gridStep: 0.8 });
    draw3DAxes(ctx, camera, width, height, { axisLength: 2.8 });

    // Draw the 3 mutually orthogonal eigenvector frame vectors (scaled by 1.8 for visual clarity)
    draw3DVector(ctx, camera, width, height, scale3(q1, 1.8), {
      color: '#38bdf8',
      label: 'q₁',
      lineWidth: 2,
    });
    draw3DVector(ctx, camera, width, height, scale3(q2, 1.8), {
      color: '#a78bfa',
      label: 'q₂',
      lineWidth: 2,
    });
    draw3DVector(ctx, camera, width, height, scale3(q3, 1.8), {
      color: '#34d399',
      label: 'q₃',
      lineWidth: 2,
    });

    // Draw input vector x
    draw3DVector(ctx, camera, width, height, xVec, {
      color: '#f59e0b',
      label: 'x (Input)',
      lineWidth: 2.5,
    });

    // Draw individual active projection tiles (dashed lines)
    if (showTile1) {
      draw3DVector(ctx, camera, width, height, term1, {
        color: 'rgba(56, 189, 248, 0.7)',
        label: 'λ₁(q₁ᵀx)q₁',
        lineWidth: 1.5,
      });
    }
    if (showTile2) {
      draw3DVector(ctx, camera, width, height, term2, {
        color: 'rgba(167, 139, 250, 0.7)',
        label: 'λ₂(q₂ᵀx)q₂',
        lineWidth: 1.5,
      });
    }
    if (showTile3) {
      draw3DVector(ctx, camera, width, height, term3, {
        color: 'rgba(52, 211, 153, 0.7)',
        label: 'λ₃(q₃ᵀx)q₃',
        lineWidth: 1.5,
      });
    }

    // Draw resulting output vector Sx
    draw3DVector(ctx, camera, width, height, sX, {
      color: '#ef4444',
      label: 'Sx = ∑ λᵢ qᵢqᵢᵀx',
      lineWidth: 3,
    });

    drawOrientationGizmo(ctx, camera, width, height);
  }, [camera, lam1, lam2, lam3, xVec, showTile1, showTile2, showTile3, sX]);

  const applyPreset = (key) => {
    setActivePreset(key);
    const p = PRESETS[key];
    if (p) {
      setLam1(p.lam1);
      setLam2(p.lam2);
      setLam3(p.lam3);
      setXVec(p.xVec);
    }
  };

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Spectral Theorem & Orthogonal Frame S = QΛQᵀ</h3>
          <span className="viz-header__tag">Real Eigenvalues • Mutual Orthogonality qᵢ ⊥ qⱼ</span>
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
          extraButtons={
            <>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1', fontSize: '0.74rem', cursor: 'pointer', margin: '0 4px' }}>
                <input
                  type="checkbox"
                  checked={showTile1}
                  onChange={(e) => setShowTile1(e.target.checked)}
                />
                P₁ = λ₁q₁q₁ᵀ
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1', fontSize: '0.74rem', cursor: 'pointer', margin: '0 4px' }}>
                <input
                  type="checkbox"
                  checked={showTile2}
                  onChange={(e) => setShowTile2(e.target.checked)}
                />
                P₂ = λ₂q₂q₂ᵀ
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#cbd5e1', fontSize: '0.74rem', cursor: 'pointer', margin: '0 4px' }}>
                <input
                  type="checkbox"
                  checked={showTile3}
                  onChange={(e) => setShowTile3(e.target.checked)}
                />
                P₃ = λ₃q₃q₃ᵀ
              </label>
            </>
          }
        />
        <canvas
          ref={canvasRef}
          width={720}
          height={480}
          style={{ width: '100%', height: '100%', cursor: 'grab' }}
        />
      </div>

      {/* Metrics */}
      <div className="viz-metrics-bar">
        <MetricBadge
          label="Mutual Orthogonality"
          value={`q₁·q₂ = ${Math.abs(dot12).toFixed(3)}, q₁·q₃ = ${Math.abs(dot13).toFixed(3)}`}
          highlight
        />
        <MetricBadge
          label="Trace (Sum of λ)"
          value={(lam1 + lam2 + lam3).toFixed(2)}
        />
        <MetricBadge
          label="Determinant (∏ λ)"
          value={(lam1 * lam2 * lam3).toFixed(2)}
        />
        <MetricBadge
          label="Output Norm ||Sx||"
          value={norm3(sX).toFixed(2)}
        />
      </div>

      {/* Sliders Panel */}
      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Eigenvalue λ₁ (q₁ Stretch)"
            value={lam1}
            min={-2.5}
            max={2.5}
            step={0.1}
            onChange={(v) => setLam1(Number(v))}
          />
          <SliderControl
            label="Eigenvalue λ₂ (q₂ Stretch)"
            value={lam2}
            min={-2.5}
            max={2.5}
            step={0.1}
            onChange={(v) => setLam2(Number(v))}
          />
          <SliderControl
            label="Eigenvalue λ₃ (q₃ Stretch)"
            value={lam3}
            min={-2.5}
            max={2.5}
            step={0.1}
            onChange={(v) => setLam3(Number(v))}
          />
        </div>
      </div>
    </div>
  );
}
