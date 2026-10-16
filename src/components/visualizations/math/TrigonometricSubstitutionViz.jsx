import { useState, useRef, useEffect } from 'react';
import { SliderControl, MetricBadge } from '../shared/VizControls.jsx';

export default function TrigonometricSubstitutionViz() {
  const [subType, setSubType] = useState('sine'); // 'sine' | 'tangent' | 'secant'
  const [constA, setConstA] = useState(3.0); // radius constant a
  const [paramVal, setParamVal] = useState(1.8); // x value

  const canvasRef = useRef(null);

  // Compute triangle side lengths according to subType
  let opposite = 0;
  let adjacent = 0;
  let hypotenuse = 0;
  let thetaRad = 0;
  let radicalVal = 0;
  let radicalFormText = '';
  let subFormulaText = '';

  const safeA = Math.max(0.5, constA);

  if (subType === 'sine') {
    // Form: √(a² - x²), x = a sin θ
    const safeX = Math.min(safeA * 0.98, Math.max(0.1, paramVal));
    opposite = safeX;
    hypotenuse = safeA;
    radicalVal = Math.sqrt(Math.max(0, safeA * safeA - safeX * safeX));
    adjacent = radicalVal;
    thetaRad = Math.asin(safeX / safeA);
    radicalFormText = '√(a² - x²) = a cos(θ)';
    subFormulaText = `x = ${safeA} sin(θ),  dx = ${safeA} cos(θ) dθ`;
  } else if (subType === 'tangent') {
    // Form: √(a² + x²), x = a tan θ
    const safeX = Math.max(0.1, paramVal);
    adjacent = safeA;
    opposite = safeX;
    radicalVal = Math.sqrt(safeA * safeA + safeX * safeX);
    hypotenuse = radicalVal;
    thetaRad = Math.atan(safeX / safeA);
    radicalFormText = '√(a² + x²) = a sec(θ)';
    subFormulaText = `x = ${safeA} tan(θ),  dx = ${safeA} sec²(θ) dθ`;
  } else {
    // Form: √(x² - a²), x = a sec θ
    const safeX = Math.max(safeA * 1.05, paramVal);
    adjacent = safeA;
    hypotenuse = safeX;
    radicalVal = Math.sqrt(Math.max(0, safeX * safeX - safeA * safeA));
    opposite = radicalVal;
    thetaRad = Math.acos(safeA / safeX);
    radicalFormText = '√(x² - a²) = a tan(θ)';
    subFormulaText = `x = ${safeA} sec(θ),  dx = ${safeA} sec(θ)tan(θ) dθ`;
  }

  const thetaDeg = ((thetaRad * 180) / Math.PI).toFixed(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    // Left Panel: Reference Right Triangle
    const triOriginX = 70;
    const triOriginY = height - 70;
    const maxTriW = width * 0.42;
    const maxTriH = height - 140;

    // Scale triangle to fit left panel
    const triScale = Math.min(maxTriW / (adjacent || 1), maxTriH / (opposite || 1), 85);

    const cornerA = { x: triOriginX, y: triOriginY }; // Angle θ corner
    const cornerB = { x: triOriginX + adjacent * triScale, y: triOriginY }; // Right-angle corner
    const cornerC = { x: triOriginX + adjacent * triScale, y: triOriginY - opposite * triScale }; // Top corner

    // Background panel for triangle
    ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(25, 25, width * 0.46, height - 50, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText('Reference Right Triangle for Back-Substitution', 40, 50);

    // Shaded triangle interior
    ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
    ctx.beginPath();
    ctx.moveTo(cornerA.x, cornerA.y);
    ctx.lineTo(cornerB.x, cornerB.y);
    ctx.lineTo(cornerC.x, cornerC.y);
    ctx.closePath();
    ctx.fill();

    // Triangle edges
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Right-angle marker at corner B
    const rSize = 14;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cornerB.x - rSize, cornerB.y);
    ctx.lineTo(cornerB.x - rSize, cornerB.y - rSize);
    ctx.lineTo(cornerB.x, cornerB.y - rSize);
    ctx.stroke();

    // Angle θ arc at corner A
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cornerA.x, cornerA.y, 28, -thetaRad, 0);
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 11px system-ui, sans-serif';
    ctx.fillText(`θ = ${thetaDeg}°`, cornerA.x + 36, cornerA.y - 8);

    // Edge labels
    ctx.font = 'bold 11px system-ui, sans-serif';
    // Adjacent side label (horizontal)
    ctx.fillStyle = subType === 'sine' ? '#22c55e' : '#a78bfa';
    const adjName = subType === 'sine' ? `Adjacent = √(a²-x²) = ${adjacent.toFixed(2)}` : `Adjacent = a = ${adjacent.toFixed(2)}`;
    ctx.textAlign = 'center';
    ctx.fillText(adjName, (cornerA.x + cornerB.x) / 2, cornerB.y + 22);

    // Opposite side label (vertical)
    ctx.fillStyle = subType === 'secant' ? '#22c55e' : '#38bdf8';
    ctx.textAlign = 'start';
    const oppName = subType === 'secant' ? `Opposite = √(x²-a²) = ${opposite.toFixed(2)}` : `Opposite = x = ${opposite.toFixed(2)}`;
    ctx.fillText(oppName, cornerB.x + 10, (cornerB.y + cornerC.y) / 2);

    // Hypotenuse label (slanted)
    ctx.fillStyle = subType === 'tangent' ? '#22c55e' : subType === 'sine' ? '#a78bfa' : '#38bdf8';
    const hypName = subType === 'tangent' ? `Hyp = √(a²+x²) = ${hypotenuse.toFixed(2)}` : subType === 'sine' ? `Hyp = a = ${hypotenuse.toFixed(2)}` : `Hyp = x = ${hypotenuse.toFixed(2)}`;
    ctx.fillText(hypName, (cornerA.x + cornerC.x) / 2 - 30, (cornerA.y + cornerC.y) / 2 - 12);

    // Right Panel: Continuous Radical Curve y = √(a² ± x²)
    const graphLeft = width * 0.52;
    const graphW = width * 0.44;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(graphLeft, 25, graphW, height - 50, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.fillText(`Radical Geometry: ${radicalFormText}`, graphLeft + 16, 50);

    const gxOriginX = graphLeft + 35;
    const gxOriginY = height - 70;
    const gxScaleX = (graphW - 55) / (safeA * 1.4);
    const gxScaleY = (height - 140) / (safeA * 1.5);

    // Graph axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(gxOriginX, 70);
    ctx.lineTo(gxOriginX, gxOriginY);
    ctx.lineTo(graphLeft + graphW - 15, gxOriginY);
    ctx.stroke();

    // Plot radical curve
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const gSteps = 80;
    const maxGX = safeA * 1.35;
    for (let i = 0; i <= gSteps; i++) {
      const xVal = (i / gSteps) * maxGX;
      let yVal = 0;
      if (subType === 'sine') {
        yVal = xVal <= safeA ? Math.sqrt(safeA * safeA - xVal * xVal) : 0;
      } else if (subType === 'tangent') {
        yVal = Math.sqrt(safeA * safeA + xVal * xVal);
      } else {
        yVal = xVal >= safeA ? Math.sqrt(xVal * xVal - safeA * safeA) : 0;
      }
      const px = gxOriginX + xVal * gxScaleX;
      const py = gxOriginY - yVal * gxScaleY;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Active x coordinate indicator dot
    const activeX = subType === 'sine' ? opposite : subType === 'tangent' ? opposite : hypotenuse;
    const pDotX = gxOriginX + activeX * gxScaleX;
    const pDotY = gxOriginY - radicalVal * gxScaleY;

    ctx.strokeStyle = '#f59e0b';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(pDotX, gxOriginY);
    ctx.lineTo(pDotX, pDotY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(pDotX, pDotY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillText(`x=${activeX.toFixed(1)}, y=${radicalVal.toFixed(2)}`, pDotX + 8, pDotY - 6);
  }, [subType, safeA, opposite, adjacent, hypotenuse, thetaRad, thetaDeg, radicalVal, radicalFormText]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">Trigonometric Substitution & Reference Triangle Lab</h3>
          <span className="viz-header__tag">Right-Triangle Geometric Elimination of Radicals</span>
        </div>
        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-mode-btn ${subType === 'sine' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setSubType('sine')}
          >
            √(a² - x²) : x = a sin θ
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${subType === 'tangent' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setSubType('tangent')}
          >
            √(a² + x²) : x = a tan θ
          </button>
          <button
            type="button"
            className={`viz-mode-btn ${subType === 'secant' ? 'viz-mode-btn--active' : ''}`}
            onClick={() => setSubType('secant')}
          >
            √(x² - a²) : x = a sec θ
          </button>
        </div>
      </header>

      <div className="viz-presets-bar">
        <span className="viz-presets-bar__label">Substitution Rule:</span>
        <span className="viz-preset-chip viz-preset-chip--active">{radicalFormText}</span>
        <span className="viz-preset-chip">{subFormulaText}</span>
      </div>

      <div className="viz-metrics-bar">
        <MetricBadge label="Constant a" value={constA.toFixed(1)} unit="Radius" />
        <MetricBadge label="Coordinate x" value={paramVal.toFixed(2)} unit="" />
        <MetricBadge label="Angle θ" value={`${thetaDeg}°`} unit={`${thetaRad.toFixed(2)} rad`} highlight />
        <MetricBadge label="Radical Value" value={radicalVal.toFixed(3)} unit="" highlight />
        <MetricBadge label="Opp / Adj / Hyp" value={`${opposite.toFixed(1)} / ${adjacent.toFixed(1)} / ${hypotenuse.toFixed(1)}`} unit="" />
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <canvas ref={canvasRef} width={840} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Radius Parameter a"
            value={constA}
            min={1.0}
            max={5.0}
            step={0.2}
            onChange={setConstA}
          />
          <SliderControl
            label={subType === 'sine' ? 'Coordinate x (0 < x < a)' : subType === 'secant' ? 'Coordinate x (x > a)' : 'Coordinate x (x > 0)'}
            value={paramVal}
            min={subType === 'secant' ? constA + 0.2 : 0.2}
            max={subType === 'sine' ? constA - 0.1 : 6.0}
            step={0.1}
            onChange={setParamVal}
          />
        </div>
      </div>
    </div>
  );
}
