/**
 * Linear Algebra Topic: Matrix Multiplication
 */
const matrixMultiplicationData = {
  id: 'matrix-multiplication',
  title: 'Matrix Multiplication & Composition',
  subtitle:
    'Composing transformations, row-by-column inner products, column combination view, and non-commutativity (AB ≠ BA).',
  level: 'Intermediate',
  estimatedTime: '25 min read + interactive lab',
  overview: [
    'Matrix multiplication is NOT entry-by-entry multiplication. Instead, the product C = AB is defined so that multiplying by a vector represents applying two linear transformations sequentially: first applying transformation B, and then applying transformation A to the result: (AB)x = A(Bx).',
    'For the matrix product AB to exist, the number of columns in A must equal the number of rows in B: an (m × k) matrix multiplied by a (k × n) matrix produces an (m × n) matrix. Each entry C_{ij} is the dot product of row i of A with column j of B.',
    'Because the order in which geometric transformations are applied changes the outcome, matrix multiplication is non-commutative: AB ≠ BA in general.',
  ],
  keyConcepts: [
    {
      title: 'Row-by-Column Dot Product Rule (Step-by-Step)',
      content:
        'To compute entry C_{ij} in row i, column j of AB: take row i of A and column j of B, multiply matching elements, and add them together.',
      exampleLabel: 'Worked 2×2 Matrix Multiplication Calculation',
      latex:
        'AB = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & 6 \\\\ 0 & -1 \\end{bmatrix} = \\begin{bmatrix} (1)(5)+(2)(0) & (1)(6)+(2)(-1) \\\\ (3)(5)+(4)(0) & (3)(6)+(4)(-1) \\end{bmatrix} = \\begin{bmatrix} 5 & 4 \\\\ 15 & 14 \\end{bmatrix}',
      exampleNote:
        'Each of the 4 entries in the 2×2 result is an independent dot product between a row of A and a column of B.',
    },
    {
      title: 'Column Picture of Matrix Multiplication: AB = [A b₁  A b₂]',
      content:
        'Equivalently, each column of the product AB is simply matrix A multiplying that corresponding column vector of B! This bridges vector linear combinations directly to matrix-matrix products.',
      exampleLabel: 'Worked Column-by-Column Calculation',
      latex:
        '\\text{Col}_1(AB) = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 5 \\\\ 0 \\end{bmatrix} = 5\\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} + 0\\begin{bmatrix} 2 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 15 \\end{bmatrix}, \\quad \\text{Col}_2(AB) = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}\\begin{bmatrix} 6 \\\\ -1 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 14 \\end{bmatrix}',
      exampleNote:
        'Assembling the two resulting column vectors side-by-side gives AB = [[5, 4], [15, 14]].',
    },
    {
      title: 'Explicit Proof of Non-Commutativity (AB ≠ BA)',
      content:
        'Swapping the multiplication order from AB to BA changes which rows dot with which columns, yielding a completely different matrix.',
      exampleLabel: 'Comparing AB vs. BA with the Exact Same Matrices',
      latex:
        'AB = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\begin{bmatrix} 5 & 6 \\\\ 0 & -1 \\end{bmatrix} = \\begin{bmatrix} 5 & 4 \\\\ 15 & 14 \\end{bmatrix} \\;\\ne\\; BA = \\begin{bmatrix} 5 & 6 \\\\ 0 & -1 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 23 & 34 \\\\ -3 & -4 \\end{bmatrix}',
      exampleNote:
        'Notice that AB and BA do not share a single matching entry, even though their traces tr(AB) = 19 and tr(BA) = 19 are always equal!',
    },
  ],
  equations: [
    {
      name: 'Matrix Product Definition (Row-Column Inner Product)',
      latex: 'C_{ij} = (AB)_{ij} = \\sum_{p=1}^k A_{ip} B_{pj} = \\text{Row}_i(A) \\cdot \\text{Col}_j(B)',
      summary:
        'Computes each entry of the product matrix as the dot product between row i of A and column j of B.',
      exampleDescription: 'Multiplying a 2×3 matrix by a 3×2 matrix to produce a 2×2 matrix',
      exampleLatex:
        '\\begin{bmatrix} 1 & 0 & 2 \\\\ -1 & 3 & 1 \\end{bmatrix} \\begin{bmatrix} 3 & 1 \\\\ 2 & 1 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} 1(3)+0(2)+2(1) & 1(1)+0(1)+2(0) \\\\ -1(3)+3(2)+1(1) & -1(1)+3(1)+1(0) \\end{bmatrix} = \\begin{bmatrix} 5 & 1 \\\\ 4 & 2 \\end{bmatrix}',
      conditions: ['Inner dimensions must match: A is m × k, B is k × n, result C is m × n'],
      variables: [
        {
          symbol: 'C_{ij}',
          name: 'Product Entry in Row i, Column j',
          unit: '\\mathbb{R}',
          description: 'The accumulated scalar value resulting from row-column contraction.',
          connections: 'Depends exclusively on row i of A and column j of B.',
        },
        {
          symbol: 'k',
          name: 'Shared Inner Dimension',
          unit: '\\mathbb{N}',
          description: 'The number of columns in A and the number of rows in B.',
          connections: 'If inner dimensions differ, matrix multiplication is undefined.',
        },
      ],
    },
    {
      name: 'Associative and Transpose Reversal Properties',
      latex: 'A(BC) = (AB)C, \\quad (AB)^T = B^T A^T, \\quad AB \\ne BA \\text{ in general}',
      summary:
        'Fundamental algebraic laws governing matrix multiplication and transposition.',
      exampleDescription: 'Verifying the shoe-sock transpose rule (AB)ᵀ = BᵀAᵀ',
      exampleLatex:
        '(AB)^T = \\begin{bmatrix} 5 & 4 \\\\ 15 & 14 \\end{bmatrix}^T = \\begin{bmatrix} 5 & 15 \\\\ 4 & 14 \\end{bmatrix} = \\begin{bmatrix} 5 & 0 \\\\ 6 & -1 \\end{bmatrix} \\begin{bmatrix} 1 & 3 \\\\ 2 & 4 \\end{bmatrix} = B^T A^T',
      conditions: ['Dimensions must be compatible for all multiplications'],
      variables: [
        {
          symbol: 'A(BC)',
          name: 'Associative Grouping',
          unit: '\\text{matrix}',
          description: 'You can group multiplications in any sequence without changing the result.',
          connections: 'Multiplying A(Bx) (two matrix-vector products) is O(n²) vs O(n³) for (AB)x!',
        },
      ],
    },
  ],
  interactiveGuide:
    'Modify entries of matrices A and B. Watch the live row-by-column computation highlighted step-by-step, and toggle between AB and BA in 3D space.',
};

export default matrixMultiplicationData;
