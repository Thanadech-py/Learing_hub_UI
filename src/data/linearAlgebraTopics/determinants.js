/**
 * Linear Algebra Topic: Determinants
 */
const determinantsData = {
  id: 'determinants',
  title: 'Determinants: Area, Volume & Scaling',
  subtitle:
    'Geometric meaning of determinants as area and volume scaling factors, cofactor expansion, orientation, and Cramer’s Rule.',
  level: 'Intermediate',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'The determinant of a square matrix is a single scalar number that reveals the geometric soul of the transformation: it is the exact factor by which the matrix scales 2D areas or 3D volumes!',
    'When a 2×2 matrix A = [v₁  v₂] transforms the unit square, it becomes a parallelogram spanned by column vectors v₁ and v₂ with area |det(A)| = |ad - bc|. In 3D, a 3×3 matrix A = [v₁  v₂  v₃] transforms the unit cube into a 3D parallelepiped of volume |det(A)| = |v₁ · (v₂ × v₃)|.',
    'If det(A) < 0, space reverses orientation (mirror flip). If det(A) = 0, the columns are linearly dependent, squashing volume down to zero and making the matrix non-invertible.',
  ],
  keyConcepts: [
    {
      title: '2×2 Determinant & Parallelogram Area from Column Vectors',
      content:
        'Given two column vectors v₁ = [a, c]ᵀ and v₂ = [b, d]ᵀ, assembling them into a 2×2 matrix and taking ad - bc gives the signed area of the parallelogram they span.',
      exampleLabel: 'Worked 2×2 Determinant & Area Calculation',
      latex:
        '\\mathbf{v}_1 = \\begin{bmatrix} 4 \\\\ 1 \\end{bmatrix}, \\; \\mathbf{v}_2 = \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix} \\implies \\det(A) = \\det\\begin{bmatrix} 4 & 2 \\\\ 1 & 3 \\end{bmatrix} = (4)(3) - (2)(1) = 12 - 2 = 10',
      exampleNote:
        'The parallelogram spanned by [4, 1]ᵀ and [2, 3]ᵀ has an exact area of 10 square units, and preserves counterclockwise orientation (+10 > 0).',
    },
    {
      title: '3×3 Determinant via Cofactor Expansion & 3D Parallelepiped Volume',
      content:
        'To compute the determinant of a 3×3 matrix across Row 1, multiply each entry by its 2×2 minor determinant with alternating signs (+, −, +): det(A) = a₁₁M₁₁ − a₁₂M₁₂ + a₁₃M₁₃.',
      exampleLabel: 'Worked 3×3 Cofactor Expansion Calculation',
      latex:
        '\\det\\begin{bmatrix} 2 & 1 & 3 \\\\ 0 & 4 & -1 \\\\ 1 & 2 & 0 \\end{bmatrix} = +2\\det\\begin{bmatrix} 4 & -1 \\\\ 2 & 0 \\end{bmatrix} - 1\\det\\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} + 3\\det\\begin{bmatrix} 0 & 4 \\\\ 1 & 2 \\end{bmatrix} = 2(2) - 1(1) + 3(-4) = -9',
      exampleNote:
        'The 3D parallelepiped spanned by the 3 column vectors has volume |-9| = 9 cubic units, with inverted handedness (negative sign).',
    },
    {
      title: 'Singular Matrix Calculation: Why det(A) = 0 Collapses Space',
      content:
        'When one column (or row) of a matrix is a linear combination of the others, the determinant evaluates to zero and no inverse A⁻¹ exists.',
      exampleLabel: 'Worked Singular Matrix Calculation (Col₂ = 3 × Col₁)',
      latex:
        'A = \\begin{bmatrix} 2 & 6 \\\\ -3 & -9 \\end{bmatrix} \\implies \\det(A) = (2)(-9) - (6)(-3) = -18 + 18 = 0 \\implies A^{-1} \\text{ does not exist}',
      exampleNote:
        'Because column 2 is [6, -9]ᵀ = 3 × [2, -3]ᵀ, both columns lie on the same 1D line and enclose zero 2D area.',
    },
  ],
  equations: [
    {
      name: 'Formula for 2×2 Determinant and Signed Area',
      latex: '\\det(A) = \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc',
      summary:
        'Computes the signed area of the parallelogram formed by the column vectors [a, c]ᵀ and [b, d]ᵀ.',
      exampleDescription: 'Computing determinant and inverse of a 2×2 matrix',
      exampleLatex:
        'A = \\begin{bmatrix} 5 & 3 \\\\ 2 & 2 \\end{bmatrix} \\implies \\det(A) = (5)(2) - (3)(2) = 4, \\qquad A^{-1} = \\frac{1}{4}\\begin{bmatrix} 2 & -3 \\\\ -2 & 5 \\end{bmatrix}',
      conditions: ['A is a 2×2 square matrix'],
      variables: [
        {
          symbol: '\\det(A)',
          name: 'Determinant Value',
          unit: '\\mathbb{R}',
          description: 'The signed area scaling factor. Positive preserves orientation; negative reflects orientation.',
          connections: 'If det(A) = 0, matrix is singular (non-invertible).',
        },
        {
          symbol: 'ad - bc',
          name: 'Cross-Product Formula',
          unit: '\\text{area units}',
          description: 'The algebraic expansion of the 2D determinant.',
          connections: 'Equals the 2D exterior product of column 1 and column 2.',
        },
      ],
    },
    {
      name: 'Determinant Product & Inverse Theorems',
      latex: '\\det(AB) = \\det(A) \\cdot \\det(B), \\quad \\det(A^{-1}) = \\frac{1}{\\det(A)}, \\quad \\det(cA) = c^n \\det(A)',
      summary:
        'Demonstrates that the volume scaling of a composite transformation is the product of the individual determinant scaling factors.',
      exampleDescription: 'Verifying det(AB) = det(A) · det(B) with explicit 2×2 matrices',
      exampleLatex:
        '\\det\\!\\left(\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix} \\begin{bmatrix} 1 & 4 \\\\ 2 & 3 \\end{bmatrix}\\right) = \\det\\begin{bmatrix} 4 & 11 \\\\ 6 & 9 \\end{bmatrix} = 36 - 66 = -30 = (6)(-5) = \\det(A)\\det(B)',
      conditions: ['A and B are square n × n matrices'],
      variables: [
        {
          symbol: '\\det(AB)',
          name: 'Determinant of Product',
          unit: '\\mathbb{R}',
          description: 'Overall area or volume factor after applying both B and A.',
          connections: 'Proves that even though AB ≠ BA, det(AB) = det(BA) always!',
        },
      ],
    },
  ],
  interactiveGuide:
    'Adjust the 3D column vectors in the visualizer. Watch the 3D parallelepiped volume match |det(A)| and observe what happens when the vectors become coplanar (det(A) = 0).',
};

export default determinantsData;
