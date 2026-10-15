import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

/**
 * Interactive Thermodynamics & Heat Transfer Laboratory
 *
 * 4 Interactive Exploration Modes:
 * 1. 'microscopic': Kinetic Theory of Gases (Temperature, atomic speeds, pressure, and volume)
 * 2. 'heat-transfer': The 3 Heat Transfer Mechanisms (Conduction, Convection, Radiation)
 * 3. 'pv-processes': Ideal Gas Processes on P-V Diagram with live cylinder and shaded boundary work
 * 4. 'carnot': The Carnot Heat Engine Cycle (Reservoirs, cycle loop, and efficiency limit)
 */
export default function ThermodynamicsViz() {
  const [activeTab, setActiveTab] = useState('microscopic');
  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // ==========================================
  // TAB 1: MICROSCOPIC KINETIC THEORY STATE
  // ==========================================
  const [tempMicro, setTempMicro] = useState(300); // Kelvin (100 to 900)
  const [volumeMicro, setVolumeMicro] = useState(1.0); // m^3 normalized (0.5 to 1.5)
  const [particleCount, setParticleCount] = useState(60); // 20 to 100
  const [gasType, setGasType] = useState('neon'); // 'helium' (mass 4), 'neon' (20), 'argon' (40)

  // Particles array stored in a ref to avoid React state re-render churn on every 60fps frame
  const particlesRef = useRef([]);

  // ==========================================
  // TAB 2: HEAT TRANSFER MECHANISMS STATE
  // ==========================================
  const [mechanism, setMechanism] = useState('conduction'); // 'conduction' | 'convection' | 'radiation'

  // Conduction state
  const [condMaterial, setCondMaterial] = useState('copper');
  const [condThot, setCondThot] = useState(150); // °C
  const [condTcold, setCondTcold] = useState(20); // °C
  const [condLength, setCondLength] = useState(0.4); // meters (0.1 to 1.0)
  const [condArea, setCondArea] = useState(0.04); // m^2 (0.01 to 0.1)

  // Convection state
  const [convFluid, setConvFluid] = useState('air-natural'); // 'air-natural' | 'air-forced' | 'water'
  const [convTsurface, setConvTsurface] = useState(85); // °C
  const [convTfluid, setConvTfluid] = useState(25); // °C
  const [convArea, setConvArea] = useState(0.5); // m^2

  // Radiation state
  const [radTbody, setRadTbody] = useState(1200); // Kelvin (300 to 2500)
  const [radTenv, setRadTenv] = useState(300); // Kelvin (100 to 500)
  const [radEmissivity, setRadEmissivity] = useState(0.85); // 0.05 to 1.0
  const [radArea, setRadArea] = useState(0.1); // m^2

  // Heat transfer animated particles (for conduction energy pulses & convection vortices)
  const heatParticlesRef = useRef([]);

  // ==========================================
  // TAB 3: P-V DIAGRAM & PROCESSES STATE
  // ==========================================
  const [processType, setProcessType] = useState('isothermal'); // 'isobaric' | 'isochoric' | 'isothermal' | 'adiabatic'
  const [processProgress, setProcessProgress] = useState(0); // 0 (initial state) to 1 (final state)
  const [autoLoopPV, setAutoLoopPV] = useState(true);

  // ==========================================
  // TAB 4: CARNOT ENGINE STATE
  // ==========================================
  const [carnotThot, setCarnotThot] = useState(800); // K (400 to 1400)
  const [carnotTcold, setCarnotTcold] = useState(300); // K (100 to 380)
  const [carnotQin, setCarnotQin] = useState(2000); // Joules (500 to 5000)
  const [carnotCyclePhase, setCarnotCyclePhase] = useState(0); // 0 to 4 (continuous loop through 4 stages)

  // Material thermal conductivities k [W/(m*K)]
  const conductivityMap = {
    copper: { name: 'Copper', k: 398, color: '#f97316' },
    aluminum: { name: 'Aluminum', k: 205, color: '#94a3b8' },
    iron: { name: 'Iron / Steel', k: 80, color: '#64748b' },
    glass: { name: 'Glass', k: 0.8, color: '#38bdf8' },
    wood: { name: 'Wood', k: 0.15, color: '#a16207' },
    aerogel: { name: 'Silica Aerogel', k: 0.02, color: '#a855f7' },
  };

  // Convection coefficients h [W/(m^2*K)]
  const convectionMap = {
    'air-natural': { name: 'Natural Air (Buoyancy)', h: 12 },
    'air-forced': { name: 'Forced Air (Cooling Fan)', h: 65 },
    water: { name: 'Liquid Water Flow', h: 600 },
  };

  // Gas molecular weights (g/mol)
  const gasMassMap = {
    helium: { name: 'Helium (He)', mass: 4, label: 'Light & Fast' },
    neon: { name: 'Neon (Ne)', mass: 20, label: 'Medium' },
    argon: { name: 'Argon (Ar)', mass: 40, label: 'Heavy & Slower' },
  };

  // ==========================================
  // INITIALIZE PARTICLES FOR TAB 1 (KINETIC THEORY)
  // ==========================================
  useEffect(() => {
    const particles = [];
    const mass = gasMassMap[gasType].mass;
    const baseSpeed = Math.sqrt((tempMicro / 300) * (20 / mass)) * 2.8;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = baseSpeed * (0.6 + Math.random() * 0.8);
      particles.push({
        x: 40 + Math.random() * 320 * volumeMicro,
        y: 40 + Math.random() * 260,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: gasType === 'helium' ? 3.5 : gasType === 'neon' ? 4.5 : 5.5,
      });
    }
    particlesRef.current = particles;
  }, [particleCount, gasType]);

  // Adjust speeds when temperature changes
  useEffect(() => {
    const mass = gasMassMap[gasType].mass;
    const targetSpeedFactor = Math.sqrt((tempMicro / 300) * (20 / mass)) * 2.8;
    particlesRef.current.forEach((p) => {
      const curSpeed = Math.hypot(p.vx, p.vy) || 1;
      const factor = targetSpeedFactor / curSpeed;
      p.vx *= factor * (0.8 + Math.random() * 0.4);
      p.vy *= factor * (0.8 + Math.random() * 0.4);
    });
  }, [tempMicro, gasType]);

  // Initialize Convection Fluid Vortex Particles
  useEffect(() => {
    const vortexParticles = [];
    for (let i = 0; i < 70; i++) {
      // Half in left vortex, half in right vortex
      const side = i % 2 === 0 ? -1 : 1;
      const theta = Math.random() * Math.PI * 2;
      const r = 30 + Math.random() * 65;
      vortexParticles.push({
        side, // -1 (left counterclockwise) or +1 (right clockwise)
        theta,
        r,
        speed: 0.02 + Math.random() * 0.02,
      });
    }
    heatParticlesRef.current = vortexParticles;
  }, []);

  // ==========================================
  // PHYSICAL DERIVED CALCULATIONS
  // ==========================================

  // Tab 1: Kinetic Theory
  // Ideal Gas: P = N * k_B * T / V (scaled for visual display in kPa)
  const kB_sim = 1.38; // scaled
  const pressureKPa = ((particleCount * kB_sim * (tempMicro / 100)) / (volumeMicro * 2.5)).toFixed(1);
  const rmsSpeedMs = Math.round(Math.sqrt((3 * 8.314 * tempMicro) / (gasMassMap[gasType].mass * 0.001)));
  const internalEnergyJ = Math.round((3 / 2) * (particleCount * 0.05) * 8.314 * tempMicro);

  // Tab 2: Conduction
  const currentCondK = conductivityMap[condMaterial].k;
  const deltaTCond = condThot - condTcold;
  const condRateWatts = ((currentCondK * condArea * deltaTCond) / condLength).toFixed(1);
  const condThermalResistance = (condLength / (currentCondK * condArea)).toFixed(3);
  const condTempGradient = (deltaTCond / condLength).toFixed(0);

  // Tab 2: Convection
  const currentConvH = convectionMap[convFluid].h;
  const deltaTConv = Math.max(0, convTsurface - convTfluid);
  const convRateWatts = (currentConvH * convArea * deltaTConv).toFixed(1);

  // Tab 2: Radiation (Stefan-Boltzmann: P = e * sigma * A * (T^4 - Tenv^4))
  const sigma = 5.67037e-8;
  const radPemit = radEmissivity * sigma * radArea * Math.pow(radTbody, 4);
  const radPabs = radEmissivity * sigma * radArea * Math.pow(radTenv, 4);
  const radPnetWatts = (radPemit - radPabs).toFixed(1);
  // Wien's Displacement Law: lambda_max = 2.898e-3 / T (in micrometers)
  const radWienMicrons = ((2.898e-3 / radTbody) * 1e6).toFixed(2);

  // Tab 3: P-V Process Calculations
  const V1_pv = 1.0;
  const P1_pv = 100; // kPa
  const T1_pv = 300; // K
  const gamma_pv = 1.4; // Diatomic gas heat capacity ratio Cp/Cv

  let currentV_pv = V1_pv;
  let currentP_pv = P1_pv;
  let currentT_pv = T1_pv;
  let workDone_pv = 0;
  let deltaU_pv = 0;
  let heatAdded_pv = 0;

  if (processType === 'isobaric') {
    // Constant P = P1, Volume expands from 1.0 to 2.2
    const V2 = 2.2;
    currentV_pv = V1_pv + (V2 - V1_pv) * processProgress;
    currentP_pv = P1_pv;
    currentT_pv = T1_pv * (currentV_pv / V1_pv);
    workDone_pv = (currentP_pv * (currentV_pv - V1_pv) * 10).toFixed(0);
    // Diatomic gas: Cv = 5/2 R, Cp = 7/2 R -> dU = 2.5 * P * dV
    deltaU_pv = (2.5 * currentP_pv * (currentV_pv - V1_pv) * 10).toFixed(0);
    heatAdded_pv = (Number(workDone_pv) + Number(deltaU_pv)).toFixed(0);
  } else if (processType === 'isochoric') {
    // Constant V = V1, Pressure increases from 100 to 240 kPa
    const P2 = 240;
    currentV_pv = V1_pv;
    currentP_pv = P1_pv + (P2 - P1_pv) * processProgress;
    currentT_pv = T1_pv * (currentP_pv / P1_pv);
    workDone_pv = 0; // Rigid box, no volume change!
    deltaU_pv = (2.5 * (currentP_pv - P1_pv) * V1_pv * 10).toFixed(0);
    heatAdded_pv = deltaU_pv;
  } else if (processType === 'isothermal') {
    // Constant T = T1, Volume expands from 1.0 to 2.4, P = P1*V1 / V
    const V2 = 2.4;
    currentV_pv = V1_pv + (V2 - V1_pv) * processProgress;
    currentP_pv = (P1_pv * V1_pv) / currentV_pv;
    currentT_pv = T1_pv;
    deltaU_pv = 0; // Ideal gas at constant T has dU = 0
    workDone_pv = (P1_pv * V1_pv * Math.log(currentV_pv / V1_pv) * 10).toFixed(0);
    heatAdded_pv = workDone_pv;
  } else if (processType === 'adiabatic') {
    // Q = 0, P * V^gamma = const, Volume expands from 1.0 to 2.2
    const V2 = 2.2;
    currentV_pv = V1_pv + (V2 - V1_pv) * processProgress;
    currentP_pv = P1_pv * Math.pow(V1_pv / currentV_pv, gamma_pv);
    currentT_pv = T1_pv * Math.pow(V1_pv / currentV_pv, gamma_pv - 1);
    heatAdded_pv = 0; // By definition of adiabatic
    // W = (P1*V1 - P*V) / (gamma - 1)
    const wVal = ((P1_pv * V1_pv - currentP_pv * currentV_pv) / (gamma_pv - 1)) * 10;
    workDone_pv = wVal.toFixed(0);
    deltaU_pv = (-wVal).toFixed(0);
  }

  // Tab 4: Carnot Cycle Calculations
  const carnotEfficiency = Math.max(0, 1 - carnotTcold / carnotThot);
  const carnotEfficiencyPct = (carnotEfficiency * 100).toFixed(1);
  const carnotWorkOut = (carnotQin * carnotEfficiency).toFixed(0);
  const carnotQrejected = (carnotQin * (1 - carnotEfficiency)).toFixed(0);

  // ==========================================
  // MAIN ANIMATION LOOP
  // ==========================================
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = Math.min(0.05, (timestamp - lastTimeRef.current) / 1000) * simSpeed;

        // Animate Tab 1: Particle Positions & Wall Bounces
        if (activeTab === 'microscopic') {
          const particles = particlesRef.current;
          const containerLeft = 50;
          const containerTop = 40;
          const containerBottom = 300;
          const containerRight = 50 + 380 * volumeMicro;

          particles.forEach((p) => {
            p.x += p.vx * dt * 60;
            p.y += p.vy * dt * 60;

            // Bounce against left wall
            if (p.x - p.radius < containerLeft) {
              p.x = containerLeft + p.radius;
              p.vx = Math.abs(p.vx);
            }
            // Bounce against right movable piston
            if (p.x + p.radius > containerRight) {
              p.x = containerRight - p.radius;
              p.vx = -Math.abs(p.vx);
            }
            // Bounce against top and bottom walls
            if (p.y - p.radius < containerTop) {
              p.y = containerTop + p.radius;
              p.vy = Math.abs(p.vy);
            }
            if (p.y + p.radius > containerBottom) {
              p.y = containerBottom - p.radius;
              p.vy = -Math.abs(p.vy);
            }
          });
        }

        // Animate Tab 3: P-V process sweep if autoloop enabled
        if (activeTab === 'pv-processes' && autoLoopPV) {
          setProcessProgress((prev) => {
            const next = prev + dt * 0.35;
            return next > 1.0 ? 0 : next;
          });
        }

        // Animate Tab 4: Carnot Cycle Phase Loop
        if (activeTab === 'carnot') {
          setCarnotCyclePhase((prev) => (prev + dt * 0.45) % 4);
        }
      }

      lastTimeRef.current = timestamp;
      renderCanvas();
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [
    isPlaying,
    simSpeed,
    activeTab,
    volumeMicro,
    tempMicro,
    gasType,
    autoLoopPV,
    processType,
    processProgress,
    carnotCyclePhase,
    condMaterial,
    condThot,
    condTcold,
    condLength,
    condArea,
    convFluid,
    convTsurface,
    convTfluid,
    radTbody,
    radTenv,
    radEmissivity,
    carnotThot,
    carnotTcold,
  ]);

  // ==========================================
  // CANVAS RENDERING DISPATCHER
  // ==========================================
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    if (activeTab === 'microscopic') {
      renderMicroscopicTab(ctx, width, height);
    } else if (activeTab === 'heat-transfer') {
      renderHeatTransferTab(ctx, width, height);
    } else if (activeTab === 'pv-processes') {
      renderPVProcessesTab(ctx, width, height);
    } else if (activeTab === 'carnot') {
      renderCarnotTab(ctx, width, height);
    }
  };

  // ----------------------------------------------------
  // RENDER TAB 1: MICROSCOPIC KINETIC THEORY & PRESSURE
  // ----------------------------------------------------
  const renderMicroscopicTab = (ctx, width, height) => {
    const containerLeft = 50;
    const containerTop = 40;
    const containerBottom = 300;
    const containerRight = containerLeft + 380 * volumeMicro;
    const containerHeight = containerBottom - containerTop;

    // 1. Draw Container Boundary (Chamber)
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#334155';
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.beginPath();
    ctx.rect(containerLeft, containerTop, containerRight - containerLeft, containerHeight);
    ctx.fill();
    ctx.stroke();

    // 2. Draw Movable Piston Face (Right Wall)
    ctx.fillStyle = '#64748b';
    ctx.fillRect(containerRight, containerTop - 10, 16, containerHeight + 20);
    // Piston connecting shaft
    ctx.fillStyle = '#475569';
    ctx.fillRect(containerRight + 16, containerTop + containerHeight / 2 - 8, width - containerRight - 360, 16);
    // Piston label
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('MOVABLE PISTON', containerRight + 20, containerTop + 24);

    // 3. Draw Thermal Source (Flame or Ice under chamber)
    const burnerCenterX = (containerLeft + containerRight) / 2;
    if (tempMicro >= 300) {
      // Flame animation
      const flameHeight = Math.min(35, 10 + (tempMicro - 300) * 0.04);
      const flameGradient = ctx.createRadialGradient(
        burnerCenterX,
        containerBottom + 25,
        5,
        burnerCenterX,
        containerBottom + 25,
        80
      );
      flameGradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
      flameGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.4)');
      flameGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = flameGradient;
      ctx.beginPath();
      ctx.arc(burnerCenterX, containerBottom + 25, 70, 0, Math.PI * 2);
      ctx.fill();

      // Flame tongues
      ctx.fillStyle = '#f97316';
      for (let i = -3; i <= 3; i++) {
        const fx = burnerCenterX + i * 28;
        const fy = containerBottom + 12;
        const fh = flameHeight * (0.7 + Math.sin(Date.now() * 0.01 + i) * 0.3);
        ctx.beginPath();
        ctx.moveTo(fx - 10, fy + 14);
        ctx.quadraticCurveTo(fx, fy - fh, fx + 10, fy + 14);
        ctx.fill();
      }
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(`🔥 THERMAL HEAT INPUT: ${tempMicro} K (${(tempMicro - 273.15).toFixed(0)}°C)`, containerLeft + 10, containerBottom + 45);
    } else {
      // Ice/Cooler under chamber
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.fillRect(containerLeft + 20, containerBottom + 10, containerRight - containerLeft - 40, 24);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.fillText(`❄️ CRYOGENIC COOLING: ${tempMicro} K (${(tempMicro - 273.15).toFixed(0)}°C)`, containerLeft + 10, containerBottom + 45);
    }

    // 4. Draw Gas Particles with velocity color-coding
    const particles = particlesRef.current;
    particles.forEach((p) => {
      const speed = Math.hypot(p.vx, p.vy);
      // Cold (blue) -> Room (yellow) -> Hot (glowing red)
      let color = '#38bdf8';
      if (speed > 4.5) color = '#ef4444';
      else if (speed > 2.8) color = '#f59e0b';

      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = speed > 4 ? 8 : 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    // 5. Draw Maxwell-Boltzmann Speed Distribution Chart (Right side)
    const chartX = width - 290;
    const chartY = 40;
    const chartW = 250;
    const chartH = 150;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.fillRect(chartX, chartY, chartW, chartH);
    ctx.strokeRect(chartX, chartY, chartW, chartH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('Maxwell-Boltzmann Velocity Distribution', chartX + 12, chartY + 20);

    // Plot theoretical speed probability curve f(v) = C * v^2 * exp(-m*v^2 / 2kT)
    ctx.beginPath();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    const peakSpeed = Math.sqrt(tempMicro) * 0.18;
    for (let x = 0; x < chartW - 20; x += 3) {
      const v = (x / (chartW - 20)) * 6;
      // Normalized Maxwell distribution shape
      const yVal = Math.pow(v / peakSpeed, 2) * Math.exp(-Math.pow(v / peakSpeed, 2)) * 1.5;
      const plotY = chartY + chartH - 20 - Math.min(chartH - 45, yVal * 70);
      if (x === 0) ctx.moveTo(chartX + 10 + x, plotY);
      else ctx.lineTo(chartX + 10 + x, plotY);
    }
    ctx.stroke();

    // Mark current RMS Speed
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([4, 4]);
    const rmsPlotX = chartX + 10 + Math.min(chartW - 30, peakSpeed * 1.22 * ((chartW - 20) / 6));
    ctx.beginPath();
    ctx.moveTo(rmsPlotX, chartY + 30);
    ctx.lineTo(rmsPlotX, chartY + chartH - 20);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ef4444';
    ctx.font = '10px system-ui, sans-serif';
    ctx.fillText(`v_rms = ${rmsSpeedMs} m/s`, rmsPlotX - 35, chartY + 32);

    // Axis labels
    ctx.fillStyle = '#64748b';
    ctx.fillText('0 m/s', chartX + 10, chartY + chartH - 6);
    ctx.fillText('Molecular Speed v →', chartX + chartW - 120, chartY + chartH - 6);

    // 6. Draw Real-time Pressure Dial Gauge (Right bottom)
    const dialX = chartX + chartW / 2;
    const dialY = chartY + chartH + 75;
    const dialR = 48;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.arc(dialX, dialY, dialR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Dial arc
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(dialX, dialY, dialR - 6, Math.PI * 0.75, Math.PI * 2.25);
    ctx.stroke();

    // Dial Needle based on calculated pressure
    const maxP = 400; // kPa
    const pAngle = Math.PI * 0.75 + (Math.min(maxP, Number(pressureKPa)) / maxP) * Math.PI * 1.5;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(dialX, dialY);
    ctx.lineTo(dialX + Math.cos(pAngle) * (dialR - 10), dialY + Math.sin(pAngle) * (dialR - 10));
    ctx.stroke();

    // Center pin
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(dialX, dialY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Dial text
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${pressureKPa} kPa`, dialX, dialY + 28);
    ctx.font = '9px system-ui, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('WALL PRESSURE', dialX, dialY + 40);
    ctx.textAlign = 'left';
  };

  // ----------------------------------------------------
  // RENDER TAB 2: THE 3 HEAT TRANSFER MECHANISMS
  // ----------------------------------------------------
  const renderHeatTransferTab = (ctx, width, height) => {
    if (mechanism === 'conduction') {
      // ------------------------------------
      // CONDUCTION: 1D Fourier Heat Conduction Bar
      // ------------------------------------
      const barX = 140;
      const barY = 120;
      const barW = Math.max(160, 420 * (condLength / 1.0));
      const barH = Math.max(40, 110 * (condArea / 0.1));

      // Hot Reservoir on Left
      ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.fillRect(40, 70, 95, 200);
      ctx.strokeRect(40, 70, 95, 200);

      ctx.fillStyle = '#f87171';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText('HOT SOURCE', 48, 100);
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText(`T_H = ${condThot}°C`, 48, 130);
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = '#fca5a5';
      ctx.fillText(`${(condThot + 273.15).toFixed(0)} K`, 48, 150);

      // Cold Reservoir on Right
      const coldX = barX + barW + 5;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.strokeStyle = '#38bdf8';
      ctx.fillRect(coldX, 70, 95, 200);
      ctx.strokeRect(coldX, 70, 95, 200);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText('COLD SINK', coldX + 10, 100);
      ctx.font = 'bold 18px system-ui, sans-serif';
      ctx.fillText(`T_C = ${condTcold}°C`, coldX + 10, 130);
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillStyle = '#7dd3fc';
      ctx.fillText(`${(condTcold + 273.15).toFixed(0)} K`, coldX + 10, 150);

      // Draw Conduction Bar with Continuous Temperature Gradient Heatmap
      const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      grad.addColorStop(0, '#ef4444'); // Hot red
      grad.addColorStop(0.3, '#f97316'); // Orange
      grad.addColorStop(0.65, '#eab308'); // Yellow
      grad.addColorStop(1, '#38bdf8'); // Cold Cyan
      ctx.fillStyle = grad;
      ctx.fillRect(barX, barY, barW, barH);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.strokeRect(barX, barY, barW, barH);

      // Bar Label & Dimension Callouts
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        `${conductivityMap[condMaterial].name} (k = ${currentCondK} W/m·K)`,
        barX + barW / 2,
        barY + barH / 2 + 4
      );
      ctx.textAlign = 'left';

      // Animated Heat Flux Energy Pulse Arrows
      const pulseSpeed = Math.min(15, Math.max(1, Number(condRateWatts) / 100));
      const pulseOffset = (Date.now() * 0.05 * pulseSpeed) % 40;
      ctx.fillStyle = '#fef08a';
      for (let px = barX + pulseOffset; px < barX + barW - 10; px += 40) {
        ctx.beginPath();
        ctx.arc(px, barY + barH / 2, 4, 0, Math.PI * 2);
        ctx.fill();
        // small arrow
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, barY + barH / 2);
        ctx.lineTo(px + 8, barY + barH / 2);
        ctx.lineTo(px + 4, barY + barH / 2 - 3);
        ctx.moveTo(px + 8, barY + barH / 2);
        ctx.lineTo(px + 4, barY + barH / 2 + 3);
        ctx.stroke();
      }

      // Dimension indicator: Length L
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(barX, barY + barH + 20);
      ctx.lineTo(barX + barW, barY + barH + 20);
      ctx.moveTo(barX, barY + barH + 15);
      ctx.lineTo(barX, barY + barH + 25);
      ctx.moveTo(barX + barW, barY + barH + 15);
      ctx.lineTo(barX + barW, barY + barH + 25);
      ctx.stroke();

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Length L = ${condLength.toFixed(2)} m`, barX + barW / 2, barY + barH + 36);
      ctx.textAlign = 'left';

      // Summary Law Banner on Canvas
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText("FOURIER'S LAW: Q̇ = k · A · (T_H - T_C) / L", 40, 310);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(
        `Heat Flux: ${condRateWatts} Watts | Thermal Resistance R_th = ${condThermalResistance} K/W`,
        40,
        330
      );
    } else if (mechanism === 'convection') {
      // ------------------------------------
      // CONVECTION: Rayleigh-Bénard Fluid Circulation Cells
      // ------------------------------------
      const chamberX = 120;
      const chamberY = 60;
      const chamberW = 500;
      const chamberH = 220;

      // Draw Fluid Chamber
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.fillRect(chamberX, chamberY, chamberW, chamberH);
      ctx.strokeRect(chamberX, chamberY, chamberW, chamberH);

      // Hot Bottom Plate (Surface at Ts)
      const hotGrad = ctx.createLinearGradient(0, chamberY + chamberH, 0, chamberY + chamberH + 20);
      hotGrad.addColorStop(0, '#ef4444');
      hotGrad.addColorStop(1, '#991b1b');
      ctx.fillStyle = hotGrad;
      ctx.fillRect(chamberX, chamberY + chamberH, chamberW, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(`HOT BOUNDARY PLATE (T_s = ${convTsurface}°C)`, chamberX + 150, chamberY + chamberH + 13);

      // Cool Top Boundary (Ambient at T_infinity)
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(chamberX, chamberY - 14, chamberW, 14);
      ctx.fillStyle = '#93c5fd';
      ctx.fillText(`COOL AMBIENT FLUID / SINK (T_∞ = ${convTfluid}°C)`, chamberX + 140, chamberY - 3);

      // Animate Convection Vortex Loops
      const vortexCenterX1 = chamberX + chamberW * 0.3;
      const vortexCenterX2 = chamberX + chamberW * 0.7;
      const vortexCenterY = chamberY + chamberH * 0.5;

      const particles = heatParticlesRef.current;
      const flowRateSpeed = Math.min(4, Math.max(0.4, (Number(convRateWatts) / 200) * 1.2));

      particles.forEach((p) => {
        // Advance angle around center
        p.theta += p.speed * flowRateSpeed * p.side;
        const cx = p.side === -1 ? vortexCenterX1 : vortexCenterX2;
        const px = cx + Math.cos(p.theta) * p.r * 1.5;
        const py = vortexCenterY + Math.sin(p.theta) * p.r * 0.85;

        // Color depends on vertical position (bottom hot red, top cold cyan)
        const normY = (py - chamberY) / chamberH;
        let pColor = '#38bdf8';
        if (normY > 0.7) pColor = '#ef4444'; // Hot rising near bottom
        else if (normY > 0.4) pColor = '#f59e0b'; // Transition

        ctx.fillStyle = pColor;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Directional Flow Arrows
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.fillStyle = '#f59e0b';
      // Center rising hot plume
      const plumeX = chamberX + chamberW / 2;
      ctx.beginPath();
      ctx.moveTo(plumeX, chamberY + chamberH - 25);
      ctx.lineTo(plumeX, chamberY + 30);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(plumeX, chamberY + 20);
      ctx.lineTo(plumeX - 6, chamberY + 32);
      ctx.lineTo(plumeX + 6, chamberY + 32);
      ctx.fill();

      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText('HOT BUOYANT FLUID RISES (ρ decreases)', plumeX + 12, chamberY + 110);

      // Newton's Law Banner
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText("NEWTON'S LAW OF COOLING: Q̇ = h · A · (T_s - T_∞)", 40, 315);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(
        `Mode: ${convectionMap[convFluid].name} (h = ${currentConvH} W/m²·K) | Heat Flux: ${convRateWatts} W`,
        40,
        335
      );
    } else if (mechanism === 'radiation') {
      // ------------------------------------
      // RADIATION: Stefan-Boltzmann Glowing Body in Vacuum
      // ------------------------------------
      const objCenterX = width / 2;
      const objCenterY = 160;
      const objRadius = Math.max(35, 65 * Math.sqrt(radArea / 0.1));

      // Calculate Blackbody Glowing Color based on Temperature
      let glowColor = '#334155';
      let haloColor = 'rgba(51, 65, 85, 0)';
      if (radTbody >= 2000) {
        glowColor = '#fef08a'; // Brilliant white-yellow
        haloColor = 'rgba(254, 240, 138, 0.45)';
      } else if (radTbody >= 1400) {
        glowColor = '#f97316'; // Bright orange
        haloColor = 'rgba(249, 115, 22, 0.35)';
      } else if (radTbody >= 800) {
        glowColor = '#dc2626'; // Deep red
        haloColor = 'rgba(220, 38, 38, 0.25)';
      } else {
        glowColor = '#475569'; // Cool dark gray
        haloColor = 'rgba(71, 85, 105, 0.1)';
      }

      // Vacuum Chamber Walls (Ambient at Tenv)
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 40, width - 120, 240);
      ctx.fillStyle = '#64748b';
      ctx.font = '11px system-ui, sans-serif';
      ctx.fillText(`VACUUM CHAMBER ENCLOSURE: T_env = ${radTenv} K (${(radTenv - 273.15).toFixed(0)}°C)`, 75, 60);

      // Expanding Radiative Electromagnetic Wavefront Rings
      const ringOffset = (Date.now() * 0.04) % 40;
      ctx.strokeStyle = haloColor;
      ctx.lineWidth = 2;
      for (let r = objRadius + 15 + ringOffset; r < 200; r += 40) {
        ctx.beginPath();
        ctx.arc(objCenterX, objCenterY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radiating Object Body with Blackbody Glow
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = radTbody > 700 ? 30 : 5;
      ctx.fillStyle = glowColor;
      ctx.beginPath();
      ctx.arc(objCenterX, objCenterY, objRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Object Text Readout
      ctx.fillStyle = radTbody > 1400 ? '#000000' : '#ffffff';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${radTbody} K`, objCenterX, objCenterY - 4);
      ctx.font = '10px system-ui, sans-serif';
      ctx.fillText(`ε = ${radEmissivity.toFixed(2)}`, objCenterX, objCenterY + 12);
      ctx.textAlign = 'left';

      // Stefan-Boltzmann Law Readout
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px system-ui, sans-serif';
      ctx.fillText('STEFAN-BOLTZMANN: P_net = ε · σ · A · (T⁴ - T_env⁴)', 40, 310);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(
        `Net Radiated Power: ${radPnetWatts} W | Wien Peak Wavelength λ_max = ${radWienMicrons} µm`,
        40,
        330
      );
    }
  };

  // ----------------------------------------------------
  // RENDER TAB 3: P-V DIAGRAM & 4 THERMODYNAMIC PROCESSES
  // ----------------------------------------------------
  const renderPVProcessesTab = (ctx, width, height) => {
    // Left Half: Gas Piston Cylinder
    const cylX = 50;
    const cylY = 80;
    const maxCylW = 280;
    const cylH = 160;
    const pistonW = 40 + (currentV_pv / 2.5) * (maxCylW - 60);

    // Cylinder casing
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.strokeRect(cylX, cylY, maxCylW, cylH);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.fillRect(cylX, cylY, maxCylW, cylH);

    // Gas color inside cylinder (temperature dependent)
    const normT = Math.min(1, Math.max(0, (currentT_pv - 200) / 400));
    let gasTint = `rgba(56, 189, 248, ${0.15 + (1 - normT) * 0.25})`; // Cold cyan
    if (normT > 0.4) {
      gasTint = `rgba(239, 68, 68, ${0.15 + normT * 0.35})`; // Hot red
    }
    ctx.fillStyle = gasTint;
    ctx.fillRect(cylX + 2, cylY + 2, pistonW - 2, cylH - 4);

    // Piston Head
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(cylX + pistonW, cylY - 6, 18, cylH + 12);
    // Connecting Rod
    ctx.fillStyle = '#64748b';
    ctx.fillRect(cylX + pistonW + 18, cylY + cylH / 2 - 8, maxCylW - pistonW + 30, 16);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`V = ${currentV_pv.toFixed(2)} m³`, cylX + 15, cylY + 30);
    ctx.fillText(`P = ${currentP_pv.toFixed(0)} kPa`, cylX + 15, cylY + 50);
    ctx.fillText(`T = ${currentT_pv.toFixed(0)} K`, cylX + 15, cylY + 70);

    // Heat interaction visual under cylinder
    if (Number(heatAdded_pv) > 0) {
      ctx.fillStyle = '#f97316';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText(`🔥 Heat Absorbed Q = +${heatAdded_pv} J`, cylX + 20, cylY + cylH + 30);
    } else if (processType === 'adiabatic') {
      ctx.fillStyle = '#38bdf8';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText('🛡️ Perfectly Insulated (Q = 0 J)', cylX + 20, cylY + cylH + 30);
    }

    // Right Half: Live P-V Coordinate Graph
    const graphX = 420;
    const graphY = 60;
    const graphW = 300;
    const graphH = 200;

    // Graph axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(graphX, graphY);
    ctx.lineTo(graphX, graphY + graphH);
    ctx.lineTo(graphX + graphW, graphY + graphH);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText('Pressure P (kPa) ↑', graphX - 10, graphY - 10);
    ctx.fillText('Volume V (m³) →', graphX + graphW - 80, graphY + graphH + 25);

    // Helper functions to map physical (V, P) to graph pixels
    const mapV = (v) => graphX + ((v - 0.8) / 1.8) * graphW;
    const mapP = (p) => graphY + graphH - ((p - 40) / 220) * graphH;

    // Draw full theoretical path curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      let vSample = 1.0;
      let pSample = 100;

      if (processType === 'isobaric') {
        vSample = 1.0 + frac * 1.2;
        pSample = 100;
      } else if (processType === 'isochoric') {
        vSample = 1.0;
        pSample = 100 + frac * 140;
      } else if (processType === 'isothermal') {
        vSample = 1.0 + frac * 1.4;
        pSample = (100 * 1.0) / vSample;
      } else if (processType === 'adiabatic') {
        vSample = 1.0 + frac * 1.2;
        pSample = 100 * Math.pow(1.0 / vSample, gamma_pv);
      }

      const px = mapV(vSample);
      const py = mapP(pSample);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Fill Shaded Area under the curve up to current state (Work done W = ∫ P dV)
    if (processType !== 'isochoric' && processProgress > 0) {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.beginPath();
      const currentSteps = Math.max(2, Math.round(steps * processProgress));
      ctx.moveTo(mapV(1.0), graphY + graphH);

      for (let i = 0; i <= currentSteps; i++) {
        const frac = (i / steps) * processProgress;
        let vSample = 1.0;
        let pSample = 100;
        if (processType === 'isobaric') {
          vSample = 1.0 + frac * 1.2;
          pSample = 100;
        } else if (processType === 'isothermal') {
          vSample = 1.0 + frac * 1.4;
          pSample = (100 * 1.0) / vSample;
        } else if (processType === 'adiabatic') {
          vSample = 1.0 + frac * 1.2;
          pSample = 100 * Math.pow(1.0 / vSample, gamma_pv);
        }
        ctx.lineTo(mapV(vSample), mapP(pSample));
      }
      ctx.lineTo(mapV(currentV_pv), graphY + graphH);
      ctx.closePath();
      ctx.fill();
    }

    // Draw Current State Point
    const curPtX = mapV(currentV_pv);
    const curPtY = mapP(currentP_pv);
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(curPtX, curPtY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Area Work Readout
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`Shaded Area = Work Done (W = ${workDone_pv} J)`, graphX + 15, graphY + 30);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(`ΔU = ${deltaU_pv} J | Q = ${heatAdded_pv} J`, graphX + 15, graphY + 48);
  };

  // ----------------------------------------------------
  // RENDER TAB 4: CARNOT HEAT ENGINE & MAXIMUM EFFICIENCY
  // ----------------------------------------------------
  const renderCarnotTab = (ctx, width, height) => {
    // 1. Heat Engine Flow Schematic (Left side)
    const engX = 80;

    // Hot Reservoir (Top)
    ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.fillRect(engX, 40, 200, 60);
    ctx.strokeRect(engX, 40, 200, 60);

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('HOT THERMAL SOURCE (T_H)', engX + 12, 62);
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText(`${carnotThot} K (${(carnotThot - 273.15).toFixed(0)}°C)`, engX + 12, 85);

    // Heat Input Arrow (Q_H)
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(engX + 100, 100);
    ctx.lineTo(engX + 100, 140);
    ctx.stroke();
    // arrowhead
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(engX + 100, 145);
    ctx.lineTo(engX + 94, 134);
    ctx.lineTo(engX + 106, 134);
    ctx.fill();

    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`Q_H = ${carnotQin} J`, engX + 115, 126);

    // Engine Cylinder Core (Middle)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(engX + 100, 185, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CARNOT', engX + 100, 182);
    ctx.fillText('ENGINE', engX + 100, 196);
    ctx.textAlign = 'left';

    // Useful Work Shaft Output (Right of Engine)
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(engX + 142, 185);
    ctx.lineTo(engX + 210, 185);
    ctx.stroke();
    // arrowhead
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(engX + 218, 185);
    ctx.lineTo(engX + 208, 179);
    ctx.lineTo(engX + 208, 191);
    ctx.fill();

    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`W_net = ${carnotWorkOut} J`, engX + 145, 172);

    // Waste Heat Output Arrow (Q_C)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(engX + 100, 227);
    ctx.lineTo(engX + 100, 265);
    ctx.stroke();
    // arrowhead
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(engX + 100, 272);
    ctx.lineTo(engX + 94, 262);
    ctx.lineTo(engX + 106, 262);
    ctx.fill();

    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`Q_C = ${carnotQrejected} J`, engX + 115, 252);

    // Cold Reservoir (Bottom)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.fillRect(engX, 275, 200, 60);
    ctx.strokeRect(engX, 275, 200, 60);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.fillText('COLD HEAT SINK (T_C)', engX + 12, 298);
    ctx.font = 'bold 16px system-ui, sans-serif';
    ctx.fillText(`${carnotTcold} K (${(carnotTcold - 273.15).toFixed(0)}°C)`, engX + 12, 322);

    // 2. Closed Cycle P-V Indicator Loop (Right side)
    const loopX = 400;
    const loopY = 60;
    const loopW = 320;
    const loopH = 200;

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.strokeRect(loopX, loopY, loopW, loopH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('Carnot Reversible Cycle (P-V Diagram)', loopX + 12, loopY + 20);

    // 4 Corner states of Carnot Cycle
    const pA = { x: loopX + 50, y: loopY + 40 }; // 1: Peak pressure, small V
    const pB = { x: loopX + 150, y: loopY + 70 }; // 2: Isothermal expansion end
    const pC = { x: loopX + 270, y: loopY + 160 }; // 3: Adiabatic expansion end (max V)
    const pD = { x: loopX + 140, y: loopY + 140 }; // 4: Isothermal compression end

    // Shaded Enclosed Work Area
    ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
    ctx.beginPath();
    ctx.moveTo(pA.x, pA.y);
    ctx.quadraticCurveTo(loopX + 100, loopY + 50, pB.x, pB.y);
    ctx.quadraticCurveTo(loopX + 210, loopY + 110, pC.x, pC.y);
    ctx.quadraticCurveTo(loopX + 200, loopY + 155, pD.x, pD.y);
    ctx.quadraticCurveTo(loopX + 80, loopY + 90, pA.x, pA.y);
    ctx.closePath();
    ctx.fill();

    // Boundary Curve Lines
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Animate Tracer Dot looping clockwise
    const stage = Math.floor(carnotCyclePhase);
    const frac = carnotCyclePhase - stage;
    let tracerX = pA.x;
    let tracerY = pA.y;
    let stageLabel = '1 → 2: Isothermal Expansion at T_H';

    if (stage === 0) {
      tracerX = pA.x + (pB.x - pA.x) * frac;
      tracerY = pA.y + (pB.y - pA.y) * frac;
      stageLabel = 'Stage 1: Isothermal Expansion (Absorbs Q_H)';
    } else if (stage === 1) {
      tracerX = pB.x + (pC.x - pB.x) * frac;
      tracerY = pB.y + (pC.y - pB.y) * frac;
      stageLabel = 'Stage 2: Adiabatic Expansion (Cools T_H → T_C)';
    } else if (stage === 2) {
      tracerX = pC.x + (pD.x - pC.x) * frac;
      tracerY = pC.y + (pD.y - pC.y) * frac;
      stageLabel = 'Stage 3: Isothermal Compression (Rejects Q_C)';
    } else {
      tracerX = pD.x + (pA.x - pD.x) * frac;
      tracerY = pD.y + (pA.y - pD.y) * frac;
      stageLabel = 'Stage 4: Adiabatic Compression (Heats T_C → T_H)';
    }

    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(tracerX, tracerY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Stage readout
    ctx.fillStyle = '#fef08a';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(stageLabel, loopX + 12, loopY + loopH - 12);

    // Efficiency Gauge Bar (Bottom Right)
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`Carnot Efficiency Limit: η_max = ${carnotEfficiencyPct}%`, loopX + 12, loopY + loopH + 30);

    ctx.fillStyle = '#334155';
    ctx.fillRect(loopX + 12, loopY + loopH + 40, loopW - 24, 12);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(loopX + 12, loopY + loopH + 40, (loopW - 24) * carnotEfficiency, 12);
  };

  // Reset handler
  const handleReset = () => {
    setTempMicro(300);
    setVolumeMicro(1.0);
    setProcessProgress(0);
    setCondThot(150);
    setCondTcold(20);
    setCarnotThot(800);
    setCarnotTcold(300);
  };

  return (
    <div className="viz-container">
      {/* VIZ HEADER WITH LAB MODE SWITCHER */}
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Heat Transfer & Thermodynamics Laboratory</h3>
          <span className="viz-header__tag">
            {activeTab === 'microscopic' && 'Atomic Kinetics & Pressure'}
            {activeTab === 'heat-transfer' && '3 Heat Transfer Pathways'}
            {activeTab === 'pv-processes' && 'Ideal Gas & P-V Cycles'}
            {activeTab === 'carnot' && 'Carnot Engine & Limits'}
          </span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'microscopic' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('microscopic')}
          >
            1. Microscopic Heat & Pressure
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'heat-transfer' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('heat-transfer')}
          >
            2. The 3 Heat Transfer Modes
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'pv-processes' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('pv-processes')}
          >
            3. P-V Diagram & Processes
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'carnot' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('carnot')}
          >
            4. Carnot Heat Engine
          </button>
        </div>
      </header>

      {/* DYNAMIC REAL-TIME METRICS BAR */}
      <div className="viz-metrics-bar">
        {activeTab === 'microscopic' && (
          <>
            <MetricBadge
              label="Temperature (T)"
              value={`${tempMicro} K`}
              unit={`(${(tempMicro - 273.15).toFixed(0)}°C)`}
              highlight
            />
            <MetricBadge label="Wall Pressure (P)" value={pressureKPa} unit="kPa" highlight />
            <MetricBadge label="Volume (V)" value={volumeMicro.toFixed(2)} unit="m³" />
            <MetricBadge label="RMS Velocity (v_rms)" value={rmsSpeedMs} unit="m/s" />
            <MetricBadge label="Internal Energy (U)" value={internalEnergyJ} unit="Joules" />
          </>
        )}

        {activeTab === 'heat-transfer' && mechanism === 'conduction' && (
          <>
            <MetricBadge label="Material" value={conductivityMap[condMaterial].name} unit="" />
            <MetricBadge label="Heat Transfer Rate (Q̇)" value={condRateWatts} unit="Watts" highlight />
            <MetricBadge label="Thermal Resistance (R_th)" value={condThermalResistance} unit="K/W" />
            <MetricBadge label="Conductivity (k)" value={currentCondK} unit="W/(m·K)" />
            <MetricBadge label="Temp Gradient (dT/dx)" value={condTempGradient} unit="K/m" />
          </>
        )}

        {activeTab === 'heat-transfer' && mechanism === 'convection' && (
          <>
            <MetricBadge label="Fluid Flow Mode" value={convectionMap[convFluid].name} unit="" />
            <MetricBadge label="Convection Rate (Q̇)" value={convRateWatts} unit="Watts" highlight />
            <MetricBadge label="Convection Coeff (h)" value={currentConvH} unit="W/(m²·K)" />
            <MetricBadge label="Temp Gradient (ΔT)" value={`${deltaTConv}°C`} unit="" />
          </>
        )}

        {activeTab === 'heat-transfer' && mechanism === 'radiation' && (
          <>
            <MetricBadge label="Body Temp (T)" value={`${radTbody} K`} unit={`(${(radTbody - 273.15).toFixed(0)}°C)`} highlight />
            <MetricBadge label="Net Radiated (P_net)" value={radPnetWatts} unit="Watts" highlight />
            <MetricBadge label="Emissivity (ε)" value={radEmissivity.toFixed(2)} unit="" />
            <MetricBadge label="Wien Peak (λ_max)" value={radWienMicrons} unit="µm" />
          </>
        )}

        {activeTab === 'pv-processes' && (
          <>
            <MetricBadge label="Process Type" value={processType.toUpperCase()} unit="" highlight />
            <MetricBadge label="Current Pressure (P)" value={currentP_pv.toFixed(0)} unit="kPa" />
            <MetricBadge label="Current Volume (V)" value={currentV_pv.toFixed(2)} unit="m³" />
            <MetricBadge label="Work Done (W)" value={`${workDone_pv} J`} unit="" highlight />
            <MetricBadge label="Internal Energy (ΔU)" value={`${deltaU_pv} J`} unit="" />
          </>
        )}

        {activeTab === 'carnot' && (
          <>
            <MetricBadge label="Carnot Efficiency (η)" value={`${carnotEfficiencyPct}%`} unit="Max Possible" highlight />
            <MetricBadge label="Heat In (Q_H)" value={`${carnotQin} J`} unit="" />
            <MetricBadge label="Net Work (W_net)" value={`${carnotWorkOut} J`} unit="" highlight />
            <MetricBadge label="Waste Heat (Q_C)" value={`${carnotQrejected} J`} unit="" />
            <MetricBadge label="Temp Ratio (T_C / T_H)" value={(carnotTcold / carnotThot).toFixed(3)} unit="" />
          </>
        )}
      </div>

      {/* SIMULATION CANVAS AREA */}
      <div className="viz-canvas-area" style={{ height: '390px' }}>
        <canvas ref={canvasRef} width={800} height={390} />
      </div>

      {/* CONTROLS PANEL */}
      <div className="viz-controls-panel">
        {/* TAB 1 CONTROLS */}
        {activeTab === 'microscopic' && (
          <div className="viz-sliders-grid">
            <SliderControl
              label="Temperature (T)"
              value={tempMicro}
              min={100}
              max={900}
              step={10}
              unit="K"
              onChange={setTempMicro}
            />
            <SliderControl
              label="Container Volume (V)"
              value={volumeMicro}
              min={0.5}
              max={1.5}
              step={0.05}
              unit="m³"
              onChange={setVolumeMicro}
            />
            <SliderControl
              label="Number of Gas Molecules (N)"
              value={particleCount}
              min={20}
              max={100}
              step={5}
              unit="particles"
              onChange={setParticleCount}
            />
            <div className="viz-slider-row">
              <div className="viz-slider-header">
                <span className="viz-slider-label">Gas Species & Mass</span>
                <span className="viz-slider-value">{gasMassMap[gasType].name}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                {Object.keys(gasMassMap).map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`viz-btn viz-btn--secondary ${gasType === k ? 'viz-btn--active' : ''}`}
                    onClick={() => setGasType(k)}
                    style={{ flex: 1, fontSize: '0.75rem', padding: '0.35rem 0.5rem' }}
                  >
                    {gasMassMap[k].name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 CONTROLS */}
        {activeTab === 'heat-transfer' && (
          <>
            {/* Mechanism Selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <button
                type="button"
                className={`viz-mode-btn ${mechanism === 'conduction' ? 'viz-mode-btn--active' : ''}`}
                onClick={() => setMechanism('conduction')}
              >
                Conduction (Fourier Bar)
              </button>
              <button
                type="button"
                className={`viz-mode-btn ${mechanism === 'convection' ? 'viz-mode-btn--active' : ''}`}
                onClick={() => setMechanism('convection')}
              >
                Convection (Fluid Circulation)
              </button>
              <button
                type="button"
                className={`viz-mode-btn ${mechanism === 'radiation' ? 'viz-mode-btn--active' : ''}`}
                onClick={() => setMechanism('radiation')}
              >
                Radiation (Stefan-Boltzmann)
              </button>
            </div>

            {mechanism === 'conduction' && (
              <div className="viz-sliders-grid">
                <SliderControl
                  label="Hot Face Temp (T_H)"
                  value={condThot}
                  min={50}
                  max={400}
                  step={5}
                  unit="°C"
                  onChange={setCondThot}
                />
                <SliderControl
                  label="Cold Face Temp (T_C)"
                  value={condTcold}
                  min={0}
                  max={45}
                  step={1}
                  unit="°C"
                  onChange={setCondTcold}
                />
                <SliderControl
                  label="Conduction Length (L)"
                  value={condLength}
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  unit="m"
                  onChange={setCondLength}
                />
                <div className="viz-slider-row">
                  <div className="viz-slider-header">
                    <span className="viz-slider-label">Bar Material</span>
                    <span className="viz-slider-value">{conductivityMap[condMaterial].name}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                    {Object.keys(conductivityMap).map((mat) => (
                      <button
                        key={mat}
                        type="button"
                        className={`viz-btn viz-btn--secondary ${condMaterial === mat ? 'viz-btn--active' : ''}`}
                        onClick={() => setCondMaterial(mat)}
                        style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
                      >
                        {conductivityMap[mat].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mechanism === 'convection' && (
              <div className="viz-sliders-grid">
                <SliderControl
                  label="Surface Temp (T_s)"
                  value={convTsurface}
                  min={40}
                  max={200}
                  step={5}
                  unit="°C"
                  onChange={setConvTsurface}
                />
                <SliderControl
                  label="Fluid Temp (T_∞)"
                  value={convTfluid}
                  min={5}
                  max={35}
                  step={1}
                  unit="°C"
                  onChange={setConvTfluid}
                />
                <SliderControl
                  label="Exposed Area (A)"
                  value={convArea}
                  min={0.1}
                  max={2.0}
                  step={0.1}
                  unit="m²"
                  onChange={setConvArea}
                />
                <div className="viz-slider-row">
                  <div className="viz-slider-header">
                    <span className="viz-slider-label">Fluid Environment</span>
                    <span className="viz-slider-value">{convectionMap[convFluid].name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    {Object.keys(convectionMap).map((cf) => (
                      <button
                        key={cf}
                        type="button"
                        className={`viz-btn viz-btn--secondary ${convFluid === cf ? 'viz-btn--active' : ''}`}
                        onClick={() => setConvFluid(cf)}
                        style={{ flex: 1, fontSize: '0.72rem', padding: '0.35rem 0.4rem' }}
                      >
                        {convectionMap[cf].name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {mechanism === 'radiation' && (
              <div className="viz-sliders-grid">
                <SliderControl
                  label="Radiating Body Temp (T)"
                  value={radTbody}
                  min={300}
                  max={2500}
                  step={50}
                  unit="K"
                  onChange={setRadTbody}
                />
                <SliderControl
                  label="Ambient Enclosure Temp (T_env)"
                  value={radTenv}
                  min={100}
                  max={500}
                  step={10}
                  unit="K"
                  onChange={setRadTenv}
                />
                <SliderControl
                  label="Surface Emissivity (ε)"
                  value={radEmissivity}
                  min={0.05}
                  max={1.0}
                  step={0.05}
                  unit=""
                  onChange={setRadEmissivity}
                />
                <SliderControl
                  label="Radiation Surface Area (A)"
                  value={radArea}
                  min={0.02}
                  max={0.5}
                  step={0.02}
                  unit="m²"
                  onChange={setRadArea}
                />
              </div>
            )}
          </>
        )}

        {/* TAB 3 CONTROLS */}
        {activeTab === 'pv-processes' && (
          <div className="viz-sliders-grid">
            <div className="viz-slider-row">
              <div className="viz-slider-header">
                <span className="viz-slider-label">Thermodynamic Process Path</span>
                <span className="viz-slider-value">{processType.toUpperCase()}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.25rem' }}>
                {[
                  { id: 'isobaric', label: 'Isobaric (ΔP = 0)' },
                  { id: 'isochoric', label: 'Isochoric (ΔV = 0)' },
                  { id: 'isothermal', label: 'Isothermal (ΔT = 0)' },
                  { id: 'adiabatic', label: 'Adiabatic (Q = 0)' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`viz-btn viz-btn--secondary ${processType === p.id ? 'viz-btn--active' : ''}`}
                    onClick={() => {
                      setProcessType(p.id);
                      setProcessProgress(0);
                    }}
                    style={{ fontSize: '0.74rem', padding: '0.35rem 0.6rem' }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <SliderControl
              label="Process State Progress"
              value={processProgress}
              min={0}
              max={1.0}
              step={0.02}
              unit=""
              formatValue={(v) => `${(v * 100).toFixed(0)}% (State 1 → 2)`}
              onChange={(val) => {
                setAutoLoopPV(false);
                setProcessProgress(val);
              }}
            />

            <div className="viz-slider-row" style={{ justifyContent: 'center' }}>
              <button
                type="button"
                className={`viz-btn ${autoLoopPV ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setAutoLoopPV(!autoLoopPV)}
                style={{ marginTop: '1rem' }}
              >
                {autoLoopPV ? '⏸ Pause Auto-Scrubbing' : '▶ Auto-Scrub Expansion'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4 CONTROLS */}
        {activeTab === 'carnot' && (
          <div className="viz-sliders-grid">
            <SliderControl
              label="Hot Source Temp (T_H)"
              value={carnotThot}
              min={400}
              max={1400}
              step={20}
              unit="K"
              onChange={setCarnotThot}
            />
            <SliderControl
              label="Cold Sink Temp (T_C)"
              value={carnotTcold}
              min={100}
              max={380}
              step={10}
              unit="K"
              onChange={setCarnotTcold}
            />
            <SliderControl
              label="Heat Energy Input (Q_H)"
              value={carnotQin}
              min={500}
              max={5000}
              step={100}
              unit="J"
              onChange={setCarnotQin}
            />
          </div>
        )}

        {/* COMMON PLAYBACK BAR */}
        <PlaybackBar
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={handleReset}
          speed={simSpeed}
          onSpeedChange={setSimSpeed}
        />
      </div>
    </div>
  );
}
