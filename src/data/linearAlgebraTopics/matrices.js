/**
 * Linear Algebra Topic: Matrices & Operations
 */
const matricesData = {
  id: 'matrices',
  title: 'Matrices & Matrix Operations',
  subtitle:
    'Rectangular arrays of numbers, entry-wise addition and scaling, matrix transpose, symmetry, trace, and identity matrices.',
  level: 'Beginner',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'A matrix is a two-dimensional rectangular array of numbers arranged into m rows and n columns (an m × n matrix). While a matrix can store tabular data, its core mathematical power is encoding linear transformations and systems of linear equations.',
    'Basic matrix operations mirror vector algebra: two matrices of identical dimensions (m × n) are added or subtracted entry-by-entry, and scalar multiplication multiplies every entry of the matrix by a constant c.',
    'Operations unique to matrices include the Transpose Aᵀ (reflecting a matrix across its main diagonal so rows become columns), the Trace tr(A) (the sum of diagonal entries), and decomposing any square matrix into Symmetric and Skew-Symmetric parts.',
  ],
  keyConcepts: [
    {
      title: 'Entry-Wise Matrix Addition & Scalar Multiplication',
      content:
        'Two matrices A and B can be added or subtracted if and only if they have the exact same dimensions (m × n). Scalar multiplication cA multiplies every entry A_{ij} by c.',
      exampleLabel: 'Worked Matrix Addition & Scaling Calculation',
      latex:
        '2A - B = 2\\begin{bmatrix} 3 & -1 \\\\ 0 & 4 \\end{bmatrix} - \\begin{bmatrix} 1 & 5 \\\\ -2 & 3 \\end{bmatrix} = \\begin{bmatrix} 6 & -2 \\\\ 0 & 8 \\end{bmatrix} - \\begin{bmatrix} 1 & 5 \\\\ -2 & 3 \\end{bmatrix} = \\begin{bmatrix} 6-1 & -2-5 \\\\ 0-(-2) & 8-3 \\end{bmatrix} = \\begin{bmatrix} 5 & -7 \\\\ 2 & 5 \\end{bmatrix}',
      exampleNote:
        'First multiply every entry of A by scalar 2, then subtract the corresponding entries of B at each (row, column) position.',
    },
    {
      title: 'The Transpose (Aᵀ) & Symmetric Decomposition',
      content:
        'The transpose Aᵀ swaps row i with column i: (Aᵀ)_{ij} = A_{ji}. Any square matrix A can be decomposed into a Symmetric matrix S = ½(A + Aᵀ) and a Skew-Symmetric matrix K = ½(A - Aᵀ).',
      exampleLabel: 'Worked Transpose & Symmetric Matrix Calculation',
      latex:
        'A = \\begin{bmatrix} 2 & 6 & -1 \\\\ 0 & 5 & 3 \\end{bmatrix} \\implies A^T = \\begin{bmatrix} 2 & 0 \\\\ 6 & 5 \\\\ -1 & 3 \\end{bmatrix}, \\qquad S = \\begin{bmatrix} 4 & -3 \\\\ -3 & 7 \\end{bmatrix} = S^T \\;(\\text{Symmetric})',
      exampleNote:
        'Notice how the 2×3 matrix A becomes a 3×2 matrix Aᵀ when rows and columns are interchanged.',
    },
    {
      title: 'The Identity Matrix (I_n) & Matrix Trace tr(A)',
      content:
        'The Identity Matrix I_n has 1s on its main diagonal and 0s everywhere else, satisfying AI = IA = A. The Trace tr(A) sums the main diagonal entries and equals the sum of the eigenvalues.',
      exampleLabel: 'Worked 3×3 Trace & Identity Matrix Calculation',
      latex:
        'A = \\begin{bmatrix} 4 & -2 & 7 \\\\ 3 & -1 & 0 \\\\ 5 & 8 & 6 \\end{bmatrix} \\implies \\text{tr}(A) = 4 + (-1) + 6 = 9, \\qquad I_3 = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}',
      exampleNote:
        'Only the main diagonal entries (A₁₁ = 4, A₂₂ = -1, A₃₃ = 6) contribute to tr(A) = 9.',
    },
  ],
  equations: [
    {
      name: 'Matrix Transpose and Symmetry Condition',
      latex: '(A^T)_{ij} = A_{ji}, \\quad A \\text{ is Symmetric} \\iff A^T = A',
      summary:
        'Defines the transpose operator and the algebraic condition for matrix symmetry.',
      exampleDescription: 'Computing A + Aᵀ to construct a guaranteed symmetric matrix',
      exampleLatex:
        'A = \\begin{bmatrix} 1 & 4 \\\\ -2 & 3 \\end{bmatrix}, \\quad A^T = \\begin{bmatrix} 1 & -2 \\\\ 4 & 3 \\end{bmatrix} \\implies A + A^T = \\begin{bmatrix} 2 & 2 \\\\ 2 & 6 \\end{bmatrix} \\;\\;(\\text{Symmetric since } A_{12}=A_{21}=2)',
      conditions: ['A ∈ ℝ^{m × n}, Aᵀ ∈ ℝ^{n × m}'],
      variables: [
        {
          symbol: 'A^T',
          name: 'Transposed Matrix',
          unit: '\\mathbb{R}^{n \\times m}',
          description: 'The matrix obtained by exchanging rows and columns.',
          connections: '(Aᵀ)ᵀ = A. Transposition preserves main diagonal entries.',
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
      name: 'Matrix Trace Formula',
      latex: '\\text{tr}(A) = \\sum_{i=1}^n A_{ii} = A_{11} + A_{22} + \\dots + A_{nn} = \\sum_{i=1}^n \\lambda_i',
      summary:
        'The sum of the main diagonal elements of a square matrix, which is invariant under change of basis.',
      exampleDescription: 'Linearity of Trace: tr(2A + B) = 2 tr(A) + tr(B)',
      exampleLatex:
        '\\text{tr}\\left(\\begin{bmatrix} 5 & 9 \\\\ -3 & 2 \\end{bmatrix}\\right) = 5 + 2 = 7, \\qquad \\text{tr}(I_3) = 1 + 1 + 1 = 3',
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
    'Edit the entries of matrix A in real time. Observe how its column vectors transform 3D space, and inspect the dynamically computed Transpose, Trace, and Symmetry properties.',
};

export default matricesData;
