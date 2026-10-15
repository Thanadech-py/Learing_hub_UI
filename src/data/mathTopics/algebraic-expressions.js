/**
 * Math Topic: Algebraic Expressions & Polynomials
 */
const algebraicExpressionsData = {
  id: 'algebraic-expressions',
  title: 'Algebraic Expressions & Polynomials',
  subtitle:
    'Manipulating symbolic expressions, polynomial factorization, binomial expansions, and the geometric method of completing the square.',
  level: 'Beginner',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'Algebra replaces concrete numerical quantities with general variables, enabling mathematicians and engineers to describe relationships, patterns, and physical laws universally. An algebraic expression is a combination of variables, constants, and operators.',
    'Polynomials are the bedrock of algebra and analysis. Because polynomials involve only addition, subtraction, and non-negative integer powers, they are computationally well-behaved, infinitely differentiable, and can approximate any continuous function via Taylor series.',
    'Central techniques such as factoring, expanding, and completing the square are not mere mechanical recipes—they are geometric reorganizations of areas and volumes.',
  ],
  keyConcepts: [
    {
      title: 'Geometric Intuition: Completing the Square',
      content:
        'The quadratic equation x² + bx = c can be visualized as an actual square of area x² flanked by two rectangles of area (b/2)x. To "complete" this into a single large square of side (x + b/2), one must add the missing corner square of area (b/2)² to both sides of the equation. This ancient geometric insight directly produces the universal quadratic formula!',
    },
    {
      title: 'Roots, Factors, and the Remainder Theorem',
      content:
        'For any polynomial P(x), a number r is a root (P(r) = 0) if and only if (x - r) is a linear factor of P(x). The Fundamental Theorem of Algebra guarantees that every polynomial of degree n factors completely into n linear terms over the complex numbers: P(x) = a_n (x - r₁)(x - r₂)...(x - r_n).',
    },
    {
      title: 'The Binomial Theorem & Pascal’s Triangle',
      content:
        'Expanding (a + b)ⁿ produces terms of the form aⁿ⁻ᵏ bᵏ whose coefficients are the combinatorial numbers "n choose k" (the entries in Pascal’s triangle). This pattern governs probability distributions, calculus expansions, and polynomial algebra.',
    },
  ],
  equations: [
    {
      name: 'Quadratic Formula and Discriminant',
      latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\Delta = b^2 - 4ac',
      summary:
        'Computes the exact roots of any general quadratic equation ax² + bx + c = 0.',
      conditions: ['a ≠ 0', 'Coefficients a, b, c ∈ ℝ'],
      variables: [
        {
          symbol: 'x',
          name: 'Polynomial Roots (Zero Crossings)',
          unit: '\\mathbb{C}',
          description: 'The horizontal coordinates where the parabola intersects the x-axis (y = 0).',
          connections:
            'If discriminant Δ > 0, there are 2 distinct real roots; if Δ = 0, there is 1 repeated real root (tangent to axis); if Δ < 0, there are 2 complex conjugate roots.',
        },
        {
          symbol: 'a',
          name: 'Leading Quadratic Coefficient',
          unit: '\\mathbb{R} \\setminus \\{0\\}',
          description: 'Governs the vertical curvature and concavity of the parabola.',
          connections: 'If a > 0, parabola opens upward (minimum vertex); if a < 0, opens downward (maximum vertex).',
        },
        {
          symbol: 'b',
          name: 'Linear Coefficient',
          unit: '\\mathbb{R}',
          description: 'Governs the slope of the parabola at the y-intercept (x = 0).',
          connections: 'Controls the horizontal shift of the axis of symmetry: x_vertex = -b / (2a).',
        },
        {
          symbol: 'c',
          name: 'Constant Term (y-intercept)',
          unit: '\\mathbb{R}',
          description: 'The vertical position where the curve crosses the y-axis (P(0) = c).',
          connections: 'Shifts the entire parabola vertically up or down without altering its shape.',
        },
        {
          symbol: '\\Delta',
          name: 'Discriminant',
          unit: '\\mathbb{R}',
          description: 'The expression b² - 4ac beneath the square root.',
          connections: 'Determines the topological nature of the roots.',
        },
      ],
    },
    {
      name: 'Vertex Form of a Parabola',
      latex: 'y = a(x - h)^2 + k',
      summary:
        'Reveals the extreme point (vertex) of the parabola obtained by completing the square.',
      conditions: ['Vertex located at coordinates (h, k)'],
      variables: [
        {
          symbol: 'h',
          name: 'Vertex x-coordinate',
          unit: '\\mathbb{R}',
          description: 'The horizontal coordinate of the axis of symmetry: h = -b / (2a).',
          connections: 'Horizontal translation of the parent parabola y = x².',
        },
        {
          symbol: 'k',
          name: 'Vertex y-coordinate (Extremum)',
          unit: '\\mathbb{R}',
          description: 'The global minimum (if a > 0) or global maximum (if a < 0) value: k = c - b²/(4a).',
          connections: 'Vertical translation of the parent parabola.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Manipulate polynomial coefficients a, b, and c to see how the parabola deforms, where the roots migrate in the complex plane, and how the geometric square is completed.',
};

export default algebraicExpressionsData;
