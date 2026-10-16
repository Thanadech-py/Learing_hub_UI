/**
 * Math Topic: Integration by Parts & Tabular Method
 */
const integrationByPartsData = {
  id: 'integration-by-parts',
  title: 'Integration by Parts & Tabular Method',
  subtitle:
    'Product rule reversal, geometric area decomposition, LIATE priority selection, and the tabular DI method for polynomial products.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'Integration by Parts (IBP) is the integral calculus analogue of the Product Rule of differentiation. Just as the product rule evaluates the derivative of a product of two functions d/dx [u(x)v(x)] = u\'(x)v(x) + u(x)v\'(x), integration by parts transforms an integral of a product into a simpler integral: ∫ u dv = uv - ∫ v du.',
    'Geometrically, integration by parts is an elegant subtraction of complementary areas within a bounding rectangle of dimensions u × v. The term [u(x)v(x)]_a^b represents the total corner rectangle area, from which the complementary vertical area ∫ v du is subtracted to yield the desired horizontal area ∫ u dv.',
    'Integration by parts is essential for integrating products of disparate function families (such as polynomials times exponentials, logarithms, or trigonometric functions), as well as integrating standalone inverse functions such as ∫ ln(x) dx and ∫ arctan(x) dx.',
  ],
  keyConcepts: [
    {
      title: 'The LIATE Rule for Selecting u and dv',
      content:
        'Success with integration by parts depends on choosing u to be a function that simplifies when differentiated, and dv to be a function that is easily integrated without becoming more complicated. The time-tested priority order for choosing u is LIATE:\n\n' +
        '1. L — Logarithmic functions (e.g. ln x, log₂ x)\n' +
        '2. I — Inverse trigonometric functions (e.g. arctan x, arcsin x)\n' +
        '3. A — Algebraic / Polynomial functions (e.g. x², 3x + 1, x^(1/2))\n' +
        '4. T — Trigonometric functions (e.g. sin x, cos x, sec² x)\n' +
        '5. E — Exponential functions (e.g. e^x, 2^x)\n\n' +
        'Whichever function appears higher on the LIATE list is chosen as u; the remaining factor (along with dx) becomes dv.',
    },
    {
      title: 'The Tabular Method (DI Method)',
      content:
        'When evaluating integrals of the form ∫ P(x) g(x) dx, where P(x) is a polynomial that differentiates to zero after several steps and g(x) can be integrated repeatedly (such as e^(ax), sin(ax), or cos(ax)), repeated manual IBP is tedious and prone to sign errors.\n\n' +
        'The Tabular (DI) Method organizes this into two parallel columns:\n' +
        '• D Column: Repeatedly differentiate P(x) until reaching 0.\n' +
        '• I Column: Repeatedly integrate g(x) the same number of times.\n' +
        '• Signs: Assign alternating signs (+, -, +, -, ...) along diagonal products.\n\n' +
        'Summing the diagonal products P^(k)(x) · G_(k+1)(x) with their alternating signs gives the exact antiderivative in seconds!',
    },
    {
      title: 'Cyclic (Recursive) Integration by Parts',
      content:
        'For products of trigonometric and exponential functions like ∫ e^x cos(x) dx, neither factor ever differentiates to zero. Instead, applying integration by parts twice causes the original integral to reappear on the right-hand side with a minus sign:\n' +
        'I = e^x sin(x) + e^x cos(x) - I.\n\n' +
        'Adding I to both sides yields 2I = e^x (sin x + cos x), giving I = (1/2) e^x (sin x + cos x) + C. This algebraic loop technique resolves many integrals in physics, including damped oscillators and Fourier transforms.',
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
    'Explore the interactive Tabular DI stepper to see how polynomial terms differentiate to zero while trigonometric and exponential terms integrate. Toggle the Geometric Area Mode to visualize the bounding rectangle [uv] and how ∫ u dv + ∫ v du fit together seamlessly.',
};

export default integrationByPartsData;
