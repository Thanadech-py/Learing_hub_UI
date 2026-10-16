/**
 * Linear Algebra Topic: Linear Combinations & Span
 */
const linearCombinationsData = {
  id: 'linear-combinations',
  title: 'Linear Combinations & Span',
  subtitle:
    'Scaling and adding column vectors, vector space spanning sets, linear independence vs. dependence, and matrix-vector form.',
  level: 'Beginner',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'A linear combination is the central operation of linear algebra: taking a set of column vectors, scaling each by a scalar weight, and adding the results together: w = c₁v₁ + c₂v₂ + ... + c_k v_k.',
    'Every linear combination can be packaged directly in Matrix-Vector Form: placing the vectors v₁, v₂, ..., v_k side-by-side as the columns of a matrix A and multiplying by the column vector of weights c = [c₁, c₂, ..., c_k]ᵀ gives w = Ac.',
    'The Span of a set of vectors is the collection of ALL possible vectors w reachable by varying the weights c_i across ℝ. If no vector in the set can be written as a linear combination of the others, the set is Linearly Independent.',
  ],
  keyConcepts: [
    {
      title: 'Linear Combination in Column Vector & Matrix Form',
      content:
        'Given column vectors v₁ and v₂ and scalar weights c₁ = 2, c₂ = -3, computing c₁v₁ + c₂v₂ is identical to multiplying the matrix [v₁  v₂] by the weight vector [c₁, c₂]ᵀ.',
      exampleLabel: 'Worked Linear Combination in Vector & Matrix Form',
      latex:
        '\\mathbf{w} = 2\\begin{bmatrix} 1 \\\\ 3 \\\\ -1 \\end{bmatrix} - 3\\begin{bmatrix} 2 \\\\ 0 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 2 \\\\ 3 & 0 \\\\ -1 & 1 \\end{bmatrix} \\begin{bmatrix} 2 \\\\ -3 \\end{bmatrix} = \\begin{bmatrix} 2 - 6 \\\\ 6 + 0 \\\\ -2 - 3 \\end{bmatrix} = \\begin{bmatrix} -4 \\\\ 6 \\\\ -5 \\end{bmatrix}',
      exampleNote:
        'Notice how matrix-vector multiplication Ac is literally a linear combination of the columns of A weighted by the entries of c.',
    },
    {
      title: 'Testing Span Membership: Does Target Vector b Lie in Span{v₁, v₂}?',
      content:
        'To check if a target vector b is in Span{v₁, v₂}, we solve c₁v₁ + c₂v₂ = b by setting up the augmented matrix [v₁  v₂ | b] and row-reducing.',
      exampleLabel: 'Worked Span Membership Calculation',
      latex:
        'c_1\\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} + c_2\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 6 \\end{bmatrix} \\iff \\left[\\begin{array}{cc|c} 1 & 3 & 5 \\\\ 2 & 4 & 6 \\end{array}\\right] \\xrightarrow{R_2 \\leftarrow R_2 - 2R_1} \\left[\\begin{array}{cc|c} 1 & 3 & 5 \\\\ 0 & -2 & -4 \\end{array}\\right] \\implies \\begin{bmatrix} c_1 \\\\ c_2 \\end{bmatrix} = \\begin{bmatrix} -1 \\\\ 2 \\end{bmatrix}',
      exampleNote:
        'Check: (-1)[1, 2]ᵀ + 2[3, 4]ᵀ = [-1+6, -2+8]ᵀ = [5, 6]ᵀ. Because a valid weight vector c = [-1, 2]ᵀ exists, b lies in Span{v₁, v₂}.',
    },
    {
      title: 'Linear Independence vs. Linear Dependence Test',
      content:
        'Vectors {v₁, v₂, v₃} are Linearly Independent if [v₁  v₂  v₃]c = 0 has ONLY the trivial solution c = [0, 0, 0]ᵀ. If a free variable exists, the vectors are Linearly Dependent.',
      exampleLabel: 'Worked Linear Dependence Calculation',
      latex:
        '\\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix}, \\; \\mathbf{v}_2 = \\begin{bmatrix} 4 \\\\ 5 \\\\ 6 \\end{bmatrix}, \\; \\mathbf{v}_3 = \\begin{bmatrix} 2 \\\\ 1 \\\\ 0 \\end{bmatrix} \\implies 2\\begin{bmatrix} 1 \\\\ 2 \\\\ 3 \\end{bmatrix} - 1\\begin{bmatrix} 4 \\\\ 5 \\\\ 6 \\end{bmatrix} + 1\\begin{bmatrix} 2 \\\\ 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\\\ 0 \\end{bmatrix}',
      exampleNote:
        'Because the non-zero weight vector c = [2, -1, 1]ᵀ produces the zero vector ( specifically v₃ = v₂ - 2v₁ ), the three vectors are linearly dependent and their span collapses to a 2D plane.',
    },
  ],
  equations: [
    {
      name: 'General Linear Combination as Matrix-Vector Product',
      latex: '\\mathbf{w} = c_1 \\mathbf{v}_1 + c_2 \\mathbf{v}_2 + \\dots + c_k \\mathbf{v}_k = \\begin{bmatrix} | & | & & | \\\\ \\mathbf{v}_1 & \\mathbf{v}_2 & \\dots & \\mathbf{v}_k \\\\ | & | & & | \\end{bmatrix} \\begin{bmatrix} c_1 \\\\ c_2 \\\\ \\vdots \\\\ c_k \\end{bmatrix} = A\\mathbf{c}',
      summary:
        'Represents any synthesized vector w as a linear combination of column vectors, written compactly as the matrix-vector product Ac.',
      exampleDescription: 'Combining 3 basis vectors in ℝ³ with weights c = [3, -1, 4]ᵀ',
      exampleLatex:
        '\\begin{bmatrix} 1 & 0 & 2 \\\\ 0 & 1 & -1 \\\\ 2 & 3 & 0 \\end{bmatrix} \\begin{bmatrix} 3 \\\\ -1 \\\\ 4 \\end{bmatrix} = 3\\begin{bmatrix} 1 \\\\ 0 \\\\ 2 \\end{bmatrix} - 1\\begin{bmatrix} 0 \\\\ 1 \\\\ 3 \\end{bmatrix} + 4\\begin{bmatrix} 2 \\\\ -1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 3+0+8 \\\\ 0-1-4 \\\\ 6-3+0 \\end{bmatrix} = \\begin{bmatrix} 11 \\\\ -5 \\\\ 3 \\end{bmatrix}',
      conditions: ['v_i ∈ ℝⁿ', 'Scalars c_i ∈ ℝ'],
      variables: [
        {
          symbol: '\\mathbf{w}',
          name: 'Combined Result Vector',
          unit: '\\mathbb{R}^n',
          description: 'The destination coordinate reached in the vector space.',
          connections: 'Belongs to the subspace (column space) spanned by the generating set {v_i}.',
        },
        {
          symbol: 'c_i',
          name: 'Scalar Weights (Coefficients)',
          unit: '\\mathbb{R}',
          description: 'The scaling factor applied to each respective column vector.',
          connections: 'Packaged into the coordinate weight column vector c = [c₁, ..., c_k]ᵀ.',
        },
      ],
    },
    {
      name: 'Homogeneous Matrix Test for Linear Independence',
      latex: 'A\\mathbf{c} = \\mathbf{0} \\iff \\begin{bmatrix} \\mathbf{v}_1 & \\mathbf{v}_2 & \\dots & \\mathbf{v}_k \\end{bmatrix} \\begin{bmatrix} c_1 \\\\ c_2 \\\\ \\vdots \\\\ c_k \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{bmatrix} \\implies \\mathbf{c} = \\mathbf{0}',
      summary:
        'Columns of A are linearly independent if and only if the null space contains only the zero vector.',
      exampleDescription: 'Testing independence of [1, 2]ᵀ and [3, 5]ᵀ via determinant / row reduction',
      exampleLatex:
        '\\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\end{bmatrix} \\begin{bmatrix} c_1 \\\\ c_2 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}, \\quad \\det\\begin{bmatrix} 1 & 3 \\\\ 2 & 5 \\end{bmatrix} = (1)(5) - (3)(2) = -1 \\ne 0 \\implies \\begin{bmatrix} c_1 \\\\ c_2 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix}',
      conditions: ['Vectors v_i non-zero'],
      variables: [
        {
          symbol: '\\mathbf{0}',
          name: 'Zero Column Vector',
          unit: '\\mathbb{R}^n',
          description: 'The origin coordinate [0, 0, ...]ᵀ.',
          connections: 'Every subspace must contain the zero vector.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Vary the coefficient sliders c₁ and c₂ to see the resultant vector w = c₁v₁ + c₂v₂ traverse the spanned plane in 3D.',
};

export default linearCombinationsData;
