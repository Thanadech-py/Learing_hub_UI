/**
 * Physics Topic: Circular Motion & Gravitation
 */
const circularMotionData = {
  id: 'circular-motion',
  title: 'Circular Motion, Centripetal Force & Gravity',
  subtitle: 'Dynamics of curved trajectories: centripetal acceleration, tension limits, and orbital mechanics.',
  level: 'Intermediate',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'An object traveling in a circle at constant speed is not in equilibrium—it is accelerating continuously because the direction of its velocity vector changes every instant. This acceleration always points radially inward toward the center of rotation and is called centripetal acceleration (a_c = v²/r).',
    'Centripetal force is not an exotic new force; rather, it is a kinematic job description fulfilled by real physical forces: tension in a string, friction on car tires, or gravity holding moons in orbit.',
  ],
  keyConcepts: [
    {
      title: 'Centripetal vs. "Centrifugal" Force',
      content:
        'From an inertial reference frame, there is only an inward centripetal force pulling the object away from its natural straight-line tangential path. The outward "centrifugal" sensation is simply the object’s own inertia resisting the inward curvature of the path (felt only inside a rotating non-inertial frame).',
    },
    {
      title: 'Angular Velocity vs. Tangential Speed',
      content:
        'Angular velocity (ω = dθ/dt in rad/s) measures how quickly an object sweeps through angle per unit time. Tangential linear speed relates via v = ωr. All points on a rotating vinyl record share the exact same angular velocity ω, but outer edges move with much higher tangential speed v because their radius r is larger.',
    },
    {
      title: 'Newton’s Law of Universal Gravitation & Orbits',
      content:
        'Every particle in the universe attracts every other particle with a force proportional to the product of their masses and inversely proportional to the square of distance between their centers: F_g = G m₁m₂ / r². In circular orbits, gravity provides the necessary centripetal force: G M m / r² = m v² / r.',
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
          symbol: 'T',
          name: 'Orbital Period',
          unit: '\\text{s}',
          description: 'Time taken to complete one full revolution (Kepler’s Third Law: T² ∝ r³).',
          connections:
            'Farther orbits take dramatically longer periods both because the circumference (2πr) is larger AND because orbital speed v is slower.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Switch between the Whirling String Tether and the Planetary Gravity Orbit simulator. Tweak speed, radius, and central mass. Watch tangential velocity and centripetal acceleration vector arrows in real time, and test the string breaking tension threshold.',
};

export default circularMotionData;
