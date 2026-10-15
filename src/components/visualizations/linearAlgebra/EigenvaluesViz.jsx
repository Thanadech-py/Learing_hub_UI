import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function EigenvaluesViz() {
  const [testAngleDeg, setTestAngleDeg] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);

  // Matrix A entries: [[2, 1], [1, 2]] (Symmetric, eigenvalues λ1 = 3 at 45°, λ2 = 1 at 135°)
  const [a11, setA11] = useState(2);
  const [a12, setA12] = useState(1);
  const [a21, setA21] = useState(1);
  const [a22, setA22] = useState(2);

  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Test vector x on unit circle
  const testRad = (testAngleDeg * Math.PI) / 180;
  const xVec = Math.cos(testRad);
  const yVec = Math.sin(testRad);

  // Transformed vector Ax
  const axX = a11 * xVec + a12 * yVec;
  const axY = a21 * xVec + a22 * yVec;

  // Check collinearity: cross product in 2D = x * axY - y * axX
  const crossProd = Math.abs(xVec * axY - yVec * axX);
  const isEigenvector = crossProd < 0.08;

  // Approximate eigenvalue if near collinear
  const dotVal = xVec * axX + yVec * axY;
  const approxLambda = dotVal / (xVec * xVec + yVec * yVec);

  // Analytical eigenvalues of 2x2 matrix: λ^2 - tr*λ + det = 0
  const tr = a11 + a22;
  const det = a11 * a22 - a12 * a21;
  const disc = tr * tr - 4 * det;
  let lambda1Text = 'N/A';
  let lambda2Text = 'N/A';
  if (disc >= 0) {
    const l1 = ((tr + Math.sqrt(disc)) / 2).toFixed(2);
    const l2 = ((tr - Math.sqrt(disc)) / 2).toFixed(2);
    lambda1Text = `λ₁ = ${l1}`;
    lambda2Text = `λ₂ = ${l2}`;
  } else {
    lambda1Text = 'Complex Eigenvalues (Rotation)';
  }

  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = null;
    const loop = (time) => {
      if (lastTime != null) {
        const dt = (time - lastTime) / 1000;
        setTestAngleDeg((prev) => (prev + dt * 35) % 360);
      }
      lastTime = time;
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const originX = width / 2;
    const originY = height / 2;
    const scale = 55;

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(30, originY);
    ctx.lineTo(width - 30, originY);
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, height - 20);
    ctx.stroke();

    // Unit circle reference track (where x lives)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 4]);
    ctx.beginPath();
    ctx.arc(originX, originY, scale, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Helper: Draw vector
    const drawVec = (vx, vy, color, label, widthLine = 3) => {
      const px = originX + vx * scale;
      const py = originY - vy * scale;
      ctx.strokeStyle = color;
      ctx.lineWidth = widthLine;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(px, py);
      ctx.stroke();

      const angle = Math.atan2(py - originY, px - originX);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - 10 * Math.cos(angle - Math.PI / 6), py - 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(px - 10 * Math.cos(angle + Math.PI / 6), py - 10 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(label, px + 8, py - 4);
    };

    // If Eigenvector condition met: draw glowing line through origin!
    if (isEigenvector) {
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.5)';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(originX - 6 * xVec * scale, originY + 6 * yVec * scale);
      ctx.lineTo(originX + 6 * xVec * scale, originY - 6 * yVec * scale);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw input vector x (Cyan)
    drawVec(xVec, yVec, isEigenvector ? '#22c55e' : '#38bdf8', 'Vector x (Input)');

    // Draw output vector Ax (Purple or Glowing Green if Eigenvector)
    drawVec(
      axX,
      axY,
      isEigenvector ? '#22c55e' : '#a78bfa',
      isEigenvector ? `Ax = λx (λ ≈ ${approxLambda.toFixed(2)})` : 'Vector Ax (Transformed)',
      isEigenvector ? 4.5 : 3
    );

    // Header banner on canvas
    ctx.fillStyle = isEigenvector ? '#22c55e' : '#cbd5e1';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText(
      isEigenvector
        ? '🎯 EIGENVECTOR DETECTED! x and Ax are collinear (Av = λv)'
        : 'Rotate test vector x until it aligns collinear with Ax',
      40,
      40
    );
  }, [xVec, yVec, axX, axY, isEigenvector, approxLambda]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Eigenvalue & Eigenvector Hunter</h3>
          <span className="viz-header__tag">Av = λv</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-btn ${isPlaying ? 'viz-btn--active' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸ Pause Sweep' : '▶ Continuous Sweep'}
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Direction θ" value={`${testAngleDeg.toFixed(1)}°`} unit="" />
        <MetricBadge label="Matrix Trace" value={tr} unit="λ₁ + λ₂" />
        <MetricBadge label="Determinant" value={det} unit="λ₁ · λ₂" />
        <MetricBadge label="Eigenvalues" value={`${lambda1Text}, ${lambda2Text}`} unit="" highlight />
        <MetricBadge
          label="Alignment"
          value={isEigenvector ? '✓ EIGENVECTOR!' : 'Rotating'}
          unit={isEigenvector ? `λ ≈ ${approxLambda.toFixed(2)}` : 'Not collinear'}
          highlight={isEigenvector}
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Rotate Test Vector (θ)"
            value={testAngleDeg}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={setTestAngleDeg}
          />
          <SliderControl label="Matrix A₁₁" value={a11} min={-3} max={3} step={0.5} unit="" onChange={setA11} />
          <SliderControl label="Matrix A₁₂" value={a12} min={-3} max={3} step={0.5} unit="" onChange={setA12} />
          <SliderControl label="Matrix A₂₁" value={a21} min={-3} max={3} step={0.5} unit="" onChange={setA21} />
          <SliderControl label="Matrix A₂₂" value={a22} min={-3} max={3} step={0.5} unit="" onChange={setA22} />
        </div>
      </div>
    </div>
  );
}
