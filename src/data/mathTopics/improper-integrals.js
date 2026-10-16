/**
 * Math Topic: Improper Integrals & Advanced Integration
 */
const improperIntegralsData = {
  id: 'improper-integrals',
  title: 'Improper Integrals & Advanced Integration',
  subtitle:
    'Infinite integration intervals, unbounded vertical singularities, the p-integral convergence test, Gabriel\'s Horn, and Weierstrass substitution.',
  level: 'Advanced',
  estimatedTime: '30 min read + interactive lab',
  overview: [
    'The standard definite integral ∫ₐᵇ f(x) dx established by Riemann requires two fundamental conditions: a finite bounded interval [a, b], and a bounded continuous integrand f(x). Whenever either condition is violated—either the interval stretches infinitely to ±∞, or the integrand shoots to ±∞ at a vertical asymptote—the integral is classified as an Improper Integral.',
    'Improper integrals are defined rigorously as limits of proper integrals: ∫ₐ^∞ f(x) dx = lim_{R → ∞} ∫ₐᴿ f(x) dx. If this limit exists as a finite real number, the improper integral converges to that value; if the limit does not exist or approaches ±∞, the integral diverges.',
    'Improper integrals are foundational to physics and statistics: probability distributions (like the Gaussian normal distribution ∫_{-∞}^∞ e^(-x²/2) dx = √(2π)), gravitational and electrostatic potential energy at infinite separation, and advanced mathematical tools like the Gamma function Γ(z) and the Weierstrass half-angle substitution.',
  ],
  keyConcepts: [
    {
      title: 'Type 1 Improper Integrals: Infinite Intervals',
      content:
        'Occur when one or both limits of integration are infinite:\n\n' +
        '• Upper Infinite Bound: ∫ₐ^∞ f(x) dx = lim_{R → ∞} ∫ₐᴿ f(x) dx\n' +
        '• Lower Infinite Bound: ∫_{-∞}^b f(x) dx = lim_{R → -∞} ∫_R^b f(x) dx\n' +
        '• Both Bounds Infinite: ∫_{-∞}^∞ f(x) dx = ∫_{-∞}^c f(x) dx + ∫_c^∞ f(x) dx (must split at any finite point c; both halves MUST converge independently for the entire integral to converge!).',
    },
    {
      title: 'The p-Integral Convergence Test',
      content:
        'The baseline standard for determining convergence is the family of p-integrals ∫₁^∞ (1 / xᵖ) dx:\n\n' +
        '• If p > 1: The tail decays quickly enough that the total area under the infinite tail is finite: ∫₁^∞ (1 / xᵖ) dx = 1 / (p - 1) (CONVERGES).\n' +
        '• If p = 1: The harmonic curve 1/x decays too slowly: ∫₁^∞ (1/x) dx = lim_{R→∞} ln(R) = ∞ (DIVERGES).\n' +
        '• If p < 1: The curve decays even slower than 1/x: the integral shoots to ∞ (DIVERGES).\n\n' +
        'Conversely, near a vertical asymptote at x = 0 (Type 2 integral ∫₀¹ (1 / xᵖ) dx), the situation reverses completely: it converges if and only if p < 1!',
    },
    {
      title: 'Gabriel\'s Horn Paradox & Advanced Substitutions',
      content:
        '• Gabriel\'s Horn: Rotating the curve y = 1/x for x ≥ 1 around the x-axis produces a horn-shaped trumpet. Its volume is finite: V = π ∫₁^∞ (1/x²) dx = π · 1 = π. However, its surface area is infinite: A > 2π ∫₁^∞ (1/x) dx = ∞! This means Gabriel\'s horn can hold a finite amount of paint (π cubic units), yet its inner surface can never be fully painted by any finite amount of paint!\n\n' +
        '• Weierstrass Half-Angle Substitution: For difficult rational integrals of trigonometric functions, substituting t = tan(x/2) uses the rational identities sin(x) = 2t/(1+t²), cos(x) = (1-t²)/(1+t²), and dx = 2 dt / (1+t²), converting any trigonometric rational function into a standard polynomial fraction!',
    },
  ],
  equations: [
    {
      name: 'Type 1 Improper Integral (Infinite Upper Limit)',
      latex: '\\int_a^\\infty f(x) \\, dx = \\lim_{R \\to \\infty} \\int_a^R f(x) \\, dx = \\lim_{R \\to \\infty} \\Big[ F(R) - F(a) \\Big]',
      summary:
        'Defines the integral over an infinitely extended interval as the limiting area accumulated as the upper boundary R heads toward infinity.',
      conditions: [
        'f(x) must be continuous and integrable on [a, R] for every R > a',
        'Limit must exist as a finite real number for convergence',
      ],
      variables: [
        {
          symbol: '\\int_a^\\infty f(x) \\, dx',
          name: 'Type 1 Improper Integral',
          unit: '\\text{total area under infinite tail}',
          description: 'The net signed area trapped beneath the curve from x = a all the way to infinity.',
          connections: 'If limit exists, integral converges; otherwise it diverges.',
        },
        {
          symbol: 'R',
          name: 'Truncated Upper Boundary Parameter',
          unit: '\\text{coordinate value } R \\to \\infty',
          description: 'A finite temporary upper limit that is allowed to grow arbitrarily large.',
          connections: 'Replaces ∞ to permit standard evaluation via the Fundamental Theorem of Calculus.',
        },
        {
          symbol: 'F(R)',
          name: 'Antiderivative Evaluated at Boundary R',
          unit: '\\text{accumulated function value}',
          description: 'The primitive function F(x) evaluated at the expanding boundary R.',
          connections: 'Its asymptotic behavior as R → ∞ dictates whether the integral converges or diverges.',
        },
      ],
    },
    {
      name: 'The p-Integral Convergence Criterion',
      latex: '\\int_1^\\infty \\frac{1}{x^p} \\, dx = \\begin{cases} \\displaystyle \\frac{1}{p - 1}, & \\text{if } p > 1 \\quad (\\text{Converges}) \\\\[8pt] \\infty, & \\text{if } p \\le 1 \\quad (\\text{Diverges}) \\end{cases}',
      summary:
        'The definitive comparison benchmark in calculus: p = 1 is the razor-sharp threshold dividing finite from infinite accumulated area.',
      conditions: ['Lower limit is a strictly positive number (x ≥ 1)'],
      variables: [
        {
          symbol: 'p',
          name: 'Power Exponent',
          unit: '\\mathbb{R}',
          description: 'The power of x in the denominator determining the rate of asymptotic decay toward zero.',
          connections: 'If p > 1, decay is fast enough to squeeze the area to a finite value; if p ≤ 1, decay is too slow.',
        },
        {
          symbol: '\\frac{1}{p - 1}',
          name: 'Convergent Sum Value',
          unit: '\\text{finite area}',
          description: 'The exact closed-form total area under the infinite tail when p > 1.',
          connections: 'As p approaches 1 from above (p → 1⁺), the area 1/(p - 1) explodes toward infinity.',
        },
        {
          symbol: 'p = 1',
          name: 'Harmonic Threshold',
          unit: '\\text{critical exponent}',
          description: 'Corresponding to f(x) = 1/x; its antiderivative ln(x) grows without bound.',
          connections: 'The boundary dividing convergent p-integrals from divergent ones.',
        },
      ],
    },
    {
      name: 'Type 2 Improper Integral (Interior Vertical Singularity)',
      latex: '\\int_a^b f(x) \\, dx = \\lim_{t \\to c^-} \\int_a^t f(x) \\, dx + \\lim_{s \\to c^+} \\int_s^b f(x) \\, dx, \\quad (c \\in [a, b])',
      summary:
        'Evaluates integrals containing an interior vertical asymptote at x = c by splitting into two one-sided limit integrals.',
      conditions: [
        'f has an infinite discontinuity at x = c with c ∈ [a, b]',
        'Both limits must converge independently',
      ],
      variables: [
        {
          symbol: 'c',
          name: 'Singularity Point',
          unit: '\\text{domain coordinate}',
          description: 'The point inside [a, b] where the function shoots to ±∞ (vertical asymptote).',
          connections: 'Requires dividing the domain into [a, c) and (c, b].',
        },
        {
          symbol: 't \\to c^-',
          name: 'Left-Hand Approach Limit',
          unit: '\\text{limiting parameter}',
          description: 'Approaches the singularity c from the left side.',
          connections: 'Ensures the proper integral on [a, t] is evaluated on a bounded continuous interval.',
        },
        {
          symbol: 's \\to c^+',
          name: 'Right-Hand Approach Limit',
          unit: '\\text{limiting parameter}',
          description: 'Approaches the singularity c from the right side.',
          connections: 'Evaluates the remaining region [s, b] independently.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Manipulate the exponent slider p and drag the upper limit boundary R on the canvas to watch the area accumulation graph in real time. Switch to Gabriel\'s Horn mode to see the visual comparison between finite enclosed volume and infinite surface area.',
};

export default improperIntegralsData;
