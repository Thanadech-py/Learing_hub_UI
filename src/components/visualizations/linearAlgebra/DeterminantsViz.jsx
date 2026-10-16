import { useState, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';
import {
  useIsometric3D,
  IsometricToolbar,
  draw3DGrid,
  draw3DAxes,
  drawOrientationGizmo,
  draw3DVector,
  draw3DParallelepiped,
} from './viz3dUtils.jsx';

const PRESETS = {
  'Identity Cube (det = +1)': {
    v1: [1.5, 0.0, 0.0],
    v2: [0.0, 1.5, 0.0],
    v3: [0.0, 0.0, 1.5],
  },
  'Sheared Box (det Preserved)': {
    v1: [1.8, 0.8, 0.2],
    v2: [0.4, 1.8, 0.4],
    v3: [0.2, 0.4, 1.8],
  },
  'Left-Handed Reflection (det < 0)': {
    v1: [0.0, 1.8, 0.2],
    v2: [1.8, 0.0, 0.2],
    v3: [0.0, 0.0, 1.8],
  },
  'Singular / Coplanar (det = 0)': {
    v1: [2.0, 0.4, 0.6],
    v2: [0.4, 2.0, 0.6],
    v3: [1.2, 1.2, 0.6],
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

export default function DeterminantsViz() {
  const [v1, setV1] = useState([1.8, 0.8, 0.2]);
  const [v2, setV2] = useState([0.4, 1.8, 0.4]);
  const [v3, setV3] = useState([0.2, 0.4, 1.8]);
  const [showUnitCube, setShowUnitCube] = useState(true);
  const [showBaseNormal, setShowBaseNormal] = useState(true);
  const [activePreset, setActivePreset] = useState('Sheared Box (det Preserved)');

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

  // Base normal n = v2 × v3 and signed volume det(M) = v1 · (v2 × v3)
  const baseCross = cross3(v2, v3);
  const baseArea = norm3(baseCross);
  const detVal = dot3(v1, baseCross);
  const absVol = Math.abs(detVal);

  let orientationText = 'Right-Handed (+Vol)';
  if (Math.abs(detVal) < 0.08) orientationText = 'Singular (Collapsed 0 Vol)';
  else if (detVal < 0) orientationText = 'Left-Handed (Inverted -Vol)';

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

    // Optional ghost unit cube [0,1]^3
    if (showUnitCube) {
      draw3DParallelepiped(ctx, camera, width, height, [1, 0, 0], [0, 1, 0], [0, 0, 1], {
        fillColor: 'rgba(148, 163, 184, 0.05)',
        strokeColor: 'rgba(148, 163, 184, 0.35)',
        dashed: true,
        baseScale,
        centerOffset,
      });
    }

    // 3D Parallelepiped spanned by v1, v2, v3 (color coded by sign of det)
    const isSingular = Math.abs(detVal) < 0.08;
    const fillCol = isSingular
      ? 'rgba(245, 158, 11, 0.18)'
      : detVal > 0
      ? 'rgba(34, 197, 94, 0.14)'
      : 'rgba(244, 63, 94, 0.15)';
    const strokeCol = isSingular
      ? 'rgba(245, 158, 11, 0.65)'
      : detVal > 0
      ? 'rgba(34, 197, 94, 0.6)'
      : 'rgba(244, 63, 94, 0.65)';

    draw3DParallelepiped(ctx, camera, width, height, v1, v2, v3, {
      fillColor: fillCol,
      strokeColor: strokeCol,
      baseScale,
      centerOffset,
    });

    // Optional base cross product normal vector v2 × v3
    if (showBaseNormal && baseArea > 0.04) {
      const scaleNorm = baseArea > 3.2 ? 3.2 / baseArea : 1;
      const dispNormal = baseCross.map((c) => c * scaleNorm);
      draw3DVector(ctx, camera, width, height, dispNormal, {
        color: '#e879f9',
        label: `v₂ × v₃ (Area=${baseArea.toFixed(1)})`,
        lineWidth: 2.2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });
    }

    // Draggable edge vectors v1, v2, v3
    const tip1 = draw3DVector(ctx, camera, width, height, v1, {
      color: '#38bdf8',
      label: `v₁ [${v1.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'v1',
      isHovered: hoveredHandleId === 'v1',
      baseScale,
      centerOffset,
    });

    const tip2 = draw3DVector(ctx, camera, width, height, v2, {
      color: '#a78bfa',
      label: `v₂ [${v2.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'v2',
      isHovered: hoveredHandleId === 'v2',
      baseScale,
      centerOffset,
    });

    const tip3 = draw3DVector(ctx, camera, width, height, v3, {
      color: '#f59e0b',
      label: `v₃ [${v3.map((v) => v.toFixed(1)).join(',')}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'v3',
      isHovered: hoveredHandleId === 'v3',
      baseScale,
      centerOffset,
    });

    drawOrientationGizmo(ctx, camera, width);

    handlesRef.current = [
      { id: 'v1', vec: v1, screen: tip1, onChange: (n) => { setActivePreset(null); setV1(n); } },
      { id: 'v2', vec: v2, screen: tip2, onChange: (n) => { setActivePreset(null); setV2(n); } },
      { id: 'v3', vec: v3, screen: tip3, onChange: (n) => { setActivePreset(null); setV3(n); } },
    ];
  }, [v1, v2, v3, detVal, baseCross, baseArea, showUnitCube, showBaseNormal, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Determinant: Signed Parallelepiped Volume</h3>
          <span className="viz-header__tag">det(M) = v₁ · (v₂ × v₃) • 3D Orientation</span>
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
              const p = PRESETS[name];
              setV1([...p.v1]);
              setV2([...p.v2]);
              setV3([...p.v3]);
              setActivePreset(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Determinant det(M)" value={detVal.toFixed(2)} unit="v₁ · (v₂ × v₃)" highlight />
        <MetricBadge label="3D Volume |det(M)|" value={absVol.toFixed(2)} unit="cubic units" highlight />
        <MetricBadge label="Base Area ||v₂ × v₃||" value={baseArea.toFixed(2)} unit="sq units" />
        <MetricBadge label="3D Orientation" value={orientationText} unit="" />
      </div>

      <div className="viz-canvas-area" style={{ height: '420px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            <>
              <button
                type="button"
                className={`viz-3d-btn ${showUnitCube ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowUnitCube((s) => !s)}
              >
                Ghost Unit Cube
              </button>
              <button
                type="button"
                className={`viz-3d-btn ${showBaseNormal ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowBaseNormal((s) => !s)}
              >
                v₂ × v₃ Base Normal
              </button>
            </>
          }
        />
        <canvas ref={canvasRef} width={840} height={420} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="v₁_x" value={v1[0]} min={-3} max={3} step={0.1} onChange={(v) => setV1([v, v1[1], v1[2]])} />
          <SliderControl label="v₁_y" value={v1[1]} min={-3} max={3} step={0.1} onChange={(v) => setV1([v1[0], v, v1[2]])} />
          <SliderControl label="v₁_z" value={v1[2]} min={-3} max={3} step={0.1} onChange={(v) => setV1([v1[0], v1[1], v])} />
          <SliderControl label="v₂_z" value={v2[2]} min={-3} max={3} step={0.1} onChange={(v) => setV2([v2[0], v2[1], v])} />
          <SliderControl label="v₃_z" value={v3[2]} min={-3} max={3} step={0.1} onChange={(v) => setV3([v3[0], v3[1], v])} />
        </div>
      </div>
    </div>
  );
}
