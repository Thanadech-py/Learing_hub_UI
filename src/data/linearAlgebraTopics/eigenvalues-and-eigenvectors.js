/**
 * Linear Algebra Topic: Eigenvalues & Eigenvectors
 */
const eigenvaluesData = {
  id: 'eigenvalues-and-eigenvectors',
  title: 'Eigenvalues & Eigenvectors',
  subtitle:
    'The invariant directions of linear transformations: vectors that never rotate, characteristic equations, and diagonalization.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'When a matrix transforms space, it typically rotates, stretches, and skews vectors in complicated directions. However, almost every matrix possesses a few privileged, special directions where vectors do NOT rotate at all—they remain along their original line, merely stretching, shrinking, or reversing in place.',
    'These invariant directions are called Eigenvectors (from the German "eigen" meaning "characteristic" or "own"). The scalar factor by which an eigenvector is stretched or shrunk is called its Eigenvalue λ: Av = λv.',
    'Finding eigenvalues and eigenvectors diagonalizes the matrix into A = P Λ P⁻¹, turning complicated coupled interactions into independent, uncoupled 1D scalings. This concept underpins quantum mechanics (energy levels are eigenvalues of the Hamiltonian), facial recognition (Eigenfaces), Google’s PageRank algorithm, bridge resonance frequencies, and Principal Component Analysis (PCA).',
  ],
  keyConcepts: [
    {
      title: 'The Fundamental Eigen-Equation: Av = λv',
      content:
        'A non-zero vector v is an eigenvector of matrix A with eigenvalue λ if transforming v with A is identical to simply multiplying v by the scalar number λ. If λ > 1, the vector stretches; if 0 < λ < 1, it shrinks; if λ < 0, it reverses direction; if λ = 0, the vector lies in the null space of A.',
    },
    {
      title: 'The Characteristic Equation: det(A - λI) = 0',
      content:
        'Rearranging Av = λv gives: (A - λI)v = 0. For this homogeneous system to have non-zero solutions for v, the matrix (A - λI) must squash space and be non-invertible! Therefore, its determinant must be zero: det(A - λI) = 0. This produces an n-th degree polynomial in λ whose roots are the eigenvalues of A.',
    },
    {
      title: 'Matrix Diagonalization: A = P Λ P⁻¹',
      content:
        'If an n × n matrix has n linearly independent eigenvectors, we can assemble them as the columns of matrix P. Then A = P Λ P⁻¹, where Λ is a diagonal matrix containing the eigenvalues. Computing high powers of A becomes trivial: Aᵏ = P Λᵏ P⁻¹, where Λᵏ simply raises each individual eigenvalue to the k-th power!',
    },
  ],
  equations: [
    {
      name: 'Eigenvalue-Eigenvector Definition',
      latex: 'A\\mathbf{v} = \\lambda \\mathbf{v} \\iff (A - \\lambda I)\\mathbf{v} = \\mathbf{0}',
      summary:
        'The condition where matrix transformation A acts on vector v as pure scalar scaling by factor λ.',
      conditions: ['v must be a non-zero vector (v ≠ 0)'],
      variables: [
        {
          symbol: 'A',
          name: 'Transformation Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'The square matrix acting on vector space ℝⁿ.',
          connections: 'Symmetric matrices (A = Aᵀ) always have real eigenvalues and mutually orthogonal eigenvectors.',
        },
        {
          symbol: '\\mathbf{v}',
          name: 'Eigenvector',
          unit: '\\mathbb{R}^n \\setminus \\{\\mathbf{0}\\}',
          description: 'A special direction vector that remains collinear with its transformed image Av.',
          connections: 'Any scalar multiple c·v is also an eigenvector with the same eigenvalue.',
        },
        {
          symbol: '\\lambda',
          name: 'Eigenvalue (Scaling Factor)',
          unit: '\\mathbb{C} \\text{ or } \\mathbb{R}',
          description: 'The scalar multiplier along the eigenvector direction.',
          connections: 'Found by solving the characteristic polynomial det(A - λI) = 0.',
        },
      ],
    },
    {
      name: 'Characteristic Polynomial Equation',
      latex: '\\det(A - \\lambda I) = 0 \\iff \\lambda^2 - \\text{tr}(A)\\lambda + \\det(A) = 0 \\quad (\\text{for } 2 \\times 2)',
      summary:
        'The polynomial equation whose roots are the exact eigenvalues of matrix A.',
      conditions: ['A is a 2×2 square matrix'],
      variables: [
        {
          symbol: '\\text{tr}(A)',
          name: 'Trace of A',
          unit: '\\mathbb{R}',
          description: 'Sum of diagonal elements A₁₁ + A₂₂, which equals λ₁ + λ₂.',
          connections: 'The coefficient of the linear term -tr(A)λ.',
        },
        {
          symbol: '\\det(A)',
          name: 'Determinant of A',
          unit: '\\mathbb{R}',
          description: 'The product of all eigenvalues: det(A) = λ₁ · λ₂.',
          connections: 'If det(A) = 0, at least one eigenvalue is zero (non-invertible).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Rotate the test vector x around the coordinate plane. Watch where the transformed vector Ax lands. When x aligns with an Eigenvector, x and Ax become perfectly collinear (parallel) and glow bright green, revealing the eigenvalue λ = ||Ax|| / ||x||!',
};

export default eigenvaluesData;
