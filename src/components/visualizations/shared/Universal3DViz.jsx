import { useState, useEffect, useRef } from 'react';
import {
  useIsometric3D,
  IsometricToolbar,
  project3D,
  draw3DGrid,
  draw3DAxes,
  draw3DVector,
  draw3DParallelepiped,
  drawOrientationGizmo,
} from '../linearAlgebra/viz3dUtils.jsx';
import { SliderControl, MetricBadge, PlaybackBar } from './VizControls.jsx';

/**
 * Interactive 3D Isometric Visualizer for every Physics and Mathematics topic & sub-topic.
 * Gives every 2D visualization a bespoke 3D Isometric counterpart with
 * full mouse orbit, camera presets (Isometric, Top, Front, Side), and live parameter sliders.
 */
export default function Universal3DViz({ subjectId, topicId, subTopicId }) {
  const activeKey = subTopicId && subTopicId !== 'foundations' ? subTopicId : topicId;

  const {
    canvasRef,
    camera,
    setPreset,
    baseScale,
    centerOffset,
  } = useIsometric3D('Isometric', { baseScale: 52, centerOffset: { x: 0, y: 18 } });

  const [paramA, setParamA] = useState(2.2);
  const [paramB, setParamB] = useState(1.4);
  const [slices, setSlices] = useState(16);
  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [phase, setPhase] = useState(0);

  const animRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }
    const tick = (ts) => {
      if (lastTimeRef.current != null) {
        const dt = Math.min(0.05, ((ts - lastTimeRef.current) / 1000) * simSpeed);
        setPhase((p) => (p + dt * 1.6) % (Math.PI * 20));
      }
      lastTimeRef.current = ts;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, simSpeed]);

  // Configure labels and metrics per topic
  const getSceneMeta = () => {
    if (subjectId === 'com-prog') {
      switch (activeKey) {
        case 'c-programming':
          return {
            title: '3D Isometric Memory Matrix & Stack Architecture',
            tag: 'Hardware Addresses & Pointer Vectors',
            sliderALabel: 'Stack Elevation Height',
            sliderBLabel: 'Memory Grid Cell Stride',
            metrics: [
              { label: 'Stack Top (RSP)', value: '0x7ffe50', highlight: true },
              { label: 'Heap Base', value: '0x10a200' },
              { label: 'Address Stride', value: `${Math.round(paramB * 4)} B`, unit: 'stride' },
            ],
          };
        case 'py-programming':
          return {
            title: '3D Object Graph & Reference Space',
            tag: 'CPython Heap & Namespace Vectors',
            sliderALabel: 'Heap Object Orbit Radius',
            sliderBLabel: 'Reference Vector Density',
            metrics: [
              { label: 'Namespace Scope', value: 'Global / Local', highlight: true },
              { label: 'Heap Nodes', value: `${Math.round(paramA * 4)}`, unit: 'objects' },
              { label: 'Reference Integrity', value: 'Active', unit: 'O(1)' },
            ],
          };
        case 'mcu':
          return {
            title: '3D Microcontroller Silicon Package & Pin Elevation',
            tag: 'DIP/QFP Package & GPIO Logic',
            sliderALabel: 'Logic Level Voltage Scale',
            sliderBLabel: 'Clock Oscillator Speed',
            metrics: [
              { label: 'V_CC Logic High', value: `${(paramA * 1.5).toFixed(1)} V`, highlight: true },
              { label: 'Oscillator Clock', value: `${Math.round(paramB * 8)} MHz` },
              { label: 'Active Pins', value: 'PB0 - PB7' },
            ],
          };
        case 'ros':
        default:
          return {
            title: '3D Robotics Computational Graph & TF2 Coordinate Frames',
            tag: 'SE(3) Transforms & Node Pipeline',
            sliderALabel: 'TF2 Spatial Distance Scale',
            sliderBLabel: 'Message Particle Flow Velocity',
            metrics: [
              { label: 'Coordinate Frames', value: 'map → odom → base_link', highlight: true },
              { label: 'Topic Stream', value: '/cmd_vel', unit: 'geometry_msgs' },
              { label: 'DDS Pipeline', value: 'Decentralized' },
            ],
          };
      }
    }

    if (subjectId === 'physics') {
      switch (activeKey) {
        case 'units-and-measurement':
          return {
            title: '3D Dimensional Volume & Scaling Cuboid',
            tag: 'V = L × W × H (m³)',
            sliderALabel: 'Length L (m)',
            sliderBLabel: 'Width / Height Scale (m)',
            metrics: [
              { label: 'Length (L)', value: paramA.toFixed(2), unit: 'm' },
              { label: 'Width (W)', value: paramB.toFixed(2), unit: 'm' },
              { label: '3D Volume (V)', value: (paramA * paramB * (paramB * 0.85)).toFixed(2), unit: 'm³', highlight: true },
              { label: 'Surface Area', value: (2 * (paramA * paramB + paramA * paramB * 0.85 + paramB * paramB * 0.85)).toFixed(2), unit: 'm²' },
            ],
          };
        case 'kinematics':
          return {
            title: '3D Projectile Trajectory & Velocity Decomposition',
            tag: 'r(t) = [v₀ₓt, v₀ᵧt, z₀ + v₀₂t − ½gt²]',
            sliderALabel: 'Launch Speed Scale (v₀)',
            sliderBLabel: 'Launch Elevation / Azimuth',
            metrics: [
              { label: 'Speed Scale', value: (paramA * 10).toFixed(1), unit: 'm/s', highlight: true },
              { label: 'Apex Height (z_max)', value: (paramB * 1.4).toFixed(2), unit: 'm' },
              { label: 'Horizontal Range', value: (paramA * 2.6).toFixed(2), unit: 'm' },
            ],
          };
        case 'newtons-laws':
          return {
            title: '3D Inclined Wedge & Free-Body Force Vectors',
            tag: '∑F = ma in 3D Space',
            sliderALabel: 'Ramp Angle / Slope',
            sliderBLabel: 'Block Mass Scale',
            metrics: [
              { label: 'Incline Angle θ', value: (paramA * 14).toFixed(1), unit: '°' },
              { label: 'Normal Force ||N||', value: (paramB * 9.8 * Math.cos(paramA * 0.24)).toFixed(1), unit: 'N', highlight: true },
              { label: 'Down-Ramp mg sinθ', value: (paramB * 9.8 * Math.sin(paramA * 0.24)).toFixed(1), unit: 'N' },
            ],
          };
        case 'work-and-energy':
          return {
            title: '3D Coaster Track & Mechanical Energy Columns',
            tag: 'E_total = K(x,y,z) + mgh',
            sliderALabel: 'Peak Track Height (h₀)',
            sliderBLabel: 'Cart Mass Scale (m)',
            metrics: [
              { label: 'Initial Height', value: (paramA * 8).toFixed(1), unit: 'm' },
              { label: 'Total Energy E', value: (paramA * paramB * 15).toFixed(1), unit: 'kJ', highlight: true },
              { label: 'Peak Speed v_max', value: Math.sqrt(2 * 9.81 * paramA * 4).toFixed(1), unit: 'm/s' },
            ],
          };
        case 'momentum':
        case 'momentum-and-collisions':
          return {
            title: '3D Two-Body Oblique Collision & Momentum Plane',
            tag: 'p₁ + p₂ = p₁′ + p₂′',
            sliderALabel: 'Sphere 1 Momentum ||p₁||',
            sliderBLabel: 'Impact Parameter / Scattering Angle',
            metrics: [
              { label: '||p₁|| Initial', value: (paramA * 4).toFixed(1), unit: 'kg·m/s', highlight: true },
              { label: 'Scattering Angle', value: (paramB * 22).toFixed(1), unit: '°' },
              { label: 'Total Momentum', value: 'Conserved', unit: '3D Vector' },
            ],
          };
        case 'circular-motion':
        case 'circular-motion-and-gravitation':
          return {
            title: '3D Orbital & Conical Pendulum Dynamics',
            tag: 'F_c = mv²/r, L = r × p',
            sliderALabel: 'Orbital Radius (r)',
            sliderBLabel: 'Angular Velocity (ω)',
            metrics: [
              { label: 'Orbit Radius r', value: paramA.toFixed(2), unit: 'm' },
              { label: 'Centripetal a_c', value: (paramA * paramB * paramB).toFixed(2), unit: 'm/s²', highlight: true },
              { label: 'Angular Momentum L_z', value: (paramA * paramA * paramB).toFixed(2), unit: 'kg·m²/s' },
            ],
          };
        case 'oscillations':
        case 'oscillations-and-shm':
          return {
            title: '3D Helical Spring Oscillator & Phase Helix (x, v, z)',
            tag: 'z(t) = A cos(ωt + φ)',
            sliderALabel: 'Oscillation Amplitude (A)',
            sliderBLabel: 'Angular Frequency (ω)',
            metrics: [
              { label: 'Amplitude A', value: paramA.toFixed(2), unit: 'm' },
              { label: 'Frequency ω', value: paramB.toFixed(2), unit: 'rad/s', highlight: true },
              { label: 'Instantaneous z(t)', value: (paramA * Math.cos(phase * paramB)).toFixed(2), unit: 'm' },
            ],
          };
        case 'waves':
        case 'wave-foundations':
          return {
            title: '3D Transverse & Electromagnetic Wave Propagation',
            tag: 'y(x,t) = A sin(kx − ωt), z(x,t) ⊥ y',
            sliderALabel: 'Wave Amplitude (A)',
            sliderBLabel: 'Wave Number / Harmonics (k)',
            metrics: [
              { label: 'Amplitude A', value: paramA.toFixed(2), unit: 'm', highlight: true },
              { label: 'Harmonic Mode', value: `n = ${Math.max(1, Math.round(paramB * 2))}`, unit: '' },
              { label: 'Wavelength λ', value: (6 / Math.max(1, Math.round(paramB * 2))).toFixed(2), unit: 'm' },
            ],
          };
        case 'sound-waves':
          return {
            title: '3D Acoustic Resonance Tube & Pressure Wavefronts',
            tag: 'ΔP(x,t) = ΔP_max sin(kx) cos(ωt)',
            sliderALabel: 'Pressure Amplitude (ΔP)',
            sliderBLabel: 'Harmonic Mode (n)',
            metrics: [
              { label: 'Harmonic Mode', value: `n = ${Math.max(1, Math.round(paramB * 2))}`, unit: '', highlight: true },
              { label: 'Sound Level', value: Math.round(65 + paramA * 15), unit: 'dB' },
              { label: 'Wave Speed v', value: '343', unit: 'm/s' },
            ],
          };
        case 'fluid-mechanics':
          return {
            title: '3D Venturi Pipe Constriction & Bernoulli Pressure Columns',
            tag: 'P₁ + ½ρv₁² = P₂ + ½ρv₂²',
            sliderALabel: 'Inlet Radius R₁',
            sliderBLabel: 'Throat Constriction Ratio',
            metrics: [
              { label: 'Inlet Radius R₁', value: (paramA * 0.65).toFixed(2), unit: 'm' },
              { label: 'Throat Speed Boost', value: `${(1 + paramB * 0.9).toFixed(2)}×`, unit: 'v₁', highlight: true },
              { label: 'Flow Rate Q = A·v', value: (Math.PI * Math.pow(paramA * 0.65, 2) * 2.2).toFixed(2), unit: 'm³/s' },
            ],
          };
        case 'thermodynamics':
        default:
          return {
            title: '3D Ideal Gas Piston Cylinder & Kinetic Particles',
            tag: 'PV = nRT (3D Molecular Motion)',
            sliderALabel: 'Piston Volume Height',
            sliderBLabel: 'Temperature / Speed (T)',
            metrics: [
              { label: 'Cylinder Volume V', value: (paramA * 12).toFixed(1), unit: 'L', highlight: true },
              { label: 'Temperature T', value: Math.round(paramB * 250), unit: 'K' },
              { label: 'Pressure P ∝ T/V', value: ((paramB * 2.5) / Math.max(0.5, paramA)).toFixed(2), unit: 'atm' },
            ],
          };
      }
    }

    // Mathematics Topics & Integration Sub-Topics
    switch (activeKey) {
      case 'number-systems':
        return {
          title: '3D Complex Plane & Euler Helix e^(iθ) = cosθ + i sinθ',
          tag: 'ℂ × ℝ Isometric Argand & Euler Spiral',
          sliderALabel: 'Modulus Radius (r)',
          sliderBLabel: ' Winding Frequency (ω)',
          metrics: [
            { label: 'Modulus |z| = r', value: paramA.toFixed(2), unit: '', highlight: true },
            { label: 'Phase Angle θ', value: (((phase * paramB) % (Math.PI * 2)) * (180 / Math.PI)).toFixed(0), unit: '°' },
            { label: 'Re(z) / Im(z)', value: `${(paramA * Math.cos(phase * paramB)).toFixed(1)} / ${(paramA * Math.sin(phase * paramB)).toFixed(1)}`, unit: '' },
          ],
        };
      case 'algebraic-expressions':
        return {
          title: '3D Binomial Cube Geometric Expansion (a + b)³',
          tag: '(a+b)³ = a³ + 3a²b + 3ab² + b³',
          sliderALabel: 'Primary Dimension (a)',
          sliderBLabel: 'Secondary Dimension (b)',
          metrics: [
            { label: 'Core Cube a³', value: Math.pow(paramA * 0.7, 3).toFixed(2), unit: 'u³' },
            { label: 'Corner Cube b³', value: Math.pow(paramB * 0.55, 3).toFixed(2), unit: 'u³' },
            { label: 'Total Volume (a+b)³', value: Math.pow(paramA * 0.7 + paramB * 0.55, 3).toFixed(2), unit: 'u³', highlight: true },
          ],
        };
      case 'functions':
        return {
          title: '3D Multivariable Function Surface z = f(x, y)',
          tag: 'f(x, y) = a·cos(r) − b·(x² − y²)',
          sliderALabel: 'Radial Wave Amplitude (a)',
          sliderBLabel: 'Saddle Curvature (b)',
          metrics: [
            { label: 'Surface Grid', value: `${slices} × ${slices}`, unit: 'cells', highlight: true },
            { label: 'Amplitude a', value: paramA.toFixed(2), unit: '' },
            { label: 'Curvature b', value: paramB.toFixed(2), unit: '' },
          ],
        };
      case 'trigonometry':
        return {
          title: '3D Unit Cylinder & Orthogonal Sine/Cosine Projections',
          tag: 'cos²θ + sin²θ = 1 along 3D Axis',
          sliderALabel: 'Cylinder Radius (R)',
          sliderBLabel: 'Harmonic Frequency (ω)',
          metrics: [
            { label: 'Radius R', value: paramA.toFixed(2), unit: '' },
            { label: 'R cos(θ)', value: (paramA * Math.cos(phase * paramB)).toFixed(2), unit: '', highlight: true },
            { label: 'R sin(θ)', value: (paramA * Math.sin(phase * paramB)).toFixed(2), unit: '' },
          ],
        };
      case 'limits':
        return {
          title: '3D Multivariable Limit Funnel & Approach Paths (x,y) → (0,0)',
          tag: 'lim_{(x,y)→(0,0)} f(x,y) = L',
          sliderALabel: 'Limit Height (L)',
          sliderBLabel: 'Neighborhood Radius (δ)',
          metrics: [
            { label: 'Target Limit L', value: (paramA * 0.9).toFixed(2), unit: '', highlight: true },
            { label: 'δ-Neighborhood', value: (paramB * 0.8).toFixed(2), unit: 'rad' },
            { label: 'Path Convergence', value: 'Puncture at (0,0,L)', unit: '' },
          ],
        };
      case 'derivatives':
        return {
          title: '3D Tangent Plane & Gradient Vector ∇f(x₀, y₀)',
          tag: 'z − z₀ = fₓ(x − x₀) + fᵧ(y − y₀)',
          sliderALabel: 'Paraboloid Steepness (a)',
          sliderBLabel: 'Evaluation Point Orbit Radius',
          metrics: [
            { label: 'Steepness a', value: paramA.toFixed(2), unit: '' },
            { label: '||∇f(x₀,y₀)||', value: (paramA * paramB * 1.15).toFixed(2), unit: 'slope', highlight: true },
            { label: 'Tangent Plane', value: 'Active', unit: '3D Patch' },
          ],
        };
      case 'volume-solids-revolution':
        return {
          title: '3D Solid of Revolution — Disk & Washer Slicing',
          tag: 'V = ∫ π [R(x)² − r(x)²] dx',
          sliderALabel: 'Outer Profile Scale R(x)',
          sliderBLabel: 'Inner Hollow Radius r(x)',
          metrics: [
            { label: 'Revolved Disks (n)', value: slices, unit: 'disks', highlight: true },
            { label: 'Outer Scale R', value: paramA.toFixed(2), unit: '' },
            { label: 'Est. Volume V', value: (Math.PI * paramA * paramA * 3.8).toFixed(2), unit: 'u³' },
          ],
        };
      case 'arc-length-surface-area':
        return {
          title: '3D Surface of Revolution — Frustum Ribbons & Arc Length',
          tag: 'S = ∫ 2π f(x) √(1 + [f′(x)]²) dx',
          sliderALabel: 'Profile Bulge Scale',
          sliderBLabel: 'Neck Offset Radius',
          metrics: [
            { label: 'Frustum Bands (n)', value: slices, unit: 'bands', highlight: true },
            { label: 'Arc Length L', value: (5.2 * (1 + 0.14 * paramA)).toFixed(2), unit: 'u' },
            { label: 'Surface Area S', value: (2 * Math.PI * paramA * 4.4).toFixed(2), unit: 'u²' },
          ],
        };
      case 'area-between-curves':
        return {
          title: '3D Extruded Cross-Sections Between Curves f(x) & g(x)',
          tag: 'A = ∫ [f(x) − g(x)] dx (3D Slab Extrusion)',
          sliderALabel: 'Upper Curve Height f(x)',
          sliderBLabel: 'Lower Curve Depth g(x)',
          metrics: [
            { label: '3D Slabs (n)', value: slices, unit: 'slabs', highlight: true },
            { label: 'Net Area ∫(f−g)', value: ((paramA + paramB * 0.6) * 2.9).toFixed(2), unit: 'u²' },
            { label: 'Slab Thickness Δx', value: (4.8 / slices).toFixed(2), unit: 'u' },
          ],
        };
      case 'u-substitution':
        return {
          title: '3D Coordinate Jacobian Warp: x-Domain → u = g(x) Domain',
          tag: '∫ f(g(x)) g′(x) dx = ∫ f(u) du',
          sliderALabel: 'Function Height Scale',
          sliderBLabel: 'Jacobian Stretch Factor g′(x)',
          metrics: [
            { label: 'Partitions (n)', value: slices, unit: 'prisms', highlight: true },
            { label: 'Stretch g′(x)', value: paramB.toFixed(2), unit: '×' },
            { label: 'Invariant Integral', value: (paramA * 3.6).toFixed(2), unit: 'u³' },
          ],
        };
      case 'integration-by-parts':
        return {
          title: '3D Volume Partition: u·v Box = ∫ u dv + ∫ v du',
          tag: '∫ u dv = u·v − ∫ v du',
          sliderALabel: 'u(x) Curve Scale',
          sliderBLabel: 'v(x) Curve Scale',
          metrics: [
            { label: 'Total Box u·v', value: (paramA * paramB * 3.2).toFixed(2), unit: 'u³', highlight: true },
            { label: 'Region ∫ u dv', value: (paramA * paramB * 1.85).toFixed(2), unit: 'u³' },
            { label: 'Complement ∫ v du', value: (paramA * paramB * 1.35).toFixed(2), unit: 'u³' },
          ],
        };
      case 'trigonometric-integrals':
        return {
          title: '3D Harmonic Power Surface sinᵐ(x) cosⁿ(x) & Volume Slabs',
          tag: '∫ sinᵐ(x) cosⁿ(x) dx',
          sliderALabel: 'Wave Amplitude Scale',
          sliderBLabel: 'Power / Frequency Modulation',
          metrics: [
            { label: '3D Slices (n)', value: slices, unit: 'prisms', highlight: true },
            { label: 'Amplitude', value: paramA.toFixed(2), unit: '' },
            { label: 'Periodicity Mode', value: `k = ${Math.max(1, Math.round(paramB))}`, unit: '' },
          ],
        };
      case 'trigonometric-substitution':
        return {
          title: '3D Right-Triangle Circle/Hyperbola Wedge √(a² − x²)',
          tag: 'x = a sinθ ⇒ √(a² − x²) = a cosθ',
          sliderALabel: 'Hypotenuse / Radius (a)',
          sliderBLabel: 'Sweep Angle Range (θ)',
          metrics: [
            { label: 'Radius a', value: paramA.toFixed(2), unit: '', highlight: true },
            { label: 'Radical √(a²−x²)', value: (paramA * Math.cos(0.6)).toFixed(2), unit: '' },
            { label: 'Wedge Slices (n)', value: slices, unit: 'sectors' },
          ],
        };
      case 'partial-fractions':
        return {
          title: '3D Rational Pole-Resonance Surface P(x) / [(x−r₁)(x−r₂)]',
          tag: 'R(x) = A/(x − r₁) + B/(x − r₂)',
          sliderALabel: 'Residue Weight A',
          sliderBLabel: 'Pole Separation |r₁ − r₂|',
          metrics: [
            { label: 'Residue A', value: paramA.toFixed(2), unit: '', highlight: true },
            { label: 'Pole Separation', value: (paramB * 1.4).toFixed(2), unit: 'u' },
            { label: 'Logarithmic Area', value: (paramA * Math.log(1 + paramB * 2)).toFixed(2), unit: 'u²' },
          ],
        };
      case 'improper-integrals':
        return {
          title: '3D Asymptotic Horn & Infinite Tail Decay ∫₁^∞ x⁻ᵖ dx',
          tag: 'Gabriel’s Horn & p-Test Convergence (p > 1)',
          sliderALabel: 'Initial Funnel Radius',
          sliderBLabel: 'Decay Exponent (p)',
          metrics: [
            { label: 'Exponent p', value: (paramB * 1.1).toFixed(2), unit: '', highlight: true },
            { label: 'Status', value: paramB * 1.1 > 1 ? 'Converges' : 'Diverges', unit: '' },
            { label: 'Tail Slices', value: slices, unit: 'rings' },
          ],
        };
      case 'integrals':
      default:
        return {
          title: '3D Riemann Prism Accumulation & Fundamental Theorem Surface',
          tag: '∫ₐᵇ f(x) dx = F(b) − F(a)',
          sliderALabel: 'Curve Height Scale (a)',
          sliderBLabel: 'Upper Bound / Modulation (b)',
          metrics: [
            { label: '3D Riemann Prisms (n)', value: slices, unit: 'prisms', highlight: true },
            { label: 'Accumulated Volume', value: (paramA * paramB * 3.14).toFixed(2), unit: 'u³' },
            { label: 'Partition Δx', value: (4.8 / slices).toFixed(2), unit: 'u' },
          ],
        };
    }
  };

  const meta = getSceneMeta();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, width, height);

    draw3DGrid(ctx, camera, width, height, {
      range: 4,
      baseScale,
      centerOffset,
      showCube: true,
      cubeRange: 3,
    });
    draw3DAxes(ctx, camera, width, height, {
      axisLength: 3.8,
      baseScale,
      centerOffset,
      labels: { x: 'X', y: 'Y', z: 'Z' },
    });

    const proj = (pt) => project3D(pt, camera, width, height, baseScale, centerOffset);

    if (subjectId === 'com-prog') {
      if (activeKey === 'c-programming') {
        // 3D Isometric Stack & Heap Memory Cuboids with 3D Pointer Vector
        const nCells = 6;
        for (let i = 0; i < nCells; i++) {
          const zH = i * 0.55 * (paramA * 0.6);
          draw3DParallelepiped(
            ctx,
            camera,
            width,
            height,
            [1.6, 0, 0],
            [0, 1.2, 0],
            [0, 0, 0.45],
            {
              origin: [-2.2, -0.6, zH],
              fillColor: i === 3 ? 'rgba(245, 158, 11, 0.35)' : 'rgba(56, 189, 248, 0.18)',
              strokeColor: i === 3 ? '#f59e0b' : '#38bdf8',
              baseScale,
              centerOffset,
            }
          );
        }
        // Heap allocated block in XY space
        draw3DParallelepiped(
          ctx,
          camera,
          width,
          height,
          [1.8, 0, 0],
          [0, 1.8, 0],
          [0, 0, 0.8],
          {
            origin: [1.2, -0.9, 0],
            fillColor: 'rgba(74, 222, 128, 0.25)',
            strokeColor: '#4ade80',
            baseScale,
            centerOffset,
          }
        );
        // 3D Pointer Vector from stack cell to heap
        draw3DVector(
          ctx,
          camera,
          width,
          height,
          [1.2, 0, 0.8],
          {
            from: [-0.6, 0, 3 * 0.55 * (paramA * 0.6) + 0.22],
            color: '#facc15',
            label: 'ptr → 0x10a200',
            baseScale,
            centerOffset,
          }
        );
      } else if (activeKey === 'py-programming') {
        // 3D Python Object Reference Graph
        const R = Math.min(2.8, paramA * 0.95);
        const nNodes = 5;
        const center = [0, 0, 1.0];
        const pCenter = proj(center);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(pCenter.x, pCenter.y, 14, 0, Math.PI * 2);
        ctx.fill();

        for (let k = 0; k < nNodes; k++) {
          const ang = (k / nNodes) * Math.PI * 2 + phase * 0.35;
          const target = [R * Math.cos(ang), R * Math.sin(ang), 0.3 + 0.4 * Math.sin(ang * 2)];
          draw3DVector(ctx, camera, width, height, target, {
            from: center,
            color: k % 2 === 0 ? '#4ade80' : '#a78bfa',
            label: `ref_${k}`,
            baseScale,
            centerOffset,
          });
          draw3DParallelepiped(
            ctx,
            camera,
            width,
            height,
            [0.6, 0, 0],
            [0, 0.6, 0],
            [0, 0, 0.6],
            {
              origin: [target[0] - 0.3, target[1] - 0.3, target[2] - 0.3],
              fillColor: 'rgba(250, 204, 21, 0.28)',
              strokeColor: '#facc15',
              baseScale,
              centerOffset,
            }
          );
        }
      } else if (activeKey === 'mcu') {
        // 3D Microcontroller chip body + 3D GPIO logic pins
        draw3DParallelepiped(
          ctx,
          camera,
          width,
          height,
          [3.2, 0, 0],
          [0, 1.8, 0],
          [0, 0, 0.6],
          {
            origin: [-1.6, -0.9, 0.5],
            fillColor: 'rgba(30, 41, 59, 0.85)',
            strokeColor: '#38bdf8',
            baseScale,
            centerOffset,
          }
        );
        for (let p = 0; p < 8; p++) {
          const px = -1.4 + p * 0.4;
          const isHigh = Boolean(p % 2 === 0);
          const hCol = isHigh ? paramA * 0.45 : 0.12;
          draw3DVector(ctx, camera, width, height, [px, -1.3, 0.5], {
            from: [px, -0.9, 0.5],
            color: '#94a3b8',
            baseScale,
            centerOffset,
          });
          draw3DVector(ctx, camera, width, height, [px, 1.3, 0.5 + hCol], {
            from: [px, 0.9, 0.5],
            color: isHigh ? '#4ade80' : '#f43f5e',
            label: `P${p}`,
            baseScale,
            centerOffset,
          });
        }
      } else {
        // 3D ROS2 Robot Frame & TF2 Coordinate Frames
        draw3DParallelepiped(
          ctx,
          camera,
          width,
          height,
          [2.2, 0, 0],
          [0, 1.6, 0],
          [0, 0, 0.6],
          {
            origin: [-1.1, -0.8, 0.2],
            fillColor: 'rgba(15, 23, 42, 0.75)',
            strokeColor: '#38bdf8',
            baseScale,
            centerOffset,
          }
        );
        draw3DVector(ctx, camera, width, height, [1.4, 0, 0.8], { from: [0, 0, 0.8], color: '#f43f5e', label: 'X (Forward)', baseScale, centerOffset });
        draw3DVector(ctx, camera, width, height, [0, 1.4, 0.8], { from: [0, 0, 0.8], color: '#4ade80', label: 'Y (Left)', baseScale, centerOffset });
        draw3DVector(ctx, camera, width, height, [0, 0, 2.2], { from: [0, 0, 0.8], color: '#38bdf8', label: 'Z (Up)', baseScale, centerOffset });

        const nRays = 16;
        for (let r = 0; r < nRays; r++) {
          const ang = (r / nRays) * Math.PI * 2 + phase * 0.8;
          const rayLen = 2.4 + 0.6 * Math.sin(r * 1.5);
          const rayPt = [rayLen * Math.cos(ang), rayLen * Math.sin(ang), 0.8];
          const pRay = proj(rayPt);
          ctx.fillStyle = '#facc15';
          ctx.beginPath();
          ctx.arc(pRay.x, pRay.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (subjectId === 'physics') {
      if (activeKey === 'units-and-measurement') {
        const L = Math.min(3.2, paramA);
        const W = Math.min(3.0, paramB);
        const H = Math.min(2.8, paramB * 0.85);
        draw3DParallelepiped(ctx, camera, width, height, [L, 0, 0], [0, W, 0], [0, 0, H], {
          origin: [-L / 2, -W / 2, 0],
          fillColor: 'rgba(56, 189, 248, 0.22)',
          strokeColor: '#38bdf8',
          baseScale,
          centerOffset,
        });
        draw3DVector(ctx, camera, width, height, [L / 2, -W / 2, 0], {
          from: [-L / 2, -W / 2, 0],
          color: '#f87171',
          label: `L = ${L.toFixed(1)}m`,
          baseScale,
          centerOffset,
        });
        draw3DVector(ctx, camera, width, height, [-L / 2, W / 2, 0], {
          from: [-L / 2, -W / 2, 0],
          color: '#4ade80',
          label: `W = ${W.toFixed(1)}m`,
          baseScale,
          centerOffset,
        });
        draw3DVector(ctx, camera, width, height, [-L / 2, -W / 2, H], {
          from: [-L / 2, -W / 2, 0],
          color: '#60a5fa',
          label: `H = ${H.toFixed(1)}m`,
          baseScale,
          centerOffset,
        });
      } else if (activeKey === 'kinematics') {
        // 3D Parabolic Trajectory + moving projectile + 3D velocity vector
        const tNorm = (phase * 0.25) % 1;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= 60; i++) {
          const s = i / 60;
          const x = -2.8 + s * 5.6;
          const y = -1.5 + s * 3.0 * (paramB / 2);
          const z = 4 * paramB * 1.1 * s * (1 - s);
          const p = proj([x, y, z]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Ground shadow
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        const pStart = proj([-2.8, -1.5, 0]);
        const pEnd = proj([2.8, -1.5 + 3.0 * (paramB / 2), 0]);
        ctx.moveTo(pStart.x, pStart.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const bx = -2.8 + tNorm * 5.6;
        const by = -1.5 + tNorm * 3.0 * (paramB / 2);
        const bz = 4 * paramB * 1.1 * tNorm * (1 - tNorm);
        const vz = paramB * 1.1 * (1 - 2 * tNorm) * 1.5;

        draw3DVector(ctx, camera, width, height, [bx + 1.1, by + 0.5, bz + vz], {
          from: [bx, by, bz],
          color: '#4ade80',
          label: 'v(t)',
          baseScale,
          centerOffset,
        });
        const pBall = proj([bx, by, bz]);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(pBall.x, pBall.y, 8.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeKey === 'newtons-laws') {
        // 3D Inclined Wedge + Free-Body Force Vectors
        const hRamp = Math.min(2.8, paramA * 0.9);
        const pA = proj([-2.5, -1.2, 0]);
        const pB = proj([2.5, -1.2, 0]);
        const pC = proj([-2.5, -1.2, hRamp]);
        const pD = proj([-2.5, 1.2, 0]);
        const pE = proj([2.5, 1.2, 0]);
        const pF = proj([-2.5, 1.2, hRamp]);

        ctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.lineTo(pE.x, pE.y);
        ctx.lineTo(pF.x, pF.y);
        ctx.lineTo(pC.x, pC.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pC.x, pC.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.moveTo(pF.x, pF.y);
        ctx.lineTo(pD.x, pD.y);
        ctx.stroke();

        // Block at midpoint of ramp
        const bx = 0;
        const by = 0;
        const bz = hRamp * 0.5 + 0.2;
        const slopeAng = Math.atan2(hRamp, 5.0);
        draw3DVector(ctx, camera, width, height, [bx, by, bz - 1.5], {
          from: [bx, by, bz],
          color: '#f43f5e',
          label: 'mg',
          baseScale,
          centerOffset,
        });
        draw3DVector(
          ctx,
          camera,
          width,
          height,
          [bx + 1.4 * Math.sin(slopeAng), by, bz + 1.4 * Math.cos(slopeAng)],
          {
            from: [bx, by, bz],
            color: '#4ade80',
            label: 'Normal N',
            baseScale,
            centerOffset,
          }
        );
        draw3DVector(
          ctx,
          camera,
          width,
          height,
          [bx - 1.2 * Math.cos(slopeAng), by, bz + 1.2 * Math.sin(slopeAng)],
          {
            from: [bx, by, bz],
            color: '#facc15',
            label: 'Friction f_k',
            baseScale,
            centerOffset,
          }
        );
      } else if (activeKey === 'work-and-energy') {
        // 3D Roller Coaster Ribbon Track in (X, Y, Z) with Moving Cart & 3D Energy Pillars
        const steps = 90;
        const track3D = (u) => {
          const x = -3.2 + u * 6.4;
          const y = 1.4 * Math.sin(u * Math.PI * 2);
          const z =
            0.3 +
            paramA * 1.15 * Math.pow(Math.cos(u * Math.PI * 0.5), 2) +
            0.85 * Math.pow(Math.sin(u * Math.PI * 2), 2);
          return [x, y, z];
        };

        // Vertical support pillars to XY floor
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1.2;
        for (let i = 0; i <= 18; i++) {
          const u = i / 18;
          const pt = track3D(u);
          const pTop = proj(pt);
          const pBot = proj([pt[0], pt[1], 0]);
          ctx.beginPath();
          ctx.moveTo(pBot.x, pBot.y);
          ctx.lineTo(pTop.x, pTop.y);
          ctx.stroke();
        }

        // 3D Track Ribbon
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const p = proj(track3D(i / steps));
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Moving 3D Cart
        const uCart = (Math.sin(phase * 0.45) + 1) * 0.48;
        const cPt = track3D(uCart);
        const cNext = track3D(Math.min(1, uCart + 0.02));
        const pCart = proj(cPt);

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(pCart.x, pCart.y, 8.5, 0, Math.PI * 2);
        ctx.fill();

        draw3DVector(
          ctx,
          camera,
          width,
          height,
          [
            cPt[0] + (cNext[0] - cPt[0]) * 18,
            cPt[1] + (cNext[1] - cPt[1]) * 18,
            cPt[2] + (cNext[2] - cPt[2]) * 18,
          ],
          {
            from: cPt,
            color: '#4ade80',
            label: 'v (Kinetic)',
            baseScale,
            centerOffset,
          }
        );
      } else if (activeKey === 'momentum' || activeKey === 'momentum-and-collisions') {
        // 3D Two-Body Oblique Collision & Momentum Conservation Plane
        const cyc = ((phase * 0.32) % 2) - 1; // -1 to +1 around collision t = 0
        const scatterAngle = paramB * 0.38;
        const speed1 = paramA * 0.95;

        let p1Pos, p2Pos, v1Vec, v2Vec;
        if (cyc < 0) {
          // Approaching collision at origin
          p1Pos = [cyc * 2.8, cyc * 0.6, 0.5];
          p2Pos = [-cyc * 2.0, -cyc * 0.4, 0.5];
          v1Vec = [speed1, 0.25, 0];
          v2Vec = [-speed1 * 0.65, -0.15, 0];
        } else {
          // Post-collision 3D scattering
          p1Pos = [
            cyc * 2.2 * Math.cos(scatterAngle),
            cyc * 2.2 * Math.sin(scatterAngle),
            0.5 + cyc * 0.7,
          ];
          p2Pos = [
            -cyc * 2.0 * Math.cos(scatterAngle),
            -cyc * 2.0 * Math.sin(scatterAngle),
            0.5 - cyc * 0.5,
          ];
          v1Vec = [
            speed1 * 0.8 * Math.cos(scatterAngle),
            speed1 * 0.8 * Math.sin(scatterAngle),
            0.4,
          ];
          v2Vec = [
            -speed1 * 0.75 * Math.cos(scatterAngle),
            -speed1 * 0.75 * Math.sin(scatterAngle),
            -0.35,
          ];
        }

        // Collision flash ring at origin
        if (Math.abs(cyc) < 0.14) {
          const pOrigin = proj([0, 0, 0.5]);
          ctx.strokeStyle = '#facc15';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(pOrigin.x, pOrigin.y, 24 * (0.16 - Math.abs(cyc)) * 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        draw3DVector(
          ctx,
          camera,
          width,
          height,
          [p1Pos[0] + v1Vec[0], p1Pos[1] + v1Vec[1], p1Pos[2] + v1Vec[2]],
          { from: p1Pos, color: '#38bdf8', label: 'p₁', baseScale, centerOffset }
        );
        draw3DVector(
          ctx,
          camera,
          width,
          height,
          [p2Pos[0] + v2Vec[0], p2Pos[1] + v2Vec[1], p2Pos[2] + v2Vec[2]],
          { from: p2Pos, color: '#f43f5e', label: 'p₂', baseScale, centerOffset }
        );

        const s1 = proj(p1Pos);
        const s2 = proj(p2Pos);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(s1.x, s1.y, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(s2.x, s2.y, 9.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (
        activeKey === 'circular-motion' ||
        activeKey === 'circular-motion-and-gravitation'
      ) {
        // 3D Conical Pendulum & Orbital Dynamics with Centripetal F_c and Angular Momentum L = r × p
        const R = Math.min(2.9, paramA * 1.05);
        const apex = [0, 0, 2.7];
        const ang = phase * paramB;
        const bob = [R * Math.cos(ang), R * Math.sin(ang), 0.35];

        // Orbit circle in z = 0.35 plane
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.55)';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let i = 0; i <= 72; i++) {
          const t = (i / 72) * Math.PI * 2;
          const p = proj([R * Math.cos(t), R * Math.sin(t), 0.35]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Conical tether string from apex to bob
        const pApex = proj(apex);
        const pBob = proj(bob);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pApex.x, pApex.y);
        ctx.lineTo(pBob.x, pBob.y);
        ctx.stroke();

        // Centripetal Force F_c pointing to center (0,0,0.35)
        draw3DVector(ctx, camera, width, height, [0, 0, 0.35], {
          from: bob,
          color: '#f43f5e',
          label: 'F_c (Centripetal)',
          baseScale,
          centerOffset,
        });

        // Tangential Velocity v
        draw3DVector(
          ctx,
          camera,
          width,
          height,
          [bob[0] - 1.3 * Math.sin(ang), bob[1] + 1.3 * Math.cos(ang), 0.35],
          { from: bob, color: '#4ade80', label: 'v_t', baseScale, centerOffset }
        );

        // Axial Angular Momentum Vector L = r × p
        draw3DVector(ctx, camera, width, height, [0, 0, 2.5], {
          from: [0, 0, 0],
          color: '#a855f7',
          label: 'L = r × p',
          baseScale,
          centerOffset,
        });

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(pBob.x, pBob.y, 9.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeKey === 'oscillations' || activeKey === 'oscillations-and-shm') {
        // 3D Vertical Helical Spring + Mass Block + 3D Phase-Space Helix
        const zDisp = Math.min(1.3, paramA * 0.55) * Math.cos(phase * paramB);
        const zMass = 0.2 + zDisp;
        const zTop = 2.9;

        // 3D Coiled Spring from zTop down to zMass
        const coils = 8;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const u = i / 120;
          const theta = u * coils * Math.PI * 2;
          const sx = -1.5 + 0.45 * Math.cos(theta);
          const sy = 0.45 * Math.sin(theta);
          const sz = zTop - u * (zTop - (zMass + 0.35));
          const p = proj([sx, sy, sz]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Oscillating 3D Mass Cuboid
        draw3DParallelepiped(ctx, camera, width, height, [0.9, 0, 0], [0, 0.9, 0], [0, 0, 0.7], {
          origin: [-1.95, -0.45, zMass - 0.35],
          fillColor: 'rgba(245, 158, 11, 0.3)',
          strokeColor: '#f59e0b',
          baseScale,
          centerOffset,
        });

        // Restoring Force Vector F = -kz
        draw3DVector(ctx, camera, width, height, [-1.5, 0, zMass - zDisp * 1.3], {
          from: [-1.5, 0, zMass],
          color: '#4ade80',
          label: 'F = −kz',
          baseScale,
          centerOffset,
        });

        // 3D Phase-Space Wave Trail along +X axis
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        for (let i = 0; i <= 80; i++) {
          const u = i / 80;
          const wx = -0.6 + u * 3.4;
          const wy = 0.75 * Math.sin(phase * paramB - u * 6);
          const wz = 0.2 + Math.min(1.3, paramA * 0.55) * Math.cos(phase * paramB - u * 6);
          const p = proj([wx, wy, wz]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      } else if (activeKey === 'waves' || activeKey === 'wave-foundations') {
        // Orthogonal 3D Transverse + Electromagnetic Coupled Wave (Y & Z planes along X)
        const amp = Math.min(1.6, paramA * 0.65);
        const kMode = Math.max(1, Math.round(paramB * 1.8));
        const nPts = 90;

        // Vertical Z-Wave (Electric / Transverse mode 1)
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= nPts; i++) {
          const u = i / nPts;
          const x = -3.2 + u * 6.4;
          const z = amp * Math.sin(kMode * x - phase * 2);
          const p = proj([x, 0, z]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Orthogonal Y-Wave (Magnetic / Transverse mode 2)
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        for (let i = 0; i <= nPts; i++) {
          const u = i / nPts;
          const x = -3.2 + u * 6.4;
          const y = amp * Math.sin(kMode * x - phase * 2);
          const p = proj([x, y, 0]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Amplitude vectors along X
        for (let i = 0; i <= 24; i++) {
          const u = i / 24;
          const x = -3.0 + u * 6.0;
          const val = amp * Math.sin(kMode * x - phase * 2);
          const p0 = proj([x, 0, 0]);
          const pZ = proj([x, 0, val]);
          const pY = proj([x, val, 0]);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(pZ.x, pZ.y);
          ctx.stroke();

          ctx.strokeStyle = 'rgba(244, 63, 94, 0.35)';
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(pY.x, pY.y);
          ctx.stroke();
        }
      } else if (activeKey === 'sound-waves') {
        // 3D Cylindrical Acoustic Resonance Tube + Compression/Rarefaction Rings
        const nRings = 22;
        const harm = Math.max(1, Math.round(paramB * 2));
        const R = 1.25;
        for (let i = 0; i <= nRings; i++) {
          const u = i / nRings;
          const xBase = -3.0 + u * 6.0;
          const disp = 0.28 * paramA * Math.sin(u * harm * Math.PI) * Math.cos(phase * 2.2);
          const x = xBase + disp;
          const pressure = Math.abs(Math.cos(u * harm * Math.PI) * Math.cos(phase * 2.2));

          ctx.strokeStyle =
            pressure > 0.65
              ? 'rgba(250, 204, 21, 0.85)'
              : 'rgba(56, 189, 248, 0.42)';
          ctx.lineWidth = pressure > 0.65 ? 2.4 : 1.3;
          ctx.beginPath();
          for (let j = 0; j <= 28; j++) {
            const th = (j / 28) * Math.PI * 2;
            const p = proj([x, R * Math.cos(th), R * Math.sin(th)]);
            if (j === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
        }
      } else if (activeKey === 'fluid-mechanics') {
        // 3D Venturi Constricted Pipe + Streamline Particles + Pressure Manometer Columns
        const nRings = 18;
        const rProfile = (x) => {
          const rInlet = Math.min(1.5, paramA * 0.58);
          const constrict = Math.min(0.65, paramB * 0.22);
          return Math.max(0.38, rInlet * (1 - constrict * Math.exp(-0.65 * x * x)));
        };

        for (let i = 0; i <= nRings; i++) {
          const x = -3.0 + (i / nRings) * 6.0;
          const R = rProfile(x);
          ctx.strokeStyle = Math.abs(x) < 0.4 ? '#facc15' : 'rgba(56, 189, 248, 0.45)';
          ctx.lineWidth = Math.abs(x) < 0.4 ? 2.4 : 1.3;
          ctx.beginPath();
          for (let j = 0; j <= 28; j++) {
            const th = (j / 28) * Math.PI * 2;
            const p = proj([x, R * Math.cos(th), R * Math.sin(th)]);
            if (j === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
        }

        // Flowing fluid particles accelerating through throat
        for (let k = 0; k < 12; k++) {
          const u = ((phase * 0.28 + k / 12) % 1);
          const x = -3.0 + u * 6.0;
          const R = rProfile(x) * 0.5;
          const ang = k * 1.7;
          const pt = proj([x, R * Math.cos(ang), R * Math.sin(ang)]);
          ctx.fillStyle = Math.abs(x) < 0.8 ? '#4ade80' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Thermodynamics: 3D Ideal Gas Cylinder + Moving Piston + 3D Bouncing Gas Molecules
        const hPiston = Math.min(2.8, Math.max(0.9, paramA * 0.95));
        const R = 1.65;

        // Cylinder base & piston cap rings
        [-0.6, hPiston].forEach((zLevel, idx) => {
          ctx.fillStyle = idx === 1 ? 'rgba(245, 158, 11, 0.28)' : 'rgba(56, 189, 248, 0.14)';
          ctx.strokeStyle = idx === 1 ? '#f59e0b' : '#38bdf8';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          for (let j = 0; j <= 36; j++) {
            const th = (j / 36) * Math.PI * 2;
            const p = proj([R * Math.cos(th), R * Math.sin(th), zLevel]);
            if (j === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        });

        // Vertical cylinder walls
        for (let j = 0; j < 8; j++) {
          const th = (j / 8) * Math.PI * 2;
          const pBot = proj([R * Math.cos(th), R * Math.sin(th), -0.6]);
          const pTop = proj([R * Math.cos(th), R * Math.sin(th), hPiston]);
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(pBot.x, pBot.y);
          ctx.lineTo(pTop.x, pTop.y);
          ctx.stroke();
        }

        // 3D Kinetic Gas Molecules
        for (let m = 0; m < 16; m++) {
          const spd = paramB * 1.4;
          const rM = R * 0.72 * Math.sin(m * 2.1 + phase * spd * 0.7);
          const ang = m * 1.3 + phase * spd * 0.5;
          const zM =
            -0.4 +
            (hPiston + 0.2) * (0.5 + 0.45 * Math.sin(m * 3.7 + phase * spd * 1.1));
          const pM = proj([rM * Math.cos(ang), rM * Math.sin(ang), zM]);
          ctx.fillStyle = paramB > 1.8 ? '#f43f5e' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(pM.x, pM.y, 5.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else {
      // =======================================================================
      // MATHEMATICS & INTEGRATION SUB-TOPICS (BESPOKE 3D VISUALIZATIONS)
      // =======================================================================
      if (activeKey === 'number-systems') {
        // 3D Complex Euler Helix: x = t, y = R cos(ωt), z = R sin(ωt)
        const R = Math.min(2.4, paramA * 0.85);
        const freq = Math.max(0.8, paramB * 1.4);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= 120; i++) {
          const u = i / 120;
          const x = -3.0 + u * 6.0;
          const th = u * Math.PI * 2 * freq + phase;
          const y = R * Math.cos(th);
          const z = R * Math.sin(th);
          const p = proj([x, y, z]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Rotating complex phasor vector at x = 0
        const curTh = Math.PI * freq + phase;
        const py = R * Math.cos(curTh);
        const pz = R * Math.sin(curTh);
        draw3DVector(ctx, camera, width, height, [0, py, pz], {
          from: [0, 0, 0],
          color: '#facc15',
          label: 'z = r·e^(iθ)',
          baseScale,
          centerOffset,
        });
      } else if (activeKey === 'algebraic-expressions') {
        // 3D Binomial Cube (a + b)³ Exploded / Partitioned Cuboids
        const a = Math.min(1.7, paramA * 0.65);
        const b = Math.min(1.2, paramB * 0.55);
        const gap = 0.12 + 0.08 * Math.sin(phase);
        const orig = -(a + b) / 2;

        const blocks = [
          { o: [orig, orig, 0], d: [a, a, a], fill: 'rgba(56, 189, 248, 0.32)', stroke: '#38bdf8' },
          { o: [orig + a + gap, orig, 0], d: [b, a, a], fill: 'rgba(167, 139, 250, 0.25)', stroke: '#a78bfa' },
          { o: [orig, orig + a + gap, 0], d: [a, b, a], fill: 'rgba(167, 139, 250, 0.25)', stroke: '#a78bfa' },
          { o: [orig, orig, a + gap], d: [a, a, b], fill: 'rgba(167, 139, 250, 0.25)', stroke: '#a78bfa' },
          { o: [orig + a + gap, orig + a + gap, a + gap], d: [b, b, b], fill: 'rgba(250, 204, 21, 0.35)', stroke: '#facc15' },
        ];
        blocks.forEach((bk) => {
          draw3DParallelepiped(
            ctx,
            camera,
            width,
            height,
            [bk.d[0], 0, 0],
            [0, bk.d[1], 0],
            [0, 0, bk.d[2]],
            {
              origin: bk.o,
              fillColor: bk.fill,
              strokeColor: bk.stroke,
              baseScale,
              centerOffset,
            }
          );
        });
      } else if (activeKey === 'trigonometry') {
        // 3D Unit Cylinder + Sine & Cosine Orthogonal Wave Projections
        const R = Math.min(2.1, paramA * 0.78);
        const ang = phase * paramB;
        // Unit circle in Y-Z plane at x = -2.2
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let j = 0; j <= 48; j++) {
          const th = (j / 48) * Math.PI * 2;
          const p = proj([-2.2, R * Math.cos(th), R * Math.sin(th)]);
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        const tip = [-2.2, R * Math.cos(ang), R * Math.sin(ang)];
        draw3DVector(ctx, camera, width, height, tip, {
          from: [-2.2, 0, 0],
          color: '#facc15',
          label: 'R∠θ',
          baseScale,
          centerOffset,
        });

        // Propagated 3D Helix + Sine/Cosine shadows along +X
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.8;
        ctx.beginPath();
        for (let i = 0; i <= 80; i++) {
          const u = i / 80;
          const x = -2.2 + u * 5.2;
          const th = ang - u * Math.PI * 3;
          const p = proj([x, R * Math.cos(th), R * Math.sin(th)]);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      } else if (activeKey === 'limits') {
        // 3D Limit Funnel Surface converging toward punctured limit ring at (0, 0, L)
        const L = Math.min(2.4, paramA * 0.9);
        const nRings = 10;
        for (let rIdx = 1; rIdx <= nRings; rIdx++) {
          const r = (rIdx / nRings) * 2.8;
          const z = L * Math.exp(-0.28 * r * r);
          ctx.strokeStyle = rIdx === 2 ? '#facc15' : 'rgba(56, 189, 248, 0.5)';
          ctx.lineWidth = rIdx === 2 ? 2.5 : 1.3;
          ctx.beginPath();
          for (let j = 0; j <= 36; j++) {
            const th = (j / 36) * Math.PI * 2;
            const p = proj([r * Math.cos(th), r * Math.sin(th), z]);
            if (j === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
        }
        // Approach rays along X and Y axes toward (0,0,L)
        const rApproach = 0.25 + 2.2 * (0.5 + 0.5 * Math.sin(phase));
        const zApp = L * Math.exp(-0.28 * rApproach * rApproach);
        draw3DVector(ctx, camera, width, height, [0, 0, L], {
          from: [rApproach, 0, zApp],
          color: '#4ade80',
          label: 'Path 1 → L',
          baseScale,
          centerOffset,
        });
        draw3DVector(ctx, camera, width, height, [0, 0, L], {
          from: [0, rApproach, zApp],
          color: '#f43f5e',
          label: 'Path 2 → L',
          baseScale,
          centerOffset,
        });
      } else if (activeKey === 'derivatives') {
        // 3D Paraboloid z = f(x,y) + Moving Tangent Plane + Gradient / Normal Vector
        const steep = paramA * 0.22;
        const evalZ = (x, y) => 2.2 - steep * (x * x + y * y);
        const gridN = 10;
        for (let ix = -gridN / 2; ix < gridN / 2; ix++) {
          for (let iy = -gridN / 2; iy < gridN / 2; iy++) {
            const x0 = (ix / (gridN / 2)) * 2.5;
            const y0 = (iy / (gridN / 2)) * 2.5;
            const x1 = ((ix + 1) / (gridN / 2)) * 2.5;
            const y1 = ((iy + 1) / (gridN / 2)) * 2.5;
            const p00 = proj([x0, y0, evalZ(x0, y0)]);
            const p10 = proj([x1, y0, evalZ(x1, y0)]);
            const p11 = proj([x1, y1, evalZ(x1, y1)]);
            const p01 = proj([x0, y1, evalZ(x0, y1)]);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p00.x, p00.y);
            ctx.lineTo(p10.x, p10.y);
            ctx.lineTo(p11.x, p11.y);
            ctx.lineTo(p01.x, p01.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }

        // Orbiting tangent point (x0, y0, z0)
        const rOrbit = Math.min(1.6, paramB * 0.65);
        const x0 = rOrbit * Math.cos(phase * 0.6);
        const y0 = rOrbit * Math.sin(phase * 0.6);
        const z0 = evalZ(x0, y0);
        const fx = -2 * steep * x0;
        const fy = -2 * steep * y0;
        const d = 0.9;

        const corners = [
          [x0 - d, y0 - d, z0 + fx * -d + fy * -d],
          [x0 + d, y0 - d, z0 + fx * d + fy * -d],
          [x0 + d, y0 + d, z0 + fx * d + fy * d],
          [x0 - d, y0 + d, z0 + fx * -d + fy * d],
        ].map(proj);

        ctx.fillStyle = 'rgba(250, 204, 21, 0.28)';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(corners[0].x, corners[0].y);
        corners.slice(1).forEach((c) => ctx.lineTo(c.x, c.y));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        draw3DVector(ctx, camera, width, height, [x0 - fx * 1.2, y0 - fy * 1.2, z0 + 1.1], {
          from: [x0, y0, z0],
          color: '#4ade80',
          label: 'Normal / ∇f',
          baseScale,
          centerOffset,
        });
      } else if (
        activeKey === 'volume-solids-revolution' ||
        activeKey === 'arc-length-surface-area' ||
        activeKey === 'improper-integrals'
      ) {
        // 3D Solid / Surface of Revolution / Gabriel's Horn around X-axis
        const nRings = Math.max(6, Math.min(24, slices));
        for (let i = 0; i <= nRings; i++) {
          const u = i / nRings;
          const x = -2.6 + u * 5.2;
          const radius =
            activeKey === 'improper-integrals'
              ? Math.min(2.3, (paramA * 0.95) / Math.pow(1 + u * 3.2, paramB * 0.85))
              : 0.45 + 0.65 * paramA * Math.sin(u * Math.PI) + 0.25 * paramB;
          ctx.strokeStyle =
            i === Math.floor(nRings / 2) ? '#facc15' : 'rgba(56, 189, 248, 0.5)';
          ctx.lineWidth = i === Math.floor(nRings / 2) ? 2.6 : 1.3;
          ctx.beginPath();
          for (let j = 0; j <= 32; j++) {
            const theta = (j / 32) * Math.PI * 2;
            const y = radius * Math.cos(theta);
            const z = radius * Math.sin(theta);
            const p = proj([x, y, z]);
            if (j === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
          ctx.stroke();
        }
      } else {
        // 3D Surface Mesh z = f(x, y) + 3D Riemann Volume Columns under Curve
        // Tailored height function for each Integration Technique & Functions topic
        const gridN = 12;
        const evalSurface = (x, y) => {
          if (activeKey === 'area-between-curves') {
            return 0.45 * paramA * Math.cos(0.6 * x) - 0.2 * paramB * (y * y - 2);
          }
          if (activeKey === 'integration-by-parts') {
            return 0.35 * paramA * (x + 3) * 0.35 * Math.cos(0.5 * y * paramB);
          }
          if (activeKey === 'partial-fractions') {
            const d1 = (x + 1.1) * (x + 1.1) + y * y + 0.45;
            const d2 = (x - 1.1) * (x - 1.1) + y * y + 0.45;
            return 0.65 * paramA / d1 + 0.55 * paramB / d2;
          }
          if (activeKey === 'trigonometric-substitution') {
            return Math.sqrt(Math.max(0.1, paramA * paramA * 1.4 - 0.35 * (x * x + y * y)));
          }
          return (
            0.35 * paramA * Math.cos(0.75 * x + phase * 0.3) * Math.cos(0.75 * y) +
            0.25 * paramB * (1 - 0.1 * (x * x + y * y))
          );
        };

        for (let ix = -gridN / 2; ix < gridN / 2; ix++) {
          for (let iy = -gridN / 2; iy < gridN / 2; iy++) {
            const x0 = (ix / (gridN / 2)) * 2.8;
            const y0 = (iy / (gridN / 2)) * 2.8;
            const x1 = ((ix + 1) / (gridN / 2)) * 2.8;
            const y1 = ((iy + 1) / (gridN / 2)) * 2.8;

            const p00 = proj([x0, y0, evalSurface(x0, y0)]);
            const p10 = proj([x1, y0, evalSurface(x1, y0)]);
            const p11 = proj([x1, y1, evalSurface(x1, y1)]);
            const p01 = proj([x0, y1, evalSurface(x0, y1)]);

            ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.48)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p00.x, p00.y);
            ctx.lineTo(p10.x, p10.y);
            ctx.lineTo(p11.x, p11.y);
            ctx.lineTo(p01.x, p01.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }

        // Highlighted 3D Riemann Volume Prisms along Y = 0 plane
        const nBars = Math.max(4, Math.min(20, slices));
        for (let i = 0; i < nBars; i++) {
          const u = i / nBars;
          const x = -2.4 + u * 4.8;
          const dx = 4.8 / nBars;
          const zH = Math.max(0.22, evalSurface(x, 0) + 0.4);
          draw3DParallelepiped(
            ctx,
            camera,
            width,
            height,
            [dx * 0.85, 0, 0],
            [0, 0.48, 0],
            [0, 0, zH],
            {
              origin: [x, -0.24, 0],
              fillColor:
                activeKey === 'integration-by-parts' && i >= nBars / 2
                  ? 'rgba(167, 139, 250, 0.28)'
                  : 'rgba(250, 204, 21, 0.24)',
              strokeColor:
                activeKey === 'integration-by-parts' && i >= nBars / 2
                  ? '#a78bfa'
                  : '#facc15',
              baseScale,
              centerOffset,
            }
          );
        }
      }
    }

    drawOrientationGizmo(ctx, camera, width);
  }, [subjectId, activeKey, camera, paramA, paramB, slices, phase, baseScale, centerOffset]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">{meta.title}</h3>
          <span className="viz-header__tag">{meta.tag}</span>
        </div>
      </header>

      <div className="viz-metrics-bar">
        {meta.metrics.map((m, idx) => (
          <MetricBadge
            key={idx}
            label={m.label}
            value={m.value}
            unit={m.unit}
            highlight={m.highlight}
          />
        ))}
      </div>

      <div className="viz-canvas-area" style={{ height: '500px' }}>
        <IsometricToolbar
          camera={camera}
          setPreset={setPreset}
          hintText="Drag anywhere on the 3D canvas to orbit pitch & yaw • Use Isometric / Top / Front / Side buttons • Scroll to zoom"
        />
        <canvas ref={canvasRef} width={920} height={500} />
      </div>

      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label={meta.sliderALabel}
            value={paramA}
            min={0.6}
            max={3.4}
            step={0.1}
            unit=""
            onChange={setParamA}
          />
          <SliderControl
            label={meta.sliderBLabel}
            value={paramB}
            min={0.5}
            max={3.0}
            step={0.1}
            unit=""
            onChange={setParamB}
          />
          {subjectId === 'mathematics' && (
            <SliderControl
              label="3D Slices / Mesh Resolution (n)"
              value={slices}
              min={4}
              max={24}
              step={2}
              unit=" slices"
              onChange={setSlices}
            />
          )}
        </div>

        <PlaybackBar
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((p) => !p)}
          onReset={() => setPhase(0)}
          speed={simSpeed}
          onSpeedChange={setSimSpeed}
        />
      </div>
    </div>
  );
}
