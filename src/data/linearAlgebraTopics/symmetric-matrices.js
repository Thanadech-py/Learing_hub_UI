/**
 * Linear Algebra Topic: Real Symmetric Matrices & The Spectral Theorem
 * Synthesized from Gilbert Strang (5th Ed., Ch. 6.4) and Kenji Hiranabe (The Art of Linear Algebra)
 */
const symmetricMatricesData = {
  id: 'symmetric-matrices',
  title: 'Symmetric Matrices & The Spectral Theorem',
  subtitle:
    'Real eigenvalues, mutually orthogonal eigenvectors, and the Spectral Decomposition S = QΛQᵀ = ∑ λᵢ qᵢqᵢᵀ into rank-1 projection tiles.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'Real symmetric matrices (S = Sᵀ) are the most important matrices in physics, engineering mechanics, machine learning (covariance matrices), and data science. Their symmetry guarantees extraordinary geometric and algebraic properties.',
    'First, every eigenvalue of a real symmetric matrix is guaranteed to be strictly REAL (no imaginary numbers). Second, eigenvectors originating from distinct eigenvalues are guaranteed to be MUTUALLY PERPENDICULAR (orthogonal). Even for repeated eigenvalues, an orthonormal basis can always be chosen.',
    'This culminations in the celebrated Spectral Theorem: S = QΛQᵀ, where Q is an orthogonal matrix (QᵀQ = I) and Λ is real. Geometrically, this breaks S down into a sum of 1D projection tiles S = λ₁q₁q₁ᵀ + ... + λₙqₙqₙᵀ, proving that symmetric matrices act purely as perpendicular axis stretches with zero shearing.',
  ],
  keyConcepts: [
    {
      title: 'The Two Crown Jewels of Symmetric Matrices',
      content:
        'Theorem 1 (Real Spectrum): If S = Sᵀ is a real matrix, all its eigenvalues λ₁, ..., λₙ are real numbers. Theorem 2 (Perpendicular Eigenvectors): Eigenvectors corresponding to distinct eigenvalues are mutually orthogonal: qᵢᵀqⱼ = 0 for i ≠ j.',
      exampleLabel: 'Proof of Orthogonality: S q₁ = λ₁ q₁ and S q₂ = λ₂ q₂',
      latex:
        '\\lambda_1 (\\mathbf{q}_1^T \\mathbf{q}_2) = (\\lambda_1 \\mathbf{q}_1)^T \\mathbf{q}_2 = (S\\mathbf{q}_1)^T \\mathbf{q}_2 = \\mathbf{q}_1^T S^T \\mathbf{q}_2 = \\mathbf{q}_1^T S \\mathbf{q}_2 = \\mathbf{q}_1^T (\\lambda_2 \\mathbf{q}_2) = \\lambda_2 (\\mathbf{q}_1^T \\mathbf{q}_2) \\implies (\\lambda_1 - \\lambda_2)(\\mathbf{q}_1^T \\mathbf{q}_2) = 0',
      exampleNote:
        'Since λ₁ ≠ λ₂, we must have q₁ᵀq₂ = 0! Thus the eigenvectors are strictly perpendicular.',
    },
    {
      title: 'The Spectral Theorem & Orthonormal Frame Q',
      content:
        'Because the eigenvectors are orthogonal, normalizing them to unit length (||qᵢ|| = 1) forms an orthonormal matrix Q whose inverse is simply its transpose: Q⁻¹ = Qᵀ. Thus A = XΛX⁻¹ simplifies to the symmetric spectral factorization S = QΛQᵀ.',
      exampleLabel: 'Spectral Decomposition for 2×2 Symmetric Matrix',
      latex:
        'S = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix} \\implies \\lambda_1 = 5, \\; \\mathbf{q}_1 = \\frac{1}{\\sqrt{5}}\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}; \\quad \\lambda_2 = 0, \\; \\mathbf{q}_2 = \\frac{1}{\\sqrt{5}}\\begin{bmatrix} -2 \\\\ 1 \\end{bmatrix} \\implies S = Q \\begin{bmatrix} 5 & 0 \\\\ 0 & 0 \\end{bmatrix} Q^T',
      exampleNote:
        'Check: q₁ᵀq₂ = (1/5)[1(-2) + 2(1)] = 0. The matrix Q = [q₁ q₂] is a pure rotation frame!',
    },
    {
      title: 'Hiranabe Projection Tiles: S = ∑ λᵢ qᵢqᵢᵀ',
      content:
        'Multiplying out S = QΛQᵀ row-by-column yields an expansion into rank-1 projection matrices: S = λ₁ (q₁q₁ᵀ) + λ₂ (q₂q₂ᵀ) + ... + λₙ (qₙqₙᵀ). Each piece Pᵢ = qᵢqᵢᵀ is an orthogonal projection matrix onto the 1D eigen-axis qᵢ, scaled by eigenvalue λᵢ.',
      exampleLabel: 'Decomposing Matrix into Outer Products',
      latex:
        'S = 5 \\left(\\frac{1}{5}\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}\\right) + 0 \\left(\\frac{1}{5}\\begin{bmatrix} 4 & -2 \\\\ -2 & 1 \\end{bmatrix}\\right) = \\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}',
      exampleNote:
        'Every symmetric matrix is literally a weighted sum of mutually orthogonal projection tiles.',
    },
    {
      title: '⚡ Fast-Track 7.1: Center & Radius Formula for 2×2 Symmetric Eigenvalues',
      content:
        'For any real symmetric matrix S = [[a, b], [b, c]], the eigenvalues are symmetric about the center m = (a + c)/2 with circle radius R = √[((a - c)/2)² + b²]. Thus λ₁,₂ = m ± R in under 5 seconds without ever solving the full characteristic polynomial.',
      exampleLabel: 'Fast-Track Mental Calculation for S = [[3, 2], [2, 6]]',
      latex:
        'm = \\frac{3+6}{2} = 4.5, \\quad R = \\sqrt{(1.5)^2 + 2^2} = \\sqrt{2.25 + 4} = 2.5 \\implies \\lambda_1 = 7, \\; \\lambda_2 = 2',
      exampleNote:
        'Check: trace = 3 + 6 = 9 = 7 + 2; det = 18 - 4 = 14 = 7 × 2. Zero quadratic equation paperwork needed!',
    },
    {
      title: "Sylvester's Law of Inertia & Pivot-Eigenvalue Sign Preservation",
      content:
        'Elimination on a symmetric matrix yields S = LDLᵀ without row exchanges. Sylvester\'s Law of Inertia states that the number of positive, negative, and zero pivots in D exactly matches the number of positive, negative, and zero eigenvalues of S, even though the exact values differ!',
      exampleLabel: 'Inertia Verification',
      latex:
        '\\text{inertia}(S) = (p, n, z) \\iff \\#\\{\\lambda_i > 0\\} = \\#\\{d_i > 0\\}, \\quad \\#\\{\\lambda_i < 0\\} = \\#\\{d_i < 0\\}',
      exampleNote:
        'This allows checking how many eigenvalues are positive in O(n³) elimination steps, without computing any roots of degree n.',
    },
    {
      title: 'Spectral Functional Calculus & Matrix Power Decoupling',
      content:
        'The orthogonal decomposition S = QΛQᵀ extends to ANY scalar function f: ℝ → ℝ. Applying f to S simply applies f to its eigenvalues: f(S) = Q f(Λ) Qᵀ = ∑ f(λᵢ) qᵢ qᵢᵀ. This instantly provides Sᵏ, S⁻¹, e^{St}, and fractional powers like √S for positive definite matrices.',
      exampleLabel: 'Square Root Matrix Construction',
      latex:
        '\\sqrt{S} = Q \\begin{bmatrix} \\sqrt{\\lambda_1} & 0 \\\\ 0 & \\sqrt{\\lambda_2} \\end{bmatrix} Q^T \\implies (\\sqrt{S})(\\sqrt{S}) = Q \\Lambda Q^T = S',
      exampleNote:
        'The spectral matrix 2-norm is simply the largest eigenvalue in absolute value: ||S||₂ = max |λᵢ|.',
    },
    {
      title: 'Complex Extensions: Hermitian Matrices & Unitary Frames (H = UΛUᴴ)',
      content:
        'Over the complex numbers ℂⁿ, the counterpart of a real symmetric matrix is a Hermitian matrix H = Hᴴ = (H̄)ᵀ. All eigenvalues of a Hermitian matrix are strictly real, and its eigenvectors form a complex unitary basis U satisfying UᴴU = I.',
      exampleLabel: 'Hermitian Diagonalization',
      latex:
        'H = \\begin{bmatrix} 2 & 1-i \\\\ 1+i & 3 \\end{bmatrix} \\implies H^H = H, \\quad \\lambda_1 = 4, \\; \\lambda_2 = 1, \\quad H = U \\begin{bmatrix} 4 & 0 \\\\ 0 & 1 \\end{bmatrix} U^H',
      exampleNote:
        'Hermitian operators represent quantum mechanical observables (energy, momentum), whose measurement outcomes must be real.',
    },
  ],
  equations: [
    {
      name: 'The Spectral Theorem Factorization',
      latex: 'S = Q \\Lambda Q^T = \\sum_{i=1}^n \\lambda_i \\mathbf{q}_i \\mathbf{q}_i^T, \\qquad Q^T Q = Q Q^T = I_n',
      summary:
        'Factorizes any real symmetric matrix into an orthogonal eigenvector matrix Q and real diagonal eigenvalues Λ.',
      exampleDescription: 'Symmetry preserves real eigenvalues across dimensions',
      exampleLatex:
        'S = S^T \\implies Q^{-1} = Q^T, \\quad \\lambda_i \\in \\mathbb{R}, \\quad \\mathbf{q}_i^T \\mathbf{q}_j = \\delta_{ij}',
      conditions: ['S must be a real symmetric matrix (S = Sᵀ)'],
      variables: [
        {
          symbol: 'S',
          name: 'Real Symmetric Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'A matrix identical to its own transpose: sᵢⱼ = sⱼᵢ.',
          connections: 'Always diagonalizable with complete orthogonal basis, never defective.',
        },
        {
          symbol: 'Q',
          name: 'Orthogonal Eigenvector Frame',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Matrix whose columns are unit length, mutually perpendicular eigenvectors.',
          connections: 'Represents a rigid coordinate rotation or reflection: det(Q) = ±1.',
        },
        {
          symbol: '\\mathbf{q}_i \\mathbf{q}_i^T',
          name: 'Rank-1 Projection Tile',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Outer product matrix projecting any vector onto the 1D line along qᵢ.',
          connections: 'Idempotent (Pᵢ² = Pᵢ) and mutually orthogonal (Pᵢ Pⱼ = 0 for i ≠ j).',
        },
      ],
    },
    {
      name: "Sylvester's Law of Inertia & Congruence Invariance",
      latex: 'S = L D L^T, \\quad \\text{Inertia}(S) = (p, n, z) = \\text{Inertia}(C^T S C) \\quad (\\det(C) \\neq 0)',
      summary:
        'Guarantees that pivot signs from Gaussian elimination directly match eigenvalue signs under any congruent basis change.',
      exampleDescription: 'Counting positive/negative roots via pivot signs without root finding',
      exampleLatex:
        'D = \\text{diag}(d_1, \\dots, d_n) \\implies \\#\\{d_i > 0\\} = \\#\\{\\lambda_i > 0\\}, \\quad \\#\\{d_i < 0\\} = \\#\\{\\lambda_i < 0\\}',
      conditions: ['S is real symmetric, C is invertible'],
      variables: [
        {
          symbol: 'D',
          name: 'Pivot Diagonal Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Diagonal matrix of elimination pivots dᵢ from Gaussian elimination.',
          connections: 'Product of pivots equals determinant: det(S) = d₁ ··· dₙ = λ₁ ··· λₙ.',
        },
        {
          symbol: 'L',
          name: 'Unit Lower Triangular Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Lower triangular elimination record with 1s on the diagonal.',
          connections: 'Acts as a congruent transformation matrix S = LDLᵀ.',
        },
      ],
    },
    {
      name: 'Spectral Functional Calculus & Operator Norm',
      latex: 'f(S) = Q f(\\Lambda) Q^T = \\sum_{i=1}^n f(\\lambda_i) \\mathbf{q}_i \\mathbf{q}_i^T, \\qquad \\|S\\|_2 = \\max_i |\\lambda_i|',
      summary:
        'Computes matrix functions and operator norms by directly applying scalar functions to eigenvalues in the orthogonal basis.',
      exampleDescription: 'Decoupled matrix powers and inverse via spectral projectors',
      exampleLatex:
        'S^k = \\sum_{i=1}^n \\lambda_i^k \\mathbf{q}_i \\mathbf{q}_i^T, \\qquad S^{-1} = \\sum_{i=1}^n \\frac{1}{\\lambda_i} \\mathbf{q}_i \\mathbf{q}_i^T',
      conditions: ['f must be defined on the spectrum of S; for S⁻¹, λᵢ ≠ 0'],
      variables: [
        {
          symbol: 'f(S)',
          name: 'Matrix Function Operator',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Evaluation of functions (polynomials, exp, square root, inverse) on symmetric matrices.',
          connections: 'Leaves the eigenvector basis Q completely invariant.',
        },
        {
          symbol: '\\|S\\|_2',
          name: 'Spectral 2-Norm',
          unit: '\\mathbb{R}^+',
          description: 'The maximum vector stretch factor induced by matrix S: sup (||Sx||/||x||).',
          connections: 'Equal to the spectral radius ρ(S) for symmetric matrices.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Manipulate the 3D symmetric frame and inspect the mutually perpendicular eigenvector axes q₁, q₂, q₃. Toggle individual rank-1 projection tiles to see how their sum reconstructs matrix transformation S.',
};

export default symmetricMatricesData;
