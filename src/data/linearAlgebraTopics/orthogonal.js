/**
 * Linear Algebra Topic: Orthogonal Projections, Least Squares & QR Factorization
 * Synthesized from Gilbert Strang (5th Ed.) and Kenji Hiranabe (The Art of Linear Algebra)
 */
const orthogonalData = {
  id: 'orthogonal',
  title: 'Projection, Least Squares & QR Factorization',
  subtitle:
    'The geometry of perpendicularity, the Four Fundamental Subspaces, Normal Equations AᵀAx̂ = Aᵀb, and Gram-Schmidt QR decomposition.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'In experimental science, robotics, and machine learning, when fitting a model with more measurements than parameters (an overdetermined m × n system Ax = b with m > n), an exact solution almost never exists because b lies outside the column space C(A).',
    'Linear algebra solves this geometrically by finding the Orthogonal Projection p = Ax̂ of target vector b onto the column space C(A). The residual error vector e = b − Ax̂ must be perpendicular to every column of A, meaning Aᵀ(b − Ax̂) = 0, which yields the famous Normal Equations: AᵀAx̂ = Aᵀb.',
    'By factorizing A into orthonormal columns Q and an upper-triangular matrix R (A = QR via Gram-Schmidt), the normal equations collapse to R x̂ = Qᵀb, solvable instantly by back-substitution with superior numerical stability.',
  ],
  keyConcepts: [
    {
      title: 'The Four Fundamental Subspaces & Orthogonal Complements',
      content:
        'Every m × n matrix A splits vector spaces into orthogonal complement pairs: the Row Space C(Aᵀ) is orthogonal to the Nullspace N(A) in ℝⁿ, and the Column Space C(A) is orthogonal to the Left Nullspace N(Aᵀ) in ℝᵐ. Any vector b can be uniquely decomposed as b = p + e, where p ∈ C(A) and e ∈ N(Aᵀ).',
      exampleLabel: 'Fundamental Subspace Orthogonality Relations',
      latex:
        'C(A^T) \\perp N(A) \\subset \\mathbb{R}^n, \\qquad C(A) \\perp N(A^T) \\subset \\mathbb{R}^m, \\qquad \\mathbf{b} = \\mathbf{p} + \\mathbf{e} \\quad (\\mathbf{p} \\in C(A), \\; \\mathbf{e} \\in N(A^T))',
      exampleNote:
        'Because e lies in N(Aᵀ), we have Aᵀe = Aᵀ(b − p) = 0, which directly proves the Normal Equations!',
    },
    {
      title: 'Orthogonal Projection onto a Line vs. Subspace',
      content:
        'Projecting b onto a single non-zero vector u yields p = [(uᵀb)/(uᵀu)]u with rank-1 projection matrix P = (uuᵀ)/(uᵀu). For a multi-dimensional subspace spanned by the independent columns of A, the projection matrix generalizes to P = A(AᵀA)⁻¹Aᵀ. All projection matrices satisfy Pᵀ = P (symmetric) and P² = P (idempotent).',
      exampleLabel: 'Worked Line Projection & Error Vector',
      latex:
        '\\mathbf{u} = \\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix}, \\; \\mathbf{b} = \\begin{bmatrix} 5 \\\\ 4 \\\\ 2 \\end{bmatrix} \\implies \\mathbf{p} = \\frac{\\mathbf{u}^T\\mathbf{b}}{\\mathbf{u}^T\\mathbf{u}}\\mathbf{u} = \\frac{17}{9}\\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix}, \\quad \\mathbf{e} = \\mathbf{b} - \\mathbf{p} = \\frac{1}{9}\\begin{bmatrix} 28 \\\\ 2 \\\\ -16 \\end{bmatrix}, \\quad \\mathbf{u}^T\\mathbf{e} = 0',
      exampleNote:
        'Outer product uuᵀ is a 3×3 matrix, while inner product uᵀu is a scalar. Notice I − P projects onto the orthogonal complement!',
    },
    {
      title: 'Least Squares Regression & The Zero-Mean Shortcut',
      content:
        'To fit a regression line y = C + Dt through points (tᵢ, yᵢ), solve the overdetermined system Ax ≈ b. When you center the independent variable such that ∑tᵢ = 0, the off-diagonal entries of AᵀA vanish into a diagonal matrix, decoupling C and D into independent single-step averages!',
      exampleLabel: 'Step-by-Step Normal Equations Fit for (0, 1), (1, 3), (2, 4)',
      latex:
        'A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}, \\; \\mathbf{b} = \\begin{bmatrix} 1 \\\\ 3 \\\\ 4 \\end{bmatrix} \\implies A^TA = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}, \\; A^T\\mathbf{b} = \\begin{bmatrix} 8 \\\\ 11 \\end{bmatrix} \\implies \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}\\begin{bmatrix} C \\\\ D \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 11 \\end{bmatrix} \\implies \\mathbf{\\hat{x}} = \\begin{bmatrix} 7/6 \\\\ 3/2 \\end{bmatrix}',
      exampleNote:
        'The best-fit line is y = 7/6 + (3/2)t, minimizing vertical squared residuals ||b − Ax̂||².',
    },
    {
      title: 'Gram-Schmidt Orthonormalization & A = QR Decomposition',
      content:
        'Given linearly independent columns a₁, a₂, ..., Gram-Schmidt constructs an orthonormal basis q₁, q₂ by subtracting out prior projections: q₁ = a₁/||a₁||, and B = a₂ − (q₁ᵀa₂)q₁, q₂ = B/||B||. In matrix form, A = QR where Q has orthonormal columns (QᵀQ = I) and R = QᵀA is upper-triangular.',
      exampleLabel: 'Fast Least Squares via QR (No Matrix Inversion Needed)',
      latex:
        'A = QR \\implies A^TA = (R^TQ^T)(QR) = R^T(Q^TQ)R = R^TR \\implies R^TR\\mathbf{\\hat{x}} = R^TQ^T\\mathbf{b} \\implies R\\mathbf{\\hat{x}} = Q^T\\mathbf{b}',
      exampleNote:
        'Because R is upper-triangular, R x̂ = Qᵀb is solved in seconds using simple back-substitution, avoiding the ill-conditioned (AᵀA)⁻¹ inversion.',
    },
  ],
  equations: [
    {
      name: 'Subspace Projection Matrix & Vector Formula',
      latex: '\\mathbf{p} = P\\mathbf{b}, \\qquad P = A(A^T A)^{-1} A^T, \\qquad P^T = P, \\quad P^2 = P',
      summary:
        'Computes the closest vector p in the column space C(A) to target vector b. The residual vector e = b − p satisfies Aᵀe = 0.',
      exampleDescription: 'Outer-product projection matrix onto a line spanned by u = [1, 2]ᵀ',
      exampleLatex:
        'P = \\frac{\\mathbf{u}\\mathbf{u}^T}{\\mathbf{u}^T\\mathbf{u}} = \\frac{1}{1^2+2^2}\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}\\begin{bmatrix} 1 & 2 \\end{bmatrix} = \\frac{1}{5}\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}',
      conditions: ['Columns of A must be linearly independent for (AᵀA)⁻¹ to exist'],
      variables: [
        {
          symbol: 'P',
          name: 'Projection Matrix',
          unit: '\\mathbb{R}^{m \\times m}',
          description: 'Symmetric and idempotent operator that projects any vector in ℝᵐ onto C(A).',
          connections: 'Eigenvalues of any projection matrix are strictly 1 (on C(A)) or 0 (on N(Aᵀ)).',
        },
        {
          symbol: '\\mathbf{e} = \\mathbf{b} - \\mathbf{p}',
          name: 'Orthogonal Error Vector',
          unit: '\\mathbb{R}^m',
          description: 'The perpendicular line segment from the subspace to vector b.',
          connections: 'Lies in the Left Nullspace N(Aᵀ), satisfying Aᵀe = 0.',
        },
      ],
    },
    {
      name: 'The Normal Equations for Least Squares',
      latex: 'A^T A \\mathbf{\\hat{x}} = A^T \\mathbf{b} \\implies \\mathbf{\\hat{x}} = (A^T A)^{-1} A^T \\mathbf{b}',
      summary:
        'The foundational equation of linear regression and curve fitting, finding parameters x̂ that minimize squared residuals ||Ax − b||².',
      exampleDescription: 'Gram Matrix AᵀA computed from a 3×2 design matrix',
      exampleLatex:
        'A^T A = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix} \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix} = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}',
      conditions: ['A has full column rank n (rank = n)'],
      variables: [
        {
          symbol: '\\mathbf{\\hat{x}}',
          name: 'Optimal Least-Squares Solution',
          unit: '\\mathbb{R}^n',
          description: 'The coefficient vector that minimizes the Euclidean norm ||Ax - b||.',
          connections: 'Equals the exact solution x = A⁻¹b when A is square and invertible.',
        },
        {
          symbol: 'A^T A',
          name: 'Gram Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Symmetric, positive semi-definite matrix of column dot products.',
          connections: 'Strictly positive definite (invertible) when columns of A are linearly independent.',
        },
      ],
    },
    {
      name: 'Gram-Schmidt QR Factorization Solver',
      latex: 'A = QR, \\quad Q^T Q = I_n, \\quad R\\mathbf{\\hat{x}} = Q^T \\mathbf{b}',
      summary:
        'Decomposes A into orthonormal columns Q and upper-triangular R, converting least-squares into a stable back-substitution solve.',
      exampleDescription: 'Upper triangular system solved by back-substitution',
      exampleLatex:
        '\\begin{bmatrix} r_{11} & r_{12} \\\\ 0 & r_{22} \\end{bmatrix}\\begin{bmatrix} \\hat{x}_1 \\\\ \\hat{x}_2 \\end{bmatrix} = \\begin{bmatrix} \\mathbf{q}_1^T\\mathbf{b} \\\\ \\mathbf{q}_2^T\\mathbf{b} \\end{bmatrix}',
      conditions: ['Columns of A are linearly independent'],
      variables: [
        {
          symbol: 'Q',
          name: 'Orthonormal Matrix',
          unit: '\\mathbb{R}^{m \\times n}',
          description: 'Matrix whose columns are unit length and mutually perpendicular (qᵢᵀqⱼ = δᵢⱼ).',
          connections: 'Satisfies QᵀQ = I. Preserves vector lengths: ||Qx|| = ||x||.',
        },
        {
          symbol: 'R',
          name: 'Upper-Triangular Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Matrix recording projection coefficients: rᵢⱼ = qᵢᵀaⱼ.',
          connections: 'Diagonal entries rᵢᵢ = ||Bᵢ|| > 0 when columns of A are independent.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Rotate the 3D space to inspect the subspace plane C(A). Drag target vector b and observe its orthogonal projection p = Pb and perpendicular residual error e = b − p.',
};

export default orthogonalData;
