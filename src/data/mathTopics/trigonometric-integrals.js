/**
 * Math Topic: Trigonometric Integrals & Identity Reductions
 */
const trigonometricIntegralsData = {
  id: 'trigonometric-integrals',
  title: 'Trigonometric Integrals & Identity Reductions',
  subtitle:
    'Products of powers of sine and cosine, secant and tangent combinations, half-angle reductions, and product-to-sum identities.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'Trigonometric integrals involve integrands built from products and powers of trigonometric functions, such as ∫ sinᵐ(x) cosⁿ(x) dx and ∫ tanᵐ(x) secⁿ(x) dx. These integrals appear repeatedly throughout physics and engineering, including Fourier series, wave packets, orbital mechanics, and electromagnetism.',
    'The strategy for solving trigonometric integrals relies on systematically leveraging trigonometric identities (such as sin² x + cos² x = 1 and sec² x = 1 + tan² x) to isolate a single differential factor (like cos x dx, sin x dx, or sec² x dx), converting the rest of the integrand into a polynomial in u.',
    'When all exponents are even, substitution alone fails, requiring half-angle reduction identities to lower the exponents while doubling the frequency: sin² x = (1 - cos 2x)/2 and cos² x = (1 + cos 2x)/2.',
  ],
  keyConcepts: [
    {
      title: 'Products of Sine and Cosine: ∫ sinᵐ(x) cosⁿ(x) dx',
      content:
        'The method depends strictly on whether the powers m and n are odd or even:\n\n' +
        '• Case 1: Power of Cosine is Odd (n = 2k + 1): Save one factor of cos(x) for the differential (cos x dx), convert the remaining even power cos²ᵏ(x) into (1 - sin² x)ᵏ, and let u = sin(x), du = cos(x) dx. The integral becomes a clean polynomial in u: ∫ sinᵐ(x) (1 - sin² x)ᵏ cos(x) dx = ∫ uᵐ (1 - u²)ᵏ du.\n\n' +
        '• Case 2: Power of Sine is Odd (m = 2k + 1): Save one factor of sin(x) for the differential (-sin x dx), convert sin²ᵏ(x) into (1 - cos² x)ᵏ, and let u = cos(x), du = -sin(x) dx.\n\n' +
        '• Case 3: Both Powers are Even (m and n both even): Neither factor can be isolated. You must repeatedly apply the Half-Angle Formulas to halve the powers: sin² x = (1 - cos 2x)/2 and cos² x = (1 + cos 2x)/2.',
    },
    {
      title: 'Products of Tangent and Secant: ∫ tanᵐ(x) secⁿ(x) dx',
      content:
        'Because d/dx [tan x] = sec² x and d/dx [sec x] = sec x tan x, two primary substitutions apply:\n\n' +
        '• Power of Secant is Even (n = 2k): Save a factor of sec²(x) dx, convert sec^(2k-2)(x) into (1 + tan² x)^(k-1), and substitute u = tan(x), du = sec²(x) dx.\n\n' +
        '• Power of Tangent is Odd (m = 2k + 1): Save a factor of sec(x) tan(x) dx, convert tan^(2k)(x) into (sec² x - 1)ᵏ, and substitute u = sec(x), du = sec(x) tan(x) dx.\n\n' +
        '• Tangent Even & Secant Odd: Use integration by parts or reduction formulas (e.g. ∫ sec³(x) dx = (1/2)(sec x tan x + ln|sec x + tan x|) + C).',
    },
    {
      title: 'Product-to-Sum Formulas for Differing Frequencies',
      content:
        'When integrating products of sinusoidal waves with different angular frequencies a and b, use the prosthaphaeresis (product-to-sum) identities:\n' +
        '• sin(ax) cos(bx) = (1/2) [ sin((a + b)x) + sin((a - b)x) ]\n' +
        '• cos(ax) cos(bx) = (1/2) [ cos((a + b)x) + cos((a - b)x) ]\n' +
        '• sin(ax) sin(bx) = (1/2) [ cos((a - b)x) - cos((a + b)x) ]\n\n' +
        'This proves the orthogonality of trigonometric basis functions in Fourier analysis: over interval [-π, π], the integral of sin(mx) cos(nx) or sin(mx) sin(nx) is zero whenever m ≠ n!',
    },
  ],
  equations: [
    {
      name: 'Odd-Power Cosine Reduction (u = sin x Substitution)',
      latex: '\\int \\sin^m(x) \\cos^{2k+1}(x) \\, dx = \\int u^m \\big(1 - u^2\\big)^k \\, du, \\quad \\text{where } u = \\sin(x), \\, du = \\cos(x) \\, dx',
      summary:
        'Converts an integral with an odd power of cosine into a standard polynomial integral by saving one cosine factor for du and converting the rest to sine.',
      conditions: [
        'Exponent of cosine must be an odd positive integer (n = 2k + 1, k ≥ 0)',
        'm is any real exponent',
      ],
      variables: [
        {
          symbol: 'u = \\sin(x)',
          name: 'Sine Substitution Variable',
          unit: '\\text{trigonometric ratio } [-1, 1]',
          description: 'The selected variable replacing every instance of sin(x).',
          connections: 'Its differential du = cos(x) dx absorbs the isolated odd cosine factor.',
        },
        {
          symbol: 'm',
          name: 'Exponent of Sine',
          unit: '\\text{integer or real power}',
          description: 'The initial power of sin(x) in the integrand.',
          connections: 'Becomes the base exponent of u in the transformed polynomial uᵐ.',
        },
        {
          symbol: '2k + 1',
          name: 'Odd Exponent of Cosine',
          unit: '\\text{odd positive integer}',
          description: 'The power of cos(x). Leaving one cos(x) for du leaves an even power 2k.',
          connections: 'The remaining cos²ᵏ(x) converts directly to (1 - u²)ᵏ via Pythagorean identity.',
        },
        {
          symbol: '1 - u^2',
          name: 'Pythagorean Cosine Equivalent',
          unit: '\\cos^2(x)',
          description: 'Derived from sin²(x) + cos²(x) = 1, so cos²(x) = 1 - sin²(x) = 1 - u².',
          connections: 'Raised to the k-th power to eliminate all trigonometric functions from the integrand.',
        },
      ],
    },
    {
      name: 'Half-Angle Reduction Formulas (Pure Even Powers)',
      latex: '\\sin^2(x) = \\frac{1 - \\cos(2x)}{2}, \\quad \\cos^2(x) = \\frac{1 + \\cos(2x)}{2}, \\quad \\sin(x)\\cos(x) = \\frac{\\sin(2x)}{2}',
      summary:
        'Halves the exponent of squared trigonometric terms while doubling the internal angular frequency from x to 2x.',
      conditions: [
        'Used when all trigonometric powers in the integrand are even positive integers',
      ],
      variables: [
        {
          symbol: '\\sin^2(x), \\cos^2(x)',
          name: 'Squared Trigonometric Terms',
          unit: '\\text{trigonometric powers}',
          description: 'Even powers that cannot be resolved by standard u-substitution because no single differential factor remains.',
          connections: 'Replaced by linear first-order cosine expressions of doubled argument 2x.',
        },
        {
          symbol: '2x',
          name: 'Doubled Angular Argument',
          unit: '\\text{radians}',
          description: 'The doubled frequency inside the argument of the reduced trigonometric function.',
          connections: 'Integrates easily using the linear shortcut: ∫ cos(2x) dx = (1/2) sin(2x).',
        },
        {
          symbol: '\\frac{1}{2}',
          name: 'Average Constant Value',
          unit: '\\text{scalar}',
          description: 'The mean vertical offset of sin²(x) and cos²(x), which oscillates between 0 and 1.',
          connections: 'Integrates to (1/2)x over any interval.',
        },
      ],
    },
    {
      name: 'Even-Power Secant Reduction (u = tan x Substitution)',
      latex: '\\int \\tan^m(x) \\sec^{2k}(x) \\, dx = \\int u^m \\big(1 + u^2\\big)^{k-1} \\, du, \\quad \\text{where } u = \\tan(x), \\, du = \\sec^2(x) \\, dx',
      summary:
        'Converts integrals with an even power of secant into a standard polynomial in u by isolating sec²(x) dx.',
      conditions: [
        'Exponent of secant must be an even positive integer (n = 2k, k ≥ 1)',
        'x must not be an odd multiple of π/2 where tan(x) is undefined',
      ],
      variables: [
        {
          symbol: 'u = \\tan(x)',
          name: 'Tangent Substitution Variable',
          unit: '\\text{trigonometric ratio}',
          description: 'The substitute variable u = tan(x) whose derivative is du = sec²(x) dx.',
          connections: 'Replaces tan(x) to yield polynomial term uᵐ.',
        },
        {
          symbol: '2k',
          name: 'Even Exponent of Secant',
          unit: '\\text{even integer}',
          description: 'The power of sec(x). Isolating sec²(x) for du leaves sec^(2k-2)(x).',
          connections: 'Converted via sec²(x) = 1 + tan²(x) = 1 + u².',
        },
        {
          symbol: '1 + u^2',
          name: 'Secant-Tangent Identity Equivalent',
          unit: '\\sec^2(x)',
          description: 'Derived from 1 + tan²(x) = sec²(x).',
          connections: 'Raised to the (k - 1) power, yielding a polynomial in u.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Adjust the power sliders m (for sine/tan) and n (for cosine/sec) to see the branching logic activate in real time. The canvas graphs the integrand f(x), displays the step-by-step identity expansion, and shows the shaded definite area under the curve.',
};

export default trigonometricIntegralsData;
