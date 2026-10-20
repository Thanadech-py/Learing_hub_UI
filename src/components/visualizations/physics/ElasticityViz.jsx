import { useState, useEffect, useRef } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

const MATERIALS = {
  steel: {
    name: 'Structural Steel (ASTM A36)',
    nameTh: 'เหล็กโครงสร้าง (Steel)',
    Y: 200e9, // Pa
    G: 75e9, // Pa
    B: 160e9, // Pa
    nu: 0.30,
    alpha: 12e-6, // /°C
    color: '#38bdf8',
  },
  titanium: {
    name: 'Titanium Alloy (Ti-6Al-4V)',
    nameTh: 'ไทเทเนียมอัลลอยด์ (Titanium)',
    Y: 110e9,
    G: 42e9,
    B: 110e9,
    nu: 0.34,
    alpha: 8.6e-6,
    color: '#a78bfa',
  },
  aluminum: {
    name: 'Aluminum 6061-T6',
    nameTh: 'อลูมิเนียม (Aluminum)',
    Y: 70e9,
    G: 26e9,
    B: 70e9,
    nu: 0.33,
    alpha: 23e-6,
    color: '#34d399',
  },
  brass: {
    name: 'Cartridge Brass (70/30)',
    nameTh: 'ทองเหลือง (Brass)',
    Y: 100e9,
    G: 38e9,
    B: 110e9,
    nu: 0.35,
    alpha: 19e-6,
    color: '#fbbf24',
  },
  rubber: {
    name: 'Natural Polymer Rubber',
    nameTh: 'ยางสังเคราะห์ (Rubber)',
    Y: 0.05e9, // 50 MPa
    G: 0.017e9,
    B: 2.0e9,
    nu: 0.499, // virtually incompressible
    alpha: 200e-6,
    color: '#f43f5e',
  },
};

