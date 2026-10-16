import uSubstitutionData from './u-substitution.js';
import integrationByPartsData from './integration-by-parts.js';
import trigonometricIntegralsData from './trigonometric-integrals.js';
import trigonometricSubstitutionData from './trigonometric-substitution.js';
import partialFractionsData from './partial-fractions.js';
import improperIntegralsData from './improper-integrals.js';
import areaBetweenCurvesData from './area-between-curves.js';
import volumeSolidsRevolutionData from './volume-solids-revolution.js';
import arcLengthSurfaceAreaData from './arc-length-surface-area.js';

const foundationsSubPage = {
  id: 'foundations',
  title: 'Foundations & FTC',
  icon: '🏛️',
  tag: 'Riemann & FTC',
  subtitle:
    'Accumulation of quantities, Riemann sums, net area under curves, antiderivatives, and the bridge between differentiation and integration.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'Welcome to the Integral Calculus Home Page. Integral calculus solves the fundamental problem of continuous accumulation: slicing a curved region into infinitely many infinitesimal strips of width dx and summing their contributions.',
    'The crowning achievement of calculus is the Fundamental Theorem of Calculus (FTC), discovered independently by Isaac Newton and Gottfried Wilhelm Leibniz. It establishes that differentiation and integration are exact inverse operations—allowing definite integrals to be evaluated effortlessly via antiderivatives: ∫ₐᵇ f(x) dx = F(b) − F(a).',
    'Start by exploring the foundational Riemann Sum & FTC visualization and core principles on this home page, then scroll down to the Integration Sub-Topic Cards to navigate to dedicated pages for U-Substitution, Integration by Parts, Trigonometric Integrals, Trig Substitution, Partial Fractions, Improper Integrals, Area Between Curves, Volumes of Revolution, and Arc Length!',
  ],
  keyConcepts: [
    {
      title: 'Riemann Sums: Slicing and Summing to Infinity',
      content:
        'To find the exact area under y = f(x) from x = a to x = b, partition the interval into n sub-intervals of width Δx = (b - a)/n. On each strip, erect a rectangle of height f(x_i*). As n → ∞ (and Δx → 0), the sum of rectangle areas converges to the definite integral.',
      exampleLabel: 'Fundamental Riemann Limit Definition',
      latex:
        '\\text{Area} = \\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*)\\,\\Delta x = \\int_a^b f(x)\\,dx, \\qquad \\Delta x = \\frac{b - a}{n}',
    },
    {
      title: 'The Fundamental Theorem of Calculus (FTC Parts 1 & 2)',
      content:
        '• Part 1 (Derivative of an Area Function): If F(x) = ∫ₐˣ f(t) dt, then dF/dx = f(x).\n' +
        '• Part 2 (Evaluation Theorem): If F\'(x) = f(x), then ∫ₐᵇ f(x) dx = F(b) − F(a).',
      exampleLabel: 'Worked Fundamental Power-Rule Integral Calculation',
      latex:
        '\\int_1^3 \\left(3x^2 + 2x\\right) dx = \\Big[ x^3 + x^2 \\Big]_1^3 = \\left(3^3 + 3^2\\right) - \\left(1^3 + 1^2\\right) = 36 - 2 = 34',
      exampleNote:
        'Using the Reverse Power Rule ∫ xⁿ dx = xⁿ⁺¹/(n+1), we find the antiderivative F(x) = x³ + x² and evaluate F(3) − F(1).',
    },
    {
      title: 'Basic Antiderivative Rules & Net Signed Area',
      content:
        'Regions above the x-axis (f(x) > 0) contribute positive area (+), while regions below the x-axis (f(x) < 0) contribute negative area (−). Master the elementary antiderivative table before tackling advanced techniques in the sub-topic cards below.',
      exampleLabel: 'Essential Elementary Antiderivative Formulas',
      latex:
        '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C \\;(n\\ne -1), \\quad \\int \\frac{1}{x}\\,dx = \\ln|x|+C, \\quad \\int e^x\\,dx = e^x+C, \\quad \\int \\cos x\\,dx = \\sin x+C',
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
    'Select a function and adjust the partition slider n from 2 up to 60 slices. Switch between Left, Right, Midpoint, and Trapezoid sums to watch the Riemann rectangles converge onto the analytical area under the curve.',
};

const subPages = [
  foundationsSubPage,
  { ...uSubstitutionData, icon: '🔄', tag: 'Chain Rule Reverse' },
  { ...integrationByPartsData, icon: '✂️', tag: 'Product Rule & DI' },
  { ...trigonometricIntegralsData, icon: '📐', tag: 'Powers of Sin/Cos' },
  { ...trigonometricSubstitutionData, icon: '🔺', tag: 'Radicals & Triangles' },
  { ...partialFractionsData, icon: '🧩', tag: 'Rational Functions' },
  { ...improperIntegralsData, icon: '♾️', tag: 'Infinite & Singular' },
  { ...areaBetweenCurvesData, icon: '📊', tag: 'Area Between Curves' },
  { ...volumeSolidsRevolutionData, icon: '🌪️', tag: 'Volume of Solids' },
  { ...arcLengthSurfaceAreaData, icon: '📏', tag: 'Arc Length & Surface' },
];

/**
 * Math Topic: Integrals & Integration Techniques (Multi-Page Chapter Hub)
 */
const integralsData = {
  id: 'integrals',
  title: 'Integrals & Integration Techniques',
  subtitle:
    'The complete guide to integration: Riemann sums, FTC, u-substitution, integration by parts, trig integrals, trig substitution, partial fractions, improper integrals, and geometric applications.',
  level: 'Advanced',
  estimatedTime: '10 Connected Chapters (Finals Exam Series)',
  subPages,
  // Default to foundations
  overview: foundationsSubPage.overview,
  keyConcepts: foundationsSubPage.keyConcepts,
  equations: foundationsSubPage.equations,
  interactiveGuide: foundationsSubPage.interactiveGuide,
};

export default integralsData;
