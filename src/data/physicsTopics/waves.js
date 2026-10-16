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
      title: 'Wave Anatomy & Propagation',
      content:
        'Waves transport energy without net matter transfer. Governed by amplitude (A), wavelength (λ), period (T), and frequency (f = 1/T), linked via v = fλ.',
    },
    {
      title: 'Sound as Longitudinal Pressure Waves',
      content:
        'Sound propagates via alternating compressions (high pressure) and rarefactions (low pressure) at speed v = √(B/ρ), independent of frequency.',
    },
    {
      title: 'Boundary Resonance & Standing Waves',
      content:
        'Open-open pipes support all harmonics: fn = n(v/2L). Open-closed pipes enforce a displacement node and support only odd harmonics: fm = m(v/4L).',
    },
    {
      title: 'Doppler Shift & Mach Shockwaves',
      content:
        'Motion shifts perceived frequency: approaching raises pitch, receding lowers it. When vs > v, overlapping wavefronts form a conical supersonic Mach cone.',
    },
    {
      title: 'Phase Angle & Unit Circle Projection',
      content:
        'A sine wave projects uniform circular motion: y = A sin(kx - ωt + φ0). A spatial shift Δx corresponds to phase offset Δφ = 2π(Δx/λ).',
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
          symbol: '\\omega',
          name: 'Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'The rate of phase progression in radians per second: ω = 2πf = 2π/T.',
          connections:
            'Connects temporal oscillation to spatial wavenumber k via wave speed: v = ω / k.',
        },
        {
          symbol: 'k',
          name: 'Angular Wavenumber',
          unit: '\\text{rad/m}',
          description: 'The spatial frequency of the wave in radians per meter: k = 2π / λ.',
          connections:
            'Counts how many radians of wave phase fit into 1 meter of space.',
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
          symbol: 'f_1',
          name: 'Fundamental Frequency (First Harmonic)',
          unit: '\\text{Hz}',
          description: 'The lowest resonant frequency (n = 1) of the open pipe: f₁ = v / (2L).',
          connections:
            'Defines the musical pitch perceived by the ear; higher harmonics n·f₁ add overtone timbre.',
        },
        {
          symbol: '\\lambda_n',
          name: 'n-th Harmonic Wavelength',
          unit: '\\text{m}',
          description: 'The spatial wavelength of the n-th standing wave mode: λₙ = 2L / n.',
          connections:
            'For the fundamental mode (n = 1), λ₁ = 2L (exactly half a wavelength fits inside the pipe length L).',
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
          symbol: 'f_1',
          name: 'Fundamental Frequency (First Harmonic)',
          unit: '\\text{Hz}',
          description: 'The lowest resonant frequency (m = 1) of the closed-end pipe: f₁ = v / (4L).',
          connections:
            'One octave lower than an open-open pipe of the same physical length L.',
        },
        {
          symbol: '\\lambda_m',
          name: 'm-th Harmonic Wavelength',
          unit: '\\text{m}',
          description: 'The spatial wavelength of the m-th standing wave mode: λₘ = 4L / m.',
          connections:
            'At m = 1, λ₁ = 4L; at m = 3, λ₃ = 4L/3 (three-quarters of a wavelength fits inside the tube).',
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
          symbol: 'v',
          name: 'Speed of Sound in Gas',
          unit: '\\text{m/s}',
          description: 'Propagation speed of acoustic waves inside the tube medium.',
          connections:
            'Directly proportional to all harmonic frequencies f_m.',
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
          symbol: 'v',
          name: 'Speed of Sound in Medium',
          unit: '\\text{m/s}',
          description: 'The speed at which spherical acoustic wavefronts expand outward.',
          connections:
            'Forms the opposite leg of the right triangle of the Mach cone after time t (radius r = v·t).',
        },
        {
          symbol: 'v_s',
          name: 'Supersonic Source Speed',
          unit: '\\text{m/s}',
          description: 'The velocity of the supersonic object (where v_s > v).',
          connections:
            'Forms the hypotenuse of the Mach cone right triangle after time t (distance d = v_s·t).',
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
          symbol: 'k',
          name: 'Angular Wavenumber',
          unit: '\\text{rad/m}',
          description: 'Spatial phase rate of change: k = 2π / λ.',
          connections:
            'Multiplies coordinate x to determine spatial phase contribution kx.',
        },
        {
          symbol: 'x',
          name: 'Spatial Position Coordinate',
          unit: '\\text{m}',
          description: 'Position along the wave propagation axis.',
          connections:
            'Shifting position by Δx changes phase by Δφ = k·Δx = 2π(Δx / λ).',
        },
        {
          symbol: '\\omega',
          name: 'Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'Temporal phase rate of change: ω = 2π / T.',
          connections:
            'Multiplies time t to determine temporal phase progression ωt.',
        },
        {
          symbol: 't, \\Delta t',
          name: 'Time & Time Delay',
          unit: '\\text{s}',
          description: 'Instantaneous time t and time interval Δt between two wave observations at a fixed point.',
          connections:
            'A time delay of half a period (Δt = T/2) produces an exact out-of-phase shift of π radians (180°).',
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
          symbol: '\\Delta\\phi',
          name: 'Phase Difference',
          unit: '\\text{radians or degrees}',
          description: 'The angular separation between two points on a wave, or the relative phase offset between two overlapping waves.',
          connections:
            'Governs wave interference: Δφ = 0° or 360° (in phase) yields maximum constructive interference (amplitude doubles). Δφ = 180° (π rad, out of phase) yields complete destructive cancellation.',
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
        {
          symbol: 'T',
          name: 'Wave Period',
          unit: '\\text{s}',
          description: 'The temporal duration of one complete 360° (2π radian) wave oscillation.',
          connections:
            'Normalizes time delay: (Δt / T) is the fraction of a full cycle elapsed.',
        },
      ],
    },
    {
      name: 'Harmonic Traveling Wave Function',
      latex: 'y(x,t) = A\\sin(kx \\pm \\omega t), \\quad k = \\frac{2\\pi}{\\lambda}, \\quad \\omega = 2\\pi f = \\frac{2\\pi}{T}',
      summary:
        'The mathematical description of a one-dimensional transverse or longitudinal traveling sinusoidal wave.',
      conditions: ['Minus sign (-ωt) denotes wave traveling in +x direction', 'Plus sign (+ωt) denotes wave traveling in -x direction'],
      variables: [
        {
          symbol: 'y(x,t)',
          name: 'Wave Displacement',
          unit: '\\text{m}',
          description: 'Displacement of medium particle at coordinate x and timestamp t.',
          connections:
            'Oscillates harmonically between +A and -A over time and space.',
        },
        {
          symbol: 'A',
          name: 'Wave Amplitude',
          unit: '\\text{m}',
          description: 'Maximum displacement of a medium particle from its equilibrium position.',
          connections:
            'Wave energy and intensity scale with the square of amplitude (I ∝ A²).',
        },
        {
          symbol: 'k',
          name: 'Spatial Wavenumber',
          unit: '\\text{rad/m}',
          description: 'Spatial frequency of the wave: k = 2π / λ.',
          connections:
            'Relates spatial wavelength to wave speed: v = ω / k.',
        },
        {
          symbol: 'x',
          name: 'Position along Propagation Axis',
          unit: '\\text{m}',
          description: 'Spatial coordinate along the direction of wave travel.',
          connections:
            'Fixing t yields a spatial snapshot y(x) sinusoidal in x with wavelength λ.',
        },
        {
          symbol: '\\omega',
          name: 'Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'Rate of oscillation in radians per second: ω = 2πf = 2π / T.',
          connections:
            'Determines the maximum transverse particle speed: v_y,max = ωA.',
        },
        {
          symbol: 't',
          name: 'Elapsed Time',
          unit: '\\text{s}',
          description: 'Time variable tracking wave propagation.',
          connections:
            'Fixing x yields simple harmonic motion y(t) of a single particle with period T.',
        },
        {
          symbol: '\\lambda',
          name: 'Wavelength',
          unit: '\\text{m}',
          description: 'Spatial distance between two consecutive crests.',
          connections:
            'Inversely proportional to wavenumber: λ = 2π / k.',
        },
        {
          symbol: 'f',
          name: 'Oscillation Frequency',
          unit: '\\text{Hz}',
          description: 'Number of complete wave cycles per second.',
          connections:
            'Directly proportional to angular frequency: f = ω / (2π) = 1 / T.',
        },
        {
          symbol: 'T',
          name: 'Oscillation Period',
          unit: '\\text{s}',
          description: 'Time required for one full wave cycle to pass a fixed point.',
          connections:
            'Reciprocal of frequency: T = 1 / f = 2π / ω.',
        },
      ],
    },
    {
      name: 'Wave Speed on a Stretched String',
      latex: 'v = \\sqrt{\\frac{T_{\\text{tension}}}{\\mu}}, \\quad \\mu = \\frac{m}{L}',
      summary:
        'Determines the propagation speed of transverse waves along a taut string under tension.',
      conditions: ['Small amplitude transverse vibrations', 'Uniform linear mass density μ'],
      variables: [
        {
          symbol: 'v',
          name: 'Transverse Wave Speed',
          unit: '\\text{m/s}',
          description: 'Speed at which vibrations travel along the string.',
          connections:
            'Proportional to square root of tension: tightening a guitar peg quadruples tension to double pitch.',
        },
        {
          symbol: 'T_{\\text{tension}}',
          name: 'String Tension Force',
          unit: '\\text{N}',
          description: 'The pulling force stretching the string.',
          connections:
            'Higher tension provides greater restoring force, accelerating wave propagation.',
        },
        {
          symbol: '\\mu',
          name: 'Linear Mass Density',
          unit: '\\text{kg/m}',
          description: 'Mass per unit length of the string: μ = m / L.',
          connections:
            'Inversely proportional under square root: heavier, thicker bass strings propagate waves slower.',
        },
        {
          symbol: 'm',
          name: 'String Mass',
          unit: '\\text{kg}',
          description: 'The total mass of the vibrating string segment.',
          connections:
            'Increases inertial resistance to transverse acceleration, lowering wave speed v.',
        },
        {
          symbol: 'L',
          name: 'String Length',
          unit: '\\text{m}',
          description: 'The length of the string segment.',
          connections:
            'Divides total mass m to yield linear density μ = m / L.',
        },
      ],
    },
    {
      name: 'Standing Wave Product Form',
      latex: 'y(x,t) = 2A\\sin(kx)\\cos(\\omega t)',
      summary:
        'Represents the stationary interference pattern produced by the superposition of two identical waves traveling in opposite directions.',
      conditions: ['Identical frequency, wavelength, and amplitude traveling in opposite directions'],
      variables: [
        {
          symbol: 'y(x,t)',
          name: 'Standing Wave Displacement',
          unit: '\\text{m}',
          description: 'Instantaneous transverse displacement of the medium at coordinate x and time t.',
          connections:
            'Unlike a traveling wave, wavefronts do not translate left or right; each point x oscillates in place with amplitude |2A sin(kx)|.',
        },
        {
          symbol: 'A',
          name: 'Individual Traveling Wave Amplitude',
          unit: '\\text{m}',
          description: 'Amplitude of each of the two counter-propagating waves.',
          connections:
            'At antinodes, constructive interference doubles the peak amplitude to 2A.',
        },
        {
          symbol: 'k',
          name: 'Wavenumber',
          unit: '\\text{rad/m}',
          description: 'Spatial wavenumber k = 2π / λ.',
          connections:
            'Determines node locations: sin(kx) = 0 ⟹ x = n(λ/2).',
        },
        {
          symbol: 'x',
          name: 'Spatial Position',
          unit: '\\text{m}',
          description: 'Distance measured from the fixed boundary (x = 0).',
          connections:
            'Selects the local oscillation envelope amplitude 2A sin(kx).',
        },
        {
          symbol: '\\omega',
          name: 'Angular Frequency',
          unit: '\\text{rad/s}',
          description: 'Temporal oscillation rate ω = 2πf.',
          connections:
            'All points between consecutive nodes oscillate in phase with angular frequency ω.',
        },
        {
          symbol: 't',
          name: 'Time',
          unit: '\\text{s}',
          description: 'Elapsed time variable.',
          connections:
            'Enters through cos(ωt), causing the entire string to flatten simultaneously twice per period.',
        },
        {
          symbol: '2A\\sin(kx)',
          name: 'Position-Dependent Amplitude Envelope',
          unit: '\\text{m}',
          description: 'Spatial amplitude profile.',
          connections:
            'Nodes occur where sin(kx) = 0 (zero motion). Antinodes occur where sin(kx) = ±1 (maximum motion 2A).',
        },
        {
          symbol: '\\cos(\\omega t)',
          name: 'Temporal Harmonic Oscillation',
          unit: '\\text{dimensionless}',
          description: 'Time-dependent oscillation factor.',
          connections:
            'All particles pass through equilibrium simultaneously every half period.',
        },
      ],
    },
    {
      name: 'Sound Intensity & Inverse-Square Law',
      latex: 'I = \\frac{P}{A} = \\frac{P}{4\\pi r^2}',
      summary:
        'Quantifies the acoustic power transmitted per unit area from an isotropic point source spreading spherically.',
      conditions: ['Isotropic radiation into uniform 3D medium without attenuation or reflection'],
      variables: [
        {
          symbol: 'I',
          name: 'Sound Intensity',
          unit: '\\text{W/m}^2',
          description: 'Time-averaged rate of acoustic energy flow through a perpendicular unit area.',
          connections:
            'Obeys inverse-square law: doubling distance r from a sound source drops intensity to 1/4th.',
        },
        {
          symbol: 'P',
          name: 'Acoustic Source Power',
          unit: '\\text{W}',
          description: 'Total sound energy output rate emitted by the source.',
          connections:
            'Scales intensity linearly everywhere.',
        },
        {
          symbol: 'A',
          name: 'Wavefront Surface Area',
          unit: '\\text{m}^2',
          description: 'The cross-sectional area through which the acoustic power P passes (A = 4πr² for a spherical wavefront).',
          connections:
            'As the spherical shell expands outward, its surface area grows as r², diluting the energy concentration.',
        },
        {
          symbol: 'r',
          name: 'Distance from Source',
          unit: '\\text{m}',
          description: 'Radial distance from the acoustic center.',
          connections:
            'Inverse-square dependence: I ∝ 1/r².',
        },
      ],
    },
    {
      name: 'Sound Intensity Level (Decibels)',
      latex: '\\beta = 10\\log_{10}\\left(\\frac{I}{I_0}\\right), \\quad \\Delta\\beta = 10\\log_{10}\\left(\\frac{I_2}{I_1}\\right)',
      summary:
        'Expresses perceived acoustic volume on a logarithmic decibel (dB) scale referenced to the threshold of human hearing.',
      conditions: ['I0 = 10⁻¹² W/m² (standard reference threshold of human hearing at 1 kHz)'],
      variables: [
        {
          symbol: '\\beta',
          name: 'Sound Level',
          unit: '\\text{dB (Decibels)}',
          description: 'The logarithmic metric matching human hearing perception.',
          connections:
            'An increase of +10 dB corresponds to a 10× increase in acoustic intensity. A +20 dB jump is 100× intensity.',
        },
        {
          symbol: 'I',
          name: 'Measured Sound Intensity',
          unit: '\\text{W/m}^2',
          description: 'The physical acoustic power per unit area at the listener’s location.',
          connections:
            'Can be recovered from decibel level via I = I₀ · 10^(β/10).',
        },
        {
          symbol: 'I_0',
          name: 'Hearing Threshold Reference Intensity',
          unit: '\\text{W/m}^2 = 10^{-12}\\,\\text{W/m}^2',
          description: 'Standard baseline benchmark representing 0 dB.',
          connections:
            'Fixed international reference constant.',
        },
        {
          symbol: '\\Delta\\beta',
          name: 'Decibel Difference',
          unit: '\\text{dB}',
          description: 'Change in sound level between two intensities I1 and I2: Δβ = β₂ - β₁.',
          connections:
            'Doubling sound intensity (I2/I1 = 2) raises the sound level by 10 log10(2) ≈ +3.01 dB.',
        },
        {
          symbol: 'I_1, I_2',
          name: 'Initial and Final Sound Intensities',
          unit: '\\text{W/m}^2',
          description: 'The two acoustic intensities being compared in the ratio I₂ / I₁.',
          connections:
            'A tenfold ratio (I₂ / I₁ = 10) yields Δβ = +10 dB.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive lab below to explore 5 distinct acoustic modes: (1) Wave Anatomy with dimensional brackets, (2) Unit Circle vs. Sine Wave Phase Angle comparator, (3) Pipe Resonance simulator comparing Open-Open and Open-Closed acoustic tubes, (4) 2D Doppler Effect & Sonic Boom Chamber, and (5) Wave Superposition & Interference.',
};

export default wavesData;
