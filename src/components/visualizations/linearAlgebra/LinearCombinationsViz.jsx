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
  draw3DParallelepiped,
} from './viz3dUtils.jsx';

const PRESETS = {
  'Standard Basis (Rank 3)': {
    v1: [2.0, 0.0, 0.0],
    v2: [0.0, 2.0, 0.0],
    v3: [0.0, 0.0, 2.0],
    a: 1.0,
    b: 1.0,
    c: 1.0,
  },
  'Skewed Independent (Rank 3)': {
    v1: [2.0, 0.6, 0.2],
    v2: [0.4, 2.0, 0.6],
    v3: [0.4, 0.6, 2.2],
    a: 1.0,
    b: 0.8,
    c: 0.8,
  },
  'Coplanar (Rank 2 — v₃ in Span{v₁,v₂})': {
    v1: [2.2, 0.4, 0.6],
    v2: [0.4, 2.0, 0.8],
    v3: [1.3, 1.2, 0.7], // 0.5*v1 + 0.5*v2
    a: 1.0,
    b: 1.0,
    c: 1.0,
  },
  'Collinear (Rank 1 — Line)': {
    v1: [1.6, 1.0, 0.8],
    v2: [2.4, 1.5, 1.2],
    v3: [-1.6, -1.0, -0.8],
    a: 1.0,
    b: 0.5,
    c: 0.5,
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

export default function LinearCombinationsViz() {
  const [v1, setV1] = useState([2.0, 0.6, 0.2]);
  const [v2, setV2] = useState([0.4, 2.0, 0.6]);
  const [v3, setV3] = useState([0.4, 0.6, 2.2]);
  const [alpha, setAlpha] = useState(1.0);
  const [beta, setBeta] = useState(0.8);
  const [gamma, setGamma] = useState(0.8);
  const [showTipToTail, setShowTipToTail] = useState(true);
  const [showSpanGeometry, setShowSpanGeometry] = useState(true);
  const [activePreset, setActivePreset] = useState('Skewed Independent (Rank 3)');

  const {
    canvasRef,
    camera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
    baseScale,
    centerOffset,
  } = useIsometric3D('Isometric', { baseScale: 42, snap: 0.1, clampRange: 3.5 });

  // Compute w = alpha*v1 + beta*v2 + gamma*v3
  const av1 = [alpha * v1[0], alpha * v1[1], alpha * v1[2]];
  const bv2 = [beta * v2[0], beta * v2[1], beta * v2[2]];
  const gv3 = [gamma * v3[0], gamma * v3[1], gamma * v3[2]];
  const w = [
    +(av1[0] + bv2[0] + gv3[0]).toFixed(2),
    +(av1[1] + bv2[1] + gv3[1]).toFixed(2),
    +(av1[2] + bv2[2] + gv3[2]).toFixed(2),
  ];

  // Triple product det([v1 v2 v3]) = v1 · (v2 × v3)
  const det3 = dot3(v1, cross3(v2, v3));
  const c12 = norm3(cross3(v1, v2));
  const c23 = norm3(cross3(v2, v3));
  const c13 = norm3(cross3(v1, v3));
  const maxLen = Math.max(norm3(v1), norm3(v2), norm3(v3));

  let rank = 3;
  let spanLabel = '3D Space ℝ³ (Independent)';
  if (maxLen < 0.05) {
    rank = 0;
    spanLabel = '0D Origin {0}';
  } else if (Math.abs(det3) > 0.18) {
    rank = 3;
    spanLabel = '3D Space ℝ³ (Independent)';
  } else if (Math.max(c12, c23, c13) > 0.12) {
    rank = 2;
    spanLabel = '2D Tilted Plane (Coplanar)';
  } else {
    rank = 1;
    spanLabel = '1D Line (Collinear)';
  }

  const applyPreset = (name) => {
    const p = PRESETS[name];
    if (!p) return;
    setV1([...p.v1]);
    setV2([...p.v2]);
    setV3([...p.v3]);
    setAlpha(p.a);
    setBeta(p.b);
    setGamma(p.c);
    setActivePreset(name);
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

    // Visualize Span Geometry based on rank (3D Parallelepiped, 2D Plane, or 1D Line)
    if (showSpanGeometry) {
      if (rank === 3) {
        draw3DParallelepiped(ctx, camera, width, height, av1, bv2, gv3, {
          fillColor: 'rgba(34, 197, 94, 0.08)',
          strokeColor: 'rgba(34, 197, 94, 0.35)',
          dashed: true,
          baseScale,
          centerOffset,
        });
      } else if (rank === 2) {
        // Choose two non-collinear vectors to draw the 2D span plane
        const pair = c12 >= c23 && c12 >= c13 ? [v1, v2] : c23 >= c13 ? [v2, v3] : [v1, v3];
        draw3DPlane(ctx, camera, width, height, pair[0], pair[1], {
          extent: 3.0,
          fillColor: 'rgba(245, 158, 11, 0.14)',
          strokeColor: 'rgba(245, 158, 11, 0.48)',
          gridColor: 'rgba(245, 158, 11, 0.2)',
          baseScale,
          centerOffset,
        });
      } else if (rank === 1) {
        const dir = norm3(v1) >= norm3(v2) ? v1 : v2;
        const len = norm3(dir) || 1;
        const pA = proj(dir.map((d) => (-3.8 * d) / len));
        const pB = proj(dir.map((d) => (3.8 * d) / len));
        ctx.save();
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Tip-to-tail construction: 0 -> αv1 -> αv1 + βv2 -> w
    if (showTipToTail) {
      const step1 = av1;
      const step2 = [av1[0] + bv2[0], av1[1] + bv2[1], av1[2] + bv2[2]];

      draw3DVector(ctx, camera, width, height, step1, {
        from: [0, 0, 0],
        color: 'rgba(56, 189, 248, 0.65)',
        label: `αv₁`,
        lineWidth: 2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });

      draw3DVector(ctx, camera, width, height, step2, {
        from: step1,
        color: 'rgba(167, 139, 250, 0.75)',
        label: `+βv₂`,
        lineWidth: 2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });

      draw3DVector(ctx, camera, width, height, w, {
        from: step2,
        color: 'rgba(245, 158, 11, 0.85)',
        label: `+γv₃`,
        lineWidth: 2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });
    }

    // Resultant linear combination w
    draw3DVector(ctx, camera, width, height, w, {
      color: '#22c55e',
      label: `w = [${w[0].toFixed(1)}, ${w[1].toFixed(1)}, ${w[2].toFixed(1)}]`,
      lineWidth: 3.6,
      showDropStalk: true,
      baseScale,
      centerOffset,
    });

    // Draggable basis vectors v1, v2, v3
    const tip1 = draw3DVector(ctx, camera, width, height, v1, {
      color: '#38bdf8',
      label: `v₁ [${v1.map((n) => n.toFixed(1)).join(',')}]`,
      lineWidth: 3,
      draggable: true,
      isDragging: activeHandleId === 'v1',
      isHovered: hoveredHandleId === 'v1',
      baseScale,
      centerOffset,
    });

    const tip2 = draw3DVector(ctx, camera, width, height, v2, {
      color: '#a78bfa',
      label: `v₂ [${v2.map((n) => n.toFixed(1)).join(',')}]`,
      lineWidth: 3,
      draggable: true,
      isDragging: activeHandleId === 'v2',
      isHovered: hoveredHandleId === 'v2',
      baseScale,
      centerOffset,
    });

    const tip3 = draw3DVector(ctx, camera, width, height, v3, {
      color: '#f59e0b',
      label: `v₃ [${v3.map((n) => n.toFixed(1)).join(',')}]`,
      lineWidth: 3,
      draggable: true,
      isDragging: activeHandleId === 'v3',
      isHovered: hoveredHandleId === 'v3',
      baseScale,
      centerOffset,
    });

    drawOrientationGizmo(ctx, camera, width);

    handlesRef.current = [
      {
        id: 'v1',
        vec: v1,
        screen: tip1,
        onChange: (next) => {
          setActivePreset(null);
          setV1(next);
        },
      },
      {
        id: 'v2',
        vec: v2,
        screen: tip2,
        onChange: (next) => {
          setActivePreset(null);
          setV2(next);
        },
      },
      {
        id: 'v3',
        vec: v3,
        screen: tip3,
        onChange: (next) => {
          setActivePreset(null);
          setV3(next);
        },
      },
    ];
  }, [v1, v2, v3, av1, bv2, gv3, w, rank, c12, c23, c13, showTipToTail, showSpanGeometry, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Linear Combinations, Span & Independence</h3>
          <span className="viz-header__tag">w = αv₁ + βv₂ + γv₃ in ℝ³</span>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Scenarios:</span>
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            type="button"
            className={`viz-preset-chip ${activePreset === name ? 'viz-preset-chip--active' : ''}`}
            onClick={() => applyPreset(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Weights (α, β, γ)" value={`(${alpha}, ${beta}, ${gamma})`} unit="" />
        <MetricBadge label="Combination w" value={`[${w.join(', ')}]ᵀ`} unit="" highlight />
        <MetricBadge label="3D Triple Product" value={det3.toFixed(2)} unit="v₁ · (v₂ × v₃)" />
        <MetricBadge
          label="Span Dimension"
          value={`Rank ${rank} (${rank} DOF)`}
          unit={spanLabel}
          highlight
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '430px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            <>
              <button
                type="button"
                className={`viz-3d-btn ${showTipToTail ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowTipToTail((s) => !s)}
              >
                Tip-to-Tail Chain
              </button>
              <button
                type="button"
                className={`viz-3d-btn ${showSpanGeometry ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowSpanGeometry((s) => !s)}
              >
                Span Geometry
              </button>
            </>
          }
        />
        <canvas ref={canvasRef} width={840} height={430} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Weight α (on v₁)" value={alpha} min={-2} max={2} step={0.1} onChange={setAlpha} />
          <SliderControl label="Weight β (on v₂)" value={beta} min={-2} max={2} step={0.1} onChange={setBeta} />
          <SliderControl label="Weight γ (on v₃)" value={gamma} min={-2} max={2} step={0.1} onChange={setGamma} />
          <SliderControl label="v₁_z (Elevation)" value={v1[2]} min={-3} max={3} step={0.1} onChange={(val) => setV1([v1[0], v1[1], val])} />
          <SliderControl label="v₂_z (Elevation)" value={v2[2]} min={-3} max={3} step={0.1} onChange={(val) => setV2([v2[0], v2[1], val])} />
          <SliderControl label="v₃_z (Elevation)" value={v3[2]} min={-3} max={3} step={0.1} onChange={(val) => setV3([v3[0], v3[1], val])} />
        </div>
      </div>
    </div>
  );
}
