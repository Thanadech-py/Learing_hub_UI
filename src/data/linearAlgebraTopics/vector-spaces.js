/**
 * Linear Algebra Topic: Vector Spaces & Subspaces
 */
const vectorSpacesData = {
  id: 'vector-spaces',
  title: 'Vector Spaces, Subspaces & Basis',
  subtitle:
    'Abstract vector spaces, closure under addition and scaling, dimension, column space, null space, and the Rank-Nullity Theorem.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'A Vector Space is a generalized collection of mathematical objects (which could be geometric arrows, lists of numbers, continuous functions, or polynomials) that can be added together and scaled by numbers while obeying eight algebraic axioms (associativity, commutativity, existence of zero, distributivity, etc.).',
    'A Subspace is a subset of a vector space that is itself a self-contained vector space. To qualify as a subspace, the subset must satisfy three closure conditions: (1) It must contain the zero vector, (2) If you add any two vectors in the subspace, their sum must stay in the subspace, and (3) If you multiply any vector by a scalar, the result must stay in the subspace.',
    'Every matrix A gives rise to fundamental subspaces: the Column Space C(A) (the span of its columns) and the Null Space N(A) (the set of all vectors x mapped to zero: Ax = 0). The Rank-Nullity Theorem unites them, proving that the dimension of the inputs n equals the dimension of the outputs (rank) plus the dimension of the inputs lost to zero (nullity).',
  ],
  keyConcepts: [
    {
      title: 'Basis and Dimension',
      content:
        'A Basis for a vector space V is a set of vectors that is simultaneously:\n' +
        '1. Linearly Independent (no redundant vectors).\n' +
        '2. Spans the entire space V (every vector in V can be constructed from them).\n\n' +
        'The Dimension of a vector space, dim(V), is the unique number of vectors in any basis. While a space has infinitely many different bases, every basis for that space has the exact same number of vectors.',
    },
    {
      title: 'The Column Space C(A) and Null Space N(A)',
      content:
        '• Column Space C(A): All possible outputs Ax. It is the subspace spanned by the column vectors of A. Its dimension is the Rank of matrix A.\n' +
        '• Null Space N(A) (or Kernel): All solutions to the homogeneous equation Ax = 0. Its dimension is the Nullity of matrix A.',
    },
    {
      title: 'The Fundamental Rank-Nullity Theorem',
      content:
        'For any m × n matrix A: rank(A) + nullity(A) = n. Every dimension of the n-dimensional domain space either survives as a dimension in the output space (rank) or is squashed down into the origin (nullity). No dimension is ever unaccounted for.',
    },
  ],
  equations: [
    {
      name: 'The Rank-Nullity Theorem',
      latex: '\\text{rank}(A) + \\text{nullity}(A) = n \\iff \\dim\\big(\\mathcal{C}(A)\\big) + \\dim\\big(\\mathcal{N}(A)\\big) = n',
      summary:
        'The conservation of dimension law in linear algebra connecting the dimension of the column space to the null space.',
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
      name: 'Null Space Definition',
      latex: '\\mathcal{N}(A) = \\{\\mathbf{x} \\in \\mathbb{R}^n \\mid A\\mathbf{x} = \\mathbf{0}\\}',
      summary:
        'The subspace of inputs that are completely flattened to the zero vector by transformation A.',
      conditions: ['Always forms a valid subspace of ℝⁿ'],
      variables: [
        {
          symbol: '\\mathcal{N}(A)',
          name: 'Null Space (Kernel)',
          unit: '\\text{subspace of } \\mathbb{R}^n',
          description: 'The set of all solutions to the homogeneous equation Ax = 0.',
          connections: 'Orthogonal complement to the row space of A: N(A) = (C(Aᵀ))ᗮ.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Toggle between 1D line subspaces and 2D plane subspaces. Adjust basis vectors to test linear independence, and watch the live Rank-Nullity gauge balance rank and nullity as you collapse dimensions.',
};

export default vectorSpacesData;
