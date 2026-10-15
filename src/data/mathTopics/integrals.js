/**
 * Math Topic: Integrals & The Fundamental Theorem of Calculus
 */
const integralsData = {
  id: 'integrals',
  title: 'Integrals & The Fundamental Theorem of Calculus',
  subtitle:
    'Accumulation of quantities, Riemann sums, net area under curves, antiderivatives, and the bridge between differentiation and integration.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'Integral calculus solves the general problem of accumulation. While multiplication calculates area for simple flat rectangles (Area = Base × Height), real-world boundaries are curved. Integration slices a continuous region into thousands of infinitesimally thin vertical strips, computes their rectangular areas, and sums them together.',
    'The crowning glory of calculus is the Fundamental Theorem of Calculus (FTC), discovered independently by Isaac Newton and Gottfried Wilhelm Leibniz. The FTC demonstrates that differentiation and integration are exact inverse operations—unveiling an unexpected bridge between the slope of a tangent line and the area under a curve.',
    'Integrals are ubiquitous across science: accumulating velocity gives displacement, accumulating power gives energy consumed, accumulating probability density gives probabilities, and accumulating mass density gives total mass and center of gravity.',
  ],
  keyConcepts: [
    {
      title: 'Riemann Sums: Slicing and Summing to Infinity',
      content:
        'To find the exact area under y = f(x) from x = a to x = b, partition the interval into n sub-intervals of width Δx = (b - a)/n. On each strip, erect a rectangle of height f(x_i*). As n → ∞ (and Δx → 0), the sum of rectangle areas converges precisely to the definite integral: ∫_a^b f(x) dx.\n\n' +
        'Approximation methods include Left Riemann sum (height sampled at left edge), Right Riemann sum (sampled at right edge), Midpoint rule (sampled at middle), and Trapezoidal rule (averaging left and right).',
    },
    {
      title: 'The Fundamental Theorem of Calculus (FTC)',
      content:
        '• Part 1 (Derivatives undo Integrals): If F(x) = ∫_a^x f(t) dt, then F\'(x) = f(x). The rate of change of accumulated area at coordinate x is simply the height of the curve at x!\n\n' +
        '• Part 2 (Evaluation Theorem): If F(x) is any antiderivative of f(x) (meaning F\'(x) = f(x)), then the definite integral is simply the net change in the antiderivative: ∫_a^b f(x) dx = F(b) - F(a). This eliminates the tedious need to compute infinite sums by hand!',
    },
    {
      title: 'Net Signed Area: Positive vs. Negative Regions',
      content:
        'A definite integral computes net signed area: regions where the curve lies above the x-axis (f(x) > 0) contribute positive area (+), while regions beneath the x-axis (f(x) < 0) contribute negative area (-). If a function is odd (like sin x from -π to +π), the positive and negative halves cancel exactly, yielding an integral of 0.',
    },
  ],
  equations: [
    {
      name: 'Definite Integral as the Limit of a Riemann Sum',
      latex: '\\int_a^b f(x) \\, dx = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x, \\quad \\Delta x = \\frac{b - a}{n}',
      summary:
        'The rigorous definition of the definite integral as the infinite accumulation of infinitesimal rectangular strips.',
      conditions: ['Function f must be integrable (e.g. continuous or piecewise continuous) on [a, b]'],
      variables: [
        {
          symbol: '\\int_a^b f(x) \\, dx',
          name: 'Definite Integral',
          unit: '\\text{units of } x \\times \\text{units of } y',
          description: 'The net signed area trapped between the curve y = f(x) and the horizontal axis between limits a and b.',
          connections: 'Positive above the axis; negative below.',
        },
        {
          symbol: 'n',
          name: 'Number of Partition Slices',
          unit: '\\mathbb{N}',
          description: 'The number of rectangular strips approximating the region.',
          connections: 'As n → ∞, the numerical error between the Riemann sum and the exact integral approaches zero.',
        },
        {
          symbol: '\\Delta x',
          name: 'Sub-interval Width',
          unit: '\\text{units of } x',
          description: 'The base width of each approximating rectangle: (b - a)/n.',
          connections: 'Becomes the differential dx in the continuous limit.',
        },
        {
          symbol: 'f(x_i^*)',
          name: 'Sampled Function Height',
          unit: '\\text{units of } y',
          description: 'The vertical height of the i-th rectangle evaluated at sample point x_i*.',
          connections: 'Determined by left, right, or midpoint sampling rules.',
        },
      ],
    },
    {
      name: 'Fundamental Theorem of Calculus (Evaluation Theorem)',
      latex: '\\int_a^b f(x) \\, dx = F(b) - F(a) = \\Big[ F(x) \\Big]_a^b \\quad \\text{where } F\'(x) = f(x)',
      summary:
        'Bridges differential and integral calculus by expressing area under a curve as the net change in its antiderivative.',
      conditions: ['f is continuous on [a, b]', 'F is any antiderivative satisfying dF/dx = f(x)'],
      variables: [
        {
          symbol: 'F(x)',
          name: 'Antiderivative Function',
          unit: '\\text{accumulated function}',
          description: 'A primitive function whose derivative reproduces f(x).',
          connections: 'Known up to an arbitrary constant of integration C: ∫ f(x) dx = F(x) + C.',
        },
        {
          symbol: 'b, a',
          name: 'Upper and Lower Limits of Integration',
          unit: '\\text{domain values}',
          description: 'The rightward boundary b and leftward boundary a defining the domain interval.',
          connections: 'Reversing limits negates the integral: ∫_b^a f(x) dx = - ∫_a^b f(x) dx.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Select a function and adjust the partition slider n from 2 up to 100 slices. Switch between Left, Right, Midpoint, and Trapezoid sums to watch the Riemann rectangles converge onto the analytical area under the curve.',
};

export default integralsData;
