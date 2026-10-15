/**
 * Linear Algebra Topic: Linear Combinations & Span
 */
const linearCombinationsData = {
  id: 'linear-combinations',
  title: 'Linear Combinations & Span',
  subtitle:
    'Scaling and adding vectors, vector space spanning sets, linear independence vs. dependence, and building coordinate systems.',
  level: 'Beginner',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'A linear combination is the fundamental operation of linear algebra: taking a set of vectors, scaling each by a scalar constant, and adding the results together: w = c₁v₁ + c₂v₂ + ... + c_k v_k.',
    'The Span of a set of vectors is the collection of ALL possible linear combinations that can be reached by varying the scalars across all real numbers. If two 2D vectors point in different directions, their span covers the entire two-dimensional plane ℝ².',
    'If one vector can already be reached by a combination of the others, it provides no new directional freedom—the set is Linearly Dependent. If no vector in the set can be created from the others, the set is Linearly Independent, meaning every vector adds a genuinely new dimension of freedom.',
  ],
  keyConcepts: [
    {
      title: 'What is a Linear Combination?',
      content:
        'Given vectors v₁ and v₂, any vector of the form w = c₁v₁ + c₂v₂ is a linear combination. The scalars c₁ and c₂ act like dial knobs. By adjusting c₁ and c₂, you navigate across the space spanned by v₁ and v₂.',
    },
    {
      title: 'Span: The Reach of Vectors',
      content:
        '• Span of 1 non-zero vector: A 1D line passing through the origin.\n' +
        '• Span of 2 independent vectors: A 2D flat plane passing through the origin.\n' +
        '• Span of 2 collinear (parallel) vectors: Collapses down to a 1D line! Redundant information.\n' +
        '• Span of 3 independent vectors: The entire 3D volume ℝ³.',
    },
    {
      title: 'Linear Independence vs. Dependence',
      content:
        'A set of vectors {v₁, ..., v_k} is Linearly Independent if the ONLY solution to c₁v₁ + ... + c_k v_k = 0 is c₁ = ... = c_k = 0 (the trivial solution). If there exists any non-trivial combination of weights that sums to zero, at least one vector is redundant and can be discarded without shrinking the span.',
    },
  ],
  equations: [
    {
      name: 'General Linear Combination Formula',
      latex: 'w = c_1 v_1 + c_2 v_2 + \\dots + c_k v_k = \\sum_{i=1}^k c_i v_i = \\begin{bmatrix} v_1 & v_2 & \\dots & v_k \\end{bmatrix} \\begin{bmatrix} c_1 \\\\ c_2 \\\\ \\vdots \\\\ c_k \\end{bmatrix}',
      summary:
        'Represents any synthesized vector w as a linear combination of basis vectors, equivalently formulated as a matrix-vector product.',
      conditions: ['v_i ∈ ℝⁿ', 'Scalars c_i ∈ ℝ'],
      variables: [
        {
          symbol: 'w',
          name: 'Combined Result Vector',
          unit: '\\mathbb{R}^n',
          description: 'The destination coordinate reached in the vector space.',
          connections: 'Belongs to the subspace spanned by the generating set {v_i}.',
        },
        {
          symbol: 'c_i',
          name: 'Scalar Weights (Coefficients)',
          unit: '\\mathbb{R}',
          description: 'The scaling factor applied to each respective basis vector.',
          connections: 'When basis vectors are orthogonal unit vectors, c_i are standard Cartesian coordinates.',
        },
      ],
    },
    {
      name: 'Definition of Linear Independence',
      latex: 'c_1 v_1 + c_2 v_2 + \\dots + c_k v_k = \\mathbf{0} \\iff c_1 = c_2 = \\dots = c_k = 0',
      summary:
        'The algebraic test guaranteeing that no vector in the collection lies within the span of the others.',
      conditions: ['Vectors v_i non-zero'],
      variables: [
        {
          symbol: '\\mathbf{0}',
          name: 'Zero Vector',
          unit: '\\mathbb{R}^n',
          description: 'The origin coordinate [0, 0, ...]ᵀ.',
          connections: 'Every subspace must contain the zero vector.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Vary the coefficient sliders c₁ and c₂ to see the resultant vector w = c₁v₁ + c₂v₂ traverse the coordinate plane. Drag vectors v₁ and v₂: notice how when they become parallel, the 2D grid collapses into a 1D line!',
};

export default linearCombinationsData;
