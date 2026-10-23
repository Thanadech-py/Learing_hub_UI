/**
 * Linear Algebra Topic: Singular Value Decomposition (SVD) & Pseudoinverse
 * Synthesized from Gilbert Strang (5th Ed., Ch. 7) and Kenji Hiranabe (The Art of Linear Algebra)
 */
const svdData = {
  id: 'svd',
  title: 'Singular Value Decomposition (SVD)',
  subtitle:
    'The crowning theorem of linear algebra: A = UΣVᵀ, singular values σᵢ, sphere-to-ellipsoid mapping, low-rank compression, and Moore-Penrose pseudoinverse A⁺.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'While standard diagonalization A = XΛX⁻¹ is restricted only to square matrices with a full set of eigenvectors, the Singular Value Decomposition (SVD) is the universal factorization that applies to ANY matrix—square or rectangular, full-rank or deficient.',
    'For any m × n real matrix A of rank r, SVD factorizes A into three geometric stages: A = UΣVᵀ. Here, V is an n × n orthogonal matrix (right singular vectors), Σ is an m × n diagonal matrix containing sorted non-negative singular values σ₁ ≥ σ₂ ≥ ... ≥ σᵣ > 0, and U is an m × m orthogonal matrix (left singular vectors).',
    'Geometrically, SVD reveals that every linear transformation maps an orthonormal basis v₁, ..., vₙ in the domain into orthogonal axes σ₁u₁, ..., σᵣuᵣ in the codomain. A unit sphere is rotated by Vᵀ, stretched along axes by Σ, and rotated again by U into a hyper-ellipsoid.',
  ],
  keyConcepts: [
    {
      title: 'The SVD Formula: A = UΣVᵀ = ∑ σᵢ uᵢ vᵢᵀ',
      content:
        'SVD represents A as a sum of r rank-1 matrices: A = σ₁ u₁v₁ᵀ + σ₂ u₂v₂ᵀ + ... + σᵣ uᵣvᵣᵀ. The columns of V are the orthonormal eigenvectors of the symmetric matrix AᵀA (AᵀA vᵢ = σᵢ² vᵢ), and the columns of U are the orthonormal eigenvectors of AAᵀ (uᵢ = Avᵢ / σᵢ).',
      exampleLabel: 'Singular Values Relationship to Eigenvalues',
      latex:
        '\\sigma_i = \\sqrt{\\lambda_i(A^T A)} = \\sqrt{\\lambda_i(A A^T)}, \\qquad A\\mathbf{v}_i = \\sigma_i \\mathbf{u}_i \\quad (i = 1, \\dots, r)',
      exampleNote:
        'Because AᵀA is always symmetric and positive semi-definite, its eigenvalues are guaranteed to be real and non-negative (λᵢ ≥ 0), making singular values σᵢ real and non-negative!',
    },
    {
      title: 'Geometric Interpretation: Sphere to Ellipsoid Mapping',
      content:
        'Consider the unit sphere in ℝⁿ defined by ||x|| = 1. Applying transformation A = UΣVᵀ transforms this sphere through three steps: 1. Rotate coordinates rigidly via Vᵀ (preserving angles and lengths). 2. Stretch each orthogonal axis by factor σᵢ via Σ. 3. Rotate and align with the codomain axes via U into an ellipsoid in ℝᵐ with semi-axis lengths σᵢ along directions uᵢ.',
      exampleLabel: 'Three-Stage Decomposition',
      latex:
        '\\text{Unit Sphere } \\{ \\mathbf{x} : \\|\\mathbf{x}\\| = 1 \\} \\xrightarrow{V^T} \\text{Rotated Sphere} \\xrightarrow{\\Sigma} \\text{Axis-Aligned Ellipsoid} \\xrightarrow{U} \\text{Target Ellipsoid in } \\mathbb{R}^m',
      exampleNote:
        'The largest singular value σ₁ represents the matrix 2-norm: ||A||₂ = σ₁, which is the maximum stretch factor across all unit vectors.',
    },
    {
      title: 'Low-Rank Data Compression (Eckart-Young Theorem)',
      content:
        'By truncating the sum to the top k singular values (k < r), Aₖ = ∑_{i=1}^k σᵢ uᵢ vᵢᵀ produces the absolute best rank-k approximation to matrix A in both Frobenius and spectral norms. This is the mathematical core of image compression, Principal Component Analysis (PCA), and recommender systems.',
      exampleLabel: 'Low-Rank Truncation',
      latex:
        'A_k = \\sum_{i=1}^k \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T, \\qquad \\min_{\\text{rank}(B) \\le k} \\|A - B\\|_2 = \\|A - A_k\\|_2 = \\sigma_{k+1}',
      exampleNote:
        'The approximation error is simply the first omitted singular value σₖ₊₁! Keeping a few dominant terms captures over 95% of the information.',
    },
    {
      title: 'The Moore-Penrose Pseudoinverse A⁺',
      content:
        'When matrix A is rectangular or non-invertible, the Moore-Penrose pseudoinverse A⁺ = V Σ⁺ Uᵀ provides the universal generalization of the inverse. In Σ⁺, every non-zero singular value σᵢ is replaced by 1/σᵢ. For any system Ax = b, x⁺ = A⁺b gives the unique shortest minimum-norm least-squares solution.',
      exampleLabel: 'Pseudoinverse Matrix Formula',
      latex:
        'A^+ = V \\Sigma^+ U^T = \\sum_{i=1}^r \\frac{1}{\\sigma_i} \\mathbf{v}_i \\mathbf{u}_i^T, \\qquad A A^+ A = A, \\quad A^+ A A^+ = A^+',
      exampleNote:
        'If A has independent columns, A⁺ = (AᵀA)⁻¹Aᵀ (the exact normal equations least-squares projector!). If A is invertible, A⁺ = A⁻¹.',
    },
    {
      title: 'The Gram Bridge & SVD Construction: AᵀA and AAᵀ',
      content:
        'To construct SVD without circular definitions, multiply A by its transpose: AᵀA = (VΣᵀUᵀ)(UΣVᵀ) = V(ΣᵀΣ)Vᵀ. Because AᵀA is symmetric positive semidefinite, its orthonormal eigenvectors are PRECISELY the right singular vectors vᵢ, and its eigenvalues are the squared singular values λᵢ = σᵢ²! The left singular vectors follow as uᵢ = (1/σᵢ)Avᵢ.',
      exampleLabel: 'The 3-Step SVD Construction Algorithm',
      latex:
        'A^T A \\mathbf{v}_i = \\sigma_i^2 \\mathbf{v}_i, \\quad \\sigma_i = \\sqrt{\\lambda_i(A^T A)}, \\quad \\mathbf{u}_i = \\frac{1}{\\sigma_i} A \\mathbf{v}_i \\quad (i = 1, \\dots, r)',
      exampleNote:
        'This connects SVD directly to the Spectral Theorem for symmetric matrices (Volume 07 & 08).',
    },
  ],
  equations: [
    {
      name: 'Singular Value Decomposition (SVD)',
      latex: 'A = U \\Sigma V^T = \\sum_{i=1}^r \\sigma_i \\mathbf{u}_i \\mathbf{v}_i^T, \\qquad U^T U = I_m, \\quad V^T V = I_n',
      summary:
        'The universal matrix factorization decomposing any real matrix into left singular vectors U, singular values Σ, and right singular vectors V.',
      exampleDescription: 'Right and Left singular vector transformations',
      exampleLatex:
        'A \\mathbf{v}_i = \\sigma_i \\mathbf{u}_i, \\quad A^T \\mathbf{u}_i = \\sigma_i \\mathbf{v}_i, \\quad \\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0',
      conditions: ['Valid for ANY real m × n matrix (square, rectangular, rank-deficient)'],
      variables: [
        {
          symbol: 'U',
          name: 'Left Singular Vectors Matrix',
          unit: '\\mathbb{R}^{m \\times m}',
          description: 'Orthogonal matrix of eigenvectors of AAᵀ, spanning the output space ℝᵐ.',
          connections: 'First r columns form an orthonormal basis for the column space C(A).',
        },
        {
          symbol: '\\Sigma',
          name: 'Singular Value Diagonal Matrix',
          unit: '\\mathbb{R}^{m \\times n}',
          description: 'Diagonal matrix holding non-negative singular values σᵢ along the main diagonal.',
          connections: 'Number of non-zero singular values equals the exact rank r of matrix A.',
        },
        {
          symbol: 'V',
          name: 'Right Singular Vectors Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'Orthogonal matrix of eigenvectors of AᵀA, spanning the input domain ℝⁿ.',
          connections: 'First r columns form an orthonormal basis for the row space C(Aᵀ).',
        },
      ],
    },
    {
      name: 'Moore-Penrose Pseudoinverse & Least Squares',
      latex: 'A^+ = V \\Sigma^+ U^T, \\qquad \\mathbf{x}^+ = A^+ \\mathbf{b} = \\sum_{i=1}^r \\frac{\\mathbf{u}_i^T \\mathbf{b}}{\\sigma_i} \\mathbf{v}_i',
      summary:
        'Computes the unique minimum-norm least-squares solution to overdetermined, underdetermined, or singular linear systems.',
      exampleDescription: 'Inverting singular values along the diagonal',
      exampleLatex:
        '\\Sigma = \\begin{bmatrix} \\sigma_1 & 0 \\\\ 0 & \\sigma_2 \\\\ 0 & 0 \\end{bmatrix} \\implies \\Sigma^+ = \\begin{bmatrix} 1/\\sigma_1 & 0 & 0 \\\\ 0 & 1/\\sigma_2 & 0 \\end{bmatrix}',
      conditions: ['Singular values σᵢ > 0 are inverted; zero entries remain zero'],
      variables: [
        {
          symbol: 'A^+',
          name: 'Pseudoinverse Matrix',
          unit: '\\mathbb{R}^{n \\times m}',
          description: 'The generalized inverse satisfying the four Moore-Penrose algebraic conditions.',
          connections: 'When A is square and non-singular, A⁺ = A⁻¹.',
        },
        {
          symbol: '\\mathbf{x}^+',
          name: 'Minimum-Norm Least-Squares Solution',
          unit: '\\mathbb{R}^n',
          description: 'The solution vector minimizing ||Ax - b|| that simultaneously minimizes ||x||.',
          connections: 'Resolves rank-deficient systems where normal equations fail due to non-invertibility.',
        },
      ],
    },
    {
      name: 'Singular Vector Subspace Decomposition',
      latex: 'A \\mathbf{v}_i = \\sigma_i \\mathbf{u}_i \\; (i \\le r), \\quad A \\mathbf{v}_j = \\mathbf{0} \\; (j > r), \\quad C(A) = \\text{span}(\\mathbf{u}_1, \\dots, \\mathbf{u}_r)',
      summary:
        'Maps orthogonal unit vectors vᵢ directly to orthogonal vectors uᵢ scaled by σᵢ, reading off the 4 fundamental subspaces.',
      exampleDescription: 'Reading the 4 subspaces from SVD columns',
      exampleLatex:
        '\\mathbf{v}_1, \\dots, \\mathbf{v}_r \\in C(A^T); \\quad \\mathbf{v}_{r+1}, \\dots, \\mathbf{v}_n \\in N(A); \\quad \\mathbf{u}_1, \\dots, \\mathbf{u}_r \\in C(A); \\quad \\mathbf{u}_{r+1}, \\dots, \\mathbf{u}_m \\in N(A^T)',
      conditions: ['r = rank(A) ≤ min(m, n)'],
      variables: [
        {
          symbol: '\\mathbf{v}_i',
          name: 'Right Singular Basis Vector',
          unit: '\\mathbb{R}^n',
          description: 'Eigenvector of AᵀA; first r span the row space, remaining n-r span the nullspace.',
          connections: 'Guaranteed mutually orthogonal with unit norm: ||vᵢ|| = 1.',
        },
        {
          symbol: '\\mathbf{u}_i',
          name: 'Left Singular Basis Vector',
          unit: '\\mathbb{R}^m',
          description: 'Eigenvector of AAᵀ; first r span the column space, remaining m-r span the left nullspace.',
          connections: 'Forms the output orthonormal frame for the transformed ellipsoid.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Watch the 3D pipeline transform a sphere into an ellipsoid: step through right rotation Vᵀ, axis scaling Σ, and left rotation U. Inspect how each singular value σᵢ stretches space.',
};

export default svdData;
