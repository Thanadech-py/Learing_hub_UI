/**
 * Linear Algebra Topic: Matrices & Operations
 */
const matricesData = {
  id: 'matrices',
  title: 'Matrices & Matrix Operations',
  subtitle:
    'Rectangular arrays of numbers, entry-wise algebra, matrix transpose, symmetry, trace, and identity matrices.',
  level: 'Beginner',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'A matrix is a two-dimensional rectangular array of numbers arranged into m rows and n columns (an m × n matrix). While a matrix can simply store tabular data or pixel intensities in an image, its true mathematical power is that it encodes linear transformations and systems of linear equations.',
    'Basic matrix operations mirror vector algebra: two matrices of identical dimension can be added entry-by-entry, and a matrix can be scaled by multiplying every single entry by a scalar constant.',
    'Operations unique to matrices include the Transpose (flipping a matrix over its main diagonal, swapping rows with columns), the Trace (the sum of entries along the main diagonal), and special matrix structures such as Symmetric, Diagonal, and Identity matrices.',
  ],
  keyConcepts: [
    {
      title: 'Matrix Notation & Dimensions (m × n)',
      content:
        'A matrix A of size m × n has m horizontal rows and n vertical columns. The entry in row i and column j is denoted A_{ij}. A vector with n components is simply an n × 1 column matrix.',
    },
    {
      title: 'The Transpose: Swapping Rows and Columns',
      content:
        'The transpose of an m × n matrix A, written Aᵀ, is an n × m matrix formed by reflecting A over its main diagonal: (Aᵀ)_{ij} = A_{ji}. The first row becomes the first column, the second row becomes the second column, and so on.\n\n' +
        '• A matrix is Symmetric if Aᵀ = A (it is its own reflection).\n' +
        '• Transposing a product reverses the order: (AB)ᵀ = Bᵀ Aᵀ.',
    },
    {
      title: 'The Identity Matrix & Matrix Trace',
      content:
        'The Identity Matrix I_n is a square n × n matrix with ones along the main diagonal and zeros everywhere else. It acts as the multiplicative number "1" for matrices: A · I = I · A = A.\n\n' +
        'The Trace of a square matrix, tr(A), is the sum of its diagonal elements: tr(A) = A₁₁ + A₂₂ + ... + A_nn. Remarkably, the trace equals the sum of all eigenvalues of the matrix!',
    },
  ],
  equations: [
    {
      name: 'Matrix Transpose and Symmetry Condition',
      latex: '(A^T)_{ij} = A_{ji}, \\quad A \\text{ is Symmetric} \\iff A^T = A',
      summary:
        'Defines the transpose operator and the algebraic condition for matrix symmetry.',
      conditions: ['A ∈ ℝ^{m × n}, Aᵀ ∈ ℝ^{n × m}'],
      variables: [
        {
          symbol: 'A^T',
          name: 'Transposed Matrix',
          unit: '\\mathbb{R}^{n \\times m}',
          description: 'The matrix obtained by exchanging rows and columns.',
          connections: '(Aᵀ)ᵀ = A. Transposition preserves diagonal entries.',
        },
        {
          symbol: 'A_{ij}',
          name: 'Entry in Row i, Column j',
          unit: '\\mathbb{R}',
          description: 'The scalar value at grid intersection (i, j).',
          connections: 'Becomes entry (j, i) in the transposed matrix.',
        },
      ],
    },
    {
      name: 'Matrix Trace Property',
      latex: '\\text{tr}(A) = \\sum_{i=1}^n A_{ii} = \\sum_{i=1}^n \\lambda_i',
      summary:
        'The sum of the main diagonal elements of a square matrix, which is invariant under change of basis.',
      conditions: ['A must be a square matrix (n × n)'],
      variables: [
        {
          symbol: '\\text{tr}(A)',
          name: 'Trace of Matrix A',
          unit: '\\mathbb{R}',
          description: 'The scalar sum of diagonal elements A₁₁ + A₂₂ + ... + A_nn.',
          connections: 'Cyclic property: tr(AB) = tr(BA). Equals the sum of all eigenvalues λ_i.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Edit the entries of a 2×2 matrix in real time. Observe how its row and column vectors change, and inspect the dynamically computed Transpose, Trace, and Symmetry properties.',
};

export default matricesData;
