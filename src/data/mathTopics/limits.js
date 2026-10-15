/**
 * Math Topic: Limits & Continuity
 */
const limitsData = {
  id: 'limits',
  title: 'Limits & Continuity',
  subtitle:
    'The foundational language of calculus: approaching values, epsilon-delta rigor, one-sided limits, and indeterminate forms.',
  level: 'Intermediate',
  estimatedTime: '25 min read + interactive lab',
  overview: [
    'Calculus was born from the paradox of dividing by zero. In classical physics, instantaneous velocity asks: "what is the speed of an object at an exact single instant?" But speed is distance divided by time, and at a single instant, distance elapsed is zero and time elapsed is zero, yielding the undefined fraction 0/0.',
    'The mathematical concept of a Limit resolves this paradox. A limit does NOT ask what happens WHEN x equals c; it asks what target value f(x) steadily approaches as x gets arbitrarily, infinitely close to c without ever touching c.',
    'Limits provide the rigorous logical scaffolding upon which all of modern analysis rests: continuity, derivatives (tangent slopes), integrals (infinite Riemann sums), and infinite series.',
  ],
  keyConcepts: [
    {
      title: 'The Intuition of Approaching: x → c vs. x = c',
      content:
        'Consider the rational function f(x) = (x² - 1) / (x - 1). If you substitute x = 1, you obtain 0/0 (undefined). But for all x ≠ 1, we can factor the numerator: (x - 1)(x + 1) / (x - 1) = x + 1. As x approaches 1 from either the left (0.99, 0.999) or right (1.01, 1.001), f(x) gets arbitrarily close to 2. Hence, lim_{x→1} f(x) = 2, even though f(1) does not exist (there is a removable "hole" in the graph).',
    },
    {
      title: 'One-Sided Limits & The Definition of Continuity',
      content:
        '• Left-hand limit: lim_{x→c⁻} f(x) approaches c from values strictly less than c.\n' +
        '• Right-hand limit: lim_{x→c⁺} f(x) approaches c from values strictly greater than c.\n' +
        '• The two-sided limit exists if and only if both one-sided limits are equal: lim_{x→c⁻} f(x) = lim_{x→c⁺} f(x) = L.\n' +
        '• A function is Continuous at x = c if: (1) f(c) is defined, (2) the limit exists, and (3) lim_{x→c} f(x) = f(c). Continuity means you can draw the graph without lifting your pen.',
    },
    {
      title: 'The Formal Epsilon-Delta Definition (ε-δ)',
      content:
        'In the 19th century, Augustin-Louis Cauchy and Karl Weierstrass made limits rigorous:\n\n' +
        '"lim_{x→c} f(x) = L means: for every tolerance ε > 0, there exists a distance δ > 0 such that whenever 0 < |x - c| < δ, the output is trapped within |f(x) - L| < ε."\n\n' +
        'This is a mathematical challenge: whatever precision ε someone demands for the output, you can always guarantee it by keeping the input within radius δ of c.',
    },
  ],
  equations: [
    {
      name: 'Formal Epsilon-Delta Limit Definition',
      latex: '\\lim_{x \\to c} f(x) = L \\iff \\forall \\varepsilon > 0, \\; \\exists \\delta > 0 \\text{ s.t. } 0 < |x - c| < \\delta \\implies |f(x) - L| < \\varepsilon',
      summary:
        'The rigorous foundation of mathematical analysis guaranteeing that f(x) can be made arbitrarily close to L.',
      conditions: ['Function f defined on an open interval containing c, except possibly at c itself'],
      variables: [
        {
          symbol: 'L',
          name: 'Limit Value',
          unit: '\\mathbb{R}',
          description: 'The horizontal asymptote or target value approached by f(x).',
          connections: 'Independent of the actual value of f(c).',
        },
        {
          symbol: 'c',
          name: 'Point of Approach',
          unit: '\\mathbb{R}',
          description: 'The target x-value on the horizontal axis.',
          connections: 'The punctured neighborhood 0 < |x - c| excludes x = c itself.',
        },
        {
          symbol: '\\varepsilon',
          name: 'Epsilon (Output Error Tolerance)',
          unit: '\\mathbb{R}_{>0}',
          description: 'The vertical error margin around the limit: (L - ε, L + ε).',
          connections: 'Chosen first by an observer; can be made arbitrarily small.',
        },
        {
          symbol: '\\delta',
          name: 'Delta (Input Precision Window)',
          unit: '\\mathbb{R}_{>0}',
          description: 'The horizontal interval around c: (c - δ, c + δ) ensuring the output stays within ε.',
          connections: 'Depends mathematically on ε and the steepness of f near c.',
        },
      ],
    },
    {
      name: "L'Hôpital's Rule for Indeterminate Forms",
      latex: '\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f\'(x)}{g\'(x)}',
      summary:
        'Evaluates indeterminate limits of the form 0/0 or ±∞/±∞ by comparing relative rates of change.',
      conditions: ['Limit must be of indeterminate form 0/0 or ±∞/±∞', "g'(x) ≠ 0 near c", "lim f'(x)/g'(x) must exist"],
      variables: [
        {
          symbol: "f'(x), g'(x)",
          name: 'Derivatives of Numerator and Denominator',
          unit: '\\text{slopes}',
          description: 'The instantaneous velocities at which numerator and denominator approach zero or infinity.',
          connections: 'Differentiating both parts individually (NOT using the quotient rule!).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Experiment with the Epsilon-Delta challenge visualizer. Adjust the output tolerance band ε and watch how the input radius δ automatically adjusts to trap the curve within the target window.',
};

export default limitsData;
