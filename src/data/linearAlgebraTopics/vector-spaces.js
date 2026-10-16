/**
 * Linear Algebra Topic: Vector Spaces & Subspaces
 */
const vectorSpacesData = {
  id: 'vector-spaces',
  title: 'Vector Spaces, Subspaces & Basis',
  subtitle:
    'Subspace closure, basis vectors, coordinates in a new basis, Column Space C(A), Null Space N(A), and the Rank-Nullity Theorem.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'A Vector Space is a collection of vectors that can be added together and scaled while obeying eight algebraic axioms. A Subspace is a subset that is closed under addition and scalar multiplication (meaning it MUST pass through the origin 0).',
    'Every m × n matrix A defines two crucial subspaces: the Column Space C(A) (all reachable output vectors b = Ax, spanned by the pivot columns of A) and the Null Space N(A) (all input vectors x that get squashed to zero: Ax = 0).',
    'The Fundamental Rank-Nullity Theorem states that rank(A) + nullity(A) = n (the number of columns): every input dimension either survives in the column space or collapses into the null space.',
  ],
  keyConcepts: [
    {
      title: 'Finding a Basis for the Column Space C(A) via Row Reduction',
      content:
        'Row operations change the column space, so to find a basis for C(A): row-reduce A to Row Echelon Form (REF), identify which columns contain pivots, and take those corresponding ORIGINAL columns of A!',
      exampleLabel: 'Worked Column Space Basis Calculation',
      latex:
        'A = \\begin{bmatrix} 1 & 3 & 2 \\\\ 2 & 6 & 5 \\\\ -1 & -3 & 0 \\end{bmatrix} \\xrightarrow{\\text{REF}} \\begin{bmatrix} \\boxed{1} & 3 & 2 \\\\ 0 & 0 & \\boxed{1} \\\\ 0 & 0 & 0 \\end{bmatrix} \\implies \\text{Basis of } \\mathcal{C}(A) = \\left\\{ \\begin{bmatrix} 1 \\\\ 2 \\\\ -1 \\end{bmatrix}, \\begin{bmatrix} 2 \\\\ 5 \\\\ 0 \\end{bmatrix} \\right\\}, \\; \\text{rank}(A) = 2',
      exampleNote:
        'Pivots appear in Column 1 and Column 3 (notice Column 2 is just 3 × Column 1), so the 1st and 3rd original columns form a basis for the 2D plane C(A).',
    },
    {
      title: 'Computing a Basis for the Null Space N(A) (Solving Ax = 0)',
      content:
        'To find the Null Space N(A), solve the homogeneous matrix equation Ax = 0 by expressing the pivot variables in terms of the free variables and factoring out each free variable into a column vector.',
      exampleLabel: 'Worked Null Space Basis Vector Calculation',
      latex:
        '\\begin{bmatrix} 1 & 3 & 2 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\end{bmatrix} \\implies \\begin{cases} x_3 = 0 \\\\ x_1 = -3x_2 \\end{cases} \\implies \\mathbf{x} = x_2 \\begin{bmatrix} -3 \\\\ 1 \\\\ 0 \\end{bmatrix}, \\; \\text{nullity}(A) = 1',
      exampleNote:
        'Check: Multiplying A by [-3, 1, 0]ᵀ gives (-3)[1, 2, -1]ᵀ + 1[3, 6, -3]ᵀ + 0[2, 5, 0]ᵀ = [0, 0, 0]ᵀ! And rank(2) + nullity(1) = 3 columns.',
    },
    {
      title: 'Change of Basis & Coordinate Vector [v]_B Calculation',
      content:
        'Given a basis B = {b₁, b₂}, the coordinate vector [x]_B = [c₁, c₂]ᵀ tells us what weights of b₁ and b₂ reconstruct x: x = [b₁  b₂][x]_B = P_B [x]_B.',
      exampleLabel: 'Worked Change of Basis Calculation',
      latex:
        '\\mathcal{B} = \\left\\{ \\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix}, \\begin{bmatrix} -1 \\\\ 1 \\end{bmatrix} \\right\\}, \\quad [\\mathbf{x}]_{\\mathcal{B}} = \\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix} \\implies \\mathbf{x} = \\begin{bmatrix} 2 & -1 \\\\ 1 & 1 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix} = 3\\begin{bmatrix} 2 \\\\ 1 \\end{bmatrix} + 2\\begin{bmatrix} -1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix}',
      exampleNote:
        'Conversely, to find [x]_B from standard coordinates x = [4, 5]ᵀ, multiply by the inverse basis matrix: [x]_B = P_B⁻¹ x.',
    },
  ],
  equations: [
    {
      name: 'The Rank-Nullity Theorem',
      latex: '\\text{rank}(A) + \\text{nullity}(A) = n \\iff \\dim\\big(\\mathcal{C}(A)\\big) + \\dim\\big(\\mathcal{N}(A)\\big) = n',
      summary:
        'The conservation of dimension law in linear algebra connecting the dimension of the column space to the null space.',
      exampleDescription: 'Accounting for all n = 4 columns of a 2×4 matrix with 2 pivots',
      exampleLatex:
        'R = \\begin{bmatrix} \\boxed{1} & 2 & 0 & -1 \\\\ 0 & 0 & \\boxed{1} & 4 \\end{bmatrix} \\implies \\underbrace{\\text{rank}(R) = 2}_{\\text{2 pivot cols (}x_1, x_3\\text{)}} + \\underbrace{\\text{nullity}(R) = 2}_{\\text{2 free cols (}x_2, x_4\\text{)}} = 4 \\text{ columns}',
      conditions: ['A is an m × n matrix with n columns (domain dimension)'],
      variables: [
        {
          symbol: '\\text{rank}(A)',
          name: 'Rank of Matrix A',
          unit: '\\mathbb{N}_0',
          description: 'The number of pivot columns / dimension of the column space C(A).',
          connections: 'Maximum possible rank is min(m, n). Full column rank means nullity is 0.',
        },
        {
          symbol: '\\text{nullity}(A)',
          name: 'Nullity of Matrix A',
          unit: '\\mathbb{N}_0',
          description: 'The number of free variables / dimension of the null space N(A).',
          connections: 'If nullity > 0, Ax = b has either 0 or infinitely many solutions.',
        },
        {
          symbol: 'n',
          name: 'Number of Columns (Domain Dimension)',
          unit: '\\mathbb{N}',
          description: 'The total dimensionality of input vectors x in ℝⁿ.',
          connections: 'Partitioned cleanly into rank and nullity.',
        },
      ],
    },
    {
      name: 'Null Space (Kernel) Definition',
      latex: '\\mathcal{N}(A) = \\{\\mathbf{x} \\in \\mathbb{R}^n \\mid A\\mathbf{x} = \\mathbf{0}\\}',
      summary:
        'The subspace of inputs that are completely flattened to the zero vector by transformation A.',
      exampleDescription: 'Parametric vector form of the Null Space for [1, -2, 3]x = 0',
      exampleLatex:
        '\\begin{bmatrix} 1 & -2 & 3 \\end{bmatrix} \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = 0 \\implies x_1 = 2x_2 - 3x_3 \\implies \\begin{bmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{bmatrix} = x_2\\begin{bmatrix} 2 \\\\ 1 \\\\ 0 \\end{bmatrix} + x_3\\begin{bmatrix} -3 \\\\ 0 \\\\ 1 \\end{bmatrix}',
      conditions: ['Always forms a valid subspace of ℝⁿ'],
      variables: [
        {
          symbol: '\\mathcal{N}(A)',
          name: 'Null Space (Kernel)',
          unit: '\\text{subspace of } \\mathbb{R}^n',
          description: 'The set of all column vector solutions to the homogeneous equation Ax = 0.',
          connections: 'Orthogonal complement to the row space of A: N(A) = (C(Aᵀ))ᗮ.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Switch between Full Rank (3D), Rank 2 (2D Plane Column Space + 1D Null Space Line), and Rank 1 in the 3D visualizer to see C(A) and N(A) geometrically.',
};

export default vectorSpacesData;
