/**
 * Math Topic: Trigonometry & The Unit Circle
 */
const trigonometryData = {
  id: 'trigonometry',
  title: 'Trigonometry & The Unit Circle',
  subtitle:
    'Ratios of triangles, unit circle definitions, radians, trigonometric identities, and periodic wave functions.',
  level: 'Intermediate',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'Trigonometry begins with the ratios of side lengths in right triangles (sine, cosine, tangent). While right-triangle definitions are limited to acute angles between 0° and 90°, the Unit Circle expands trigonometry to all angles from -∞ to +∞.',
    'On a circle of radius 1 centered at the origin, the counterclockwise angle θ from the positive x-axis defines a point (x, y) where x = cos(θ) and y = sin(θ). This geometric definition transforms trigonometric ratios into continuous, periodic, oscillating functions that describe waves, rotations, and circular physics.',
    'Radians measure angles by arc length divided by radius (θ = s/r), making 2π radians correspond to a full 360° rotation. This natural geometric angle measure enables calculus formulas like d/dx[sin x] = cos x to hold without awkward numerical conversion constants.',
  ],
  keyConcepts: [
    {
      title: 'The Unit Circle: x = cos(θ), y = sin(θ)',
      content:
        'Because the unit circle has equation x² + y² = 1, substituting the coordinate definitions immediately yields the fundamental Pythagorean identity: cos²(θ) + sin²(θ) = 1 for ANY angle θ!\n\n' +
        '• At θ = 0 rad (0°): cos(0) = 1, sin(0) = 0.\n' +
        '• At θ = π/2 rad (90°): cos(π/2) = 0, sin(π/2) = 1.\n' +
        '• At θ = π rad (180°): cos(π) = -1, sin(π) = 0.\n' +
        '• At θ = 3π/2 rad (270°): cos(3π/2) = 0, sin(3π/2) = -1.\n' +
        '• Tangent is the slope of the ray: tan(θ) = y/x = sin(θ)/cos(θ). At 90° and 270°, x = 0, causing vertical asymptotes where tan(θ) approaches ±∞.',
    },
    {
      title: 'Trigonometric Identities & Angle Addition',
      content:
        'The addition formulas sin(α ± β) and cos(α ± β) describe how rotations compose in 2D space. Using Euler’s formula e^(i(α+β)) = e^(iα) e^(iβ), these identities emerge naturally from multiplying complex rotation phasors.',
    },
    {
      title: 'Waveform Graphs: Sine, Cosine, & Tangent',
      content:
        'Unrolling the y-coordinate of the unit circle as an angle increases generates the familiar sinusoidal wave. Sine and cosine are identical curves shifted by a phase angle of 90° (π/2 radians): cos(θ) = sin(θ + π/2).',
    },
  ],
  equations: [
    {
      name: 'Fundamental Pythagorean Trigonometric Identity',
      latex: '\\sin^2\\theta + \\cos^2\\theta = 1',
      summary:
        'Direct consequence of the Pythagorean theorem applied to the unit circle x² + y² = 1.',
      conditions: ['Holds universally for all real and complex angles θ'],
      variables: [
        {
          symbol: '\\sin\\theta',
          name: 'Sine Function',
          unit: '[-1, 1]',
          description: 'The vertical y-coordinate on the unit circle.',
          connections: 'Oscillates between -1 and +1 with fundamental period 2π (360°).',
        },
        {
          symbol: '\\cos\\theta',
          name: 'Cosine Function',
          unit: '[-1, 1]',
          description: 'The horizontal x-coordinate on the unit circle.',
          connections: 'Leads sine by 90° (π/2 rad).',
        },
        {
          symbol: '\\theta',
          name: 'Angle Measure',
          unit: '\\text{radians or degrees}',
          description: 'The angular displacement from the positive x-axis.',
          connections: 'Conversion: 180° = π radians.',
        },
      ],
    },
    {
      name: 'Angle Sum and Difference Identities',
      latex: '\\sin(\\alpha \\pm \\beta) = \\sin\\alpha\\cos\\beta \\pm \\cos\\alpha\\sin\\beta, \\quad \\cos(\\alpha \\pm \\beta) = \\cos\\alpha\\cos\\beta \\mp \\sin\\alpha\\sin\\beta',
      summary:
        'Formulas for decomposing the trigonometric functions of composite angles into products of individual angles.',
      conditions: ['Derived geometrically from rotated triangles or via Euler’s formula'],
      variables: [
        {
          symbol: '\\alpha, \\beta',
          name: 'Component Angles',
          unit: '\\text{radians}',
          description: 'Independent angular inputs.',
          connections: 'When α = β, yields the double-angle formulas: sin(2α) = 2sinα cosα.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Rotate the angle indicator around the Unit Circle. Watch the live horizontal (cosine) and vertical (sine) projections dynamically draw the sine and cosine wave plots in real time.',
};

export default trigonometryData;
