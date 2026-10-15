/**
 * Physics Topic: Newton's Laws of Motion & Forces
 */
const newtonsLawsData = {
  id: 'newtons-laws',
  title: "Newton's Laws of Motion & Force Dynamics",
  subtitle: 'The causal mechanics of force, inertia, equilibrium, and frictional resistance.',
  level: 'Beginner',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'While kinematics describes motion, dynamics explains why motion occurs. Sir Isaac Newton codified classical mechanics in 1687 with three axiomatic laws relating mass, force, and acceleration.',
    'Force is an interaction that, when unopposed, changes the motion of an object. Understanding net force (ΣF) through free-body diagrams is the core problem-solving skill in classical mechanics.',
  ],
  keyConcepts: [
    {
      title: 'First Law: Law of Inertia',
      content:
        'A body remains in a state of rest or uniform motion in a straight line unless acted upon by a non-zero net external force (ΣF = 0 ⟹ a = 0). Mass is the quantitative scalar measure of this inertia.',
    },
    {
      title: 'Second Law: Fundamental Dynamic Law',
      content:
        'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass (ΣF = ma). Acceleration always points in the exact direction of the net force vector.',
    },
    {
      title: 'Third Law: Action & Reaction',
      content:
        'Whenever body A exerts a force on body B, body B simultaneously exerts an equal and opposite force on body A (F_AB = -F_BA). These paired forces act on different bodies, so they never cancel each other out on a single free-body diagram.',
    },
    {
      title: 'Friction: Static vs. Kinetic',
      content:
        'Static friction (fs ≤ μs N) self-adjusts to counteract applied forces up to a maximum threshold. Once relative motion begins, kinetic friction (fk = μk N) applies a nearly constant opposing force, typically smaller than the peak static threshold (μk < μs).',
    },
  ],
  equations: [
    {
      name: "Newton's Second Law of Motion",
      latex: '\\Sigma \\vec{F} = m\\vec{a}',
      summary:
        'The central governing law of Newtonian mechanics relating net external force vector to resulting acceleration.',
      conditions: ['Valid in inertial reference frames', 'Constant mass systems (non-relativistic v << c)'],
      variables: [
        {
          symbol: '\\Sigma \\vec{F}',
          name: 'Net Force Vector',
          unit: '\\text{N = kg}\\cdot\\text{m/s}^2',
          description: 'The vector sum of all individual external forces acting on the body.',
          connections:
            'Directly proportional to acceleration vector a. If net force is doubled on a fixed mass, acceleration doubles instantaneously in the exact direction of the net force.',
        },
        {
          symbol: 'm',
          name: 'Inertial Mass',
          unit: '\\text{kg}',
          description: 'The intrinsic measure of an object’s resistance to any change in its velocity state.',
          connections:
            'Inversely proportional to acceleration: a = ΣF / m. Heavier objects require proportionally greater force to achieve the same rate of speed increase or directional change.',
        },
        {
          symbol: '\\vec{a}',
          name: 'Acceleration Vector',
          unit: '\\text{m/s}^2',
          description: 'The kinematic rate of velocity change resulting from the applied net force.',
          connections:
            'Must be collinear with ΣF. When ΣF = 0, acceleration vanishes (dynamic or static equilibrium).',
        },
      ],
    },
    {
      name: 'Frictional Force Law',
      latex: 'f_k = \\mu_k N, \\quad f_s \\le \\mu_s N',
      summary:
        'Calculates the resisting contact force exerted by a surface parallel to the interface.',
      conditions: ['Dry contact between surfaces (Coulomb friction model)', 'N is perpendicular normal force'],
      variables: [
        {
          symbol: 'f_k, f_s',
          name: 'Friction Force (Kinetic / Static)',
          unit: '\\text{N}',
          description: 'The tangential contact force resisting relative sliding between two surfaces.',
          connections:
            'Directly proportional to the normal pressing force N. Doubling the weight of an object on a flat table doubles the normal force and therefore doubles the friction force.',
        },
        {
          symbol: '\\mu_s, \\mu_k',
          name: 'Coefficient of Friction',
          unit: '\\text{dimensionless}',
          description: 'Empirical material property reflecting microscopic roughness and intermolecular bonding between surfaces.',
          connections:
            'Directly scales friction. Because μs > μk for almost all materials, breaking static friction requires more push than maintaining continuous sliding motion.',
        },
        {
          symbol: 'N',
          name: 'Normal Contact Force',
          unit: '\\text{N}',
          description: 'The perpendicular electromagnetic repulsive force exerted by the supporting surface.',
          connections:
            'On an inclined ramp at angle θ, N = mg cosθ. As the ramp steepens (θ increases), cosθ decreases, reducing normal force and substantially dropping available friction!',
        },
      ],
    },
    {
      name: 'Inclined Plane Acceleration with Friction',
      latex: 'a = g(\\sin\\theta - \\mu_k \\cos\\theta)',
      summary:
        'Determines the downhill acceleration of a block sliding down an incline under gravity and kinetic friction.',
      conditions: ['Block is already sliding downhill (tanθ > μs)', 'Uniform slope angle θ'],
      variables: [
        {
          symbol: 'a',
          name: 'Downhill Acceleration',
          unit: '\\text{m/s}^2',
          description: 'Net rate of speed gain down the length of the slope.',
          connections:
            'Notice that mass m cancels out completely! A 1 kg wooden block and a 100 kg wooden block slide with the exact same acceleration if made of identical material.',
        },
        {
          symbol: 'g',
          name: 'Gravitational Acceleration',
          unit: '\\text{m/s}^2 \\approx 9.8\\,\\text{m/s}^2',
          description: 'Local gravity accelerating the mass downwards.',
          connections:
            'Acts as the master multiplier for both driving component (g sinθ) and resistive component (μk g cosθ).',
        },
        {
          symbol: '\\theta',
          name: 'Incline Angle',
          unit: '^\\circ \\text{ or radians}',
          description: 'The angle between the incline surface and horizontal ground.',
          connections:
            'Controls the balance between driving downhill force (sinθ) and pressing normal force (cosθ). At critical angle θ_c = arctan(μs), the block just begins to slide.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Test the balance of forces on the interactive Inclined Plane simulator. Adjust ramp angle, mass, static and kinetic friction coefficients, and see the live Free Body Diagram with color-coded force vectors.',
};

export default newtonsLawsData;
