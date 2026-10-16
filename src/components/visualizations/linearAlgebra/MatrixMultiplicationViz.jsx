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

const QR_PRESETS = {
  'Slanted 3D Basis': {
    a1: [2.2, 0.6, 0.2],
    a2: [1.0, 2.0, 0.5],
    a3: [0.8, 0.8, 2.2],
  },
  'Near-Collinear (High Shear R)': {
    a1: [2.4, 0.4, 0.2],
    a2: [2.0, 1.0, 0.4],
    a3: [1.2, 1.2, 1.8],
  },
  'Already Orthogonal (R Diagonal)': {
    a1: [2.0, 0, 0],
    a2: [0, 1.8, 0],
    a3: [0, 0, 1.6],
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

function sub3(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export default function MatrixMultiplicationViz() {
  const [mode, setMode] = useState('qr'); // 'qr' | 'comp'

  // Mode 1: A = QR Gram-Schmidt in 3D
  const [a1, setA1] = useState([2.2, 0.6, 0.2]);
  const [a2, setA2] = useState([1.0, 2.0, 0.5]);
  const [a3, setA3] = useState([0.8, 0.8, 2.2]);
  const [gsStep, setGsStep] = useState(3); // 1: q1, 2: q2, 3: q3 full QR
  const [qrPreset, setQrPreset] = useState('Slanted 3D Basis');

  // Mode 2: 3D Non-Commutative Composition ABx vs BAx
  const [rotZDeg, setRotZDeg] = useState(55); // Matrix A: Z-rotation
  const [shearXY, setShearXY] = useState(0.8); // Matrix B: X-Y shear + Z scale
  const [testX, setTestX] = useState([1.8, 1.2, 1.4]);

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

  // Gram-Schmidt orthogonalization in 3D:
  const r11 = Math.max(1e-4, norm3(a1));
  const q1 = scale3(a1, 1 / r11);

  const r12 = dot3(q1, a2);
  const proj2On1 = scale3(q1, r12);
  const e2 = sub3(a2, proj2On1);
  const r22 = Math.max(1e-4, norm3(e2));
  const q2 = scale3(e2, 1 / r22);

  const r13 = dot3(q1, a3);
  const r23 = dot3(q2, a3);
  const proj3On12 = [
    q1[0] * r13 + q2[0] * r23,
    q1[1] * r13 + q2[1] * r23,
    q1[2] * r13 + q2[2] * r23,
  ];
  const e3 = sub3(a3, proj3On12);
  const r33 = Math.max(1e-4, norm3(e3));
  const q3 = scale3(e3, 1 / r33);

  // Composition ABx vs BAx
  const rad = (rotZDeg * Math.PI) / 180;
  const applyA = (v) => [
    v[0] * Math.cos(rad) - v[1] * Math.sin(rad),
    v[0] * Math.sin(rad) + v[1] * Math.cos(rad),
    v[2],
  ];
  const applyB = (v) => [
    v[0] + shearXY * v[1],
    v[1],
    v[2] * 0.85 + 0.3 * v[0],
  ];

  const bx = applyB(testX);
  const abx = applyA(bx);
  const ax = applyA(testX);
  const bax = applyB(ax);
  const diffNorm = norm3(sub3(abx, bax));

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

    if (mode === 'qr') {
      // Draw slanted parallelepiped of A = [a1 a2 a3]
      draw3DParallelepiped(ctx, camera, width, height, a1, a2, a3, {
        fillColor: 'rgba(56, 189, 248, 0.06)',
        strokeColor: 'rgba(56, 189, 248, 0.25)',
        dashed: true,
        baseScale,
        centerOffset,
      });

      // Draw orthonormal cube of Q = [q1 q2 q3]
      if (gsStep >= 3) {
        draw3DParallelepiped(ctx, camera, width, height, q1, q2, q3, {
          fillColor: 'rgba(34, 197, 94, 0.14)',
          strokeColor: 'rgba(34, 197, 94, 0.55)',
          baseScale,
          centerOffset,
        });
      }

      // Step 2: show projection shadow of a2 onto q1 and perpendicular residual e2
      if (gsStep >= 2) {
        const pProj2 = proj(proj2On1);
        const pA2 = proj(a2);
        ctx.save();
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pProj2.x, pProj2.y);
        ctx.lineTo(pA2.x, pA2.y);
        ctx.stroke();
        ctx.restore();
      }

      // Step 3: show projection shadow of a3 onto span(q1,q2) and perpendicular residual e3
      if (gsStep >= 3) {
        const pProj3 = proj(proj3On12);
        const pA3 = proj(a3);
        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(pProj3.x, pProj3.y);
        ctx.lineTo(pA3.x, pA3.y);
        ctx.stroke();
        ctx.restore();
      }

      // Draw orthonormal vectors q1, q2, q3
      if (gsStep >= 1) {
        draw3DVector(ctx, camera, width, height, q1, {
          color: '#22c55e',
          label: 'q₁ (unit)',
          lineWidth: 3.4,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });
      }
      if (gsStep >= 2) {
        draw3DVector(ctx, camera, width, height, q2, {
          color: '#10b981',
          label: 'q₂ ⊥ q₁',
          lineWidth: 3.4,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });
      }
      if (gsStep >= 3) {
        draw3DVector(ctx, camera, width, height, q3, {
          color: '#34d399',
          label: 'q₃ ⊥ q₁,q₂',
          lineWidth: 3.4,
          showDropStalk: false,
          baseScale,
          centerOffset,
        });
      }

      // Draggable original columns a1, a2, a3
      const tip1 = draw3DVector(ctx, camera, width, height, a1, {
        color: '#38bdf8',
        label: `a₁ [${a1.map((v) => v.toFixed(1)).join(',')}]`,
        lineWidth: 2.8,
        draggable: true,
        isDragging: activeHandleId === 'a1',
        isHovered: hoveredHandleId === 'a1',
        baseScale,
        centerOffset,
      });
      const tip2 = draw3DVector(ctx, camera, width, height, a2, {
        color: '#a78bfa',
        label: `a₂ [${a2.map((v) => v.toFixed(1)).join(',')}]`,
        lineWidth: 2.8,
        draggable: true,
        isDragging: activeHandleId === 'a2',
        isHovered: hoveredHandleId === 'a2',
        baseScale,
        centerOffset,
      });
      const tip3 = draw3DVector(ctx, camera, width, height, a3, {
        color: '#f59e0b',
        label: `a₃ [${a3.map((v) => v.toFixed(1)).join(',')}]`,
        lineWidth: 2.8,
        draggable: true,
        isDragging: activeHandleId === 'a3',
        isHovered: hoveredHandleId === 'a3',
        baseScale,
        centerOffset,
      });

      drawOrientationGizmo(ctx, camera, width);

      handlesRef.current = [
        { id: 'a1', vec: a1, screen: tip1, onChange: (n) => { setQrPreset(null); setA1(n); } },
        { id: 'a2', vec: a2, screen: tip2, onChange: (n) => { setQrPreset(null); setA2(n); } },
        { id: 'a3', vec: a3, screen: tip3, onChange: (n) => { setQrPreset(null); setA3(n); } },
      ];
    } else {
      // Mode 2: 3D Composition ABx vs BAx
      // Intermediate vectors Bx and Ax (dashed)
      draw3DVector(ctx, camera, width, height, bx, {
        color: 'rgba(34, 197, 94, 0.5)',
        label: 'Bx (step 1)',
        lineWidth: 2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });
      draw3DVector(ctx, camera, width, height, ax, {
        color: 'rgba(244, 63, 94, 0.5)',
        label: 'Ax (step 1)',
        lineWidth: 2,
        dashed: true,
        showDropStalk: false,
        baseScale,
        centerOffset,
      });

      // Final ABx vs BAx
      draw3DVector(ctx, camera, width, height, abx, {
        color: '#22c55e',
        label: `A(Bx) = [${abx.map((v) => v.toFixed(1)).join(', ')}]`,
        lineWidth: 3.4,
        showDropStalk: true,
        baseScale,
        centerOffset,
      });
      draw3DVector(ctx, camera, width, height, bax, {
        color: '#f43f5e',
        label: `B(Ax) = [${bax.map((v) => v.toFixed(1)).join(', ')}]`,
        lineWidth: 3.4,
        showDropStalk: true,
        baseScale,
        centerOffset,
      });

      // Draggable input vector x
      const tipX = draw3DVector(ctx, camera, width, height, testX, {
        color: '#38bdf8',
        label: `x = [${testX.map((v) => v.toFixed(1)).join(', ')}]`,
        lineWidth: 3.2,
        draggable: true,
        isDragging: activeHandleId === 'x',
        isHovered: hoveredHandleId === 'x',
        baseScale,
        centerOffset,
      });

      drawOrientationGizmo(ctx, camera, width);

      handlesRef.current = [
        { id: 'x', vec: testX, screen: tipX, onChange: setTestX },
      ];
    }
  }, [mode, a1, a2, a3, q1, q2, q3, proj2On1, proj3On12, gsStep, testX, bx, abx, ax, bax, camera, activeHandleId, hoveredHandleId, baseScale, centerOffset, handlesRef]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">3D Matrix Multiplication & QR Decomposition</h3>
          <span className="viz-header__tag">Gram-Schmidt A = QR • Composition ABx ≠ BAx</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'qr' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('qr')}
          >
            3D A = QR (Gram-Schmidt)
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'comp' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('comp')}
          >
            3D Composition (ABx vs BAx)
          </button>
        </div>
      </header>

      {mode === 'qr' ? (
        <>
          <div className="viz-presets-bar">
            <span className="viz-presets-bar__label">QR Presets:</span>
            {Object.keys(QR_PRESETS).map((name) => (
              <button
                key={name}
                type="button"
                className={`viz-preset-chip ${qrPreset === name ? 'viz-preset-chip--active' : ''}`}
                onClick={() => {
                  const p = QR_PRESETS[name];
                  setA1([...p.a1]);
                  setA2([...p.a2]);
                  setA3([...p.a3]);
                  setQrPreset(name);
                }}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="viz-metrics-bar">
            <MetricBadge label="R Diagonal (r₁₁, r₂₂, r₃₃)" value={`${r11.toFixed(2)}, ${r22.toFixed(2)}, ${r33.toFixed(2)}`} unit="Lengths" highlight />
            <MetricBadge label="Off-Diagonals (r₁₂, r₁₃, r₂₃)" value={`${r12.toFixed(2)}, ${r13.toFixed(2)}, ${r23.toFixed(2)}`} unit="Dot Shadows" />
            <MetricBadge label="Orthonormality QᵀQ" value="I₃" unit="q₁ ⊥ q₂ ⊥ q₃" highlight />
            <MetricBadge label="det(A) = r₁₁·r₂₂·r₃₃" value={(r11 * r22 * r33).toFixed(2)} unit="Volume" />
          </div>
        </>
      ) : (
        <div className="viz-metrics-bar">
          <MetricBadge label="Input Vector x" value={`[${testX.map((v) => v.toFixed(1)).join(', ')}]ᵀ`} unit="" />
          <MetricBadge label="Path 1: A(Bx)" value={`[${abx.map((v) => v.toFixed(2)).join(', ')}]ᵀ`} unit="Shear then Rotate" highlight />
          <MetricBadge label="Path 2: B(Ax)" value={`[${bax.map((v) => v.toFixed(2)).join(', ')}]ᵀ`} unit="Rotate then Shear" highlight />
          <MetricBadge label="Discrepancy ||ABx - BAx||" value={diffNorm.toFixed(2)} unit={diffNorm < 0.05 ? 'Commutes!' : 'AB ≠ BA'} />
        </div>
      )}

      <div className="viz-canvas-area" style={{ height: '420px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            mode === 'qr' ? (
              <>
                {[1, 2, 3].map((step) => (
                  <button
                    key={step}
                    type="button"
                    className={`viz-3d-btn ${gsStep === step ? 'viz-3d-btn--active' : ''}`}
                    onClick={() => setGsStep(step)}
                  >
                    Step {step}: q₁..q_{step}
                  </button>
                ))}
              </>
            ) : null
          }
        />
        <canvas ref={canvasRef} width={840} height={420} />
      </div>

      <div className="viz-controls-panel">
        {mode === 'qr' ? (
          <div className="viz-sliders-grid">
            <SliderControl label="Col a₁_z" value={a1[2]} min={-3} max={3} step={0.1} onChange={(v) => setA1([a1[0], a1[1], v])} />
            <SliderControl label="Col a₂_z" value={a2[2]} min={-3} max={3} step={0.1} onChange={(v) => setA2([a2[0], a2[1], v])} />
            <SliderControl label="Col a₃_z" value={a3[2]} min={-3} max={3} step={0.1} onChange={(v) => setA3([a3[0], a3[1], v])} />
          </div>
        ) : (
          <div className="viz-sliders-grid">
            <SliderControl label="Matrix A (Z-Rotation θ)" value={rotZDeg} min={-180} max={180} step={5} unit="°" onChange={setRotZDeg} />
            <SliderControl label="Matrix B (3D Shear k)" value={shearXY} min={-1.5} max={1.5} step={0.1} onChange={setShearXY} />
            <SliderControl label="Input x_z" value={testX[2]} min={-3} max={3} step={0.1} onChange={(v) => setTestX([testX[0], testX[1], v])} />
          </div>
        )}
      </div>
    </div>
  );
}
