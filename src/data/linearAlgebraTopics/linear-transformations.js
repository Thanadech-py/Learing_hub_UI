/**
 * Linear Algebra Topic: Linear Transformations
 */
const linearTransformationsData = {
  id: 'linear-transformations',
  title: 'Linear Transformations & Coordinate Geometry',
  subtitle:
    'Warping 2D space: rotations, reflections, scaling, shears, and how matrix columns track transformed basis vectors.',
  level: 'Intermediate',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'A transformation T: ℝⁿ → ℝᵐ is simply a function that takes a vector as input and produces another vector as output. What makes a transformation "Linear" is that it respects addition and scaling: grid lines must remain straight and parallel, and the origin (0, 0) must remain completely fixed in place.',
    'The profound breakthrough popularized by Grant Sanderson (3Blue1Brown) is that any 2D linear transformation is entirely and completely determined by where it sends just TWO vectors: the standard basis vectors î = [1, 0]ᵀ and ĵ = [0, 1]ᵀ!',
    'If you know where î lands (let\'s say coordinates [a, c]ᵀ) and where ĵ lands (coordinates [b, d]ᵀ), you simply package those destination coordinates as the columns of a 2 × 2 matrix: A = [[a, b], [c, d]]. Multiplying any vector [x, y]ᵀ by A computes x · î_new + y · ĵ_new, revealing its exact new position in the transformed space.',
  ],
  keyConcepts: [
    {
      title: 'The Two Rules of Linearity',
      content:
        'A transformation T is linear if and only if:\n' +
        '1. Additivity: T(u + v) = T(u) + T(v)\n' +
        '2. Homogeneity: T(c · v) = c · T(v)\n\n' +
        'Geometrically, this means that grid lines never curve, spacing between parallel lines remains uniform, and the origin (0, 0) never moves (T(0) = 0).',
    },
    {
      title: 'Columns of a Matrix are Transformed Basis Vectors',
      content:
        'To understand what any matrix A = [[a, b], [c, d]] does physically:\n' +
        '• Look at column 1: [a, c]ᵀ is where î = [1, 0]ᵀ lands!\n' +
        '• Look at column 2: [b, d]ᵀ is where ĵ = [0, 1]ᵀ lands!\n\n' +
        'Every linear transformation—whether it is a rotation, reflection, stretching, or shear—is completely described by tracking where î and ĵ go.',
    },
    {
      title: 'Elementary Geometric Transformations',
      content:
        '• Rotation by angle θ: î rotates to [cosθ, sinθ]ᵀ and ĵ rotates to [-sinθ, cosθ]ᵀ.\n' +
        '• Horizontal Shear: î stays at [1, 0]ᵀ while ĵ shifts horizontally to [k, 1]ᵀ (sliding like a deck of playing cards).\n' +
        '• Scaling: Diagonal matrix [[s_x, 0], [0, s_y]] expands space along axes by factors s_x and s_y.\n' +
        '• Reflection across y-axis: [[-1, 0], [0, 1]] flips the horizontal dimension.',
    },
  ],
  equations: [
    {
      name: 'Matrix Representation of a Linear Transformation',
      latex: 'T(\\mathbf{x}) = A\\mathbf{x} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = x \\begin{bmatrix} a \\\\ c \\end{bmatrix} + y \\begin{bmatrix} b \\\\ d \\end{bmatrix}',
      summary:
        'Shows that transforming vector x is equivalent to a linear combination of the columns of matrix A weighted by the coordinates of x.',
      conditions: ['T must satisfy linearity axioms', 'A is the standard matrix of T'],
      variables: [
        {
          symbol: 'T(\\mathbf{x})',
          name: 'Transformed Vector Output',
          unit: '\\mathbb{R}^2',
          description: 'The new coordinate destination of vector x under mapping T.',
          connections: 'Derived by linear superposition of transformed basis vectors.',
        },
        {
          symbol: '[a, c]^T',
          name: 'First Column (T(î))',
          unit: '\\mathbb{R}^2',
          description: 'Where the standard x-axis unit vector î = [1, 0]ᵀ lands after transformation.',
          connections: 'Dictates the transformed x-axis orientation and length.',
        },
        {
          symbol: '[b, d]^T',
          name: 'Second Column (T(ĵ))',
          unit: '\\mathbb{R}^2',
          description: 'Where the standard y-axis unit vector ĵ = [0, 1]ᵀ lands after transformation.',
          connections: 'Dictates the transformed y-axis orientation and length.',
        },
      ],
    },
    {
      name: '2D Rotation Matrix by Angle θ',
      latex: 'R(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}',
      summary:
        'Rotates every vector in the plane counterclockwise by angle θ without altering vector lengths or angles.',
      conditions: ['Preserves Euclidean norm: ||R(θ)v|| = ||v||', 'det(R(θ)) = cos²θ + sin²θ = 1'],
      variables: [
        {
          symbol: '\\theta',
          name: 'Rotation Angle',
          unit: '\\text{radians or degrees}',
          description: 'The counterclockwise angle of rotation.',
          connections: 'Inverting a rotation corresponds to rotating in reverse: R(θ)⁻¹ = R(-θ) = R(θ)ᵀ.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Manipulate the transformation sliders for Rotation, Horizontal Scale, Vertical Scale, and Shear. Watch the coordinate grid warp in real time as basis vectors î (cyan) and ĵ (purple) move to their new column coordinates.',
};

export default linearTransformationsData;
