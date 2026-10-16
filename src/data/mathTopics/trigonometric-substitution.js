/**
 * Math Topic: Trigonometric Substitution (Trig Sub)
 */
const trigonometricSubstitutionData = {
  id: 'trigonometric-substitution',
  title: 'Trigonometric Substitution (Trig Sub)',
  subtitle:
    'Eliminating radical expressions using right-triangle trigonometric geometry, reference triangles, and back-substitution.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'Trigonometric substitution is a powerful inverse-substitution technique designed specifically to eliminate radical algebraic expressions of the forms √(a² - x²), √(a² + x²), and √(x² - a²). While algebraic methods struggle with square roots of quadratic binomials, trigonometry solves them instantly because the Pythagorean theorem connects the three sides of a right triangle to squares: a² + b² = c².',
    'By substituting x with an appropriate trigonometric function of an auxiliary angle θ, the radical collapses into a single non-radical trigonometric term via fundamental Pythagorean identities (1 - sin² θ = cos² θ, 1 + tan² θ = sec² θ, and sec² θ - 1 = tan² θ).',
    'Once integrated in the θ-domain, the solution is converted back to the original x-domain using a geometric Reference Right Triangle, reading off side ratios directly without tedious algebraic inversion.',
  ],
  keyConcepts: [
    {
      title: 'The Three Classical Forms & Standard Substitutions',
      content:
        'Every radical quadratic expression maps directly to one of three standard right-triangle configurations:\n\n' +
        '1. Form √(a² - x²): Let x = a sin(θ), where -π/2 ≤ θ ≤ π/2.\n' +
        '   • Differential: dx = a cos(θ) dθ\n' +
        '   • Radical Simplification: √(a² - x²) = √(a² - a²sin² θ) = a√(cos² θ) = a cos(θ)\n' +
        '   • Triangle: Opposite side = x, Hypotenuse = a, Adjacent side = √(a² - x²).\n\n' +
        '2. Form √(a² + x²): Let x = a tan(θ), where -π/2 < θ < π/2.\n' +
        '   • Differential: dx = a sec²(θ) dθ\n' +
        '   • Radical Simplification: √(a² + x²) = √(a² + a²tan² θ) = a√(sec² θ) = a sec(θ)\n' +
        '   • Triangle: Opposite side = x, Adjacent side = a, Hypotenuse = √(a² + x²).\n\n' +
        '3. Form √(x² - a²): Let x = a sec(θ), where 0 ≤ θ < π/2 or π ≤ θ < 3π/2.\n' +
        '   • Differential: dx = a sec(θ) tan(θ) dθ\n' +
        '   • Radical Simplification: √(x² - a²) = √(a²sec² θ - a²) = a√(tan² θ) = a tan(θ)\n' +
        '   • Triangle: Hypotenuse = x, Adjacent side = a, Opposite side = √(x² - a²).',
    },
    {
      title: 'Geometric Reference Right Triangle for Back-Substitution',
      content:
        'After evaluating the integral in terms of θ, the antiderivative typically contains trigonometric functions like sin(θ), cos(θ), sec(θ), or cot(θ). To express the answer in terms of the original variable x, draw a right triangle defined by the initial substitution ratio:\n\n' +
        '• If x = a sin(θ), then sin(θ) = x / a (Opposite / Hypotenuse). By the Pythagorean theorem, the adjacent side is √(a² - x²).\n' +
        '• Any desired trigonometric ratio can now be read off instantly from the triangle:\n' +
        '  - cos(θ) = Adjacent / Hypotenuse = √(a² - x²) / a\n' +
        '  - tan(θ) = Opposite / Adjacent = x / √(a² - x²)\n' +
        '  - sec(θ) = Hypotenuse / Adjacent = a / √(a² - x²)\n' +
        '• If the result contains θ alone, use the inverse function: θ = arcsin(x / a).',
    },
    {
      title: 'Completing the Square for General Quadratics',
      content:
        'When an integrand contains a general quadratic under a root √(Ax² + Bx + C), first complete the square to write it in one of the three canonical forms:\n' +
        'Example: √(5 + 4x - x²) = √(9 - (x - 2)²). Let u = x - 2, transforming the radical into √(3² - u²), which is readily solved by the sine substitution u = 3 sin(θ).',
    },
  ],
  equations: [
    {
      name: 'Sine Substitution for √(a² - x²)',
      latex: 'x = a \\sin(\\theta), \\quad dx = a \\cos(\\theta) \\, d\\theta, \\quad \\sqrt{a^2 - x^2} = a \\cos(\\theta), \\quad \\theta \\in \\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]',
      summary:
        'Eliminates the radical √(a² - x²) by substituting x = a sin(θ), mapping the circular arc directly into a cosine expression.',
      conditions: [
        'a > 0 is a constant',
        '-a ≤ x ≤ a for the radical to be real',
        'Restricted domain -π/2 ≤ θ ≤ π/2 ensures cos(θ) ≥ 0, so √(cos² θ) = cos(θ)',
      ],
      variables: [
        {
          symbol: 'x = a \\sin(\\theta)',
          name: 'Original Spatial Variable',
          unit: '\\text{coordinate value}',
          description: 'The variable undergoing inverse trigonometric substitution.',
          connections: 'corresponds to the opposite side of the reference triangle; restricted to [-a, a].',
        },
        {
          symbol: 'a',
          name: 'Radical Radius Constant',
          unit: '\\text{positive scalar}',
          description: 'The square root of the constant term a² inside the radical.',
          connections: 'Serves as the hypotenuse length in the sine reference triangle.',
        },
        {
          symbol: '\\theta',
          name: 'Auxiliary Trigonometric Angle',
          unit: '\\text{radians}',
          description: 'The internal angle of the reference right triangle.',
          connections: 'Related to x via θ = arcsin(x/a).',
        },
        {
          symbol: 'dx = a \\cos(\\theta) \\, d\\theta',
          name: 'Transformed Differential',
          unit: '\\text{infinitesimal element}',
          description: 'The derivative of x = a sin(θ) multiplied by dθ.',
          connections: 'Substituted for dx in the integrand; introduces an extra factor of a cos(θ).',
        },
        {
          symbol: '\\sqrt{a^2 - x^2}',
          name: 'Radical Binomial',
          unit: '\\text{side length}',
          description: 'The algebraic radical term being evaluated.',
          connections: 'Simplifies cleanly to a cos(θ), eliminating the square root entirely.',
        },
      ],
    },
    {
      name: 'Tangent Substitution for √(a² + x²)',
      latex: 'x = a \\tan(\\theta), \\quad dx = a \\sec^2(\\theta) \\, d\\theta, \\quad \\sqrt{a^2 + x^2} = a \\sec(\\theta), \\quad \\theta \\in \\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)',
      summary:
        'Eliminates the radical √(a² + x²) by substituting x = a tan(θ), mapping the hypotenuse of a right triangle into a secant expression.',
      conditions: [
        'a > 0 is a constant',
        'x ∈ (-∞, ∞)',
        'Domain -π/2 < θ < π/2 ensures sec(θ) > 0, so √(sec² θ) = sec(θ)',
      ],
      variables: [
        {
          symbol: 'x = a \\tan(\\theta)',
          name: 'Original Spatial Variable',
          unit: '\\text{coordinate value}',
          description: 'The variable substituted with tangent; corresponds to the opposite side of the triangle.',
          connections: 'Has unrestricted domain x ∈ ℝ as θ ranges over (-π/2, π/2).',
        },
        {
          symbol: 'dx = a \\sec^2(\\theta) \\, d\\theta',
          name: 'Transformed Differential',
          unit: '\\text{infinitesimal element}',
          description: 'The derivative of x = a tan(θ) multiplied by dθ.',
          connections: 'Introduces a factor of a sec²(θ) into the integrand.',
        },
        {
          symbol: '\\sqrt{a^2 + x^2}',
          name: 'Radical Binomial (Hypotenuse)',
          unit: '\\text{length}',
          description: 'The algebraic radical representing the hypotenuse of the reference triangle.',
          connections: 'Simplifies to a sec(θ) using 1 + tan²(θ) = sec²(θ).',
        },
      ],
    },
    {
      name: 'Secant Substitution for √(x² - a²)',
      latex: 'x = a \\sec(\\theta), \\quad dx = a \\sec(\\theta)\\tan(\\theta) \\, d\\theta, \\quad \\sqrt{x^2 - a^2} = a \\tan(\\theta)',
      summary:
        'Eliminates the radical √(x² - a²) by substituting x = a sec(θ), mapping the exterior domain into a tangent expression.',
      conditions: [
        'a > 0 is a constant',
        '|x| ≥ a for the radical to be real',
        'θ ∈ [0, π/2) for x ≥ a, or θ ∈ [π, 3π/2) for x ≤ -a to ensure tan(θ) ≥ 0',
      ],
      variables: [
        {
          symbol: 'x = a \\sec(\\theta)',
          name: 'Original Spatial Variable (Hypotenuse)',
          unit: '\\text{coordinate value}',
          description: 'Corresponds to the hypotenuse length in the secant reference triangle.',
          connections: 'Defined for |x| ≥ a.',
        },
        {
          symbol: 'dx = a \\sec(\\theta)\\tan(\\theta) \\, d\\theta',
          name: 'Transformed Differential',
          unit: '\\text{infinitesimal element}',
          description: 'The derivative of x = a sec(θ) multiplied by dθ.',
          connections: 'Substitutes for dx in the integral expression.',
        },
        {
          symbol: '\\sqrt{x^2 - a^2}',
          name: 'Radical Binomial (Opposite Leg)',
          unit: '\\text{length}',
          description: 'The algebraic radical representing the opposite leg of the reference triangle.',
          connections: 'Simplifies to a tan(θ) via sec²(θ) - 1 = tan²(θ).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Switch between the three substitution cases to explore the interactive Geometric Reference Triangle. Drag the point on the triangle or adjust the radius slider a and coordinate x to observe how the angle θ, side lengths, and radical term change dynamically, alongside the shaded area in both the x and θ domains.',
};

export default trigonometricSubstitutionData;
