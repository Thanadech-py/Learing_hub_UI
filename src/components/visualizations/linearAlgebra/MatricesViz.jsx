import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function MatricesViz() {
  const [a11, setA11] = useState(2);
  const [a12, setA12] = useState(1);
  const [a21, setA21] = useState(1);
  const [a22, setA22] = useState(3);

  const canvasRef = useRef(null);

  // Matrix properties
  const isSymmetric = Math.abs(a12 - a21) < 1e-4;
  const trace = a11 + a22;
  const determinant = a11 * a22 - a12 * a21;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Left Half: Original Matrix A and Transpose Aᵀ side by side
    const drawMatrixBox = (x, y, title, m11, m12, m21, m22, color) => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.fillRect(x, y, 160, 110);
      ctx.strokeRect(x, y, 160, 110);

      // Title
      ctx.fillStyle = color;
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(title, x + 15, y + 25);

      // Matrix Brackets
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // left bracket [
      ctx.moveTo(x + 25, y + 40);
      ctx.lineTo(x + 15, y + 40);
      ctx.lineTo(x + 15, y + 95);
      ctx.lineTo(x + 25, y + 95);
      // right bracket ]
      ctx.moveTo(x + 135, y + 40);
      ctx.lineTo(x + 145, y + 40);
      ctx.lineTo(x + 145, y + 95);
      ctx.lineTo(x + 135, y + 95);
      ctx.stroke();

      // Elements
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 15px monospace';
      ctx.fillText(m11.toFixed(1).padStart(4), x + 30, y + 60);
      ctx.fillText(m12.toFixed(1).padStart(4), x + 85, y + 60);
      ctx.fillText(m21.toFixed(1).padStart(4), x + 30, y + 85);
      ctx.fillText(m22.toFixed(1).padStart(4), x + 85, y + 85);
    };

    drawMatrixBox(60, 70, 'Matrix A', a11, a12, a21, a22, '#38bdf8');
    drawMatrixBox(260, 70, 'Transpose Aᵀ', a11, a21, a12, a22, '#a78bfa');

    // Right Half: Geometric Columns Vector Display
    const originX = 580;
    const originY = 190;
    const scale = 32;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(420, originY);
    ctx.lineTo(760, originY);
    ctx.moveTo(originX, 40);
    ctx.lineTo(originX, 320);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('Column Vectors of Matrix A', 450, 50);

    const drawColVec = (x, y, color, label) => {
      const px = originX + x * scale;
      const py = originY - y * scale;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(px, py);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(label, px + 8, py - 4);
    };

    drawColVec(a11, a21, '#38bdf8', `Col 1: [${a11}, ${a21}]ᵀ`);
    drawColVec(a12, a22, '#a78bfa', `Col 2: [${a12}, ${a22}]ᵀ`);
  }, [a11, a12, a21, a22]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Matrix Structure & Transpose Inspector</h3>
          <span className="viz-header__tag">Aᵀ, Trace, & Column Vectors</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Trace tr(A)" value={trace.toFixed(1)} unit="a₁₁ + a₂₂" />
        <MetricBadge label="Determinant" value={determinant.toFixed(1)} unit="" />
        <MetricBadge
          label="Symmetry"
          value={isSymmetric ? 'Symmetric (A = Aᵀ)' : 'Asymmetric'}
          unit={isSymmetric ? 'a₁₂ = a₂₁' : 'a₁₂ ≠ a₂₁'}
          highlight={isSymmetric}
        />
      </div>

      <div className="viz-canvas-area" style={{ height: '360px' }}>
        <canvas ref={canvasRef} width={800} height={360} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl label="Entry a₁₁ (Row 1, Col 1)" value={a11} min={-4} max={4} step={0.5} unit="" onChange={setA11} />
          <SliderControl label="Entry a₁₂ (Row 1, Col 2)" value={a12} min={-4} max={4} step={0.5} unit="" onChange={setA12} />
          <SliderControl label="Entry a₂₁ (Row 2, Col 1)" value={a21} min={-4} max={4} step={0.5} unit="" onChange={setA21} />
          <SliderControl label="Entry a₂₂ (Row 2, Col 2)" value={a22} min={-4} max={4} step={0.5} unit="" onChange={setA22} />
        </div>
      </div>
    </div>
  );
}
