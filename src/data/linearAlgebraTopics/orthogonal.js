/**
 * Linear Algebra Topic: Orthogonal Projections & Least Squares
 */
const orthogonalData = {
  id: 'orthogonal',
  title: 'Orthogonal Projections & Least Squares',
  subtitle:
    'Solving the unsolvable: what to do when Ax = b has no solution, projecting vectors onto subspaces, and linear regression.',
  level: 'Advanced',
  estimatedTime: '26 min read + interactive lab',
  overview: [
    'In experimental science, machine learning, and engineering, real-world data contains noise. When fitting a model with 1,000 measurements and 2 parameters, you have 1,000 equations in 2 unknowns—an overdetermined system where Ax = b almost NEVER has an exact solution, because the target vector b lies outside the column space C(A).',
    'Rather than giving up, linear algebra finds the BEST POSSIBLE approximate solution x̂ by dropping an Orthogonal Projection of b onto the column space C(A), creating the closest possible reachable vector p = Ax̂. The difference vector e = b - Ax̂ is the perpendicular error vector.',
    'Because the error vector e is perpendicular (orthogonal) to every vector in the column space, we have Aᵀ(b - Ax̂) = 0. Rearranging this leads directly to the famous Normal Equations: AᵀA x̂ = Aᵀb. This single formula is the mathematical backbone of Linear Regression, curve fitting, GPS triangulation, and machine learning parameter estimation.',
  ],
  keyConcepts: [
    {
      title: 'Orthogonal Projection of a Vector onto a Line',
      content:
        'To project vector v onto the line along unit vector u, the projection vector p points along u with length equal to the dot product: p = (v · u) u. If u is not a unit vector, p = [(v · u) / (u · u)] u. The error vector e = v - p is strictly perpendicular to u: e · u = 0.',
    },
    {
      title: 'The Least Squares Problem: Minimizing ||Ax - b||²',
      content:
        'When Ax = b has no exact solution, the goal is to find the vector x̂ that minimizes the sum of squared errors: ||Ax - b||². The shortest distance from a point b to a flat subspace C(A) is along the perpendicular line. Therefore, the optimal solution x̂ makes the error vector (b - Ax̂) perpendicular to the column space C(A).',
    },
    {
      title: 'The Normal Equations: AᵀA x̂ = Aᵀb',
      content:
        'Because the error e = b - Ax̂ is orthogonal to C(A), it is in the null space of Aᵀ: Aᵀ(b - Ax̂) = 0. Distributing Aᵀ yields the Normal Equations: AᵀA x̂ = Aᵀb. When the columns of A are linearly independent, AᵀA is guaranteed to be symmetric and invertible, yielding the unique least squares solution: x̂ = (AᵀA)⁻¹ Aᵀb.',
    },
  ],
  equations: [
    {
      name: 'Vector Projection Formula',
      latex: '\\mathbf{p} = \\text{proj}_{\\mathbf{u}}(\\mathbf{v}) = \\frac{\\mathbf{v} \\cdot \\mathbf{u}}{\\mathbf{u} \\cdot \\mathbf{u}} \\mathbf{u} = \\frac{\\mathbf{v} \\cdot \\mathbf{u}}{\\|\\mathbf{u}\\|^2} \\mathbf{u}',
      summary:
        'Calculates the closest point on the line spanned by vector u to the tip of vector v.',
      conditions: ['u must be non-zero'],
      variables: [
        {
          symbol: '\\mathbf{p}',
          name: 'Projection Vector',
          unit: '\\mathbb{R}^n',
          description: 'The shadow or component of v lying parallel to u.',
          connections: 'Minimizes the distance ||v - p|| among all vectors on the line.',
        },
        {
          symbol: '\\mathbf{v} - \\mathbf{p}',
          name: 'Orthogonal Error Vector (e)',
          unit: '\\mathbb{R}^n',
          description: 'The perpendicular component connecting the line to the tip of v.',
          connections: 'Satisfies (v - p) · u = 0 exactly.',
        },
      ],
    },
    {
      name: 'The Normal Equations for Least Squares',
      latex: 'A^T A \\mathbf{\\hat{x}} = A^T \\mathbf{b} \\implies \\mathbf{\\hat{x}} = (A^T A)^{-1} A^T \\mathbf{b}',
      summary:
        'The foundational formula of linear regression finding the optimal parameter vector x̂ that minimizes squared error.',
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
    'Switch between Vector Projection mode (dragging vector v and observing the perpendicular drop onto line u) and Least Squares Regression mode (fitting an optimal best-fit line through noisy data points with live residual lines).',
};

export default orthogonalData;
