import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function TrigonometryViz() {
  const [angleDeg, setAngleDeg] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  const angleRad = (angleDeg * Math.PI) / 180;
  const cosVal = Math.cos(angleRad);
  const sinVal = Math.sin(angleRad);
  const tanVal = Math.abs(cosVal) < 1e-4 ? Infinity : Math.tan(angleRad);

  useEffect(() => {
    if (!isPlaying) return;
    let lastTime = null;
    const loop = (time) => {
      if (lastTime != null) {
        const dt = (time - lastTime) / 1000;
        setAngleDeg((prev) => (prev + dt * 40) % 360);
      }
      lastTime = time;
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Left Half: Unit Circle
    const circleCenterX = 190;
    const circleCenterY = height / 2;
    const radius = 120;

    // Unit circle axes
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(circleCenterX - radius - 30, circleCenterY);
    ctx.lineTo(circleCenterX + radius + 30, circleCenterY);
    ctx.moveTo(circleCenterX, circleCenterY - radius - 30);
    ctx.lineTo(circleCenterX, circleCenterY + radius + 30);
    ctx.stroke();

    // Circle outline
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Point on circle (x, y)
    const px = circleCenterX + cosVal * radius;
    const py = circleCenterY - sinVal * radius;

    // Triangle projections
    // Horizontal Cosine adjacent leg
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(px, circleCenterY);
    ctx.stroke();

    // Vertical Sine opposite leg
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px, circleCenterY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Hypotenuse Ray (radius = 1)
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Point dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fill();

    // Angle sector arc
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, 32, 0, -angleRad, angleRad < 0);
    ctx.stroke();

    // Labels on unit circle
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`cos θ = ${cosVal.toFixed(2)}`, circleCenterX + (cosVal * radius) / 2 - 25, circleCenterY + (sinVal > 0 ? 18 : -10));

    ctx.fillStyle = '#ef4444';
    ctx.fillText(`sin θ = ${sinVal.toFixed(2)}`, px + (cosVal > 0 ? 8 : -75), circleCenterY - (sinVal * radius) / 2);

    // Right Half: Live Sine & Cosine Waveforms
    const waveStartX = 410;
    const waveEndX = width - 30;
    const waveWidth = waveEndX - waveStartX;
    const waveCenterY = height / 2;

    // Horizontal equilibrium
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(waveStartX, waveCenterY);
    ctx.lineTo(waveEndX, waveCenterY);
    ctx.stroke();

    // Draw full sine wave
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= waveWidth; x += 2) {
      const theta = (x / waveWidth) * Math.PI * 2;
      const y = waveCenterY - Math.sin(theta) * radius * 0.7;
      if (x === 0) ctx.moveTo(waveStartX + x, y);
      else ctx.lineTo(waveStartX + x, y);
    }
    ctx.stroke();

    // Draw full cosine wave (dashed)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    for (let x = 0; x <= waveWidth; x += 2) {
      const theta = (x / waveWidth) * Math.PI * 2;
      const y = waveCenterY - Math.cos(theta) * radius * 0.7;
      if (x === 0) ctx.moveTo(waveStartX + x, y);
      else ctx.lineTo(waveStartX + x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Tracking dot on sine wave
    const currentNormAngle = (angleDeg % 360) / 360;
    const curWaveX = waveStartX + currentNormAngle * waveWidth;
    const curWaveY = waveCenterY - sinVal * radius * 0.7;

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(curWaveX, curWaveY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Laser connector line from unit circle to wave
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(curWaveX, curWaveY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Wave Legend
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText('— y = sin(θ)', waveStartX, 35);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('- - y = cos(θ)', waveStartX + 90, 35);
  }, [angleDeg, angleRad, cosVal, sinVal]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Unit Circle & Waveform Projector</h3>
          <span className="viz-header__tag">sin²θ + cos²θ = 1</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-btn ${isPlaying ? 'viz-btn--active' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸ Pause Rotation' : '▶ Continuous Spin'}
          </button>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Angle θ" value={`${angleDeg.toFixed(1)}°`} unit={`(${(angleRad / Math.PI).toFixed(2)}π rad)`} highlight />
        <MetricBadge label="Cosine (x)" value={cosVal.toFixed(3)} unit="" />
        <MetricBadge label="Sine (y)" value={sinVal.toFixed(3)} unit="" highlight />
        <MetricBadge label="Tangent (y/x)" value={Math.abs(tanVal) > 50 ? '±∞' : tanVal.toFixed(3)} unit="" />
        <MetricBadge label="sin²θ + cos²θ" value="1.000" unit="" />
      </div>

      <div className="viz-canvas-area" style={{ height: '370px' }}>
        <canvas ref={canvasRef} width={800} height={370} />
      </div>

      <div className="viz-controls-panel">
        <SliderControl
          label="Angle Displacement (θ)"
          value={angleDeg}
          min={0}
          max={360}
          step={1}
          unit="°"
          onChange={setAngleDeg}
        />
      </div>
    </div>
  );
}
