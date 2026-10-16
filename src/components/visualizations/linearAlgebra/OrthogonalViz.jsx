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
  draw3DPlane,
} from './viz3dUtils.jsx';

const PRESETS = {
  '3D Projection onto XY Plane': {
    a1: [2.4, 0.0, 0.0],
    a2: [0.0, 2.4, 0.0],
    b: [1.8, 1.4, 2.2],
  },
  'Tilted Subspace Plane C(A)': {
    a1: [2.2, 0.4, 0.6],
    a2: [0.4, 2.0, 0.8],
    b: [1.0, 1.6, 2.6],
  },
  'Zero Residual (b already in C(A))': {
    a1: [2.0, 0.4, 0.6],
    a2: [0.4, 2.0, 0.6],
    b: [1.8, 1.8, 0.9], // 0.75*a1 + 0.75*a2
  },
  'Pure Orthogonal Error (p = 0)': {
    a1: [2.2, 0.0, 0.0],
    a2: [0.0, 2.2, 0.0],
    b: [0.0, 0.0, 2.4],
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

export default function OrthogonalViz() {
  const [a1, setA1] = useState([2.2, 0.4, 0.6]);
  const [a2, setA2] = useState([0.4, 2.0, 0.8]);
  const [b, setB] = useState([1.0, 1.6, 2.6]);
  const [activePreset, setActivePreset] = useState('Tilted Subspace Plane C(A)');

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

  // Solve 2x2 Normal Equations (A^T A) x_hat = A^T b
  const g11 = dot3(a1, a1);
  const g12 = dot3(a1, a2);
  const g22 = dot3(a2, a2);
  const detG = Math.max(1e-5, g11 * g22 - g12 * g12);

  const rhs1 = dot3(a1, b);
  const rhs2 = dot3(a2, b);

  const xHat1 = (g22 * rhs1 - g12 * rhs2) / detG;
  const xHat2 = (-g12 * rhs1 + g11 * rhs2) / detG;

  // Projection p = A x_hat = xHat1 * a1 + xHat2 * a2
  const p = [
    xHat1 * a1[0] + xHat2 * a2[0],
    xHat1 * a1[1] + xHat2 * a2[1],
    xHat1 * a1[2] + xHat2 * a2[2],
  ];

  // Orthogonal residual error e = b - p
  const eVec = [b[0] - p[0], b[1] - p[1], b[2] - p[2]];
  const lenP = norm3(p);
  const lenE = norm3(eVec);
  const lenB = norm3(b);

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

    // Draw Column Space Plane C(A) = Span{a1, a2}
    draw3DPlane(ctx, camera, width, height, a1, a2, {
      extent: 2.9,
      fillColor: 'rgba(56, 189, 248, 0.14)',
      strokeColor: 'rgba(56, 189, 248, 0.45)',
      baseScale,
      centerOffset,
    });

    // Draw 3D Right-Angle Marker at p between p and e = b - p
    if (lenP > 0.25 && lenE > 0.25) {
      const uP = scale3(p, 0.32 / lenP);
      const uE = scale3(eVec, 0.32 / lenE);
      const r1 = proj([p[0] - uP[0], p[1] - uP[1], p[2] - uP[2]]);
      const r2 = proj([p[0] - uP[0] + uE[0], p[1] - uP[1] + uE[1], p[2] - uP[2] + uE[2]]);
      const r3 = proj([p[0] + uE[0], p[1] + uE[1], p[2] + uE[2]]);
      const r0 = proj(p);

      ctx.save();
      ctx.fillStyle = 'rgba(244, 63, 94, 0.28)';
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(r0.x, r0.y);
      ctx.lineTo(r1.x, r1.y);
      ctx.lineTo(r2.x, r2.y);
      ctx.lineTo(r3.x, r3.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Orthogonal Projection vector p = Pb in C(A)
    draw3DVector(ctx, camera, width, height, p, {
      color: '#22c55e',
      label: `p = Pb [${p.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.5,
      showDropStalk: false,
      baseScale,
      centerOffset,
    });

    // Residual Error vector e = b - p (drawn from p to b!)
    draw3DVector(ctx, camera, width, height, b, {
      from: p,
      color: '#f43f5e',
      label: `e = b - p (||e||=${lenE.toFixed(2)})`,
      lineWidth: 2.8,
      dashed: true,
      showDropStalk: false,
      baseScale,
      centerOffset,
    });

    // Draggable plane basis vectors a1, a2 and target vector b
    const tipA1 = draw3DVector(ctx, camera, width, height, a1, {
      color: '#38bdf8',
      label: `a₁ [${a1.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 2.8,
      draggable: true,
      isDragging: activeHandleId === 'a1',
      isHovered: hoveredHandleId === 'a1',
      baseScale,
      centerOffset,
    });

    const tipA2 = draw3DVector(ctx, camera, width, height, a2, {
      color: '#a78bfa',
      label: `a₂ [${a2.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 2.8,
      draggable: true,
      isDragging: activeHandleId === 'a2',
      isHovered: hoveredHandleId === 'a2',
      baseScale,
      centerOffset,
    });

    const tipB = draw3DVector(ctx, camera, width, height, b, {
      color: '#f59e0b',
      label: `b [${b.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.4,
      draggable: true,
      isDragging: activeHandleId === 'b',
      isHovered: hoveredHandleId === 'b',
      baseScale,
      centerOffset,
    });

    drawOrientationGizmo(ctx, camera, width);

    handlesRef.current = [
      { id: 'b', vec: b, screen: tipB, onChange: (n) => { setActivePreset(null); setB(n); } },
      { id: 'a1', vec: a1, screen: tipA1, onChange: (n) => { setActivePreset(null); setA1(n); } },
      { id: 'a2', vec: a2, screen: tipA2, onChange: (n) => { setActivePreset(null); setA2(n); } },
    ];
  }, [a1, a2, b, p, eVec, lenP, lenE, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Orthogonal Subspace Projection & Least Squares</h3>
          <span className="viz-header__tag">p = A(AᵀA)⁻¹Aᵀb • Normal Equations Aᵀe = 0</span>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Presets:</span>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            className={`viz-preset-chip ${activePreset === name ? 'viz-preset-chip--active' : ''}`}
            onClick={() => {
              const pr = PRESETS[name];
              setA1([...pr.a1]);
              setA2([...pr.a2]);
              setB([...pr.b]);
              setActivePreset(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Least Squares Weights x̂" value={`[${xHat1.toFixed(2)}, ${xHat2.toFixed(2)}]ᵀ`} unit="p = x̂₁a₁ + x̂₂a₂" highlight />
        <MetricBadge label="Projection p = Pb" value={`[${p.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit={`||p|| = ${lenP.toFixed(2)}`} highlight />
        <MetricBadge label="Residual Error ||e||" value={lenE.toFixed(2)} unit="e ⊥ C(A)" />
        <MetricBadge
          label="Pythagoras ||p||² + ||e||²"
          value={(lenP ** 2 + lenE ** 2).toFixed(2)}
          unit={`= ||b||² (${(lenB ** 2).toFixed(2)})`}
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <IsometricToolbar camera={camera} setPreset={setPreset} />
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Target Vector b_x" value={b[0]} min={-3} max={3} step={0.1} onChange={(v) => setB([v, b[1], b[2]])} />
          <SliderControl label="Target Vector b_y" value={b[1]} min={-3} max={3} step={0.1} onChange={(v) => setB([b[0], v, b[2]])} />
          <SliderControl label="Target Vector b_z" value={b[2]} min={-3} max={3} step={0.1} onChange={(v) => setB([b[0], b[1], v])} />
          <SliderControl label="Basis a₁_z" value={a1[2]} min={-3} max={3} step={0.1} onChange={(v) => setA1([a1[0], a1[1], v])} />
          <SliderControl label="Basis a₂_z" value={a2[2]} min={-3} max={3} step={0.1} onChange={(v) => setA2([a2[0], a2[1], v])} />
        </div>
      </div>
    </div>
  );
}
