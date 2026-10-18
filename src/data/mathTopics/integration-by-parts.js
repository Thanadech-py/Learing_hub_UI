/**
 * Math Topic: Integration by Parts & Tabular Method
 */
const integrationByPartsData = {
  id: 'integration-by-parts',
  title: 'Integration by Parts & Tabular Method',
  subtitle:
    'Product rule reversal, geometric area decomposition, LIATE priority selection, the tabular DI method, and cyclic exponential-trigonometric integrals (cos, sin, tan).',
  level: 'Advanced',
  estimatedTime: '32 min read + interactive lab',
  overview: [
    'Integration by Parts (IBP) is the integral calculus analogue of the Product Rule of differentiation. Just as the product rule evaluates the derivative of a product of two functions d/dx [u(x)v(x)] = u\'(x)v(x) + u(x)v\'(x), integration by parts transforms an integral of a product into a simpler integral: ∫ u dv = uv - ∫ v du.',
    'Geometrically, integration by parts is an elegant subtraction of complementary areas within a bounding rectangle of dimensions u × v. The term [u(x)v(x)]_a^b represents the total corner rectangle area, from which the complementary vertical area ∫ v du is subtracted to yield the desired horizontal area ∫ u dv.',
    'Integration by parts is essential for integrating products of disparate function families (such as polynomials times exponentials, logarithms, or trigonometric functions), standalone inverse functions (∫ ln(x) dx, ∫ arctan(x) dx), and cyclic exponential-trigonometric products such as I = ∫ e^(ax) cos(bx) dx, ∫ e^(ax) sin(bx) dx, and exponential-tangent combinations.',
  ],
  keyConcepts: [
    {
      title: 'The LIATE Rule for Selecting u and dv',
      content:
        'Success with integration by parts depends on choosing u to be a function that simplifies when differentiated, and dv to be a function that is easily integrated without becoming more complicated. The time-tested priority order for choosing u is LIATE:\n\n' +
        '1. L — Logarithmic functions (e.g. ln x, log₂ x)\n' +
        '2. I — Inverse trigonometric functions (e.g. arctan x, arcsin x)\n' +
        '3. A — Algebraic / Polynomial functions (e.g. x², 3x + 1, x^(1/2))\n' +
        '4. T — Trigonometric functions (e.g. sin x, cos x, tan x, sec² x)\n' +
        '5. E — Exponential functions (e.g. e^(ax), 2^x)\n\n' +
        'Whichever function appears higher on the LIATE list is chosen as u; the remaining factor (along with dx) becomes dv.',
      exampleLabel: 'Standard LIATE Selection Example',
      latex:
        '\\int x e^{2x}\\,dx \\implies u = x \\text{ (Algebraic)}, \\quad dv = e^{2x}\\,dx \\text{ (Exponential)}',
      exampleNote:
        'Differentiating u = x gives du = dx, eliminating the polynomial factor in a single step.',
    },
    {
      title: 'The Tabular Method (DI Method)',
      content:
        'When evaluating integrals of the form ∫ P(x) g(x) dx, where P(x) is a polynomial that differentiates to zero after several steps and g(x) can be integrated repeatedly (such as e^(ax), sin(bx), or cos(bx)), repeated manual IBP is tedious and prone to sign errors.\n\n' +
        'The Tabular (DI) Method organizes this into two parallel columns:\n' +
        '• D Column: Repeatedly differentiate P(x) until reaching 0.\n' +
        '• I Column: Repeatedly integrate g(x) the same number of times.\n' +
        '• Signs: Assign alternating signs (+, -, +, -, ...) along diagonal products.\n\n' +
        'Summing the diagonal products P^(k)(x) · G_(k+1)(x) with their alternating signs gives the exact antiderivative in seconds!',
      exampleLabel: 'Tabular Diagonal Expansion',
      latex:
        '\\int x^2 e^x\\,dx = (+1)(x^2)(e^x) + (-1)(2x)(e^x) + (+1)(2)(e^x) + C = e^x(x^2 - 2x + 2) + C',
      exampleNote:
        'Each diagonal arrow multiplies the k-th derivative in column D by the (k+1)-th antiderivative in column I.',
    },
    {
      title: 'Cyclic (Recursive) IBP: Exponential × Cosine & Sine (e^(ax) cos(bx) and e^(ax) sin(bx))',
      content:
        'For products of exponential and trigonometric functions I = ∫ e^(ax) cos(bx) dx or I = ∫ e^(ax) sin(bx) dx, neither factor ever differentiates to zero. Instead, applying Integration by Parts twice (keeping the same family choice for u in both passes) causes the original integral I to reappear on the right-hand side with coefficient -(b²/a²):\n\n' +
        '• Pass 1: Let u = cos(bx), dv = e^(ax) dx  ⇒  du = -b sin(bx) dx, v = (1/a)e^(ax)\n' +
        '  I = (1/a)e^(ax) cos(bx) + (b/a) ∫ e^(ax) sin(bx) dx\n' +
        '• Pass 2: Let U = sin(bx), dV = e^(ax) dx  ⇒  dU = b cos(bx) dx, V = (1/a)e^(ax)\n' +
        '  I = (1/a)e^(ax) cos(bx) + (b/a) [ (1/a)e^(ax) sin(bx) - (b/a) I ]\n\n' +
        'Rearranging (1 + b²/a²) I = ((a² + b²)/a²) I on the left side and multiplying by a²/(a² + b²) yields the universal closed-form formulas for both cos(bx) and sin(bx)!',
      exampleLabel: 'Closed-Form Exponential × Trig Identities',
      latex:
        '\\begin{aligned} \\int e^{ax}\\cos(bx)\\,dx &= \\frac{e^{ax}}{a^2 + b^2}\\Big(a\\cos(bx) + b\\sin(bx)\\Big) + C \\\\[6pt] \\int e^{ax}\\sin(bx)\\,dx &= \\frac{e^{ax}}{a^2 + b^2}\\Big(a\\sin(bx) - b\\cos(bx)\\Big) + C \\end{aligned}',
      exampleNote:
        'Notice the denominator is always (a² + b²), matching the squared magnitude of the complex frequency (a ± ib).',
    },
    {
      title: 'Exponential × Tangent Integrals: ∫ e^(ax) tan(bx) dx & Coupled Secant-Squared Forms',
      content:
        'When an exponential multiplies tangent, applying Integration by Parts with u = tan(bx) and dv = e^(ax) dx yields du = b sec²(bx) dx = b(1 + tan²(bx)) dx and v = (1/a)e^(ax):\n\n' +
        '• Reduction Relation: ∫ e^(ax) tan(bx) dx = (1/a)e^(ax) tan(bx) - (b/a) ∫ e^(ax) sec²(bx) dx.\n' +
        '• Why pure ∫ e^(ax) tan(bx) dx is non-elementary: Unlike sin(bx) and cos(bx) which cycle back to themselves after 2 derivatives, differentiating tan(bx) produces b sec²(bx) = b(1 + tan²(bx)), increasing the power of tan(bx) at each step.\n' +
        '• The Cancellation Identity: In calculus exams, exponential-tangent integrals frequently appear in the coupled form ∫ e^(ax) [a tan(bx) + b sec²(bx)] dx. Applying IBP ONLY to the first term ∫ a e^(ax) tan(bx) dx produces e^(ax) tan(bx) - ∫ b e^(ax) sec²(bx) dx, which cancels the second integral completely!',
      exampleLabel: 'Exponential-Tangent IBP & Cancellation Formula',
      latex:
        '\\int e^{ax}\\Big(a\\tan(bx) + b\\sec^2(bx)\\Big)\\,dx = e^{ax}\\tan(bx) - \\int b e^{ax}\\sec^2(bx)\\,dx + \\int b e^{ax}\\sec^2(bx)\\,dx = e^{ax}\\tan(bx) + C',
      exampleNote:
        'For the special case a = 1, b = 1: ∫ e^x (tan x + sec² x) dx = e^x tan(x) + C.',
    },
  ],
  equations: [
    {
      name: 'Fundamental Integration by Parts Formula',
      latex: '\\int u \\, dv = u v - \\int v \\, du',
      summary:
        'Converts the difficult integral ∫ u dv into the integrated boundary term uv minus the complementary integral ∫ v du.',
      conditions: [
        'u(x) and v(x) must be continuously differentiable functions on the domain interval',
      ],
      variables: [
        {
          symbol: 'u = u(x)',
          name: 'First Factor (Differentiated Part)',
          unit: '\\text{function}',
          description: 'The selected part of the integrand to be differentiated (typically chosen via LIATE).',
          connections: 'Differentiates to du = u\'(x) dx; should become simpler upon differentiation.',
        },
        {
          symbol: 'dv = v\'(x) \\, dx',
          name: 'Differential Factor (Integrated Part)',
          unit: '\\text{differential element}',
          description: 'The remaining portion of the integrand (including dx) that must be integrated to obtain v.',
          connections: 'Integrated to yield v(x) = ∫ dv; must have an accessible elementary antiderivative.',
        },
        {
          symbol: 'v = v(x)',
          name: 'Antiderivative of dv',
          unit: '\\text{function}',
          description: 'The integrated primitive function satisfying dv = v\'(x) dx.',
          connections: 'Multiplied by u in the boundary term uv, and appears inside the complementary integral ∫ v du.',
        },
        {
          symbol: 'du = u\'(x) \\, dx',
          name: 'Differential of u',
          unit: '\\text{differential element}',
          description: 'The infinitesimal derivative of u multiplied by dx.',
          connections: 'Pairs with v inside the newly generated integral ∫ v du.',
        },
      ],
    },
    {
      name: 'Exponential-Cosine Formula: I = ∫ e^(ax) cos(bx) dx',
      latex: 'I = \\int e^{ax} \\cos(bx) \\, dx = \\frac{e^{ax}}{a^2 + b^2} \\Big( a \\cos(bx) + b \\sin(bx) \\Big) + C',
      summary:
        'Closed-form analytical formula for the integral of an exponential function e^(ax) multiplied by cos(bx), derived via two cyclic applications of Integration by Parts.',
      exampleDescription: 'Worked Example: Evaluate I = ∫ e^(2x) cos(3x) dx (a = 2, b = 3)',
      exampleLatex:
        '\\begin{aligned} I &= \\int e^{2x}\\cos(3x)\\,dx \\quad (a = 2,\\; b = 3,\\; a^2 + b^2 = 4 + 9 = 13) \\\\[4pt] &= \\frac{e^{2x}}{2^2 + 3^2}\\Big(2\\cos(3x) + 3\\sin(3x)\\Big) + C = \\frac{e^{2x}}{13}\\Big(2\\cos(3x) + 3\\sin(3x)\\Big) + C \\end{aligned}',
      conditions: [
        'a, b ∈ ℝ with a² + b² ≠ 0',
        'Derived by applying IBP twice and solving (1 + b²/a²)I for I',
      ],
      variables: [
        {
          symbol: 'a',
          name: 'Exponential Rate Constant',
          unit: '\\text{rate } (\\text{x}^{-1})',
          description: 'The coefficient multiplying x in the exponent of e^(ax).',
          connections: 'Appears as the coefficient of cos(bx) in the numerator and squared in the denominator (a² + b²).',
        },
        {
          symbol: 'b',
          name: 'Trigonometric Angular Frequency',
          unit: '\\text{rad per unit } x',
          description: 'The angular frequency multiplying x inside cos(bx).',
          connections: 'Appears as the positive coefficient +b sin(bx) in the numerator and squared in (a² + b²).',
        },
        {
          symbol: 'a^2 + b^2',
          name: 'Characteristic Scaling Denominator',
          unit: '\\text{scalar constant}',
          description: 'The sum of squares of the exponential rate a and angular frequency b.',
          connections: 'Arises algebraically from combining I + (b²/a²)I = ((a² + b²)/a²)I during the second IBP pass.',
        },
        {
          symbol: 'e^{ax}',
          name: 'Exponential Envelope Factor',
          unit: '\\text{function}',
          description: 'The common exponential factor preserved across both differentiation and integration.',
          connections: 'Factors cleanly out of both the a cos(bx) and b sin(bx) terms.',
        },
      ],
    },
    {
      name: 'Exponential-Sine Formula: I = ∫ e^(ax) sin(bx) dx',
      latex: 'I = \\int e^{ax} \\sin(bx) \\, dx = \\frac{e^{ax}}{a^2 + b^2} \\Big( a \\sin(bx) - b \\cos(bx) \\Big) + C',
      summary:
        'Closed-form analytical formula for the integral of an exponential function e^(ax) multiplied by sin(bx), derived via two cyclic applications of Integration by Parts.',
      exampleDescription: 'Worked Example: Evaluate I = ∫ e^(3x) sin(4x) dx (a = 3, b = 4)',
      exampleLatex:
        '\\begin{aligned} I &= \\int e^{3x}\\sin(4x)\\,dx \\quad (a = 3,\\; b = 4,\\; a^2 + b^2 = 9 + 16 = 25) \\\\[4pt] &= \\frac{e^{3x}}{3^2 + 4^2}\\Big(3\\sin(4x) - 4\\cos(4x)\\Big) + C = \\frac{e^{3x}}{25}\\Big(3\\sin(4x) - 4\\cos(4x)\\Big) + C \\end{aligned}',
      conditions: [
        'a, b ∈ ℝ with a² + b² ≠ 0',
        'Note the minus sign (-b cos(bx)) since ∫ sin(bx) dx = -(1/b) cos(bx)',
      ],
      variables: [
        {
          symbol: 'a',
          name: 'Exponential Rate Constant',
          unit: '\\text{rate } (\\text{x}^{-1})',
          description: 'The coefficient multiplying x in the exponent of e^(ax).',
          connections: 'Multiplies the in-phase term a sin(bx) in the numerator.',
        },
        {
          symbol: 'b',
          name: 'Trigonometric Angular Frequency',
          unit: '\\text{rad per unit } x',
          description: 'The angular frequency multiplying x inside sin(bx).',
          connections: 'Multiplies the quadrature term -b cos(bx) with a negative sign.',
        },
        {
          symbol: 'a \\sin(bx) - b \\cos(bx)',
          name: 'Phase-Shifted Harmonic Combination',
          unit: '\\text{oscillatory factor}',
          description: 'Linear combination of sine and cosine resulting from two successive IBP passes.',
          connections: 'Differentiating this factor and adding a times itself cancels the cosine terms to recover (a² + b²) sin(bx).',
        },
      ],
    },
    {
      name: 'Exponential-Tangent IBP Reduction & Coupled Secant-Squared Formula',
      latex: '\\int e^{ax}\\tan(bx)\\,dx = \\frac{e^{ax}\\tan(bx)}{a} - \\frac{b}{a}\\int e^{ax}\\sec^2(bx)\\,dx \\;\\;\\Longleftrightarrow\\;\\; \\int e^{ax}\\Big(a\\tan(bx) + b\\sec^2(bx)\\Big)\\,dx = e^{ax}\\tan(bx) + C',
      summary:
        'Connects the integral of e^(ax) tan(bx) with e^(ax) sec²(bx) via Integration by Parts, yielding an exact cancellation whenever both terms appear together.',
      exampleDescription: 'Worked Example: Evaluate ∫ e^(2x) (2 tan(3x) + 3 sec²(3x)) dx',
      exampleLatex:
        '\\begin{aligned} \\int e^{2x}\\Big(2\\tan(3x) + 3\\sec^2(3x)\\Big)\\,dx &= \\underbrace{\\Big[e^{2x}\\tan(3x) - \\int 3e^{2x}\\sec^2(3x)\\,dx\\Big]}_{\\text{IBP on } \\int 2e^{2x}\\tan(3x)\\,dx} + \\int 3e^{2x}\\sec^2(3x)\\,dx \\\\[4pt] &= e^{2x}\\tan(3x) + C \\end{aligned}',
      conditions: [
        'bx ≠ (π/2) + kπ (domain where tan(bx) and sec(bx) are continuous)',
        'Uses d/dx [tan(bx)] = b sec²(bx) = b(1 + tan²(bx))',
      ],
      variables: [
        {
          symbol: '\\tan(bx)',
          name: 'Tangent Factor (Chosen as u)',
          unit: '\\text{trig ratio}',
          description: 'Selected as u = tan(bx) during Integration by Parts so du = b sec²(bx) dx.',
          connections: 'Pairs with dv = e^(ax) dx (so v = (1/a)e^(ax)) to form the boundary product (1/a)e^(ax) tan(bx).',
        },
        {
          symbol: '\\sec^2(bx)',
          name: 'Secant-Squared Derivative Factor',
          unit: '\\text{trig derivative}',
          description: 'Generated when differentiating u = tan(bx): du = b sec²(bx) dx = b(1 + tan²(bx)) dx.',
          connections: 'Cancels an opposite +b e^(ax) sec²(bx) term in coupled product integrals.',
        },
      ],
    },
    {
      name: 'Definite Integration by Parts with Boundary Evaluation',
      latex: '\\int_a^b u(x) \\, v\'(x) \\, dx = \\Big[ u(x) v(x) \\Big]_a^b - \\int_a^b v(x) \\, u\'(x) \\, dx = \\Big(u(b)v(b) - u(a)v(a)\\Big) - \\int_a^b v(x) \\, u\'(x) \\, dx',
      summary:
        'Evaluates definite integrals over boundary interval [a, b], where the corner rectangle difference u(b)v(b) - u(a)v(a) is evaluated at limits.',
      conditions: [
        "u' and v' must be continuous on the closed bounded interval [a, b]",
      ],
      variables: [
        {
          symbol: 'a, b',
          name: 'Integration Limits',
          unit: '\\text{domain values}',
          description: 'The lower bound a and upper bound b defining the interval of integration.',
          connections: 'Used to evaluate the boundary term [u(x)v(x)]_a^b = u(b)v(b) - u(a)v(a).',
        },
        {
          symbol: '\\Big[ u(x) v(x) \\Big]_a^b',
          name: 'Boundary Evaluation Term',
          unit: '\\text{scalar area difference}',
          description: 'The net difference of the product u · v evaluated at the endpoints: u(b)v(b) - u(a)v(a).',
          connections: 'Represents the corner area difference of the bounding rectangle in the u-v plane.',
        },
        {
          symbol: '\\int_a^b v(x) u\'(x) \\, dx',
          name: 'Complementary Definite Integral',
          unit: '\\text{area units}',
          description: 'The remaining definite integral over the exact same limits [a, b].',
          connections: 'Subtracted from the boundary term to obtain the original integral value.',
        },
      ],
    },
    {
      name: 'Tabular (DI) Polynomial-Product Summation Formula',
      latex: '\\int P(x) \\, g(x) \\, dx = \\sum_{k=0}^n (-1)^k P^{(k)}(x) \\, G_{k+1}(x) + C, \\quad G_{k+1}(x) = \\int G_k(x) \\, dx',
      summary:
        'A closed-form compact summation of the Tabular DI method for integrating any polynomial P(x) of degree n multiplied by an infinitely integrable function g(x).',
      conditions: [
        'P(x) is a polynomial of finite degree n (so P^(n+1)(x) = 0)',
        'g(x) is indefinitely integrable (e.g. e^(ax), sin(ax), cos(ax))',
      ],
      variables: [
        {
          symbol: 'P^{(k)}(x)',
          name: 'k-th Derivative of Polynomial',
          unit: '\\text{polynomial function}',
          description: 'The k-th successive derivative of the polynomial P(x) down the D-column.',
          connections: 'Terminates completely at zero when k exceeds the polynomial degree n: P^(n+1)(x) = 0.',
        },
        {
          symbol: 'G_{k+1}(x)',
          name: '(k+1)-th Antiderivative of g(x)',
          unit: '\\text{function}',
          description: 'The result of integrating the function g(x) repeatedly (k + 1) times down the I-column.',
          connections: 'Multiplied by P^(k)(x) along the k-th diagonal row.',
        },
        {
          symbol: '(-1)^k',
          name: 'Alternating Sign Factor',
          unit: '\\pm 1',
          description: 'Alternates between +1 (for even k) and -1 (for odd k).',
          connections: 'Encodes the cascading minus signs produced by successive iterations of ∫ u dv = uv - ∫ v du.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Explore the interactive Tabular DI stepper, Geometric Area Mode, and Cyclic Exponential-Trigonometric Lab (∫ e^(ax) cos(bx) dx, ∫ e^(ax) sin(bx) dx, and tan/sec² forms) to see how parameters a and b shape both the integrand and its exact antiderivative.',
};

export default integrationByPartsData;
