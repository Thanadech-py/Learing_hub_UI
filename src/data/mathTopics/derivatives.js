/**
 * Math Topic: Derivatives & Differentiation
 */
const derivativesData = {
  id: 'derivatives',
  title: 'Derivatives & Differentiation',
  subtitle:
    'Instantaneous rates of change, slopes of tangent lines, calculus differentiation rules, and optimization.',
  level: 'Intermediate',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'Differential calculus is the mathematical study of continuous change. While an average rate of change measures the slope of a secant line between two separate points (Δy / Δx), the derivative determines the instantaneous rate of change at a single exact point.',
    'Geometrically, as the step size h between two points shrinks toward zero, the secant line pivoting through (x, f(x)) converges to the unique Tangent Line. The slope of this tangent line is the derivative f\'(x).',
    'Derivatives are the fundamental engine of physics (velocity is the derivative of position, acceleration is the derivative of velocity, force is the derivative of momentum), economics (marginal cost and revenue), and machine learning (gradient descent optimization of neural network loss functions).',
  ],
  keyConcepts: [
    {
      title: 'The Difference Quotient & Tangent Line Limit',
      content:
        'The average rate of change over an interval of width h is given by the difference quotient: [f(x + h) - f(x)] / h. This is the slope of the secant line. Taking the limit as h → 0 yields the derivative f\'(x) = dy/dx. If this limit exists, the function is differentiable at x.',
    },
    {
      title: 'Core Differentiation Rules',
      content:
        '• Power Rule: d/dx [xⁿ] = n · xⁿ⁻¹\n' +
        '• Linearity: d/dx [c·f(x) + g(x)] = c·f\'(x) + g\'(x)\n' +
        '• Product Rule: d/dx [u·v] = u\'·v + u·v\'\n' +
        '• Quotient Rule: d/dx [u/v] = (u\'·v - u·v\') / v²\n' +
        '• Chain Rule: d/dx [f(g(x))] = f\'(g(x)) · g\'(x) (essential for composite functions and backpropagation in deep learning).',
    },
    {
      title: 'Optimization: Critical Points & Fermat’s Theorem',
      content:
        'At any local maximum or minimum of a smooth curve, the tangent line becomes completely horizontal, meaning its slope is zero: f\'(x) = 0. Solving f\'(x) = 0 identifies critical points. The Second Derivative Test examines curvature: if f\'\'(x) > 0, the curve is concave up (a local minimum); if f\'\'(x) < 0, it is concave down (a local maximum).',
    },
  ],
  equations: [
    {
      name: 'Definition of Derivative as Limit of Difference Quotient',
      latex: 'f\'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}',
      summary:
        'The foundational definition converting secant slopes into the instantaneous slope of the tangent line.',
      conditions: ['Limit must exist from both left (h → 0⁻) and right (h → 0⁺)'],
      variables: [
        {
          symbol: "f'(x)",
          name: 'Derivative (Instantaneous Rate of Change)',
          unit: '\\text{units of } y / \\text{units of } x',
          description: 'The slope of the tangent line touching the curve y = f(x) at point x.',
          connections: 'If f\'(x) > 0, function is increasing; if f\'(x) < 0, decreasing; if f\'(x) = 0, stationary.',
        },
        {
          symbol: 'h',
          name: 'Horizontal Secant Step Size',
          unit: '\\Delta x',
          description: 'The horizontal separation between the two points on the secant line.',
          connections: 'Shrinks infinitesimally toward zero.',
        },
        {
          symbol: 'f(x + h) - f(x)',
          name: 'Vertical Increment (Δy)',
          unit: '\\text{units of } y',
          description: 'The change in function value over the horizontal increment h.',
          connections: 'Approaches zero proportionally with h.',
        },
      ],
    },
    {
      name: 'The Chain Rule for Composite Functions',
      latex: '\\frac{d}{dx}\\Big[f\\big(g(x)\\big)\\Big] = f\'\\big(g(x)\\big) \\cdot g\'(x) = \\frac{df}{dg} \\cdot \\frac{dg}{dx}',
      summary:
        'Calculates the rate of change of nested functions by multiplying the outer derivative by the inner derivative.',
      conditions: ['g must be differentiable at x, and f differentiable at g(x)'],
      variables: [
        {
          symbol: "f'(g(x))",
          name: 'Derivative of Outer Function',
          unit: '\\text{rate}',
          description: 'Evaluated with the inner function g(x) held as the input argument.',
          connections: 'Multiplied directly by the velocity of the inner variable.',
        },
        {
          symbol: "g'(x)",
          name: 'Derivative of Inner Function',
          unit: '\\text{rate}',
          description: 'The rate at which the inner input changes with respect to x.',
          connections: 'Acts as an internal gearing ratio scaling the overall rate of change.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Move the point x₀ along the curve. Adjust the secant interval h to observe how the secant line converges directly into the tangent line. Inspect the synchronized derivative curve plotted below.',
};

export default derivativesData;
