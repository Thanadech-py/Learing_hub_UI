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
        'In ideal SHM, restoring force is linear and opposing: F = -kx. Acceleration (a = -ω²x) always directs toward equilibrium.',
    },
    {
      title: 'Sinusoidal Kinematics & Phase',
      content:
        'Displacement follows x(t) = A sin(ωt + φ). Velocity leads position by 90° (π/2), while acceleration is 180° (π) out of phase.',
    },
    {
      title: 'Damping & Resonance',
      content:
        'Friction dampens motion exponentially (e^(-γt)). When external driving frequency matches natural frequency (ωf ≈ ω0), resonance maximizes amplitude.',
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
        {
          symbol: 'a',
          name: 'Acceleration',
          unit: '\\text{m/s}^2',
          description: 'The second time derivative of position (d²x/dt²).',
          connections:
            'Proportional to displacement and opposite in sign: a = -ω²x.',
        },
        {
          symbol: 'm',
          name: 'Oscillating Mass',
          unit: '\\text{kg}',
          description: 'Inertial mass attached to the elastic spring.',
          connections:
            'Inversely scales acceleration: a = -(k/m)x. More mass lowers angular frequency ω.',
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
          symbol: 'T_{\\text{spring}}, T_{\\text{pendulum}}',
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
          symbol: 'k',
          name: 'Spring Stiffness Constant',
          unit: '\\text{N/m}',
          description: 'Elastic stiffness of the spring.',
          connections:
            'Inversely proportional under the square root (T ∝ 1/√k): quadrupling spring stiffness halves the oscillation period.',
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
          symbol: 'K',
          name: 'Kinetic Energy',
          unit: '\\text{J}',
          description: 'Translational energy of the moving mass: K = ½mv².',
          connections:
            'Reaches maximum (K = E) when passing through equilibrium (x = 0) and drops to zero at the turning points (x = ±A).',
        },
        {
          symbol: 'U',
          name: 'Elastic Potential Energy',
          unit: '\\text{J}',
          description: 'Energy stored in the deformed spring: U = ½kx².',
          connections:
            'Reaches maximum (U = E) at the extreme turning points (x = ±A) and drops to zero at equilibrium (x = 0).',
        },
        {
          symbol: 'm',
          name: 'Oscillating Mass',
          unit: '\\text{kg}',
          description: 'Inertial mass of the oscillating body.',
          connections:
            'Relates to spring stiffness via mω² = k.',
        },
        {
          symbol: 'v',
          name: 'Instantaneous Velocity',
          unit: '\\text{m/s}',
          description: 'Speed of the oscillator at position x.',
          connections:
            'Linked to position x via energy balance: ½mv² = ½k(A² - x²).',
        },
        {
          symbol: 'k',
          name: 'Spring Constant',
          unit: '\\text{N/m}',
          description: 'Stiffness of the restoring spring.',
          connections:
            'Directly scales stored mechanical energy for a given amplitude A.',
        },
        {
          symbol: 'x',
          name: 'Instantaneous Displacement',
          unit: '\\text{m}',
          description: 'Position from equilibrium at any instant.',
          connections:
            'Determines the fraction of total energy currently stored as potential energy (U/E = x²/A²).',
        },
        {
          symbol: 'A',
          name: 'Amplitude',
          unit: '\\text{m}',
          description: 'The maximum displacement from equilibrium.',
          connections:
            'At x = ±A, all energy is potential: U = ½kA², K = 0. At x = 0, all energy is kinetic: K = ½mv_max² = ½kA², so v_max = ωA.',
        },
        {
          symbol: '\\omega',
          name: 'Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'Natural oscillation rate (ω = √(k/m)).',
          connections:
            'Squared in ½mω²A²: doubling frequency at fixed amplitude quadruples total energy.',
        },
      ],
    },
    {
      name: 'Kinematics of SHM & Velocity-Displacement Relation',
      latex: 'x = A\\sin(\\omega t + \\phi), \\quad v = \\omega A\\cos(\\omega t + \\phi), \\quad a = -\\omega^2 x, \\quad v^2 = \\omega^2(A^2 - x^2)',
      summary:
        'Relates instantaneous position, velocity, and acceleration in SHM, and computes speed directly at any displacement x.',
      conditions: ['Ideal undamped harmonic oscillator', 'Angular frequency ω = 2π f = 2π / T'],
      variables: [
        {
          symbol: 'x',
          name: 'Displacement',
          unit: '\\text{m}',
          description: 'Instantaneous position relative to equilibrium.',
          connections:
            'When x = 0 (center), speed is maximized: v_max = ωA. When x = ±A (turning points), velocity is zero.',
        },
        {
          symbol: 'v',
          name: 'Velocity',
          unit: '\\text{m/s}',
          description: 'Rate of displacement change (dx/dt).',
          connections:
            'Related to displacement via energy conservation: v² = ω²(A² - x²). Leads displacement by 90° (π/2 rad).',
        },
        {
          symbol: 'a',
          name: 'Acceleration',
          unit: '\\text{m/s}^2',
          description: 'Instantaneous acceleration (dv/dt).',
          connections:
            'Directly proportional and opposite to displacement: a = -ω² x.',
        },
        {
          symbol: 'A',
          name: 'Amplitude',
          unit: '\\text{m}',
          description: 'Peak displacement from equilibrium.',
          connections:
            'Bounds the motion: -A ≤ x ≤ +A, and sets peak speed v_max = ωA and peak acceleration a_max = ω²A.',
        },
        {
          symbol: '\\omega',
          name: 'Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'Rate of phase evolution in radians per second.',
          connections:
            'Multiplies amplitude once for peak velocity (ωA) and twice for peak acceleration (ω²A).',
        },
        {
          symbol: 't',
          name: 'Elapsed Time',
          unit: '\\text{s}',
          description: 'Time variable driving the periodic cycle.',
          connections:
            'Each increment of one period T = 2π/ω advances phase ωt by 2π radians.',
        },
        {
          symbol: '\\phi',
          name: 'Initial Phase Constant',
          unit: '\\text{rad or } ^\\circ',
          description: 'Starting phase angle at t = 0.',
          connections:
            'Determined by initial position x(0) and initial velocity v(0).',
        },
      ],
    },
    {
      name: 'Superposition of Two Harmonic Oscillations',
      latex: 'A = \\sqrt{A_1^2 + A_2^2 + 2A_1 A_2 \\cos\\delta}, \\quad \\tan\\alpha = \\frac{A_1\\sin\\phi_1 + A_2\\sin\\phi_2}{A_1\\cos\\phi_1 + A_2\\cos\\phi_2}',
      summary:
        'Calculates the resultant amplitude A and phase angle α from the vector (phasor) superposition of two oscillations of equal frequency.',
      conditions: ['Both oscillations share identical angular frequency ω', 'δ = φ2 - φ1 is the phase difference'],
      variables: [
        {
          symbol: 'A',
          name: 'Resultant Amplitude',
          unit: '\\text{m}',
          description: 'The combined maximum displacement of the superposed oscillation.',
          connections:
            'Maximum (A = A1 + A2) when in-phase (δ = 0°). Minimum (A = |A1 - A2|) when out of phase (δ = 180°).',
        },
        {
          symbol: 'A_1, A_2',
          name: 'Component Amplitudes',
          unit: '\\text{m}',
          description: 'Individual amplitudes of the two interfering harmonic oscillations.',
          connections:
            'Added vectorially like two sides of a triangle using the law of cosines.',
        },
        {
          symbol: '\\delta',
          name: 'Phase Difference',
          unit: '\\text{rad or } ^\\circ',
          description: 'Relative phase shift between the two component oscillations: δ = φ2 - φ1.',
          connections:
            'Governed by cosine: determines constructive (cos δ > 0) vs destructive (cos δ < 0) interference.',
        },
        {
          symbol: '\\phi_1, \\phi_2',
          name: 'Individual Initial Phases',
          unit: '\\text{rad or } ^\\circ',
          description: 'Starting phase angles of the first and second oscillations.',
          connections:
            'Project amplitudes onto horizontal (cos) and vertical (sin) phasor axes.',
        },
        {
          symbol: '\\alpha',
          name: 'Resultant Phase Angle',
          unit: '\\text{rad or } ^\\circ',
          description: 'The net phase offset of the combined harmonic wave.',
          connections:
            'Weighted toward the phase of whichever component has the larger amplitude.',
        },
      ],
    },
    {
      name: 'Damped Harmonic Oscillations',
      latex: 'x = A e^{-\\gamma t}\\sin(\\omega\' t + \\alpha), \\quad \\omega\' = \\sqrt{\\omega_0^2 - \\gamma^2} = \\sqrt{\\frac{k}{m} - \\gamma^2}',
      summary:
        'Describes oscillatory motion subject to viscous drag, causing an exponential decay in envelope amplitude.',
      conditions: ['Underdamped regime: γ < ω0', 'γ is the damping attenuation factor (γ = b / 2m)'],
      variables: [
        {
          symbol: 'x',
          name: 'Instantaneous Displacement',
          unit: '\\text{m}',
          description: 'Position of the damped oscillator at time t.',
          connections:
            'Oscillates sinusoidally inside the shrinking exponential envelope ±A e^(-γt).',
        },
        {
          symbol: 'A',
          name: 'Initial Envelope Amplitude',
          unit: '\\text{m}',
          description: 'Starting amplitude factor at t = 0.',
          connections:
            'Decays by a factor of 1/e after characteristic relaxation time τ = 1/γ.',
        },
        {
          symbol: '\\gamma',
          name: 'Damping Coefficient (Attenuation Rate)',
          unit: '\\text{s}^{-1}',
          description: 'Rate of exponential amplitude decay, related to viscous drag coefficient b via γ = b/(2m).',
          connections:
            'Larger damping γ causes faster decay and lowers oscillation frequency ω’. When γ ≥ ω0, oscillation ceases (critical/overdamping).',
        },
        {
          symbol: 't',
          name: 'Elapsed Time',
          unit: '\\text{s}',
          description: 'Time since release.',
          connections:
            'Appears in both the decay exponent (-γt) and the oscillatory phase (ω’t).',
        },
        {
          symbol: "\\omega'",
          name: 'Damped Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'The angular frequency of oscillation under resistive damping.',
          connections:
            'Always slightly lower than the undamped natural frequency ω0 = √(k/m).',
        },
        {
          symbol: '\\omega_0',
          name: 'Undamped Natural Frequency',
          unit: '\\text{rad/s}',
          description: 'Frequency the system would have without friction: ω0 = √(k/m).',
          connections:
            'Sets the threshold for underdamped oscillation (ω0 > γ).',
        },
        {
          symbol: 'k, m',
          name: 'Spring Constant & Mass',
          unit: '\\text{N/m, kg}',
          description: 'Restoring stiffness k and inertial mass m defining natural frequency squared (ω0² = k/m).',
          connections:
            'Stiffer springs and lighter masses sustain higher ω’ against damping.',
        },
        {
          symbol: '\\alpha',
          name: 'Initial Phase Angle',
          unit: '\\text{rad or } ^\\circ',
          description: 'Starting phase constant determined by initial position and velocity.',
          connections:
            'Shifts the sinusoidal wave within the decay envelope.',
        },
      ],
    },
    {
      name: 'Forced Oscillations & Resonance Amplitude',
      latex: 'A = \\frac{F_0/m}{\\sqrt{(\\omega_0^2 - \\omega_f^2)^2 + 4\\gamma^2 \\omega_f^2}}, \\quad \\tan\\alpha = \\frac{2\\gamma\\omega_f}{\\omega_0^2 - \\omega_f^2}',
      summary:
        'Predicts the steady-state response amplitude of a damped oscillator driven by a periodic external force.',
      conditions: ['Continuous sinusoidal driving force', 'Steady-state response after transients have decayed'],
      variables: [
        {
          symbol: 'A',
          name: 'Steady-State Amplitude',
          unit: '\\text{m}',
          description: 'The sustained amplitude of the driven oscillator.',
          connections:
            'Peaks near the natural frequency (ωf ≈ ω0), creating resonance where amplitude is limited only by damping γ.',
        },
        {
          symbol: 'F_0',
          name: 'Driving Force Amplitude',
          unit: '\\text{N}',
          description: 'Peak magnitude of the periodic external driving force F(t) = F0 sin(ωf t).',
          connections:
            'Linearly scales the steady-state oscillation amplitude A.',
        },
        {
          symbol: 'm',
          name: 'Oscillating Mass',
          unit: '\\text{kg}',
          description: 'Inertial mass of the driven oscillator.',
          connections:
            'Divides F0 in the numerator to represent peak driving acceleration (F0/m).',
        },
        {
          symbol: '\\omega_f',
          name: 'Driving Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'The frequency of the external applied driving force.',
          connections:
            'As ωf approaches ω0, the first term in the square root denominator vanishes, producing maximum resonant response.',
        },
        {
          symbol: '\\omega_0',
          name: 'Natural Frequency',
          unit: '\\text{rad/s}',
          description: 'The intrinsic natural frequency of the undamped oscillator: ω0 = √(k/m).',
          connections:
            'Defines the resonance center.',
        },
        {
          symbol: '\\gamma',
          name: 'Damping Coefficient',
          unit: '\\text{s}^{-1}',
          description: 'Damping parameter (γ = b/2m) limiting the resonance peak.',
          connections:
            'At resonance (ωf = ω0), peak amplitude is A_max = F0 / (2mγω0). Lower damping produces a taller, sharper resonance peak.',
        },
        {
          symbol: '\\alpha',
          name: 'Phase Lag Angle',
          unit: '\\text{rad or } ^\\circ',
          description: 'Phase difference by which displacement lags behind the driving force.',
          connections:
            'Equals 0° at very low driving frequencies (ωf << ω0), exactly 90° (π/2) at resonance (ωf = ω0), and approaches 180° at high frequencies (ωf >> ω0).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Toggle between the Spring-Mass and Pendulum in the interactive lab. Drag to set initial displacement, adjust mass, spring stiffness, damping friction, and inspect the synchronized live oscilloscope graphs of position x(t) and velocity v(t).',
};

export default oscillationsData;
