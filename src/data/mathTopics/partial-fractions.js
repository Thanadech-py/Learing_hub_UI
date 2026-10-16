/**
 * Math Topic: Partial Fraction Decomposition & Rational Functions
 */
const partialFractionsData = {
  id: 'partial-fractions',
  title: 'Partial Fraction Decomposition & Rational Functions',
  subtitle:
    'Integrating rational functions via polynomial long division, algebraic factor decomposition, and the Heaviside cover-up method.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'A rational function is the ratio of two polynomials f(x) = P(x) / Q(x). While differentiating any rational function is straightforward using the quotient rule, integrating it directly can appear impossible. Partial Fraction Decomposition is an algebraic technique that reverses addition of fractions, breaking a complex fraction into a sum of simple elementary fractions whose antiderivatives are standard logarithms, inverse tangents, or power functions.',
    'By the Fundamental Theorem of Algebra, any real polynomial Q(x) can be factored completely into a product of linear factors (x - r) and irreducible quadratic factors (x² + bx + c) with real coefficients. Partial fraction decomposition provides a systematic recipe that guarantees any proper rational function can be integrated in elementary closed form.',
    'Partial fractions are central to Laplace transforms, transfer functions in electrical engineering, linear time-invariant differential equations, and control theory.',
  ],
  keyConcepts: [
    {
      title: 'Preliminary Step: Degree Check & Polynomial Long Division',
      content:
        'Before decomposing P(x) / Q(x), examine the polynomial degrees deg(P) and deg(Q):\n\n' +
        '• If deg(P) ≥ deg(Q) (an Improper Rational Function): You MUST perform polynomial long division first to write P(x) / Q(x) = S(x) + R(x) / Q(x), where S(x) is a polynomial quotient and R(x) is the remainder satisfying deg(R) < deg(Q).\n\n' +
        '• If deg(P) < deg(Q) (a Proper Rational Function): Proceed directly to partial fraction decomposition.',
    },
    {
      title: 'The Four Factoring Cases & Decomposition Rules',
      content:
        '1. Distinct Linear Factors: For every non-repeated linear factor (x - r) in Q(x), add a term of the form A / (x - r). Each integrates to A ln|x - r|.\n\n' +
        '2. Repeated Linear Factors: For every repeated linear factor (x - r)ᵏ, add k terms: A₁/(x - r) + A₂/(x - r)² + ... + Aₖ/(x - r)ᵏ. Terms with powers ≥ 2 integrate via the power rule.\n\n' +
        '3. Irreducible Quadratic Factors: For every factor (x² + bx + c) with negative discriminant b² - 4c < 0, add a linear numerator: (Ax + B) / (x² + bx + c). These integrate into a combination of natural logs (from substitution) and arctangent (by completing the square).\n\n' +
        '4. Repeated Irreducible Quadratic Factors: For (x² + bx + c)ᵐ, add m terms of the form (Aⱼx + Bⱼ) / (x² + bx + c)ʲ.',
    },
    {
      title: 'The Heaviside Cover-Up Method',
      content:
        'For distinct linear factors, the unknown numerator coefficients Aᵢ can be extracted in seconds without solving systems of linear equations.\n\n' +
        'To find the coefficient Aᵢ above (x - rᵢ), multiply the entire equation by (x - rᵢ) (which "covers up" the factor (x - rᵢ) in the original denominator), and evaluate the remaining expression at the root x = rᵢ:\n' +
        'Aᵢ = lim_{x → rᵢ} [ (x - rᵢ) · P(x) / Q(x) ].',
    },
  ],
  equations: [
    {
      name: 'Partial Fraction Decomposition (Distinct Linear Factors)',
      latex: '\\frac{P(x)}{(x - r_1)(x - r_2)\\cdots(x - r_n)} = \\sum_{i=1}^n \\frac{A_i}{x - r_i} = \\frac{A_1}{x - r_1} + \\frac{A_2}{x - r_2} + \\cdots + \\frac{A_n}{x - r_n}',
      summary:
        'Splits a proper rational function with n distinct real roots into a sum of n simple fractions, each yielding a logarithmic antiderivative.',
      conditions: [
        'deg(P) < n (proper rational function)',
        'Roots r₁, r₂, ..., rₙ are mutually distinct real numbers',
      ],
      variables: [
        {
          symbol: 'P(x)',
          name: 'Numerator Polynomial',
          unit: '\\text{polynomial}',
          description: 'The polynomial in the numerator whose degree is strictly less than the denominator degree.',
          connections: 'Determines the values of the coefficients Aᵢ via polynomial evaluation or system matching.',
        },
        {
          symbol: 'r_i',
          name: 'Distinct Roots of Denominator',
          unit: '\\mathbb{R}',
          description: 'The real roots of Q(x) producing vertical asymptotes in the graph.',
          connections: 'Generate the individual denominators (x - rᵢ).',
        },
        {
          symbol: 'A_i',
          name: 'Partial Fraction Numerator Coefficients',
          unit: '\\mathbb{R}',
          description: 'Constant real weights scaling each simple fraction.',
          connections: 'Calculated via Heaviside cover-up or by equating coefficients of equal powers of x.',
        },
        {
          symbol: '\\int \\frac{A_i}{x - r_i} \\, dx',
          name: 'Component Antiderivative',
          unit: 'A_i \\ln|x - r_i| + C',
          description: 'The standard elementary antiderivative of each distinct linear component.',
          connections: 'Produces a sum of natural logarithms in the final integral.',
        },
      ],
    },
    {
      name: 'Repeated Linear and Irreducible Quadratic Decomposition',
      latex: '\\frac{P(x)}{(x - r)^k (x^2 + bx + c)} = \\sum_{j=1}^k \\frac{A_j}{(x - r)^j} + \\frac{Bx + C}{x^2 + bx + c}, \\quad (b^2 - 4c < 0)',
      summary:
        'Decomposition format handling repeated roots of multiplicity k and prime quadratics with complex conjugate roots.',
      conditions: [
        'deg(P) < k + 2',
        'Quadratic factor x² + bx + c is irreducible over ℝ (discriminant b² - 4c < 0)',
      ],
      variables: [
        {
          symbol: 'k',
          name: 'Multiplicity of Repeated Root',
          unit: '\\mathbb{N}',
          description: 'The number of times the factor (x - r) repeats in the denominator.',
          connections: 'Requires exactly k terms with increasing powers (x - r)ʲ from j = 1 to k.',
        },
        {
          symbol: 'Bx + C',
          name: 'Linear Numerator for Irreducible Quadratic',
          unit: '\\text{first-degree polynomial}',
          description: 'A linear binomial required in the numerator because the denominator is second-degree.',
          connections: 'Splits into a logarithmic derivative part (proportional to 2x + b) and an arctangent constant part.',
        },
        {
          symbol: 'b^2 - 4c < 0',
          name: 'Negative Discriminant Condition',
          unit: '\\text{condition}',
          description: 'Ensures the quadratic cannot be factored into real linear factors.',
          connections: 'Requires completing the square to yield an arctan term.',
        },
      ],
    },
    {
      name: 'Standard Quadratic Integrals (Arctan Form)',
      latex: '\\int \\frac{1}{x^2 + a^2} \\, dx = \\frac{1}{a} \\arctan\\left(\\frac{x}{a}\\right) + C, \\quad \\int \\frac{x}{x^2 + a^2} \\, dx = \\frac{1}{2} \\ln\\big(x^2 + a^2\\big) + C',
      summary:
        'The two fundamental building-block antiderivatives arising from the integration of irreducible quadratic partial fractions.',
      conditions: ['a > 0 is a real constant'],
      variables: [
        {
          symbol: 'a',
          name: 'Quadratic Radius Constant',
          unit: '\\text{positive scalar}',
          description: 'The square root of the constant term a² resulting from completing the square.',
          connections: 'Scales the arctangent argument by x/a and divides the overall result by 1/a.',
        },
        {
          symbol: '\\arctan(x/a)',
          name: 'Inverse Tangent Function',
          unit: '\\text{radians}',
          description: 'The bounded transcendental function with horizontal asymptotes at ±π/2.',
          connections: 'Arises whenever integrating 1 / (x² + a²).',
        },
        {
          symbol: '\\frac{1}{2} \\ln(x^2 + a^2)',
          name: 'Logarithmic Quadratic Antiderivative',
          unit: '\\text{function}',
          description: 'Arises from u-substitution with u = x² + a², where du = 2x dx.',
          connections: 'Absolute value bars are unnecessary since x² + a² > 0 for all real x.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Adjust the slider parameters for roots r₁, r₂ and numerator coefficients to watch the composite rational curve P(x)/Q(x) dynamically split into its elementary partial fractions A/(x - r₁) and B/(x - r₂). Observe how the sum of individual areas matches the total area under the rational curve.',
};

export default partialFractionsData;
