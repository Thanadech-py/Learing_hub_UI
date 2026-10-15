import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function MatrixMultiplicationViz() {
  const [a11, setA11] = useState(1);
  const [a12, setA12] = useState(2);
  const [a21, setA21] = useState(0);
  const [a22, setA22] = useState(1);

  const [b11, setB11] = useState(2);
  const [b12, setB12] = useState(0);
  const [b21, setB21] = useState(1);
  const [b22, setB22] = useState(3);

  const canvasRef = useRef(null);

  // Compute AB
  const ab11 = a11 * b11 + a12 * b21;
  const ab12 = a11 * b12 + a12 * b22;
  const ab21 = a21 * b11 + a22 * b21;
  const ab22 = a21 * b12 + a22 * b22;

  // Compute BA
  const ba11 = b11 * a11 + b12 * a21;
  const ba12 = b11 * a12 + b12 * a22;
  const ba21 = b21 * a11 + b22 * a21;
  const ba22 = b21 * a12 + b22 * a22;

  const isCommutative =
    Math.abs(ab11 - ba11) < 1e-4 &&
    Math.abs(ab12 - ba12) < 1e-4 &&
    Math.abs(ab21 - ba21) < 1e-4 &&
    Math.abs(ab22 - ba22) < 1e-4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    const drawMatrix = (x, y, title, m11, m12, m21, m22, color) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.fillRect(x, y, 140, 95);
      ctx.strokeRect(x, y, 140, 95);

      ctx.fillStyle = color;
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(title, x + 12, y + 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(m11.toFixed(0).padStart(3), x + 25, y + 50);
      ctx.fillText(m12.toFixed(0).padStart(3), x + 75, y + 50);
      ctx.fillText(m21.toFixed(0).padStart(3), x + 25, y + 75);
      ctx.fillText(m22.toFixed(0).padStart(3), x + 75, y + 75);
    };

    // Draw Equation row: [A] × [B] = [AB]
    drawMatrix(50, 60, 'Matrix A', a11, a12, a21, a22, '#38bdf8');
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 20px system-ui, sans-serif';
    ctx.fillText('×', 205, 115);
    drawMatrix(230, 60, 'Matrix B', b11, b12, b21, b22, '#a78bfa');
    ctx.fillText('=', 385, 115);
    drawMatrix(410, 60, 'Product C = AB', ab11, ab12, ab21, ab22, '#22c55e');

    // Draw Reverse row: [B] × [A] = [BA]
    drawMatrix(50, 190, 'Matrix B', b11, b12, b21, b22, '#a78bfa');
    ctx.fillText('×', 205, 245);
    drawMatrix(230, 190, 'Matrix A', a11, a12, a21, a22, '#38bdf8');
    ctx.fillText('=', 385, 245);
    drawMatrix(410, 190, 'Product BA', ba11, ba12, ba21, ba22, isCommutative ? '#22c55e' : '#ef4444');

    // Summary callout
    ctx.fillStyle = isCommutative ? '#22c55e' : '#f87171';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText(
      isCommutative
        ? '✓ Rare Case: AB = BA (Matrices Commute)'
        : '⚠️ General Rule: AB ≠ BA (Matrix Multiplication is NOT Commutative!)',
      60,
      325
    );
  }, [a11, a12, a21, a22, b11, b12, b21, b22, ab11, ab12, ab21, ab22, ba11, ba12, ba21, ba22, isCommutative]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Matrix Multiplication & Non-Commutativity</h3>
          <span className="viz-header__tag">AB vs. BA</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Product AB" value={`[${ab11}, ${ab12}; ${ab21}, ${ab22}]`} unit="" highlight />
        <MetricBadge label="Product BA" value={`[${ba11}, ${ba12}; ${ba21}, ${ba22}]`} unit="" />
        <MetricBadge
          label="Commutativity"
          value={isCommutative ? 'AB = BA' : 'AB ≠ BA'}
          unit={isCommutative ? 'Commutes' : 'Non-Commutative'}
          highlight={!isCommutative}
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '360px' }}>
        <canvas ref={canvasRef} width={800} height={360} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="A₁₁" value={a11} min={-3} max={3} step={1} unit="" onChange={setA11} />
          <SliderControl label="A₁₂" value={a12} min={-3} max={3} step={1} unit="" onChange={setA12} />
          <SliderControl label="B₁₁" value={b11} min={-3} max={3} step={1} unit="" onChange={setB11} />
          <SliderControl label="B₁₂" value={b12} min={-3} max={3} step={1} unit="" onChange={setB12} />
        </div>
      </div>
    </div>
  );
}
