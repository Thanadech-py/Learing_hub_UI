/**
 * Linear Algebra Topic: Eigenvalues & Eigenvectors
 */
const eigenvaluesData = {
  id: 'eigenvalues-and-eigenvectors',
  title: 'Eigenvalues & Eigenvectors',
  subtitle:
    'The invariant directions of linear transformations: vectors that never rotate, characteristic polynomials, and diagonalization.',
  level: 'Advanced',
  estimatedTime: '28 min read + interactive lab',
  overview: [
    'When a matrix A transforms space, almost all vectors get knocked off their span. However, special non-zero vectors called Eigenvectors remain on their exact same line through the origin—they only get stretched, shrunk, or reversed by a scalar factor λ called the Eigenvalue: Av = λv.',
    'To calculate eigenvalues and eigenvectors systematically: first solve the Characteristic Equation det(A − λI) = 0 to find the scalar roots λ, and then for each λ solve the homogeneous matrix system (A − λI)v = 0 to find the eigenvector column v.',
    'Assembling n linearly independent eigenvectors as columns of matrix P diagonalizes the matrix into A = PΛP⁻¹, making matrix powers Aᵏ = PΛᵏP⁻¹ and differential equations effortless to compute.',
  ],
  keyConcepts: [
    {
      title: 'Step 1: Finding Eigenvalues via det(A − λI) = 0',
      content:
        'Subtract λ from the main diagonal entries of A and set the determinant to zero. The roots of the resulting characteristic polynomial λ² − tr(A)λ + det(A) = 0 are the eigenvalues.',
      exampleLabel: 'Worked Characteristic Polynomial Calculation for A = [[4, 1], [2, 3]]',
      latex:
        '\\det(A - \\lambda I) = \\det\\begin{bmatrix} 4 - \\lambda & 1 \\\\ 2 & 3 - \\lambda \\end{bmatrix} = (4-\\lambda)(3-\\lambda) - (1)(2) = \\lambda^2 - 7\\lambda + 10 = (\\lambda - 5)(\\lambda - 2) = 0 \\implies \\lambda_1 = 5, \\; \\lambda_2 = 2',
      exampleNote:
        'Quick check: λ₁ + λ₂ = 5 + 2 = 7 = tr(A) (4+3), and λ₁ · λ₂ = 5 × 2 = 10 = det(A) (12−2)!',
    },
    {
      title: 'Step 2: Finding Eigenvectors by Solving (A − λI)v = 0',
      content:
        'Substitute each eigenvalue λ_i back into (A − λ_i I)v = 0 and solve for a non-zero column vector v in the null space.',
      exampleLabel: 'Worked Eigenvector Calculation for λ₁ = 5 and λ₂ = 2',
      latex:
        '\\begin{aligned} &\\text{For } \\lambda_1 = 5: \\quad (A - 5I)\\mathbf{v}_1 = \\begin{bmatrix} -1 & 1 \\\\ 2 & -2 \\end{bmatrix}\\begin{bmatrix} v_x \\\\ v_y \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix} \\implies v_x = v_y \\implies \\mathbf{v}_1 = \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} \\\\[6pt] &\\text{For } \\lambda_2 = 2: \\quad (A - 2I)\\mathbf{v}_2 = \\begin{bmatrix} 2 & 1 \\\\ 2 & 1 \\end{bmatrix}\\begin{bmatrix} v_x \\\\ v_y \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 0 \\end{bmatrix} \\implies 2v_x + v_y = 0 \\implies \\mathbf{v}_2 = \\begin{bmatrix} 1 \\\\ -2 \\end{bmatrix} \\end{aligned}',
      exampleNote:
        'Verify Av₁ = λ₁v₁: [[4, 1], [2, 3]][1, 1]ᵀ = [5, 5]ᵀ = 5[1, 1]ᵀ! And [[4, 1], [2, 3]][1, -2]ᵀ = [2, -4]ᵀ = 2[1, -2]ᵀ!',
    },
    {
      title: 'Step 3: Matrix Diagonalization A = PΛP⁻¹ & Powers Aᵏ',
      content:
        'Place eigenvectors v₁ and v₂ as columns of P and eigenvalues λ₁, λ₂ on the diagonal of Λ. Then A = PΛP⁻¹ and Aᵏ = PΛᵏP⁻¹.',
      exampleLabel: 'Worked Diagonalization Decomposition in Matrix Form',
      latex:
        'A = P\\Lambda P^{-1} = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix} \\begin{bmatrix} 5 & 0 \\\\ 0 & 2 \\end{bmatrix} \\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix}^{-1} \\implies A^k = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix} \\begin{bmatrix} 5^k & 0 \\\\ 0 & 2^k \\end{bmatrix} \\left(-\\frac{1}{3}\\begin{bmatrix} -2 & -1 \\\\ -1 & 1 \\end{bmatrix}\\right)',
      exampleNote:
        'Instead of multiplying A by itself 100 times, A¹⁰⁰ is computed immediately by replacing 5ᵏ and 2ᵏ with 5¹⁰⁰ and 2¹⁰⁰!',
    },
  ],
  equations: [
    {
      name: 'Eigenvalue-Eigenvector Matrix Equation',
      latex: 'A\\mathbf{v} = \\lambda \\mathbf{v} \\iff (A - \\lambda I)\\mathbf{v} = \\mathbf{0}',
      summary:
        'The condition where matrix transformation A acts on column vector v as pure scalar scaling by factor λ.',
      exampleDescription: 'Direct verification that v = [1, 1]ᵀ is an eigenvector of A with λ = 5',
      exampleLatex:
        '\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix} \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} = \\begin{bmatrix} 4(1) + 1(1) \\\\ 2(1) + 3(1) \\end{bmatrix} = \\begin{bmatrix} 5 \\\\ 5 \\end{bmatrix} = 5 \\begin{bmatrix} 1 \\\\ 1 \\end{bmatrix} = \\lambda \\mathbf{v}',
      conditions: ['v must be a non-zero column vector (v ≠ 0)'],
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
          connections: 'Any non-zero scalar multiple c·v is also an eigenvector with the same eigenvalue.',
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
      exampleDescription: 'Eigenvalues of a 3×3 Triangular or Diagonal Matrix lie directly on the diagonal',
      exampleLatex:
        'A = \\begin{bmatrix} 3 & 4 & -1 \\\\ 0 & -2 & 5 \\\\ 0 & 0 & 7 \\end{bmatrix} \\implies \\det(A - \\lambda I) = (3-\\lambda)(-2-\\lambda)(7-\\lambda) = 0 \\implies \\lambda = 3, -2, 7',
      conditions: ['A is a square matrix'],
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
    'Rotate the test vector in 3D space and watch when x and Ax align along the invariant eigen-axes.',
};

export default eigenvaluesData;
