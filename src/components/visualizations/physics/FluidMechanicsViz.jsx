import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function FluidMechanicsViz() {
  const [tab, setTab] = useState('buoyancy'); // 'buoyancy' | 'venturi'

  // Buoyancy state
  const [fluidDensity, setFluidDensity] = useState(1000); // kg/m³ (water)
  const [objDensity, setObjDensity] = useState(700); // kg/m³ (wood)
  const [objVolume, setObjVolume] = useState(0.005); // m³ (5 liters)
  const [depth, setDepth] = useState(1.5); // meters

  // Venturi tube state
  const [pipeArea1, setPipeArea1] = useState(100); // cm²
  const [pipeArea2, setPipeArea2] = useState(30); // cm²
  const [velocity1, setVelocity1] = useState(1.2); // m/s
  const [fluidType, setFluidType] = useState('water'); // 'water' (1000) or 'air' (1.2)

  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  const g = 9.81;

  // Derived Buoyancy Metrics
  const objMass = objDensity * objVolume;
  const gravityForce = objMass * g;
  const submergedRatio = Math.min(1, Math.max(0, objDensity / fluidDensity));
  const submergedVolume = objVolume * submergedRatio;
  const buoyantForce = fluidDensity * g * (objDensity >= fluidDensity ? objVolume : submergedVolume);
  const netForce = buoyantForce - gravityForce;
  const hydrostaticPressure = fluidDensity * g * depth;

  // Derived Venturi Metrics
  const rhoVenturi = fluidType === 'water' ? 1000 : 1.225;
  const a1_m2 = pipeArea1 * 1e-4;
  const a2_m2 = pipeArea2 * 1e-4;
  const flowRate_Q = a1_m2 * velocity1; // m³/s
  const velocity2 = flowRate_Q / a2_m2;
  const pressureDrop_Pa = 0.5 * rhoVenturi * (velocity2 * velocity2 - velocity1 * velocity1);
  const manometerDiff_cm = Math.min(60, (pressureDrop_Pa / (1000 * g)) * 100);

  // Initialize particles for Venturi flow
  useEffect(() => {
    const pts = [];
    for (let i = 0; i < 70; i++) {
      pts.push({
        x: Math.random() * 800,
        yNorm: Math.random() * 0.8 + 0.1, // normalized vertical position across tube
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = pts;
  }, []);

  // Animation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time) => {
      const dt = ((time - lastTime) / 1000) * simSpeed;
      lastTime = time;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      if (tab === 'buoyancy') {
        // Draw Buoyancy Tank
        const tankX = 220;
        const tankY = 50;
        const tankW = 360;
        const tankH = 260;
        const liquidLevel = tankY + 40;

        // Tank Background / Water
        ctx.fillStyle = 'rgba(14, 165, 233, 0.15)';
        ctx.fillRect(tankX, liquidLevel, tankW, tankH - (liquidLevel - tankY));

        // Tank Outline
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(tankX, tankY);
        ctx.lineTo(tankX, tankY + tankH);
        ctx.lineTo(tankX + tankW, tankY + tankH);
        ctx.lineTo(tankX + tankW, tankY);
        ctx.stroke();

        // Liquid Surface Line with small ripples
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tankX, liquidLevel);
        const waveOffset = isPlaying ? (time * 0.003) : 0;
        for (let x = 0; x <= tankW; x += 10) {
          const wy = liquidLevel + Math.sin(x * 0.05 + waveOffset) * 2;
          ctx.lineTo(tankX + x, wy);
        }
        ctx.stroke();

        // Draw Immersed Block
        const blockSize = 90;
        const blockX = tankX + tankW / 2 - blockSize / 2;
        let blockY;

        if (objDensity < fluidDensity) {
          // Floating: partially submerged
          const submergedH = blockSize * submergedRatio;
          blockY = liquidLevel - (blockSize - submergedH);
        } else if (Math.abs(objDensity - fluidDensity) < 10) {
          // Neutral: middle
          blockY = liquidLevel + 60;
        } else {
          // Sinks: resting on tank bottom
          blockY = tankY + tankH - blockSize - 4;
        }

        // Draw Block
        ctx.fillStyle = objDensity < fluidDensity ? '#fbbf24' : '#94a3b8';
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.fillRect(blockX, blockY, blockSize, blockSize);
        ctx.strokeRect(blockX, blockY, blockSize, blockSize);

        // Block label
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${objDensity} kg/m³`, blockX + blockSize / 2, blockY + blockSize / 2 - 4);
        ctx.font = '11px sans-serif';
        ctx.fillText(objDensity < fluidDensity ? 'FLOATING' : 'SINKING', blockX + blockSize / 2, blockY + blockSize / 2 + 14);

        // Draw Force Vectors
        const cx = blockX + blockSize / 2;
        const cy = blockY + blockSize / 2;

        // Gravity arrow (downward)
        const fgLen = Math.min(80, Math.max(20, gravityForce * 0.8));
        ctx.strokeStyle = '#ef4444';
        ctx.fillStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 15, cy);
        ctx.lineTo(cx - 15, cy + fgLen);
        ctx.stroke();
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(cx - 15, cy + fgLen);
        ctx.lineTo(cx - 20, cy + fgLen - 8);
        ctx.lineTo(cx - 10, cy + fgLen - 8);
        ctx.fill();
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`W = ${gravityForce.toFixed(1)} N`, cx - 35, cy + fgLen / 2);

        // Buoyant arrow (upward)
        const fbLen = Math.min(80, Math.max(20, buoyantForce * 0.8));
        ctx.strokeStyle = '#10b981';
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.moveTo(cx + 15, cy);
        ctx.lineTo(cx + 15, cy - fbLen);
        ctx.stroke();
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(cx + 15, cy - fbLen);
        ctx.lineTo(cx + 10, cy - fbLen + 8);
        ctx.lineTo(cx + 20, cy - fbLen + 8);
        ctx.fill();
        ctx.fillText(`Fb = ${buoyantForce.toFixed(1)} N`, cx + 35, cy - fbLen / 2);

        // Hydrostatic depth indicator
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(tankX - 25, liquidLevel);
        ctx.lineTo(tankX - 25, tankY + tankH);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#475569';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(`h = ${depth} m`, tankX - 35, (liquidLevel + tankY + tankH) / 2);
        ctx.fillText(`P_gauge = ${(hydrostaticPressure / 1000).toFixed(1)} kPa`, tankX - 35, (liquidLevel + tankY + tankH) / 2 + 16);
      } else {
        // Draw Venturi Tube Flow
        const leftH = 140;
        const rightH = 140;
        const throatH = Math.max(40, (pipeArea2 / pipeArea1) * leftH);

        const xInlet = 100;
        const xThroatStart = 330;
        const xThroatEnd = 470;
        const xOutlet = 700;
        const centerY = 190;

        // Pipe Upper Contour
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(xInlet, centerY - leftH / 2);
        ctx.lineTo(xThroatStart, centerY - throatH / 2);
        ctx.lineTo(xThroatEnd, centerY - throatH / 2);
        ctx.lineTo(xOutlet, centerY - rightH / 2);
        ctx.stroke();

        // Pipe Lower Contour
        ctx.beginPath();
        ctx.moveTo(xInlet, centerY + leftH / 2);
        ctx.lineTo(xThroatStart, centerY + throatH / 2);
        ctx.lineTo(xThroatEnd, centerY + throatH / 2);
        ctx.lineTo(xOutlet, centerY + rightH / 2);
        ctx.stroke();

        // Pipe Background Fluid Tint
        ctx.fillStyle = fluidType === 'water' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(241, 245, 249, 0.05)';
        ctx.beginPath();
        ctx.moveTo(xInlet, centerY - leftH / 2);
        ctx.lineTo(xThroatStart, centerY - throatH / 2);
        ctx.lineTo(xThroatEnd, centerY - throatH / 2);
        ctx.lineTo(xOutlet, centerY - rightH / 2);
        ctx.lineTo(xOutlet, centerY + rightH / 2);
        ctx.lineTo(xThroatEnd, centerY + throatH / 2);
        ctx.lineTo(xThroatStart, centerY + throatH / 2);
        ctx.lineTo(xInlet, centerY + leftH / 2);
        ctx.closePath();
        ctx.fill();

        // Manometer Tubes (Vertical Pressure columns)
        const mano1X = 220;
        const mano2X = 400;
        const manoW = 24;

        // Manometer 1 (Inlet - High Pressure)
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 2;
        ctx.strokeRect(mano1X - manoW / 2, centerY - leftH / 2 - 110, manoW, 110);
        ctx.fillStyle = '#0ea5e9';
        const h1 = 90;
        ctx.fillRect(mano1X - manoW / 2 + 1, centerY - leftH / 2 - h1, manoW - 2, h1);

        // Manometer 2 (Throat - Low Pressure due to high velocity!)
        ctx.strokeRect(mano2X - manoW / 2, centerY - throatH / 2 - 110, manoW, 110);
        const h2 = Math.max(10, h1 - manometerDiff_cm * 1.4);
        ctx.fillRect(mano2X - manoW / 2 + 1, centerY - throatH / 2 - h2, manoW - 2, h2);

        // Pressure Drop Label
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Δh = ${(manometerDiff_cm).toFixed(1)} cm`, (mano1X + mano2X) / 2, centerY - leftH / 2 - 90);
        ctx.fillText(`ΔP = ${(pressureDrop_Pa).toFixed(0)} Pa`, (mano1X + mano2X) / 2, centerY - leftH / 2 - 74);

        // Move and render fluid streamline particles
        ctx.fillStyle = fluidType === 'water' ? '#38bdf8' : '#94a3b8';
        particlesRef.current.forEach((pt) => {
          // Speed depends on position
          let localSpeed = velocity1 * 80;
          let currentH = leftH;
          if (pt.x > xThroatStart && pt.x < xThroatEnd) {
            localSpeed = velocity2 * 80;
            currentH = throatH;
          } else if (pt.x <= xThroatStart) {
            currentH = leftH;
          } else {
            currentH = rightH;
          }

          if (isPlaying) {
            pt.x += localSpeed * dt;
            if (pt.x > xOutlet) {
              pt.x = xInlet;
            }
          }

          const py = centerY - currentH / 2 + pt.yNorm * currentH;
          ctx.beginPath();
          ctx.arc(pt.x, py, 3, 0, Math.PI * 2);
          ctx.fill();
        });

        // Speed Labels
        ctx.fillStyle = '#0284c7';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`v₁ = ${velocity1.toFixed(2)} m/s`, mano1X, centerY + leftH / 2 + 25);
        ctx.fillText(`A₁ = ${pipeArea1} cm²`, mano1X, centerY + leftH / 2 + 42);

        ctx.fillStyle = '#f59e0b';
        ctx.fillText(`v₂ = ${velocity2.toFixed(2)} m/s`, mano2X, centerY + throatH / 2 + 25);
        ctx.fillText(`A₂ = ${pipeArea2} cm²`, mano2X, centerY + throatH / 2 + 42);
      }

      if (isPlaying) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [tab, fluidDensity, objDensity, objVolume, depth, pipeArea1, pipeArea2, velocity1, fluidType, isPlaying, simSpeed]);

  return (
    <div className="viz-card">
      <div className="viz-tabs">
        <button
          className={`viz-tab-btn ${tab === 'buoyancy' ? 'active' : ''}`}
          onClick={() => setTab('buoyancy')}
        >
          🚢 Hydrostatic Tank & Buoyancy
        </button>
        <button
          className={`viz-tab-btn ${tab === 'venturi' ? 'active' : ''}`}
          onClick={() => setTab('venturi')}
        >
          🌊 Venturi Tube & Bernoulli Flow
        </button>
      </div>

      <div className="viz-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={800}
          height={360}
          className="viz-canvas"
        />
      </div>

      <PlaybackBar
        isPlaying={isPlaying}
        onPlayToggle={() => setIsPlaying(!isPlaying)}
        onReset={() => {
          if (tab === 'buoyancy') {
            setFluidDensity(1000);
            setObjDensity(700);
            setObjVolume(0.005);
            setDepth(1.5);
          } else {
            setPipeArea1(100);
            setPipeArea2(30);
            setVelocity1(1.2);
          }
        }}
        simSpeed={simSpeed}
        onSpeedChange={setSimSpeed}
      />

      <div className="viz-metrics-bar">
        {tab === 'buoyancy' ? (
          <>
            <MetricBadge
              label="Buoyant Force Fb"
              value={`${buoyantForce.toFixed(1)} N`}
              color="emerald"
            />
            <MetricBadge
              label="Object Weight W"
              value={`${gravityForce.toFixed(1)} N`}
              color="rose"
            />
            <MetricBadge
              label="Submerged Ratio"
              value={`${(submergedRatio * 100).toFixed(0)}%`}
              color="amber"
            />
            <MetricBadge
              label="Base Gauge Pressure"
              value={`${(hydrostaticPressure / 1000).toFixed(1)} kPa`}
              color="sky"
            />
          </>
        ) : (
          <>
            <MetricBadge
              label="Inlet Velocity v₁"
              value={`${velocity1.toFixed(2)} m/s`}
              color="sky"
            />
            <MetricBadge
              label="Throat Velocity v₂"
              value={`${velocity2.toFixed(2)} m/s`}
              color="amber"
            />
            <MetricBadge
              label="Flow Rate Q"
              value={`${(flowRate_Q * 1000).toFixed(1)} L/s`}
              color="emerald"
            />
            <MetricBadge
              label="Venturi Pressure Drop"
              value={`${pressureDrop_Pa.toFixed(0)} Pa`}
              color="rose"
            />
          </>
        )}
      </div>

      <div className="viz-controls-grid">
        {tab === 'buoyancy' ? (
          <>
            <SliderControl
              label="Surrounding Fluid Density (ρ_fluid)"
              value={fluidDensity}
              min={700}
              max={1400}
              step={20}
              unit=" kg/m³"
              onChange={setFluidDensity}
            />
            <SliderControl
              label="Object Density (ρ_obj)"
              value={objDensity}
              min={200}
              max={1500}
              step={25}
              unit=" kg/m³"
              onChange={setObjDensity}
            />
            <SliderControl
              label="Object Volume (V)"
              value={objVolume * 1000}
              min={1}
              max={20}
              step={0.5}
              unit=" Liters"
              onChange={(val) => setObjVolume(val / 1000)}
            />
            <SliderControl
              label="Tank Depth (h)"
              value={depth}
              min={0.5}
              max={5}
              step={0.25}
              unit=" m"
              onChange={setDepth}
            />
          </>
        ) : (
          <>
            <SliderControl
              label="Inlet Pipe Area (A₁)"
              value={pipeArea1}
              min={50}
              max={150}
              step={5}
              unit=" cm²"
              onChange={setPipeArea1}
            />
            <SliderControl
              label="Throat Constriction Area (A₂)"
              value={pipeArea2}
              min={15}
              max={pipeArea1 - 10}
              step={5}
              unit=" cm²"
              onChange={setPipeArea2}
            />
            <SliderControl
              label="Inlet Flow Velocity (v₁)"
              value={velocity1}
              min={0.2}
              max={3.0}
              step={0.1}
              unit=" m/s"
              onChange={setVelocity1}
            />
            <div className="viz-control-item">
              <label className="viz-control-label">Fluid Medium</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button
                  className={`viz-tab-btn ${fluidType === 'water' ? 'active' : ''}`}
                  onClick={() => setFluidType('water')}
                >
                  💧 Water (1000 kg/m³)
                </button>
                <button
                  className={`viz-tab-btn ${fluidType === 'air' ? 'active' : ''}`}
                  onClick={() => setFluidType('air')}
                >
                  💨 Air (1.2 kg/m³)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
