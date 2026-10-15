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
        'Work is defined as W = F · d = F d cosθ. Only the component of force parallel to displacement performs work. A perpendicular force (θ = 90°, cos 90° = 0), such as the normal force on a sliding block or the centripetal force in circular motion, performs zero mechanical work.',
    },
    {
      title: 'Work-Energy Theorem',
      content:
        'The net work done by all forces combined equals the net change in kinetic energy of the body: W_net = ΔK = ½mv_f² - ½mv_i². This links forces acting over distances directly to changes in speed.',
    },
    {
      title: 'Conservative Forces vs. Dissipative Losses',
      content:
        'Conservative forces (gravity, electrostatic, spring) do work that is independent of path, enabling the definition of potential energy U. Non-conservative forces like friction or air drag dissipate mechanical energy into irreversible thermal energy: ΔE_mech = W_non-conservative = -f_k d.',
    },
  ],
  equations: [
    {
      name: 'Mechanical Work Done by a Constant Force',
      latex: 'W = \\vec{F} \\cdot \\vec{d} = F d \\cos\\theta',
      summary:
        'Quantifies energy transferred to an object through force applied over displacement d at angle θ.',
      conditions: ['Force F is constant in magnitude and direction along straight displacement d'],
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
          symbol: 'd',
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
          description: 'The geometric angle between vector F and vector d.',
          connections:
            'Governed by cosine function. Maximum positive work occurs at θ = 0° (cos 0° = 1, force aligned with motion). Zero work at θ = 90° (normal force, planetary gravity in circular orbit).',
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
          symbol: 'h',
          name: 'Height above Reference Datum',
          unit: '\\text{m}',
          description: 'Vertical elevation measured relative to an arbitrary zero-potential baseline.',
          connections:
            'Linear relationship with potential energy. Choosing a different zero datum shifts U_g by a constant, but ΔU_g and physical predictions remain completely unchanged.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Experiment with the Roller Coaster & Skate Track simulator. Drag the track profile, change cart mass, toggle friction, and watch the dynamic stacked energy bar graph convert kinetic to potential energy in real time.',
};

export default workAndEnergyData;
