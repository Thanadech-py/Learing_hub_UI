import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function OscillationsViz() {
  const [systemType, setSystemType] = useState('spring'); // 'spring' | 'pendulum'

  // Spring parameters
  const [springMass, setSpringMass] = useState(2); // kg
  const [springK, setSpringK] = useState(40); // N/m
  const [amplitude, setAmplitude] = useState(1.5); // m
  const [damping, setDamping] = useState(0.02);

  // Pendulum parameters
  const [length, setLength] = useState(1.5); // m
  const [pendulumAngleInit, setPendulumAngleInit] = useState(25); // deg

  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [simTime, setSimTime] = useState(0);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // History buffer for oscilloscope wave trace
  const historyRef = useRef([]);

  // Analytical physics
  const g = 9.8;
  const omegaSpring = Math.sqrt(springK / springMass);
  const periodSpring = (2 * Math.PI) / omegaSpring;
  const energySpring = 0.5 * springK * amplitude * amplitude;

  const omegaPendulum = Math.sqrt(g / length);
  const periodPendulum = (2 * Math.PI) / omegaPendulum;

  const currentOmega = systemType === 'spring' ? omegaSpring : omegaPendulum;
  const currentPeriod = systemType === 'spring' ? periodSpring : periodPendulum;

  // Instantaneous state with damping factor exp(-gamma * t)
  const gamma = damping * 0.5;
  const decay = Math.exp(-gamma * simTime);

  const currentX =
    systemType === 'spring'
      ? amplitude * decay * Math.cos(omegaSpring * simTime)
      : ((pendulumAngleInit * Math.PI) / 180) * decay * Math.cos(omegaPendulum * simTime);

  const currentV =
    systemType === 'spring'
      ? -amplitude * decay * omegaSpring * Math.sin(omegaSpring * simTime)
      : -((pendulumAngleInit * Math.PI) / 180) * decay * omegaPendulum * Math.sin(omegaPendulum * simTime);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = ((timestamp - lastTimeRef.current) / 1000) * simSpeed;
        setSimTime((t) => {
          const nextT = t + dt;
          // Store history for strip chart
          historyRef.current.push({
            t: nextT,
            x: currentX,
            v: currentV,
          });
          if (historyRef.current.length > 200) {
            historyRef.current.shift();
          }
          return nextT;
        });
      }
      lastTimeRef.current = timestamp;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, simSpeed, currentX, currentV]);

  const handleReset = () => {
    setSimTime(0);
    historyRef.current = [];
  };

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Left half: Physical Simulation (0 to 420 px)
    // Right half: Live Oscilloscope Wave Trace (440 to w px)

    // Divider
    ctx.strokeStyle = 'var(--border)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(430, 0);
    ctx.lineTo(430, h);
    ctx.stroke();

    // --- Physical Simulation ---
    if (systemType === 'spring') {
      const wallX = 60;
      const centerY = h / 2 - 20;
      const equilibriumX = 240;
      const massPx = equilibriumX + currentX * 55;

      // Draw Wall
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(wallX - 20, centerY - 60, 20, 120);
      ctx.strokeStyle = '#64748b';
      ctx.strokeRect(wallX - 20, centerY - 60, 20, 120);

      // Equilibrium marker line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(equilibriumX, centerY - 50);
      ctx.lineTo(equilibriumX, centerY + 50);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText('x = 0', equilibriumX - 10, centerY + 65);

      // Draw Spring Coils (Zig-zag)
      const springStart = wallX;
      const springEnd = massPx - 25;
      const coils = 16;
      const coilStep = (springEnd - springStart) / coils;
      const coilH = 18;

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(springStart, centerY);
      for (let i = 1; i < coils; i++) {
        const x = springStart + i * coilStep;
        const y = centerY + (i % 2 === 1 ? -coilH : coilH);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(springEnd, centerY);
      ctx.stroke();

      // Oscillating Mass block
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.fillRect(massPx - 25, centerY - 25, 50, 50);
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.strokeRect(massPx - 25, centerY - 25, 50, 50);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${springMass} kg`, massPx, centerY + 4);
    } else {
      // Pendulum Simulation
      const pivotX = 230;
      const pivotY = 50;
      const rodLenPx = length * 80;
      const bobX = pivotX + rodLenPx * Math.sin(currentX);
      const bobY = pivotY + rodLenPx * Math.cos(currentX);

      // Pivot
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
      ctx.fill();

      // Rod
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Bob
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // --- Right Half: Live Oscilloscope ---
    const scopeX = 450;
    const scopeW = w - scopeX - 30;
    const scopeMidY = h / 2;

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(scopeX, 30, scopeW, h - 60);

    // Center Baseline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(scopeX, scopeMidY);
    ctx.lineTo(scopeX + scopeW, scopeMidY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Legend
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('— Position x(t)', scopeX + 10, 48);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('— Velocity v(t)', scopeX + 110, 48);

    // Plot traces from history
    const hist = historyRef.current;
    if (hist.length > 2) {
      // Plot Position x(t)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < hist.length; i++) {
        const px = scopeX + (i / 200) * scopeW;
        const py = scopeMidY - hist[i].x * 35;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Plot Velocity v(t)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < hist.length; i++) {
        const px = scopeX + (i / 200) * scopeW;
        const py = scopeMidY - hist[i].v * 12;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  }, [systemType, currentX, currentV, springMass, length, amplitude]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Harmonic Oscillator & Oscilloscope</h3>
          <span className="viz-header__tag">Simple Harmonic Motion</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${systemType === 'spring' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSystemType('spring');
              handleReset();
            }}
          >
            Spring-Mass
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${systemType === 'pendulum' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSystemType('pendulum');
              handleReset();
            }}
          >
            Simple Pendulum
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Period (T)" value={currentPeriod.toFixed(2)} unit="s" highlight />
        <MetricBadge label="Frequency (f)" value={(1 / currentPeriod).toFixed(2)} unit="Hz" />
        <MetricBadge label="Angular Freq (ω)" value={currentOmega.toFixed(2)} unit="rad/s" />
        <MetricBadge
          label="Displacement (x)"
          value={systemType === 'spring' ? currentX.toFixed(2) : ((currentX * 180) / Math.PI).toFixed(1)}
          unit={systemType === 'spring' ? 'm' : '°'}
        />
        {systemType === 'spring' && (
          <MetricBadge label="Oscillator Energy" value={energySpring.toFixed(1)} unit="J" />
        )}
      </div>

      <div className="viz-canvas-area" style={{ height: 350 }}>
        <canvas ref={canvasRef} width={800} height={350} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          {systemType === 'spring' ? (
            <>
              <SliderControl
                label="Oscillating Mass (m)"
                value={springMass}
                min={0.5}
                max={6}
                step={0.5}
                unit="kg"
                onChange={setSpringMass}
              />
              <SliderControl
                label="Spring Stiffness (k)"
                value={springK}
                min={10}
                max={100}
                step={5}
                unit="N/m"
                onChange={setSpringK}
              />
              <SliderControl
                label="Amplitude (A)"
                value={amplitude}
                min={0.5}
                max={2.5}
                step={0.1}
                unit="m"
                onChange={setAmplitude}
              />
              <SliderControl
                label="Damping Coefficient (b)"
                value={damping}
                min={0}
                max={0.08}
                step={0.005}
                onChange={setDamping}
              />
            </>
          ) : (
            <>
              <SliderControl
                label="Pendulum Length (L)"
                value={length}
                min={0.5}
                max={2.5}
                step={0.1}
                unit="m"
                onChange={setLength}
              />
              <SliderControl
                label="Initial Release Angle (θ₀)"
                value={pendulumAngleInit}
                min={5}
                max={40}
                step={1}
                unit="°"
                onChange={setPendulumAngleInit}
              />
              <SliderControl
                label="Damping"
                value={damping}
                min={0}
                max={0.08}
                step={0.005}
                onChange={setDamping}
              />
            </>
          )}
        </div>

        <PlaybackBar
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onReset={handleReset}
          speed={simSpeed}
          onSpeedChange={setSimSpeed}
        />

        <div className="viz-hint">
          📊 <strong>Phase Relationship:</strong> Look closely at the dual-trace oscilloscope on the right. Notice that velocity v(t) (orange) crosses zero at the exact peaks of displacement x(t) (blue), and reaches its maximum speed precisely when the mass passes through equilibrium (x = 0). This is the hallmark 90° (π/2) phase shift of SHM!
        </div>
      </div>
    </div>
  );
}