export default function ElasticityViz() {
  const [mode, setMode] = useState('tensile'); // 'tensile' | 'shear' | 'thermal'
  const [materialKey, setMaterialKey] = useState('steel');

  // Tensile parameters
  const [forceKN, setForceKN] = useState(25); // kN
  const [lengthM, setLengthM] = useState(2.0); // meters
  const [areaMM2, setAreaMM2] = useState(100); // mm²

  // Shear parameters
  const [shearForceKN, setShearForceKN] = useState(15);
  const [shearHeightMM, setShearHeightMM] = useState(80);
  const [shearAreaCM2, setShearAreaCM2] = useState(20);

  // Thermal parameters
  const [deltaTempC, setDeltaTempC] = useState(40); // °C

  const canvasRef = useRef(null);
  const mat = MATERIALS[materialKey] || MATERIALS.steel;

  // Derived Tensile Metrics
  const forceN = forceKN * 1e3;
  const areaM2 = areaMM2 * 1e-6;
  const stressPa = forceN / areaM2;
  const stressMPa = stressPa / 1e6;
  const strain = stressPa / mat.Y;
  const elongationM = strain * lengthM;
  const elongationMM = elongationM * 1e3;
  const lateralStrain = -mat.nu * strain;
  const initialDiaMM = Math.sqrt((4 * areaMM2) / Math.PI);
  const finalDiaMM = initialDiaMM * (1 + lateralStrain);
  const deltaDiaMM = finalDiaMM - initialDiaMM;
  const strainEnergyJ = 0.5 * forceN * elongationM;
  const kEquivalentKNmm = (mat.Y * areaM2) / (lengthM * 1e6); // kN/mm

  // Derived Shear Metrics
  const shearFN = shearForceKN * 1e3;
  const shearAM2 = shearAreaCM2 * 1e-4;
  const shearStressPa = shearFN / shearAM2;
  const shearStressMPa = shearStressPa / 1e6;
  const shearStrainRad = shearStressPa / mat.G;
  const shearDeflectionMM = (shearHeightMM * 1e-3 * shearStrainRad) * 1e3;

  // Derived Thermal Stress Metrics
  const thermalStressPa = mat.Y * mat.alpha * deltaTempC;
  const thermalStressMPa = thermalStressPa / 1e6;
  const thermalForceKN = (thermalStressPa * areaM2) / 1e3;

  // Canvas drawing effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    if (mode === 'tensile') {
      // 1. Draw Tensile Specimen on Left
      const rodLeft = 60;
      const rodY = 90;
      const baseRodLen = 220;
      const baseRodThick = 40;

      // Exaggerated visual deformation for clear illustration
      const visualDeltaL = Math.max(-30, Math.min(80, strain * 12000));
      const visualDeltaThick = Math.max(-14, Math.min(10, lateralStrain * 12000));

      const curRodLen = baseRodLen + visualDeltaL;
      const curRodThick = Math.max(8, baseRodThick + visualDeltaThick);

      // Support wall
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(rodLeft - 20, rodY - 35, 20, 110);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(rodLeft - 20, rodY - 35, 20, 110);

      // Wall hatch lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      for (let y = rodY - 30; y < rodY + 70; y += 10) {
        ctx.beginPath();
        ctx.moveTo(rodLeft - 20, y);
        ctx.lineTo(rodLeft, y + 10);
        ctx.stroke();
      }

      // Specimen rod body
      const grad = ctx.createLinearGradient(0, rodY, 0, rodY + curRodThick);
      grad.addColorStop(0, mat.color);
      grad.addColorStop(0.5, '#ffffff');
      grad.addColorStop(1, mat.color);

      ctx.fillStyle = grad;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.roundRect(rodLeft, rodY, curRodLen, curRodThick, 4);
      ctx.fill();
      ctx.globalAlpha = 1.0;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Original length ghost outline (dashed)
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.strokeRect(rodLeft, rodY - (visualDeltaThick / 2), baseRodLen, baseRodThick);
      ctx.restore();

      // Tensile Pull Arrows on Right end
      const rightEnd = rodLeft + curRodLen;
      const arrowY = rodY + curRodThick / 2;
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(rightEnd + 5, arrowY);
      ctx.lineTo(rightEnd + 45, arrowY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(rightEnd + 45, arrowY);
      ctx.lineTo(rightEnd + 33, arrowY - 7);
      ctx.lineTo(rightEnd + 33, arrowY + 7);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 12px var(--font-mono, monospace)';
      ctx.fillText(`F = ${forceKN.toFixed(1)} kN`, rightEnd + 8, arrowY - 14);

      // Elongation dimension marker
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(rodLeft + baseRodLen, rodY + baseRodThick + 25);
      ctx.lineTo(rightEnd, rodY + baseRodThick + 25);
      ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.font = '11px var(--font-sans, sans-serif)';
      ctx.textAlign = 'center';
      ctx.fillText(`ΔL = ${elongationMM.toFixed(3)} mm`, (rodLeft + baseRodLen + rightEnd) / 2, rodY + baseRodThick + 40);
      ctx.textAlign = 'left';

      // 2. Draw Stress-Strain (σ - ε) Curve on Right side
      const plotX = 390;
      const plotY = 40;
      const plotW = 210;
      const plotH = 140;

      // Plot background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(plotX, plotY, plotW, plotH);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.strokeRect(plotX, plotY, plotW, plotH);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      for (let gx = plotX + 40; gx < plotX + plotW; gx += 40) {
        ctx.moveTo(gx, plotY);
        ctx.lineTo(gx, plotY + plotH);
      }
      for (let gy = plotY + 30; gy < plotY + plotH; gy += 30) {
        ctx.moveTo(plotX, gy);
        ctx.lineTo(plotX + plotW, gy);
      }
      ctx.stroke();

      // Elastic Hookean Slope Line (slope = Y)
      const slopeScaled = (mat.Y / 200e9) * (plotH / plotW) * 0.95;
      const lineEndX = plotX + plotW - 15;
      const lineEndY = plotY + plotH - (lineEndX - plotX) * slopeScaled;

      ctx.strokeStyle = mat.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(plotX, plotY + plotH);
      ctx.lineTo(lineEndX, Math.max(plotY + 5, lineEndY));
      ctx.stroke();

      // Current Operating Point Dot
      const ptStrainFrac = Math.min(1, Math.max(0, (strain * 1e3) / 2.5)); // scaled 0 to 2.5 microstrain
      const dotX = plotX + ptStrainFrac * (plotW - 20);
      const dotY = plotY + plotH - ptStrainFrac * (plotW - 20) * slopeScaled;

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(dotX, dotY, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Axis Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px var(--font-mono, monospace)';
      ctx.fillText('σ (Stress, MPa)', plotX + 8, plotY + 16);
      ctx.fillText('ε (Strain)', plotX + plotW - 55, plotY + plotH - 6);
      ctx.fillText(`Slope = Y (${(mat.Y / 1e9).toFixed(0)} GPa)`, plotX + 10, plotY + 34);

      // Operating point readout
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px var(--font-sans, sans-serif)';
      ctx.fillText(`σ = ${stressMPa.toFixed(1)} MPa`, dotX + 8, dotY - 6);
    } else if (mode === 'shear') {
      // Draw Shear Deformation Block
      const bx = 140;
      const by = 80;
      const bw = 160;
      const bh = 110;
      const skewX = Math.max(-40, Math.min(70, shearDeflectionMM * 18));

      // Fixed Ground Foundation
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(bx - 30, by + bh, bw + 60, 25);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx - 30, by + bh, bw + 60, 25);

      // Hatch lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      for (let x = bx - 25; x < bx + bw + 45; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, by + bh);
        ctx.lineTo(x + 10, by + bh + 25);
        ctx.stroke();
      }

      // Original rectangle ghost
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.strokeRect(bx, by, bw, bh);
      ctx.restore();

      // Skewed Deformed Parallelogram
      ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
      ctx.strokeStyle = mat.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(bx + skewX, by);
      ctx.lineTo(bx + bw + skewX, by);
      ctx.lineTo(bx + bw, by + bh);
      ctx.lineTo(bx, by + bh);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Shear force arrow on top surface
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx + bw + skewX + 10, by);
      ctx.lineTo(bx + bw + skewX + 60, by);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(bx + bw + skewX + 60, by);
      ctx.lineTo(bx + bw + skewX + 48, by - 6);
      ctx.lineTo(bx + bw + skewX + 48, by + 6);
      ctx.closePath();
      ctx.fill();

      ctx.font = 'bold 12px var(--font-mono, monospace)';
      ctx.fillText(`F_shear = ${shearForceKN} kN`, bx + bw + skewX + 15, by - 12);

      // Angle indicator γ
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(bx, by + bh, 40, -Math.PI / 2, -Math.PI / 2 + Math.atan2(skewX, bh));
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px var(--font-sans, sans-serif)';
      ctx.fillText(`γ = ${(shearStrainRad * 1e3).toFixed(2)} mrad`, bx + 15, by + bh - 48);
    } else {
      // Coupled Thermal Stress view: Bar between two rigid immovable walls
      const leftWall = 80;
      const rightWall = 520;
      const barY = 95;
      const barH = 45;

      // Rigid End Walls
      ctx.fillStyle = '#334155';
      ctx.fillRect(leftWall - 30, barY - 30, 30, barH + 60);
      ctx.fillRect(rightWall, barY - 30, 30, barH + 60);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(leftWall - 30, barY - 30, 30, barH + 60);
      ctx.strokeRect(rightWall, barY - 30, 30, barH + 60);

      // Trapped Bar
      const heatColor =
        deltaTempC > 0
          ? `rgb(${Math.min(255, 100 + deltaTempC * 2)}, 60, 60)`
          : `rgb(60, 100, ${Math.min(255, 180 + Math.abs(deltaTempC) * 2)})`;

      ctx.fillStyle = heatColor;
      ctx.fillRect(leftWall, barY, rightWall - leftWall, barH);
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(leftWall, barY, rightWall - leftWall, barH);

      // Heat wave / cold crystal icons
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 13px var(--font-sans, sans-serif)';
      ctx.textAlign = 'center';
      ctx.fillText(
        deltaTempC >= 0 ? `🔥 Heated ΔT = +${deltaTempC}°C (Constrained Expansion)` : `❄️ Chilled ΔT = ${deltaTempC}°C (Constrained Contraction)`,
        (leftWall + rightWall) / 2,
        barY + 28
      );

      // Compressive internal arrows against walls
      ctx.fillStyle = '#fef08a';
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2.5;

      // Left reaction arrow
      ctx.beginPath();
      ctx.moveTo(leftWall + 35, barY + barH / 2);
      ctx.lineTo(leftWall + 5, barY + barH / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(leftWall + 5, barY + barH / 2);
      ctx.lineTo(leftWall + 15, barY + barH / 2 - 5);
      ctx.lineTo(leftWall + 15, barY + barH / 2 + 5);
      ctx.closePath();
      ctx.fill();

      // Right reaction arrow
      ctx.beginPath();
      ctx.moveTo(rightWall - 35, barY + barH / 2);
      ctx.lineTo(rightWall - 5, barY + barH / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rightWall - 5, barY + barH / 2);
      ctx.lineTo(rightWall - 15, barY + barH / 2 - 5);
      ctx.lineTo(rightWall - 15, barY + barH / 2 + 5);
      ctx.closePath();
      ctx.fill();

      ctx.textAlign = 'left';
    }
  }, [mode, materialKey, forceKN, lengthM, areaMM2, shearForceKN, shearHeightMM, shearAreaCM2, deltaTempC, mat, strain, lateralStrain, elongationMM, stressMPa, shearDeflectionMM, shearStrainRad]);

  return (
    <div className="elasticity-viz" style={{ padding: '1rem', background: '#0a101f', borderRadius: '0.75rem' }}>
      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setMode('tensile')}
          className={`topic-layout-btn ${mode === 'tensile' ? 'topic-layout-btn--active' : ''}`}
        >
          📏 Tensile & Young's Modulus (Y)
        </button>
        <button
          type="button"
          onClick={() => setMode('shear')}
          className={`topic-layout-btn ${mode === 'shear' ? 'topic-layout-btn--active' : ''}`}
        >
          📐 Shear & Modulus of Rigidity (G)
        </button>
        <button
          type="button"
          onClick={() => setMode('thermal')}
          className={`topic-layout-btn ${mode === 'thermal' ? 'topic-layout-btn--active' : ''}`}
        >
          🌡️ Constrained Thermal Stress (σ_th)
        </button>
      </div>

      {/* Material Preset Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>Specimen Material:</span>
        {Object.entries(MATERIALS).map(([key, item]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMaterialKey(key)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '0.375rem',
              border: `1px solid ${materialKey === key ? item.color : 'rgba(255,255,255,0.1)'}`,
              background: materialKey === key ? 'rgba(56,189,248,0.15)' : 'rgba(255,255,255,0.04)',
              color: materialKey === key ? item.color : '#e2e8f0',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              transition: 'all 0.15s ease',
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Interactive Simulation Canvas */}
      <div style={{ background: '#080d1a', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
        <canvas ref={canvasRef} width={640} height={210} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      {/* Real-time Telemetry Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', margin: '1rem 0' }}>
        {mode === 'tensile' && (
          <>
            <MetricBadge label="Normal Stress (σ)" value={`${stressMPa.toFixed(1)} MPa`} tone="accent" />
            <MetricBadge label="Elongation (ΔL)" value={`${elongationMM.toFixed(3)} mm`} tone="warn" />
            <MetricBadge label="Axial Strain (ε)" value={`${(strain * 1e6).toFixed(0)} με`} tone="neutral" />
            <MetricBadge label="Lateral Contraction" value={`${(deltaDiaMM * 1e3).toFixed(1)} μm`} tone="neutral" />
            <MetricBadge label="Elastic Energy (U)" value={`${strainEnergyJ.toFixed(2)} J`} tone="accent" />
            <MetricBadge label="Spring k_eq" value={`${kEquivalentKNmm.toFixed(1)} kN/mm`} tone="neutral" />
          </>
        )}
        {mode === 'shear' && (
          <>
            <MetricBadge label="Shear Stress (τ)" value={`${shearStressMPa.toFixed(1)} MPa`} tone="accent" />
            <MetricBadge label="Shear Deflection (Δx)" value={`${shearDeflectionMM.toFixed(3)} mm`} tone="warn" />
            <MetricBadge label="Shear Strain (γ)" value={`${(shearStrainRad * 1e3).toFixed(2)} mrad`} tone="neutral" />
            <MetricBadge label="Shear Modulus (G)" value={`${(mat.G / 1e9).toFixed(0)} GPa`} tone="accent" />
          </>
        )}
        {mode === 'thermal' && (
          <>
            <MetricBadge label="Thermal Stress (σ_th)" value={`${thermalStressMPa.toFixed(1)} MPa`} tone="warn" />
            <MetricBadge label="Support Reaction Force" value={`${thermalForceKN.toFixed(1)} kN`} tone="warn" />
            <MetricBadge label="Expansion Coeff (α)" value={`${(mat.alpha * 1e6).toFixed(1)} ×10⁻⁶/°C`} tone="neutral" />
            <MetricBadge label="Temp Gradient (ΔT)" value={`${deltaTempC > 0 ? '+' : ''}${deltaTempC}°C`} tone="accent" />
          </>
        )}
      </div>

      {/* Sliders Control Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {mode === 'tensile' && (
          <>
            <SliderControl
              label="Tensile Force (F)"
              value={forceKN}
              min={1}
              max={100}
              step={1}
              unit="kN"
              onChange={setForceKN}
            />
            <SliderControl
              label="Original Length (L₀)"
              value={lengthM}
              min={0.5}
              max={5.0}
              step={0.1}
              unit="m"
              onChange={setLengthM}
            />
            <SliderControl
              label="Cross-Section Area (A)"
              value={areaMM2}
              min={10}
              max={400}
              step={5}
              unit="mm²"
              onChange={setAreaMM2}
            />
          </>
        )}
        {mode === 'shear' && (
          <>
            <SliderControl
              label="Shear Force (F_s)"
              value={shearForceKN}
              min={1}
              max={80}
              step={1}
              unit="kN"
              onChange={setShearForceKN}
            />
            <SliderControl
              label="Plate Height (h)"
              value={shearHeightMM}
              min={20}
              max={200}
              step={5}
              unit="mm"
              onChange={setShearHeightMM}
            />
            <SliderControl
              label="Shear Area (A)"
              value={shearAreaCM2}
              min={5}
              max={60}
              step={1}
              unit="cm²"
              onChange={setShearAreaCM2}
            />
          </>
        )}
        {mode === 'thermal' && (
          <>
            <SliderControl
              label="Temperature Shift (ΔT)"
              value={deltaTempC}
              min={-60}
              max={150}
              step={5}
              unit="°C"
              onChange={setDeltaTempC}
            />
            <SliderControl
              label="Rod Area (A)"
              value={areaMM2}
              min={20}
              max={500}
              step={10}
              unit="mm²"
              onChange={setAreaMM2}
            />
          </>
        )}
      </div>
    </div>
  );
}
