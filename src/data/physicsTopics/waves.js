/**
 * Physics Topic: Waves, Sound & Acoustic Resonance
 */
const wavesData = {
  id: 'waves',
  title: 'Waves: Anatomy, Sound, Standing Waves & Doppler Effect',
  subtitle: 'Energy transport through oscillatory disturbances: wave anatomy, acoustic pipe resonance, longitudinal compressions, and relativistic/acoustic Doppler shifts.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'A mechanical wave is a propagating disturbance through a material medium that transports energy and momentum from one location to another without transporting net matter. Individual particles of the medium oscillate about their local equilibrium coordinates, while the wave profile, carrying kinetic and potential energy, travels through space.',
    'Waves manifest as either transverse (oscillations perpendicular to propagation, such as ripples on water or waves on a guitar string) or longitudinal (oscillations parallel to propagation, such as sound waves forming alternating compressions and rarefactions in air).',
    'When waves encounter boundaries or overlap with other waves, they exhibit unique phenomena: constructive and destructive interference, standing wave boundary resonance (crucial to musical wind and string instruments), and Doppler frequency shifts when sources and observers move relative to the medium.',
  ],
  keyConcepts: [
    {
      title: 'Wave Anatomy: Geometric & Temporal Properties',
      content:
        'Every periodic wave is characterized by distinct anatomical features: Crest (the maximum positive displacement above equilibrium), Trough (the maximum negative displacement below equilibrium), Amplitude (A, the magnitude of maximum displacement from the equilibrium baseline), Wavelength (λ, the spatial distance over which the wave’s shape repeats), Period (T, the time required for one complete cycle to pass a fixed point), and Frequency (f = 1/T, the number of cycles per second measured in Hertz).',
    },
    {
      title: 'Sound Waves: Compressions, Rarefactions & Pressure',
      content:
        'Sound is a longitudinal mechanical wave. As a vibrating object (such as a speaker cone or vocal cord) pushes forward, it compresses adjacent air molecules into a region of high density and high pressure called a Compression. As it retreats, it leaves a region of low density and low pressure called a Rarefaction. In air at 20°C, sound propagates at approximately 343 m/s. The speed of sound depends exclusively on the elasticity (bulk modulus) and density of the medium (v = √(B/ρ)), not on frequency or amplitude.',
    },
    {
      title: 'Standing Waves in Pipes: Open vs. Closed Boundary Conditions',
      content:
        'When sound waves travel inside a pipe or tube, reflections at the ends establish standing wave patterns. The acoustic boundary conditions dictate the allowed resonant frequencies:\n\n• Open End: Air molecules are completely free to move in and out of the open atmosphere, creating a Displacement Antinode (maximum air motion) and a Pressure Node (pressure stays at atmospheric level).\n\n• Closed End: A rigid barrier prevents air molecules from moving, enforcing a Displacement Node (zero air motion) and a Pressure Antinode (maximum pressure fluctuation).\n\n• Open–Open Pipe (both ends open): Supports all integer harmonics: f_n = n(v / 2L) for n = 1, 2, 3, 4...\n\n• Open–Closed Pipe (one end closed, one open): Supports only ODD harmonics: f_m = m(v / 4L) for m = 1, 3, 5, 7... Even harmonics are completely absent! This is why a clarinet (closed at the mouthpiece) has a rich, distinctive hollow timbre compared to an open flute.',
    },
    {
      title: 'The Doppler Effect & Supersonic Shockwaves',
      content:
        'When a sound-emitting source moves through air, each successive wavefront is emitted from a new, forward-shifted position. Ahead of the source, wavefronts are compressed into a shorter effective wavelength, causing an approaching observer to perceive a higher frequency (higher pitch). Behind the source, wavefronts are stretched out, causing a receding observer to hear a lower frequency (lower pitch).\n\nWhen source speed equals the speed of sound (v_s = v, Mach 1), wavefronts pile up directly at the front of the source into an intense acoustic barrier. When v_s > v (supersonic), the overlapping wavefronts form a conical shockwave called a Mach Cone with half-angle sin(θ) = v / v_s = 1/M. As this cone sweeps past a ground observer, the abrupt jump in pressure is heard as a loud Sonic Boom.',
    },
    {
      title: 'Phase Angle, Phasors & Reading Phase from a Sine Wave',
      content:
        'A sine wave is the one-dimensional geometric projection of uniform circular motion! As a vector (called a phasor) of length A rotates counterclockwise around the unit circle at angular speed ω, its vertical coordinate y = A sin(θ) traces out a continuous sine wave over angle or time.\n\n• At θ = 0° (0 rad): The phasor points horizontally right (+x). The sine wave crosses y = 0 moving upward.\n• At θ = 90° (π/2 rad): The phasor points vertically up (+y). The sine wave reaches its positive Crest (y = +A).\n• At θ = 180° (π rad): The phasor points left (-x). The sine wave crosses y = 0 moving downward.\n• At θ = 270° (3π/2 rad): The phasor points down (-y). The sine wave reaches its negative Trough (y = -A).\n• At θ = 360° (2π rad): The phasor completes one full revolution, corresponding to one complete wavelength λ.\n\nTo read the phase angle of any sine wave y(x) = A sin(kx + φ₀): observe where the wave crosses the equilibrium axis relative to the origin. If it starts at peak y = +A at x = 0, its phase is φ₀ = +90° (π/2 rad, a cosine wave). If it is shifted horizontally by distance Δx, the phase difference is Δφ = 2π (Δx / λ).',
    },
  ],
  equations: [
    {
      name: 'Universal Wave Equation & Anatomy Relation',
      latex: 'v = f \\lambda = \\frac{\\lambda}{T} = \\frac{\\omega}{k}',
      summary:
        'Relates wave speed v to temporal frequency f, spatial wavelength λ, angular frequency ω, and wavenumber k.',
      conditions: ['Valid for all harmonic traveling waves (sound, light, water, string waves)'],
      variables: [
        {
          symbol: 'v',
          name: 'Wave Propagation Speed',
          unit: '\\text{m/s}',
          description: 'The velocity at which the wave profile and energy propagate through the medium.',
          connections:
            'Determined solely by the mechanical properties of the medium (e.g., string tension and linear density: v = √(T_tension/μ); air bulk modulus and density: v = √(γRT/M)). Adjusting frequency f does NOT change wave speed v—it forces wavelength λ to adjust inversely: λ = v / f.',
        },
        {
          symbol: 'f',
          name: 'Frequency',
          unit: '\\text{Hz = s}^{-1}',
          description: 'The number of complete wave cycles passing a fixed coordinate per second.',
          connections:
            'Inversely proportional to wavelength λ for constant wave speed v. Doubling frequency halves the physical distance between crests.',
        },
        {
          symbol: '\\lambda',
          name: 'Wavelength',
          unit: '\\text{m}',
          description: 'The spatial length of one complete wave cycle (crest-to-crest or trough-to-trough).',
          connections:
            'Directly scales the spatial period. Connected to wavenumber via k = 2π / λ.',
        },
        {
          symbol: 'T',
          name: 'Period',
          unit: '\\text{s}',
          description: 'The time duration required for one full wave cycle to pass a fixed spatial point.',
          connections:
            'The reciprocal of frequency: T = 1 / f. Connects wave speed via v = λ / T.',
        },
        {
          symbol: 'A',
          name: 'Amplitude',
          unit: '\\text{m (or Pa for sound pressure)}',
          description: 'The peak magnitude of displacement from the undisturbed equilibrium baseline.',
          connections:
            'Directly dictates wave energy and sound intensity: energy transported by a wave is proportional to the square of amplitude (E ∝ A²). Does NOT affect wave speed or wavelength.',
        },
      ],
    },
    {
      name: 'Open–Open Pipe Resonant Frequencies (Both Ends Open)',
      latex: 'f_n = n \\left( \\frac{v}{2L} \\right) = n f_1, \\quad \\lambda_n = \\frac{2L}{n} \\quad (n = 1, 2, 3, 4, \\dots)',
      summary:
        'Predicts resonant standing wave frequencies in an organ pipe or acoustic tube open at both ends.',
      conditions: ['Both ends open to atmosphere (Displacement Antinodes at x = 0 and x = L)', 'Negligible end correction (pipe diameter << length L)'],
      variables: [
        {
          symbol: 'f_n',
          name: 'n-th Harmonic Frequency',
          unit: '\\text{Hz}',
          description: 'The resonant acoustic frequency producing standing wave patterns in the tube.',
          connections:
            'Supports ALL integer multiples of the fundamental frequency f1 (f1, 2f1, 3f1, 4f1...). The second harmonic (n = 2) produces the octave above the fundamental.',
        },
        {
          symbol: 'n',
          name: 'Harmonic Number',
          unit: '\\text{integer } (1, 2, 3, \\dots)',
          description: 'The mode index indicating the number of displacement nodes inside the tube (n nodes, n + 1 antinodes).',
          connections:
            'Increments by 1 for each harmonic. Each higher harmonic fits an extra half-wavelength (λ/2) into the pipe length L.',
        },
        {
          symbol: 'L',
          name: 'Pipe Length',
          unit: '\\text{m}',
          description: 'The physical length of the acoustic tube.',
          connections:
            'Inversely proportional to frequency: f ∝ 1/L. Doubling the length of the pipe lowers the fundamental pitch by an exact octave (halves the frequency).',
        },
        {
          symbol: 'v',
          name: 'Speed of Sound in Gas',
          unit: '\\text{m/s} \\approx 343\\,\\text{m/s at 20}^\\circ\\text{C in air}',
          description: 'The speed of sound in the gas filling the pipe.',
          connections:
            'Directly scales all resonant frequencies. Filling a pipe with helium (where v ≈ 965 m/s, nearly 3× faster than air) raises the pitch of every harmonic by nearly a factor of 3!',
        },
      ],
    },
    {
      name: 'Open–Closed Pipe Resonant Frequencies (One End Closed)',
      latex: 'f_m = m \\left( \\frac{v}{4L} \\right) = m f_1, \\quad \\lambda_m = \\frac{4L}{m} \\quad (m = 1, 3, 5, 7, \\dots)',
      summary:
        'Predicts resonant standing wave frequencies in a tube closed at one end and open at the other (e.g. clarinet, pan flute).',
      conditions: ['Displacement Node at closed end, Displacement Antinode at open end', 'Odd harmonics ONLY (m = 1, 3, 5...)'],
      variables: [
        {
          symbol: 'f_m',
          name: 'm-th Harmonic Frequency',
          unit: '\\text{Hz}',
          description: 'The resonant frequency of the closed pipe.',
          connections:
            'Notice the denominator has 4L instead of 2L! For the same physical length L, a closed pipe sounds an entire octave LOWER than an open pipe (f_1,closed = ½ f_1,open). Furthermore, even harmonics (2, 4, 6...) cannot form because boundary conditions cannot be satisfied.',
        },
        {
          symbol: 'm',
          name: 'Odd Harmonic Index',
          unit: '\\text{odd integer } (1, 3, 5, 7, \\dots)',
          description: 'The harmonic mode number. Strictly restricted to odd integers.',
          connections:
            'The first overtone is the 3rd harmonic (m = 3), sounding a musical twelfth (octave + fifth) above the fundamental, rather than an octave. This gives closed pipes their signature hollow, warm timbre.',
        },
        {
          symbol: 'L',
          name: 'Pipe Length',
          unit: '\\text{m}',
          description: 'The length of the tube from closed bottom to open mouth.',
          connections:
            'The fundamental wavelength is λ₁ = 4L (the pipe holds only one quarter of a wavelength).',
        },
      ],
    },
    {
      name: 'General Doppler Effect (Moving Source & Observer)',
      latex: "f' = f \\left( \\frac{v \\pm v_o}{v \\mp v_s} \\right)",
      summary:
        'Calculates the shifted frequency f’ observed when sound source and observer move relative to the air.',
      conditions: [
        'Motion along line connecting source and observer',
        'Top signs (+ vo, - vs) apply when observer/source move TOWARD each other (frequency increases)',
        'Bottom signs (- vo, + vs) apply when observer/source move AWAY from each other (frequency decreases)',
      ],
      variables: [
        {
          symbol: "f'",
          name: 'Observed Frequency',
          unit: '\\text{Hz}',
          description: 'The perceived pitch detected by the listener.',
          connections:
            'Elevated (f’ > f) when source and observer approach each other; depressed (f’ < f) when receding from each other. When an ambulance passes a stationary listener at 30 m/s (~108 km/h), the siren pitch suddenly drops by over 16% as it transitions from approaching to receding.',
        },
        {
          symbol: 'f',
          name: 'Emitted Source Frequency',
          unit: '\\text{Hz}',
          description: 'The true frequency emitted by the sound source in its own reference frame.',
          connections:
            'Baseline multiplier for all observed frequencies.',
        },
        {
          symbol: 'v',
          name: 'Speed of Sound in Medium',
          unit: '\\text{m/s}',
          description: 'Velocity of sound through the undisturbed air.',
          connections:
            'Constitutes the velocity reference frame of the medium.',
        },
        {
          symbol: 'v_s',
          name: 'Source Speed relative to Medium',
          unit: '\\text{m/s}',
          description: 'Speed of the emitting sound source.',
          connections:
            'Enters in the denominator (v - vs for approaching source). As source speed vs approaches sound speed v, the denominator approaches zero and f’ approaches infinity—producing the extreme acoustic pressure wave of the sound barrier.',
        },
        {
          symbol: 'v_o',
          name: 'Observer Speed relative to Medium',
          unit: '\\text{m/s}',
          description: 'Speed of the receiving listener.',
          connections:
            'Enters in the numerator (v + vo for approaching observer). Moving toward a sound source increases the rate of wavefront interception.',
        },
      ],
    },
    {
      name: 'Supersonic Mach Cone & Shockwave Angle',
      latex: '\\sin\\theta_M = \\frac{v}{v_s} = \\frac{1}{M}',
      summary:
        'Determines the half-angle θ_M of the conical shockwave envelope produced by a supersonic source moving faster than sound.',
      conditions: ['Source speed exceeds speed of sound (v_s > v, Mach M > 1)'],
      variables: [
        {
          symbol: '\\theta_M',
          name: 'Mach Angle',
          unit: '^\\circ \\text{ or radians}',
          description: 'The half-angle of the conical shock wave envelope trailing behind the supersonic aircraft.',
          connections:
            'Inversely related to Mach number: as speed increases (e.g. Mach 2, Mach 3), the shock cone becomes narrower and sharper (sin θ_M = 1/2 ⟹ θ_M = 30° at Mach 2; sin θ_M = 1/3 ⟹ θ_M = 19.5° at Mach 3).',
        },
        {
          symbol: 'M',
          name: 'Mach Number',
          unit: '\\text{dimensionless} = v_s / v',
          description: 'The ratio of source speed to the speed of sound.',
          connections:
            'Defines flight regimes: Subsonic (M < 1), Transonic (M ≈ 1), Supersonic (M > 1), Hypersonic (M > 5).',
        },
      ],
    },
    {
      name: 'Wave Phase & Phase Difference Equation',
      latex: '\\phi(x,t) = kx - \\omega t + \\phi_0, \\quad \\Delta\\phi = 2\\pi \\left(\\frac{\\Delta x}{\\lambda}\\right) = 2\\pi \\left(\\frac{\\Delta t}{T}\\right)',
      summary:
        'Calculates the instantaneous phase angle φ of a wave and relates physical spatial shifts Δx or time delays Δt directly to angular phase differences Δφ.',
      conditions: ['Harmonic sinusoidal waves with constant wavelength λ and period T'],
      variables: [
        {
          symbol: '\\phi(x,t)',
          name: 'Instantaneous Phase Angle',
          unit: '\\text{radians or degrees}',
          description: 'The argument of the sinusoidal function specifying the exact stage of the cycle at coordinate x and time t.',
          connections:
            'Advances by 2π radians (360°) whenever spatial position advances by one full wavelength λ or time advances by one period T.',
        },
        {
          symbol: '\\Delta\\phi',
          name: 'Phase Difference',
          unit: '\\text{radians or degrees}',
          description: 'The angular separation between two points on a wave, or the relative phase offset between two overlapping waves.',
          connections:
            'Governs wave interference: Δφ = 0° or 360° (in phase) yields maximum constructive interference (amplitude doubles). Δφ = 180° (π rad, out of phase) yields complete destructive cancellation.',
        },
        {
          symbol: '\\phi_0',
          name: 'Initial Phase Angle (Phase Constant)',
          unit: '\\text{radians or degrees}',
          description: 'The starting phase angle at spatial origin x = 0 and timestamp t = 0.',
          connections:
            'Acts as an initial angle on the unit circle: φ0 = 0 produces a standard sine wave; φ0 = +90° (+π/2 rad) produces a cosine wave (leading by 90°); φ0 = 180° (π rad) inverts the wave.',
        },
        {
          symbol: '\\Delta x',
          name: 'Spatial Shift / Path Difference',
          unit: '\\text{m}',
          description: 'The physical horizontal distance between corresponding points (e.g. crest-to-crest) of two waves.',
          connections:
            'Directly calculates phase difference: Δφ = 2π(Δx / λ). A horizontal shift of a quarter wavelength (Δx = λ/4) directly equals a phase angle difference of 90° (π/2 radians).',
        },
        {
          symbol: '\\lambda',
          name: 'Wavelength',
          unit: '\\text{m}',
          description: 'The spatial period corresponding to one full 360° (2π radian) rotation on the unit circle.',
          connections:
            'Normalizes spatial shift: (Δx / λ) is the fractional progress through the circle, converted to radians by multiplying by 2π.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive lab below to explore 5 distinct acoustic modes: (1) Wave Anatomy with dimensional brackets, (2) Unit Circle vs. Sine Wave Phase Angle comparator, (3) Pipe Resonance simulator comparing Open-Open and Open-Closed acoustic tubes, (4) 2D Doppler Effect & Sonic Boom Chamber, and (5) Wave Superposition & Interference.',
};

export default wavesData;
