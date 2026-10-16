import { useState, useEffect, useRef, useCallback } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function WorkEnergyViz() {
  const [sceneMode, setSceneMode] = useState('coaster'); // 'coaster' | 'halfpipe' | 'launcher'
  const [mass, setMass] = useState(50); // kg
  const [releaseH, setReleaseH] = useState(21); // meters
  const [frictionCoeff, setFrictionCoeff] = useState(0.0);
  const [springK, setSpringK] = useState(1800); // N/m for bumper / launcher
  const [showVectors, setShowVectors] = useState(true);
  const [showEnergyGraph, setShowEnergyGraph] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);

  // State of cart along track: u in [0.02, 0.96], dir in {-1, +1}
  const [cartU, setCartU] = useState(0.04);
  const [cartDir, setCartDir] = useState(1);
  const [thermalLoss, setThermalLoss] = useState(0);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);
  const isDraggingCartRef = useRef(false);
  const gravity = 9.81;

  // Parametric elevation profile y(u) in meters (max 25m) for each scene mode
  const getTrackElevation = useCallback(
    (u) => {
      const clampedU = Math.max(0, Math.min(1, u));
      if (sceneMode === 'coaster') {
        // Starts at releaseH, drops into deep valley at u=0.33, rises to middle hill (13.5m) at u=0.62, second valley at u=0.84, flat bumper zone
        const startDrop = releaseH * Math.pow(Math.cos(Math.min(1, clampedU / 0.36) * (Math.PI / 2)), 2);
        const midHill =
          clampedU > 0.25 && clampedU < 0.88
            ? 13.5 * Math.pow(Math.sin(((clampedU - 0.25) / 0.63) * Math.PI), 2)
            : 0;
        const endRise = clampedU > 0.84 ? 3.5 * Math.pow((clampedU - 0.84) / 0.16, 2) : 0;
        return Math.max(1.2, 1.2 + startDrop + midHill + endRise);
      }
      if (sceneMode === 'halfpipe') {
        // Symmetric parabolic U-ramp centered at u = 0.5
        const d = (clampedU - 0.5) * 2; // -1 to +1
        return 1.5 + (releaseH - 1.5) * Math.pow(d, 2);
      }
      // 'launcher': Spring compressed on left flat (u < 0.22), then smooth incline ramp up to 22m
      if (clampedU <= 0.22) return 2.0;
      const rampU = (clampedU - 0.22) / 0.78;
      return 2.0 + 21.0 * Math.pow(rampU, 1.35);
    },
    [sceneMode, releaseH]
  );

  // Spring compression distance (meters) at position u
  const getSpringCompression = useCallback(
    (u) => {
      if (sceneMode === 'coaster' && u > 0.86) {
        return ((u - 0.86) / 0.12) * 4.5; // up to 4.5m bumper compression
      }
      if (sceneMode === 'launcher' && u < 0.22) {
        return ((0.22 - u) / 0.18) * 5.0; // up to 5.0m launcher compression
      }
      return 0;
    },
    [sceneMode]
  );

  // Total initial mechanical energy at release configuration
  const initialU = 0.04;
  const initHeight = getTrackElevation(initialU);
  const initSpringX = getSpringCompression(initialU);
  const totalInitialEnergy =
    mass * gravity * initHeight + 0.5 * springK * initSpringX * initSpringX;

  // Current energies at cartU
  const currentHeight = getTrackElevation(cartU);
  const currentSpringX = getSpringCompression(cartU);
  const potentialEnergy = mass * gravity * currentHeight;
  const springEnergy = 0.5 * springK * currentSpringX * currentSpringX;
  const mechanicalEnergy = Math.max(0, totalInitialEnergy - thermalLoss);
  const kineticEnergy = Math.max(0, mechanicalEnergy - potentialEnergy - springEnergy);
  const currentVelocity = Math.sqrt((2 * kineticEnergy) / mass);
  const turningPointHeight = mechanicalEnergy / (mass * gravity);

  // Numerical derivative dy/du for slope angle and normal force
  const duEps = 0.002;
  const dyMeters =
    (getTrackElevation(Math.min(1, cartU + duEps)) -
      getTrackElevation(Math.max(0, cartU - duEps))) /
    (2 * duEps);
  const trackLengthMeters = 60; // horizontal span in meters
  const slopeRad = Math.atan2(dyMeters, trackLengthMeters);
  const powerWatts = mass * gravity * Math.sin(-slopeRad) * currentVelocity * cartDir;

  // Reset helper
  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCartU(0.04);
    setCartDir(1);
    setThermalLoss(0);
  }, []);

  // Physics Animation Loop with realistic turning-point reflection
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = Math.min(0.05, ((timestamp - lastTimeRef.current) / 1000) * simSpeed);

        setCartU((prevU) => {
          const hNow = getTrackElevation(prevU);
          const sxNow = getSpringCompression(prevU);
          const uNow = mass * gravity * hNow;
          const usNow = 0.5 * springK * sxNow * sxNow;
          const eMech = Math.max(0, totalInitialEnergy - thermalLoss);
          const kNow = Math.max(0, eMech - uNow - usNow);
          const vNow = Math.sqrt((2 * kNow) / mass);

          // Minimum nudge speed near turning points so cart doesn't get stuck at v=0
          const effectiveSpeed = Math.max(1.8, vNow);
          const dsMeters = effectiveSpeed * dt * Math.cos(slopeRad);
          const stepU = (dsMeters / trackLengthMeters) * cartDir;
          const candidateU = prevU + stepU;

          // Check boundaries [0.03, 0.96]
          if (candidateU >= 0.96) {
            setCartDir(-1);
            return 0.96;
          }
          if (candidateU <= 0.03) {
            setCartDir(1);
            return 0.03;
          }

          // Check if candidateU exceeds available mechanical energy (classical turning point!)
          const nextU = mass * gravity * getTrackElevation(candidateU);
          const nextUs = 0.5 * springK * Math.pow(getSpringCompression(candidateU), 2);
          if (nextU + nextUs > eMech && nextU + nextUs > uNow + usNow) {
            setCartDir((d) => -d);
            return prevU;
          }

          // Dissipate thermal energy if friction > 0
          if (frictionCoeff > 0 && vNow > 0.1) {
            const normalForce = mass * gravity * Math.cos(slopeRad);
            const dThermal = frictionCoeff * normalForce * (vNow * dt);
            setThermalLoss((loss) => Math.min(totalInitialEnergy * 0.88, loss + dThermal));
          }

          return candidateU;
        });
      }
      lastTimeRef.current = timestamp;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [
    isPlaying,
    simSpeed,
    cartDir,
    mass,
    gravity,
    springK,
    frictionCoeff,
    totalInitialEnergy,
    thermalLoss,
    slopeRad,
    getTrackElevation,
    getSpringCompression,
  ]);

  // Direct Canvas Pointer Drag to scrub Cart along Track
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateUFromEvent = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const px = (e.clientX - rect.left) * scaleX;
      const trackLeft = 65;
      const trackWidth = 600;
      const newU = Math.max(0.03, Math.min(0.96, (px - trackLeft) / trackWidth));
      setCartU(newU);
      setThermalLoss(0);
    };

    const onDown = (e) => {
      isDraggingCartRef.current = true;
      setIsPlaying(false);
      updateUFromEvent(e);
    };
    const onMove = (e) => {
      if (!isDraggingCartRef.current) return;
      updateUFromEvent(e);
    };
    const onUp = () => {
      isDraggingCartRef.current = false;
    };

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, w, h);

    const trackLeft = 65;
    const trackWidth = 600;
    const groundY = h - 48;
    const maxMeters = 26;
    const meterScale = (h - 95) / maxMeters;

    const toScreen = (u) => {
      const x = trackLeft + u * trackWidth;
      const yMeters = getTrackElevation(u);
      const y = groundY - yMeters * meterScale;
      return { x, y, yMeters };
    };

    // Background elevation grid lines (every 5 meters)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillStyle = '#64748b';
    for (let m = 0; m <= 25; m += 5) {
      const py = groundY - m * meterScale;
      ctx.beginPath();
      ctx.moveTo(trackLeft - 10, py);
      ctx.lineTo(trackLeft + trackWidth + 10, py);
      ctx.stroke();
      ctx.fillText(`${m}m`, 24, py + 4);
    }

    // Optional Energy vs. Position Graph Overlay
    if (showEnergyGraph) {
      // Potential Energy Fill Under Track
      ctx.fillStyle = 'rgba(56, 189, 248, 0.07)';
      ctx.beginPath();
      ctx.moveTo(trackLeft, groundY);
      for (let i = 0; i <= 120; i++) {
        const u = i / 120;
        const pt = toScreen(u);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.lineTo(trackLeft + trackWidth, groundY);
      ctx.closePath();
      ctx.fill();

      // Classical Turning-Point Horizon Line (h_max = E_mech / mg)
      const horizonY = groundY - Math.min(maxMeters, turningPointHeight) * meterScale;
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.75)';
      ctx.lineWidth = 1.8;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(trackLeft, horizonY);
      ctx.lineTo(trackLeft + trackWidth, horizonY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(
        `E_mech Horizon (Max Height h_max = ${turningPointHeight.toFixed(1)} m)`,
        trackLeft + 10,
        Math.max(22, horizonY - 7)
      );
    }

    // Ground platform
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, groundY, trackLeft + trackWidth + 25, h - groundY);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, groundY);
    ctx.lineTo(trackLeft + trackWidth + 20, groundY);
    ctx.stroke();

    // Vertical Structural Support Trusses
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
    ctx.lineWidth = 1.5;
    for (let u = 0.05; u <= 0.95; u += 0.075) {
      const pt = toScreen(u);
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y + 6);
      ctx.lineTo(pt.x, groundY);
      ctx.stroke();
    }

    // Draw Spring Coil if in 'coaster' (right bumper) or 'launcher' (left launcher)
    if (sceneMode === 'coaster' || sceneMode === 'launcher') {
      const isCoaster = sceneMode === 'coaster';
      const anchorU = isCoaster ? 0.98 : 0.01;
      const tipU = isCoaster ? Math.max(0.86, cartU) : Math.min(0.22, cartU);
      const pAnchor = toScreen(anchorU);
      const pTip = toScreen(tipU);

      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const coils = 8;
      for (let i = 0; i <= coils * 2; i++) {
        const t = i / (coils * 2);
        const sx = pAnchor.x + (pTip.x - pAnchor.x) * t;
        const sy = pAnchor.y - 8 + (i % 2 === 0 ? -6 : 6);
        if (i === 0) ctx.moveTo(pAnchor.x, pAnchor.y - 8);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }

    // Draw Main Track Rails (Double Rail)
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const pt = toScreen(i / 160);
      if (i === 0) ctx.moveTo(pt.x, pt.y + 7);
      else ctx.lineTo(pt.x, pt.y + 7);
    }
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const pt = toScreen(i / 160);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();

    // Draw Cart at cartU
    const cartPt = toScreen(cartU);
    const nextPt = toScreen(Math.min(1, cartU + 0.008));
    const prevPt = toScreen(Math.max(0, cartU - 0.008));
    const trackAngle = Math.atan2(nextPt.y - prevPt.y, nextPt.x - prevPt.x);

    ctx.save();
    ctx.translate(cartPt.x, cartPt.y);
    ctx.rotate(trackAngle);

    // Glow & Cart chassis
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(-18, -18, 36, 15, 5);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Wheels
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(-11, -2, 4.5, 0, Math.PI * 2);
    ctx.arc(11, -2, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Velocity Vector Arrow along track
    if (showVectors && currentVelocity > 0.2) {
      const vLen = Math.min(85, 16 + currentVelocity * 3.2) * cartDir;
      ctx.strokeStyle = '#4ade80';
      ctx.fillStyle = '#4ade80';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -11);
      ctx.lineTo(vLen, -11);
      ctx.stroke();

      const headSign = Math.sign(vLen);
      ctx.beginPath();
      ctx.moveTo(vLen, -11);
      ctx.lineTo(vLen - headSign * 9, -16);
      ctx.lineTo(vLen - headSign * 9, -6);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`v = ${currentVelocity.toFixed(1)} m/s`, vLen > 0 ? vLen - 25 : vLen - 35, -22);
    }

    ctx.restore();

    // Gravity vector mg (pointing straight down from cart)
    if (showVectors) {
      const gLen = 38;
      ctx.strokeStyle = '#f43f5e';
      ctx.fillStyle = '#f43f5e';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(cartPt.x, cartPt.y);
      ctx.lineTo(cartPt.x, cartPt.y + gLen);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cartPt.x, cartPt.y + gLen);
      ctx.lineTo(cartPt.x - 5, cartPt.y + gLen - 8);
      ctx.lineTo(cartPt.x + 5, cartPt.y + gLen - 8);
      ctx.closePath();
      ctx.fill();
      ctx.font = 'bold 10px system-ui, sans-serif';
      ctx.fillText('mg', cartPt.x + 7, cartPt.y + gLen - 2);
    }

    // RIGHT PANEL: Dedicated Vertical Energy Reservoir Columns
    const panelX = 685;
    const panelY = 20;
    const panelW = w - panelX - 16;
    const panelH = h - 40;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 14);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIVE ENERGY GAUGE (kJ)', panelX + panelW / 2, panelY + 24);

    const bars = [
      { label: 'Kinetic', sub: 'K = ½mv²', val: kineticEnergy, color: '#4ade80' },
      { label: 'Potential', sub: 'Ug = mgh', val: potentialEnergy, color: '#38bdf8' },
      { label: 'Spring', sub: 'Us = ½kx²', val: springEnergy, color: '#a855f7' },
      { label: 'Thermal', sub: 'Eth = f·d', val: thermalLoss, color: '#f87171' },
      { label: 'Total E', sub: 'K+U+Eth', val: totalInitialEnergy, color: '#facc15' },
    ];

    const colAreaTop = panelY + 48;
    const colAreaBot = panelY + panelH - 46;
    const maxColH = colAreaBot - colAreaTop;
    const colW = 24;
    const colGap = (panelW - 24 - bars.length * colW) / (bars.length - 1);

    bars.forEach((b, i) => {
      const bx = panelX + 12 + i * (colW + colGap);
      const ratio = totalInitialEnergy > 0 ? Math.min(1, b.val / totalInitialEnergy) : 0;
      const fillH = ratio * maxColH;

      // Track background
      ctx.fillStyle = 'rgba(30, 41, 59, 0.85)';
      ctx.beginPath();
      ctx.roundRect(bx, colAreaTop, colW, maxColH, 6);
      ctx.fill();

      // Active bar fill
      if (fillH > 1) {
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.roundRect(bx, colAreaBot - fillH, colW, fillH, 6);
        ctx.fill();
      }

      // Value above bar
      ctx.fillStyle = b.color;
      ctx.font = 'bold 10px system-ui, sans-serif';
      ctx.fillText(`${(b.val / 1000).toFixed(1)}`, bx + colW / 2, colAreaBot - fillH - 6);

      // Label below bar
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 10px system-ui, sans-serif';
      ctx.fillText(b.label, bx + colW / 2, colAreaBot + 16);
      ctx.fillStyle = '#64748b';
      ctx.font = '9px system-ui, sans-serif';
      ctx.fillText(b.sub, bx + colW / 2, colAreaBot + 30);
    });

    ctx.textAlign = 'left';
  }, [
    sceneMode,
    cartU,
    cartDir,
    releaseH,
    totalInitialEnergy,
    kineticEnergy,
    potentialEnergy,
    springEnergy,
    thermalLoss,
    currentVelocity,
    turningPointHeight,
    showVectors,
    showEnergyGraph,
    getTrackElevation,
  ]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Work, Mechanical Energy & Conservation Lab</h3>
          <span className="viz-header__tag">K + U_g + U_s + E_th = E_total</span>
        </div>

        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${sceneMode === 'coaster' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSceneMode('coaster');
              handleReset();
            }}
          >
            🎢 Coaster & Spring
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${sceneMode === 'halfpipe' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSceneMode('halfpipe');
              handleReset();
            }}
          >
            🛹 Skate Half-Pipe
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${sceneMode === 'launcher' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => {
              setSceneMode('launcher');
              handleReset();
            }}
          >
            🚀 Spring Launcher
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Elevation (h)" value={currentHeight.toFixed(1)} unit="m" />
        <MetricBadge label="Speed (v)" value={currentVelocity.toFixed(1)} unit="m/s" highlight />
        <MetricBadge label="Kinetic (K)" value={(kineticEnergy / 1000).toFixed(2)} unit="kJ" />
        <MetricBadge label="Gravitational (Ug)" value={(potentialEnergy / 1000).toFixed(2)} unit="kJ" />
        <MetricBadge label="Elastic Spring (Us)" value={(springEnergy / 1000).toFixed(2)} unit="kJ" />
        <MetricBadge label="Power (P = F·v)" value={(Math.abs(powerWatts) / 1000).toFixed(1)} unit="kW" />
      </div>

      <div className="viz-canvas-area" style={{ height: 430, cursor: 'ew-resize' }}>
        <canvas ref={canvasRef} width={920} height={430} />
      </div>

      <div className="viz-controls-panel">
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <button
            type="button"
            className={`viz-btn ${showVectors ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
            onClick={() => setShowVectors((v) => !v)}
          >
            {showVectors ? '✓ Force & Velocity Vectors' : 'Show Vectors'}
          </button>
          <button
            type="button"
            className={`viz-btn ${showEnergyGraph ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
            onClick={() => setShowEnergyGraph((g) => !g)}
          >
            {showEnergyGraph ? '✓ Turning-Point Horizon (h_max)' : 'Show Energy Horizon'}
          </button>
        </div>

        <div className="viz-sliders-grid">
          <SliderControl
            label="Track Position Scrubber (x)"
            value={Math.round(cartU * 100)}
            min={3}
            max={96}
            step={1}
            unit="%"
            onChange={(pct) => {
              setIsPlaying(false);
              setCartU(pct / 100);
            }}
          />
          <SliderControl
            label="Release Height (h₀)"
            value={releaseH}
            min={10}
            max={24}
            step={1}
            unit=" m"
            onChange={(h) => {
              setReleaseH(h);
              handleReset();
            }}
          />
          <SliderControl
            label="Cart Mass (m)"
            value={mass}
            min={15}
            max={120}
            step={5}
            unit=" kg"
            onChange={setMass}
          />
          <SliderControl
            label="Friction Coefficient (μ_k)"
            value={frictionCoeff}
            min={0}
            max={0.15}
            step={0.01}
            unit=""
            onChange={setFrictionCoeff}
          />
          <SliderControl
            label="Spring Stiffness (k)"
            value={springK}
            min={500}
            max={3500}
            step={250}
            unit=" N/m"
            onChange={setSpringK}
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
          🎢 <strong>Interactive Tip:</strong> Click or drag anywhere along the track (or use the Position Scrubber) to place the cart at any height! Watch the yellow <strong>E_mech Horizon Line</strong>: if friction drops the horizon below a hill crest, the cart reverses direction at the classical turning point!
        </div>
      </div>
    </div>
  );
}
