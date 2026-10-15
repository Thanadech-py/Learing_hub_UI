import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';
import MathView from '../../MathView/MathView.jsx';

export default function UnitsMeasurementViz() {
  const [mode, setMode] = useState('caliper'); // 'caliper' | 'dimensions'
  const [caliperMm, setCaliperMm] = useState(18.46);
  const [selectedEqIndex, setSelectedEqIndex] = useState(0);

  // Caliper calculations (0.02 mm least count, 50 vernier divisions = 49 mm)
  const msr = Math.floor(caliperMm); // Main scale reading in mm
  const fraction = caliperMm - msr;
  const vsd = Math.round(fraction / 0.02); // 0 to 49
  const measuredTotal = (msr + vsd * 0.02).toFixed(2);

  const equations = [
    {
      name: 'Kinematic Position Equation',
      latex: 's = u t + \\frac{1}{2}a t^2',
      terms: [
        { label: '[s]', desc: 'Displacement', dim: '[L]', unit: 'm' },
        { label: '[ut]', desc: 'Initial velocity × time = [LT⁻¹][T]', dim: '[L]', unit: 'm' },
        { label: '[½at²]', desc: '½ [LT⁻²][T²] (½ is dimensionless)', dim: '[L]', unit: 'm' },
      ],
      result: 'All 3 terms possess dimension [L]. Equation is dimensionally valid!',
    },
    {
      name: "Newton's Second Law",
      latex: 'F = m a',
      terms: [
        { label: '[F]', desc: 'Force', dim: '[M][L][T]^{-2}', unit: 'kg·m/s² (N)' },
        { label: '[ma]', desc: 'Mass × Acceleration = [M] × [LT⁻²]', dim: '[M][L][T]^{-2}', unit: 'kg·m/s²' },
      ],
      result: 'LHS dimension equals RHS dimension. Homogeneity verified!',
    },
    {
      name: 'Kinetic Energy',
      latex: 'K = \\frac{1}{2}m v^2',
      terms: [
        { label: '[K]', desc: 'Energy / Work', dim: '[M][L]^2[T]^{-2}', unit: 'J (Joule)' },
        { label: '[½mv²]', desc: '½ [M] × [LT⁻¹]² = [M][L]²[T]⁻²', dim: '[M][L]^2[T]^{-2}', unit: 'kg·m²/s²' },
      ],
      result: 'Energy dimension [M L² T⁻²] holds for all forms of energy.',
    },
  ];

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Measurement & Dimensional Analysis Lab</h3>
          <span className="viz-header__tag">Interactive Simulator</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'caliper' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('caliper')}
          >
            Virtual Vernier Caliper
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'dimensions' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setMode('dimensions')}
          >
            Dimensional Analyzer
          </button>
        </div>
      </header>

      {mode === 'caliper' ? (
        <>
          <div className="viz-metrics-bar">
            <MetricBadge label="Main Scale (MSR)" value={msr} unit="mm" />
            <MetricBadge label="Vernier Div (VSD)" value={vsd} unit="division" />
            <MetricBadge label="Least Count (LC)" value="0.02" unit="mm" />
            <MetricBadge
              label="Final Reading"
              value={measuredTotal}
              unit="mm"
              highlight
            />
          </div>

          {/* SVG Caliper Render */}
          <div className="viz-canvas-area" style={{ height: 320, background: '#0a101f' }}>
            <svg
              viewBox="0 0 800 280"
              style={{ width: '100%', height: '100%', userSelect: 'none' }}
            >
              <defs>
                <linearGradient id="metalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="jawGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* Main Beam (Fixed) */}
              <rect x="40" y="50" width="720" height="70" fill="url(#metalGrad)" rx="4" />
              {/* Fixed Left Jaw */}
              <path
                d="M 40 50 L 40 240 L 90 240 L 100 120 L 140 120 L 140 50 Z"
                fill="url(#jawGrad)"
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Measured Object between jaws */}
              {caliperMm > 0.5 && (
                <rect
                  x="100"
                  y="125"
                  width={caliperMm * 9}
                  height="110"
                  fill="#f59e0b"
                  opacity="0.85"
                  rx="4"
                  stroke="#d97706"
                  strokeWidth="2"
                />
              )}

              {/* Main Scale Markings (0 to 60 mm) */}
              {Array.from({ length: 61 }).map((_, i) => {
                const xPos = 100 + i * 9;
                if (xPos > 740) return null;
                const isCm = i % 10 === 0;
                const isMid = i % 5 === 0;
                const tickH = isCm ? 22 : isMid ? 15 : 9;
                return (
                  <g key={`ms-${i}`}>
                    <line
                      x1={xPos}
                      y1="50"
                      x2={xPos}
                      y2={50 + tickH}
                      stroke="#0f172a"
                      strokeWidth={isCm ? 2 : 1}
                    />
                    {isCm && (
                      <text
                        x={xPos}
                        y="86"
                        fontSize="11"
                        fontWeight="bold"
                        fill="#0f172a"
                        textAnchor="middle"
                      >
                        {i / 10}
                      </text>
                    )}
                  </g>
                );
              })}
              <text x="730" y="70" fontSize="11" fill="#1e293b" fontWeight="600">
                cm
              </text>

              {/* Sliding Vernier Unit */}
              <g transform={`translate(${caliperMm * 9}, 0)`}>
                {/* Sliding Right Jaw */}
                <path
                  d="M 100 120 L 110 240 L 160 240 L 160 50 L 100 50 Z"
                  fill="url(#jawGrad)"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                {/* Vernier Plate Window */}
                <rect
                  x="100"
                  y="100"
                  width="280"
                  height="45"
                  fill="#f8fafc"
                  stroke="#334155"
                  strokeWidth="2"
                  rx="4"
                />
                {/* Vernier Scale Markings (0 to 50 divisions) */}
                {Array.from({ length: 51 }).map((_, v) => {
                  // 50 vernier divisions = 49 main scale divisions = 49 * 9 = 441 px
                  // 1 VSD = 441 / 50 = 8.82 px
                  const vx = 100 + v * 8.82;
                  const isDec = v % 10 === 0;
                  const isFive = v % 5 === 0;
                  const vh = isDec ? 16 : isFive ? 12 : 7;
                  const matches = v === vsd;
                  return (
                    <g key={`vs-${v}`}>
                      <line
                        x1={vx}
                        y1="100"
                        x2={vx}
                        y2={100 + vh}
                        stroke={matches ? '#ef4444' : '#0f172a'}
                        strokeWidth={matches ? 2.5 : isDec ? 1.8 : 1}
                      />
                      {isDec && (
                        <text
                          x={vx}
                          y="130"
                          fontSize="9"
                          fontWeight="bold"
                          fill="#0f172a"
                          textAnchor="middle"
                        >
                          {v / 5}
                        </text>
                      )}
                    </g>
                  );
                })}
                <text x="360" y="125" fontSize="9" fill="#475569" fontWeight="600">
                  0.02 mm
                </text>
              </g>

              {/* Magnified coincidence callout */}
              <g transform="translate(560, 165)">
                <rect
                  x="0"
                  y="0"
                  width="210"
                  height="95"
                  fill="#111827"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  rx="10"
                />
                <text x="105" y="22" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="bold">
                  Scale Coincidence Point
                </text>
                <text x="15" y="44" fill="#cbd5e1" fontSize="11">
                  MSR = {msr} mm
                </text>
                <text x="15" y="62" fill="#cbd5e1" fontSize="11">
                  VSD #{vsd} aligns with main scale
                </text>
                <text x="15" y="80" fill="#4ade80" fontSize="12" fontWeight="bold">
                  Total = {msr} + ({vsd} × 0.02) = {measuredTotal} mm
                </text>
              </g>
            </svg>
          </div>

          <div className="viz-controls-panel">
            <SliderControl
              label="Adjust Caliper Jaw Opening / Measured Object Size"
              value={caliperMm}
              min={0}
              max={50}
              step={0.02}
              unit="mm"
              onChange={setCaliperMm}
            />
            <div className="viz-hint">
              💡 <strong>How to read:</strong> Look at where the Vernier zero tick falls on the main scale to read whole millimeters (MSR = {msr} mm). Then scan right along the vernier ticks until you find the exact tick mark aligned perfectly with a line above (Tick #{vsd}). Multiply by 0.02 mm and add!
            </div>
          </div>
        </>
      ) : (
        /* Dimensional Analysis Mode */
        <div className="viz-controls-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {equations.map((eq, i) => (
              <button
                key={i}
                type="button"
                className={`viz-btn ${selectedEqIndex === i ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setSelectedEqIndex(i)}
              >
                {eq.name}
              </button>
            ))}
          </div>

          <div
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              marginBottom: '1.5rem',
            }}
          >
            <MathView math={equations[selectedEqIndex].latex} block />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {equations[selectedEqIndex].terms.map((t, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '0.35rem' }}>
                  {t.label}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {t.desc}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#4ade80' }}>
                  Dimension: {t.dim}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  SI Unit: {t.unit}
                </div>
              </div>
            ))}
          </div>

          <div className="viz-hint">
            ✅ <strong>Verification:</strong> {equations[selectedEqIndex].result}
          </div>
        </div>
      )}
    </div>
  );
}
