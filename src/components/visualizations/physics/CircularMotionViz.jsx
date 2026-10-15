import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function CircularMotionViz() {
  const [mode, setMode] = useState('tether'); // 'tether' | 'orbit'

  // Tether parameters
  const [radius, setRadius] = useState(1.5); // meters
  const [mass, setMass] = useState(2); // kg
  const [angularSpeed, setAngularSpeed] = useState(4); // rad/s
  const [maxTension, setMaxTension] = useState(120); // N threshold

  // Orbit parameters
  const [centralMass, setCentralMass] = useState(2); // solar units
  const [orbitRadius, setOrbitRadius] = useState(2); // AU-like units

  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [angle, setAngle] = useState(0);
  const [isBroken, setIsBroken] = useState(false);
  const [flyoffPos, setFlyoffPos] = useState(null);
  const [flyoffVel, setFlyoffVel] = useState(null);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Derived Tether Metrics
  const tangentialSpeed = angularSpeed * radius;
  const centripetalAcc = (tangentialSpeed * tangentialSpeed) / radius;
  const tensionForce = mass * centripetalAcc;
  const period = (2 * Math.PI) / angularSpeed;

  // Orbit derived
  const orbitalSpeed = Math.sqrt((100 * centralMass) / orbitRadius);
  const orbitPeriod = (2 * Math.PI * orbitRadius) / orbitalSpeed;

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = ((timestamp - lastTimeRef.current) / 1000) * simSpeed;

        if (mode === 'tether') {
          if (!isBroken) {
            // Check snap condition
            if (tensionForce > maxTension) {
              setIsBroken(true);
              const px = 400 + radius * 80 * Math.cos(angle);
              const py = 200 + radius * 80 * Math.sin(angle);
              const vx = -tangentialSpeed * 80 * Math.sin(angle);
              const vy = tangentialSpeed * 80 * Math.cos(angle);
              setFlyoffPos({ x: px, y: py });
              setFlyoffVel({ vx, vy });
            } else {
              setAngle((a) => (a + angularSpeed * dt) % (2 * Math.PI));
            }
          } else if (flyoffPos && flyoffVel) {
            setFlyoffPos((pos) => ({
              x: pos.x + flyoffVel.vx * dt,
              y: pos.y + flyoffVel.vy * dt,
            }));
          }
        } else {
          // Orbit mode
          const omegaOrb = orbitalSpeed / (orbitRadius * 60);
          setAngle((a) => (a + omegaOrb * dt) % (2 * Math.PI));
        }
      }
      lastTimeRef.current = timestamp;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, simSpeed, mode, isBroken, tensionForce, maxTension, angularSpeed, radius, tangentialSpeed, angle, flyoffPos, flyoffVel, orbitalSpeed, orbitRadius]);

  const handleReset = () => {
    setIsBroken(false);
    setFlyoffPos(null);
    setFlyoffVel(null);
    setAngle(0);
  };

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const centerX = w / 2;
    const centerY = h / 2;

    if (mode === 'tether') {
      const pxScale = 80; // 1m = 80px
      const curRadiusPx = radius * pxScale;

      // Draw Orbit Trail / Perimeter
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, curRadiusPx, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Center Pivot
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 7, 0, Math.PI * 2);
      ctx.fill();

      let bx, by;
      if (!isBroken) {
        bx = centerX + curRadiusPx * Math.cos(angle);
        by = centerY + curRadiusPx * Math.sin(angle);

        // String Tether
        ctx.strokeStyle = tensionForce > maxTension * 0.85 ? '#ef4444' : '#cbd5e1';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(bx, by);
        ctx.stroke();
      } else if (flyoffPos) {
        bx = flyoffPos.x;
        by = flyoffPos.y;

        // Snapped string remnant
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + 25 * Math.cos(angle), centerY + 25 * Math.sin(angle));
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (bx != null && by != null) {
        // Rotating Mass Ball
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(bx, by, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Vector Arrows (if not snapped)
        if (!isBroken) {
          // Tangential Velocity Vector (Green)
          const vScale = 6;
          const vx = -Math.sin(angle) * tangentialSpeed * vScale;
          const vy = Math.cos(angle) * tangentialSpeed * vScale;

          ctx.strokeStyle = '#4ade80';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + vx, by + vy);
          ctx.stroke();
          ctx.fillStyle = '#4ade80';
          ctx.font = '10px sans-serif';
          ctx.fillText(`v = ${tangentialSpeed.toFixed(1)} m/s`, bx + vx * 1.1, by + vy * 1.1);

          // Centripetal Acceleration / Tension (Cyan, inward)
          const aScale = 0.8;
          const ax = -Math.cos(angle) * centripetalAcc * aScale;
          const ay = -Math.sin(angle) * centripetalAcc * aScale;

          ctx.strokeStyle = '#06b6d4';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + ax, by + ay);
          ctx.stroke();
          ctx.fillStyle = '#06b6d4';
          ctx.fillText(`Fc = ${tensionForce.toFixed(0)} N`, bx + ax * 1.15, by + ay * 1.15);
        }
      }
    } else {
      // Planetary Orbit Mode
      const orbitPx = orbitRadius * 65;

      // Orbit circle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbitPx, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Central Star
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18 + centralMass * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Orbiting Planet
      const px = centerX + orbitPx * Math.cos(angle);
      const py = centerY + orbitPx * Math.sin(angle);

      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(px, py, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Gravitational force vector towards star
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px - 35 * Math.cos(angle), py - 35 * Math.sin(angle));
      ctx.stroke();
      ctx.fillStyle = '#ec4899';
      ctx.font = '10px sans-serif';
      ctx.fillText('Fg (Gravity)', px - 40 * Math.cos(angle), py - 40 * Math.sin(angle));
    }
  }, [mode, radius, mass, angularSpeed, tangentialSpeed, centripetalAcc, tensionForce, maxTension, angle, isBroken, flyoffPos, flyoffVel, centralMass, orbitRadius]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Centripetal Motion & Orbital Mechanics</h3>
          <span className="viz-header__tag">
            {isBroken ? '⚠️ String Snapped! Tangential Fly-Off' : mode === 'tether' ? 'Whirling Tether' : 'Kepler Orbit'}
          </span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'tether' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setMode('tether');
              handleReset();
            }}
          >
            Whirling String
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${mode === 'orbit' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setMode('orbit');
              handleReset();
            }}
          >
            Gravitational Orbit
          </button>
        </div>
      </header>

      {mode === 'tether' ? (
        <>
          <div className="viz-metrics-bar">
            <MetricBadge label="Linear Speed (v)" value={tangentialSpeed.toFixed(2)} unit="m/s" />
            <MetricBadge label="Period (T)" value={period.toFixed(2)} unit="s" />
            <MetricBadge label="Centripetal Acc (ac)" value={centripetalAcc.toFixed(1)} unit="m/s²" />
            <MetricBadge
              label="String Tension (Fc)"
              value={tensionForce.toFixed(1)}
              unit={`/ ${maxTension} N`}
              highlight={tensionForce > maxTension * 0.8}
            />
          </div>

          <div className="viz-canvas-area" style={{ height: 380 }}>
            <canvas ref={canvasRef} width={800} height={380} />
          </div>

          <div className="viz-controls-panel">
            <div className="viz-sliders-grid">
              <SliderControl
                label="Radius (r)"
                value={radius}
                min={0.5}
                max={2.5}
                step={0.1}
                unit="m"
                disabled={isBroken}
                onChange={setRadius}
              />
              <SliderControl
                label="Revolving Mass (m)"
                value={mass}
                min={0.5}
                max={5}
                step={0.5}
                unit="kg"
                disabled={isBroken}
                onChange={setMass}
              />
              <SliderControl
                label="Angular Velocity (ω)"
                value={angularSpeed}
                min={1}
                max={12}
                step={0.5}
                unit="rad/s"
                disabled={isBroken}
                onChange={setAngularSpeed}
              />
              <SliderControl
                label="String Breaking Limit"
                value={maxTension}
                min={50}
                max={200}
                step={10}
                unit="N"
                onChange={setMaxTension}
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
              🔄 <strong>Newton's First Law in Action:</strong> Increase angular speed ω until tension exceeds the string breaking limit ({maxTension} N). Notice that the mass does NOT fly outward radially ("centrifugal")! Instead, it flies along a straight tangent line at velocity v, adhering faithfully to the law of inertia!
            </div>
          </div>
        </>
      ) : (
        /* Orbit Mode */
        <>
          <div className="viz-metrics-bar">
            <MetricBadge label="Orbital Velocity" value={orbitalSpeed.toFixed(1)} unit="km/s" highlight />
            <MetricBadge label="Orbital Period (T)" value={orbitPeriod.toFixed(1)} unit="years" />
            <MetricBadge label="Orbital Radius (r)" value={orbitRadius.toFixed(1)} unit="AU" />
            <MetricBadge label="Central Star Mass" value={centralMass.toFixed(1)} unit="M☉" />
          </div>

          <div className="viz-canvas-area" style={{ height: 380 }}>
            <canvas ref={canvasRef} width={800} height={380} />
          </div>

          <div className="viz-controls-panel">
            <div className="viz-sliders-grid">
              <SliderControl
                label="Central Star Mass (M)"
                value={centralMass}
                min={0.5}
                max={5}
                step={0.5}
                unit="M☉"
                onChange={setCentralMass}
              />
              <SliderControl
                label="Orbital Distance (r)"
                value={orbitRadius}
                min={0.8}
                max={3.5}
                step={0.1}
                unit="AU"
                onChange={setOrbitRadius}
              />
            </div>

            <PlaybackBar
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((p) => !p)}
              onReset={handleReset}
              speed={simSpeed}
              onSpeedChange={setSimSpeed}
            />
          </div>
        </>
      )}
    </div>
  );
}
