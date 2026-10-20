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
        'Without a net external force (ΣF = 0), an object maintains constant velocity (a = 0). Mass is the scalar measure of this inertia.',
    },
    {
      title: 'Second Law: Fundamental Dynamics',
      content:
        'Net force directly accelerates mass: ΣF = ma. Acceleration is always collinear with the net vector force.',
    },
    {
      title: 'Third Law: Action & Reaction',
      content:
        'Forces always exist in equal and opposite pairs acting on different bodies: F_AB = -F_BA. They never cancel on the same free-body diagram.',
    },
    {
      title: 'Friction: Static vs. Kinetic',
      content:
        'Static friction (fs ≤ μs N) prevents motion up to a threshold. Kinetic friction (fk = μk N) opposes ongoing sliding and is usually lower.',
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
        {
          symbol: '\\mu_k',
          name: 'Coefficient of Kinetic Friction',
          unit: '\\text{dimensionless}',
          description: 'The sliding friction ratio between the block and the incline surface.',
          connections:
            'Multiplies g cosθ to oppose downhill motion. If μk = tanθ, acceleration a = 0 and the block slides downhill at constant velocity.',
        },
      ],
    },
    {
      name: 'Vector Dot Product (Scalar Product)',
      latex: '\\vec{a} \\cdot \\vec{b} = ab\\cos\\theta',
      summary:
        'Projects one vector onto another to yield a scalar quantity, foundational to work (W = F · s) and energy calculations.',
      conditions: ['θ is the interior angle between vectors a and b (0° ≤ θ ≤ 180°)'],
      variables: [
        {
          symbol: '\\vec{a} \\cdot \\vec{b}',
          name: 'Scalar Product Result',
          unit: '\\text{Product of component units}',
          description: 'The scalar product of vectors a and b.',
          connections:
            'Maximised when vectors are parallel (θ = 0°, cos 0° = 1). Vanishes when vectors are mutually perpendicular (θ = 90°, cos 90° = 0).',
        },
        {
          symbol: 'a, b',
          name: 'Vector Magnitudes',
          unit: '\\text{Same as vectors}',
          description: 'The non-negative geometric lengths of vectors a and b.',
          connections:
            'Linear scaling: doubling the length of either vector doubles the dot product.',
        },
        {
          symbol: '\\theta',
          name: 'Enclosed Angle',
          unit: '^\\circ \\text{ or radians}',
          description: 'The geometric angle between the directions of the two vectors.',
          connections:
            'Positive for acute angles (0° to 90°), zero at 90°, and negative for obtuse angles (90° to 180°).',
        },
      ],
    },
    {
      name: 'Vector Cross Product Magnitude',
      latex: '|\\vec{a} \\times \\vec{b}| = ab\\sin\\theta',
      summary:
        'Computes the area of the parallelogram formed by two vectors, directed perpendicularly via the right-hand rule (essential for torque and angular momentum).',
      conditions: ['Produces a vector mutually perpendicular to both a and b', 'Right-hand rule determines vector orientation'],
      variables: [
        {
          symbol: '|\\vec{a} \\times \\vec{b}|',
          name: 'Cross Product Magnitude',
          unit: '\\text{Product of component units}',
          description: 'The magnitude of the vector product.',
          connections:
            'Maximised when vectors are perpendicular (θ = 90°, sin 90° = 1). Equals zero when vectors are collinear (θ = 0° or 180°).',
        },
        {
          symbol: 'a, b',
          name: 'Vector Magnitudes',
          unit: '\\text{Same as vectors}',
          description: 'The lengths of the two interacting vectors.',
          connections:
            'Directly scales the cross product magnitude.',
        },
        {
          symbol: '\\theta',
          name: 'Enclosed Angle',
          unit: '^\\circ \\text{ or radians}',
          description: 'The angle between vectors a and b.',
          connections:
            'Governed by the sine function: zero when parallel, maximum when perpendicular.',
        },
      ],
    },
    {
      name: 'Apparent Weight in Non-Inertial Elevators',
      latex: 'N = m(g \\pm a)',
      summary:
        'Calculates the normal contact support force (apparent scale weight) of an occupant in a vertically accelerating frame.',
      conditions: [
        'Vertical linear acceleration a (use +a when accelerating upward, -a when accelerating downward)',
        'Free fall occurs when a = g downward, yielding apparent weightlessness (N = 0)',
      ],
      variables: [
        {
          symbol: 'N',
          name: 'Normal Force (Apparent Weight)',
          unit: '\\text{N}',
          description: 'Contact reaction force exerted by the scale or floor on the mass.',
          connections: 'Scale reading indicates true weight mg only when acceleration a = 0.',
        },
        {
          symbol: 'm',
          name: 'Occupant Mass',
          unit: '\\text{kg}',
          description: 'Invariable inertial mass of the passenger.',
          connections: 'Scales apparent normal force linearly.',
        },
      ],
    },
    {
      name: 'Atwood Machine Coupled Acceleration',
      latex: 'a = \\frac{m_2 - m_1}{m_1 + m_2}g, \\qquad T = \\frac{2m_1 m_2}{m_1 + m_2}g',
      summary:
        'Determines the linear acceleration and rope tension in an ideal dual-mass pulley constraint system.',
      conditions: [
        'Ideal frictionless, massless pulley and inextensible light string',
        'm2 > m1 (mass 2 accelerates downward, mass 1 accelerates upward)',
      ],
      variables: [
        {
          symbol: 'a',
          name: 'System Acceleration',
          unit: '\\text{m/s}^2',
          description: 'Common linear acceleration magnitude of both interconnected masses.',
          connections: 'Driven by net gravitational imbalance (m2 - m1)g divided by total system inertia (m1 + m2).',
        },
        {
          symbol: 'T',
          name: 'Cord Tension',
          unit: '\\text{N}',
          description: 'Internal tensile force transmitted along the light inextensible rope.',
          connections: 'Lies strictly between m1 g and m2 g.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Test the balance of forces on the interactive Inclined Plane simulator. Adjust ramp angle, mass, static and kinetic friction coefficients, and see the live Free Body Diagram with color-coded force vectors.',
};

export default newtonsLawsData;
