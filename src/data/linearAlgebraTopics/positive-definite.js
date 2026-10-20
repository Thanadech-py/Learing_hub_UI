/**
 * Linear Algebra Topic: Positive Definite Matrices & Energy Bowls
 * Synthesized from Gilbert Strang (5th Ed., Ch. 6.5) and Kenji Hiranabe
 */
const positiveDefiniteData = {
  id: 'positive-definite',
  title: 'Positive Definite Matrices & Energy Bowls',
  subtitle:
    'The 5 equivalent tests for S ≻ 0, energy quadratic form xᵀSx > 0, Sylvester determinants, Cholesky factorization S = LLᵀ, and 3D convex paraboloids.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'In machine learning optimization, structural mechanics, and statistics, positive definite matrices (written S ≻ 0) represent stability, strictly positive energy, and convex loss surfaces with unique global minimums.',
    'A symmetric matrix S is Positive Definite if and only if the quadratic form ("energy") E(x) = xᵀSx is strictly positive for every non-zero vector x ≠ 0. If xᵀSx ≥ 0, S is positive semi-definite (S ⪰ 0).',
    'Remarkably, there are Five Equivalent Tests to verify positive definiteness: (1) All eigenvalues are strictly positive (λᵢ > 0), (2) All energy xᵀSx > 0, (3) All pivots in elimination are positive (dᵢ > 0), (4) All leading principal minors have positive determinants (Sylvester criterion), and (5) S factors into S = AᵀA = LLᵀ (Cholesky factorization).',
  ],
  keyConcepts: [
    {
      title: 'The 5 Equivalent Tests for S ≻ 0',
      content:
        'A real symmetric n × n matrix S is positive definite if ANY one (and therefore ALL) of the following 5 tests hold: 1. Energy: xᵀSx > 0 for all x ≠ 0. 2. Eigenvalues: All λᵢ > 0. 3. Pivots: All pivots dₖ > 0 without row swaps. 4. Determinants: All leading principal submatrices have det(Sₖ) > 0. 5. Factorization: S = AᵀA with independent columns, or S = LLᵀ (Cholesky).',
      exampleLabel: 'The 2×2 Fast Test: a > 0 and ac − b² > 0',
      latex:
        'S = \\begin{bmatrix} a & b \\\\ b & c \\end{bmatrix} \\succ 0 \\iff a > 0 \\quad \\text{and} \\quad ac - b^2 > 0',
      exampleNote:
        'For example, [[2, 1], [1, 2]] has a = 2 > 0 and det = 4 − 1 = 3 > 0, so it is strictly positive definite!',
    },
    {
      title: 'Geometric Picture: The 3D Convex Paraboloid Energy Bowl',
      content:
        'Plotting z = E(x, y) = [x y] S [x y]ᵀ = ax² + 2bxy + cy² produces a 3D surface. When S ≻ 0, the graph is a smooth convex bowl opening upward with a unique global minimum at (0, 0). The horizontal level slices xᵀSx = 1 form tilted ellipses whose axes align with the eigenvectors of S with semi-axis lengths 1/√λᵢ.',
      exampleLabel: 'Quadratic Form Expansion',
      latex:
        'E(x_1, x_2) = \\begin{bmatrix} x_1 & x_2 \\end{bmatrix}\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}\\begin{bmatrix} x_1 \\\\ x_2 \\end{bmatrix} = 2x_1^2 + 2x_1 x_2 + 2x_2^2 = (x_1 + x_2)^2 + x_1^2 + x_2^2 > 0',
      exampleNote:
        'If S has a negative eigenvalue, the surface becomes a saddle (indefinite). If all eigenvalues are negative, it is an inverted bowl (negative definite).',
    },
    {
      title: 'Cholesky Factorization: S = L Lᵀ',
      content:
        'Just as every positive real number has a square root, every positive definite matrix has a unique "square root" triangular factorization: S = L Lᵀ, where L is a lower-triangular matrix with strictly positive diagonal entries. Cholesky is twice as fast as LU decomposition and numerically robust without row exchanges.',
      exampleLabel: 'Worked Cholesky Factorization',
      latex:
        'S = \\begin{bmatrix} 4 & 12 \\\\ 12 & 45 \\end{bmatrix} = \\begin{bmatrix} \\ell_{11} & 0 \\\\ \\ell_{21} & \\ell_{22} \\end{bmatrix} \\begin{bmatrix} \\ell_{11} & \\ell_{21} \\\\ 0 & \\ell_{22} \\end{bmatrix} = \\begin{bmatrix} 2 & 0 \\\\ 6 & 3 \\end{bmatrix} \\begin{bmatrix} 2 & 6 \\\\ 0 & 3 \\end{bmatrix}',
      exampleNote:
        'Check: 2×2 = 4, 2×6 = 12, 6² + 3² = 36 + 9 = 45! The diagonal pivots are ℓ₁₁ = 2 and ℓ₂₂ = 3.',
    },
  ],
  equations: [
    {
      name: 'Energy Quadratic Form Definition & Positivity',
      latex: 'x^T S x > 0 \\quad \\forall \\; \\mathbf{x} \\neq \\mathbf{0} \\iff \\lambda_i(S) > 0 \\quad (i = 1, \\dots, n)',
      summary:
        'The defining energy condition establishing positive definiteness, guaranteeing strict convexity and positive eigenvalues.',
      exampleDescription: '2×2 Sylvester Determinants Criterion',
      exampleLatex:
        'S = \\begin{bmatrix} s_{11} & s_{12} \\\\ s_{21} & s_{22} \\end{bmatrix} \\succ 0 \\iff s_{11} > 0 \\quad \\text{and} \\quad s_{11}s_{22} - s_{12}^2 > 0',
      conditions: ['S is real symmetric: S = Sᵀ'],
      variables: [
        {
          symbol: 'x^T S x',
          name: 'Quadratic Energy Form',
          unit: '\\mathbb{R}^+',
          description: 'Scalar energy metric computed by sandwiching matrix S between xᵀ and x.',
          connections: 'Forms the objective function in quadratic programming: f(x) = (1/2)xᵀSx - bᵀx.',
        },
        {
          symbol: 'S \\succ 0',
          name: 'Positive Definite Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Symmetric operator with strictly positive spectrum and positive pivots.',
          connections: 'Gram matrix AᵀA is always positive definite whenever A has independent columns.',
        },
      ],
    },
    {
      name: 'Cholesky Factorization Formula',
      latex: 'S = L L^T = R^T R, \\quad L = \\begin{bmatrix} \\ell_{11} & 0 \\\\ \\ell_{21} & \\ell_{22} \\end{bmatrix}, \\quad \\ell_{ii} = \\sqrt{d_i} > 0',
      summary:
        'The symmetric triangular square-root decomposition of positive definite matrices.',
      exampleDescription: 'Solving S x = b using Cholesky: L y = b then Lᵀ x = y',
      exampleLatex:
        'S\\mathbf{x} = \\mathbf{b} \\iff L(L^T\\mathbf{x}) = \\mathbf{b} \\implies L\\mathbf{y} = \\mathbf{b}, \\quad L^T\\mathbf{x} = \\mathbf{y}',
      conditions: ['S must be symmetric positive definite'],
      variables: [
        {
          symbol: 'L',
          name: 'Lower Triangular Cholesky Factor',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Lower triangular matrix with strictly positive real diagonal entries.',
          connections: 'Requires n³/6 floating-point operations—half the cost of standard LU elimination.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Rotate the 3D energy surface z = xᵀSx and watch how altering matrix entries transforms the geometry between a convex bowl (positive definite), a saddle (indefinite), and an inverted peak (negative definite).',
};

export default positiveDefiniteData;
