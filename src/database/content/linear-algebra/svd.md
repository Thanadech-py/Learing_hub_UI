---
id: svd
title: Singular Value Decomposition (SVD)
subtitle: "The crowning theorem of linear algebra: A = UΣVᵀ, singular values σᵢ, sphere-to-ellipsoid mapping, low-rank compression, and Moore-Penrose pseudoinverse A⁺."
level: Advanced
estimatedTime: 28 min read + interactive lab
interactiveLab:
  defaultMode: 3d
  has3D: true
---

## 1. The SVD Factorization: $A = U \Sigma V^T$

For any real $m \times n$ matrix $A$ of rank $r$:

$$A = U \Sigma V^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T$$

Where:
- $V \in \mathbb{R}^{n \times n}$ is an orthogonal matrix of **right singular vectors** (eigenvectors of $A^T A$).
- $\Sigma \in \mathbb{R}^{m \times n}$ is a diagonal matrix containing sorted non-negative **singular values** $\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0$.
- $U \in \mathbb{R}^{m \times m}$ is an orthogonal matrix of **left singular vectors** (eigenvectors of $A A^T$).

The singular values relate directly to eigenvalues:
$$\sigma_i = \sqrt{\lambda_i(A^T A)} = \sqrt{\lambda_i(A A^T)}, \qquad A\mathbf{v}_i = \sigma_i \mathbf{u}_i$$

---

## 2. Geometric Mapping: Unit Sphere to Ellipsoid

Under transformation by $A$:
1. $V^T$ rigidly rotates the unit sphere in domain $\mathbb{R}^n$.
2. $\Sigma$ stretches the sphere along coordinate axes by factors $\sigma_1, \sigma_2, \dots, \sigma_r$.
3. $U$ rigidly rotates the resulting axes into alignment with codomain directions $\mathbf{u}_1, \dots, \mathbf{u}_m$.

The largest singular value is the operator norm: $\|A\|_2 = \sigma_1$, measuring the maximum amplification of any unit vector.

---

## 3. Low-Rank Matrix Approximation (Eckart-Young)

Truncating the outer-product expansion to the top $k$ terms ($k < r$):
$$A_k = \sum_{i=1}^k \sigma_i \mathbf{u}_i \mathbf{v}_i^T$$

$A_k$ is the optimal rank-$k$ approximation minimizing both Frobenius and spectral norms:
$$\|A - A_k\|_2 = \sigma_{k+1}$$

---

## 4. The Moore-Penrose Pseudoinverse $A^+$

For any matrix $A$, the pseudoinverse is:
$$A^+ = V \Sigma^+ U^T = \sum_{i=1}^r \frac{1}{\sigma_i} \mathbf{v}_i \mathbf{u}_i^T$$

Where $\Sigma^+$ inverts all non-zero singular values along the diagonal. The minimum-norm least-squares solution to $A\mathbf{x} = \mathbf{b}$ is:
$$\mathbf{x}^+ = A^+ \mathbf{b}$$
