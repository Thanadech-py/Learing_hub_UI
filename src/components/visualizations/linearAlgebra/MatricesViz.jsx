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

const ROW_COL_PRESETS = {
  'Rank 2 (Plane in ℝ³)': {
    c1: [2.0, 0.4, 0.8],
    c2: [0.4, 2.0, 0.8],
    c3: [1.2, 1.2, 0.8], // 0.5*c1 + 0.5*c2
  },
  'Full Rank 3 (ℝ³ Volume)': {
    c1: [2.0, 0.4, 0.2],
    c2: [0.2, 2.0, 0.4],
    c3: [0.3, 0.4, 2.0],
  },
  'Rank 1 (Collinear Line)': {
    c1: [1.8, 1.0, 0.8],
    c2: [0.9, 0.5, 0.4],
    c3: [-1.8, -1.0, -0.8],
  },
};

const SPD_PRESETS = {
  'Positive Definite (Bowl λ > 0)': { a: 1.2, b: 0.4, d: 1.0 },
  'Positive Semidefinite (Valley λ₂ = 0)': { a: 1.0, b: 1.0, d: 1.0 },
  'Indefinite Saddle (λ₁ > 0, λ₂ < 0)': { a: 1.1, b: 0.0, d: -1.0 },
  'Negative Definite (Dome λ < 0)': { a: -1.1, b: -0.3, d: -1.0 },
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

export default function MatricesViz() {
  const [mode, setMode] = useState('rowcol'); // 'rowcol' | 'spd'
  const [spaceView, setSpaceView] = useState('col'); // 'col' | 'row'

  // Mode 1: 3x3 Matrix defined by columns c1, c2, c3
  const [c1, setC1] = useState([2.0, 0.4, 0.8]);
  const [c2, setC2] = useState([0.4, 2.0, 0.8]);
  const [c3, setC3] = useState([1.2, 1.2, 0.8]);
  const [activePreset, setActivePreset] = useState('Rank 2 (Plane in ℝ³)');

  // Mode 2: Symmetric 2x2 matrix S = [[a, b], [b, d]] with 3D bowl z = x^T S x
  const [sA, setSA] = useState(1.2);
  const [sB, setSB] = useState(0.4);
  const [sD, setSD] = useState(1.0);
  const [testPt, setTestPt] = useState([1.6, 1.2, 0]);
  const [spdPreset, setSpdPreset] = useState('Positive Definite (Bowl λ > 0)');

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

  // Derive rows r1, r2, r3 from columns c1, c2, c3
  const r1 = [c1[0], c2[0], c3[0]];
  const r2 = [c1[1], c2[1], c3[1]];
  const r3 = [c1[2], c2[2], c3[2]];

  const det3 = dot3(c1, cross3(c2, c3));
  const cr12 = norm3(cross3(c1, c2));
  const cr23 = norm3(cross3(c2, c3));
  const cr13 = norm3(cross3(c1, c3));
  const rank =
    Math.abs(det3) > 0.15
      ? 3
      : Math.max(cr12, cr23, cr13) > 0.12
      ? 2
      : Math.max(norm3(c1), norm3(c2), norm3(c3)) > 0.05
      ? 1
      : 0;

  // Eigenvalues of S = [[sA, sB], [sB, sD]]
  const traceS = sA + sD;
  const detS = sA * sD - sB * sB;
  const disc = Math.sqrt(Math.max(0, (traceS / 2) ** 2 - detS));
  const lam1 = traceS / 2 + disc;
  const lam2 = traceS / 2 - disc;
  const energyVal =
    sA * testPt[0] * testPt[0] +
    2 * sB * testPt[0] * testPt[1] +
    sD * testPt[1] * testPt[1];

  const spdClass =
    lam1 > 0.05 && lam2 > 0.05
      ? 'Positive Definite (Bowl)'
      : lam1 < -0.05 && lam2 < -0.05
      ? 'Negative Definite (Dome)'
      : lam1 * lam2 < -0.02
      ? 'Indefinite (Saddle)'
      : 'Semidefinite (Flat Valley)';

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

    if (mode === 'rowcol') {
      const vecs = spaceView === 'col' ? [c1, c2, c3] : [r1, r2, r3];
      const names = spaceView === 'col' ? ['c₁', 'c₂', 'c₃'] : ['r₁', 'r₂', 'r₃'];
      const colors = ['#38bdf8', '#a78bfa', '#f59e0b'];

      // Draw subspace geometry (Rank 3 box, Rank 2 plane + orthogonal null line, or Rank 1 line)
      if (rank === 3) {
        draw3DParallelepiped(ctx, camera, width, height, vecs[0], vecs[1], vecs[2], {
          fillColor: 'rgba(56, 189, 248, 0.09)',
          strokeColor: 'rgba(56, 189, 248, 0.35)',
          dashed: true,
          baseScale,
          centerOffset,
        });
      } else if (rank === 2) {
        // Pick two independent vectors for plane
        const n12 = cross3(vecs[0], vecs[1]);
        const n23 = cross3(vecs[1], vecs[2]);
        const pair = norm3(n12) >= norm3(n23) ? [vecs[0], vecs[1]] : [vecs[1], vecs[2]];
        const normal = cross3(pair[0], pair[1]);
        const nLen = norm3(normal) || 1;
        const unitN = normal.map((v) => (v / nLen) * 2.8);

        draw3DPlane(ctx, camera, width, height, pair[0], pair[1], {
          extent: 2.9,
          fillColor: spaceView === 'col' ? 'rgba(56, 189, 248, 0.14)' : 'rgba(34, 197, 94, 0.14)',
          strokeColor: spaceView === 'col' ? 'rgba(56, 189, 248, 0.45)' : 'rgba(34, 197, 94, 0.45)',
          baseScale,
          centerOffset,
        });

        // Draw orthogonal Null Space / Left Null Space line!
        draw3DVector(ctx, camera, width, height, unitN, {
          color: '#f43f5e',
          label: spaceView === 'col' ? 'N(Aᵀ) ⊥ C(A)' : 'N(A) ⊥ C(Aᵀ)',
          lineWidth: 2.5,
          dashed: true,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });
      }

      const tip1 = draw3DVector(ctx, camera, width, height, vecs[0], {
        color: colors[0],
        label: `${names[0]} [${vecs[0].map((v) => v.toFixed(1)).join(',')}]`,
        draggable: true,
        isDragging: activeHandleId === 'v1',
        isHovered: hoveredHandleId === 'v1',
        baseScale,
        centerOffset,
      });
      const tip2 = draw3DVector(ctx, camera, width, height, vecs[1], {
        color: colors[1],
        label: `${names[1]} [${vecs[1].map((v) => v.toFixed(1)).join(',')}]`,
        draggable: true,
        isDragging: activeHandleId === 'v2',
        isHovered: hoveredHandleId === 'v2',
        baseScale,
        centerOffset,
      });
      const tip3 = draw3DVector(ctx, camera, width, height, vecs[2], {
        color: colors[2],
        label: `${names[2]} [${vecs[2].map((v) => v.toFixed(1)).join(',')}]`,
        draggable: true,
        isDragging: activeHandleId === 'v3',
        isHovered: hoveredHandleId === 'v3',
        baseScale,
        centerOffset,
      });

      drawOrientationGizmo(ctx, camera, width);

      const updateVec = (idx, next) => {
        setActivePreset(null);
        if (spaceView === 'col') {
          if (idx === 0) setC1(next);
          if (idx === 1) setC2(next);
          if (idx === 2) setC3(next);
        } else {
          // Updating row idx updates component idx of c1, c2, c3
          const nc1 = [...c1];
          const nc2 = [...c2];
          const nc3 = [...c3];
          nc1[idx] = next[0];
          nc2[idx] = next[1];
          nc3[idx] = next[2];
          setC1(nc1);
          setC2(nc2);
          setC3(nc3);
        }
      };

      handlesRef.current = [
        { id: 'v1', vec: vecs[0], screen: tip1, onChange: (n) => updateVec(0, n) },
        { id: 'v2', vec: vecs[1], screen: tip2, onChange: (n) => updateVec(1, n) },
        { id: 'v3', vec: vecs[2], screen: tip3, onChange: (n) => updateVec(2, n) },
      ];
    } else {
      // Mode 2: 3D Quadratic Surface z = 0.35 * x^T S x
      const zScale = 0.32;
      const evalZ = (x, y) => Math.max(-3.2, Math.min(3.2, (sA * x * x + 2 * sB * x * y + sD * y * y) * zScale));
      const steps = 12;
      const r = 2.4;

      ctx.save();
      for (let i = -steps; i <= steps; i++) {
        const u = (i / steps) * r;
        // Constant-x curve
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.32)';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        for (let j = -steps; j <= steps; j++) {
          const v = (j / steps) * r;
          const p = proj([u, v, evalZ(u, v)]);
          if (j === -steps) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Constant-y curve
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.32)';
        ctx.beginPath();
        for (let j = -steps; j <= steps; j++) {
          const v = (j / steps) * r;
          const p = proj([v, u, evalZ(v, u)]);
          if (j === -steps) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Orthogonal eigenvectors of S on XY plane
      const angle = 0.5 * Math.atan2(2 * sB, sA - sD);
      const q1 = [Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0];
      const q2 = [-Math.sin(angle) * 2.5, Math.cos(angle) * 2.5, 0];
      draw3DVector(ctx, camera, width, height, q1, {
        color: '#22c55e',
        label: `q₁ (λ₁=${lam1.toFixed(2)})`,
        lineWidth: 2.2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });
      draw3DVector(ctx, camera, width, height, q2, {
        color: '#f59e0b',
        label: `q₂ (λ₂=${lam2.toFixed(2)})`,
        lineWidth: 2.2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });

      // Draggable test vector x on XY plane + vertical energy stalk to z = x^T S x
      const zSurf = evalZ(testPt[0], testPt[1]);
      const pFloor = proj([testPt[0], testPt[1], 0]);
      const pSurf = proj([testPt[0], testPt[1], zSurf]);

      ctx.save();
      ctx.strokeStyle = energyVal >= 0 ? '#22c55e' : '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pFloor.x, pFloor.y);
      ctx.lineTo(pSurf.x, pSurf.y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = energyVal >= 0 ? '#22c55e' : '#f43f5e';
      ctx.beginPath();
      ctx.arc(pSurf.x, pSurf.y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(`xᵀSx = ${energyVal.toFixed(2)}`, pSurf.x + 10, pSurf.y - 6);
      ctx.restore();

      const tipX = draw3DVector(ctx, camera, width, height, [testPt[0], testPt[1], 0], {
        color: '#38bdf8',
        label: `x = [${testPt[0].toFixed(1)}, ${testPt[1].toFixed(1)}]ᵀ`,
        lineWidth: 3.2,
        draggable: true,
        showDropStalk: false,
        isDragging: activeHandleId === 'x',
        isHovered: hoveredHandleId === 'x',
        baseScale,
        centerOffset,
      });

      drawOrientationGizmo(ctx, camera, width);

      handlesRef.current = [
        {
          id: 'x',
          vec: [testPt[0], testPt[1], 0],
          screen: tipX,
          dragMode: 'xy',
          onChange: (next) => setTestPt([next[0], next[1], 0]),
        },
      ];
    }
  }, [mode, spaceView, c1, c2, c3, r1, r2, r3, rank, sA, sB, sD, lam1, lam2, testPt, energyVal, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Matrices: Row/Column Spaces & Quadratic Bowl</h3>
          <span className="viz-header__tag">Rank • Orthogonal Complements • xᵀSx</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'rowcol' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('rowcol')}
          >
            3D Row vs. Column Space
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'spd' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('spd')}
          >
            3D Quadratic Bowl (xᵀSx)
          </button>
        </div>
      </header>

      {mode === 'rowcol' ? (
        <>
          <div className="viz-presets-bar">
            <span className="viz-presets-bar__label">Matrix Rank Presets:</span>
            {Object.keys(ROW_COL_PRESETS).map((name) => (
              <button
                key={name}
                type="button"
                className={`viz-preset-chip ${activePreset === name ? 'viz-preset-chip--active' : ''}`}
                onClick={() => {
                  const p = ROW_COL_PRESETS[name];
                  setC1([...p.c1]);
                  setC2([...p.c2]);
                  setC3([...p.c3]);
                  setActivePreset(name);
                }}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="viz-metrics-bar">
            <MetricBadge label="Column Space dim C(A)" value={rank} unit={`in ℝ³`} highlight />
            <MetricBadge label="Row Space dim C(Aᵀ)" value={rank} unit="dim C(Aᵀ) = dim C(A)" highlight />
            <MetricBadge label="Null Space dim N(A)" value={3 - rank} unit="Rank-Nullity = 3" />
            <MetricBadge label="Determinant det(A)" value={det3.toFixed(2)} unit={rank < 3 ? 'Singular' : 'Invertible'} />
          </div>
        </>
      ) : (
        <>
          <div className="viz-presets-bar">
            <span className="viz-presets-bar__label">Surface Type:</span>
            {Object.keys(SPD_PRESETS).map((name) => (
              <button
                key={name}
                type="button"
                className={`viz-preset-chip ${spdPreset === name ? 'viz-preset-chip--active' : ''}`}
                onClick={() => {
                  const p = SPD_PRESETS[name];
                  setSA(p.a);
                  setSB(p.b);
                  setSD(p.d);
                  setSpdPreset(name);
                }}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="viz-metrics-bar">
            <MetricBadge label="Symmetric Matrix S" value={`[[${sA}, ${sB}], [${sB}, ${sD}]]`} unit="S = Sᵀ" />
            <MetricBadge label="Eigenvalues (λ₁, λ₂)" value={`${lam1.toFixed(2)}, ${lam2.toFixed(2)}`} unit="Real & Orthogonal q₁⊥q₂" highlight />
            <MetricBadge label="Energy E(x) = xᵀSx" value={energyVal.toFixed(2)} unit={`at x=[${testPt[0].toFixed(1)}, ${testPt[1].toFixed(1)}]`} highlight />
            <MetricBadge label="Definiteness" value={spdClass} unit="" />
          </div>
        </>
      )}

      <div className="viz-canvas-area" style={{ height: '420px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            mode === 'rowcol' ? (
              <>
                <button
                  type="button"
                  className={`viz-3d-btn ${spaceView === 'col' ? 'viz-3d-btn--active' : ''}`}
                  onClick={() => setSpaceView('col')}
                >
                  Columns c₁, c₂, c₃
                </button>
                <button
                  type="button"
                  className={`viz-3d-btn ${spaceView === 'row' ? 'viz-3d-btn--active' : ''}`}
                  onClick={() => setSpaceView('row')}
                >
                  Rows r₁, r₂, r₃
                </button>
              </>
            ) : null
          }
        />
        <canvas ref={canvasRef} width={840} height={420} />
      </div>

      <div className="viz-controls-panel">
        {mode === 'rowcol' ? (
          <div className="viz-sliders-grid">
            <SliderControl label="Col c₁_z" value={c1[2]} min={-3} max={3} step={0.1} onChange={(v) => setC1([c1[0], c1[1], v])} />
            <SliderControl label="Col c₂_z" value={c2[2]} min={-3} max={3} step={0.1} onChange={(v) => setC2([c2[0], c2[1], v])} />
            <SliderControl label="Col c₃_z" value={c3[2]} min={-3} max={3} step={0.1} onChange={(v) => setC3([c3[0], c3[1], v])} />
          </div>
        ) : (
          <div className="viz-sliders-grid">
            <SliderControl label="Diagonal S₁₁ (a)" value={sA} min={-2} max={2} step={0.1} onChange={(v) => { setSpdPreset(null); setSA(v); }} />
            <SliderControl label="Off-Diagonal S₁₂ = S₂₁ (b)" value={sB} min={-1.5} max={1.5} step={0.1} onChange={(v) => { setSpdPreset(null); setSB(v); }} />
            <SliderControl label="Diagonal S₂₂ (d)" value={sD} min={-2} max={2} step={0.1} onChange={(v) => { setSpdPreset(null); setSD(v); }} />
          </div>
        )}
      </div>
    </div>
  );
}
