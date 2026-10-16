/**
 * Math Topic: u-Substitution & Change of Variables
 */
const uSubstitutionData = {
  id: 'u-substitution',
  title: 'u-Substitution & Change of Variables',
  subtitle:
    'Reversing the Chain Rule, transforming differentials, transforming integration limits, and evaluating composite integrals.',
  level: 'Advanced',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'The method of u-substitution—formally known as Integration by Change of Variables—is the integral counterpart to the Chain Rule of differential calculus. When differentiating a composite function f(g(x)), the chain rule produces an extra factor of the inner derivative: d/dx [f(g(x))] = f\'(g(x)) · g\'(x).',
    'Whenever an integrand contains an identifiable inner function g(x) multiplied by its own derivative g\'(x) (or a constant multiple of it), substitution transforms the complicated integral in the x-domain into a far simpler elementary integral in the u-domain: ∫ f(g(x)) g\'(x) dx = ∫ f(u) du.',
    'Geometrically, u-substitution rescales and stretches the coordinate axis by the local derivative du = g\'(x) dx, preserving the total accumulated area under the curve while mapping the domain from x ∈ [a, b] to u ∈ [g(a), g(b)].',
  ],
  keyConcepts: [
    {
      title: 'The Differential Match: Spotting Inner Functions',
      content:
        'The master key to u-substitution is finding a suitable substitute variable u = g(x) whose differential du = g\'(x) dx already appears inside the integrand (up to an adjustable multiplicative constant).\n\n' +
        '• Power of an expression: In ∫ 2x (x² + 5)⁴ dx, let u = x² + 5, so du = 2x dx. The integral becomes ∫ u⁴ du = (1/5)u⁵ + C = (1/5)(x² + 5)⁵ + C.\n' +
        '• Exponentials: In ∫ cos(x) e^(sin x) dx, let u = sin(x), so du = cos(x) dx. The integral becomes ∫ e^u du = e^u + C = e^(sin x) + C.\n' +
        '• Logarithms & Fractions: In ∫ (1 / (x ln x)) dx, let u = ln(x), so du = (1/x) dx. The integral becomes ∫ (1/u) du = ln|u| + C = ln|ln x| + C.',
    },
    {
      title: 'Definite Integrals: Transforming the Limits of Integration',
      content:
        'When evaluating definite integrals via substitution, there are two valid paths:\n\n' +
        '1. The Modern Method (Change the Limits): When x = a, the new lower limit is u = g(a). When x = b, the new upper limit is u = g(b). Once the limits are transformed to u, you evaluate directly in the u-domain and NEVER need to substitute back to x! This is both faster and far less prone to sign errors.\n\n' +
        '2. The Antiderivative Method: Find the indefinite antiderivative in terms of x first, and then evaluate at the original limits x = a and x = b.',
    },
    {
      title: 'Linear Shift & Scaling Shortcut',
      content:
        'For any integrand with a linear argument u = kx + c, the differential is simply du = k dx (so dx = (1/k) du). This yields the universal scaling formula: ∫ f(kx + c) dx = (1/k) F(kx + c) + C, where F is the antiderivative of f.\n\n' +
        'Examples:\n' +
        '• ∫ cos(5x) dx = (1/5) sin(5x) + C\n' +
        '• ∫ e^(-3x) dx = -(1/3) e^(-3x) + C\n' +
        '• ∫ (4x - 1)⁷ dx = (1/4) · (1/8)(4x - 1)⁸ + C = (1/32)(4x - 1)⁸ + C.',
    },
  ],
  equations: [
    {
      name: 'Indefinite Substitution Rule (Reversing the Chain Rule)',
      latex: '\\int f\\big(g(x)\\big) \\, g\'(x) \\, dx = \\int f(u) \\, du = F(u) + C = F\\big(g(x)\\big) + C',
      summary:
        'Transforms an integral containing an inner function g(x) and its derivative g\'(x) into an elementary integral with respect to u.',
      conditions: [
        'g(x) must be a differentiable function on the relevant domain interval',
        'f must be continuous on the range of g',
      ],
      variables: [
        {
          symbol: 'u = g(x)',
          name: 'Substitution Variable (Inner Function)',
          unit: '\\text{transformed coordinate}',
          description: 'The selected interior expression whose derivative appears elsewhere in the integrand.',
          connections: 'Replaces all occurrences of g(x) inside the integrand to simplify the integrand structure.',
        },
        {
          symbol: 'g\'(x)',
          name: 'Derivative of Inner Function',
          unit: '\\text{rate of change } dg/dx',
          description: 'The rate of change of the substitute variable with respect to the original independent variable x.',
          connections: 'Multiplied by dx to form the differential du; balances the coordinate transformation.',
        },
        {
          symbol: 'du = g\'(x) \\, dx',
          name: 'Differential of u',
          unit: '\\text{infinitesimal element of } u',
          description: 'The infinitesimal element along the u-axis, representing the stretched or compressed width of slices.',
          connections: 'Directly substitutes for g\'(x) dx in the integral expression.',
        },
        {
          symbol: 'F(u)',
          name: 'Antiderivative of f(u)',
          unit: '\\text{accumulated function}',
          description: 'A primitive function satisfying dF/du = f(u).',
          connections: 'Converted back to the x-domain by substituting u = g(x) in indefinite integrals.',
        },
        {
          symbol: 'C',
          name: 'Constant of Integration',
          unit: '\\mathbb{R}',
          description: 'An arbitrary real constant added to indefinite integrals representing the infinite family of antiderivatives.',
          connections: 'Cancels out completely when evaluating definite integrals with boundary limits.',
        },
      ],
    },
    {
      name: 'Definite Substitution Rule with Transformed Limits',
      latex: '\\int_a^b f\\big(g(x)\\big) \\, g\'(x) \\, dx = \\int_{g(a)}^{g(b)} f(u) \\, du = F\\big(g(b)\\big) - F\\big(g(a)\\big)',
      summary:
        'Evaluates definite integrals by simultaneously transforming the integrand, differential, and both limits of integration from the x-domain to the u-domain.',
      conditions: [
        'g\' is continuous on [a, b]',
        'f is continuous on the set of values assumed by g',
      ],
      variables: [
        {
          symbol: 'a, b',
          name: 'Original Integration Limits in x',
          unit: '\\text{domain values in } x',
          description: 'The lower limit a and upper limit b defining the integration interval on the x-axis.',
          connections: 'Mapped directly to u-limits via the transformation function: a ↦ g(a) and b ↦ g(b).',
        },
        {
          symbol: 'g(a), g(b)',
          name: 'Transformed Integration Limits in u',
          unit: '\\text{domain values in } u',
          description: 'The new lower limit g(a) and upper limit g(b) defining the integration interval on the u-axis.',
          connections: 'Allows evaluating the definite integral entirely in u without ever converting back to x.',
        },
        {
          symbol: 'F(g(b)) - F(g(a))',
          name: 'Net Accumulated Area',
          unit: '\\text{area units}',
          description: 'The total signed area computed via the Fundamental Theorem of Calculus in the transformed u-space.',
          connections: 'Identical in numerical value to the area under the original composite curve y = f(g(x))g\'(x).',
        },
      ],
    },
    {
      name: 'Universal Linear Argument Scaling Rule',
      latex: '\\int f(kx + c) \\, dx = \\frac{1}{k} \\int f(u) \\, du = \\frac{1}{k} F(kx + c) + C, \\quad (k \\ne 0)',
      summary:
        'A rapid analytical shortcut for integrating any standard function whose input is a linear binomial expression kx + c.',
      conditions: ['k must be a non-zero constant (k ≠ 0)'],
      variables: [
        {
          symbol: 'k',
          name: 'Linear Coefficient (Frequency / Slope)',
          unit: '\\text{constant scalar } (k \\ne 0)',
          description: 'The slope or frequency factor multiplying x inside the argument.',
          connections: 'Inversely scales the final antiderivative by 1/k because du/dx = k.',
        },
        {
          symbol: 'c',
          name: 'Phase Shift / Offset',
          unit: '\\text{constant scalar}',
          description: 'A constant additive shift that translates the graph horizontally without altering the differential dx.',
          connections: 'Derivative dc/dx = 0, so it does not affect the differential relation du = k dx.',
        },
        {
          symbol: '\\frac{1}{k}',
          name: 'Scaling Factor',
          unit: '\\text{scalar}',
          description: 'The compensating factor required by dx = (1/k) du.',
          connections: 'Directly divides the integrated result; prevents the common omission error in student calculations.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Switch between sample functions to observe how the complicated region under f(g(x))g\'(x) in the x-domain corresponds to the simplified region under f(u) in the u-domain. Adjust interval limits [a, b] to watch the limits [g(a), g(b)] transform in real time while preserving exact area equality.',
};

export default uSubstitutionData;
