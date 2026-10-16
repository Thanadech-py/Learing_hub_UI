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

export default function SystemsOfEquationsViz() {
  const [mode, setMode] = useState('solution'); // 'solution' | 'planes'

  // Mode 1: Complete Solution x = x_p + x_n in 3D (Rank 2 matrix with 2D Row Plane & 1D Null Line)
  const [xp, setXp] = useState([1.4, 1.0, 0.4]); // Particular solution in Row Space
  const [nullDir, setNullDir] = useState([-0.6, 0.8, 1.8]); // Null space direction n
  const [tParam, setTParam] = useState(0.8); // Free variable scalar t along null space line

  // Mode 2: 3D Intersecting Planes
  const [d1, setD1] = useState(1.2); // Plane 1 offset
  const [d2, setD2] = useState(0.8); // Plane 2 offset
  const [d3, setD3] = useState(0.6); // Plane 3 offset
  const [parallelMode, setParallelMode] = useState(false);

  const {
    canvasRef,
    camera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
    baseScale,
    centerOffset,
  } = useIsometric3D('Isometric', { baseScale: 42, snap: 0.1, clampRange: 3.2 });

  // Orthogonalize xp against nullDir so xp strictly lives in the Row Space C(A^T) ⊥ N(A)
  const nLenSq = nullDir[0] ** 2 + nullDir[1] ** 2 + nullDir[2] ** 2 || 1;
  const dotXpN = xp[0] * nullDir[0] + xp[1] * nullDir[1] + xp[2] * nullDir[2];
  const xpRow = [
    xp[0] - (dotXpN / nLenSq) * nullDir[0],
    xp[1] - (dotXpN / nLenSq) * nullDir[1],
    xp[2] - (dotXpN / nLenSq) * nullDir[2],
  ];
  const xn = [nullDir[0] * tParam, nullDir[1] * tParam, nullDir[2] * tParam];
  const xTotal = [xpRow[0] + xn[0], xpRow[1] + xn[1], xpRow[2] + xn[2]];

  // Build two basis vectors spanning the Row Space plane ⊥ nullDir
  const refVec = Math.abs(nullDir[0]) < 0.8 ? [1, 0, 0] : [0, 1, 0];
  const rBasis1 = [
    nullDir[1] * refVec[2] - nullDir[2] * refVec[1],
    nullDir[2] * refVec[0] - nullDir[0] * refVec[2],
    nullDir[0] * refVec[1] - nullDir[1] * refVec[0],
  ];
  const rBasis2 = [
    nullDir[1] * rBasis1[2] - nullDir[2] * rBasis1[1],
    nullDir[2] * rBasis1[0] - nullDir[0] * rBasis1[2],
    nullDir[0] * rBasis1[1] - nullDir[1] * rBasis1[0],
  ];

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

    if (mode === 'solution') {
      // Draw Row Space Plane C(A^T) through origin
      draw3DPlane(ctx, camera, width, height, rBasis1, rBasis2, {
        extent: 2.7,
        fillColor: 'rgba(56, 189, 248, 0.12)',
        strokeColor: 'rgba(56, 189, 248, 0.42)',
        baseScale,
        centerOffset,
      });

      // Draw Null Space Line N(A) through origin (amber dashed)
      const nA = proj(nullDir.map((v) => -v * 1.8));
      const nB = proj(nullDir.map((v) => v * 1.8));
      ctx.save();
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)';
      ctx.lineWidth = 2.4;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(nA.x, nA.y);
      ctx.lineTo(nB.x, nB.y);
      ctx.stroke();
      ctx.restore();

      // Draw Shifted Solution Line x = x_p + t*n (parallel to N(A), passing through x_p!)
      const sA = proj([xpRow[0] - nullDir[0] * 1.8, xpRow[1] - nullDir[1] * 1.8, xpRow[2] - nullDir[2] * 1.8]);
      const sB = proj([xpRow[0] + nullDir[0] * 1.8, xpRow[1] + nullDir[1] * 1.8, xpRow[2] + nullDir[2] * 1.8]);
      ctx.save();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sA.x, sA.y);
      ctx.lineTo(sB.x, sB.y);
      ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('Solution Line x = x_p + x_n', sB.x + 8, sB.y);
      ctx.restore();

      // Tip-to-tail arrow from x_p to x = x_p + x_n
      draw3DVector(ctx, camera, width, height, xTotal, {
        from: xpRow,
        color: '#f59e0b',
        label: `+ x_n (t=${tParam})`,
        lineWidth: 2.4,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });

      // Total solution vector x = x_p + x_n
      draw3DVector(ctx, camera, width, height, xTotal, {
        color: '#22c55e',
        label: `x = [${xTotal.map((v) => v.toFixed(1)).join(',')}]`,
        lineWidth: 3.4,
        showDropStalk: true,
        baseScale,
        centerOffset,
      });

      // Draggable Particular Solution x_p and Null Space Generator n
      const tipXp = draw3DVector(ctx, camera, width, height, xpRow, {
        color: '#38bdf8',
        label: `x_p (Row Space)`,
        lineWidth: 3.2,
        draggable: true,
        isDragging: activeHandleId === 'xp',
        isHovered: hoveredHandleId === 'xp',
        baseScale,
        centerOffset,
      });

      const tipN = draw3DVector(ctx, camera, width, height, nullDir, {
        color: '#f59e0b',
        label: `n ∈ N(A) (An = 0)`,
        lineWidth: 3,
        draggable: true,
        isDragging: activeHandleId === 'n',
        isHovered: hoveredHandleId === 'n',
        baseScale,
        centerOffset,
      });

      drawOrientationGizmo(ctx, camera, width);

      handlesRef.current = [
        { id: 'xp', vec: xp, screen: tipXp, onChange: setXp },
        { id: 'n', vec: nullDir, screen: tipN, onChange: setNullDir },
      ];
    } else {
      // Mode 2: Three 3D Planes
      // Plane 1: normal ~ [1, 0, 0.3], Plane 2: normal ~ [0, 1, 0.3], Plane 3: normal ~ [0, 0, 1] (or parallel to Plane 1)
      draw3DPlane(ctx, camera, width, height, [0, 1, 0], [0, 0, 1], {
        origin: [d1, 0, 0],
        extent: 2.5,
        fillColor: 'rgba(56, 189, 248, 0.14)',
        strokeColor: 'rgba(56, 189, 248, 0.55)',
        baseScale,
        centerOffset,
      });

      draw3DPlane(ctx, camera, width, height, [1, 0, 0], [0, 0, 1], {
        origin: [0, d2, 0],
        extent: 2.5,
        fillColor: 'rgba(167, 139, 250, 0.14)',
        strokeColor: 'rgba(167, 139, 250, 0.55)',
        baseScale,
        centerOffset,
      });

      if (parallelMode) {
        // Plane 3 parallel to Plane 1 -> Inconsistent (No Solution) unless d3 === d1
        draw3DPlane(ctx, camera, width, height, [0, 1, 0], [0, 0, 1], {
          origin: [d3 - 1.2, 0, 0],
          extent: 2.5,
          fillColor: 'rgba(244, 63, 94, 0.14)',
          strokeColor: 'rgba(244, 63, 94, 0.55)',
          baseScale,
          centerOffset,
        });
      } else {
        // Plane 3 horizontal z = d3 -> Unique 3D intersection point [d1, d2, d3]!
        draw3DPlane(ctx, camera, width, height, [1, 0, 0], [0, 1, 0], {
          origin: [0, 0, d3],
          extent: 2.5,
          fillColor: 'rgba(34, 197, 94, 0.14)',
          strokeColor: 'rgba(34, 197, 94, 0.55)',
          baseScale,
          centerOffset,
        });

        // Draggable 3D intersection vector x* = [d1, d2, d3]
        const sol = [d1, d2, d3];
        const tipSol = draw3DVector(ctx, camera, width, height, sol, {
          color: '#22c55e',
          label: `Unique Solution x* = [${d1.toFixed(1)}, ${d2.toFixed(1)}, ${d3.toFixed(1)}]`,
          lineWidth: 3.4,
          draggable: true,
          isDragging: activeHandleId === 'sol',
          isHovered: hoveredHandleId === 'sol',
          baseScale,
          centerOffset,
        });

        handlesRef.current = [
          {
            id: 'sol',
            vec: sol,
            screen: tipSol,
            onChange: (next) => {
              setD1(next[0]);
              setD2(next[1]);
              setD3(next[2]);
            },
          },
        ];
      }

      drawOrientationGizmo(ctx, camera, width);
    }
  }, [mode, xp, xpRow, nullDir, tParam, xn, xTotal, rBasis1, rBasis2, d1, d2, d3, parallelMode, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Systems Ax = b: Complete Solution & Intersecting Planes</h3>
          <span className="viz-header__tag">x = x_p + x_n • Row Picture vs. Column Picture</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'solution' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('solution')}
          >
            Complete Solution (x = x_p + x_n)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'planes' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('planes')}
          >
            3D Intersecting Planes
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        {mode === 'solution' ? (
          <>
            <MetricBadge label="Particular x_p ∈ C(Aᵀ)" value={`[${xpRow.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit="Ax_p = b" />
            <MetricBadge label="Homogeneous x_n ∈ N(A)" value={`[${xn.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit="Ax_n = 0" />
            <MetricBadge label="Complete Solution x" value={`[${xTotal.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit="A(x_p + x_n) = b" highlight />
            <MetricBadge label="Orthogonality x_p · x_n" value="0.00" unit="C(Aᵀ) ⊥ N(A)" highlight />
          </>
        ) : (
          <>
            <MetricBadge label="Plane 1 (x = d₁)" value={`x = ${d1.toFixed(1)}`} unit="Cyan Plane" />
            <MetricBadge label="Plane 2 (y = d₂)" value={`y = ${d2.toFixed(1)}`} unit="Purple Plane" />
            <MetricBadge
              label="Plane 3"
              value={parallelMode ? `x = ${(d3 - 1.2).toFixed(1)}` : `z = ${d3.toFixed(1)}`}
              unit={parallelMode ? 'Parallel to Plane 1' : 'Green Plane'}
            />
            <MetricBadge
              label="System Status"
              value={parallelMode ? 'No Solution (Inconsistent)' : `[${d1.toFixed(1)}, ${d2.toFixed(1)}, ${d3.toFixed(1)}]ᵀ`}
              unit={parallelMode ? 'Rank(A) < Rank([A|b])' : 'Unique 3D Point'}
              highlight
            />
          </>
        )}
      </div>

      <div className="viz-canvas-area" style={{ height: '420px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            mode === 'planes' ? (
              <button
                type="button"
                className={`viz-3d-btn ${parallelMode ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setParallelMode((p) => !p)}
              >
                {parallelMode ? 'Parallel Planes (No Solution)' : 'Intersecting Planes (Unique)'}
              </button>
            ) : null
          }
        />
        <canvas ref={canvasRef} width={840} height={420} />
      </div>

      <div className="viz-controls-panel">
        {mode === 'solution' ? (
          <div className="viz-sliders-grid">
            <SliderControl label="Free Variable Parameter t (along N(A))" value={tParam} min={-2} max={2} step={0.1} onChange={setTParam} />
            <SliderControl label="Particular x_p (Z component)" value={xp[2]} min={-2.5} max={2.5} step={0.1} onChange={(v) => setXp([xp[0], xp[1], v])} />
            <SliderControl label="Null Space n_z" value={nullDir[2]} min={-2.5} max={2.5} step={0.1} onChange={(v) => setNullDir([nullDir[0], nullDir[1], v])} />
          </div>
        ) : (
          <div className="viz-sliders-grid">
            <SliderControl label="Plane 1 Offset d₁" value={d1} min={-2.5} max={2.5} step={0.1} onChange={setD1} />
            <SliderControl label="Plane 2 Offset d₂" value={d2} min={-2.5} max={2.5} step={0.1} onChange={setD2} />
            <SliderControl label="Plane 3 Offset d₃" value={d3} min={-2.5} max={2.5} step={0.1} onChange={setD3} />
          </div>
        )}
      </div>
    </div>
  );
}
