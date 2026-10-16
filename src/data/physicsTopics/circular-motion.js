/**
 * Physics Topic: Circular Motion & Gravitation
 */
const circularMotionData = {
  id: 'circular-motion',
  title: 'Circular & Rotational Motion',
  subtitle: 'Dynamics of rotation: centripetal acceleration, rotational kinematics, torque, moment of inertia, and angular momentum.',
  level: 'Intermediate',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'Circular and rotational motion describe systems rotating about a fixed center or axis. While kinematics tracks linear displacements, rotational dynamics introduces angular displacement (θ), angular velocity (ω), and angular acceleration (α).',
    'Torque (τ = r × F) causes angular acceleration resisted by rotational inertia (I). Total angular momentum (L = Iω) remains strictly conserved in the absence of external net torque.',
  ],
  keyConcepts: [
    {
      title: 'Centripetal Acceleration vs. Inertia',
      content:
        'Turning requires an inward net centripetal force: Fc = m v²/r. "Centrifugal force" is simply the body’s inertia attempting to continue in a straight tangent line.',
    },
    {
      title: 'Linear-Angular Conversion',
      content:
        'Angular quantities convert to tangential quantities via radius r: arc length s = θr, tangential speed v = ωr, and tangential acceleration at = αr.',
    },
    {
      title: 'Torque & Rotational Inertia',
      content:
        'Torque (|τ| = r F sinθ) is the rotational analog of force. Rotational inertia (I = ∫ r² dm) measures resistance to angular acceleration (Στ = Iα).',
    },
    {
      title: 'Conservation of Angular Momentum',
      content:
        'Without external torque (Στ = 0), total angular momentum (L = Iω) is conserved: I1 ω1 = I2 ω2. Pulling arms inward decreases I and spins a skater faster.',
    },
  ],
  equations: [
    {
      name: 'Centripetal Acceleration',
      latex: 'a_c = \\frac{v^2}{r} = \\omega^2 r = \\frac{4\\pi^2 r}{T^2}',
      summary:
        'Calculates the inward radial acceleration required to keep a mass turning along a circle of radius r at speed v.',
      conditions: ['Circular path of fixed radius r', 'Points perpendicular to velocity towards center of curvature'],
      variables: [
        {
          symbol: 'a_c',
          name: 'Centripetal Acceleration',
          unit: '\\text{m/s}^2',
          description: 'The rate of directional change of the tangential velocity vector.',
          connections:
            'Grows quadratically with tangential speed v (a_c ∝ v²) and inversely with radius r. Taking a sharp corner (half the radius) at double the speed increases required centripetal acceleration by 2² / (1/2) = 8 times!',
        },
        {
          symbol: 'v',
          name: 'Tangential Speed',
          unit: '\\text{m/s}',
          description: 'The linear speed along the circular perimeter.',
          connections:
            'Quadratic relationship with acceleration. Explains why highway curves must have much larger radii r for high-speed traffic.',
        },
        {
          symbol: 'r',
          name: 'Radius of Curvature',
          unit: '\\text{m}',
          description: 'Distance from the center of rotation to the moving body.',
          connections:
            'At constant speed v, increasing radius reduces required acceleration (gentle curve). At constant angular rate ω, increasing radius increases acceleration (outer edges experience intense radial pull).',
        },
        {
          symbol: '\\omega',
          name: 'Angular Velocity',
          unit: '\\text{rad/s}',
          description: 'The rate of rotational angle sweep (ω = 2π / T).',
          connections:
            'Proportional to 1/T. Doubling rotational speed (RPM) quadruples centripetal acceleration at fixed radius.',
        },
        {
          symbol: 'T',
          name: 'Period of Revolution',
          unit: '\\text{s}',
          description: 'The time required to complete one full circular lap.',
          connections:
            'Inversely squared in acceleration (a_c ∝ 1/T²): halving the lap time quadruples the inward acceleration.',
        },
      ],
    },
    {
      name: 'Centripetal Force Law',
      latex: 'F_c = m a_c = \\frac{m v^2}{r} = m \\omega^2 r',
      summary:
        'Determines the net inward force required to sustain uniform circular motion for a body of mass m.',
      conditions: ['Must be supplied by real physical forces (tension, normal, gravity, friction)'],
      variables: [
        {
          symbol: 'F_c',
          name: 'Centripetal Force Magnitude',
          unit: '\\text{N}',
          description: 'The net inward radial force necessary to constrain motion to a circle.',
          connections:
            'Directly proportional to mass m, radius r (at fixed ω), and speed squared v². If string tension cannot supply this required Fc, the string snaps and the mass flies off along a tangent straight line.',
        },
        {
          symbol: 'm',
          name: 'Mass',
          unit: '\\text{kg}',
          description: 'Mass of the revolving object.',
          connections:
            'Direct linear relationship: twice the mass requires twice the inward centripetal force to maintain the same circle.',
        },
        {
          symbol: 'a_c',
          name: 'Centripetal Acceleration',
          unit: '\\text{m/s}^2',
          description: 'Inward radial acceleration (v²/r or ω²r).',
          connections:
            'Multiplied by mass m to yield net inward force Fc.',
        },
        {
          symbol: 'v',
          name: 'Tangential Speed',
          unit: '\\text{m/s}',
          description: 'Linear speed along the circular path.',
          connections:
            'Doubling speed quadruples the required inward holding force.',
        },
        {
          symbol: 'r',
          name: 'Circle Radius',
          unit: '\\text{m}',
          description: 'Radius of the circular trajectory.',
          connections:
            'At fixed linear speed v, tighter turns (smaller r) demand larger Fc.',
        },
        {
          symbol: '\\omega',
          name: 'Angular Velocity',
          unit: '\\text{rad/s}',
          description: 'Rate of rotation in radians per second.',
          connections:
            'Squared in mω²r: doubling spin rate quadruples inward force.',
        },
      ],
    },
    {
      name: 'Orbital Speed in a Circular Gravitational Orbit',
      latex: 'v_{\\text{orbit}} = \\sqrt{\\frac{G M}{r}}, \\quad T = 2\\pi \\sqrt{\\frac{r^3}{G M}}',
      summary:
        'Predicts orbital speed and period T for a satellite orbiting a massive central body of mass M (Kepler’s Third Law).',
      conditions: ['Circular orbit', 'Satellite mass m is negligible compared to primary mass M (m << M)'],
      variables: [
        {
          symbol: 'v_{\\text{orbit}}',
          name: 'Orbital Velocity',
          unit: '\\text{m/s}',
          description: 'The horizontal speed required to maintain a stable circular orbit without falling into the central body.',
          connections:
            'Notice that satellite mass m cancels out completely! A space station and a tiny wrench orbit side-by-side at identical velocity. Orbital speed decreases with increasing altitude (v ∝ 1/√r).',
        },
        {
          symbol: 'G',
          name: 'Newtonian Gravitational Constant',
          unit: '\\text{N}\\cdot\\text{m}^2/\\text{kg}^2 \\approx 6.674 \\times 10^{-11}',
          description: 'Fundamental physical constant governing the strength of gravitational interaction.',
          connections:
            'Universal constant setting the scale of gravity throughout the cosmos.',
        },
        {
          symbol: 'M',
          name: 'Central Body Mass',
          unit: '\\text{kg}',
          description: 'Mass of the central attracting body (e.g., Earth or the Sun).',
          connections:
            'Directly increases orbital speed: orbiting a supermassive black hole requires vastly higher speeds than orbiting the Earth at the same orbital radius.',
        },
        {
          symbol: 'r',
          name: 'Orbital Radius',
          unit: '\\text{m}',
          description: 'Distance from the center of the central body to the orbiting satellite.',
          connections:
            'Higher orbits have slower speeds (v ∝ r⁻¹/²) and longer periods (T ∝ r³/²).',
        },
        {
          symbol: 'T',
          name: 'Orbital Period',
          unit: '\\text{s}',
          description: 'Time taken to complete one full revolution (Kepler’s Third Law: T² ∝ r³).',
          connections:
            'Farther orbits take dramatically longer periods both because the circumference (2πr) is larger AND because orbital speed v is slower.',
        },
      ],
    },
    {
      name: 'Linear-Angular Relations & Revolution Period',
      latex: 's = \\theta r, \\quad v = \\omega r, \\quad a_t = \\alpha r, \\quad T = \\frac{2\\pi r}{v} = \\frac{2\\pi}{\\omega}',
      summary:
        'Converts rotational angular quantities (angle, angular speed, angular acceleration) into linear tangential quantities along the path.',
      conditions: ['θ must be expressed strictly in radians', 'Rigid body rotation about a fixed axis'],
      variables: [
        {
          symbol: 's, v, a_t',
          name: 'Tangential Quantities',
          unit: '\\text{m, m/s, m/s}^2',
          description: 'Arc length, tangential velocity, and tangential acceleration along the circular circumference.',
          connections:
            'Directly proportional to radius r. Points farther from the rotation axis move faster through space.',
        },
        {
          symbol: '\\theta, \\omega, \\alpha',
          name: 'Rotational Quantities',
          unit: '\\text{rad, rad/s, rad/s}^2',
          description: 'Angular displacement, angular velocity, and angular acceleration.',
          connections:
            'Shared by all parts of a rigid rotating body regardless of radius.',
        },
        {
          symbol: 'r',
          name: 'Radial Distance from Axis',
          unit: '\\text{m}',
          description: 'Perpendicular distance from the axis of rotation to the point of interest.',
          connections:
            'Acts as the bridge multiplier converting angular measures into linear meters.',
        },
        {
          symbol: 'T',
          name: 'Period of Revolution',
          unit: '\\text{s}',
          description: 'Time taken to complete one full 360° (2π radian) turn.',
          connections:
            'Inversely proportional to angular frequency: T = 2π / ω.',
        },
      ],
    },
    {
      name: 'Rotational Kinematics (Constant Angular Acceleration)',
      latex: '\\omega = \\omega_0 + \\alpha t, \\quad \\theta = \\omega_0 t + \\frac{1}{2}\\alpha t^2, \\quad \\theta = \\frac{1}{2}(\\omega_0 + \\omega)t, \\quad \\omega^2 = \\omega_0^2 + 2\\alpha\\theta',
      summary:
        'The rotational analogs of the kinematic suvat equations for uniform angular acceleration α.',
      conditions: ['Angular acceleration α is constant', 'Angle θ in radians'],
      variables: [
        {
          symbol: '\\omega, \\omega_0',
          name: 'Final & Initial Angular Velocity',
          unit: '\\text{rad/s}',
          description: 'Instantaneous rotational speeds at the end and start of the interval.',
          connections:
            'Direct rotational equivalents of linear velocities v and v0.',
        },
        {
          symbol: '\\alpha',
          name: 'Angular Acceleration',
          unit: '\\text{rad/s}^2',
          description: 'The constant rate of change of angular velocity: α = dω/dt.',
          connections:
            'Produces linear tangential acceleration at = α r.',
        },
        {
          symbol: '\\theta',
          name: 'Angular Displacement',
          unit: '\\text{rad}',
          description: 'Total angle swept during elapsed time t.',
          connections:
            'Related to number of revolutions N by θ = 2π N.',
        },
        {
          symbol: 't',
          name: 'Elapsed Time',
          unit: '\\text{s}',
          description: 'Duration over which the rotational acceleration takes place.',
          connections:
            'Links angular speed changes and swept angle just like time in 1D linear motion.',
        },
      ],
    },
    {
      name: "Torque & Newton's Second Law for Rotation",
      latex: '|\\vec{\\tau}| = |\\vec{r} \\times \\vec{F}| = rF\\sin\\theta, \\quad \\sum \\vec{\\tau} = I\\vec{\\alpha} = \\frac{d\\vec{L}}{dt}, \\quad W = \\int \\vec{\\tau} \\cdot d\\vec{\\theta}',
      summary:
        'Defines rotational force (torque), relates net torque to angular acceleration, and calculates rotational work.',
      conditions: ['Torque evaluated about the designated axis of rotation', 'θ is angle between position vector r and force F'],
      variables: [
        {
          symbol: '\\vec{\\tau}',
          name: 'Torque Vector',
          unit: '\\text{N}\\cdot\\text{m}',
          description: 'The rotational effectiveness of an applied force at lever arm distance r.',
          connections:
            'Maximised when force is perpendicular to the lever arm (θ = 90°, sin 90° = 1). Pushing along the axis (θ = 0°) generates zero torque.',
        },
        {
          symbol: '\\vec{r}, r',
          name: 'Lever Arm Position Vector',
          unit: '\\text{m}',
          description: 'Vector from the rotation axis to the point where force F is applied.',
          connections:
            'Using a longer wrench (larger r) multiplies torque for the same hand force.',
        },
        {
          symbol: '\\vec{F}, F',
          name: 'Applied Force',
          unit: '\\text{N}',
          description: 'Linear force acting on the rigid body.',
          connections:
            'Only the tangential component (F sinθ) produces torque.',
        },
        {
          symbol: '\\theta',
          name: 'Force Application Angle',
          unit: '^\\circ \\text{ or radians}',
          description: 'Angle between lever arm vector r and force vector F.',
          connections:
            'Determines the effective perpendicular moment arm r_⊥ = r sinθ.',
        },
        {
          symbol: 'I',
          name: 'Moment of Inertia',
          unit: '\\text{kg}\\cdot\\text{m}^2',
          description: 'The quantitative measure of rotational inertia resisting angular acceleration.',
          connections:
            'Direct analog of mass: α = Στ / I. Increasing mass distribution far from axis dramatically increases I.',
        },
        {
          symbol: '\\vec{\\alpha}',
          name: 'Angular Acceleration',
          unit: '\\text{rad/s}^2',
          description: 'Rate of change of angular velocity induced by net torque.',
          connections:
            'Proportional to net torque Στ and inversely proportional to I.',
        },
        {
          symbol: '\\vec{L}',
          name: 'Angular Momentum',
          unit: '\\text{kg}\\cdot\\text{m}^2/\\text{s}',
          description: 'Rotational momentum whose time derivative dL/dt equals net torque.',
          connections:
            'Conserved when net external torque Στ = 0.',
        },
        {
          symbol: 'W, d\\vec{\\theta}',
          name: 'Rotational Work & Infinitesimal Angle',
          unit: '\\text{J, rad}',
          description: 'Mechanical energy transferred by applying torque τ over angular displacement dθ.',
          connections:
            'Equals change in rotational kinetic energy: W_net = ΔK_rot.',
        },
      ],
    },
    {
      name: 'Moment of Inertia & Rotational Kinetic Energy',
      latex: 'I = \\sum m_i r_i^2 = \\int r^2 dm = mk^2, \\quad K_{\\text{rot}} = \\frac{1}{2}I\\omega^2',
      summary:
        'Calculates the rotational inertia of discrete and continuous mass distributions, and their stored rotational kinetic energy.',
      conditions: ['k is the radius of gyration', 'Axis of rotation is fixed'],
      variables: [
        {
          symbol: 'I',
          name: 'Moment of Inertia',
          unit: '\\text{kg}\\cdot\\text{m}^2',
          description: 'Sum of mass elements multiplied by their squared distance from the axis of rotation.',
          connections:
            'Dependence on r² means moving mass twice as far from the axis quadruples its rotational resistance.',
        },
        {
          symbol: 'm_i, dm, m',
          name: 'Mass Elements & Total Mass',
          unit: '\\text{kg}',
          description: 'Discrete particle masses mi, differential mass element dm, and total body mass m.',
          connections:
            'Weighted by r² to determine total rotational inertia.',
        },
        {
          symbol: 'r_i, r',
          name: 'Perpendicular Distance from Axis',
          unit: '\\text{m}',
          description: 'Radial distance of each mass element from the rotation axis.',
          connections:
            'Squared in the integral, making mass geometry critically important.',
        },
        {
          symbol: 'k',
          name: 'Radius of Gyration',
          unit: '\\text{m}',
          description: 'The equivalent distance from the axis at which all mass m could be concentrated to yield the same I.',
          connections:
            'Defined via k = √(I / m).',
        },
        {
          symbol: 'K_{\\text{rot}}',
          name: 'Rotational Kinetic Energy',
          unit: '\\text{J}',
          description: 'Kinetic energy residing in the rotational spinning motion.',
          connections:
            'Total kinetic energy of a rolling body is the sum of translational and rotational: K_total = ½M v_cm² + ½I ω².',
        },
        {
          symbol: '\\omega',
          name: 'Angular Velocity',
          unit: '\\text{rad/s}',
          description: 'Spin rate of the rigid body.',
          connections:
            'Appears squared in K_rot: doubling spin rate quadruples rotational kinetic energy.',
        },
      ],
    },
    {
      name: 'Parallel Axis & Perpendicular Axis Theorems',
      latex: 'I = I_{\\text{cm}} + Md^2, \\quad I_z = I_x + I_y',
      summary:
        'Enables calculating moment of inertia about any parallel axis offset by distance d, or about perpendicular axes for planar laminae.',
      conditions: [
        'Parallel axis: one axis MUST pass through the center of mass (I_cm)',
        'Perpendicular axis: valid strictly for flat, two-dimensional planar plates in the xy-plane',
      ],
      variables: [
        {
          symbol: 'I',
          name: 'Parallel-Axis Moment of Inertia',
          unit: '\\text{kg}\\cdot\\text{m}^2',
          description: 'Moment of inertia about the new axis parallel to the center-of-mass axis.',
          connections:
            'Always greater than or equal to I_cm.',
        },
        {
          symbol: 'I_{\\text{cm}}',
          name: 'Center of Mass Inertia',
          unit: '\\text{kg}\\cdot\\text{m}^2',
          description: 'The moment of inertia about an axis passing directly through the center of mass.',
          connections:
            'The minimum possible moment of inertia for any family of parallel axes.',
        },
        {
          symbol: 'M',
          name: 'Total Body Mass',
          unit: '\\text{kg}',
          description: 'Total mass of the rigid body.',
          connections:
            'Multiplies d² in the parallel axis shift term.',
        },
        {
          symbol: 'd',
          name: 'Parallel Axis Offset Distance',
          unit: '\\text{m}',
          description: 'Perpendicular distance between the center-of-mass axis and the shifted parallel axis.',
          connections:
            'Adds Md² to the base inertia: swinging a bat from the handle has higher I than pivoting about its center.',
        },
        {
          symbol: 'I_x, I_y, I_z',
          name: 'Planar & Perpendicular Axis Inertias',
          unit: '\\text{kg}\\cdot\\text{m}^2',
          description: 'Moments of inertia about two orthogonal in-plane axes (x, y) and the normal z-axis.',
          connections:
            'For a flat plate in the xy-plane, the out-of-plane inertia Iz equals the sum Ix + Iy.',
        },
      ],
    },
    {
      name: 'Standard Moments of Inertia',
      latex: 'I_{\\text{disk}} = \\frac{1}{2}MR^2, \\quad I_{\\text{sphere}} = \\frac{2}{5}MR^2, \\quad I_{\\text{shell}} = \\frac{2}{3}MR^2, \\quad I_{\\text{rod}} = \\frac{1}{12}ML^2',
      summary:
        'Standard analytical moment of inertia formulas for common geometric bodies rotating about symmetry axes.',
      conditions: ['Uniform density distributions', 'Standard central axes of symmetry'],
      variables: [
        {
          symbol: 'I_{\\text{disk}}, I_{\\text{sphere}}, I_{\\text{shell}}, I_{\\text{rod}}',
          name: 'Geometric Moments of Inertia',
          unit: '\\text{kg}\\cdot\\text{m}^2',
          description: 'Rotational inertias for a solid cylinder/disk (½MR²), solid sphere (⅖MR²), thin spherical shell (⅔MR²), and thin rod about center (¹⁄₁₂ML²).',
          connections:
            'Lower numerical coefficient means mass is concentrated closer to the axis, allowing faster linear acceleration when rolling down a ramp.',
        },
        {
          symbol: 'M',
          name: 'Total Body Mass',
          unit: '\\text{kg}',
          description: 'Total mass of the uniform object.',
          connections:
            'Scales inertia linearly.',
        },
        {
          symbol: 'R, L',
          name: 'Radius or Rod Length',
          unit: '\\text{m}',
          description: 'Outer radius R of the disk/sphere/shell, or total length L of the thin rod.',
          connections:
            'Scales quadratically with dimension. Solid sphere (2/5 MR²) rolls down an incline faster than a solid disk (1/2 MR²) or hoop (MR²)!',
        },
      ],
    },
    {
      name: 'Angular Momentum & Conservation Law',
      latex: '\\vec{L} = I\\vec{\\omega}, \\quad |\\vec{L}| = |\\vec{r} \\times \\vec{p}| = r(mv)\\sin\\theta, \\quad \\sum \\vec{L}_i = \\sum \\vec{L}_f',
      summary:
        'Defines angular momentum for rigid bodies and point particles, and states that total angular momentum is strictly conserved when net external torque is zero.',
      conditions: ['Isolated rotational systems (Στ_ext = 0)'],
      variables: [
        {
          symbol: '\\vec{L}, \\sum \\vec{L}_{i,f}',
          name: 'Angular Momentum (Initial & Final)',
          unit: '\\text{kg}\\cdot\\text{m}^2/\\text{s} = \\text{J}\\cdot\\text{s}',
          description: 'The rotational analog of linear momentum, conserved when net external torque vanishes.',
          connections:
            'Conserved in planetary orbits (Kepler’s Second Law) and spinning ice skaters: I_i ω_i = I_f ω_f.',
        },
        {
          symbol: 'I',
          name: 'Moment of Inertia',
          unit: '\\text{kg}\\cdot\\text{m}^2',
          description: 'Rotational inertia of the spinning body.',
          connections:
            'Inversely proportional to ω when L is conserved: pulling arms inward reduces I and increases spin rate ω.',
        },
        {
          symbol: '\\vec{\\omega}',
          name: 'Angular Velocity Vector',
          unit: '\\text{rad/s}',
          description: 'Rotational speed and axis direction (via right-hand rule).',
          connections:
            'Multiplies I to give rigid-body angular momentum.',
        },
        {
          symbol: '\\vec{r}, r',
          name: 'Position Radius Vector',
          unit: '\\text{m}',
          description: 'Vector from the origin/axis to the moving particle.',
          connections:
            'Crossed with linear momentum p to define orbital angular momentum.',
        },
        {
          symbol: '\\vec{p}, m, v',
          name: 'Linear Momentum, Mass & Speed',
          unit: '\\text{kg}\\cdot\\text{m/s, kg, m/s}',
          description: 'Translational momentum p = mv of a particle moving at speed v.',
          connections:
            'Generates angular momentum r(mv)sinθ about a reference point.',
        },
        {
          symbol: '\\theta',
          name: 'Angle between r and p',
          unit: '^\\circ \\text{ or radians}',
          description: 'Angle between the radius vector r and velocity/momentum vector p.',
          connections:
            'Equals 90° (sin 90° = 1) for circular orbits, simplifying |L| to mvr.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Switch between the Whirling String Tether and the Planetary Gravity Orbit simulator. Tweak speed, radius, and central mass. Watch tangential velocity and centripetal acceleration vector arrows in real time, and test the string breaking tension threshold.',
};

export default circularMotionData;
