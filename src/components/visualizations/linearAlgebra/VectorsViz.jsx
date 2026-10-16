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
  '3D General': { u: [2.4, 0.8, 1.4], v: [0.6, 2.2, 0.8], c: 1.5 },
  'Orthogonal (90°)': { u: [2.5, 0, 0], v: [0, 2.5, 1.5], c: 1.25 },
  'Right-Hand Cross (î × ĵ = k̂)': { u: [2.0, 0, 0], v: [0, 2.0, 0], c: 1.5 },
  'Opposite / Obtuse': { u: [2.2, 1.4, 1.2], v: [-1.8, -1.0, 0.6], c: -1.0 },
};

export default function VectorsViz() {
  const [u, setU] = useState([2.4, 0.8, 1.4]);
  const [v, setV] = useState([0.6, 2.2, 0.8]);
  const [scalarC, setScalarC] = useState(1.5);
  const [showCross, setShowCross] = useState(true);
  const [showParallelogram, setShowParallelogram] = useState(true);
  const [activePreset, setActivePreset] = useState('3D General');

  const {
    canvasRef,
    camera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
    baseScale,
    centerOffset,
  } = useIsometric3D('Isometric', { baseScale: 44, snap: 0.1, clampRange: 4 });

  // Norms
  const lenU = Math.hypot(u[0], u[1], u[2]);
  const lenV = Math.hypot(v[0], v[1], v[2]);

  // Dot product & angle
  const dotProd = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const cosTheta = lenU > 1e-5 && lenV > 1e-5 ? Math.min(1, Math.max(-1, dotProd / (lenU * lenV))) : 0;
  const angleDeg = ((Math.acos(cosTheta) * 180) / Math.PI).toFixed(1);

  // Sum u + v
  const sumVec = [
    +(u[0] + v[0]).toFixed(1),
    +(u[1] + v[1]).toFixed(1),
    +(u[2] + v[2]).toFixed(1),
  ];
  const lenSum = Math.hypot(sumVec[0], sumVec[1], sumVec[2]);

  // Cross product u × v (scaled slightly if huge so it stays visible)
  const crossVec = [
    +(u[1] * v[2] - u[2] * v[1]).toFixed(2),
    +(u[2] * v[0] - u[0] * v[2]).toFixed(2),
    +(u[0] * v[1] - u[1] * v[0]).toFixed(2),
  ];
  const lenCross = Math.hypot(crossVec[0], crossVec[1], crossVec[2]);

  const applyPreset = (name) => {
    const p = PRESETS[name];
    if (!p) return;
    setU([...p.u]);
    setV([...p.v]);
    setScalarC(p.c);
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

    // Optional span plane & 3D parallelogram between u and v
    if (showParallelogram) {
      draw3DPlane(ctx, camera, width, height, u, v, {
        extent: 2.8,
        fillColor: 'rgba(34, 197, 94, 0.06)',
        strokeColor: 'rgba(34, 197, 94, 0.2)',
        gridColor: 'rgba(34, 197, 94, 0.08)',
        baseScale,
        centerOffset,
      });

      const p0 = proj([0, 0, 0]);
      const pU = proj(u);
      const pV = proj(v);
      const pSum = proj(sumVec);

      // Shaded parallelogram patch (0 -> u -> u+v -> v)
      ctx.save();
      ctx.fillStyle = 'rgba(34, 197, 94, 0.14)';
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(pU.x, pU.y);
      ctx.lineTo(pSum.x, pSum.y);
      ctx.lineTo(pV.x, pV.y);
      ctx.closePath();
      ctx.fill();

      // Tip-to-tail dashed construction lines
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pU.x, pU.y);
      ctx.lineTo(pSum.x, pSum.y);
      ctx.moveTo(pV.x, pV.y);
      ctx.lineTo(pSum.x, pSum.y);
      ctx.stroke();
      ctx.restore();
    }

    // Scaled vector c * u
    const scaledU = [u[0] * scalarC, u[1] * scalarC, u[2] * scalarC];
    draw3DVector(ctx, camera, width, height, scaledU, {
      color: '#f59e0b',
      label: `c·u (${scalarC}u)`,
      lineWidth: 2,
      dashed: true,
      showDropStalk: false,
      baseScale,
      centerOffset,
    });

    // Sum u + v
    draw3DVector(ctx, camera, width, height, sumVec, {
      color: '#22c55e',
      label: `u+v = [${sumVec[0]}, ${sumVec[1]}, ${sumVec[2]}]`,
      lineWidth: 3.2,
      showDropStalk: true,
      baseScale,
      centerOffset,
    });

    // Cross product u × v (scaled down if > 3.5 units for canvas clarity)
    if (showCross && lenCross > 0.02) {
      const displayScale = lenCross > 3.5 ? 3.5 / lenCross : 1;
      const dispCross = crossVec.map((c) => c * displayScale);
      draw3DVector(ctx, camera, width, height, dispCross, {
        color: '#f43f5e',
        label: `u×v = [${crossVec[0]}, ${crossVec[1]}, ${crossVec[2]}]`,
        lineWidth: 2.8,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });
    }

    // Draggable vectors u and v
    const tipU = draw3DVector(ctx, camera, width, height, u, {
      color: '#38bdf8',
      label: `u = [${u[0].toFixed(1)}, ${u[1].toFixed(1)}, ${u[2].toFixed(1)}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'u',
      isHovered: hoveredHandleId === 'u',
      baseScale,
      centerOffset,
    });

    const tipV = draw3DVector(ctx, camera, width, height, v, {
      color: '#a78bfa',
      label: `v = [${v[0].toFixed(1)}, ${v[1].toFixed(1)}, ${v[2].toFixed(1)}]`,
      lineWidth: 3.2,
      draggable: true,
      isDragging: activeHandleId === 'v',
      isHovered: hoveredHandleId === 'v',
      baseScale,
      centerOffset,
    });

    drawOrientationGizmo(ctx, camera, width);

    handlesRef.current = [
      {
        id: 'u',
        vec: u,
        screen: tipU,
        onChange: (next) => {
          setActivePreset(null);
          setU(next);
        },
      },
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
  }, [u, v, scalarC, sumVec, crossVec, lenCross, showCross, showParallelogram, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Isometric Vector Geometry & Operations Lab</h3>
          <span className="viz-header__tag">3D Dragging • Addition • Dot & Cross Product</span>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Presets:</span>
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
        <MetricBadge label="Vector u" value={`[${u.map((n) => n.toFixed(1)).join(', ')}]ᵀ`} unit={`||u|| = ${lenU.toFixed(2)}`} />
        <MetricBadge label="Vector v" value={`[${v.map((n) => n.toFixed(1)).join(', ')}]ᵀ`} unit={`||v|| = ${lenV.toFixed(2)}`} />
        <MetricBadge label="Sum u + v" value={`[${sumVec.join(', ')}]ᵀ`} unit={`||u+v|| = ${lenSum.toFixed(2)}`} highlight />
        <MetricBadge label="Dot Product (u · v)" value={dotProd.toFixed(2)} unit={`θ = ${angleDeg}°`} highlight />
        <MetricBadge label="Cross Area ||u × v||" value={lenCross.toFixed(2)} unit={Math.abs(dotProd) < 0.05 ? 'Orthogonal!' : '3D Normal'} />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            <>
              <button
                type="button"
                className={`viz-3d-btn ${showParallelogram ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowParallelogram((s) => !s)}
              >
                Parallelogram
              </button>
              <button
                type="button"
                className={`viz-3d-btn ${showCross ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setShowCross((s) => !s)}
              >
                Cross u × v
              </button>
            </>
          }
        />
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Vector u_x" value={u[0]} min={-4} max={4} step={0.1} onChange={(val) => setU([val, u[1], u[2]])} />
          <SliderControl label="Vector u_y" value={u[1]} min={-4} max={4} step={0.1} onChange={(val) => setU([u[0], val, u[2]])} />
          <SliderControl label="Vector u_z" value={u[2]} min={-4} max={4} step={0.1} onChange={(val) => setU([u[0], u[1], val])} />
          <SliderControl label="Vector v_x" value={v[0]} min={-4} max={4} step={0.1} onChange={(val) => setV([val, v[1], v[2]])} />
          <SliderControl label="Vector v_y" value={v[1]} min={-4} max={4} step={0.1} onChange={(val) => setV([v[0], val, v[2]])} />
          <SliderControl label="Vector v_z" value={v[2]} min={-4} max={4} step={0.1} onChange={(val) => setV([v[0], v[1], val])} />
          <SliderControl label="Scalar Multiplier c" value={scalarC} min={-2.5} max={2.5} step={0.25} onChange={setScalarC} />
        </div>
      </div>
    </div>
  );
}
