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
      title: 'Momentum Vector & Conservation',
      content:
        'Total momentum (p = mv) is conserved in isolated systems (ΣF_ext = 0) along each spatial axis independently: Σp_i = Σp_f.',
    },
    {
      title: 'Impulse & Impact Mitigation',
      content:
        'Impulse (J = Δp = F_avg Δt) equals the momentum change. Extending contact duration Δt proportionally lowers peak impact force.',
    },
    {
      title: 'Elastic vs. Inelastic Collisions',
      content:
        'Momentum is always conserved. Kinetic energy is conserved only in elastic collisions (e = 1); inelastic collisions (e < 1) lose kinetic energy to heat.',
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
          symbol: 'm',
          name: 'Mass',
          unit: '\\text{kg}',
          description: 'Inertial mass of the moving body.',
          connections:
            'Scales momentum linearly at a given velocity.',
        },
        {
          symbol: '\\vec{v}',
          name: 'Velocity Vector',
          unit: '\\text{m/s}',
          description: 'Speed and direction of motion.',
          connections:
            'Defines the exact direction of the momentum vector p.',
        },
        {
          symbol: '\\vec{J}, \\Delta \\vec{p}',
          name: 'Impulse & Momentum Change',
          unit: '\\text{N}\\cdot\\text{s} = \\text{kg}\\cdot\\text{m/s}',
          description: 'The cumulative effect of force over time, equal to net change in momentum (p_f - p_i).',
          connections:
            'Equals the area under the force-time curve (∫ F dt).',
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
          description: 'The time duration (t2 - t1) over which collision contact occurs.',
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
        {
          symbol: 'v_{2f} - v_{1f}',
          name: 'Relative Separation Speed',
          unit: '\\text{m/s}',
          description: 'The speed at which the two bodies move apart after collision.',
          connections:
            'Equals e times the relative approach speed. Vanishes (0 m/s) when objects stick together in a completely inelastic collision.',
        },
        {
          symbol: 'v_{1i} - v_{2i}',
          name: 'Relative Approach Speed',
          unit: '\\text{m/s}',
          description: 'The closing speed at which the two bodies approach each other before impact.',
          connections:
            'Forms the denominator scaling the rebound separation speed.',
        },
      ],
    },
    {
      name: "Newton's Second Law in Momentum Form",
      latex: '\\sum \\vec{F} = \\frac{d\\vec{p}}{dt}',
      summary:
        'States that the net force equals the time rate of change of linear momentum, valid even for variable mass systems.',
      conditions: ['Valid in all inertial frames', 'Reduces to ΣF = ma for constant mass'],
      variables: [
        {
          symbol: '\\sum \\vec{F}',
          name: 'Net Vector Force',
          unit: '\\text{N}',
          description: 'The resultant external force acting on the body.',
          connections:
            'When net force is zero, dp/dt = 0, proving linear momentum is constant.',
        },
        {
          symbol: '\\vec{p}',
          name: 'Linear Momentum Vector',
          unit: '\\text{kg}\\cdot\\text{m/s}',
          description: 'Instantaneous momentum p = mv of the system.',
          connections:
            'Changes over time only when acted upon by a non-zero net external force.',
        },
        {
          symbol: 't',
          name: 'Time',
          unit: '\\text{s}',
          description: 'Independent time variable.',
          connections:
            'Differentiating momentum p with respect to t yields the instantaneous net force.',
        },
      ],
    },
    {
      name: 'Center of Mass Coordinates & Total System Momentum',
      latex: 'x_{\\text{cm}} = \\frac{1}{M}\\sum m_i x_i, \\quad y_{\\text{cm}} = \\frac{1}{M}\\sum m_i y_i, \\quad \\vec{P} = M\\vec{v}_{\\text{cm}}',
      summary:
        'Computes the mass-weighted center of a multi-particle system and defines total momentum through center of mass velocity.',
      conditions: ['M = Σ mi is the total mass of the system'],
      variables: [
        {
          symbol: 'x_{\\text{cm}}, y_{\\text{cm}}',
          name: 'Center of Mass Coordinates',
          unit: '\\text{m}',
          description: 'The mass-weighted average position of the multi-body system.',
          connections:
            'Moves as if all external forces acted directly at this single point: ΣF_ext = M a_cm.',
        },
        {
          symbol: 'M',
          name: 'Total System Mass',
          unit: '\\text{kg}',
          description: 'The sum of all constituent particle masses (M = Σ mi).',
          connections:
            'Normalizes the mass-position moments and scales center-of-mass velocity into total momentum P.',
        },
        {
          symbol: 'm_i',
          name: 'i-th Particle Mass',
          unit: '\\text{kg}',
          description: 'Mass of the individual i-th particle in the system.',
          connections:
            'Heavier particles pull the center of mass closer to their own coordinates.',
        },
        {
          symbol: 'x_i, y_i',
          name: 'i-th Particle Coordinates',
          unit: '\\text{m}',
          description: 'Spatial coordinates of the i-th particle.',
          connections:
            'Weighted by mass mi to determine the balance point of the system.',
        },
        {
          symbol: '\\vec{P}',
          name: 'Total System Momentum',
          unit: '\\text{kg}\\cdot\\text{m/s}',
          description: 'The vector sum of individual momenta: P = Σ pi = M v_cm.',
          connections:
            'In the absence of external forces, P stays constant: Σ pi = Σ pf.',
        },
        {
          symbol: '\\vec{v}_{\\text{cm}}',
          name: 'Center of Mass Velocity',
          unit: '\\text{m/s}',
          description: 'The velocity of the center of mass coordinate.',
          connections:
            'Constant for any isolated system regardless of internal explosions or collisions.',
        },
      ],
    },
    {
      name: 'Tsiolkovsky Variable-Mass Rocket Equation',
      latex: '\\Delta v = v_{\\text{ex}} \\ln\\left(\\frac{m_0}{m_f}\\right)',
      summary:
        'Determines the velocity increment Δv acquired by a rocket expelling propellant gas at exhaust speed v_ex in zero-gravity space.',
      conditions: [
        'Variable-mass propulsion in field-free space (zero external gravity and drag)',
        'Constant effective exhaust velocity v_ex relative to the rocket',
      ],
      variables: [
        {
          symbol: '\\Delta v',
          name: 'Velocity Increment (Delta-v)',
          unit: '\\text{m/s}',
          description: 'Net velocity increase acquired during the burn.',
          connections: 'Fundamental budget parameter in orbital mechanics and interplanetary spaceflight.',
        },
        {
          symbol: 'v_{\\text{ex}}',
          name: 'Effective Exhaust Velocity',
          unit: '\\text{m/s}',
          description: 'Speed of expelled propellant gases relative to rocket nozzle (I_sp × g0).',
          connections: 'Higher exhaust speed dramatically reduces fuel mass needed to achieve a target delta-v.',
        },
        {
          symbol: 'm_0 / m_f',
          name: 'Mass Ratio (Initial / Final)',
          unit: '\\text{dimensionless}',
          description: 'Ratio of wet initial launch mass (including fuel) to dry burnout mass.',
          connections: 'Enters logarithmically; exponential increases in initial fuel produce only linear gains in delta-v.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Run head-on collisions in the interactive Air Track Collision Chamber. Set cart masses, launch velocities, and drag the elasticity slider from e = 0 (sticky collision) to e = 1 (perfectly bouncy). Inspect momentum and kinetic energy balance live.',
};

export default momentumData;
