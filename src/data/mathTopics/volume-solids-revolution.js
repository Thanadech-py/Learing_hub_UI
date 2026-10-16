/**
 * Mathematics Sub-Topic: Applications of Integration - Volume of Solids of Revolution
 */
const volumeSolidsRevolutionData = {
  id: 'volume-solids-revolution',
  title: 'Applications: Volume of Solids of Revolution',
  subtitle:
    'Generate 3D symmetric solids by rotating planar curves about axes using the Disk, Washer, and Cylindrical Shells methods.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive 3D lab',
  overview: [
    'A solid of revolution is a three-dimensional geometric body formed by revolving a two-dimensional planar boundary region 360 degrees around a fixed axis of revolution (such as the x-axis, y-axis, or arbitrary lines y = k, x = h).',
    'Depending on the orientation of the cross-sectional slice relative to the axis of rotation, two primary integration paradigms emerge: slicing perpendicular to the axis (the Disk and Washer methods) or slicing parallel to the axis (the Cylindrical Shells method).',
    'The Disk Method computes the volume of a solid without a hollow core by accumulating thin circular disks of volume dV = π R(x)² dx. If the region has an inner void or hole, the Washer Method subtracts the inner cylinder from the outer: dV = π [R_outer² - r_inner²] dx.',
    'The Cylindrical Shells Method unwraps concentric thin-walled cylindrical shells of circumference 2π r, height h, and thickness dr, yielding dV = 2π r h dr. It excels when solving for y is analytically difficult or involves fractional inverse powers.',
  ],
  keyConcepts: [
    {
      title: 'Disk Method: Perpendicular Slicing Without Void',
      content:
        'Slicing perpendicular to the rotation axis through a solid core yields circular disks of area A(x) = π [R(x)]² and differential volume dV = π [R(x)]² dx.',
    },
    {
      title: 'Washer Method: Outer Minus Inner Radii',
      content:
        'When rotation leaves a hollow cavity, each cross-section is an annular washer with area A(x) = π [R_outer² - r_inner²]. Volume is V = π ∫ [R(x)² - r(x)²] dx.',
    },
    {
      title: 'Cylindrical Shells: Parallel Unwrapping',
      content:
        'Slicing parallel to the axis unrolls cylindrical tubes of radius r, height h, and thickness dr. Volume is V = 2π ∫ (radius)(height) dr.',
    },
    {
      title: 'Rotation About Arbitrary Axis (y = k, x = h)',
      content:
        'Radii are geometric distances: R(x) = |f(x) - k| for horizontal axes, and r(x) = |x - h| for vertical axes.',
    },
  ],
  equations: [
    {
      name: 'Disk Method (Rotation about Horizontal Axis)',
      latex: 'V = \\pi \\int_{a}^{b} \\big[ R(x) \\big]^2 \\, dx',
      summary:
        'Computes the 3D volume by integrating solid circular cross-sectional disks perpendicular to the axis of rotation.',
      conditions: [
        'R(x) is continuous on [a, b]',
        'Region directly borders the rotational axis (no internal cavity)',
      ],
      variables: [
        {
          symbol: 'V',
          name: 'Total Solid Volume',
          unit: '\\text{m}^3',
          description: 'The accumulated three-dimensional volumetric capacity of the revolved body.',
          connections:
            'Must evaluate to a positive real number. Proportional to π and the square of radius R(x).',
        },
        {
          symbol: 'R(x)',
          name: 'Radius of Revolved Disk',
          unit: '\\text{length (m)}',
          description: 'The perpendicular distance from the boundary curve to the axis of rotation.',
          connections:
            'When rotating about the x-axis (y = 0), R(x) = f(x). For axis y = k, R(x) = |f(x) - k|.',
        },
        {
          symbol: '\\pi',
          name: 'Circle Area Scaling Constant',
          unit: '\\text{dimensionless (}\\approx 3.14159\\text{)}',
          description: 'Fundamental geometric ratio converting radius squared into cross-sectional circle area A = π R².',
          connections: 'Multiplies the entire definite integral.',
        },
        {
          symbol: 'a, b',
          name: 'Axial Integration Boundaries',
          unit: '\\text{coordinate}',
          description: 'The starting (a) and ending (b) coordinates along the rotational axis.',
          connections: 'Spans the axial length of the solid object.',
        },
        {
          symbol: 'dx',
          name: 'Disk Thickness Differential',
          unit: '\\text{length (m)}',
          description: 'The infinitesimal axial thickness of each cylindrical disk slice.',
          connections: 'Yields slice volume dV = A(x) dx = π [R(x)]² dx.',
        },
      ],
    },
    {
      name: 'Washer Method (Rotation with Inner Hole)',
      latex: 'V = \\pi \\int_{a}^{b} \\Big( \\big[ R_{\\text{out}}(x) \\big]^2 - \\big[ r_{\\text{in}}(x) \\big]^2 \\Big) \\, dx',
      summary:
        'Calculates volume of revolution with an internal cavity by subtracting the inner cylinder volume from the outer cylinder volume.',
      conditions: [
        'R_{\\text{out}}(x) \\ge r_{\\text{in}}(x) \\ge 0 on [a, b]',
        'Slices taken perpendicular to the axis of rotation',
      ],
      variables: [
        {
          symbol: 'V',
          name: 'Net Hollow Solid Volume',
          unit: '\\text{m}^3',
          description: 'The volume of material contained between the outer boundary and the hollow cavity.',
          connections: 'Difference of outer and inner disk integrals.',
        },
        {
          symbol: 'R_{\\text{out}}(x)',
          name: 'Outer Radius Function',
          unit: '\\text{m}',
          description: 'The distance from the farther outer curve boundary to the axis of rotation.',
          connections: 'Determines the total outer circular cross-section π R_out².',
        },
        {
          symbol: 'r_{\\text{in}}(x)',
          name: 'Inner Radius Function',
          unit: '\\text{m}',
          description: 'The distance from the closer inner curve boundary to the axis of rotation.',
          connections: 'Subtracted in quadrature: π (R_out² - r_in²). Note: R_out² - r_in² ≠ (R_out - r_in)².',
        },
      ],
    },
    {
      name: 'Cylindrical Shells Method (Parallel Slicing)',
      latex: 'V = 2\\pi \\int_{a}^{b} r(x) \\cdot h(x) \\, dx = 2\\pi \\int_{a}^{b} (x - x_0) \\big[ f(x) - g(x) \\big] \\, dx',
      summary:
        'Integrates concentric thin-walled cylindrical shells unrolled into rectangular sheets of area 2π r h and thickness dx.',
      conditions: [
        'Slices are parallel to the rotational axis',
        'Radius r(x) \\ge 0 and height h(x) \\ge 0 on [a, b]',
      ],
      variables: [
        {
          symbol: 'V',
          name: 'Shell Integrated Volume',
          unit: '\\text{m}^3',
          description: 'The volume obtained by accumulating all concentric cylindrical shells.',
          connections: 'Equivalent to the Washer method value, but often requires much simpler antiderivatives.',
        },
        {
          symbol: '2\\pi r(x)',
          name: 'Shell Circumference',
          unit: '\\text{m}',
          description: 'The unwrapped perimeter of the cylindrical shell at radius r(x).',
          connections: 'Radius r(x) is the perpendicular distance from the slice to the rotation axis.',
        },
        {
          symbol: 'h(x)',
          name: 'Shell Height',
          unit: '\\text{m}',
          description: 'The axial length of the cylindrical tube, given by [f(x) - g(x)].',
          connections: 'Parallel to the axis of rotation.',
        },
      ],
    },
  ],
};

export default volumeSolidsRevolutionData;
