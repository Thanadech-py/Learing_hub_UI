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
  draw3DParallelepiped,
} from './viz3dUtils.jsx';

const PRESETS = {
  'Anisotropic Stretch (Ellipsoid)': {
    c1: [2.2, 0.0, 0.0],
    c2: [0.0, 1.4, 0.0],
    c3: [0.0, 0.0, 0.8],
  },
  '3D Shear + Tilt': {
    c1: [1.8, 0.6, 0.2],
    c2: [0.8, 1.8, 0.5],
    c3: [0.3, 0.5, 1.6],
  },
  'Pure 3D Rotation (Orthogonal)': {
    c1: [1.41, 1.41, 0.0],
    c2: [-1.0, 1.0, 1.41],
    c3: [1.0, -1.0, 1.41],
  },
  'Rank-2 Collapse (Pancake σ₃=0)': {
    c1: [2.0, 0.5, 0.5],
    c2: [0.5, 2.0, 0.5],
    c3: [1.25, 1.25, 0.5],
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

function lerpVec(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export default function LinearTransformationsViz() {
  const [c1, setC1] = useState([1.8, 0.6, 0.2]);
  const [c2, setC2] = useState([0.8, 1.8, 0.5]);
  const [c3, setC3] = useState([0.3, 0.5, 1.6]);
  const [morphT, setMorphT] = useState(1.0); // 0 = Identity Sphere, 1 = Transformed Ellipsoid
  const [showEllipsoid, setShowEllipsoid] = useState(true);
  const [showBox, setShowBox] = useState(true);
  const [activePreset, setActivePreset] = useState('3D Shear + Tilt');

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

  // Interpolated basis columns at morph parameter t
  const tc1 = lerpVec([1, 0, 0], c1, morphT);
  const tc2 = lerpVec([0, 1, 0], c2, morphT);
  const tc3 = lerpVec([0, 0, 1], c3, morphT);

  const applyT = (p) => [
    p[0] * tc1[0] + p[1] * tc2[0] + p[2] * tc3[0],
    p[0] * tc1[1] + p[1] * tc2[1] + p[2] * tc3[1],
    p[0] * tc1[2] + p[1] * tc2[2] + p[2] * tc3[2],
  ];

  const detA = dot3(c1, cross3(c2, c3));
  const frobNorm = Math.sqrt(norm3(c1) ** 2 + norm3(c2) ** 2 + norm3(c3) ** 2);

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

    // Optional transformed unit cube (parallelepiped)
    if (showBox) {
      draw3DParallelepiped(ctx, camera, width, height, tc1, tc2, tc3, {
        fillColor: 'rgba(56, 189, 248, 0.08)',
        strokeColor: 'rgba(56, 189, 248, 0.35)',
        dashed: true,
        baseScale,
        centerOffset,
      });
    }

    // 3D SVD Manipulability Ellipsoid (image of unit sphere ||x|| = 1 under T)
    if (showEllipsoid) {
      const segs = 36;
      const rings = [
        // XY equator circle
        (theta) => [Math.cos(theta), Math.sin(theta), 0],
        // XZ meridian circle
        (theta) => [Math.cos(theta), 0, Math.sin(theta)],
        // YZ meridian circle
        (theta) => [0, Math.cos(theta), Math.sin(theta)],
        // Tilted latitude rings
        (theta) => [Math.cos(theta) * 0.707, Math.sin(theta) * 0.707, 0.707],
        (theta) => [Math.cos(theta) * 0.707, Math.sin(theta) * 0.707, -0.707],
      ];

      ctx.save();
      rings.forEach((ringFn, idx) => {
        ctx.strokeStyle =
          idx === 0
            ? 'rgba(56, 189, 248, 0.65)'
            : idx === 1
            ? 'rgba(167, 139, 250, 0.65)'
            : idx === 2
            ? 'rgba(34, 197, 94, 0.65)'
            : 'rgba(148, 163, 184, 0.28)';
        ctx.lineWidth = idx < 3 ? 1.8 : 1.1;
        ctx.beginPath();
        for (let i = 0; i <= segs; i++) {
          const th = (i / segs) * Math.PI * 2;
          const pt3d = applyT(ringFn(th));
          const p = proj(pt3d);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      });
      ctx.restore();
    }

    // Draggable transformed basis vectors T(î), T(ĵ), T(k̂)
    const tip1 = draw3DVector(ctx, camera, width, height, c1, {
      color: '#f87171',
      label: `T(î) [${c1.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'c1',
      isHovered: hoveredHandleId === 'c1',
      baseScale,
      centerOffset,
    });

    const tip2 = draw3DVector(ctx, camera, width, height, c2, {
      color: '#4ade80',
      label: `T(ĵ) [${c2.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'c2',
      isHovered: hoveredHandleId === 'c2',
      baseScale,
      centerOffset,
    });

    const tip3 = draw3DVector(ctx, camera, width, height, c3, {
      color: '#60a5fa',
      label: `T(k̂) [${c3.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'c3',
      isHovered: hoveredHandleId === 'c3',
      baseScale,
      centerOffset,
    });

    drawOrientationGizmo(ctx, camera, width);

    handlesRef.current = [
      { id: 'c1', vec: c1, screen: tip1, onChange: (n) => { setActivePreset(null); setC1(n); } },
      { id: 'c2', vec: c2, screen: tip2, onChange: (n) => { setActivePreset(null); setC2(n); } },
      { id: 'c3', vec: c3, screen: tip3, onChange: (n) => { setActivePreset(null); setC3(n); } },
    ];
  }, [c1, c2, c3, tc1, tc2, tc3, morphT, showEllipsoid, showBox, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Linear Transformations & SVD Manipulability Ellipsoid</h3>
          <span className="viz-header__tag">3D Basis Warping • Unit Sphere → Ellipsoid</span>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Transformations:</span>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            className={`viz-preset-chip ${activePreset === name ? 'viz-preset-chip--active' : ''}`}
            onClick={() => {
              const p = PRESETS[name];
              setC1([...p.c1]);
              setC2([...p.c2]);
              setC3([...p.c3]);
              setMorphT(1.0);
              setActivePreset(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Col 1: T(î)" value={`[${c1.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit={`||c₁||=${norm3(c1).toFixed(2)}`} />
        <MetricBadge label="Col 2: T(ĵ)" value={`[${c2.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit={`||c₂||=${norm3(c2).toFixed(2)}`} />
        <MetricBadge label="Col 3: T(k̂)" value={`[${c3.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit={`||c₃||=${norm3(c3).toFixed(2)}`} />
        <MetricBadge label="Volume Scale det(A)" value={detA.toFixed(2)} unit={Math.abs(detA) < 0.08 ? 'Collapsed (Singular)' : detA < 0 ? 'Inverted Orientation' : '3D Ellipsoid'} highlight />
        <MetricBadge label="Frobenius ||A||_F" value={frobNorm.toFixed(2)} unit="√(σ₁²+σ₂²+σ₃²)" />
      </div>

      <div className="viz-canvas-area" style={{ height: '420px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            <>
              <button
                type="button"
                className={`viz-3d-btn ${showEllipsoid ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowEllipsoid((s) => !s)}
              >
                3D SVD Ellipsoid
              </button>
              <button
                type="button"
                className={`viz-3d-btn ${showBox ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowBox((s) => !s)}
              >
                Unit Cube Image
              </button>
            </>
          }
        />
        <canvas ref={canvasRef} width={840} height={420} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Morph Interpolation t (I → A)" value={morphT} min={0} max={1} step={0.05} onChange={setMorphT} />
          <SliderControl label="T(î)_z" value={c1[2]} min={-3} max={3} step={0.1} onChange={(v) => setC1([c1[0], c1[1], v])} />
          <SliderControl label="T(ĵ)_z" value={c2[2]} min={-3} max={3} step={0.1} onChange={(v) => setC2([c2[0], c2[1], v])} />
          <SliderControl label="T(k̂)_z" value={c3[2]} min={-3} max={3} step={0.1} onChange={(v) => setC3([c3[0], c3[1], v])} />
        </div>
      </div>
    </div>
  );
}
