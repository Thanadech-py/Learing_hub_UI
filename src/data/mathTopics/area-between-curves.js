/**
 * Mathematics Sub-Topic: Applications of Integration - Area Between Curves
 */
const areaBetweenCurvesData = {
  id: 'area-between-curves',
  title: 'Applications: Area Between Curves',
  subtitle:
    'Calculate the total planar area bounded by intersecting or piecewise curves using vertical and horizontal slice integration.',
  level: 'Intermediate',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'While the standard definite integral ∫ f(x) dx calculates signed area between a single curve and the x-axis, real-world geometric problems require finding the physical positive area enclosed between multiple intersecting boundaries.',
    'Vertical slicing (integrating with respect to x) slices the bounded region into thin rectangular strips of width dx and height [y_top - y_bottom] = [f(x) - g(x)]. When curves intersect and trade positions, the integral must be partitioned at each intersection root where f(x) - g(x) changes sign.',
    'Horizontal slicing (integrating with respect to y) slices the region into horizontal strips of height dy and width [x_right - x_left] = [f(y) - g(y)]. This eliminates complex piecewise decompositions when curves are given as functions of y or fail the vertical line test.',
  ],
  keyConcepts: [
    {
      title: 'Vertical Slicing: Top Minus Bottom',
      content:
        'When f(x) ≥ g(x) on [a, b], each vertical differential element has area dA = [f(x) - g(x)] dx. Total area is A = ∫_a^b [f(x) - g(x)] dx.',
    },
    {
      title: 'Horizontal Slicing: Right Minus Left',
      content:
        'When bounding equations are functions of y or expressible as x = f(y) and x = g(y), integrate horizontal strips: A = ∫_c^d [x_right - x_left] dy.',
    },
    {
      title: 'Intersection Partitioning & Absolute Difference',
      content:
        'When boundaries cross, solve f(x) = g(x) for roots. The general area is A = ∫_a^b |f(x) - g(x)| dx, evaluated piecewise across adjacent subintervals.',
    },
    {
      title: 'Applications in Physics & Economics',
      content:
        'Used to compute work done between thermodynamic paths in P-V cycles, total energy enclosed in hysteresis loops, and consumer/producer economic surplus.',
    },
  ],
  equations: [
    {
      name: 'Area Between Curves via Vertical Slicing',
      latex: 'A = \\int_{a}^{b} \\Big[ f(x) - g(x) \\Big] \\, dx = \\int_{a}^{b} \\Big( y_{\\text{top}} - y_{\\text{bottom}} \\Big) \\, dx',
      summary:
        'Computes the enclosed area by summing infinitesimal vertical rectangular strips of width dx and height [f(x) - g(x)].',
      conditions: [
        'f(x) and g(x) must be continuous on [a, b]',
        'f(x) \\ge g(x) throughout the entire integration interval [a, b]',
      ],
      variables: [
        {
          symbol: 'A',
          name: 'Total Enclosed Area',
          unit: '\\text{m}^2 \\text{ or dimensionless}',
          description: 'The physical 2D geometric surface area enclosed between the upper and lower boundary curves.',
          connections:
            'Must always evaluate to a non-negative real scalar (A ≥ 0). If the integral yields a negative value, the order of curves was inverted.',
        },
        {
          symbol: 'f(x)',
          name: 'Upper Boundary Function (y_top)',
          unit: '\\text{function height}',
          description: 'The function forming the ceiling of the region, where f(x) ≥ g(x) for all x ∈ [a, b].',
          connections:
            'Supplies the top y-coordinate for each infinitesimal vertical slice. Swapping f and g changes the sign of the integral.',
        },
        {
          symbol: 'g(x)',
          name: 'Lower Boundary Function (y_bottom)',
          unit: '\\text{function height}',
          description: 'The function forming the floor of the region.',
          connections:
            'Subtracted directly from f(x) to isolate the vertical height difference [f(x) - g(x)].',
        },
        {
          symbol: 'a',
          name: 'Left Integration Limit',
          unit: '\\text{coordinate}',
          description: 'The leftmost x-coordinate of the enclosed region, commonly determined by the lower root of f(x) - g(x) = 0.',
          connections:
            'Serves as the starting boundary for Riemann sum accumulation.',
        },
        {
          symbol: 'b',
          name: 'Right Integration Limit',
          unit: '\\text{coordinate}',
          description: 'The rightmost x-coordinate of the enclosed region, commonly determined by the upper root of f(x) - g(x) = 0.',
          connections:
            'Defines the upper terminal limit. The span (b - a) represents the region width.',
        },
        {
          symbol: 'dx',
          name: 'Infinitesimal Width Differential',
          unit: '\\text{length}',
          description: 'The differential width of each vertical slice across the x-axis.',
          connections:
            'Product with height [f(x) - g(x)] yields differential area dA = [f(x) - g(x)] dx.',
        },
      ],
    },
    {
      name: 'Area Between Curves via Horizontal Slicing',
      latex: 'A = \\int_{c}^{d} \\Big[ f(y) - g(y) \\Big] \\, dy = \\int_{c}^{d} \\Big( x_{\\text{right}} - x_{\\text{left}} \\Big) \\, dy',
      summary:
        'Computes enclosed area when boundary functions are parameterized in terms of y, integrating horizontal strips.',
      conditions: [
        'f(y) and g(y) continuous on [c, d]',
        'f(y) \\ge g(y) (i.e. x_{\\text{right}} \\ge x_{\\text{left}}) on [c, d]',
      ],
      variables: [
        {
          symbol: 'A',
          name: 'Total Enclosed Area',
          unit: '\\text{m}^2',
          description: 'The enclosed 2D surface area computed along the y-axis.',
          connections: 'Identical value to vertical slicing when region is bounded and integrable.',
        },
        {
          symbol: 'f(y)',
          name: 'Right Boundary Function (x_right)',
          unit: '\\text{x-coordinate}',
          description: 'The rightmost curve boundary located at higher x values.',
          connections: 'Forms the outer coordinate of each horizontal strip.',
        },
        {
          symbol: 'g(y)',
          name: 'Left Boundary Function (x_left)',
          unit: '\\text{x-coordinate}',
          description: 'The leftmost curve boundary located at lower x values.',
          connections: 'Subtracted from f(y) to establish horizontal width [f(y) - g(y)].',
        },
        {
          symbol: 'c, d',
          name: 'Vertical Interval Bounds',
          unit: '\\text{y-coordinate}',
          description: 'The bottom (c) and top (d) limits of integration along the y-axis.',
          connections: 'Found by solving f(y) = g(y) for intersection y-coordinates.',
        },
        {
          symbol: 'dy',
          name: 'Infinitesimal Height Differential',
          unit: '\\text{length}',
          description: 'The differential vertical thickness of each horizontal slice.',
          connections: 'Yields differential area dA = [x_right - x_left] dy.',
        },
      ],
    },
    {
      name: 'Absolute Area with Multiple Crossing Points',
      latex: 'A = \\int_{a}^{b} \\big| f(x) - g(x) \\big| \\, dx = \\sum_{i=1}^{m} \\int_{x_{i-1}}^{x_i} (-1)^{\\sigma_i} \\big[ f(x) - g(x) \\big] \\, dx',
      summary:
        'Decomposes total physical area across multiple subintervals when curves cross each other at internal roots.',
      conditions: ['Curves intersect at internal roots a < x_1 < x_2 < ... < b'],
      variables: [
        {
          symbol: 'A',
          name: 'Net Positive Geometric Area',
          unit: '\\text{m}^2',
          description: 'The sum of all positive enclosed sub-areas between multiple intersection points.',
          connections: 'Guaranteed positive by absolute value envelope |f(x) - g(x)|.',
        },
        {
          symbol: 'x_i',
          name: 'Intersection Roots',
          unit: '\\text{coordinate}',
          description: 'Real solutions where f(x) = g(x) and boundaries trade positions.',
          connections: 'Acts as internal subdivision boundaries for piecewise integration.',
        },
      ],
    },
  ],
};

export default areaBetweenCurvesData;
