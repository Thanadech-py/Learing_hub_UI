/**
 * Physics Topic: Momentum & Impulse
 */
const momentumData = {
  id: 'momentum',
  title: 'Linear Momentum, Impulse & Collisions',
  subtitle: 'The vector quantity of motion: conservation in isolated systems, impulse duration, and collision dynamics.',
  level: 'Intermediate',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'Linear momentum (p = mv) represents the quantity of motion possessed by a moving mass. Because Newton’s third law guarantees internal action-reaction pairs cancel out, the total vector momentum of any closed, isolated system remains strictly conserved during all interactions and collisions.',
    'Impulse (J = Δp = F_avg Δt) bridges forces acting over time to changes in momentum. This principle is foundational to vehicular safety (airbags, crumple zones) and rocketry.',
  ],
  keyConcepts: [
    {
      title: 'Vector Nature of Momentum',
      content:
        'Momentum is a vector that points in the exact direction of velocity. In two or three dimensions, momentum must be conserved independently along each orthogonal axis (Σp_x = const, Σp_y = const). A stationary firecracker exploding into fragments maintains zero total vector momentum.',
    },
    {
      title: 'Impulse and Contact Duration',
      content:
        'To produce a required change in momentum Δp, an applied force can either be huge over a tiny time interval (hard impact) or small over an extended duration (soft catch, airbag). Extending the impact time Δt drastically lowers the peak force F experienced by the body.',
    },
    {
      title: 'Elastic vs. Inelastic Collisions',
      content:
        'Momentum is conserved in ALL collisions where external forces are zero. However, kinetic energy is only conserved in perfectly elastic collisions (e = 1, e.g. billiard balls, subatomic particles). In completely inelastic collisions (e = 0), objects stick together and maximal kinetic energy is converted into deformation and thermal heat.',
    },
  ],
  equations: [
    {
      name: 'Linear Momentum & Impulse-Momentum Theorem',
      latex: '\\vec{p} = m\\vec{v}, \\quad \\vec{J} = \\Delta \\vec{p} = \\int_{t_1}^{t_2} \\vec{F}\\,dt = \\vec{F}_{\\text{avg}} \\Delta t',
      summary:
        'Defines linear momentum and equates impulse delivered by a force to the resulting change in momentum.',
      conditions: ['Mass m remains constant during the interaction interval'],
      variables: [
        {
          symbol: '\\vec{p}',
          name: 'Linear Momentum Vector',
          unit: '\\text{kg}\\cdot\\text{m/s}',
          description: 'The vector measure of a body’s mass in motion.',
          connections:
            'Directly proportional to both mass m and velocity v. A 0.1 kg baseball flying at 40 m/s has the same momentum (4 kg·m/s) as a 4 kg bowling ball rolling at 1 m/s.',
        },
        {
          symbol: '\\vec{J}',
          name: 'Impulse Vector',
          unit: '\\text{N}\\cdot\\text{s} = \\text{kg}\\cdot\\text{m/s}',
          description: 'The cumulative effect of a force exerted over a time interval.',
          connections:
            'Identical in dimension and numerical value to Δp. Equals the area under the force-time curve (F vs. t).',
        },
        {
          symbol: '\\vec{F}_{\\text{avg}}',
          name: 'Average Impact Force',
          unit: '\\text{N}',
          description: 'The mean force experienced across the collision contact window.',
          connections:
            'Inversely proportional to collision duration Δt for a given momentum change: F_avg = Δp / Δt. Doubling the crumple zone duration halves the average destructive force on vehicle occupants.',
        },
        {
          symbol: '\\Delta t',
          name: 'Contact Time Duration',
          unit: '\\text{s}',
          description: 'The time duration over which collision contact occurs.',
          connections:
            'A vital safety parameter: extending Δt is how catchers’ mitts, airbags, helmets, and landing mats mitigate injurious impact forces.',
        },
      ],
    },
    {
      name: 'Conservation of Linear Momentum (1D Two-Body Collision)',
      latex: 'm_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}',
      summary:
        'The total momentum before collision equals the total momentum after collision in any isolated system.',
      conditions: ['No net external forces act on the system along the collision axis (ΣF_ext = 0)'],
      variables: [
        {
          symbol: 'm_1, m_2',
          name: 'Cart Masses',
          unit: '\\text{kg}',
          description: 'Inertial masses of the two interacting bodies.',
          connections:
            'Weight the velocity contributions. If a heavy cart (m1 >> m2) collides with a stationary light cart, the heavy cart continues almost unperturbed while propelling the light cart ahead at up to 2v1i.',
        },
        {
          symbol: 'v_{1i}, v_{2i}',
          name: 'Initial Velocities',
          unit: '\\text{m/s}',
          description: 'Pre-collision velocities along the collision line (signs indicate direction).',
          connections:
            'Determine total system momentum: P_sys = m1 v1i + m2 v2i. This sum is an unbreakable constant of motion throughout the event.',
        },
        {
          symbol: 'v_{1f}, v_{2f}',
          name: 'Final Post-Collision Velocities',
          unit: '\\text{m/s}',
          description: 'The velocities immediately after separation.',
          connections:
            'Constrained simultaneously by momentum conservation and the collision elasticity parameter e (coefficient of restitution).',
        },
      ],
    },
    {
      name: 'Coefficient of Restitution (Elasticity Parameter)',
      latex: 'e = \\frac{v_{2f} - v_{1f}}{v_{1i} - v_{2i}}',
      summary:
        'Measures the elasticity of a collision as the ratio of relative separation speed to relative approach speed.',
      conditions: ['1D direct head-on impact', '0 ≤ e ≤ 1 in normal passive collisions'],
      variables: [
        {
          symbol: 'e',
          name: 'Coefficient of Restitution',
          unit: '\\text{dimensionless (0 to 1)}',
          description: 'The metric of collision elasticity.',
          connections:
            'At e = 1 (perfectly elastic), relative separation speed equals relative approach speed and mechanical kinetic energy is 100% conserved. At e = 0 (perfectly inelastic), separation speed is zero (v1f = v2f, bodies stick together) and maximum kinetic energy is lost.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Run head-on collisions in the interactive Air Track Collision Chamber. Set cart masses, launch velocities, and drag the elasticity slider from e = 0 (sticky collision) to e = 1 (perfectly bouncy). Inspect momentum and kinetic energy balance live.',
};

export default momentumData;
