/**
 * Linear Algebra Topic: Vectors
 */
const vectorsData = {
  id: 'vectors',
  title: 'Vectors: Geometry & Algebra',
  subtitle:
    'Arrows in space, ordered lists of numbers, Euclidean norms, dot products, cross products, and geometric angle projections.',
  level: 'Beginner',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'Vectors are the fundamental building blocks of linear algebra. In physics, a vector is a geometric arrow possessing both a magnitude (length) and a direction (such as displacement, velocity, or force). In computer science and data science, a vector is an ordered column of numerical features representing high-dimensional data.',
    'Linear algebra bridges these two viewpoints. An algebraic column vector v = [v₁, v₂, v₃]ᵀ specifies how many steps to take along each orthogonal basis direction. Two fundamental operations define a vector space: Vector Addition (joining arrows tip-to-tail to form a parallelogram) and Scalar Multiplication (stretching, shrinking, or reversing an arrow).',
    'The Dot Product (inner product) and 3D Cross Product connect vector algebra to Euclidean geometry: they measure directional alignment, calculate projection lengths, and produce normal vectors perpendicular to a 3D plane.',
  ],
  keyConcepts: [
    {
      title: 'Column Vector Addition & Scalar Multiplication',
      content:
        '• Geometric View: A directed line segment characterized by magnitude ||v|| and direction. Standard position roots the tail at the origin (0, 0, 0).\n' +
        '• Algebraic Column Form: Addition and scalar multiplication operate entry-by-entry across matching rows of the column vectors.',
      exampleLabel: 'Worked Vector Addition & Scaling Calculation',
      latex:
        '2\\mathbf{u} + \\mathbf{v} = 2\\begin{bmatrix} 3 \\\\ -1 \\\\ 2 \\end{bmatrix} + \\begin{bmatrix} 1 \\\\ 4 \\\\ -3 \\end{bmatrix} = \\begin{bmatrix} 6 \\\\ -2 \\\\ 4 \\end{bmatrix} + \\begin{bmatrix} 1 \\\\ 4 \\\\ -3 \\end{bmatrix} = \\begin{bmatrix} 6+1 \\\\ -2+4 \\\\ 4-3 \\end{bmatrix} = \\begin{bmatrix} 7 \\\\ 2 \\\\ 1 \\end{bmatrix}',
      exampleNote:
        'Each row component is scaled by 2 first, and then added component-by-component to form the resultant 3D column vector.',
    },
    {
      title: 'Dot Product & Angle Between Column Vectors',
      content:
        'The dot product multiplies corresponding entries of two column vectors (written as row-times-column uᵀv) and sums them into a single scalar:\n' +
        '1. Algebraic formula: u · v = uᵀv = u₁v₁ + u₂v₂ + u₃v₃.\n' +
        '2. Geometric formula: u · v = ||u|| · ||v|| · cos(θ).\n' +
        'Two non-zero vectors are perpendicular (orthogonal, θ = 90°) if and only if their dot product equals 0.',
      exampleLabel: 'Worked Dot Product & Orthogonality Calculation',
      latex:
        '\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{u}^T \\mathbf{v} = \\begin{bmatrix} 2 & -3 & 1 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ 2 \\\\ -2 \\end{bmatrix} = (2)(4) + (-3)(2) + (1)(-2) = 8 - 6 - 2 = 0 \\implies \\mathbf{u} \\perp \\mathbf{v} \\;(\\theta = 90^\\circ)',
      exampleNote:
        'Because the row-by-column inner product evaluates to 0, the two 3D vectors are strictly perpendicular.',
    },
    {
      title: '3D Cross Product in Determinant Matrix Form',
      content:
        'In ℝ³, the cross product u × v produces a brand-new vector that is perpendicular to both u and v, with magnitude equal to the area of the parallelogram they span: ||u × v|| = ||u|| ||v|| sin(θ).',
      exampleLabel: 'Worked 3D Cross Product Calculation (Matrix Determinant Form)',
      latex:
        '\\mathbf{u} \\times \\mathbf{v} = \\begin{bmatrix} 1 \\\\ 2 \\\\ 0 \\end{bmatrix} \\times \\begin{bmatrix} 0 \\\\ 3 \\\\ 1 \\end{bmatrix} = \\det\\begin{bmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ 1 & 2 & 0 \\\\ 0 & 3 & 1 \\end{bmatrix} = \\begin{bmatrix} (2)(1) - (0)(3) \\\\ (0)(0) - (1)(1) \\\\ (1)(3) - (2)(0) \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ -1 \\\\ 3 \\end{bmatrix}',
      exampleNote:
        'Check orthogonality: [2, -1, 3] · [1, 2, 0] = 2 - 2 + 0 = 0, confirming u × v is perpendicular to u.',
    },
  ],
  equations: [
    {
      name: 'Euclidean Vector Norm (Length)',
      latex: '\\|\\mathbf{v}\\| = \\sqrt{\\mathbf{v}^T \\mathbf{v}} = \\sqrt{v_1^2 + v_2^2 + \\dots + v_n^2}',
      summary:
        'Computes the geometric length or magnitude of column vector v using the generalized 3D Pythagorean theorem.',
      exampleDescription: 'Length of v = [2, -3, 6]ᵀ in ℝ³',
      exampleLatex:
        '\\mathbf{v} = \\begin{bmatrix} 2 \\\\ -3 \\\\ 6 \\end{bmatrix} \\implies \\|\\mathbf{v}\\| = \\sqrt{2^2 + (-3)^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7',
      conditions: ['v ∈ ℝⁿ'],
      variables: [
        {
          symbol: '\\|\\mathbf{v}\\|',
          name: 'Euclidean L2 Norm (Magnitude)',
          unit: '\\mathbb{R}_{\\ge 0}',
          description: 'The geometric length of the arrow from tail to tip.',
          connections: 'Always non-negative; ||v|| = 0 if and only if v is the zero vector [0, 0, ...]ᵀ.',
        },
        {
          symbol: 'v_i',
          name: 'Vector Component along Axis i',
          unit: '\\mathbb{R}',
          description: 'The orthogonal projection coordinate along the i-th dimension.',
          connections: 'Scaling every component by scalar c scales the norm by |c|: ||c·v|| = |c| · ||v||.',
        },
      ],
    },
    {
      name: 'Dot Product and Cosine Angle Formula',
      latex: '\\mathbf{u} \\cdot \\mathbf{v} = \\mathbf{u}^T \\mathbf{v} = \\sum_{i=1}^n u_i v_i = \\|\\mathbf{u}\\| \\|\\mathbf{v}\\| \\cos\\theta',
      summary:
        'Connects the algebraic matrix inner product uᵀv to the geometric angle between two column vectors.',
      exampleDescription: 'Angle between u = [1, 2, 2]ᵀ and v = [2, 1, -2]ᵀ',
      exampleLatex:
        '\\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix} \\cdot \\begin{bmatrix} 2 \\\\ 1 \\\\ -2 \\end{bmatrix} = (1)(2) + (2)(1) + (2)(-2) = 0, \\quad \\cos\\theta = \\frac{0}{\\sqrt{9}\\sqrt{9}} = 0 \\implies \\theta = 90^\\circ',
      conditions: ['u, v are non-zero vectors in ℝⁿ'],
      variables: [
        {
          symbol: '\\mathbf{u} \\cdot \\mathbf{v}',
          name: 'Dot Product (Scalar Inner Product)',
          unit: '\\mathbb{R}',
          description: 'A single real scalar measuring directional alignment.',
          connections: 'If u · v = 0, the vectors are orthogonal (perpendicular). If u · v = ||u|| ||v||, vectors are parallel.',
        },
        {
          symbol: '\\theta',
          name: 'Angle Between Vectors',
          unit: '\\text{radians or degrees}',
          description: 'The interior angle formed between u and v in their common 2D plane: θ = arccos( (u·v)/(||u|| ||v||) ).',
          connections: 'Ranges between 0° (parallel) and 180° (anti-parallel).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Drag or adjust vector u and vector v in 3D space. Watch the tip-to-tail vector addition u + v, dot product u · v, and cross product normal u × v update in real time.',
};

export default vectorsData;
