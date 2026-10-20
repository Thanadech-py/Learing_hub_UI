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
  'General 3D Ellipsoid (Rank 3)': {
    sig1: 2.2,
    sig2: 1.4,
    sig3: 0.6,
    rankK: 3,
    probeTheta: 0.8,
    probePhi: 0.6,
  },
  'Rank-2 Flattened Disk (σ₃ = 0)': {
    sig1: 2.4,
    sig2: 1.6,
    sig3: 0.0,
    rankK: 2,
    probeTheta: 0.5,
    probePhi: 1.2,
  },
  'Rank-1 Line Segment (σ₂ = σ₃ = 0)': {
    sig1: 2.5,
    sig2: 0.0,
    sig3: 0.0,
    rankK: 1,
    probeTheta: 0.0,
    probePhi: 0.0,
  },
  'Isotropic Expansion Sphere': {
    sig1: 1.8,
    sig2: 1.8,
    sig3: 1.8,
    rankK: 3,
    probeTheta: 0.7,
    probePhi: 0.7,
  },
};

function scale3(v, s) {
  return [v[0] * s, v[1] * s, v[2] * s];
}

function norm3(v) {
  return Math.hypot(v[0], v[1], v[2]);
}

export default function SvdViz() {
  const [sig1, setSig1] = useState(2.2);
  const [sig2, setSig2] = useState(1.4);
  const [sig3, setSig3] = useState(0.6);
  const [rankK, setRankK] = useState(3);
  const [probeTheta, setProbeTheta] = useState(0.8);
  const [probePhi, setProbePhi] = useState(0.6);
  const [activePreset, setActivePreset] = useState('General 3D Ellipsoid (Rank 3)');

  const {
    canvasRef,
    camera,
    setPreset,
  } = useIsometric3D('Isometric', { baseScale: 42, snap: 0.1, clampRange: 3.5 });

  // Left singular vectors U = [u1, u2, u3] (forming an orthonormal frame in output space)
  const u1 = [0.8, 0.5, 0.32];
  const u2 = [-0.48, 0.87, -0.08];
  const u3 = [-0.34, -0.09, 0.94];

  // Effective singular values under rank-k truncation
  const effSig1 = rankK >= 1 ? sig1 : 0;
  const effSig2 = rankK >= 2 ? sig2 : 0;
  const effSig3 = rankK >= 3 ? sig3 : 0;

  // Probe vector x on unit sphere (spherical coords)
  const xDomain = [
    Math.sin(probePhi) * Math.cos(probeTheta),
    Math.sin(probePhi) * Math.sin(probeTheta),
    Math.cos(probePhi),
  ];

  // Output vector Ax = effSig1*(x·v1)*u1 + effSig2*(x·v2)*u2 + effSig3*(x·v3)*u3
  // Here assuming canonical right basis V = I for clean visual mapping
  const yAx = [
    effSig1 * xDomain[0] * u1[0] + effSig2 * xDomain[1] * u2[0] + effSig3 * xDomain[2] * u3[0],
    effSig1 * xDomain[0] * u1[1] + effSig2 * xDomain[1] * u2[1] + effSig3 * xDomain[2] * u3[1],
    effSig1 * xDomain[0] * u1[2] + effSig2 * xDomain[1] * u2[2] + effSig3 * xDomain[2] * u3[2],
  ];

  // Energy variance captured by rank-k
  const totalEnergy = Math.max(1e-5, sig1 * sig1 + sig2 * sig2 + sig3 * sig3);
  const capturedEnergy =
    ((effSig1 * effSig1 + effSig2 * effSig2 + effSig3 * effSig3) / totalEnergy) * 100;
  const conditionNumber = sig3 > 0.001 ? (sig1 / sig3).toFixed(2) : '∞ (Singular)';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    draw3DGrid(ctx, camera, width, height, { range: 2.8, gridStep: 0.8 });
    draw3DAxes(ctx, camera, width, height, { axisLength: 2.8 });

    // Draw 3D Transformed Ellipsoid Wireframe: r(θ, φ) = effSig1 cos θ sin φ u1 + effSig2 sin θ sin φ u2 + effSig3 cos φ u3
    const numTheta = 18;
    const numPhi = 10;

    ctx.save();
    ctx.lineWidth = 1.0;

    // Latitudinal rings (constant phi)
    for (let j = 1; j < numPhi; j++) {
      const phi = (j / numPhi) * Math.PI;
      const sinP = Math.sin(phi);
      const cosP = Math.cos(phi);
      ctx.beginPath();
      for (let i = 0; i <= numTheta; i++) {
        const theta = (i / numTheta) * Math.PI * 2;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        const x = effSig1 * cosT * sinP * u1[0] + effSig2 * sinT * sinP * u2[0] + effSig3 * cosP * u3[0];
        const y = effSig1 * cosT * sinP * u1[1] + effSig2 * sinT * sinP * u2[1] + effSig3 * cosP * u3[1];
        const z = effSig1 * cosT * sinP * u1[2] + effSig2 * sinT * sinP * u2[2] + effSig3 * cosP * u3[2];

        const pt = project3D([x, y, z], camera, width, height);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.stroke();
    }

    // Longitudinal meridians (constant theta)
    for (let i = 0; i < numTheta; i += 2) {
      const theta = (i / numTheta) * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);
      ctx.beginPath();
      for (let j = 0; j <= numPhi; j++) {
        const phi = (j / numPhi) * Math.PI;
        const sinP = Math.sin(phi);
        const cosP = Math.cos(phi);

        const x = effSig1 * cosT * sinP * u1[0] + effSig2 * sinT * sinP * u2[0] + effSig3 * cosP * u3[0];
        const y = effSig1 * cosT * sinP * u1[1] + effSig2 * sinT * sinP * u2[1] + effSig3 * cosP * u3[1];
        const z = effSig1 * cosT * sinP * u1[2] + effSig2 * sinT * sinP * u2[2] + effSig3 * cosP * u3[2];

        const pt = project3D([x, y, z], camera, width, height);
        if (j === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.25)';
      ctx.stroke();
    }
    ctx.restore();

    // Draw Principal Semi-Axes vectors σᵢ uᵢ
    if (effSig1 > 0) {
      draw3DVector(ctx, camera, width, height, scale3(u1, effSig1), {
        color: '#38bdf8',
        label: `σ₁ u₁ (${effSig1.toFixed(1)})`,
        lineWidth: 2.5,
      });
    }
    if (effSig2 > 0) {
      draw3DVector(ctx, camera, width, height, scale3(u2, effSig2), {
        color: '#a78bfa',
        label: `σ₂ u₂ (${effSig2.toFixed(1)})`,
        lineWidth: 2,
      });
    }
    if (effSig3 > 0) {
      draw3DVector(ctx, camera, width, height, scale3(u3, effSig3), {
        color: '#34d399',
        label: `σ₃ u₃ (${effSig3.toFixed(1)})`,
        lineWidth: 2,
      });
    }

    // Draw probe mapped vector Ax on the ellipsoid
    draw3DVector(ctx, camera, width, height, yAx, {
      color: '#ef4444',
      label: 'Ax = ∑ σᵢ(vᵢᵀx)uᵢ',
      lineWidth: 3,
    });

    drawOrientationGizmo(ctx, camera, width, height);
  }, [camera, effSig1, effSig2, effSig3, u1, u2, u3, yAx]);

  const applyPreset = (key) => {
    setActivePreset(key);
    const p = PRESETS[key];
    if (p) {
      setSig1(p.sig1);
      setSig2(p.sig2);
      setSig3(p.sig3);
      setRankK(p.rankK);
      setProbeTheta(p.probeTheta);
      setProbePhi(p.probePhi);
    }
  };

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Singular Value Decomposition A = UΣVᵀ & Hyper-Ellipsoid</h3>
          <span className="viz-header__tag">Unit Sphere ↦ Ellipsoid • Principal Semiaxes σᵢ</span>
        </div>
      </header>

      {/* Preset Buttons */}
      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Presets:</span>
        {Object.keys(PRESETS).map((key) => (
          <button
            key={key}
            type="button"
            className={`viz-preset-chip ${activePreset === key ? 'viz-preset-chip--active' : ''}`}
            onClick={() => applyPreset(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {/* 3D Isometric Canvas Area */}
      <div className="viz-canvas-area" style={{ height: '480px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          extraButtons={
            <>
              <button
                type="button"
                className={`viz-3d-btn ${rankK === 1 ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setRankK(1)}
              >
                Rank 1 (σ₁)
              </button>
              <button
                type="button"
                className={`viz-3d-btn ${rankK === 2 ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setRankK(2)}
              >
                Rank 2 (σ₁ + σ₂)
              </button>
              <button
                type="button"
                className={`viz-3d-btn ${rankK === 3 ? 'viz-3d-btn--active' : ''}`}
                onClick={() => setRankK(3)}
              >
                Rank 3 (Full 3D)
              </button>
            </>
          }
        />
        <canvas
          ref={canvasRef}
          width={720}
          height={480}
          style={{ width: '100%', height: '100%', cursor: 'grab' }}
        />
      </div>

      {/* Metrics */}
      <div className="viz-metrics-bar">
        <MetricBadge
          label="Truncated Rank"
          value={`k = ${rankK} of 3`}
          highlight
        />
        <MetricBadge
          label="Energy Captured"
          value={`${capturedEnergy.toFixed(1)}%`}
        />
        <MetricBadge
          label="Matrix 2-Norm ||A||₂"
          value={`σ₁ = ${sig1.toFixed(2)}`}
        />
        <MetricBadge
          label="Condition Number κ(A)"
          value={conditionNumber}
        />
      </div>

      {/* Sliders Panel */}
      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Singular Value σ₁ (Major Axis)"
            value={sig1}
            min={0.1}
            max={3.0}
            step={0.1}
            onChange={(v) => setSig1(Number(v))}
          />
          <SliderControl
            label="Singular Value σ₂ (Semi-Major Axis)"
            value={sig2}
            min={0.0}
            max={sig1}
            step={0.1}
            onChange={(v) => setSig2(Number(v))}
          />
          <SliderControl
            label="Singular Value σ₃ (Minor Axis)"
            value={sig3}
            min={0.0}
            max={sig2}
            step={0.05}
            onChange={(v) => setSig3(Number(v))}
          />
        </div>
      </div>
    </div>
  );
}
