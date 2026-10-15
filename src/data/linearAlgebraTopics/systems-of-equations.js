/**
 * Linear Algebra Topic: Systems of Linear Equations
 */
const systemsOfEquationsData = {
  id: 'systems-of-equations',
  title: 'Systems of Linear Equations',
  subtitle:
    'Solving Ax = b, Gaussian elimination, row echelon form, pivot columns, and geometric intersection of hyperplanes.',
  level: 'Intermediate',
  estimatedTime: '25 min read + interactive lab',
  overview: [
    'A system of linear equations is a collection of two or more linear equations involving the same set of variables. In two variables, each equation represents a straight line in the Cartesian plane; the solution to the system is the point where the lines intersect.',
    'Linear systems can be written compactly in matrix form as Ax = b, where A is the coefficient matrix, x is the vector of unknowns, and b is the target output vector. Gaussian Elimination systematically performs elementary row operations on the augmented matrix [A | b] to reduce it to Row Echelon Form (REF) and solve for x via back-substitution.',
    'A fundamental theorem of linear algebra establishes that ANY system of linear equations has either: (1) Exactly ONE unique solution (lines intersect at a single point), (2) INFINITELY MANY solutions (lines are coincident / dependent), or (3) NO solution at all (lines are parallel and never meet).',
  ],
  keyConcepts: [
    {
      title: 'Row Picture vs. Column Picture',
      content:
        '• Row Picture: Each equation defines a geometric line (or plane in 3D). The solution is the geometric intersection of all lines.\n' +
        '• Column Picture: Solves x₁ · a₁ + x₂ · a₂ = b. It asks: "How can we scale the column vectors of matrix A so their linear combination reaches target vector b?" This is the foundational perspective of modern linear algebra.',
    },
    {
      title: 'The Three Elementary Row Operations',
      content:
        'Gaussian elimination transforms an augmented matrix [A | b] without changing its solution set using three operations:\n' +
        '1. Row Swap: Exchange two rows (R_i ↔ R_j).\n' +
        '2. Scalar Multiplication: Multiply a row by a non-zero constant (R_i ← c · R_i).\n' +
        '3. Row Addition: Add a multiple of one row to another (R_i ← R_i + c · R_j).',
    },
    {
      title: 'The Three Solution Regimes',
      content:
        '• Unique Solution: det(A) ≠ 0. The matrix is invertible, and x = A⁻¹ b.\n' +
        '• No Solution (Inconsistent): The lines are parallel (e.g. x + y = 2 and x + y = 5). Elimination produces a contradiction like 0 = 3.\n' +
        '• Infinite Solutions (Dependent): The equations describe the exact same line (e.g. x + y = 2 and 2x + 2y = 4). There is at least one free variable.',
    },
  ],
  equations: [
    {
      name: 'Matrix Equation Formulation',
      latex: 'A\\mathbf{x} = \\mathbf{b} \\iff \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} b_1 \\\\ b_2 \\end{bmatrix}',
      summary:
        'Standard matrix-vector representation converting simultaneous linear equations into a compact algebraic mapping.',
      conditions: ['A ∈ ℝ^{m × n}, x ∈ ℝⁿ, b ∈ ℝᵐ'],
      variables: [
        {
          symbol: 'A',
          name: 'Coefficient Matrix',
          unit: '\\mathbb{R}^{m \\times n}',
          description: 'The matrix encoding the linear constraints of the system.',
          connections: 'If square and invertible (det(A) ≠ 0), guaranteed unique solution.',
        },
        {
          symbol: '\\mathbf{x}',
          name: 'Vector of Unknowns',
          unit: '\\mathbb{R}^n',
          description: 'The coordinate tuple satisfying all equations simultaneously.',
          connections: 'Found via Gaussian elimination, LU decomposition, or Cramer’s rule.',
        },
        {
          symbol: '\\mathbf{b}',
          name: 'Target Constraint Vector',
          unit: '\\mathbb{R}^m',
          description: 'The constant terms on the right-hand side of each equation.',
          connections: 'A solution exists if and only if b lies within the column space of A.',
        },
      ],
    },
    {
      name: 'Invertible Matrix Solution Formula',
      latex: '\\mathbf{x} = A^{-1}\\mathbf{b} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\mathbf{b}',
      summary:
        'Explicit analytical solution for a 2×2 system when the determinant ad - bc is non-zero.',
      conditions: ['det(A) = ad - bc ≠ 0'],
      variables: [
        {
          symbol: 'A^{-1}',
          name: 'Inverse Matrix',
          unit: '\\mathbb{R}^{2 \\times 2}',
          description: 'The unique matrix satisfying A A⁻¹ = A⁻¹ A = I.',
          connections: 'Only exists when rows/columns are linearly independent.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Adjust the coefficients of Equation 1 and Equation 2 using sliders. Watch the two lines move on the 2D plane and see the intersection point (solution) update in real time. Switch presets to explore Parallel (No Solution) and Coincident (Infinite Solutions) states.',
};

export default systemsOfEquationsData;
