/**
 * Physics Topic: Oscillations (Simple Harmonic Motion)
 */
const oscillationsData = {
  id: 'oscillations',
  title: 'Oscillations & Simple Harmonic Motion (SHM)',
  subtitle: 'Periodic motion around stable equilibrium: restoring forces, resonance, phase relationships, and harmonic curves.',
  level: 'Intermediate',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'An oscillation is any repetitive back-and-forth motion about an equilibrium position. When the restoring force is directly proportional to displacement and directed opposite to it (Hooke’s Law, F = -kx), the resulting motion is termed Simple Harmonic Motion (SHM).',
    'SHM represents one of the most ubiquitous patterns in physics, describing everything from vibrating guitar strings and clock pendulums to molecular bonds and alternating electrical circuits.',
  ],
  keyConcepts: [
    {
      title: 'Restoring Force & Hooke’s Law',
      content:
        'In ideal SHM, the restoring force is F = -kx. The minus sign is vital: whenever an object is displaced to the right (+x), the force pushes back to the left (-F); when displaced to the left (-x), the force pushes right (+F). At equilibrium (x = 0), net restoring force is zero.',
    },
    {
      title: 'Sinusoidal Kinematics & Phase Offset',
      content:
        'The position of an oscillating body follows x(t) = A cos(ωt + φ). Velocity is the derivative v(t) = -Aω sin(ωt + φ), leading position by 90° (π/2). Acceleration is a(t) = -ω² x(t), which is exactly 180° out of phase with displacement: when position is at maximum positive crest, acceleration points at maximum negative peak.',
    },
    {
      title: 'Isochronism: Independence from Amplitude',
      content:
        'For small oscillations, the period T is strictly independent of the amplitude A. A pendulum swinging through 2° takes the exact same time per cycle as one swinging through 5°. Galileo discovered this principle, enabling the invention of precision pendulum clocks.',
    },
  ],
  equations: [
    {
      name: "Hooke's Law & Defining Differential Equation of SHM",
      latex: 'F_s = -kx, \\quad a = \\frac{d^2x}{dt^2} = -\\omega^2 x = -\\frac{k}{m}x',
      summary:
        'The foundational restoring force law of an ideal linear elastic spring and its acceleration relationship.',
      conditions: ['Within elastic limit of spring (no permanent deformation)', 'Linear restoring force'],
      variables: [
        {
          symbol: 'F_s',
          name: 'Spring Restoring Force',
          unit: '\\text{N}',
          description: 'The elastic force exerted by the spring attempting to return to its natural resting length.',
          connections:
            'Directly proportional to displacement x. Doubling stretch doubles restoring force. Directed opposite to displacement.',
        },
        {
          symbol: 'k',
          name: 'Spring Constant (Stiffness)',
          unit: '\\text{N/m}',
          description: 'Measure of the spring’s rigidity.',
          connections:
            'Directly raises the oscillation frequency: a stiffer spring (higher k) snaps back faster, increasing angular frequency ω = √(k/m).',
        },
        {
          symbol: 'x',
          name: 'Displacement from Equilibrium',
          unit: '\\text{m}',
          description: 'The distance and direction from the neutral resting coordinate (x = 0).',
          connections:
            'Acceleration is proportional to -x. When x = ±A (turning points), acceleration and force are at maximum while velocity is momentarily 0. When x = 0 (center), acceleration is 0 while velocity reaches maximum magnitude.',
        },
        {
          symbol: '\\omega',
          name: 'Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'Rate of phase progression (ω = 2π f = 2π / T).',
          connections:
            'Relates restoring stiffness to inertial mass: ω = √(k/m). Doubling the mass drops frequency by a factor of √2.',
        },
      ],
    },
    {
      name: 'Period of a Spring-Mass Oscillator vs. Simple Pendulum',
      latex: 'T_{\\text{spring}} = 2\\pi \\sqrt{\\frac{m}{k}}, \\quad T_{\\text{pendulum}} = 2\\pi \\sqrt{\\frac{L}{g}}',
      summary:
        'Calculates the time duration for one complete back-and-forth oscillation cycle.',
      conditions: ['Spring: negligible spring mass', 'Pendulum: small angle approximation (θ < 15°), inextensible massless rod'],
      variables: [
        {
          symbol: 'T',
          name: 'Period of Oscillation',
          unit: '\\text{s}',
          description: 'The time taken to complete one full cycle of motion.',
          connections:
            'Proportional to the square root of inertial property (m or L) and inversely proportional to restoring strength (k or g). To double the period of a pendulum, its length L must be quadrupled (4L)! Notice that pendulum period is completely independent of bob mass m.',
        },
        {
          symbol: 'm',
          name: 'Oscillating Mass',
          unit: '\\text{kg}',
          description: 'The mass attached to the spring.',
          connections:
            'Increases period with square-root dependence. Adding more mass creates more inertia, slowing down cycle rate.',
        },
        {
          symbol: 'L',
          name: 'Pendulum Length',
          unit: '\\text{m}',
          description: 'Distance from the pivot point to the center of mass of the pendulum bob.',
          connections:
            'Controls pendulum period: T ∝ √L. Longer grandfather clock pendulums tick more slowly than short pocket watch balances.',
        },
        {
          symbol: 'g',
          name: 'Gravitational Acceleration',
          unit: '\\text{m/s}^2',
          description: 'Local gravity providing the pendulum restoring torque (τ = -mgL sinθ).',
          connections:
            'On the Moon (g = 1.6 m/s²), a pendulum swings much more slowly, with period increasing by a factor of √(9.8/1.6) ≈ 2.5 times.',
        },
      ],
    },
    {
      name: 'Total Mechanical Energy in SHM',
      latex: 'E = K + U = \\frac{1}{2}mv^2 + \\frac{1}{2}kx^2 = \\frac{1}{2}kA^2 = \\frac{1}{2}m\\omega^2 A^2',
      summary:
        'Expresses energy conservation in undamped SHM: continuous interchange between kinetic energy and elastic potential energy.',
      conditions: ['No dissipative damping (friction b = 0)'],
      variables: [
        {
          symbol: 'E',
          name: 'Total Mechanical Energy',
          unit: '\\text{J (Joules)}',
          description: 'The constant sum of kinetic and potential energy throughout the cycle.',
          connections:
            'Proportional to the square of amplitude (E ∝ A²). Doubling the oscillation amplitude quadruples the stored mechanical energy in the oscillator.',
        },
        {
          symbol: 'A',
          name: 'Amplitude',
          unit: '\\text{m}',
          description: 'The maximum displacement from equilibrium.',
          connections:
            'At x = ±A, all energy is potential: U = ½kA², K = 0. At x = 0, all energy is kinetic: K = ½mv_max² = ½kA², so v_max = ωA.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Toggle between the Spring-Mass and Pendulum in the interactive lab. Drag to set initial displacement, adjust mass, spring stiffness, damping friction, and inspect the synchronized live oscilloscope graphs of position x(t) and velocity v(t).',
};

export default oscillationsData;
