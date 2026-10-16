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
  '3 Distinct Eigenvalues': {
    lam1: 2.0,
    lam2: 1.2,
    lam3: 0.6,
    v: [1.4, 1.2, 1.0],
  },
  'Snap v to Eigenvector e₁ (Av = 2v)': {
    lam1: 2.0,
    lam2: 1.0,
    lam3: -0.8,
    v: [1.6, 0.8, 0.0], // exact direction of e1 = [2, 1, 0]
  },
  'Snap v to Eigenvector e₃ (Av = -1.2v)': {
    lam1: 1.8,
    lam2: 1.0,
    lam3: -1.2,
    v: [0.0, 0.6, 1.8], // exact direction of e3 = [0, 1, 3]
  },
  'Singular (λ₃ = 0 Collapse)': {
    lam1: 2.0,
    lam2: 1.4,
    lam3: 0.0,
    v: [1.4, 1.0, 1.5],
  },
};

function cross3(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function norm3(a) {
  return Math.hypot(a[0], a[1], a[2]);
}

function normalize3(a) {
  const len = norm3(a) || 1;
  return [a[0] / len, a[1] / len, a[2] / len];
}

export default function EigenvaluesViz() {
  const [lam1, setLam1] = useState(2.0);
  const [lam2, setLam2] = useState(1.2);
  const [lam3, setLam3] = useState(0.6);
  const [v, setV] = useState([1.4, 1.2, 1.0]);
  const [showEigenBasis, setShowEigenBasis] = useState(true);
  const [activePreset, setActivePreset] = useState('3 Distinct Eigenvalues');

  const {
    canvasRef,
    camera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
    baseScale,
    centerOffset,
  } = useIsometric3D('Isometric', { baseScale: 42, snap: 0.1, clampRange: 3.4 });

  // Fixed clean 3D eigenvector directions e1, e2, e3 (orthogonal or skewed basis)
  const e1 = normalize3([2.0, 1.0, 0.0]);
  const e2 = normalize3([-1.0, 2.0, 0.5]);
  const e3 = normalize3(cross3(e1, e2));

  // Project v onto the eigenbasis {e1, e2, e3} -> Av = c1*lam1*e1 + c2*lam2*e2 + c3*lam3*e3
  const c1 = dot3(v, e1);
  const c2 = dot3(v, e2);
  const c3 = dot3(v, e3);

  const av = [
    c1 * lam1 * e1[0] + c2 * lam2 * e2[0] + c3 * lam3 * e3[0],
    c1 * lam1 * e1[1] + c2 * lam2 * e2[1] + c3 * lam3 * e3[1],
    c1 * lam1 * e1[2] + c2 * lam2 * e2[2] + c3 * lam3 * e3[2],
  ];

  // Collinearity test ||v × Av|| / (||v|| ||Av||)
  const lenV = norm3(v);
  const lenAv = norm3(av);
  const sinAngle =
    lenV > 1e-4 && lenAv > 1e-4
      ? norm3(cross3(v, av)) / (lenV * lenAv)
      : 0;
  const isEigenvector = lenV > 0.2 && sinAngle < 0.08;
  const effectiveRatio = lenV > 0.1 ? (dot3(v, av) / (lenV * lenV)).toFixed(2) : '0.00';

  const snapToEigen = (dir) => {
    setActivePreset(null);
    setV([
      +(dir[0] * 2.0).toFixed(2),
      +(dir[1] * 2.0).toFixed(2),
      +(dir[2] * 2.0).toFixed(2),
    ]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    draw3DGrid(ctx, camera, width, height, { range: 4, baseScale, centerOffset });
    draw3DAxes(ctx, camera, width, height, { range: 4.2, baseScale, centerOffset });

    const proj = (pt) => project3D(pt, camera, width, height, baseScale, centerOffset);

    // Draw the 3 Invariant Eigen-Axes spanning R^3
    if (showEigenBasis) {
      const axesData = [
        { dir: e1, lam: lam1, color: '#f59e0b', name: 'e₁' },
        { dir: e2, lam: lam2, color: '#a78bfa', name: 'e₂' },
        { dir: e3, lam: lam3, color: '#ec4899', name: 'e₃' },
      ];

      for (const ax of axesData) {
        const pA = proj(ax.dir.map((d) => -d * 3.4));
        const pB = proj(ax.dir.map((d) => d * 3.4));
        ctx.save();
        ctx.strokeStyle = ax.color;
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = ax.color;
        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.fillText(`Eigen-axis ${ax.name} (λ=${ax.lam})`, pB.x + 6, pB.y - 4);
        ctx.restore();
      }
    }

    // Transformed output vector Av
    draw3DVector(ctx, camera, width, height, av, {
      color: isEigenvector ? '#22c55e' : '#f43f5e',
      label: `Av = [${av.map((n) => n.toFixed(1)).join(',')}]`,
      lineWidth: 3.6,
      showDropStalk: true,
      baseScale,
      centerOffset,
    });

    // Draggable test vector v
    const tipV = draw3DVector(ctx, camera, width, height, v, {
      color: '#38bdf8',
      label: isEigenvector
        ? `v ★ EIGENVECTOR! (Av ≈ ${effectiveRatio}v)`
        : `v = [${v.map((n) => n.toFixed(1)).join(',')}]`,
      lineWidth: 3.3,
      draggable: true,
      isDragging: activeHandleId === 'v',
      isHovered: hoveredHandleId === 'v',
      baseScale,
      centerOffset,
    });

    drawOrientationGizmo(ctx, camera, width);

    handlesRef.current = [
      {
        id: 'v',
        vec: v,
        screen: tipV,
        onChange: (next) => {
          setActivePreset(null);
          setV(next);
        },
      },
    ];
  }, [lam1, lam2, lam3, v, av, e1, e2, e3, isEigenvector, effectiveRatio, showEigenBasis, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Eigenvalues, Invariant Axes & Diagonalization (A = PΛP⁻¹)</h3>
          <span className="viz-header__tag">Av = λv • 3D Eigenvector Hunter</span>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Presets & Snap:</span>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            className={`viz-preset-chip ${activePreset === name ? 'viz-preset-chip--active' : ''}`}
            onClick={() => {
              const p = PRESETS[name];
              setLam1(p.lam1);
              setLam2(p.lam2);
              setLam3(p.lam3);
              setV([...p.v]);
              setActivePreset(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Spectrum (λ₁, λ₂, λ₃)" value={`${lam1}, ${lam2}, ${lam3}`} unit="Eigenvalues" highlight />
        <MetricBadge label="Trace tr(A) = Σλᵢ" value={(lam1 + lam2 + lam3).toFixed(2)} unit="" />
        <MetricBadge label="Determinant det(A) = Πλᵢ" value={(lam1 * lam2 * lam3).toFixed(2)} unit="" />
        <MetricBadge
          label="Alignment (v vs Av)"
          value={isEigenvector ? `Collinear! (λ ≈ ${effectiveRatio})` : `Off-Axis (sin θ = ${sinAngle.toFixed(2)})`}
          unit=""
          highlight
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '420px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            <>
              <button
                type="button"
                className="viz-3d-btn"
                onClick={() => snapToEigen(e1)}
              >
                ◆ Snap e₁
              </button>
              <button
                type="button"
                className="viz-3d-btn"
                onClick={() => snapToEigen(e2)}
              >
                ◆ Snap e₂
              </button>
              <button
                type="button"
                className="viz-3d-btn"
                onClick={() => snapToEigen(e3)}
              >
                ◆ Snap e₃
              </button>
              <button
                type="button"
                className={`viz-3d-btn ${showEigenBasis ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowEigenBasis((s) => !s)}
              >
                Eigen-Axes
              </button>
            </>
          }
        />
        <canvas ref={canvasRef} width={840} height={420} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Eigenvalue λ₁ (along e₁)" value={lam1} min={-2} max={2.5} step={0.1} onChange={setLam1} />
          <SliderControl label="Eigenvalue λ₂ (along e₂)" value={lam2} min={-2} max={2.5} step={0.1} onChange={setLam2} />
          <SliderControl label="Eigenvalue λ₃ (along e₃)" value={lam3} min={-2} max={2.5} step={0.1} onChange={setLam3} />
          <SliderControl label="Test Vector v_x" value={v[0]} min={-3} max={3} step={0.1} onChange={(val) => setV([val, v[1], v[2]])} />
          <SliderControl label="Test Vector v_y" value={v[1]} min={-3} max={3} step={0.1} onChange={(val) => setV([v[0], val, v[2]])} />
          <SliderControl label="Test Vector v_z" value={v[2]} min={-3} max={3} step={0.1} onChange={(val) => setV([v[0], v[1], val])} />
        </div>
      </div>
    </div>
  );
}
