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
  ],
  interactiveGuide:
    'Manipulate the 3D symmetric frame and inspect the mutually perpendicular eigenvector axes q₁, q₂, q₃. Toggle individual rank-1 projection tiles to see how their sum reconstructs matrix transformation S.',
};

export default symmetricMatricesData;
