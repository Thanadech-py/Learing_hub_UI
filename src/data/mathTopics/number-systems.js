/**
 * Math Topic: Number Systems & Complex Numbers
 */
const numberSystemsData = {
  id: 'number-systems',
  title: 'Number Systems & Complex Numbers',
  subtitle:
    'The progressive hierarchy of numbers from counting integers to the continuous real line and the 2D complex plane.',
  level: 'Beginner',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'Mathematics develops through the progressive expansion of number systems to solve equations that have no solutions in existing sets. Counting natural numbers ℕ expands to integers ℤ to permit subtraction, then to rationals ℚ to permit division, then to real numbers ℝ to capture geometric lengths like √2 and circle ratios like π.',
    'The ultimate expansion occurs when confronting equations like x² + 1 = 0. By defining the imaginary unit i such that i² = -1, complex numbers ℂ unlock a two-dimensional number plane where every non-zero polynomial of degree n has exactly n complex roots (The Fundamental Theorem of Algebra).',
    'Rather than being "imaginary" or fictional, complex numbers are fundamental to modern geometry, quantum mechanics, electrical engineering (AC circuits), fluid dynamics, and signal processing.',
  ],
  keyConcepts: [
    {
      title: 'The Nested Hierarchy of Numbers (ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ)',
      content:
        '• Natural Numbers (ℕ = {1, 2, 3...}): Used for discrete counting.\n' +
        '• Integers (ℤ = {...-2, -1, 0, 1, 2...}): Closed under subtraction.\n' +
        '• Rational Numbers (ℚ = {p/q | p, q ∈ ℤ, q ≠ 0}): Fractions representing exact ratios.\n' +
        '• Irrational Numbers: Real numbers that cannot be written as fractions (e.g. √2, π, e). Their decimal expansions are non-terminating and non-repeating.\n' +
        '• Real Numbers (ℝ): Complete continuum filling the entire 1D geometric number line.\n' +
        '• Complex Numbers (ℂ = {a + bi | a, b ∈ ℝ, i² = -1}): 2D numbers with real and imaginary axes.',
    },
    {
      title: 'Geometric Meaning of Multiplication by i',
      content:
        'In the 1D real number line, multiplying a number by -1 rotates it by 180° into the negative axis. Multiplying by -1 again rotates it another 180° back to positive.\n\n' +
        'Because i² = -1, multiplying by i is mathematically equivalent to rotating a vector in the plane by 90° counterclockwise! Multiplying by i twice produces two 90° turns (180°), landing at -1. Complex arithmetic is inherently the algebra of 2D planar rotation and scaling.',
    },
    {
      title: "Euler's Formula & Polar Form: z = r e^(iθ)",
      content:
        'Every complex number z = a + bi can be represented in polar coordinates by its magnitude (modulus) r = √(a² + b²) and its angle (argument) θ = atan2(b, a).\n\n' +
        "Euler's profound identity e^(iθ) = cos(θ) + i sin(θ) connects exponential growth to trigonometric oscillation. Multiplying two complex numbers z₁ · z₂ simply multiplies their lengths (r₁ · r₂) and adds their angles (θ₁ + θ₂).",
    },
  ],
  equations: [
    {
      name: 'Cartesian and Polar Form of a Complex Number',
      latex: 'z = a + bi = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}',
      summary:
        'Expresses a 2D complex number either in Cartesian rectangular coordinates (a, b) or polar rotation coordinates (r, θ).',
      conditions: ['a, b ∈ ℝ', 'i² = -1', 'r = |z| ≥ 0', 'θ = \\text{arg}(z) ∈ [-\\pi, \\pi]'],
      variables: [
        {
          symbol: 'z',
          name: 'Complex Number',
          unit: '\\mathbb{C}',
          description: 'A two-dimensional quantity located on the Argand plane.',
          connections:
            'Possesses both a scalar real projection a and an orthogonal imaginary projection b.',
        },
        {
          symbol: 'a',
          name: 'Real Part Re(z)',
          unit: '\\mathbb{R}',
          description: 'The horizontal coordinate along the real axis.',
          connections: 'Calculated as a = r cos(θ). If b = 0, z reduces to a standard real number.',
        },
        {
          symbol: 'b',
          name: 'Imaginary Part Im(z)',
          unit: '\\mathbb{R}',
          description: 'The vertical coordinate along the imaginary axis.',
          connections: 'Calculated as b = r sin(θ). If a = 0, z is purely imaginary.',
        },
        {
          symbol: 'r',
          name: 'Modulus (Magnitude |z|)',
          unit: '\\mathbb{R}_{\\ge 0}',
          description: 'The Euclidean distance from the origin (0, 0) to z.',
          connections: 'Given by the Pythagorean theorem: r = √(a² + b²).',
        },
        {
          symbol: '\\theta',
          name: 'Argument (Phase Angle)',
          unit: '\\text{radians}',
          description: 'The counterclockwise angle between the positive real axis and the vector z.',
          connections: 'Given by atan2(b, a). When multiplying complex numbers, angles add: arg(z₁ z₂) = θ₁ + θ₂.',
        },
      ],
    },
    {
      name: "Euler's Formula & Fundamental Identity",
      latex: 'e^{i\\pi} + 1 = 0',
      summary:
        'Often hailed as the most beautiful formula in mathematics, connecting the 5 fundamental constants: 0, 1, e, i, and π.',
      conditions: ['Derived from Taylor series expansions of e^x, cos(x), and sin(x)'],
      variables: [
        {
          symbol: 'e',
          name: "Euler's Number",
          unit: '\\text{constant } \\approx 2.71828',
          description: 'The natural base of continuous exponential growth.',
          connections: 'Derivative of e^x is identically e^x.',
        },
        {
          symbol: 'i',
          name: 'Imaginary Unit',
          unit: '\\sqrt{-1}',
          description: 'The foundational constant generating the orthogonal imaginary dimension.',
          connections: 'Generates 4-fold cyclic powers: i¹ = i, i² = -1, i³ = -i, i⁴ = 1.',
        },
        {
          symbol: '\\pi',
          name: 'Archimedes Constant Pi',
          unit: '\\text{constant } \\approx 3.14159',
          description: 'The ratio of a circle’s circumference to its diameter.',
          connections: 'Represents a half-turn (180° rotation) on the unit circle.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive Argand plane to drag complex numbers z₁ and z₂. Observe how complex addition forms a geometric vector parallelogram, and how complex multiplication scales magnitudes while rotating angles.',
};

export default numberSystemsData;
