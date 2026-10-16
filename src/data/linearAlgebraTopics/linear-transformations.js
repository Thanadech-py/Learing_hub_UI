/**
 * Linear Algebra Topic: Linear Transformations
 */
const linearTransformationsData = {
  id: 'linear-transformations',
  title: 'Linear Transformations & Coordinate Geometry',
  subtitle:
    'Warping space: rotations, reflections, scaling, shears, and how matrix columns track transformed basis vectors.',
  level: 'Intermediate',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'A transformation T: ℝⁿ → ℝᵐ is a function that takes a column vector as input and returns a transformed column vector as output. A transformation is "Linear" if grid lines remain straight and parallel and the origin stays fixed at 0.',
    'Any linear transformation is completely determined by where it sends the standard basis vectors e₁ = [1, 0]ᵀ and e₂ = [0, 1]ᵀ (and e₃ = [0, 0, 1]ᵀ in 3D).',
    'By packaging the transformed basis vectors T(e₁) and T(e₂) as the columns of matrix A, transforming any vector x is computed directly via the matrix-vector product T(x) = Ax.',
  ],
  keyConcepts: [
    {
      title: 'Building the Transformation Matrix from Basis Vectors',
      content:
        'Suppose a transformation T sends the unit x-vector e₁ = [1, 0]ᵀ to [2, 1]ᵀ and sends the unit y-vector e₂ = [0, 1]ᵀ to [-1, 3]ᵀ. Those two destination vectors become Column 1 and Column 2 of matrix A.',
      exampleLabel: 'Worked Transformation of Input Vector x = [3, 2]ᵀ',
      latex:
        'T\\!\\left(\\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix}\\right) = \\begin{bmatrix} 2 & -1 \\\\ 1 & 3 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix} = 3\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} + 2\\begin{bmatrix} -1 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 6 - 2 \\\\ 3 + 6 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 9 \\end{bmatrix}',
      exampleNote:
        'The input coordinates x = 3, y = 2 tell us to take 3 steps along the first column [2, 1]ᵀ and 2 steps along the second column [-1, 3]ᵀ.',
    },
    {
      title: 'Horizontal Shear & Scaling Matrix Calculations',
      content:
        'A horizontal shear keeps y unchanged while shifting x proportionally to y: x_new = x + ky. In matrix form, e₁ stays at [1, 0]ᵀ while e₂ tilts to [k, 1]ᵀ.',
      exampleLabel: 'Worked Shear Calculation with Factor k = 1.5 on Vector [2, 4]ᵀ',
      latex:
        'A_{\\text{shear}} \\mathbf{x} = \\begin{bmatrix} 1 & 1.5 \\\\ 0 & 1 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} (1)(2) + (1.5)(4) \\\\ (0)(2) + (1)(4) \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 4 \\end{bmatrix}',
      exampleNote:
        'Notice that the vertical coordinate y = 4 is unchanged, while the horizontal coordinate shifts from 2 to 2 + 1.5(4) = 8.',
    },
    {
      title: 'Rotation Matrix Calculation in Vector Form',
      content:
        'Rotating a vector counterclockwise by angle θ uses R(θ) = [[cosθ, -sinθ], [sinθ, cosθ]]. In 3D, rotating around the z-axis preserves the z-coordinate while rotating (x, y).',
      exampleLabel: 'Worked 90° Counterclockwise Rotation of Vector [3, 1]ᵀ',
      latex:
        'R(90^\\circ)\\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} \\cos 90^\\circ & -\\sin 90^\\circ \\\\ \\sin 90^\\circ & \\cos 90^\\circ \\end{bmatrix} \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ 3 \\end{bmatrix}',
      exampleNote:
        'Check lengths: ||[3, 1]ᵀ|| = √10 and ||[-1, 3]ᵀ|| = √10, and their dot product is (3)(-1) + (1)(3) = 0 (rotated by exactly 90°).',
    },
  ],
  equations: [
    {
      name: 'Matrix Representation of a Linear Transformation',
      latex: 'T(\\mathbf{x}) = A\\mathbf{x} = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = x \\begin{bmatrix} a \\\\ c \\end{bmatrix} + y \\begin{bmatrix} b \\\\ d \\end{bmatrix}',
      summary:
        'Shows that transforming vector x is equivalent to a linear combination of the columns of matrix A weighted by the coordinates of x.',
      exampleDescription: '3D Scaling & Reflection Matrix acting on column vector [2, -1, 4]ᵀ',
      exampleLatex:
        '\\begin{bmatrix} 2 & 0 & 0 \\\\ 0 & -1 & 0 \\\\ 0 & 0 & 3 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ -1 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} (2)(2) \\\\ (-1)(-1) \\\\ (3)(4) \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 1 \\\\ 12 \\end{bmatrix}',
      conditions: ['T must satisfy linearity axioms T(u+v)=T(u)+T(v) and T(cv)=cT(v)'],
      variables: [
        {
          symbol: 'T(\\mathbf{x})',
          name: 'Transformed Vector Output',
          unit: '\\mathbb{R}^n',
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
        'Rotates every vector in the plane counterclockwise by angle θ without altering vector lengths or interior angles.',
      exampleDescription: 'Rotating v = [2, 0]ᵀ counterclockwise by θ = 60°',
      exampleLatex:
        'R(60^\\circ)\\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1/2 & -\\sqrt{3}/2 \\\\ \\sqrt{3}/2 & 1/2 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ \\sqrt{3} \\end{bmatrix} \\approx \\begin{bmatrix} 1.00 \\\\ 1.732 \\end{bmatrix}',
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
    'Manipulate the transformation sliders for Rotation, Scale, and Shear. Watch the 3D coordinate grid warp in real time as basis vectors move to their new column coordinates.',
};

export default linearTransformationsData;
