/**
 * Linear Algebra Topic: Systems of Linear Equations
 */
const systemsOfEquationsData = {
  id: 'systems-of-equations',
  title: 'Systems of Linear Equations',
  subtitle:
    'Solving Ax = b, Gaussian elimination in augmented matrix form, row echelon form, and Row vs. Column pictures.',
  level: 'Intermediate',
  estimatedTime: '25 min read + interactive lab',
  overview: [
    'A system of linear equations is a collection of linear equations involving the same unknowns. Geometrically, each equation represents a line in 2D or a flat plane in 3D; the solution is the intersection point shared by all equations.',
    'Every linear system can be written in both Matrix Form (Ax = b) and Column Vector Form (x₁a₁ + x₂a₂ + ... + x_n a_n = b). Gaussian Elimination systematically applies elementary row operations to the augmented matrix [A | b] to isolate the solution vector x.',
    'Any linear system has either: (1) Exactly ONE unique solution (det(A) ≠ 0), (2) INFINITELY MANY solutions (redundant equations with free variables), or (3) NO solution (parallel/inconsistent constraints).',
  ],
  keyConcepts: [
    {
      title: 'System of Equations in Matrix Form vs. Column Vector Form',
      content:
        'Consider the system 2x₁ + x₂ = 5 and x₁ - 3x₂ = -1.\n' +
        '• Matrix Form (Row Picture): Multiplies coefficient matrix A by unknown column vector x to equal target vector b.\n' +
        '• Vector Form (Column Picture): Takes a linear combination of the column vectors of A weighted by unknowns x₁ and x₂.',
      exampleLabel: 'Worked Conversion: Simultaneous Equations → Matrix Form → Column Vector Form',
      latex:
        '\\begin{cases} 2x_1 + x_2 = 5 \\\\ x_1 - 3x_2 = -1 \\end{cases} \\iff \\underbrace{\\begin{bmatrix} 2 & 1 \\\\ 1 & -3 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ -1 \\end{bmatrix}}_{\\text{Matrix Form } A\\mathbf{x} = \\mathbf{b}} \\iff \\underbrace{x_1 \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} + x_2 \\begin{bmatrix} 1 \\\\ -3 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ -1 \\end{bmatrix}}_{\\text{Column Vector Form}}',
      exampleNote:
        'Substituting x₁ = 2, x₂ = 1 gives 2[2, 1]ᵀ + 1[1, -3]ᵀ = [4+1, 2-3]ᵀ = [5, -1]ᵀ!',
    },
    {
      title: 'Gaussian Elimination on the Augmented Matrix [A | b]',
      content:
        'Gaussian elimination uses three row operations (Row Swap, Row Scaling, Row Replacement R_i ← R_i + cR_j) to zero out entries below the main diagonal pivots, followed by back-substitution.',
      exampleLabel: 'Worked Augmented Matrix Row-Reduction Calculation',
      latex:
        '\\left[\\begin{array}{cc|c} 1 & 2 & 5 \\\\ 3 & 4 & 11 \\end{array}\\right] \\xrightarrow{R_2 \\leftarrow R_2 - 3R_1} \\left[\\begin{array}{cc|c} 1 & 2 & 5 \\\\ 0 & -2 & -4 \\end{array}\\right] \\xrightarrow{R_2 \\leftarrow -\\frac{1}{2}R_2} \\left[\\begin{array}{cc|c} 1 & 2 & 5 \\\\ 0 & 1 & 2 \\end{array}\\right] \\implies \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}',
      exampleNote:
        'From row 2 we read x₂ = 2; substituting into row 1 gives x₁ + 2(2) = 5 ⇒ x₁ = 1.',
    },
    {
      title: 'Solving Ax = b Using the Matrix Inverse A⁻¹',
      content:
        'When A is square and invertible (det(A) ≠ 0), we can multiply both sides of Ax = b by A⁻¹ on the left to obtain x = A⁻¹b directly.',
      exampleLabel: 'Worked Solution via 2×2 Inverse Matrix Formula',
      latex:
        '\\mathbf{x} = A^{-1}\\mathbf{b} = \\begin{bmatrix} 2 & 1 \\\\ 1 & -3 \\end{bmatrix}^{-1} \\begin{bmatrix} 5 \\\\ -1 \\end{bmatrix} = \\frac{1}{-6 - 1}\\begin{bmatrix} -3 & -1 \\\\ -1 & 2 \\end{bmatrix} \\begin{bmatrix} 5 \\\\ -1 \\end{bmatrix} = -\\frac{1}{7}\\begin{bmatrix} -14 \\\\ -7 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}',
      exampleNote:
        'Here det(A) = (2)(-3) - (1)(1) = -7 ≠ 0, guaranteeing the unique solution vector x = [2, 1]ᵀ.',
    },
  ],
  equations: [
    {
      name: 'Matrix Equation Formulation',
      latex: 'A\\mathbf{x} = \\mathbf{b} \\iff \\begin{bmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = \\begin{bmatrix} b_1 \\\\ b_2 \\end{bmatrix}',
      summary:
        'Standard matrix-vector representation converting simultaneous linear equations into a compact algebraic mapping.',
      exampleDescription: '3×3 Upper-Triangular System Solved by Back-Substitution',
      exampleLatex:
        '\\begin{bmatrix} 1 & 2 & -1 \\\\ 0 & 1 & 3 \\\\ 0 & 0 & 2 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 5 \\\\ 4 \\end{bmatrix} \\implies x_3 = 2, \\; x_2 = 5 - 3(2) = -1, \\; x_1 = 2 - 2(-1) + 2 = 6 \\implies \\mathbf{x} = \\begin{bmatrix} 6 \\\\ -1 \\\\ 2 \\end{bmatrix}',
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
          description: 'The coordinate column vector satisfying all equations simultaneously.',
          connections: 'Found via Gaussian elimination, LU decomposition, or matrix inversion.',
        },
        {
          symbol: '\\mathbf{b}',
          name: 'Target Constraint Vector',
          unit: '\\mathbb{R}^m',
          description: 'The constant terms on the right-hand side of each equation.',
          connections: 'A solution exists if and only if b lies within the column space C(A).',
        },
      ],
    },
    {
      name: 'Invertible Matrix Solution Formula',
      latex: '\\mathbf{x} = A^{-1}\\mathbf{b} = \\frac{1}{ad - bc} \\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix} \\begin{bmatrix} b_1 \\\\ b_2 \\end{bmatrix}',
      summary:
        'Explicit analytical solution for a 2×2 system when the determinant ad - bc is non-zero.',
      exampleDescription: 'Inconsistent System (No Solution) vs. Dependent System (Infinite Solutions)',
      exampleLatex:
        '\\text{No Solution: } \\left[\\begin{array}{cc|c} 1 & 2 & 3 \\\\ 2 & 4 & 9 \\end{array}\\right] \\to \\left[\\begin{array}{cc|c} 1 & 2 & 3 \\\\ 0 & 0 & 3 \\end{array}\\right] \\;(0 = 3\\text{ contradiction!})',
      conditions: ['det(A) = ad - bc ≠ 0'],
      variables: [
        {
          symbol: 'A^{-1}',
          name: 'Inverse Matrix',
          unit: '\\mathbb{R}^{2 \\times 2}',
          description: 'The unique matrix satisfying A A⁻¹ = A⁻¹ A = I.',
          connections: 'Only exists when rows and columns of A are linearly independent.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Adjust the plane/line equations and switch between Unique Intersection, Parallel (No Solution), and Coincident/Line Intersection (Infinite Solutions) in the 3D visualizer.',
};

export default systemsOfEquationsData;
