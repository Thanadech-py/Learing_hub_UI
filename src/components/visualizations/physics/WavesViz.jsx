import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function WavesViz() {
  const [activeTab, setActiveTab] = useState('phase'); // 'anatomy' | 'phase' | 'pipes' | 'doppler' | 'superposition'

  // Tab 1: Anatomy & Sound Waves Parameters
  const [waveType, setWaveType] = useState('transverse'); // 'transverse' | 'longitudinal'
  const [amplitude, setAmplitude] = useState(45); // px
  const [wavelength, setWavelength] = useState(180); // px
  const [frequency, setFrequency] = useState(1.2); // Hz
  const [showLabels, setShowLabels] = useState(true);

  // Tab 2: Phase Angle & Unit Circle Parameters
  const [phaseSubMode, setPhaseSubMode] = useState('single'); // 'single' | 'phase-shift' | 'compare-two'
  const [rotationAngleDeg, setRotationAngleDeg] = useState(60); // 0 to 360 deg (theta)
  const [phaseShiftDeg, setPhaseShiftDeg] = useState(0); // phi_0
  const [comparePhaseDiffDeg, setComparePhaseDiffDeg] = useState(90); // delta phi

  // Tab 3: Pipe Resonance Parameters
  const [pipeType, setPipeType] = useState('open-open'); // 'open-open' | 'open-closed' | 'string'
  const [harmonicIndex, setHarmonicIndex] = useState(1); // 1, 2, 3, 4 for open/string; 1, 3, 5, 7 for closed
  const [pipeLengthMeters, setPipeLengthMeters] = useState(1.2); // m
  const [soundSpeedInGas, setSoundSpeedInGas] = useState(343); // m/s (air)
  const [displayMode, setDisplayMode] = useState('displacement'); // 'displacement' | 'pressure'

  // Tab 4: Doppler Effect Parameters
  const [sourceSpeed, setSourceSpeed] = useState(120); // m/s
  const [baseFreq, setBaseFreq] = useState(320); // Hz
  const soundSpeedDoppler = 340; // m/s

  // Tab 5: Superposition Parameters
  const [phaseDiffDeg, setPhaseDiffDeg] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [simTime, setSimTime] = useState(0);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Doppler wavefronts history buffer: array of { x, y, birthTime, r }
  const dopplerWavefrontsRef = useRef([]);
  const lastEmissionTimeRef = useRef(0);
  const dopplerSourceXRef = useRef(100);

  // Pipe Calculations
  const effectiveHarmonicN =
    pipeType === 'open-closed'
      ? [1, 3, 5, 7][Math.min(3, harmonicIndex - 1)]
      : harmonicIndex;

  const fundamentalFreq =
    pipeType === 'open-closed'
      ? soundSpeedInGas / (4 * pipeLengthMeters)
      : soundSpeedInGas / (2 * pipeLengthMeters);

  const resonantFreq =
    pipeType === 'open-closed'
      ? effectiveHarmonicN * fundamentalFreq
      : effectiveHarmonicN * fundamentalFreq;

  const resonantWavelength =
    pipeType === 'open-closed'
      ? (4 * pipeLengthMeters) / effectiveHarmonicN
      : (2 * pipeLengthMeters) / effectiveHarmonicN;

  // Doppler Calculations
  const machNumber = sourceSpeed / soundSpeedDoppler;
  const isSupersonic = machNumber >= 1.0;
  const dopplerApproachingFreq =
    sourceSpeed < soundSpeedDoppler
      ? baseFreq * (soundSpeedDoppler / (soundSpeedDoppler - sourceSpeed))
      : Infinity;
  const dopplerRecedingFreq =
    baseFreq * (soundSpeedDoppler / (soundSpeedDoppler + sourceSpeed));
  const machAngleDeg = isSupersonic
    ? ((Math.asin(1 / machNumber) * 180) / Math.PI).toFixed(1)
    : null;

  // Phase Calculations
  const currentTotalPhaseDeg = (rotationAngleDeg + phaseShiftDeg) % 360;
  const currentTotalPhaseRad = ((currentTotalPhaseDeg * Math.PI) / 180);
  const sinValue = Math.sin(currentTotalPhaseRad);

  // Determine stage description of wave
  let phaseLandmarkText = 'Rising to Crest';
  if (Math.abs(currentTotalPhaseDeg - 90) < 3) {
    phaseLandmarkText = '▲ Peak Crest (Max +A)';
  } else if (Math.abs(currentTotalPhaseDeg - 180) < 3) {
    phaseLandmarkText = 'Crossing Zero (Falling)';
  } else if (Math.abs(currentTotalPhaseDeg - 270) < 3) {
    phaseLandmarkText = '▼ Trough (Min -A)';
  } else if (Math.abs(currentTotalPhaseDeg - 0) < 3 || Math.abs(currentTotalPhaseDeg - 360) < 3) {
    phaseLandmarkText = 'Crossing Zero (Rising)';
  } else if (currentTotalPhaseDeg > 0 && currentTotalPhaseDeg < 90) {
    phaseLandmarkText = 'Quadrant I (Rising)';
  } else if (currentTotalPhaseDeg > 90 && currentTotalPhaseDeg < 180) {
    phaseLandmarkText = 'Quadrant II (Falling)';
  } else if (currentTotalPhaseDeg > 180 && currentTotalPhaseDeg < 270) {
    phaseLandmarkText = 'Quadrant III (Falling to Trough)';
  } else {
    phaseLandmarkText = 'Quadrant IV (Rising to Zero)';
  }

  // Main Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = ((timestamp - lastTimeRef.current) / 1000) * simSpeed;
        setSimTime((t) => t + dt);

        // Auto-advance angle when in Phase Angle mode
        if (activeTab === 'phase') {
          setRotationAngleDeg((prev) => (prev + 75 * dt) % 360);
        }

        // Update Doppler simulation in animation loop
        if (activeTab === 'doppler') {
          const pixelSpeed = (sourceSpeed / soundSpeedDoppler) * 160;
          dopplerSourceXRef.current += pixelSpeed * dt;
          if (dopplerSourceXRef.current > 760) {
            dopplerSourceXRef.current = 80;
            dopplerWavefrontsRef.current = [];
          }

          const emissionPeriod = 0.25; // seconds
          if (timestamp / 1000 - lastEmissionTimeRef.current >= emissionPeriod / simSpeed) {
            dopplerWavefrontsRef.current.push({
              x: dopplerSourceXRef.current,
              y: 190,
              radius: 0,
            });
            lastEmissionTimeRef.current = timestamp / 1000;
          }

          const waveExpansionSpeed = 160; // px/s
          dopplerWavefrontsRef.current.forEach((wf) => {
            wf.radius += waveExpansionSpeed * dt;
          });

          dopplerWavefrontsRef.current = dopplerWavefrontsRef.current.filter(
            (wf) => wf.radius < 900
          );
        }
      }
      lastTimeRef.current = timestamp;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, simSpeed, activeTab, sourceSpeed, soundSpeedDoppler]);

  const handleReset = () => {
    setSimTime(0);
    setRotationAngleDeg(0);
    dopplerSourceXRef.current = 100;
    dopplerWavefrontsRef.current = [];
  };

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // ==========================================
    // TAB: PHASE ANGLE & UNIT CIRCLE COMPARISON
    // ==========================================
    if (activeTab === 'phase') {
      const circleCenterX = 155;
      const circleCenterY = 210;
      const radiusR = 85; // R = Amplitude A

      const waveStartX = 330;
      const waveEndX = w - 40;
      const waveLengthPx = 190; // 1 full cycle (360 deg) = 190 px

      // --- LEFT SIDE: THE UNIT CIRCLE (PHASOR DIAGRAM) ---
      // Cartesian Axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // X-axis
      ctx.moveTo(circleCenterX - radiusR - 30, circleCenterY);
      ctx.lineTo(circleCenterX + radiusR + 30, circleCenterY);
      // Y-axis
      ctx.moveTo(circleCenterX, circleCenterY - radiusR - 30);
      ctx.lineTo(circleCenterX, circleCenterY + radiusR + 30);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('+x (cos)', circleCenterX + radiusR + 34, circleCenterY + 4);
      ctx.textAlign = 'center';
      ctx.fillText('+y (sin)', circleCenterX, circleCenterY - radiusR - 35);

      // The Unit Circle Path
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(circleCenterX, circleCenterY, radiusR, 0, Math.PI * 2);
      ctx.stroke();

      // Landmark angle markers on circle
      const angleLandmarks = [
        { deg: 0, rad: '0', label: '0° (0 rad)' },
        { deg: 90, rad: 'π/2', label: '90° (π/2)' },
        { deg: 180, rad: 'π', label: '180° (π)' },
        { deg: 270, rad: '3π/2', label: '270° (3π/2)' },
      ];

      angleLandmarks.forEach((lm) => {
        const rad = (lm.deg * Math.PI) / 180;
        const tickX = circleCenterX + radiusR * Math.cos(rad);
        const tickY = circleCenterY - radiusR * Math.sin(rad);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(tickX, tickY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '10px sans-serif';
        const offset = 16;
        if (lm.deg === 0) {
          ctx.textAlign = 'left';
          ctx.fillText(lm.label, tickX + 6, tickY - 8);
        } else if (lm.deg === 90) {
          ctx.textAlign = 'center';
          ctx.fillText(lm.label, tickX, tickY - 10);
        } else if (lm.deg === 180) {
          ctx.textAlign = 'right';
          ctx.fillText(lm.label, tickX - 6, tickY - 8);
        } else {
          ctx.textAlign = 'center';
          ctx.fillText(lm.label, tickX, tickY + 18);
        }
      });

      // Phasor 1 Geometry
      const alpha1Rad = ((rotationAngleDeg + phaseShiftDeg) * Math.PI) / 180;
      const phasor1X = circleCenterX + radiusR * Math.cos(alpha1Rad);
      const phasor1Y = circleCenterY - radiusR * Math.sin(alpha1Rad);

      // Angle sector / arc (Phase Angle φ)
      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.beginPath();
      ctx.moveTo(circleCenterX, circleCenterY);
      ctx.arc(circleCenterX, circleCenterY, 32, 0, -alpha1Rad, true);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(circleCenterX, circleCenterY, 32, 0, -alpha1Rad, true);
      ctx.stroke();

      // Label angle in arc
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      const midAngle = -alpha1Rad / 2;
      ctx.fillText(
        `φ = ${currentTotalPhaseDeg.toFixed(0)}°`,
        circleCenterX + 46 * Math.cos(midAngle),
        circleCenterY + 46 * Math.sin(midAngle)
      );

      // Right-triangle vertical projection leg (y = A sin φ)
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(phasor1X, circleCenterY);
      ctx.lineTo(phasor1X, phasor1Y);
      ctx.stroke();

      // Right-triangle horizontal leg (x = A cos φ)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(circleCenterX, circleCenterY);
      ctx.lineTo(phasor1X, circleCenterY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Phasor 1 Vector Arrow (Hypotenuse = Amplitude A)
      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(circleCenterX, circleCenterY);
      ctx.lineTo(phasor1X, phasor1Y);
      ctx.stroke();

      // Arrowhead
      const headLen = 8;
      const arrowAngle = -alpha1Rad;
      ctx.beginPath();
      ctx.moveTo(phasor1X, phasor1Y);
      ctx.lineTo(
        phasor1X - headLen * Math.cos(arrowAngle - Math.PI / 6),
        phasor1Y - headLen * Math.sin(arrowAngle - Math.PI / 6)
      );
      ctx.lineTo(
        phasor1X - headLen * Math.cos(arrowAngle + Math.PI / 6),
        phasor1Y - headLen * Math.sin(arrowAngle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Phasor 1 Tip Bead
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(phasor1X, phasor1Y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // If comparing two waves, draw Phasor 2 in Amber
      let phasor2X = null, phasor2Y = null;
      if (phaseSubMode === 'compare-two') {
        const alpha2Rad = ((rotationAngleDeg + phaseShiftDeg + comparePhaseDiffDeg) * Math.PI) / 180;
        phasor2X = circleCenterX + radiusR * Math.cos(alpha2Rad);
        phasor2Y = circleCenterY - radiusR * Math.sin(alpha2Rad);

        // Phasor 2 Vector
        ctx.strokeStyle = '#f59e0b';
        ctx.fillStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(circleCenterX, circleCenterY);
        ctx.lineTo(phasor2X, phasor2Y);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(phasor2X, phasor2Y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label Phase Difference Δφ
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`Wave 2 (Δφ = +${comparePhaseDiffDeg}°)`, circleCenterX - 80, circleCenterY + radiusR + 42);
      }

      // --- RIGHT SIDE: THE SINE WAVE GRAPH ---
      // Equilibrium Axis (y = 0)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(waveStartX, circleCenterY);
      ctx.lineTo(waveEndX, circleCenterY);
      ctx.stroke();

      // Amplitude Envelope Bounds (+A and -A)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(waveStartX, circleCenterY - radiusR);
      ctx.lineTo(waveEndX, circleCenterY - radiusR);
      ctx.moveTo(waveStartX, circleCenterY + radiusR);
      ctx.lineTo(waveEndX, circleCenterY + radiusR);
      ctx.stroke();
      ctx.setLineDash([]);

      // Vertical labels at x = waveStartX
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('+A (+1.0)', waveStartX - 8, circleCenterY - radiusR + 4);
      ctx.fillText('0', waveStartX - 8, circleCenterY + 4);
      ctx.fillText('-A (-1.0)', waveStartX - 8, circleCenterY + radiusR + 4);

      // Angle Ticks along the Horizontal Axis (0, π/2, π, 3π/2, 2π, 3π, 4π)
      const horizontalLandmarks = [
        { deg: 0, label: '0' },
        { deg: 90, label: 'π/2 (90°)' },
        { deg: 180, label: 'π (180°)' },
        { deg: 270, label: '3π/2 (270°)' },
        { deg: 360, label: '2π (360°)' },
        { deg: 540, label: '3π' },
        { deg: 720, label: '4π' },
      ];

      horizontalLandmarks.forEach((hlm) => {
        const xPos = waveStartX + (hlm.deg / 360) * waveLengthPx;
        if (xPos <= waveEndX) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(xPos, circleCenterY - 6);
          ctx.lineTo(xPos, circleCenterY + 6);
          ctx.stroke();

          ctx.fillStyle = '#cbd5e1';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(hlm.label, xPos, circleCenterY + 20);
        }
      });

      // Draw Sine Wave 1 (Cyan)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let x = waveStartX; x <= waveEndX; x += 2) {
        const thetaLocalDeg = ((x - waveStartX) / waveLengthPx) * 360;
        const waveRad = ((thetaLocalDeg + phaseShiftDeg) * Math.PI) / 180;
        const y = circleCenterY - radiusR * Math.sin(waveRad);
        if (x === waveStartX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Wave 2 if in compare-two mode (Amber)
      if (phaseSubMode === 'compare-two') {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        for (let x = waveStartX; x <= waveEndX; x += 2) {
          const thetaLocalDeg = ((x - waveStartX) / waveLengthPx) * 360;
          const waveRad = ((thetaLocalDeg + phaseShiftDeg + comparePhaseDiffDeg) * Math.PI) / 180;
          const y = circleCenterY - radiusR * Math.sin(waveRad);
          if (x === waveStartX) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Visual horizontal distance bracket between peaks: Δx = (Δφ / 360) * λ
        // Peak of Wave 1 occurs at waveRad = 90 deg ⟹ thetaLocalDeg + phaseShiftDeg = 90
        const peak1X = waveStartX + (((90 - phaseShiftDeg + 720) % 360) / 360) * waveLengthPx;
        const peak2X = waveStartX + (((90 - phaseShiftDeg - comparePhaseDiffDeg + 720) % 360) / 360) * waveLengthPx;
        const minPeakX = Math.min(peak1X, peak2X);
        const maxPeakX = Math.max(peak1X, peak2X);

        if (maxPeakX - minPeakX > 5 && maxPeakX < waveEndX) {
          const shiftBracketY = circleCenterY - radiusR - 16;
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(minPeakX, shiftBracketY);
          ctx.lineTo(maxPeakX, shiftBracketY);
          ctx.moveTo(minPeakX, shiftBracketY - 4);
          ctx.lineTo(minPeakX, shiftBracketY + 4);
          ctx.moveTo(maxPeakX, shiftBracketY - 4);
          ctx.lineTo(maxPeakX, shiftBracketY + 4);
          ctx.stroke();

          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`Δx = ${(((comparePhaseDiffDeg / 360) * 1.0).toFixed(2))}λ (Δφ = ${comparePhaseDiffDeg}°)`, (minPeakX + maxPeakX) / 2, shiftBracketY - 6);
        }
      }

      // Current Active Point on the Sine Wave
      const currentWaveX = waveStartX + (rotationAngleDeg / 360) * waveLengthPx;
      const currentWaveY = phasor1Y; // EXACT SAME Y-COORDINATE!

      // Glowing Active Bead on Sine Wave
      ctx.fillStyle = '#4ade80';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(currentWaveX, currentWaveY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // ==========================================
      // THE GOLDEN CONNECTING LASER LINE (CIRCLE TO WAVE)
      // ==========================================
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.moveTo(phasor1X, phasor1Y);
      ctx.lineTo(currentWaveX, currentWaveY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Direct callout on laser line proving the mathematical connection
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      const laserMidX = (phasor1X + currentWaveX) / 2;
      ctx.fillText(
        `y = A sin(φ) = ${(sinValue >= 0 ? '+' : '') + sinValue.toFixed(2)} A`,
        laserMidX,
        phasor1Y - 8
      );

      // Section titles
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Unit Circle Phasor (Rotates at ω)', circleCenterX, 42);
      ctx.fillText('Generated Sine Wave: y = A sin(θ + φ₀)', (waveStartX + waveEndX) / 2, 42);
    }

    // ==========================================
    // TAB: WAVE ANATOMY & SOUND WAVES
    // ==========================================
    else if (activeTab === 'anatomy') {
      const midY = h / 2 - 10;
      const k = (2 * Math.PI) / wavelength;
      const omega = 2 * Math.PI * frequency;

      if (waveType === 'transverse') {
        // Transverse Wave
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(50, midY);
        ctx.lineTo(w - 50, midY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        for (let x = 50; x <= w - 50; x += 2) {
          const y = midY - amplitude * Math.sin(k * (x - 50) - omega * simTime);
          if (x === 50) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        const particleFractions = [0.15, 0.35, 0.55, 0.75];
        particleFractions.forEach((frac, idx) => {
          const px = 50 + frac * (w - 100);
          const py = midY - amplitude * Math.sin(k * (px - 50) - omega * simTime);

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px, midY - amplitude - 12);
          ctx.lineTo(px, midY + amplitude + 12);
          ctx.stroke();

          ctx.fillStyle = idx === 1 ? '#f59e0b' : '#ec4899';
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        if (showLabels) {
          const phaseOffset = (omega * simTime) % (2 * Math.PI);
          let crestX1 = 50 + ((Math.PI / 2 + phaseOffset) / k) % (2 * wavelength);
          if (crestX1 < 80) crestX1 += wavelength;
          const crestX2 = crestX1 + wavelength;
          const troughX = crestX1 + wavelength / 2;

          if (crestX1 < w - 60) {
            ctx.fillStyle = '#4ade80';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('▲ Crest (Peak)', crestX1, midY - amplitude - 14);
            ctx.beginPath();
            ctx.arc(crestX1, midY - amplitude, 4, 0, Math.PI * 2);
            ctx.fill();
          }

          if (troughX < w - 60 && troughX > 60) {
            ctx.fillStyle = '#f87171';
            ctx.font = 'bold 11px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('▼ Trough', troughX, midY + amplitude + 24);
            ctx.beginPath();
            ctx.arc(troughX, midY + amplitude, 4, 0, Math.PI * 2);
            ctx.fill();
          }

          const ampX = 70;
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ampX, midY);
          ctx.lineTo(ampX, midY - amplitude);
          ctx.moveTo(ampX - 6, midY);
          ctx.lineTo(ampX + 6, midY);
          ctx.moveTo(ampX - 6, midY - amplitude);
          ctx.lineTo(ampX + 6, midY - amplitude);
          ctx.stroke();

          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 11px sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(`Amplitude (A = ${(amplitude / 40).toFixed(1)} m)`, ampX - 12, midY - amplitude / 2 + 4);

          if (crestX1 > 50 && crestX2 < w - 50) {
            const bracketY = midY - amplitude - 32;
            ctx.strokeStyle = '#a78bfa';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(crestX1, bracketY);
            ctx.lineTo(crestX2, bracketY);
            ctx.moveTo(crestX1, bracketY - 6);
            ctx.lineTo(crestX1, bracketY + 6);
            ctx.moveTo(crestX2, bracketY - 6);
            ctx.lineTo(crestX2, bracketY + 6);
            ctx.stroke();

            ctx.fillStyle = '#a78bfa';
            ctx.textAlign = 'center';
            ctx.fillText(`Wavelength (λ = ${(wavelength / 80).toFixed(2)} m)`, (crestX1 + crestX2) / 2, bracketY - 8);
          }

          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.textAlign = 'left';
          ctx.font = '10px sans-serif';
          ctx.fillText('Equilibrium Baseline (y = 0)', 60, midY - 6);
        }
      } else {
        // Longitudinal Sound Wave
        const tubeY = midY - 65;
        const tubeH = 130;
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(50, tubeY, w - 100, tubeH);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, tubeY, w - 100, tubeH);

        const cols = 55;
        const rows = 12;
        const spacingX = (w - 120) / cols;
        const spacingY = tubeH / (rows + 1);
        const s0 = 18;

        ctx.fillStyle = '#38bdf8';
        for (let r = 1; r <= rows; r++) {
          const py = tubeY + r * spacingY;
          for (let c = 0; c <= cols; c++) {
            const x0 = 60 + c * spacingX;
            const disp = s0 * Math.sin(k * (x0 - 60) - omega * simTime);
            const px = x0 + disp;

            const densityFactor = -Math.cos(k * (x0 - 60) - omega * simTime);
            ctx.fillStyle = densityFactor > 0.3 ? '#ffffff' : densityFactor < -0.3 ? '#0284c7' : '#38bdf8';
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        const graphY = tubeY + tubeH + 45;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = 50; x <= w - 50; x += 2) {
          const pVal = 25 * Math.cos(k * (x - 50) - omega * simTime);
          const gy = graphY - pVal;
          if (x === 50) ctx.moveTo(x, gy);
          else ctx.lineTo(x, gy);
        }
        ctx.stroke();

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Acoustic Pressure Wave ΔP(x)', 60, graphY - 32);

        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('▲ Compression (High Density, High Pressure)', w / 2 - 120, tubeY - 14);
        ctx.fillStyle = '#38bdf8';
        ctx.fillText('▼ Rarefaction (Low Density, Low Pressure)', w / 2 + 120, tubeY - 14);
      }
    }

    // ==========================================
    // TAB: PIPE RESONANCE & STANDING WAVES
    // ==========================================
    else if (activeTab === 'pipes') {
      const pipeX = 100;
      const pipeW = 600;
      const pipeY = h / 2 - 60;
      const pipeH = 120;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fillRect(pipeX, pipeY, pipeW, pipeH);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(pipeX, pipeY);
      ctx.lineTo(pipeX + pipeW, pipeY);
      ctx.moveTo(pipeX, pipeY + pipeH);
      ctx.lineTo(pipeX + pipeW, pipeY + pipeH);
      ctx.stroke();

      if (pipeType === 'open-closed') {
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(pipeX - 12, pipeY - 6, 14, pipeH + 12);
        ctx.strokeStyle = '#b91c1c';
        ctx.strokeRect(pipeX - 12, pipeY - 6, 14, pipeH + 12);
        ctx.fillStyle = '#fca5a5';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CLOSED', pipeX - 5, pipeY - 14);
      } else {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(pipeX - 6, pipeY - 4, 6, pipeH + 8);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OPEN', pipeX, pipeY - 14);
      }

      if (pipeType === 'string') {
        ctx.fillStyle = '#64748b';
        ctx.fillRect(pipeX + pipeW, pipeY - 6, 12, pipeH + 12);
      } else {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.strokeRect(pipeX + pipeW, pipeY - 4, 6, pipeH + 8);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OPEN', pipeX + pipeW, pipeY - 14);
      }

      const midY = pipeY + pipeH / 2;
      const amp = pipeH * 0.38;
      const timeFactor = Math.cos(2 * Math.PI * 1.5 * simTime);

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      for (let x = 0; x <= pipeW; x += 2) {
        let spatial;
        if (pipeType === 'open-open') {
          spatial = Math.cos((effectiveHarmonicN * Math.PI * x) / pipeW);
        } else if (pipeType === 'open-closed') {
          spatial = Math.sin((effectiveHarmonicN * Math.PI * x) / (2 * pipeW));
        } else {
          spatial = Math.sin((effectiveHarmonicN * Math.PI * x) / pipeW);
        }

        const y = midY - amp * spatial * timeFactor;
        if (x === 0) ctx.moveTo(pipeX + x, y);
        else ctx.lineTo(pipeX + x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = 0; x <= pipeW; x += 2) {
        let spatial;
        if (pipeType === 'open-open') {
          spatial = Math.cos((effectiveHarmonicN * Math.PI * x) / pipeW);
        } else if (pipeType === 'open-closed') {
          spatial = Math.sin((effectiveHarmonicN * Math.PI * x) / (2 * pipeW));
        } else {
          spatial = Math.sin((effectiveHarmonicN * Math.PI * x) / pipeW);
        }
        const y = midY - amp * spatial;
        if (x === 0) ctx.moveTo(pipeX + x, y);
        else ctx.lineTo(pipeX + x, y);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let x = 0; x <= pipeW; x += 2) {
        let spatial;
        if (pipeType === 'open-open') {
          spatial = Math.cos((effectiveHarmonicN * Math.PI * x) / pipeW);
        } else if (pipeType === 'open-closed') {
          spatial = Math.sin((effectiveHarmonicN * Math.PI * x) / (2 * pipeW));
        } else {
          spatial = Math.sin((effectiveHarmonicN * Math.PI * x) / pipeW);
        }
        const y = midY + amp * spatial;
        if (x === 0) ctx.moveTo(pipeX + x, y);
        else ctx.lineTo(pipeX + x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';

      if (pipeType === 'open-open') {
        for (let i = 0; i <= effectiveHarmonicN; i++) {
          const ax = pipeX + (i / effectiveHarmonicN) * pipeW;
          ctx.fillStyle = '#4ade80';
          ctx.fillText('A', ax, pipeY + pipeH + 20);
        }
        for (let i = 0; i < effectiveHarmonicN; i++) {
          const nx = pipeX + ((i + 0.5) / effectiveHarmonicN) * pipeW;
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(nx, midY, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillText('N', nx, pipeY + pipeH + 20);
        }
      } else if (pipeType === 'open-closed') {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(pipeX, midY, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('N (Closed)', pipeX, pipeY + pipeH + 20);

        for (let q = 1; q <= effectiveHarmonicN; q++) {
          const qx = pipeX + (q / effectiveHarmonicN) * pipeW;
          if (q % 2 === 1) {
            ctx.fillStyle = '#4ade80';
            ctx.fillText(q === effectiveHarmonicN ? 'A (Open)' : 'A', qx, pipeY + pipeH + 20);
          } else {
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(qx, midY, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillText('N', qx, pipeY + pipeH + 20);
          }
        }
      }

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Pipe Physical Length L = ${pipeLengthMeters.toFixed(2)} m`, pipeX + pipeW / 2, pipeY - 26);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Legend:  🟢 A = Displacement Antinode (Max air motion)   🔴 N = Displacement Node (Zero motion)`, pipeX + pipeW / 2, h - 25);
    }

    // ==========================================
    // TAB: DOPPLER EFFECT & SONIC BOOM
    // ==========================================
    else if (activeTab === 'doppler') {
      const srcX = dopplerSourceXRef.current;
      const srcY = 190;

      const obsAheadX = w - 60;
      const obsAheadY = srcY;
      const obsRearX = 60;
      const obsRearY = srcY;

      ctx.lineWidth = 1.8;
      dopplerWavefrontsRef.current.forEach((wf) => {
        const alpha = Math.max(0.1, 1 - wf.radius / 700);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.beginPath();
        ctx.arc(wf.x, wf.y, wf.radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      if (isSupersonic) {
        const sinTheta = 1 / machNumber;
        const thetaM = Math.asin(sinTheta);
        const coneLen = 500;

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.moveTo(srcX, srcY);
        ctx.lineTo(srcX - coneLen * Math.cos(thetaM), srcY - coneLen * Math.sin(thetaM));
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(srcX, srcY);
        ctx.lineTo(srcX - coneLen * Math.cos(thetaM), srcY + coneLen * Math.sin(thetaM));
        ctx.stroke();

        ctx.shadowBlur = 0;

        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`Mach Cone (θ = ${machAngleDeg}°)`, srcX - 60, srcY - 45);
        ctx.fillText(`💥 Sonic Boom Shockwave`, srcX - 60, srcY + 55);
      }

      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(obsAheadX, obsAheadY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Observer Ahead', obsAheadX, obsAheadY - 18);
      ctx.fillText(
        isSupersonic ? 'Silent (Before Boom)' : `${dopplerApproachingFreq.toFixed(0)} Hz`,
        obsAheadX,
        obsAheadY + 28
      );

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(obsRearX, obsRearY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('Observer Behind', obsRearX, obsRearY - 18);
      ctx.fillText(`${dopplerRecedingFreq.toFixed(0)} Hz`, obsRearX, obsRearY + 28);

      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(srcX, srcY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(srcX, srcY);
      ctx.lineTo(srcX + 35, srcY);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Source (${sourceSpeed} m/s)`, srcX, srcY - 16);
    }

    // ==========================================
    // TAB: SUPERPOSITION & INTERFERENCE
    // ==========================================
    else if (activeTab === 'superposition') {
      const midY = h / 2;
      const k = (2 * Math.PI) / wavelength;
      const omega = 2 * Math.PI * frequency;
      const phaseRad = (phaseDiffDeg * Math.PI) / 180;
      const a = amplitude * 0.7;

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.55)';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let x = 50; x <= w - 50; x += 3) {
        const y = midY - a * Math.sin(k * (x - 50) - omega * simTime);
        if (x === 50) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 50; x <= w - 50; x += 3) {
        const y = midY - a * Math.sin(k * (x - 50) - omega * simTime + phaseRad);
        if (x === 50) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let x = 50; x <= w - 50; x += 2) {
        const y1 = a * Math.sin(k * (x - 50) - omega * simTime);
        const y2 = a * Math.sin(k * (x - 50) - omega * simTime + phaseRad);
        const yNet = midY - (y1 + y2);
        if (x === 50) ctx.moveTo(x, yNet);
        else ctx.lineTo(x, yNet);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }, [
    activeTab,
    waveType,
    amplitude,
    wavelength,
    frequency,
    showLabels,
    pipeType,
    effectiveHarmonicN,
    pipeLengthMeters,
    displayMode,
    simTime,
    sourceSpeed,
    baseFreq,
    soundSpeedDoppler,
    isSupersonic,
    machNumber,
    machAngleDeg,
    dopplerApproachingFreq,
    dopplerRecedingFreq,
    phaseDiffDeg,
    rotationAngleDeg,
    phaseShiftDeg,
    comparePhaseDiffDeg,
    phaseSubMode,
    currentTotalPhaseDeg,
    sinValue,
  ]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Comprehensive Wave & Sound Mechanics Lab</h3>
          <span className="viz-header__tag">
            {activeTab === 'anatomy'
              ? 'Wave Anatomy'
              : activeTab === 'phase'
              ? 'Unit Circle & Phase'
              : activeTab === 'pipes'
              ? 'Pipe Acoustics'
              : activeTab === 'doppler'
              ? 'Doppler & Sonic Boom'
              : 'Superposition'}
          </span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'anatomy' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('anatomy')}
          >
            Wave Anatomy
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'phase' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('phase')}
          >
            Unit Circle & Phase Angle
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'pipes' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('pipes')}
          >
            Organ Pipes & Standing Waves
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'doppler' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('doppler')}
          >
            Doppler Effect & Mach Cone
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${activeTab === 'superposition' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setActiveTab('superposition')}
          >
            Interference
          </button>
        </div>
      </header>

      {/* METRICS READOUTS */}
      <div className="viz-metrics-bar">
        {activeTab === 'phase' && (
          <>
            <MetricBadge
              label="Phase Angle (φ)"
              value={`${currentTotalPhaseDeg.toFixed(1)}°`}
              unit={`(${(currentTotalPhaseRad / Math.PI).toFixed(2)}π rad)`}
              highlight
            />
            <MetricBadge
              label="Instant Height (y)"
              value={`${(sinValue >= 0 ? '+' : '') + sinValue.toFixed(2)} A`}
              unit="m"
            />
            <MetricBadge label="Wave State" value={phaseLandmarkText} unit="" />
            {phaseSubMode === 'compare-two' ? (
              <MetricBadge
                label="Phase Diff (Δφ)"
                value={`${comparePhaseDiffDeg}°`}
                unit={`(${((comparePhaseDiffDeg / 360) * 1.0).toFixed(2)}λ)`}
              />
            ) : (
              <MetricBadge
                label="Initial Phase (φ₀)"
                value={`${phaseShiftDeg >= 0 ? '+' : ''}${phaseShiftDeg}°`}
                unit=""
              />
            )}
          </>
        )}

        {activeTab === 'anatomy' && (
          <>
            <MetricBadge label="Frequency (f)" value={frequency.toFixed(2)} unit="Hz" />
            <MetricBadge label="Period (T)" value={(1 / frequency).toFixed(2)} unit="s" />
            <MetricBadge label="Wavelength (λ)" value={(wavelength / 80).toFixed(2)} unit="m" />
            <MetricBadge label="Wave Speed (v)" value={(frequency * (wavelength / 80)).toFixed(2)} unit="m/s" highlight />
            <MetricBadge label="Amplitude (A)" value={(amplitude / 40).toFixed(2)} unit="m" />
          </>
        )}

        {activeTab === 'pipes' && (
          <>
            <MetricBadge
              label="Pipe Type"
              value={pipeType === 'open-open' ? 'Open–Open' : pipeType === 'open-closed' ? 'Open–Closed' : 'String'}
              unit=""
            />
            <MetricBadge label="Harmonic Mode" value={`n = ${effectiveHarmonicN}`} unit="" />
            <MetricBadge label="Resonant Freq (fn)" value={resonantFreq.toFixed(1)} unit="Hz" highlight />
            <MetricBadge label="Fundamental (f₁)" value={fundamentalFreq.toFixed(1)} unit="Hz" />
            <MetricBadge label="Wavelength (λn)" value={resonantWavelength.toFixed(2)} unit="m" />
          </>
        )}

        {activeTab === 'doppler' && (
          <>
            <MetricBadge label="Source Speed (vs)" value={sourceSpeed} unit={`m/s (${machNumber.toFixed(2)} Mach)`} />
            <MetricBadge label="Source Pitch (f₀)" value={baseFreq} unit="Hz" />
            <MetricBadge
              label="Observer Ahead"
              value={isSupersonic ? 'Mach Shock' : dopplerApproachingFreq.toFixed(1)}
              unit={isSupersonic ? '' : 'Hz (Higher)'}
              highlight
            />
            <MetricBadge label="Observer Behind" value={dopplerRecedingFreq.toFixed(1)} unit="Hz (Lower)" />
            {isSupersonic && (
              <MetricBadge label="Mach Cone Angle (θ)" value={machAngleDeg} unit="°" />
            )}
          </>
        )}

        {activeTab === 'superposition' && (
          <>
            <MetricBadge label="Phase Offset (Δφ)" value={`${phaseDiffDeg}°`} unit="" highlight />
            <MetricBadge
              label="Interference State"
              value={phaseDiffDeg === 0 || phaseDiffDeg === 360 ? 'Constructive' : phaseDiffDeg === 180 ? 'Destructive' : 'Partial'}
              unit=""
            />
          </>
        )}
      </div>

      {/* CANVAS DISPLAY */}
      <div className="viz-canvas-area" style={{ height: 420 }}>
        <canvas ref={canvasRef} width={800} height={420} />
      </div>

      {/* CONTROLS PANEL */}
      <div className="viz-controls-panel">
        {/* TAB: PHASE ANGLE & UNIT CIRCLE CONTROLS */}
        {activeTab === 'phase' && (
          <>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`viz-btn ${phaseSubMode === 'single' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => {
                  setPhaseSubMode('single');
                  setPhaseShiftDeg(0);
                }}
              >
                Single Wave (How Circle Generates Sine)
              </button>
              <button
                type="button"
                className={`viz-btn ${phaseSubMode === 'phase-shift' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setPhaseSubMode('phase-shift')}
              >
                Initial Phase Shift (φ₀: Sine vs. Cosine)
              </button>
              <button
                type="button"
                className={`viz-btn ${phaseSubMode === 'compare-two' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setPhaseSubMode('compare-two')}
              >
                Compare Two Waves (Read Phase Difference Δφ)
              </button>
            </div>

            {/* Quick Landmark Jump Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', margin: '0.25rem 0' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Jump to Phase Landmark:
              </span>
              <button
                type="button"
                className="viz-speed-btn"
                onClick={() => {
                  setRotationAngleDeg(0);
                  setIsPlaying(false);
                }}
              >
                0° (Zero Rising)
              </button>
              <button
                type="button"
                className="viz-speed-btn"
                onClick={() => {
                  setRotationAngleDeg(90);
                  setIsPlaying(false);
                }}
              >
                90° (Peak Crest)
              </button>
              <button
                type="button"
                className="viz-speed-btn"
                onClick={() => {
                  setRotationAngleDeg(180);
                  setIsPlaying(false);
                }}
              >
                180° (Zero Falling)
              </button>
              <button
                type="button"
                className="viz-speed-btn"
                onClick={() => {
                  setRotationAngleDeg(270);
                  setIsPlaying(false);
                }}
              >
                270° (Trough)
              </button>
            </div>

            <div className="viz-sliders-grid">
              <SliderControl
                label="Scrub Phasor Angle (θ)"
                value={rotationAngleDeg}
                min={0}
                max={360}
                step={1}
                unit="°"
                onChange={(deg) => {
                  setRotationAngleDeg(deg);
                  setIsPlaying(false);
                }}
              />

              {phaseSubMode === 'phase-shift' && (
                <SliderControl
                  label="Initial Phase Shift (φ₀)"
                  value={phaseShiftDeg}
                  min={-180}
                  max={180}
                  step={15}
                  unit="° (90° = Cosine)"
                  onChange={setPhaseShiftDeg}
                />
              )}

              {phaseSubMode === 'compare-two' && (
                <SliderControl
                  label="Phase Difference (Δφ)"
                  value={comparePhaseDiffDeg}
                  min={0}
                  max={360}
                  step={15}
                  unit="°"
                  onChange={setComparePhaseDiffDeg}
                />
              )}
            </div>
          </>
        )}

        {/* TAB: ANATOMY CONTROLS */}
        {activeTab === 'anatomy' && (
          <>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`viz-btn ${waveType === 'transverse' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setWaveType('transverse')}
              >
                Transverse Wave
              </button>
              <button
                type="button"
                className={`viz-btn ${waveType === 'longitudinal' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setWaveType('longitudinal')}
              >
                Longitudinal Sound Wave (Compressions & Rarefactions)
              </button>
              {waveType === 'transverse' && (
                <button
                  type="button"
                  className="viz-btn viz-btn--secondary"
                  onClick={() => setShowLabels((l) => !l)}
                >
                  {showLabels ? 'Hide Labels' : 'Show Anatomy Labels'}
                </button>
              )}
            </div>

            <div className="viz-sliders-grid">
              <SliderControl
                label="Frequency (f)"
                value={frequency}
                min={0.5}
                max={3.0}
                step={0.1}
                unit="Hz"
                onChange={setFrequency}
              />
              <SliderControl
                label="Wavelength (λ)"
                value={wavelength}
                min={100}
                max={320}
                step={10}
                unit="px"
                onChange={setWavelength}
              />
              <SliderControl
                label="Amplitude (A)"
                value={amplitude}
                min={20}
                max={70}
                step={5}
                unit="px"
                onChange={setAmplitude}
              />
            </div>
          </>
        )}

        {/* TAB: PIPE ACOUSTICS */}
        {activeTab === 'pipes' && (
          <>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`viz-btn ${pipeType === 'open-open' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => {
                  setPipeType('open-open');
                  setHarmonicIndex(1);
                }}
              >
                Open–Open Pipe (Flute / Open Tube)
              </button>
              <button
                type="button"
                className={`viz-btn ${pipeType === 'open-closed' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => {
                  setPipeType('open-closed');
                  setHarmonicIndex(1);
                }}
              >
                Open–Closed Pipe (Clarinet / Closed Tube)
              </button>
              <button
                type="button"
                className={`viz-btn ${pipeType === 'string' ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => {
                  setPipeType('string');
                  setHarmonicIndex(1);
                }}
              >
                String (Fixed Ends)
              </button>
            </div>

            <div className="viz-sliders-grid">
              <SliderControl
                label={pipeType === 'open-closed' ? 'Harmonic Mode (m: Odd Only)' : 'Harmonic Mode (n)'}
                value={harmonicIndex}
                min={1}
                max={4}
                step={1}
                formatValue={(idx) =>
                  pipeType === 'open-closed'
                    ? `m = ${[1, 3, 5, 7][idx - 1]} (${['Fundamental', '1st Overtone', '2nd Overtone', '3rd Overtone'][idx - 1]})`
                    : `n = ${idx} (${['Fundamental', '2nd Harmonic (Octave)', '3rd Harmonic', '4th Harmonic'][idx - 1]})`
                }
                onChange={setHarmonicIndex}
              />
              <SliderControl
                label="Pipe Length (L)"
                value={pipeLengthMeters}
                min={0.5}
                max={2.5}
                step={0.1}
                unit="m"
                onChange={setPipeLengthMeters}
              />
              <SliderControl
                label="Gas Speed of Sound (v)"
                value={soundSpeedInGas}
                min={250}
                max={1000}
                step={10}
                unit="m/s (Air: 343, Helium: 965)"
                onChange={setSoundSpeedInGas}
              />
            </div>
          </>
        )}

        {/* TAB: DOPPLER */}
        {activeTab === 'doppler' && (
          <>
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`viz-btn ${sourceSpeed === 0 ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setSourceSpeed(0)}
              >
                Stationary (0 m/s)
              </button>
              <button
                type="button"
                className={`viz-btn ${sourceSpeed === 120 ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setSourceSpeed(120)}
              >
                Fast Car (120 m/s / M=0.35)
              </button>
              <button
                type="button"
                className={`viz-btn ${sourceSpeed === 340 ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setSourceSpeed(340)}
              >
                Mach 1.0 (Sound Barrier)
              </button>
              <button
                type="button"
                className={`viz-btn ${sourceSpeed === 460 ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
                onClick={() => setSourceSpeed(460)}
              >
                Supersonic Jet (Mach 1.35)
              </button>
            </div>

            <div className="viz-sliders-grid">
              <SliderControl
                label="Source Emitter Speed (vs)"
                value={sourceSpeed}
                min={0}
                max={500}
                step={10}
                unit={`m/s (${machNumber.toFixed(2)} Mach)`}
                onChange={setSourceSpeed}
              />
              <SliderControl
                label="Emitted Frequency (f₀)"
                value={baseFreq}
                min={200}
                max={600}
                step={20}
                unit="Hz"
                onChange={setBaseFreq}
              />
            </div>
          </>
        )}

        {/* TAB: SUPERPOSITION */}
        {activeTab === 'superposition' && (
          <div className="viz-sliders-grid">
            <SliderControl
              label="Phase Difference (Δφ)"
              value={phaseDiffDeg}
              min={0}
              max={360}
              step={5}
              unit="°"
              onChange={setPhaseDiffDeg}
            />
            <SliderControl
              label="Wave Amplitude"
              value={amplitude}
              min={20}
              max={60}
              step={5}
              unit="px"
              onChange={setAmplitude}
            />
          </div>
        )}

        <PlaybackBar
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onReset={handleReset}
          speed={simSpeed}
          onSpeedChange={setSimSpeed}
        />

        {activeTab === 'phase' && (
          <div className="viz-hint">
            🔄 <strong>How to Read Phase Angle from a Sine Wave:</strong>
            <br />
            Look at the green dashed laser line connecting the unit circle phasor to the sine wave. Notice that <strong>the height on the wave y = A · sin(φ) is precisely the vertical coordinate of the point on the unit circle</strong>!
            <ul style={{ margin: '0.5rem 0 0.25rem', paddingLeft: '1.25rem' }}>
              <li><strong>Peak Crest (y = +A)</strong>: Phase angle is <strong>90° (π/2 rad)</strong>.</li>
              <li><strong>Zero crossing downward (y = 0)</strong>: Phase angle is <strong>180° (π rad)</strong>.</li>
              <li><strong>Trough (y = -A)</strong>: Phase angle is <strong>270° (3π/2 rad)</strong>.</li>
              <li><strong>Zero crossing upward (y = 0)</strong>: Phase angle is <strong>0° (0 rad or 360° / 2π)</strong>.</li>
              <li><strong>Phase Difference (Δφ) between two waves</strong>: Measure the horizontal crest-to-crest distance Δx. Then Δφ = 2π · (Δx / λ) = 360° · (Δx / λ)!</li>
            </ul>
          </div>
        )}

        {activeTab === 'anatomy' && (
          <div className="viz-hint">
            📐 <strong>Wave Anatomy:</strong> Toggle between Transverse and Longitudinal. In Transverse mode, check the Crest (maximum positive height), Trough (lowest point), Amplitude A (distance from equilibrium to peak), and Wavelength λ (crest-to-crest distance). In Longitudinal mode, watch how vibrating particles cluster to form traveling Compressions and Rarefactions!
          </div>
        )}

        {activeTab === 'pipes' && (
          <div className="viz-hint">
            🎷 <strong>Open vs. Closed Pipe Physics:</strong> An Open–Closed pipe has a closed wall on the left (forcing a displacement node N = zero motion) and an open mouth on the right (displacement antinode A). Because only odd quarter-wavelengths can satisfy this, <em>even harmonics (2, 4, 6...) are completely forbidden</em>! Also notice that an open-closed pipe sounds an entire octave lower than an open-open pipe of the identical length.
          </div>
        )}

        {activeTab === 'doppler' && (
          <div className="viz-hint">
            🔊 <strong>Doppler Shift & Sonic Boom:</strong> Watch how wavefronts bunch tightly ahead of the moving source and spread out behind. When you push the speed past 340 m/s (Mach &gt; 1), the wavefronts can no longer outrun the source and coalesce into the red V-shaped Mach Cone shockwave—the source of a Sonic Boom!
          </div>
        )}
      </div>
    </div>
  );
}
