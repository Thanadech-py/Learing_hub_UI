/**
 * Math Topic: Functions, Graphs & Inverses
 */
const functionsData = {
  id: 'functions',
  title: 'Functions, Graphs & Transformations',
  subtitle:
    'Mappings between sets, domain and range, geometric curve transformations, and reversible inverse operations.',
  level: 'Beginner',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'A mathematical function f: X → Y is a deterministic rule assigning each input element x in the domain X to exactly one unique output value f(x) in the codomain Y. This single-valued requirement is visualized geometrically by the Vertical Line Test: no vertical line can intersect a function graph more than once.',
    'Functions describe cause-and-effect relationships across all sciences. Understanding how modifying an algebraic equation transforms its graph—by stretching, compressing, shifting, or reflecting—allows mathematicians to model complex physical phenomena from a few elementary parent functions.',
    'When a function is one-to-one (bijective), it possesses an inverse function f⁻¹ that undoes its action. Geometrically, taking the inverse corresponds to swapping the roles of x and y, reflecting the curve across the diagonal line y = x.',
  ],
  keyConcepts: [
    {
      title: 'Domain, Range, and Well-Definedness',
      content:
        '• Domain: The set of all valid input numbers for which the function is defined. Values causing division by zero or negative values inside even roots must be excluded.\n' +
        '• Range: The complete set of actual output values produced by the function.\n' +
        '• Codomain: The target set containing the range (often all real numbers ℝ).',
    },
    {
      title: 'The Four Standard Function Transformations',
      content:
        'Given a parent function y = f(x), the generalized form y = A · f(B(x - C)) + D produces four distinct geometric transformations:\n\n' +
        '• Vertical Stretch/Compress (A): Multiplies y-values. If |A| > 1, stretches vertically; if A < 0, reflects across the x-axis.\n' +
        '• Horizontal Stretch/Compress (B): Replaces x with B·x. If |B| > 1, compresses horizontally by factor 1/B; if B < 0, reflects across the y-axis.\n' +
        '• Horizontal Shift (C): Shifting right by +C if (x - C), or left by -C if (x + C).\n' +
        '• Vertical Shift (D): Shifts the entire graph up (+D) or down (-D).',
    },
    {
      title: 'Inverse Functions & Reflection across y = x',
      content:
        'A function has an inverse if and only if it passes the Horizontal Line Test (each output comes from only one input). The inverse function satisfies f(f⁻¹(x)) = x and f⁻¹(f(x)) = x. Swapping (x, y) coordinates reflects the entire curve across the 45° diagonal mirror line y = x.',
    },
  ],
  equations: [
    {
      name: 'General Function Transformation Formula',
      latex: 'g(x) = A \\cdot f\\big(B(x - C)\\big) + D',
      summary:
        'Decomposes any transformed curve into 4 independent geometric operations relative to parent function f(x).',
      conditions: ['A ≠ 0', 'B ≠ 0'],
      variables: [
        {
          symbol: 'g(x)',
          name: 'Transformed Function Output',
          unit: '\\mathbb{R}',
          description: 'The final vertical coordinate on the Cartesian coordinate plane.',
          connections: 'Derived from parent output f(...) by scaling with A and adding vertical offset D.',
        },
        {
          symbol: 'A',
          name: 'Vertical Amplitude / Dilation',
          unit: '\\text{dimensionless}',
          description: 'Scales the vertical distance from the horizontal line of symmetry.',
          connections: 'If |A| > 1: vertical expansion. If A < 0: vertical reflection across the horizontal axis.',
        },
        {
          symbol: 'B',
          name: 'Horizontal Frequency / Compression',
          unit: '\\text{dimensionless}',
          description: 'Scales the horizontal rate of change.',
          connections: 'The horizontal period or scale is multiplied by 1 / |B|.',
        },
        {
          symbol: 'C',
          name: 'Horizontal Phase Shift',
          unit: '\\mathbb{R}',
          description: 'Translates the curve horizontally along the x-axis.',
          connections: 'Positive C translates rightward; negative C translates leftward.',
        },
        {
          symbol: 'D',
          name: 'Vertical Offset (Baseline)',
          unit: '\\mathbb{R}',
          description: 'Translates the curve vertically along the y-axis.',
          connections: 'Directly shifts the baseline equilibrium or horizontal asymptote.',
        },
      ],
    },
    {
      name: 'Inverse Function Composition Identity',
      latex: 'f\\left(f^{-1}(x)\\right) = x \\quad \\text{and} \\quad f^{-1}\\left(f(y)\\right) = y',
      summary:
        'Defines the reciprocal algebraic relationship between a function and its inverse.',
      conditions: ['Function f must be strictly monotonic / bijective on its domain'],
      variables: [
        {
          symbol: 'f^{-1}',
          name: 'Inverse Function Notation',
          unit: '\\text{operator}',
          description: 'The operation that reverses the mapping of f (NOT equivalent to 1/f(x)!).',
          connections: 'Its graph is the mirror reflection of y = f(x) across y = x.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Toggle between parent functions (quadratic, cubic, sinusoidal, exponential, rational) and adjust sliders A, B, C, D to visualize live transformations. Toggle the Inverse mode to see the diagonal reflection across y = x.',
};

export default functionsData;
