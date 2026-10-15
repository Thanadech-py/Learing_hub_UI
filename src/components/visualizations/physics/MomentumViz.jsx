import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function MomentumViz() {
  const [m1, setM1] = useState(3);
  const [v1_init, setV1_init] = useState(5);
  const [m2, setM2] = useState(3);
  const [v2_init, setV2_init] = useState(-2);
  const [elasticity, setElasticity] = useState(1.0); // e = 0 to 1

  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);

  // Dynamic simulation states
  const [pos1, setPos1] = useState(160);
  const [pos2, setPos2] = useState(540);
  const [v1, setV1] = useState(5);
  const [v2, setV2] = useState(-2);
  const [hasCollided, setHasCollided] = useState(false);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Cart width
  const cartW = 60;

  // Analytical post-collision velocities
  // v1f = (m1 - e*m2)/(m1 + m2)*v1i + (1 + e)*m2/(m1 + m2)*v2i
  // v2f = (m2 - e*m1)/(m1 + m2)*v2i + (1 + e)*m1/(m1 + m2)*v1i
  const denom = m1 + m2;
  const v1_post = ((m1 - elasticity * m2) / denom) * v1_init + (((1 + elasticity) * m2) / denom) * v2_init;
  const v2_post = (((1 + elasticity) * m1) / denom) * v1_init + ((m2 - elasticity * m1) / denom) * v2_init;

  // Momentum & Energy metrics
  const p1 = m1 * v1;
  const p2 = m2 * v2;
  const pTotal = p1 + p2;

  const k1 = 0.5 * m1 * v1 * v1;
  const k2 = 0.5 * m2 * v2 * v2;
  const kTotal = k1 + k2;

  const kInitial = 0.5 * m1 * v1_init * v1_init + 0.5 * m2 * v2_init * v2_init;
  const energyLoss = Math.max(0, kInitial - kTotal);

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = ((timestamp - lastTimeRef.current) / 1000) * simSpeed;
        const pixelScale = 30; // 1 m/s = 30 px/s

        setPos1((p1Cur) => {
          setPos2((p2Cur) => {
            let next1 = p1Cur + v1 * pixelScale * dt;
            let next2 = p2Cur + v2 * pixelScale * dt;

            // Check collision between carts
            if (next1 + cartW >= next2 && !hasCollided) {
              setHasCollided(true);
              setV1(v1_post);
              setV2(v2_post);
              // Reposition touching
              const midpoint = (next1 + next2) / 2;
              next1 = midpoint - cartW / 2;
              next2 = midpoint + cartW / 2;
            }

            // Stop at track walls
            if (next1 < 40 || next2 > 700) {
              setIsPlaying(false);
            }

            return next2;
          });
          return p1Cur + v1 * pixelScale * dt;
        });
      }
      lastTimeRef.current = timestamp;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying, simSpeed, v1, v2, v1_post, v2_post, hasCollided]);

  const handleReset = () => {
    setIsPlaying(false);
    setPos1(160);
    setPos2(540);
    setV1(v1_init);
    setV2(v2_init);
    setHasCollided(false);
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    const trackY = h / 2 + 30;

    // Air track rail with linear holes
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(40, trackY + 10, w - 80, 20);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, trackY + 10, w - 80, 20);

    // Air jets along track
    ctx.fillStyle = '#64748b';
    for (let x = 60; x < w - 60; x += 15) {
      ctx.beginPath();
      ctx.arc(x, trackY + 14, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cart 1 (Cyan)
    ctx.fillStyle = '#06b6d4';
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 8;
    ctx.fillRect(pos1, trackY - 30, cartW, 40);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#22d3ee';
    ctx.strokeRect(pos1, trackY - 30, cartW, 40);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Cart 1`, pos1 + cartW / 2, trackY - 14);
    ctx.fillText(`${m1} kg`, pos1 + cartW / 2, trackY + 2);

    // Cart 2 (Amber)
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 8;
    ctx.fillRect(pos2, trackY - 30, cartW, 40);
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#fbbf24';
    ctx.strokeRect(pos2, trackY - 30, cartW, 40);

    ctx.fillStyle = '#0f172a';
    ctx.fillText(`Cart 2`, pos2 + cartW / 2, trackY - 14);
    ctx.fillText(`${m2} kg`, pos2 + cartW / 2, trackY + 2);

    // Velocity Vectors
    const drawVec = (x, speedVal, color) => {
      if (Math.abs(speedVal) < 0.1) return;
      const arrowL = speedVal * 12;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, trackY - 45);
      ctx.lineTo(x + arrowL, trackY - 45);
      ctx.stroke();

      const head = speedVal > 0 ? 6 : -6;
      ctx.beginPath();
      ctx.moveTo(x + arrowL, trackY - 45);
      ctx.lineTo(x + arrowL - head, trackY - 50);
      ctx.lineTo(x + arrowL - head, trackY - 40);
      ctx.closePath();
      ctx.fill();

      ctx.font = '11px sans-serif';
      ctx.fillText(`${speedVal.toFixed(1)} m/s`, x + arrowL / 2, trackY - 56);
    };

    drawVec(pos1 + cartW / 2, v1, '#22d3ee');
    drawVec(pos2 + cartW / 2, v2, '#fbbf24');
  }, [pos1, pos2, v1, v2, m1, m2]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Linear Momentum & Collision Chamber</h3>
          <span className="viz-header__tag">
            {elasticity === 1 ? 'Elastic (e=1)' : elasticity === 0 ? 'Inelastic (e=0)' : `Partial Elastic (e=${elasticity})`}
          </span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Cart 1 Momentum (p₁)" value={p1.toFixed(1)} unit="kg·m/s" />
        <MetricBadge label="Cart 2 Momentum (p₂)" value={p2.toFixed(1)} unit="kg·m/s" />
        <MetricBadge label="Total Momentum (P)" value={pTotal.toFixed(1)} unit="kg·m/s" highlight />
        <MetricBadge label="Kinetic Energy (K)" value={kTotal.toFixed(1)} unit="J" />
        <MetricBadge label="Energy Loss (ΔK)" value={energyLoss.toFixed(1)} unit="J" />
      </div>

      <div className="viz-canvas-area" style={{ height: 280 }}>
        <canvas ref={canvasRef} width={800} height={280} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Cart 1 Mass (m₁)"
            value={m1}
            min={1}
            max={8}
            step={0.5}
            unit="kg"
            onChange={(val) => {
              setM1(val);
              handleReset();
            }}
          />
          <SliderControl
            label="Cart 1 Initial Speed (v₁)"
            value={v1_init}
            min={-8}
            max={8}
            step={1}
            unit="m/s"
            onChange={(val) => {
              setV1_init(val);
              handleReset();
            }}
          />
          <SliderControl
            label="Cart 2 Mass (m₂)"
            value={m2}
            min={1}
            max={8}
            step={0.5}
            unit="kg"
            onChange={(val) => {
              setM2(val);
              handleReset();
            }}
          />
          <SliderControl
            label="Cart 2 Initial Speed (v₂)"
            value={v2_init}
            min={-8}
            max={8}
            step={1}
            unit="m/s"
            onChange={(val) => {
              setV2_init(val);
              handleReset();
            }}
          />
          <SliderControl
            label="Elasticity Coeff (e)"
            value={elasticity}
            min={0}
            max={1}
            step={0.05}
            unit="(0=Sticky, 1=Bouncy)"
            onChange={(val) => {
              setElasticity(val);
              handleReset();
            }}
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
          💥 <strong>Conservation Law:</strong> Notice that no matter what masses, velocities, or elasticity you choose, the Total Momentum P = p₁ + p₂ stays identically the same before and after collision! When e = 0 (perfectly inelastic), maximum kinetic energy is dissipated into internal heat and the two carts stick together at a shared velocity.
        </div>
      </div>
    </div>
  );
}
