---
id: symmetric-matrices
title: Symmetric Matrices & The Spectral Theorem
subtitle: Real eigenvalues, mutually orthogonal eigenvectors, and the Spectral Decomposition S = QΛQᵀ = ∑ λᵢ qᵢqᵢᵀ into rank-1 projection tiles.
level: Advanced
estimatedTime: 26 min read + interactive lab
interactiveLab:
  defaultMode: 3d
  has3D: true
---

## 1. The Fundamental Properties of Real Symmetric Matrices

A matrix $S \in \mathbb{R}^{n \times n}$ is real symmetric if $S = S^T$.

1. **All Eigenvalues are Real**: Even though the characteristic polynomial could in general have complex roots, symmetry forces $\text{Im}(\lambda_i) = 0$.
2. **Eigenvectors are Mutually Orthogonal**: If $\lambda_1 \neq \lambda_2$, then $\mathbf{q}_1^T \mathbf{q}_2 = 0$.

### Proof of Orthogonality:
$$\lambda_1 (\mathbf{q}_1^T \mathbf{q}_2) = (S\mathbf{q}_1)^T \mathbf{q}_2 = \mathbf{q}_1^T S^T \mathbf{q}_2 = \mathbf{q}_1^T (S\mathbf{q}_2) = \lambda_2 (\mathbf{q}_1^T \mathbf{q}_2) \implies (\lambda_1 - \lambda_2)(\mathbf{q}_1^T \mathbf{q}_2) = 0$$

Since $\lambda_1 \neq \lambda_2$, the inner product $\mathbf{q}_1^T \mathbf{q}_2$ must vanish!

---

## 2. The Spectral Theorem: $S = Q \Lambda Q^T$

Normalizing each eigenvector to unit length gives an orthogonal matrix $Q$:
$$Q = \begin{bmatrix} \mathbf{q}_1 & \mathbf{q}_2 & \dots & \mathbf{q}_n \end{bmatrix}, \qquad Q^T Q = Q Q^T = I_n$$

Thus $Q^{-1} = Q^T$, and the similarity diagonalization simplifies to:
$$S = Q \Lambda Q^T$$

---

## 3. Spectral Decomposition into Projection Tiles

Expanding $S = Q \Lambda Q^T$ as outer products gives:
$$S = \sum_{i=1}^n \lambda_i \mathbf{q}_i \mathbf{q}_i^T = \lambda_1 P_1 + \lambda_2 P_2 + \dots + \lambda_n P_n$$

Where each $P_i = \mathbf{q}_i \mathbf{q}_i^T$ is a rank-1 projection matrix satisfying:
- $P_i^2 = P_i$ (Idempotent)
- $P_i P_j = 0$ for $i \neq j$ (Mutually orthogonal)
- $\sum_{i=1}^n P_i = I$ (Partition of unity)

---

## 4. Sylvester's Law of Inertia

Gaussian elimination on a symmetric matrix produces $S = L D L^T$ without row interchanges. Sylvester's Law of Inertia states that for any congruent transformation $C^T S C$ (with $\det(C) \neq 0$):
$$\text{Inertia}(S) = (p, n, z) = (\#\{\lambda_i > 0\}, \#\{\lambda_i < 0\}, \#\{\lambda_i = 0\})$$

> [!TIP]
> The signs of the elimination pivots $d_1, d_2, \dots, d_n$ match the signs of the eigenvalues $\lambda_1, \dots, \lambda_n$ exactly! This counts positive/negative eigenvalues in $O(n^3)$ without polynomial factoring.

---

## 5. Spectral Functional Calculus

Because the eigenvector frame $Q$ is rigid and orthogonal, applying any scalar function $f: \mathbb{R} \to \mathbb{R}$ to matrix $S$ simply transforms its eigenvalues:
$$f(S) = Q f(\Lambda) Q^T = \sum_{i=1}^n f(\lambda_i) \mathbf{q}_i \mathbf{q}_i^T$$

- Matrix powers: $S^k = Q \Lambda^k Q^T$
- Matrix inverse: $S^{-1} = Q \Lambda^{-1} Q^T$ (if all $\lambda_i \neq 0$)
- Matrix square root: $\sqrt{S} = Q \sqrt{\Lambda} Q^T$ (for $S \succeq 0$)
- Spectral 2-norm: $\|S\|_2 = \max_i |\lambda_i|$
