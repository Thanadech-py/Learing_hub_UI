import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function WorkEnergyViz() {
  const [mass, setMass] = useState(50); // kg
  const [releaseH, setReleaseH] = useState(20); // meters
  const [frictionCoeff, setFrictionCoeff] = useState(0.005);
  const [gravity, setGravity] = useState(9.8);

  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);
  const [cartU, setCartU] = useState(0); // 0 to 1 along track parameter
  const [speed, setSpeed] = useState(0);
  const [thermalLoss, setThermalLoss] = useState(0);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Track parametric curve: y(u) = 2 + (releaseH - 2) * cos(pi * u)^2 + 4 * sin(2*pi*u)^2 ...
  // u runs from 0 to 1
  const getTrackPoint = (u) => {
    const x = 80 + u * 640;
    // Track elevation profile in meters (0 to 25m)
    // Starts at releaseH, dips to ground (2m), rises to a secondary hill, then dips again
    const normalizedH =
      releaseH * Math.pow(Math.cos((Math.PI * u) / 2), 2) +
      (releaseH * 0.45) * Math.pow(Math.sin(Math.PI * u * 2), 2);
    const yMeters = Math.max(1, normalizedH);
    return { x, yMeters };
  };

  const currentPoint = getTrackPoint(cartU);
  const currentHeight = currentPoint.yMeters;

  // Energy calculations
  const totalInitialEnergy = mass * gravity * releaseH;
  const potentialEnergy = mass * gravity * currentHeight;
  const kineticEnergy = Math.max(0, totalInitialEnergy - potentialEnergy - thermalLoss);
  const currentVelocity = Math.sqrt((2 * kineticEnergy) / mass);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = ((timestamp - lastTimeRef.current) / 1000) * simSpeed;
        const v = Math.sqrt(Math.max(0, (2 * kineticEnergy) / mass));

        // Advance u along track
        setCartU((prevU) => {
          const trackPixelLen = 640;
          const du = (Math.max(1, v) * dt * 25) / trackPixelLen;
          const nextU = prevU + du;
          if (nextU >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return nextU;
        });

        // Dissipate thermal energy if friction > 0
        if (frictionCoeff > 0) {
          setThermalLoss((loss) => Math.min(totalInitialEnergy * 0.9, loss + mass * gravity * frictionCoeff * v * dt));
        }
      }
      lastTimeRef.current = timestamp;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, simSpeed, kineticEnergy, mass, gravity, frictionCoeff, totalInitialEnergy]);

  const handleReset = () => {
    setIsPlaying(false);
    setCartU(0);
    setSpeed(0);
    setThermalLoss(0);
  };

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const groundY = h - 50;
    const meterScale = (h - 100) / 25; // 25 meters max height

    // Draw Support Beams & Ground
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, groundY, w, 50);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(w, groundY);
    ctx.stroke();

    // Draw Track Scaffold Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let u = 0.1; u < 1; u += 0.1) {
      const pt = getTrackPoint(u);
      const py = groundY - pt.yMeters * meterScale;
      ctx.beginPath();
      ctx.moveTo(pt.x, py);
      ctx.lineTo(pt.x, groundY);
      ctx.stroke();
    }

    // Draw Roller Coaster Rail
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    const resolution = 150;
    for (let i = 0; i <= resolution; i++) {
      const u = i / resolution;
      const pt = getTrackPoint(u);
      const py = groundY - pt.yMeters * meterScale;
      if (i === 0) ctx.moveTo(pt.x, py);
      else ctx.lineTo(pt.x, py);
    }
    ctx.stroke();

    // Secondary lower rail for 3D track appearance
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i <= resolution; i++) {
      const u = i / resolution;
      const pt = getTrackPoint(u);
      const py = groundY - pt.yMeters * meterScale + 8;
      if (i === 0) ctx.moveTo(pt.x, py);
      else ctx.lineTo(pt.x, py);
    }
    ctx.stroke();

    // Draw Cart at current position
    const cartPt = getTrackPoint(cartU);
    const cartPixelX = cartPt.x;
    const cartPixelY = groundY - cartPt.yMeters * meterScale;

    // Estimate slope angle
    const nextPt = getTrackPoint(Math.min(1, cartU + 0.01));
    const nextY = groundY - nextPt.yMeters * meterScale;
    const slopeAngle = Math.atan2(nextY - cartPixelY, nextPt.x - cartPixelX);

    ctx.save();
    ctx.translate(cartPixelX, cartPixelY);
    ctx.rotate(slopeAngle);

    // Cart body
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.fillRect(-16, -14, 32, 14);
    ctx.shadowBlur = 0;

    // Cart wheels
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(-10, 0, 4, 0, Math.PI * 2);
    ctx.arc(10, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Draw Live Energy Histogram in top corner
    const barX = w - 160;
    const barY = 30;
    const barW = 120;
    const barH = 18;

    const kRatio = totalInitialEnergy > 0 ? kineticEnergy / totalInitialEnergy : 0;
    const uRatio = totalInitialEnergy > 0 ? potentialEnergy / totalInitialEnergy : 0;
    const thRatio = totalInitialEnergy > 0 ? thermalLoss / totalInitialEnergy : 0;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.strokeStyle = 'var(--border)';
    ctx.strokeRect(barX - 10, barY - 10, barW + 20, 100);
    ctx.fillRect(barX - 10, barY - 10, barW + 20, 100);

    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Energy Distribution', barX, barY + 5);

    // Kinetic Bar
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(barX, barY + 15, barW * kRatio, 12);
    ctx.fillText(`K: ${(kineticEnergy / 1000).toFixed(1)} kJ`, barX, barY + 38);

    // Potential Bar
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(barX, barY + 45, barW * uRatio, 12);
    ctx.fillText(`U: ${(potentialEnergy / 1000).toFixed(1)} kJ`, barX, barY + 68);

    // Thermal Bar
    if (thermalLoss > 0) {
      ctx.fillStyle = '#f87171';
      ctx.fillRect(barX, barY + 75, barW * thRatio, 8);
    }
  }, [cartU, releaseH, totalInitialEnergy, kineticEnergy, potentialEnergy, thermalLoss]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Roller Coaster Mechanical Energy Lab</h3>
          <span className="viz-header__tag">Conservation of Energy</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Elevation (h)" value={currentHeight.toFixed(1)} unit="m" />
        <MetricBadge label="Velocity (v)" value={currentVelocity.toFixed(1)} unit="m/s" highlight />
        <MetricBadge label="Kinetic (K)" value={(kineticEnergy / 1000).toFixed(2)} unit="kJ" />
        <MetricBadge label="Potential (U)" value={(potentialEnergy / 1000).toFixed(2)} unit="kJ" />
        <MetricBadge label="Total Mechanical" value={((kineticEnergy + potentialEnergy) / 1000).toFixed(2)} unit="kJ" />
      </div>

      <div className="viz-canvas-area" style={{ height: 360 }}>
        <canvas ref={canvasRef} width={800} height={360} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Release Height (h₀)"
            value={releaseH}
            min={8}
            max={25}
            step={1}
            unit="m"
            onChange={(h) => {
              setReleaseH(h);
              handleReset();
            }}
          />
          <SliderControl
            label="Cart Mass (m)"
            value={mass}
            min={10}
            max={100}
            step={5}
            unit="kg"
            onChange={setMass}
          />
          <SliderControl
            label="Friction Dissipation (μ)"
            value={frictionCoeff}
            min={0}
            max={0.02}
            step={0.002}
            onChange={setFrictionCoeff}
          />
        </div>

        <PlaybackBar
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onReset={handleReset}
          speed={simSpeed}
          onSpeedChange={setSimSpeed}
        />

        <div className="viz-hint">
          🎢 <strong>Energy Exchange:</strong> Set friction to 0 to observe pure conservative exchange. Notice that whenever the cart drops to a valley, its potential energy U drops to minimum while its kinetic energy K and speed reach absolute maximum—all while total energy K + U remains 100% constant!
        </div>
      </div>
    </div>
  );
}
