import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function KinematicsViz() {
  const [mode, setMode] = useState('1d'); // '1d' (default, learned first) | '2d'

  // 1D Linear Motion Parameters
  const [x0_1d, setX0_1d] = useState(0); // initial position m
  const [v0_1d, setV0_1d] = useState(5); // initial velocity m/s
  const [a_1d, setA_1d] = useState(2.0); // acceleration m/s^2
  const [time1d, setTime1d] = useState(0);
  const max1dTime = 8; // seconds

  // 2D Projectile Parameters
  const [v0_2d, setV0_2d] = useState(25);
  const [angleDeg, setAngleDeg] = useState(45);
  const [h0, setH0] = useState(0);
  const [gravity, setGravity] = useState(9.8);
  const [simTime, setSimTime] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimestampRef = useRef(null);

  // 1D Derived analytical values
  const currentPos1d = x0_1d + v0_1d * time1d + 0.5 * a_1d * time1d * time1d;
  const currentVel1d = v0_1d + a_1d * time1d;

  // 2D Analytical derived values
  const angleRad = (angleDeg * Math.PI) / 180;
  const vx0 = v0_2d * Math.cos(angleRad);
  const vy0 = v0_2d * Math.sin(angleRad);
  const totalFlightTime =
    (vy0 + Math.sqrt(vy0 * vy0 + 2 * gravity * h0)) / gravity;
  const maxRange = vx0 * totalFlightTime;
  const apexTime = vy0 / gravity;
  const maxHeight = h0 + (apexTime > 0 ? (vy0 * vy0) / (2 * gravity) : 0);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimestampRef.current != null) {
        const dt = ((timestamp - lastTimestampRef.current) / 1000) * simSpeed;

        if (mode === '1d') {
          setTime1d((prev) => {
            const next = prev + dt;
            if (next >= max1dTime) {
              setIsPlaying(false);
              return max1dTime;
            }
            return next;
          });
        } else {
          setSimTime((prev) => {
            const next = prev + dt;
            if (next >= totalFlightTime) {
              setIsPlaying(false);
              return totalFlightTime;
            }
            return next;
          });
        }
      }
      lastTimestampRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isPlaying, simSpeed, mode, totalFlightTime]);

  const handleReset = () => {
    setIsPlaying(false);
    if (mode === '1d') setTime1d(0);
    else setSimTime(0);
  };

  const handleStep = () => {
    if (mode === '1d') {
      setTime1d((prev) => Math.min(max1dTime, prev + 0.1));
    } else {
      setSimTime((prev) => Math.min(totalFlightTime, prev + 0.1));
    }
  };

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // ==========================================
    // 1D LINEAR MOTION & GRAPHS (PRIMARY MODE)
    // ==========================================
    if (mode === '1d') {
      // Upper Half: Track & Vehicle Simulation
      const trackY = 120;
      const originX = 70;
      const trackMaxMeters = 100;
      const scaleX = (width - 140) / trackMaxMeters;

      // Track Surface
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(originX - 20, trackY + 16, width - originX - 30, 14);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(originX - 20, trackY + 16);
      ctx.lineTo(width - 50, trackY + 16);
      ctx.stroke();

      // Distance Metric Ticks (0m, 10m, 20m ... 100m)
      for (let m = 0; m <= trackMaxMeters; m += 10) {
        const mx = originX + m * scaleX;
        ctx.strokeStyle = m % 20 === 0 ? '#cbd5e1' : '#64748b';
        ctx.lineWidth = m % 20 === 0 ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(mx, trackY + 12);
        ctx.lineTo(mx, trackY + 24);
        ctx.stroke();

        ctx.fillStyle = m % 20 === 0 ? '#cbd5e1' : '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${m}m`, mx, trackY + 38);
      }

      // Initial Position Marker (x0)
      const x0Pixel = originX + Math.max(0, Math.min(trackMaxMeters, x0_1d)) * scaleX;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(x0Pixel, trackY - 35);
      ctx.lineTo(x0Pixel, trackY + 16);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '10px sans-serif';
      ctx.fillText(`x₀=${x0_1d}m`, x0Pixel, trackY - 40);

      // Current Vehicle Position
      const boundedMeters = Math.max(-5, Math.min(trackMaxMeters + 5, currentPos1d));
      const cartX = originX + boundedMeters * scaleX;

      // Displacement Trail (Distance traveled so far)
      if (Math.abs(currentPos1d - x0_1d) > 0.5) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        const startTrailX = Math.min(x0Pixel, cartX);
        const trailWidth = Math.abs(cartX - x0Pixel);
        ctx.fillRect(startTrailX, trackY + 4, trailWidth, 12);
      }

      // Vehicle Body (Sporty electric cart)
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(cartX - 22, trackY - 14, 44, 22, [6, 10, 2, 2]);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Windshield & Roof
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(cartX - 8, trackY - 26, 24, 13, [4, 6, 0, 0]);
      ctx.fill();

      // Wheels
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(cartX - 12, trackY + 12, 5.5, 0, Math.PI * 2);
      ctx.arc(cartX + 12, trackY + 12, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cartX - 12, trackY + 12, 2.5, 0, Math.PI * 2);
      ctx.arc(cartX + 12, trackY + 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Velocity Vector Arrow (Green, points in direction of v)
      if (Math.abs(currentVel1d) > 0.2) {
        const vLen = currentVel1d * 3.5;
        ctx.strokeStyle = '#4ade80';
        ctx.fillStyle = '#4ade80';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cartX, trackY - 36);
        ctx.lineTo(cartX + vLen, trackY - 36);
        ctx.stroke();

        const headDir = currentVel1d > 0 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(cartX + vLen, trackY - 36);
        ctx.lineTo(cartX + vLen - headDir * 6, trackY - 40);
        ctx.lineTo(cartX + vLen - headDir * 6, trackY - 32);
        ctx.closePath();
        ctx.fill();

        ctx.font = '10px sans-serif';
        ctx.fillText(`v = ${currentVel1d.toFixed(1)} m/s`, cartX + vLen / 2, trackY - 44);
      }

      // Acceleration Vector Arrow (Amber)
      if (Math.abs(a_1d) > 0.1) {
        const aLen = a_1d * 8;
        ctx.strokeStyle = '#f59e0b';
        ctx.fillStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cartX, trackY + 28);
        ctx.lineTo(cartX + aLen, trackY + 28);
        ctx.stroke();

        const aHeadDir = a_1d > 0 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(cartX + aLen, trackY + 28);
        ctx.lineTo(cartX + aLen - aHeadDir * 5, trackY + 25);
        ctx.lineTo(cartX + aLen - aHeadDir * 5, trackY + 31);
        ctx.closePath();
        ctx.fill();

        ctx.font = '10px sans-serif';
        ctx.fillText(`a = ${a_1d.toFixed(1)} m/s²`, cartX + aLen / 2, trackY + 44);
      }

      // --- Lower Half: Synchronized Dual Live Kinematic Graphs ---
      const graphY = 220;
      const graphH = 120;
      const graph1X = 70;
      const graph1W = (width - 180) / 2;
      const graph2X = graph1X + graph1W + 40;
      const graph2W = graph1W;

      // Graph 1: Position-Time x(t)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(graph1X, graphY, graph1W, graphH);
      ctx.strokeStyle = 'var(--border)';
      ctx.strokeRect(graph1X, graphY, graph1W, graphH);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Position vs. Time: x(t) = x₀ + v₀t + ½at²', graph1X + 8, graphY + 16);

      // Plot curve up to max1dTime
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let px = 0; px <= graph1W; px += 2) {
        const t = (px / graph1W) * max1dTime;
        const xVal = x0_1d + v0_1d * t + 0.5 * a_1d * t * t;
        const clampedY = graphY + graphH - 15 - (Math.min(100, Math.max(0, xVal)) / 100) * (graphH - 35);
        if (px === 0) ctx.moveTo(graph1X + px, clampedY);
        else ctx.lineTo(graph1X + px, clampedY);
      }
      ctx.stroke();

      // Current time marker on Graph 1
      const curGraph1X = graph1X + (time1d / max1dTime) * graph1W;
      const curGraph1Y = graphY + graphH - 15 - (Math.min(100, Math.max(0, currentPos1d)) / 100) * (graphH - 35);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(curGraph1X, curGraph1Y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Graph 2: Velocity-Time v(t)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(graph2X, graphY, graph2W, graphH);
      ctx.strokeStyle = 'var(--border)';
      ctx.strokeRect(graph2X, graphY, graph2W, graphH);

      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Velocity vs. Time: v(t) = v₀ + at (Slope = a)', graph2X + 8, graphY + 16);

      // Zero-velocity line on Graph 2
      const zeroVLineY = graphY + graphH / 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(graph2X, zeroVLineY);
      ctx.lineTo(graph2X + graph2W, zeroVLineY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Plot velocity line
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let px = 0; px <= graph2W; px += 2) {
        const t = (px / graph2W) * max1dTime;
        const vVal = v0_1d + a_1d * t;
        const clampedY = zeroVLineY - (vVal / 30) * (graphH / 2 - 20);
        if (px === 0) ctx.moveTo(graph2X + px, clampedY);
        else ctx.lineTo(graph2X + px, clampedY);
      }
      ctx.stroke();

      // Current marker on Graph 2
      const curGraph2X = graph2X + (time1d / max1dTime) * graph2W;
      const curGraph2Y = zeroVLineY - (currentVel1d / 30) * (graphH / 2 - 20);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(curGraph2X, curGraph2Y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // ==========================================
    // 2D PROJECTILE CANNON (SECONDARY MODE)
    // ==========================================
    else {
      const groundY = height - 40;
      const originX = 60;
      const scaleX = (width - 120) / Math.max(80, maxRange * 1.15);
      const scaleY = (height - 100) / Math.max(30, maxHeight * 1.25);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Ground
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, groundY, width, 40);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(width, groundY);
      ctx.stroke();

      // Platform Elevation
      const cliffPixelH = h0 * scaleY;
      if (h0 > 0) {
        ctx.fillStyle = '#334155';
        ctx.fillRect(originX - 30, groundY - cliffPixelH, 30, cliffPixelH);
        ctx.strokeStyle = '#64748b';
        ctx.strokeRect(originX - 30, groundY - cliffPixelH, 30, cliffPixelH);
      }

      // Parabolic Trajectory
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      const steps = 120;
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * totalFlightTime;
        const px = originX + vx0 * t * scaleX;
        const py = groundY - (h0 + vy0 * t - 0.5 * gravity * t * t) * scaleY;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Current Projectile Position
      const curX = vx0 * simTime;
      const curY = Math.max(0, h0 + vy0 * simTime - 0.5 * gravity * simTime * simTime);
      const curPx = originX + curX * scaleX;
      const curPy = groundY - curY * scaleY;

      // Trajectory Trail
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const trailSteps = 60;
      for (let i = 0; i <= trailSteps; i++) {
        const t = (i / trailSteps) * simTime;
        const px = originX + vx0 * t * scaleX;
        const py = groundY - (h0 + vy0 * t - 0.5 * gravity * t * t) * scaleY;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Velocity Vectors
      const curVy = vy0 - gravity * simTime;
      const vecScale = 1.8;

      // Horizontal vx (cyan)
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(curPx, curPy);
      ctx.lineTo(curPx + vx0 * vecScale, curPy);
      ctx.stroke();

      // Vertical vy (amber)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(curPx, curPy);
      ctx.lineTo(curPx, curPy - curVy * vecScale);
      ctx.stroke();

      // Net velocity vector (white)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(curPx, curPy);
      ctx.lineTo(curPx + vx0 * vecScale, curPy - curVy * vecScale);
      ctx.stroke();

      // Projectile Ball
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(curPx, curPy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cannon Barrel
      const cannonX = originX;
      const cannonY = groundY - cliffPixelH;
      ctx.save();
      ctx.translate(cannonX, cannonY);
      ctx.rotate(-angleRad);
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, -6, 26, 12);
      ctx.restore();
    }
  }, [
    mode,
    x0_1d,
    v0_1d,
    a_1d,
    time1d,
    currentPos1d,
    currentVel1d,
    simTime,
    v0_2d,
    angleDeg,
    h0,
    gravity,
    totalFlightTime,
    maxHeight,
    maxRange,
    vx0,
    vy0,
    angleRad,
  ]);

  // Derived 2D metrics for readouts
  const current2dX = vx0 * simTime;
  const current2dY = Math.max(0, h0 + vy0 * simTime - 0.5 * gravity * simTime * simTime);
  const current2dVy = vy0 - gravity * simTime;
  const current2dSpeed = Math.sqrt(vx0 * vx0 + current2dVy * current2dVy);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Kinematics Motion Laboratory</h3>
          <span className="viz-header__tag">
            {mode === '1d' ? '1D Motion (Foundations)' : '2D Projectile Motion'}
          </span>
        </div>
        <div className="viz-mode-tabs">
          {/* 1D is placed FIRST */}
          <button
            type="button"
            className={`viz-mode-btn ${mode === '1d' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setMode('1d');
              handleReset();
            }}
          >
            1D Linear Motion & Graphs
          </button>
          {/* 2D is placed SECOND */}
          <button
            type="button"
            className={`viz-mode-btn ${mode === '2d' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setMode('2d');
              handleReset();
            }}
          >
            2D Projectile Cannon
          </button>
        </div>
      </header>

      {/* ==========================================
          1D LINEAR MOTION METRICS & CONTROLS (FIRST)
          ========================================== */}
      {mode === '1d' ? (
        <>
          <div className="viz-metrics-bar">
            <MetricBadge label="Time Elapsed (t)" value={time1d.toFixed(2)} unit={`/ ${max1dTime} s`} />
            <MetricBadge label="Position (x)" value={currentPos1d.toFixed(1)} unit="m" highlight />
            <MetricBadge label="Velocity (v)" value={currentVel1d.toFixed(1)} unit="m/s" />
            <MetricBadge label="Acceleration (a)" value={a_1d.toFixed(1)} unit="m/s²" />
            <MetricBadge label="Displacement (Δx)" value={(currentPos1d - x0_1d).toFixed(1)} unit="m" />
          </div>

          <div className="viz-canvas-area" style={{ height: 380 }}>
            <canvas ref={canvasRef} width={800} height={380} />
          </div>

          <div className="viz-controls-panel">
            {/* Quick 1D Motion Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                1D Presets:
              </span>
              <button
                type="button"
                className="viz-speed-btn"
                onClick={() => {
                  setX0_1d(0);
                  setV0_1d(10);
                  setA_1d(0);
                  handleReset();
                }}
              >
                Constant Velocity (a = 0)
              </button>
              <button
                type="button"
                className="viz-speed-btn"
                onClick={() => {
                  setX0_1d(0);
                  setV0_1d(0);
                  setA_1d(2.5);
                  handleReset();
                }}
              >
                Start from Rest (v₀=0, a&gt;0)
              </button>
              <button
                type="button"
                className="viz-speed-btn"
                onClick={() => {
                  setX0_1d(0);
                  setV0_1d(18);
                  setA_1d(-3.0);
                  handleReset();
                }}
              >
                Braking Deceleration (v₀&gt;0, a&lt;0)
              </button>
            </div>

            <div className="viz-sliders-grid">
              <SliderControl
                label="Scrub Elapsed Time (t)"
                value={time1d}
                min={0}
                max={max1dTime}
                step={0.1}
                unit="s"
                onChange={(t) => {
                  setTime1d(t);
                  setIsPlaying(false);
                }}
              />
              <SliderControl
                label="Initial Position (x₀)"
                value={x0_1d}
                min={0}
                max={30}
                step={1}
                unit="m"
                onChange={setX0_1d}
              />
              <SliderControl
                label="Initial Velocity (v₀)"
                value={v0_1d}
                min={-10}
                max={25}
                step={1}
                unit="m/s"
                onChange={setV0_1d}
              />
              <SliderControl
                label="Acceleration (a)"
                value={a_1d}
                min={-6}
                max={8}
                step={0.5}
                unit="m/s²"
                onChange={setA_1d}
              />
            </div>

            <PlaybackBar
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((p) => !p)}
              onReset={handleReset}
              onStep={handleStep}
              speed={simSpeed}
              onSpeedChange={setSimSpeed}
            />

            <div className="viz-hint">
              🚗 <strong>1D Kinematics Insight:</strong> Notice the two synchronized graphs beneath the vehicle:
              <ul style={{ margin: '0.4rem 0 0.2rem', paddingLeft: '1.25rem' }}>
                <li><strong>Position-Time x(t)</strong> forms a curving parabola when acceleration a ≠ 0, but a straight diagonal line when a = 0!</li>
                <li><strong>Velocity-Time v(t)</strong> is always a straight line whose slope is exactly equal to acceleration a.</li>
                <li>When braking (a &lt; 0), the vehicle halts at the moment v(t) crosses zero.</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        /* ==========================================
           2D PROJECTILE CANNON (LEARNED SECOND)
           ========================================== */
        <>
          <div className="viz-metrics-bar">
            <MetricBadge label="Flight Time (t)" value={simTime.toFixed(2)} unit={`/ ${totalFlightTime.toFixed(2)} s`} />
            <MetricBadge label="Position (x, y)" value={`${current2dX.toFixed(1)}, ${current2dY.toFixed(1)}`} unit="m" />
            <MetricBadge label="Instant Speed (v)" value={current2dSpeed.toFixed(1)} unit="m/s" />
            <MetricBadge label="Max Height (H)" value={maxHeight.toFixed(1)} unit="m" />
            <MetricBadge label="Total Range (R)" value={maxRange.toFixed(1)} unit="m" highlight />
          </div>

          <div className="viz-canvas-area" style={{ height: 380 }}>
            <canvas ref={canvasRef} width={800} height={380} />
          </div>

          <div className="viz-controls-panel">
            <div className="viz-sliders-grid">
              <SliderControl
                label="Launch Velocity (v₀)"
                value={v0_2d}
                min={5}
                max={40}
                step={1}
                unit="m/s"
                onChange={setV0_2d}
              />
              <SliderControl
                label="Launch Angle (θ)"
                value={angleDeg}
                min={5}
                max={85}
                step={1}
                unit="°"
                onChange={setAngleDeg}
              />
              <SliderControl
                label="Platform Elevation (h₀)"
                value={h0}
                min={0}
                max={30}
                step={1}
                unit="m"
                onChange={setH0}
              />
              <SliderControl
                label="Gravity (g)"
                value={gravity}
                min={1.6}
                max={24.8}
                step={0.1}
                unit="m/s²"
                onChange={setGravity}
              />
            </div>

            <PlaybackBar
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying((p) => !p)}
              onReset={handleReset}
              onStep={handleStep}
              speed={simSpeed}
              onSpeedChange={setSimSpeed}
            />

            <div className="viz-hint">
              🎯 <strong>2D Extension:</strong> In 2D projectile motion, horizontal motion and vertical motion operate as two independent 1D problems occurring simultaneously! The horizontal velocity vx stays constant (zero acceleration), while vertical velocity vy changes under constant gravitational acceleration g.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
