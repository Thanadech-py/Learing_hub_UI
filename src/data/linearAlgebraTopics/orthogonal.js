/**
 * Linear Algebra Topic: Orthogonal Projections & Least Squares
 */
const orthogonalData = {
  id: 'orthogonal',
  title: 'Orthogonal Projections & Least Squares',
  subtitle:
    'Projecting vectors onto lines and subspaces, projection matrices P, and solving overdetermined systems via AᵀAx̂ = Aᵀb.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'In experimental science and machine learning, when fitting a model with more measurements than parameters (an tall m × n matrix A with m > n), the system Ax = b almost never has an exact solution because b lies outside the column space C(A).',
    'Linear algebra solves this by finding the Orthogonal Projection p = Ax̂ of target vector b onto the subspace C(A). Because the residual error vector e = b − Ax̂ must be perpendicular to every column of A, we have Aᵀ(b − Ax̂) = 0.',
    'Rearranging gives the famous Normal Equations: AᵀAx̂ = Aᵀb, with projection matrix P = A(AᵀA)⁻¹Aᵀ.',
  ],
  keyConcepts: [
    {
      title: 'Orthogonal Projection of Vector b onto a Line Spanned by u',
      content:
        'To project column vector b onto the line spanned by u, compute the scalar projection weight x̂ = (uᵀb)/(uᵀu) and multiply by u. The rank-1 Projection Matrix onto u is P = (uuᵀ)/(uᵀu).',
      exampleLabel: 'Worked Vector Projection & Orthogonal Error Calculation',
      latex:
        '\\mathbf{u} = \\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix}, \\; \\mathbf{b} = \\begin{bmatrix} 5 \\\\ 4 \\\\ 2 \\end{bmatrix} \\implies \\mathbf{p} = \\frac{\\mathbf{u}^T\\mathbf{b}}{\\mathbf{u}^T\\mathbf{u}}\\mathbf{u} = \\frac{1(5)+2(4)+2(2)}{1^2+2^2+2^2}\\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix} = \\frac{17}{9}\\begin{bmatrix} 1 \\\\ 2 \\\\ 2 \\end{bmatrix}, \\quad \\mathbf{e} = \\mathbf{b} - \\mathbf{p} = \\frac{1}{9}\\begin{bmatrix} 28 \\\\ 2 \\\\ -16 \\end{bmatrix}',
      exampleNote:
        'Check orthogonality: uᵀe = (1/9)[1(28) + 2(2) + 2(-16)] = (1/9)(28 + 4 - 32) = 0, confirming the error vector e is strictly perpendicular to u.',
    },
    {
      title: 'Projection Matrix onto a Line: P = (uuᵀ)/(uᵀu)',
      content:
        'Notice the difference between the inner product uᵀu (a 1×1 scalar) and the outer product uuᵀ (an n×n matrix!). Every projection matrix is symmetric (Pᵀ = P) and idempotent (P² = P).',
      exampleLabel: 'Worked Outer Product Projection Matrix Calculation',
      latex:
        '\\mathbf{u} = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} \\implies P = \\frac{\\mathbf{u}\\mathbf{u}^T}{\\mathbf{u}^T\\mathbf{u}} = \\frac{1}{1^2 + 2^2} \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix} \\begin{bmatrix} 1 & 2 \\end{bmatrix} = \\frac{1}{5}\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix}',
      exampleNote:
        'Projecting b = [5, 0]ᵀ via matrix multiplication gives Pb = (1/5)[[1, 2], [2, 4]][5, 0]ᵀ = [1, 2]ᵀ.',
    },
    {
      title: 'Worked Least Squares Regression via Normal Equations AᵀAx̂ = Aᵀb',
      content:
        'Suppose we fit a line y = c + mx through 3 noisy points (0, 1), (1, 3), (2, 4). Setting up the overdetermined 3×2 system Ax ≈ b and multiplying both sides by Aᵀ gives a solvable 2×2 system!',
      exampleLabel: 'Step-by-Step Normal Equations Calculation in Matrix Form',
      latex:
        'A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}, \\; \\mathbf{b} = \\begin{bmatrix} 1 \\\\ 3 \\\\ 4 \\end{bmatrix} \\implies A^TA = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}, \\; A^T\\mathbf{b} = \\begin{bmatrix} 8 \\\\ 11 \\end{bmatrix} \\implies \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}\\begin{bmatrix} c \\\\ m \\end{bmatrix} = \\begin{bmatrix} 8 \\\\ 11 \\end{bmatrix} \\implies \\mathbf{\\hat{x}} = \\begin{bmatrix} 7/6 \\\\ 3/2 \\end{bmatrix}',
      exampleNote:
        'Thus the optimal least-squares line minimizing squared vertical errors is y = 7/6 + (3/2)x!',
    },
  ],
  equations: [
    {
      name: 'Vector & Subspace Projection Formula',
      latex: '\\mathbf{p} = \\text{proj}_{\\mathbf{u}}(\\mathbf{b}) = \\frac{\\mathbf{u}^T \\mathbf{b}}{\\mathbf{u}^T \\mathbf{u}} \\mathbf{u}, \\qquad P = A(A^T A)^{-1} A^T',
      summary:
        'Calculates the closest vector p on the subspace to target vector b, such that the error e = b − p is orthogonal to the subspace.',
      exampleDescription: 'Projecting b = [3, 4]ᵀ onto u = [1, 0]ᵀ',
      exampleLatex:
        '\\mathbf{p} = \\frac{\\begin{bmatrix} 1 & 0 \\end{bmatrix}\\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix}}{1^2 + 0^2}\\begin{bmatrix} 1 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ 0 \\end{bmatrix}, \\qquad \\mathbf{e} = \\mathbf{b} - \\mathbf{p} = \\begin{bmatrix} 3 \\\\ 4 \\end{bmatrix} - \\begin{bmatrix} 3 \\\\ 0 \\end{bmatrix} = \\begin{bmatrix} 0 \\\\ 4 \\end{bmatrix}',
      conditions: ['u must be non-zero; columns of A linearly independent'],
      variables: [
        {
          symbol: '\\mathbf{p}',
          name: 'Projection Vector',
          unit: '\\mathbb{R}^m',
          description: 'The shadow or component of b lying inside the subspace.',
          connections: 'Minimizes the Euclidean distance ||b - p|| among all vectors in the subspace.',
        },
        {
          symbol: '\\mathbf{b} - \\mathbf{p}',
          name: 'Orthogonal Error Vector (e)',
          unit: '\\mathbb{R}^m',
          description: 'The perpendicular residual vector connecting p to the tip of b.',
          connections: 'Satisfies Aᵀe = 0 (lies in the left null space N(Aᵀ)).',
        },
      ],
    },
    {
      name: 'The Normal Equations for Least Squares',
      latex: 'A^T A \\mathbf{\\hat{x}} = A^T \\mathbf{b} \\implies \\mathbf{\\hat{x}} = (A^T A)^{-1} A^T \\mathbf{b}',
      summary:
        'The foundational matrix equation of linear regression finding the optimal parameter vector x̂ that minimizes ||Ax − b||².',
      exampleDescription: 'Computing the Gram Matrix AᵀA from a 3×2 design matrix A',
      exampleLatex:
        'A^T A = \\begin{bmatrix} 1 & 1 & 1 \\\\ 0 & 1 & 2 \\end{bmatrix} \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix} = \\begin{bmatrix} 1^2+1^2+1^2 & 0+1+2 \\\\ 0+1+2 & 0^2+1^2+2^2 \\end{bmatrix} = \\begin{bmatrix} 3 & 3 \\\\ 3 & 5 \\end{bmatrix}',
      conditions: ['Columns of A must be linearly independent so that AᵀA is invertible'],
      variables: [
        {
          symbol: '\\mathbf{\\hat{x}}',
          name: 'Least Squares Optimal Solution',
          unit: '\\mathbb{R}^n',
          description: 'The best-fit parameter weights minimizing the residual sum of squares ||Ax - b||².',
          connections: 'Reduces to standard exact solution x = A⁻¹ b when A is square and invertible.',
        },
        {
          symbol: 'A^T A',
          name: 'Gram Matrix',
          unit: '\\mathbb{R}^{n \\times n}',
          description: 'A square, symmetric, positive semi-definite matrix of dot products between columns of A.',
          connections: 'Invertible if and only if A has full column rank.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Drag target vector b in 3D space and observe its perpendicular projection p = Pb onto the subspace plane C(A), along with the orthogonal residual error vector e = b − p.',
};

export default orthogonalData;
