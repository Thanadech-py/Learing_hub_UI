/**
 * Linear Algebra Topic: Eigenvalues & Eigenvectors
 * Synthesized from Gilbert Strang (5th Ed., Ch. 6) and Kenji Hiranabe (The Art of Linear Algebra)
 */
const eigenvaluesData = {
  id: 'eigenvalues-and-eigenvectors',
  title: 'Eigenvalues & Eigenvectors',
  subtitle:
    'The invariant directions of linear transformations: characteristic equations, trace/det invariants, and 5-second hand calculation fast-tracks.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'While static linear algebra focuses on solving equilibrium systems Ax = b, eigenvalues and eigenvectors unlock dynamical behavior: matrix powers Aᵏ, Markov processes, and differential equations du/dt = Au.',
    'When a square matrix A acts on space, almost all vectors rotate and stretch off their span. However, special non-zero vectors x remain strictly on their original line through the origin: Ax = λx. The scalar multiplier λ is the Eigenvalue, and x is the corresponding Eigenvector.',
    'Eigenvalues satisfy two universal invariants: their sum equals the matrix trace (tr(A)), and their product equals the determinant (det(A)). Furthermore, for 2×2 matrices, eigenvalues can be solved mentally in 5 seconds via the Midpoint & Radius shortcut.',
  ],
  keyConcepts: [
    {
      title: 'The Midpoint & Radius Shortcut for 2×2 Eigenvalues (5-Second Trick)',
      content:
        'Instead of solving quadratic formulas with fractions, find the midpoint m = tr(A)/2 = (a + d)/2 and the determinant p = det(A) = ad − bc. The eigenvalues are immediately λ = m ± √(m² − p).',
      exampleLabel: 'Fast-Track Mental Calculation for A = [[4, 1], [2, 3]]',
      latex:
        'm = \\frac{4+3}{2} = 3.5, \\quad p = 12 - 2 = 10 \\implies m^2 - p = 12.25 - 10 = 2.25 \\implies \\lambda = 3.5 \\pm \\sqrt{2.25} = 3.5 \\pm 1.5 \\implies \\lambda_1 = 5, \\; \\lambda_2 = 2',
      exampleNote:
        'Golden Rules Verification: λ₁ + λ₂ = 5 + 2 = 7 = tr(A), and λ₁ · λ₂ = 5 × 2 = 10 = det(A)!',
    },
    {
      title: 'Instant 2×2 Eigenvectors (Zero Row Operations Needed)',
      content:
        'Since (A − λI) is singular, its rows are linearly dependent. Take the first row [(a − λ), b]. A perpendicular vector whose dot product is zero gives the eigenvector immediately: x = [−b, a − λ]ᵀ or [b, λ − a]ᵀ.',
      exampleLabel: 'Zero-Step Eigenvectors for λ₁ = 5 and λ₂ = 2',
      latex:
        '\\begin{aligned} &\\text{For } \\lambda_1 = 5: \\quad [4-5, \\; 1] = [-1, \\; 1] \\implies \\mathbf{x}_1 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} \\\\[6pt] &\\text{For } \\lambda_2 = 2: \\quad [4-2, \\; 1] = [2, \\; 1] \\implies \\mathbf{x}_2 = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix} \\end{aligned}',
      exampleNote:
        'Check Av₁: [[4,1],[2,3]][1,1]ᵀ = [5,5]ᵀ = 5[1,1]ᵀ. Check Av₂: [[4,1],[2,3]][1,-2]ᵀ = [2,-4]ᵀ = 2[1,-2]ᵀ. Derived with zero row reduction!',
    },
    {
      title: 'Algebraic Multiplicity (AM) vs. Geometric Multiplicity (GM)',
      content:
        'The Algebraic Multiplicity (AM) of λ is its multiplicity as a root of det(A − λI) = 0. The Geometric Multiplicity (GM) is the dimension of the nullspace dim N(A − λI), which is the number of linearly independent eigenvectors for that λ. Always GM ≤ AM. When GM < AM, the matrix is "defective" and cannot be diagonalized.',
      exampleLabel: 'Defective Shear Matrix Example',
      latex:
        'A = \\begin{bmatrix} 3 & 1 \\\\ 0 & 3 \\end{bmatrix} \\implies \\det(A - \\lambda I) = (3-\\lambda)^2 = 0 \\implies \\lambda = 3 \\; (\\text{AM} = 2), \\quad \\text{N}(A - 3I) = \\text{span}\\left(\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix}\\right) \\; (\\text{GM} = 1)',
      exampleNote:
        'Because GM (1) < AM (2), this shear matrix lacks a complete basis of eigenvectors and is non-diagonalizable.',
    },
    {
      title: 'Triangular & Diagonal Matrix Inspection Rule',
      content:
        'For any upper-triangular, lower-triangular, or diagonal matrix, det(A − λI) = (a₁₁ − λ)(a₂₂ − λ)...(aₙₙ − λ) = 0. Therefore, the eigenvalues are simply the entries along the main diagonal!',
      exampleLabel: '1-Second Triangular Inspection',
      latex:
        'A = \\begin{bmatrix} 7 & -2 & 9 \\\\ 0 & -4 & 3 \\\\ 0 & 0 & 5 \\end{bmatrix} \\implies \\lambda_1 = 7, \\; \\lambda_2 = -4, \\; \\lambda_3 = 5',
      exampleNote:
        'No determinant expansion or polynomial factoring required whatsoever.',
    },
    {
      title: 'Matrix Similarity & Spectral Invariance (B = M⁻¹AM)',
      content:
        'Two matrices A and B are similar if B = M⁻¹AM for some invertible change-of-basis matrix M. Crucially, similar matrices share the EXACT same eigenvalues, trace, determinant, and characteristic polynomial. If x is an eigenvector of A with eigenvalue λ, then M⁻¹x is an eigenvector of B with the same λ.',
      exampleLabel: 'Eigenvector Transformation under Similarity',
      latex:
        'A\\mathbf{x} = \\lambda\\mathbf{x} \\implies M^{-1} A (M M^{-1})\\mathbf{x} = \\lambda M^{-1}\\mathbf{x} \\implies B (M^{-1}\\mathbf{x}) = \\lambda (M^{-1}\\mathbf{x})',
      exampleNote:
        'Similarity represents inspecting the exact same underlying physical transformation through a rotated or rescaled coordinate system.',
    },
  ],
  equations: [
    {
      name: 'The Fundamental Eigenvalue-Eigenvector Equation',
      latex: 'A\\mathbf{x} = \\lambda \\mathbf{x} \\iff (A - \\lambda I)\\mathbf{x} = \\mathbf{0}, \\quad \\mathbf{x} \\neq \\mathbf{0}',
      summary:
        'Defines invariant directions x where matrix multiplication by A acts as pure scalar scaling by λ without changing the vector line.',
      exampleDescription: 'Direct verification for A = [[4, 1], [2, 3]] and x = [1, 1]ᵀ',
      exampleLatex:
        '\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 5 \\end{bmatrix} = 5\\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix}',
      conditions: ['x must be a non-zero vector; A is an n × n square matrix'],
      variables: [
        {
          symbol: 'A',
          name: 'Transformation Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Square linear operator acting on vector space ℝⁿ.',
          connections: 'If A is symmetric (A = Aᵀ), all eigenvalues are real and eigenvectors are orthogonal.',
        },
        {
          symbol: '\\mathbf{x}',
          name: 'Eigenvector',
          unit: '\\mathbb{R}^n \\setminus \\{\\mathbf{0}\\}',
          description: 'Direction vector invariant under transformation A.',
          connections: 'Spans a 1D invariant subspace (eigenline) when GM = 1.',
        },
        {
          symbol: '\\lambda',
          name: 'Eigenvalue',
          unit: '\\mathbb{R} \\text{ or } \\mathbb{C}',
          description: 'The scalar dilation factor along the eigenvector direction.',
          connections: 'A is invertible if and only if no eigenvalue is zero (λᵢ ≠ 0 for all i).',
        },
      ],
    },
    {
      name: 'Characteristic Equation & Trace / Determinant Invariants',
      latex: '\\det(A - \\lambda I) = 0, \\qquad \\sum_{i=1}^n \\lambda_i = \\text{tr}(A), \\qquad \\prod_{i=1}^n \\lambda_i = \\det(A)',
      summary:
        'The algebraic determinant condition guaranteeing a non-trivial nullspace, tied directly to the sum and product invariant rules.',
      exampleDescription: 'Midpoint & Radius shortcut for 2×2 characteristic roots',
      exampleLatex:
        '\\lambda^2 - \\text{tr}(A)\\lambda + \\det(A) = 0 \\implies \\lambda = m \\pm \\sqrt{m^2 - p}, \\quad m = \\frac{\\text{tr}(A)}{2}, \\; p = \\det(A)',
      conditions: ['Valid for all square matrices A'],
      variables: [
        {
          symbol: '\\text{tr}(A)',
          name: 'Matrix Trace',
          unit: '\\mathbb{R}',
          description: 'Sum of main diagonal elements: tr(A) = ∑ aᵢᵢ.',
          connections: 'Always invariant under similarity transformations: tr(M⁻¹AM) = tr(A).',
        },
        {
          symbol: '\\det(A)',
          name: 'Determinant of A',
          unit: '\\mathbb{R}',
          description: 'Signed volume scaling factor, equal to the product of all eigenvalues.',
          connections: 'If det(A) = 0, at least one eigenvalue is 0 and the matrix is singular.',
        },
      ],
    },
    {
      name: 'Continuous 2×2 Phase Plane Stability Criterion',
      latex: '\\text{Re}(\\lambda_i) < 0 \\iff \\text{tr}(A) < 0 \\quad \\text{and} \\quad \\det(A) > 0',
      summary:
        'Determines whether continuous systems du/dt = Au spiral stably toward origin (0, 0) directly from trace and determinant invariants.',
      exampleDescription: 'Trace-Determinant discriminant parabola: Δ = tr(A)² - 4 det(A)',
      exampleLatex:
        '\\Delta < 0 \\implies \\text{spiral sink/source}; \\quad \\Delta > 0 \\implies \\text{nodal node}; \\quad \\det(A) < 0 \\implies \\text{saddle point}',
      conditions: ['A is a real 2 × 2 dynamical matrix'],
      variables: [
        {
          symbol: '\\text{tr}(A)',
          name: 'Dynamical Divergence Metric',
          unit: '\\mathbb{R}',
          description: 'Sum of eigenvalues governing rate of expansion or contraction of phase area.',
          connections: 'Must be strictly negative for asymptotic stability.',
        },
        {
          symbol: '\\det(A)',
          name: 'Product Stability Indicator',
          unit: '\\mathbb{R}',
          description: 'Product λ₁λ₂; if negative, eigenvalues have opposite signs creating an unstable saddle.',
          connections: 'Must be strictly positive to ensure eigenvalues share the same real sign.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Rotate or adjust vector x in 3D/2D space and watch the output vector Ax. Notice when x and Ax point along the exact same line, revealing the invariant eigen-axes.',
};

export default eigenvaluesData;
