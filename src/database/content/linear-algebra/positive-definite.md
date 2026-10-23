---
id: positive-definite
title: Positive Definite Matrices & Energy Bowls
subtitle: The 5 equivalent tests for S ≻ 0, energy quadratic form xᵀSx > 0, Sylvester determinants, Cholesky factorization S = LLᵀ, and 3D convex paraboloids.
level: Advanced
estimatedTime: 26 min read + interactive lab
interactiveLab:
  defaultMode: 3d
  has3D: true
---

## 1. Energy Quadratic Form $E(\mathbf{x}) = \mathbf{x}^T S \mathbf{x}$

A real symmetric matrix $S = S^T$ is **Positive Definite** (denoted $S \succ 0$) if its associated quadratic form is strictly positive for every non-zero vector:

$$\mathbf{x}^T S \mathbf{x} > 0 \quad \text{for all } \mathbf{x} \neq \mathbf{0}$$

For a $2 \times 2$ symmetric matrix $S = \begin{bmatrix} a & b \\ b & c \end{bmatrix}$:
$$E(x_1, x_2) = \begin{bmatrix} x_1 & x_2 \end{bmatrix} \begin{bmatrix} a & b \\ b & c \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = ax_1^2 + 2bx_1 x_2 + cx_2^2$$

The surface $z = E(x_1, x_2)$ is a strictly convex paraboloid bowl in $\mathbb{R}^3$ with a unique global minimum at $(0, 0)$.

---

## 2. Five Equivalent Tests for $S \succ 0$

1. **Energy Test**: $\mathbf{x}^T S \mathbf{x} > 0$ for all $\mathbf{x} \neq \mathbf{0}$.
2. **Eigenvalue Test**: All eigenvalues are strictly positive: $\lambda_i > 0$.
3. **Pivot Test**: All Gaussian elimination pivots without row exchanges are positive: $d_k > 0$.
4. **Determinant Test (Sylvester's Criterion)**: All leading principal minors are positive:
   $$\det(S_1) = a > 0, \qquad \det(S_2) = ac - b^2 > 0, \qquad \dots$$
5. **Cholesky Factorization Test**: $S = L L^T$ where $L$ is lower-triangular with strictly positive diagonal entries.

---

## 3. The Cholesky Factorization: $S = L L^T$

Positive definite matrices have a unique triangular square root:
$$\begin{bmatrix} s_{11} & s_{12} \\ s_{21} & s_{22} \end{bmatrix} = \begin{bmatrix} \ell_{11} & 0 \\ \ell_{21} & \ell_{22} \end{bmatrix} \begin{bmatrix} \ell_{11} & \ell_{21} \\ 0 & \ell_{22} \end{bmatrix}$$

Solving for coefficients:
$$\ell_{11} = \sqrt{s_{11}}, \qquad \ell_{21} = \frac{s_{21}}{\ell_{11}}, \qquad \ell_{22} = \sqrt{s_{22} - \ell_{21}^2}$$

Cholesky decomposition requires only $\frac{1}{6}n^3$ flops—half the computational cost of standard $LU$ decomposition.

---

## 4. Completing the Square ↔ The Pivot Bridge

Every quadratic form $f(\mathbf{x}) = \mathbf{x}^T S \mathbf{x}$ decomposes into independent squares without cross-terms:
$$f(x_1, \dots, x_n) = d_1(x_1 + \dots)^2 + d_2(x_2 + \dots)^2 + \dots + d_n(x_n)^2$$

The multipliers $d_1, \dots, d_n$ are precisely the diagonal pivots from $S = L D L^T$.
- If all $d_i > 0$, the sum of squares is strictly positive for $\mathbf{x} \neq \mathbf{0}$, proving $S \succ 0$.
- If any $d_i \le 0$, the surface has zero curvature or saddles into negative energy.

---

## 5. Ellipsoid Geometry & The Rayleigh Quotient

The level surface $\mathbf{x}^T S \mathbf{x} = 1$ is an ellipsoid whose principal axes align with the eigenvectors $\mathbf{q}_i$ of $S$.
- **Semi-axis lengths**: $a_i = \frac{1}{\sqrt{\lambda_i}}$ (steeper eigenvalues create shorter axes).
- **2D Ellipse Area**: $\text{Area} = \frac{\pi}{\sqrt{\lambda_1 \lambda_2}} = \frac{\pi}{\sqrt{\det(S)}}$.

The **Rayleigh Quotient** bounds energy amplification in any direction:
$$\lambda_{\min} \le R(\mathbf{x}) = \frac{\mathbf{x}^T S \mathbf{x}}{\mathbf{x}^T \mathbf{x}} \le \lambda_{\max}$$

The minimum occurs at $\mathbf{q}_{\min}$ and the maximum occurs at $\mathbf{q}_{\max}$.
