import { useState } from 'react';
import '../shared/VizShared.css';
import { MetricBadge, SliderControl } from '../shared/VizControls.jsx';

/**
 * Interactive Microcontroller (MCU) 2D Visualizer
 * Visualizes 8-bit hardware registers (DDRB, PORTB, PINB),
 * atomic bitwise operations, GPIO LED logic states, and live PWM waveforms.
 */
export default function McuViz() {
  const [ddrb, setDdrb] = useState(0b00100000); // PB5 as Output by default
  const [portb, setPortb] = useState(0b00100000); // PB5 High by default
  const [pwmDuty, setPwmDuty] = useState(65); // 0 to 100%

  const toggleBit = (bit) => {
    setPortb((prev) => prev ^ (1 << bit));
  };

  const setBit = (bit) => {
    setPortb((prev) => prev | (1 << bit));
  };

  const clearBit = (bit) => {
    setPortb((prev) => prev & ~(1 << bit));
  };

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Microcontroller Hardware Register & GPIO Lab</h3>
          <span className="viz-header__tag">ATmega328P / ARM Cortex MMIO</span>
        </div>
      </header>

      {/* Real-time Metrics Bar */}
      <div className="viz-metrics-bar">
        <MetricBadge
          label="PORTB Register"
          value={`0b${portb.toString(2).padStart(8, '0')}`}
          highlight
        />
        <MetricBadge
          label="Hex Value"
          value={`0x${portb.toString(16).toUpperCase().padStart(2, '0')}`}
        />
        <MetricBadge
          label="PWM Duty Cycle"
          value={`${pwmDuty}%`}
        />
        <MetricBadge
          label="Avg Output Voltage"
          value={`${((pwmDuty / 100) * 5.0).toFixed(2)} V`}
          unit="at 5V Vcc"
        />
      </div>

      {/* Visual Canvas Area */}
      <div className="viz-canvas-area" style={{ minHeight: '360px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* 8-Bit Register Display */}
        <div style={{ width: '100%', maxWidth: '720px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8' }}>
              PORTB (Pins PB7 down to PB0)
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Click any bit to toggle output state
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem' }}>
            {[7, 6, 5, 4, 3, 2, 1, 0].map((bit) => {
              const isHigh = Boolean(portb & (1 << bit));
              const isOutput = Boolean(ddrb & (1 << bit));
              return (
                <button
                  key={bit}
                  type="button"
                  onClick={() => toggleBit(bit)}
                  style={{
                    cursor: 'pointer',
                    background: isHigh ? 'rgba(74, 222, 128, 0.22)' : 'rgba(255, 255, 255, 0.03)',
                    border: `2px solid ${isHigh ? '#4ade80' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '12px',
                    padding: '0.8rem 0.4rem',
                    textAlign: 'center',
                    transition: 'all 0.18s ease',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>PB{bit}</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: isHigh ? '#4ade80' : '#64748b', margin: '0.2rem 0' }}>
                    {isHigh ? '1' : '0'}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: isOutput ? '#38bdf8' : '#94a3b8' }}>
                    {isOutput ? 'OUT' : 'IN'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Pin Hardware & Oscilloscope */}
        <div style={{ width: '100%', maxWidth: '720px', display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) minmax(280px, 1.4fr)', gap: '1.25rem' }}>
          {/* LED indicators */}
          <div
            style={{
              background: 'rgba(8, 13, 25, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#facc15', textTransform: 'uppercase' }}>
              Connected LED Pin (PB5)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: (portb & (1 << 5)) ? '#4ade80' : '#1e293b',
                  boxShadow: (portb & (1 << 5)) ? '0 0 24px #4ade80' : 'none',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.2s ease',
                }}
              />
              <div style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 600 }}>
                {(portb & (1 << 5)) ? 'LED ON (5V High)' : 'LED OFF (0V Low)'}
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Standard Arduino Uno built-in LED is mapped directly to PORTB bit 5 (PB5).
            </div>
          </div>

          {/* PWM Simulated Waveform */}
          <div
            style={{
              background: 'rgba(8, 13, 25, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
              Timer PWM Square Wave (Duty: {pwmDuty}%)
            </div>
            <svg viewBox="0 0 280 80" style={{ width: '100%', height: '80px', overflow: 'visible' }}>
              <line x1="0" y1="70" x2="280" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <line x1="0" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              {/* Draw 2 PWM square periods */}
              <path
                d={`M 10 70 L 10 20 L ${10 + (pwmDuty / 100) * 120} 20 L ${10 + (pwmDuty / 100) * 120} 70 L 130 70 L 130 20 L ${130 + (pwmDuty / 100) * 120} 20 L ${130 + (pwmDuty / 100) * 120} 70 L 260 70`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
              />
            </svg>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textAlign: 'center' }}>
              T_on = {pwmDuty}% of period &bull; V_effective = {((pwmDuty / 100) * 5).toFixed(2)}V
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="viz-controls-panel">
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 600, color: '#cbd5e1' }}>Bitwise Actions on PB5:</span>
          <button
            type="button"
            className="viz-btn viz-btn--secondary"
            onClick={() => setBit(5)}
          >
            PORTB |= (1 &lt;&lt; 5) [Set High]
          </button>
          <button
            type="button"
            className="viz-btn viz-btn--secondary"
            onClick={() => clearBit(5)}
          >
            PORTB &= ~(1 &lt;&lt; 5) [Clear Low]
          </button>
          <button
            type="button"
            className="viz-btn viz-btn--primary"
            onClick={() => toggleBit(5)}
          >
            PORTB ^= (1 &lt;&lt; 5) [Toggle]
          </button>
        </div>

        <SliderControl
          label="PWM Timer Duty Cycle"
          value={pwmDuty}
          min={0}
          max={100}
          step={5}
          unit="%"
          onChange={setPwmDuty}
        />
      </div>
    </div>
  );
}
