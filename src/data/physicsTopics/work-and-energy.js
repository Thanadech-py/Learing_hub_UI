/**
 * Physics Topic: Work & Energy
 */
const workAndEnergyData = {
  id: 'work-and-energy',
  title: 'Work, Energy & Mechanical Conservation',
  subtitle: 'The scalar principles of mechanics: work-energy theorem, kinetic vs. potential exchange, and conservative fields.',
  level: 'Intermediate',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'While Newton’s second law tracks vector forces moment-by-moment, the energy formulation integrates forces over displacement, yielding powerful scalar conservation principles. Energy cannot be created or destroyed; it merely transforms from one form into another.',
    'Work represents the mechanical transfer of energy into or out of a system. When conservative forces (like gravity or ideal springs) act, total mechanical energy (E = K + U) remains invariant throughout the motion.',
  ],
  keyConcepts: [
    {
      title: 'Work as a Dot Product',
      content:
        'Work (W = F · s = F s cosθ) transfers energy. Only force components along displacement do work; perpendicular forces perform zero work.',
    },
    {
      title: 'Work-Energy Theorem',
      content:
        'Net work equals the change in kinetic energy: W_net = ΔK = Kf - Ki. Accelerating forces increase speed; opposing forces decrease speed.',
    },
    {
      title: 'Conservative vs. Dissipative Forces',
      content:
        'Conservative forces (gravity, springs) conserve total mechanical energy (E = K + U). Non-conservative forces (friction) dissipate energy into heat: W_nc = ΔE_mech.',
    },
  ],
  equations: [
    {
      name: 'Mechanical Work & Work Integral',
      latex: 'W = \\vec{F} \\cdot \\vec{s} = F s \\cos\\theta = \\int \\vec{F} \\cdot d\\vec{s}',
      summary:
        'Quantifies energy transferred to an object through force applied over displacement s, evaluated as an integral for variable forces.',
      conditions: ['Line integral along the displacement trajectory'],
      variables: [
        {
          symbol: 'W',
          name: 'Work Done',
          unit: '\\text{J (Joule) = N}\\cdot\\text{m} = \\text{kg}\\cdot\\text{m}^2/\\text{s}^2',
          description: 'The scalar amount of mechanical energy transferred into (positive) or out of (negative) the system.',
          connections:
            'Positive when θ < 90° (adds kinetic energy), zero when θ = 90° (force perpendicular to motion), and negative when θ > 90° (opposes motion, drains kinetic energy like friction).',
        },
        {
          symbol: 'F',
          name: 'Force Magnitude',
          unit: '\\text{N}',
          description: 'The magnitude of the applied vector force.',
          connections:
            'Directly proportional to work: doubling applied force over the same distance doubles work performed.',
        },
        {
          symbol: 's',
          name: 'Displacement Distance',
          unit: '\\text{m}',
          description: 'The distance through which the point of application of the force moves.',
          connections:
            'Directly scales work. Pushing a crate twice as far against constant friction requires twice as much input work.',
        },
        {
          symbol: '\\theta',
          name: 'Angle between Force and Displacement',
          unit: '^\\circ \\text{ or radians}',
          description: 'The geometric angle between vector F and vector s.',
          connections:
            'Governed by cosine function. Maximum positive work occurs at θ = 0° (cos 0° = 1, force aligned with motion). Zero work at θ = 90° (normal force, planetary gravity in circular orbit).',
        },
        {
          symbol: 'd\\vec{s}',
          name: 'Infinitesimal Displacement Vector',
          unit: '\\text{m}',
          description: 'An infinitesimal step along a curved path over which a variable force acts.',
          connections:
            'Integrated with force vector F across the path to yield total work when force varies with position.',
        },
      ],
    },
    {
      name: 'Kinetic Energy',
      latex: 'K = \\frac{1}{2}mv^2',
      summary:
        'The energy possessed by a body solely by virtue of its translational motion.',
      conditions: ['Classical mechanics regime where v << c (speed of light)'],
      variables: [
        {
          symbol: 'K',
          name: 'Kinetic Energy',
          unit: '\\text{J (Joules)}',
          description: 'Scalar translational energy of motion. Always non-negative (K ≥ 0).',
          connections:
            'Depends quadratically on velocity v and linearly on mass m. If a car’s speed increases from 30 km/h to 60 km/h (factor of 2), its kinetic energy quadruples (factor of 4)!',
        },
        {
          symbol: 'm',
          name: 'Mass',
          unit: '\\text{kg}',
          description: 'The quantity of matter in motion.',
          connections:
            'Direct linear relationship: a 2000 kg truck moving at the same speed as a 1000 kg car possesses exactly twice the kinetic energy.',
        },
        {
          symbol: 'v',
          name: 'Speed',
          unit: '\\text{m/s}',
          description: 'The scalar magnitude of velocity.',
          connections:
            'Squared exponent gives velocity dominating influence over energy content compared to mass. High-speed projectile impacts cause disproportionately severe damage because of v².',
        },
      ],
    },
    {
      name: 'Gravitational Potential Energy & Conservation',
      latex: 'U_g = mgh, \\quad E_{\\text{total}} = K + U_g = \\frac{1}{2}mv^2 + mgh = \\text{constant}',
      summary:
        'Expresses energy stored within the Earth-object gravitational system and its conservation in frictionless motion.',
      conditions: ['Uniform gravitational field near Earth surface (h << Earth radius)', 'No non-conservative dissipative forces (friction, drag = 0)'],
      variables: [
        {
          symbol: 'U_g',
          name: 'Gravitational Potential Energy',
          unit: '\\text{J (Joules)}',
          description: 'The potential energy stored by lifting a mass m to vertical height h against gravity.',
          connections:
            'Linearly proportional to height h. Falling from height h converts potential energy directly into kinetic energy: mgh = ½mv² ⟹ v = √(2gh). Note that final speed is completely independent of mass!',
        },
        {
          symbol: 'E_{\\text{total}}',
          name: 'Total Mechanical Energy',
          unit: '\\text{J (Joules)}',
          description: 'The invariant sum of kinetic and potential energy in an isolated conservative system.',
          connections:
            'As height h decreases, potential energy drops and kinetic energy rises by the exact same amount: ΔK = -ΔU_g. On a frictionless roller coaster, at the highest peak K is minimal, and at the lowest dip K is maximal.',
        },
        {
          symbol: 'K',
          name: 'Kinetic Energy',
          unit: '\\text{J (Joules)}',
          description: 'Energy of motion (½mv²) at any point along the trajectory.',
          connections:
            'Trades off one-for-one with potential energy Ug so that K + Ug remains constant.',
        },
        {
          symbol: 'm',
          name: 'Mass',
          unit: '\\text{kg}',
          description: 'Inertial and gravitational mass of the moving body.',
          connections:
            'Appears in both ½mv² and mgh, so it cancels out when solving for speed vs height in frictionless motion.',
        },
        {
          symbol: 'g',
          name: 'Gravitational Acceleration',
          unit: '\\text{m/s}^2 \\approx 9.8\\,\\text{m/s}^2',
          description: 'Local gravitational field strength near Earth’s surface.',
          connections:
            'Scales gravitational potential energy per meter of elevation.',
        },
        {
          symbol: 'h',
          name: 'Height above Reference Datum',
          unit: '\\text{m}',
          description: 'Vertical elevation measured relative to an arbitrary zero-potential baseline.',
          connections:
            'Linear relationship with potential energy. Choosing a different zero datum shifts U_g by a constant, but ΔU_g and physical predictions remain completely unchanged.',
        },
        {
          symbol: 'v',
          name: 'Speed',
          unit: '\\text{m/s}',
          description: 'Instantaneous speed of the object at elevation h.',
          connections:
            'Increases as elevation h drops: v = √(v0² + 2g(h0 - h)).',
        },
      ],
    },
    {
      name: 'Work-Energy Theorem',
      latex: 'W_{\\text{net}} = E_k - E_{k0} = \\Delta K = \\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2',
      summary:
        'Equates the total net work performed on a body to its resulting change in kinetic energy.',
      conditions: ['Valid for all forces (conservative and non-conservative)', 'Inertial frame of reference'],
      variables: [
        {
          symbol: 'W_{\\text{net}}',
          name: 'Net Work Done',
          unit: '\\text{J}',
          description: 'The algebraic sum of work done by all forces acting on the particle.',
          connections:
            'Positive net work accelerates the object, while negative net work decelerates it.',
        },
        {
          symbol: 'E_k, E_{k0}',
          name: 'Final & Initial Kinetic Energy',
          unit: '\\text{J}',
          description: 'The kinetic energies at the end and beginning of the displacement.',
          connections:
            'Difference directly equals the work done: W_net = E_k - E_{k0}.',
        },
        {
          symbol: '\\Delta K',
          name: 'Change in Kinetic Energy',
          unit: '\\text{J}',
          description: 'Net gain or loss of kinetic energy over the displacement.',
          connections:
            'Identical to W_net.',
        },
        {
          symbol: 'm',
          name: 'Mass',
          unit: '\\text{kg}',
          description: 'Mass of the accelerated body.',
          connections:
            'Linearly scales both initial and final kinetic energies.',
        },
        {
          symbol: 'v, v_0',
          name: 'Final & Initial Speeds',
          unit: '\\text{m/s}',
          description: 'Speeds at the end and start of the work interval.',
          connections:
            'Squared in kinetic energy terms; work depends on the difference of squares (v² - v0²).',
        },
      ],
    },
    {
      name: 'Work of Non-Conservative Forces',
      latex: 'W_{\\text{nc}} = (E_k + E_p) - (E_{k0} + E_{p0}) = \\Delta E_{\\text{mech}}',
      summary:
        'Accounts for changes in total mechanical energy due to non-conservative forces such as friction or air drag.',
      conditions: ['E_p includes all applicable potential energies (gravitational, elastic)'],
      variables: [
        {
          symbol: 'W_{\\text{nc}}',
          name: 'Non-Conservative Work',
          unit: '\\text{J}',
          description: 'Work done by non-conservative forces (e.g. friction W_f = -f_k s).',
          connections:
            'When W_nc = 0, total mechanical energy is strictly conserved: E_k + E_p = E_{k0} + E_{p0}. Negative W_nc reflects energy lost to thermal heat.',
        },
        {
          symbol: 'E_k, E_p',
          name: 'Final Kinetic & Potential Energy',
          unit: '\\text{J}',
          description: 'The kinetic and potential energies in the final state.',
          connections:
            'Their sum (E_k + E_p) is the final mechanical energy.',
        },
        {
          symbol: 'E_{k0}, E_{p0}',
          name: 'Initial Kinetic & Potential Energy',
          unit: '\\text{J}',
          description: 'The kinetic and potential energies in the initial state.',
          connections:
            'Their sum (E_{k0} + E_{p0}) is the starting mechanical energy before dissipative work acts.',
        },
        {
          symbol: '\\Delta E_{\\text{mech}}',
          name: 'Change in Total Mechanical Energy',
          unit: '\\text{J}',
          description: 'The net difference between final and initial mechanical energy.',
          connections:
            'Equals zero in conservative systems; negative when friction drains energy.',
        },
      ],
    },
    {
      name: 'Elastic Potential Energy of an Ideal Spring',
      latex: 'E_p = \\frac{1}{2}kx^2',
      summary:
        'Calculates the mechanical potential energy stored within an elastic spring stretched or compressed by displacement x.',
      conditions: ['Spring obeys Hooke’s Law (F = -kx) within its elastic limit'],
      variables: [
        {
          symbol: 'E_p',
          name: 'Elastic Potential Energy',
          unit: '\\text{J}',
          description: 'Stored energy ready to be converted back into kinetic energy upon release.',
          connections:
            'Quadratic dependence on displacement x: compressing a spring twice as far stores 4 times the potential energy!',
        },
        {
          symbol: 'k',
          name: 'Spring Stiffness Constant',
          unit: '\\text{N/m}',
          description: 'The rigidity of the spring.',
          connections:
            'Directly scales stored energy for a given compression or extension.',
        },
        {
          symbol: 'x',
          name: 'Displacement from Equilibrium',
          unit: '\\text{m}',
          description: 'The stretch or compression distance from natural resting length.',
          connections:
            'Appears squared: energy is positive whether the spring is stretched (+x) or compressed (-x).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Experiment with the Roller Coaster & Skate Track simulator. Drag the track profile, change cart mass, toggle friction, and watch the dynamic stacked energy bar graph convert kinetic to potential energy in real time.',
};

export default workAndEnergyData;
