/**
 * Linear Algebra Topic: Matrix Multiplication
 */
const matrixMultiplicationData = {
  id: 'matrix-multiplication',
  title: 'Matrix Multiplication & Composition',
  subtitle:
    'Composing transformations, row-by-column inner products, non-commutativity (AB ≠ BA), and associativity.',
  level: 'Intermediate',
  estimatedTime: '25 min read + interactive lab',
  overview: [
    'Matrix multiplication is not entry-by-entry multiplication. Instead, the product C = AB is defined such that multiplying a matrix by a vector represents applying two linear transformations sequentially: first applying transformation B, and then applying transformation A to the result.',
    'For the matrix product AB to exist, the number of columns in A must strictly match the number of rows in B: an (m × k) matrix multiplied by a (k × n) matrix produces an (m × n) matrix. Each entry C_{ij} is computed as the dot product of the i-th row of A with the j-th column of B.',
    'Because the order in which geometric transformations are applied changes the final physical outcome (for example, rotating 90° and then reflecting produces a completely different result than reflecting first and then rotating!), matrix multiplication is strictly non-commutative: AB ≠ BA in general.',
  ],
  keyConcepts: [
    {
      title: 'Row-by-Column Dot Product Rule',
      content:
        'To find the entry in row i, column j of C = AB: take row i of matrix A, take column j of matrix B, multiply matching elements together, and sum them up: C_{ij} = ∑_{p=1}^k A_{ip} B_{pj}.',
    },
    {
      title: 'Geometric Interpretation: Composition of Transformations',
      content:
        'If matrix B performs a shear and matrix A performs a rotation, the product matrix C = AB performs the combined transformation: (AB)x = A(Bx). The rightmost matrix B acts first on the vector x, and matrix A acts second.',
    },
    {
      title: 'Non-Commutativity (AB ≠ BA)',
      content:
        'Unlike ordinary numbers where 3 × 5 = 5 × 3, for matrices AB is almost NEVER equal to BA! In fact, if A is 2 × 3 and B is 3 × 2, AB is a 2 × 2 matrix while BA is a 3 × 3 matrix—they do not even have the same dimensions! Even when both are square matrices of the same size, AB and BA represent different transformation orders.',
    },
  ],
  equations: [
    {
      name: 'Matrix Product Definition',
      latex: 'C_{ij} = (AB)_{ij} = \\sum_{p=1}^k A_{ip} B_{pj} = A_{i,:} \\cdot B_{:,j}',
      summary:
        'Computes each entry of the product matrix as the dot product between a row of A and a column of B.',
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
      name: 'Associative and Transpose Properties',
      latex: 'A(BC) = (AB)C, \\quad (AB)^T = B^T A^T, \\quad AB \\ne BA \\text{ in general}',
      summary:
        'Fundamental algebraic properties governing matrix operations and order of evaluation.',
      conditions: ['Dimensions must be compatible for all multiplications'],
      variables: [
        {
          symbol: 'A(BC)',
          name: 'Associative Grouping',
          unit: '\\text{matrix}',
          description: 'You can group multiplications in any sequence without changing the result.',
          connections: 'Crucial for computational efficiency: multiplying chain ABC can be 100× faster depending on parentheses order!',
        },
      ],
    },
  ],
  interactiveGuide:
    'Modify entries of matrices A and B. Watch the live row-by-column computation highlighted step-by-step, and toggle the comparison view to visually see why AB ≠ BA.',
};

export default matrixMultiplicationData;
