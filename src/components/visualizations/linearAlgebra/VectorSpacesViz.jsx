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

function scale3(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}

export default function VectorSpacesViz() {
  const [mode, setMode] = useState('subspace'); // 'subspace' | 'four'
  const [dimW, setDimW] = useState(2); // 0: {0}, 1: Line, 2: Plane, 3: R^3
  const [shiftOffset, setShiftOffset] = useState(0.0); // affine shift away from 0 to test 0 ∈ W!
  const [b1, setB1] = useState([2.2, 0.4, 0.6]);
  const [b2, setB2] = useState([0.4, 2.0, 0.8]);

  // Mode 2: Strang's Four Fundamental Subspaces in 3D (x = x_r + x_n -> Ax = b in C(A))
  const [inputX, setInputX] = useState([1.8, 1.4, 1.8]);
  const [spaceSide, setSpaceSide] = useState('domain'); // 'domain' (Row + Null) | 'codomain' (Col + Left Null)

  const {
    canvasRef,
    camera,
    setPreset,
    handlesRef,
    activeHandleId,
    hoveredHandleId,
    baseScale,
    centerOffset,
  } = useIsometric3D('Isometric', { baseScale: 42, snap: 0.1, clampRange: 3.3 });

  const isValidSubspace = Math.abs(shiftOffset) < 0.05;

  // Orthonormalize b1, b2 to get clean plane basis e1, e2 and normal n = e1 × e2
  const len1 = Math.max(1e-4, norm3(b1));
  const e1 = scale3(b1, 1 / len1);
  const b2Ortho = [
    b2[0] - dot3(b2, e1) * e1[0],
    b2[1] - dot3(b2, e1) * e1[1],
    b2[2] - dot3(b2, e1) * e1[2],
  ];
  const len2 = Math.max(1e-4, norm3(b2Ortho));
  const e2 = scale3(b2Ortho, 1 / len2);
  const normalVec = cross3(e1, e2);

  // Decompose inputX = x_r (in Row Space span(e1,e2)) + x_n (along normalVec N(A))
  const c1Proj = dot3(inputX, e1);
  const c2Proj = dot3(inputX, e2);
  const xRow = [
    c1Proj * e1[0] + c2Proj * e2[0],
    c1Proj * e1[1] + c2Proj * e2[1],
    c1Proj * e1[2] + c2Proj * e2[2],
  ];
  const xNull = [
    inputX[0] - xRow[0],
    inputX[1] - xRow[1],
    inputX[2] - xRow[2],
  ];

  // For Codomain view: Column space spanned by c1 = [2, 0.5, 0.4], c2 = [0.4, 1.8, 0.9]
  const col1 = [2.0, 0.4, 0.3];
  const col2 = [0.3, 1.8, 0.9];
  const axOut = [
    c1Proj * col1[0] + c2Proj * col2[0],
    c1Proj * col1[1] + c2Proj * col2[1],
    c1Proj * col1[2] + c2Proj * col2[2],
  ];
  const leftNull = cross3(col1, col2);
  const lnLen = Math.max(1e-4, norm3(leftNull));
  const leftNullUnit = scale3(leftNull, 2.5 / lnLen);

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

    if (mode === 'subspace') {
      const originShift = [0, 0, shiftOffset];
      const uPlusV = [b1[0] + b2[0], b1[1] + b2[1], b1[2] + b2[2] + shiftOffset];

      if (dimW === 0) {
        const p0 = proj(originShift);
        ctx.fillStyle = isValidSubspace ? '#22c55e' : '#f43f5e';
        ctx.beginPath();
        ctx.arc(p0.x, p0.y, 8, 0, Math.PI * 2);
        ctx.fill();
      } else if (dimW === 1) {
        const pA = proj([e1[0] * -3.5, e1[1] * -3.5, e1[2] * -3.5 + shiftOffset]);
        const pB = proj([e1[0] * 3.5, e1[1] * 3.5, e1[2] * 3.5 + shiftOffset]);
        ctx.save();
        ctx.strokeStyle = isValidSubspace ? '#38bdf8' : '#f43f5e';
        ctx.lineWidth = 3.2;
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.stroke();
        ctx.restore();
      } else if (dimW === 2) {
        draw3DPlane(ctx, camera, width, height, b1, b2, {
          origin: originShift,
          extent: 2.8,
          fillColor: isValidSubspace ? 'rgba(56, 189, 248, 0.14)' : 'rgba(244, 63, 94, 0.15)',
          strokeColor: isValidSubspace ? 'rgba(56, 189, 248, 0.48)' : 'rgba(244, 63, 94, 0.55)',
          baseScale,
          centerOffset,
        });
      } else if (dimW === 3) {
        draw3DParallelepiped(ctx, camera, width, height, [2.2, 0, 0], [0, 2.2, 0], [0, 0, 2.2], {
          origin: [-1.1, -1.1, -1.1 + shiftOffset],
          fillColor: isValidSubspace ? 'rgba(34, 197, 94, 0.1)' : 'rgba(244, 63, 94, 0.12)',
          strokeColor: isValidSubspace ? 'rgba(34, 197, 94, 0.4)' : 'rgba(244, 63, 94, 0.45)',
          baseScale,
          centerOffset,
        });
      }

      // Closure sum b1 + b2 inside W
      if (dimW >= 2) {
        draw3DVector(ctx, camera, width, height, uPlusV, {
          from: originShift,
          color: '#22c55e',
          label: 'b₁ + b₂ ∈ W (Closed)',
          lineWidth: 2.5,
          dashed: true,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });
      }

      const tip1 = draw3DVector(ctx, camera, width, height, [b1[0], b1[1], b1[2] + shiftOffset], {
        from: originShift,
        color: '#38bdf8',
        label: `b₁ [${b1.map((v) => v.toFixed(1)).join(',')}]`,
        lineWidth: 3.2,
        draggable: true,
        isDragging: activeHandleId === 'b1',
        isHovered: hoveredHandleId === 'b1',
        baseScale,
        centerOffset,
      });

      const tip2 =
        dimW >= 2
          ? draw3DVector(ctx, camera, width, height, [b2[0], b2[1], b2[2] + shiftOffset], {
              from: originShift,
              color: '#a78bfa',
              label: `b₂ [${b2.map((v) => v.toFixed(1)).join(',')}]`,
              lineWidth: 3.2,
              draggable: true,
              isDragging: activeHandleId === 'b2',
              isHovered: hoveredHandleId === 'b2',
              baseScale,
              centerOffset,
            })
          : null;

      drawOrientationGizmo(ctx, camera, width);

      handlesRef.current = [
        { id: 'b1', vec: b1, screen: tip1, onChange: setB1 },
        ...(tip2 ? [{ id: 'b2', vec: b2, screen: tip2, onChange: setB2 }] : []),
      ];
    } else {
      // Mode 2: Strang's Four Fundamental Subspaces in 3D
      if (spaceSide === 'domain') {
        // Domain R^3: Row Space Plane C(A^T) + Orthogonal Null Space Line N(A)
        draw3DPlane(ctx, camera, width, height, b1, b2, {
          extent: 2.7,
          fillColor: 'rgba(56, 189, 248, 0.14)',
          strokeColor: 'rgba(56, 189, 248, 0.45)',
          baseScale,
          centerOffset,
        });

        // Null Space line N(A) ⊥ C(A^T)
        const nA = proj(scale3(normalVec, -2.8));
        const nB = proj(scale3(normalVec, 2.8));
        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.6;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(nA.x, nA.y);
        ctx.lineTo(nB.x, nB.y);
        ctx.stroke();
        ctx.restore();

        // Decomposition x = x_r + x_n
        draw3DVector(ctx, camera, width, height, xRow, {
          color: '#38bdf8',
          label: `x_r ∈ C(Aᵀ) [${xRow.map((v) => v.toFixed(1)).join(',')}]`,
          lineWidth: 3,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });

        draw3DVector(ctx, camera, width, height, xNull, {
          color: '#f59e0b',
          label: `x_n ∈ N(A) (Ax_n=0)`,
          lineWidth: 2.8,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });

        // Dashed drop from x to x_r
        const pX = proj(inputX);
        const pXr = proj(xRow);
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pXr.x, pXr.y);
        ctx.lineTo(pX.x, pX.y);
        ctx.stroke();
        ctx.restore();

        const tipX = draw3DVector(ctx, camera, width, height, inputX, {
          color: '#22c55e',
          label: `x = x_r + x_n [${inputX.map((v) => v.toFixed(1)).join(',')}]`,
          lineWidth: 3.4,
          draggable: true,
          isDragging: activeHandleId === 'x',
          isHovered: hoveredHandleId === 'x',
          baseScale,
          centerOffset,
        });

        handlesRef.current = [{ id: 'x', vec: inputX, screen: tipX, onChange: setInputX }];
      } else {
        // Codomain R^3: Column Space Plane C(A) + Orthogonal Left Null Space N(A^T)
        draw3DPlane(ctx, camera, width, height, col1, col2, {
          extent: 2.7,
          fillColor: 'rgba(167, 139, 250, 0.15)',
          strokeColor: 'rgba(167, 139, 250, 0.48)',
          baseScale,
          centerOffset,
        });

        draw3DVector(ctx, camera, width, height, leftNullUnit, {
          color: '#f43f5e',
          label: 'Left Null Space N(Aᵀ) ⊥ C(A)',
          lineWidth: 2.6,
          dashed: true,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });

        draw3DVector(ctx, camera, width, height, col1, {
          color: '#38bdf8',
          label: 'col₁(A)',
          lineWidth: 2.5,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });
        draw3DVector(ctx, camera, width, height, col2, {
          color: '#a78bfa',
          label: 'col₂(A)',
          lineWidth: 2.5,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });

        draw3DVector(ctx, camera, width, height, axOut, {
          color: '#22c55e',
          label: `Ax = Ax_r ∈ C(A) [${axOut.map((v) => v.toFixed(1)).join(',')}]`,
          lineWidth: 3.6,
          showDropStalk: true,
          baseScale,
          centerOffset,
        });

        handlesRef.current = [];
      }

      drawOrientationGizmo(ctx, camera, width);
    }
  }, [mode, dimW, shiftOffset, isValidSubspace, b1, b2, e1, normalVec, inputX, xRow, xNull, spaceSide, col1, col2, axOut, leftNullUnit, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Vector Spaces, Subspaces & The Four Fundamental Subspaces</h3>
          <span className="viz-header__tag">Subspace Axioms • C(Aᵀ) ⊥ N(A) & C(A) ⊥ N(Aᵀ)</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'subspace' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('subspace')}
          >
            3D Subspace Hierarchy
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'four' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('four')}
          >
            4 Fundamental Subspaces
          </button>
        </div>
      </header>

      {mode === 'subspace' ? (
        <>
          <div className="viz-presets-bar">
            <span className="viz-presets-bar__label">Subspace Dimension:</span>
            {[
              { d: 0, label: '0D Zero Space {0}' },
              { d: 1, label: '1D Line Span{b₁}' },
              { d: 2, label: '2D Plane Span{b₁, b₂}' },
              { d: 3, label: '3D Whole Space ℝ³' },
            ].map((item) => (
              <button
                key={item.d}
                type="button"
                className={`viz-preset-chip ${dimW === item.d ? 'viz-preset-chip--active' : ''}`}
                onClick={() => setDimW(item.d)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="viz-metrics-bar">
            <MetricBadge label="Dimension dim(W)" value={dimW} unit={`in ℝ³`} highlight />
            <MetricBadge label="Zero Vector 0 ∈ W?" value={isValidSubspace ? 'YES (Passes Origin)' : 'NO (Shifted Affine)'} unit="" highlight />
            <MetricBadge label="Closure u + v ∈ W?" value={isValidSubspace ? 'YES (Closed)' : 'FAILS'} unit="" />
            <MetricBadge label="Subspace Verdict" value={isValidSubspace ? 'Valid Subspace of ℝ³' : 'Not a Subspace'} unit="" />
          </div>
        </>
      ) : (
        <div className="viz-metrics-bar">
          <MetricBadge label="Row Space Projection x_r" value={`[${xRow.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit="in C(Aᵀ) (dim 2)" highlight />
          <MetricBadge label="Null Space Component x_n" value={`[${xNull.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit="in N(A) (dim 1)" />
          <MetricBadge label="Orthogonality x_r · x_n" value={Math.abs(dot3(xRow, xNull)).toFixed(2)} unit="C(Aᵀ) ⊥ N(A)" highlight />
          <MetricBadge label="Output Ax = Ax_r" value={`[${axOut.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit="in C(A) ⊥ N(Aᵀ)" />
        </div>
      )}

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            mode === 'four' ? (
              <>
                <button
                  type="button"
                  className={`viz-3d-btn ${spaceSide === 'domain' ? 'viz-3d-btn--active' : ''}`}
                  onClick={() => setSpaceSide('domain')}
                >
                  Domain ℝ³: C(Aᵀ) ⊥ N(A)
                </button>
                <button
                  type="button"
                  className={`viz-3d-btn ${spaceSide === 'codomain' ? 'viz-3d-btn--active' : ''}`}
                  onClick={() => setSpaceSide('codomain')}
                >
                  Codomain ℝ³: C(A) ⊥ N(Aᵀ)
                </button>
              </>
            ) : null
          }
        />
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        {mode === 'subspace' ? (
          <div className="viz-sliders-grid">
            <SliderControl label="Affine Shift Offset z₀ (Test 0 ∈ W)" value={shiftOffset} min={-2} max={2} step={0.1} onChange={setShiftOffset} />
            <SliderControl label="Basis b₁_z" value={b1[2]} min={-3} max={3} step={0.1} onChange={(v) => setB1([b1[0], b1[1], v])} />
            <SliderControl label="Basis b₂_z" value={b2[2]} min={-3} max={3} step={0.1} onChange={(v) => setB2([b2[0], b2[1], v])} />
          </div>
        ) : (
          <div className="viz-sliders-grid">
            <SliderControl label="Input Vector x₁" value={inputX[0]} min={-3} max={3} step={0.1} onChange={(v) => setInputX([v, inputX[1], inputX[2]])} />
            <SliderControl label="Input Vector x₂" value={inputX[1]} min={-3} max={3} step={0.1} onChange={(v) => setInputX([inputX[0], v, inputX[2]])} />
            <SliderControl label="Input Vector x₃" value={inputX[2]} min={-3} max={3} step={0.1} onChange={(v) => setInputX([inputX[0], inputX[1], v])} />
          </div>
        )}
      </div>
    </div>
  );
}
