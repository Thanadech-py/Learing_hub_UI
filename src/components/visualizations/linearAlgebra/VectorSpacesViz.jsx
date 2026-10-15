import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function VectorSpacesViz() {
  const [subspaceType, setSubspaceType] = useState('plane'); // 'line' | 'plane' | 'collapsed'
  const [domainDimN, setDomainDimN] = useState(3); // n = 3 columns
  const [rankA, setRankA] = useState(2); // rank = 2

  const canvasRef = useRef(null);

  // Rank-Nullity: rank + nullity = n
  const nullityA = Math.max(0, domainDimN - rankA);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Left Half: Subspace Geometry View
    const originX = 220;
    const originY = height / 2 + 20;

    // Pseudo-3D axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    // x axis (diagonal)
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX - 120, originY + 80);
    // y axis (horizontal)
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + 160, originY);
    // z axis (vertical)
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY - 140);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText('x', originX - 130, originY + 90);
    ctx.fillText('y', originX + 165, originY + 4);
    ctx.fillText('z', originX - 10, originY - 145);

    if (subspaceType === 'plane') {
      // Draw 2D plane through origin
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX - 90, originY + 60);
      ctx.lineTo(originX + 110, originY + 30);
      ctx.lineTo(originX + 90, originY - 60);
      ctx.lineTo(originX - 110, originY - 30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('2D Plane Subspace in ℝ³ (Dim = 2)', originX - 90, originY - 45);
    } else if (subspaceType === 'line') {
      // Draw 1D line through origin
      ctx.strokeStyle = '#a78bfa';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(originX - 130, originY + 70);
      ctx.lineTo(originX + 130, originY - 70);
      ctx.stroke();

      ctx.fillStyle = '#a78bfa';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('1D Line Subspace in ℝ³ (Dim = 1)', originX - 90, originY - 45);
    } else {
      // 0D Point (The Origin)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(originX, originY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText('{0} Trivial Subspace (Dim = 0)', originX - 70, originY - 20);
    }

    // Right Half: The Rank-Nullity Conservation Balance Meter
    const meterX = 470;
    const meterY = 80;
    const meterW = 280;
    const meterH = 180;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.fillRect(meterX, meterY, meterW, meterH);
    ctx.strokeRect(meterX, meterY, meterW, meterH);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('Rank-Nullity Conservation Theorem', meterX + 15, meterY + 28);
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('rank(A) + nullity(A) = n (Domain Dim)', meterX + 15, meterY + 46);

    // Visual bar representing n partitioned into Rank + Nullity
    const barX = meterX + 15;
    const barY = meterY + 70;
    const barW = meterW - 30;
    const barH = 28;

    const rankFrac = domainDimN > 0 ? rankA / domainDimN : 0;
    const rankWidth = barW * rankFrac;
    const nullityWidth = barW - rankWidth;

    // Rank part (green)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(barX, barY, rankWidth, barH);

    // Nullity part (amber)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(barX + rankWidth, barY, nullityWidth, barH);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px system-ui, sans-serif';
    if (rankA > 0) ctx.fillText(`Rank: ${rankA}`, barX + 8, barY + 18);
    if (nullityA > 0) ctx.fillText(`Nullity: ${nullityA}`, barX + rankWidth + 8, barY + 18);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(`• Column Space dim = ${rankA} (Surviving Dimensions)`, meterX + 15, meterY + 125);
    ctx.fillText(`• Null Space dim = ${nullityA} (Dimensions Flattened to 0)`, meterX + 15, meterY + 145);
    ctx.fillText(`• Total Inputs n = ${domainDimN} dimensions`, meterX + 15, meterY + 165);
  }, [subspaceType, domainDimN, rankA, nullityA]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Vector Spaces & Rank-Nullity Inspector</h3>
          <span className="viz-header__tag">Subspaces, Basis & Conservation</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${subspaceType === 'plane' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSubspaceType('plane');
              setRankA(2);
            }}
          >
            2D Plane Subspace
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${subspaceType === 'line' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSubspaceType('line');
              setRankA(1);
            }}
          >
            1D Line Subspace
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${subspaceType === 'collapsed' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSubspaceType('collapsed');
              setRankA(0);
            }}
          >
            {'{0}'} Trivial Subspace
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Domain Dimension (n)" value={domainDimN} unit="Inputs" />
        <MetricBadge label="Rank (dim C(A))" value={rankA} unit="Pivot Columns" highlight />
        <MetricBadge label="Nullity (dim N(A))" value={nullityA} unit="Free Variables" highlight />
        <MetricBadge label="Conservation" value={`${rankA} + ${nullityA} = ${domainDimN}`} unit="rank + null = n" />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Domain Dimension (n Columns)"
            value={domainDimN}
            min={1}
            max={5}
            step={1}
            unit=""
            onChange={(val) => {
              setDomainDimN(val);
              if (rankA > val) setRankA(val);
            }}
          />
          <SliderControl
            label="Matrix Rank"
            value={rankA}
            min={0}
            max={domainDimN}
            step={1}
            unit=""
            onChange={setRankA}
          />
        </div>
      </div>
    </div>
  );
}
