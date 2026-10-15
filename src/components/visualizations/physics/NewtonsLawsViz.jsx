import { useState, useEffect, useRef } from 'react';
import { PlaybackBar, SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function NewtonsLawsViz() {
  const [thetaDeg, setThetaDeg] = useState(30);
  const [mass, setMass] = useState(5);
  const [muStatic, setMuStatic] = useState(0.4);
  const [muKinetic, setMuKinetic] = useState(0.25);
  const [fApplied, setFApplied] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [simSpeed, setSimSpeed] = useState(1);
  const [blockDist, setBlockDist] = useState(0);
  const [blockSpeed, setBlockSpeed] = useState(0);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  const g = 9.8;
  const thetaRad = (thetaDeg * Math.PI) / 180;
  const weight = mass * g;
  const fNormal = weight * Math.cos(thetaRad);
  const fGravDownslope = weight * Math.sin(thetaRad);
  const maxStaticFriction = muStatic * fNormal;
  const kineticFriction = muKinetic * fNormal;

  // Net force calculation along incline (positive = up-slope, negative = down-slope)
  // External driving force along slope: F_ext = fApplied - fGravDownslope
  const fExtSlope = fApplied - fGravDownslope;

  let state = 'Static (At Rest)';
  let frictionForce = 0;
  let netForce = 0;
  let acceleration = 0;

  if (Math.abs(blockSpeed) < 0.01) {
    // Check if external driving force overcomes static friction
    if (Math.abs(fExtSlope) <= maxStaticFriction) {
      frictionForce = -fExtSlope; // exactly balances
      netForce = 0;
      acceleration = 0;
      state = 'Static Equilibrium';
    } else {
      // Slips!
      frictionForce = fExtSlope > 0 ? -kineticFriction : kineticFriction;
      netForce = fExtSlope + frictionForce;
      acceleration = netForce / mass;
      state = acceleration > 0 ? 'Accelerating Up-Slope' : 'Accelerating Down-Slope';
    }
  } else {
    // Already moving
    frictionForce = blockSpeed > 0 ? -kineticFriction : kineticFriction;
    netForce = fExtSlope + frictionForce;
    acceleration = netForce / mass;
    state = blockSpeed > 0 ? 'Moving Up-Slope' : 'Moving Down-Slope';
  }

  // Animation Loop
  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastTimeRef.current != null) {
        const dt = ((timestamp - lastTimeRef.current) / 1000) * simSpeed;
        setBlockSpeed((v) => {
          const newV = v + acceleration * dt;
          // Friction stopping condition
          if ((v > 0 && newV <= 0 && Math.abs(fExtSlope) <= maxStaticFriction) ||
              (v < 0 && newV >= 0 && Math.abs(fExtSlope) <= maxStaticFriction)) {
            return 0;
          }
          return newV;
        });

        setBlockDist((d) => {
          const nextD = d + blockSpeed * dt;
          if (nextD < -10 || nextD > 10) {
            setIsPlaying(false);
          }
          return nextD;
        });
      }
      lastTimeRef.current = timestamp;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isPlaying, simSpeed, acceleration, blockSpeed, fExtSlope, maxStaticFriction]);

  const handleReset = () => {
    setIsPlaying(false);
    setBlockDist(0);
    setBlockSpeed(0);
  };

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Ramp geometry
    const rampOriginX = 80;
    const rampOriginY = h - 60;
    const rampLength = 600;
    const rampEndX = rampOriginX + rampLength * Math.cos(thetaRad);
    const rampEndY = rampOriginY - rampLength * Math.sin(thetaRad);

    // Draw Ramp
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(rampOriginX, rampOriginY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.lineTo(rampEndX, rampOriginY);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rampOriginX, rampOriginY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Incline angle arc
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(rampOriginX, rampOriginY, 45, 0, -thetaRad, true);
    ctx.stroke();
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px sans-serif';
    ctx.fillText(`${thetaDeg}°`, rampOriginX + 55, rampOriginY - 12);

    // Block position along ramp
    const centerDist = 280 + blockDist * 20;
    const bx = rampOriginX + centerDist * Math.cos(thetaRad);
    const by = rampOriginY - centerDist * Math.sin(thetaRad);

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(-thetaRad);

    // Draw Block
    const bw = 60;
    const bh = 40;
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.fillRect(-bw / 2, -bh, bw, bh);
    ctx.strokeRect(-bw / 2, -bh, bw, bh);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${mass} kg`, 0, -bh / 2 + 4);

    // Free Body Diagram Vector Arrows (origin at center of block)
    const cx = 0;
    const cy = -bh / 2;

    const drawVector = (dx, dy, color, label) => {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + dx, cy + dy);
      ctx.stroke();

      // Arrowhead
      const headLen = 7;
      const angle = Math.atan2(dy, dx);
      ctx.beginPath();
      ctx.moveTo(cx + dx, cy + dy);
      ctx.lineTo(cx + dx - headLen * Math.cos(angle - Math.PI / 6), cy + dy - headLen * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(cx + dx - headLen * Math.cos(angle + Math.PI / 6), cy + dy - headLen * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fill();

      ctx.font = '10px sans-serif';
      ctx.fillText(label, cx + dx * 1.15, cy + dy * 1.15);
    };

    const scale = 1.2;

    // Normal Force N (up perpendicular)
    drawVector(0, -fNormal * scale, '#38bdf8', `N=${fNormal.toFixed(0)}N`);

    // Gravity component perpendicular (down perpendicular)
    drawVector(0, fNormal * scale, 'rgba(255,255,255,0.3)', 'mg·cosθ');

    // Gravity component parallel (down-slope: leftward in rotated frame)
    drawVector(-fGravDownslope * scale, 0, '#ec4899', `mg·sinθ=${fGravDownslope.toFixed(0)}N`);

    // Friction force
    if (Math.abs(frictionForce) > 0.5) {
      drawVector(frictionForce * scale, 0, '#f97316', `f=${Math.abs(frictionForce).toFixed(0)}N`);
    }

    // Applied push force
    if (Math.abs(fApplied) > 0.5) {
      drawVector(fApplied * scale, 0, '#22d3ee', `F=${fApplied}N`);
    }

    ctx.restore();
  }, [thetaRad, thetaDeg, mass, blockDist, fNormal, fGravDownslope, frictionForce, fApplied]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Newtonian Inclined Plane & Friction Dynamics</h3>
          <span className="viz-header__tag">{state}</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        <MetricBadge label="Weight (mg)" value={weight.toFixed(1)} unit="N" />
        <MetricBadge label="Normal Force (N)" value={fNormal.toFixed(1)} unit="N" />
        <MetricBadge label="Friction (f)" value={Math.abs(frictionForce).toFixed(1)} unit="N" />
        <MetricBadge label="Net Force (ΣF)" value={netForce.toFixed(1)} unit="N" />
        <MetricBadge label="Acceleration (a)" value={acceleration.toFixed(2)} unit="m/s²" highlight />
      </div>

      <div className="viz-canvas-area" style={{ height: 360 }}>
        <canvas ref={canvasRef} width={800} height={360} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Incline Ramp Angle (θ)"
            value={thetaDeg}
            min={0}
            max={75}
            step={1}
            unit="°"
            onChange={setThetaDeg}
          />
          <SliderControl
            label="Block Mass (m)"
            value={mass}
            min={1}
            max={20}
            step={0.5}
            unit="kg"
            onChange={setMass}
          />
          <SliderControl
            label="Static Friction Coeff (μₛ)"
            value={muStatic}
            min={0.05}
            max={1.0}
            step={0.05}
            onChange={(val) => {
              setMuStatic(val);
              if (muKinetic > val) setMuKinetic(val);
            }}
          />
          <SliderControl
            label="Kinetic Friction Coeff (μₖ)"
            value={muKinetic}
            min={0.02}
            max={Math.min(0.9, muStatic)}
            step={0.02}
            onChange={setMuKinetic}
          />
          <SliderControl
            label="External Push Force (F)"
            value={fApplied}
            min={-80}
            max={80}
            step={5}
            unit="N (+ Up / - Down)"
            onChange={setFApplied}
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
          ⚖️ <strong>Free Body Insight:</strong> Slowly raise the ramp angle θ until the block transitions from "Static Equilibrium" to "Accelerating Down-Slope". The angle where slipping first occurs satisfies tan(θ) = μₛ! Notice that increasing mass increases both downhill gravity AND friction equally, so the slip angle is independent of mass.
        </div>
      </div>
    </div>
  );
}
