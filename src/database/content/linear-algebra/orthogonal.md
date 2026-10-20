---
id: orthogonal
title: Projection, Least Squares & QR Factorization
subtitle: The geometry of perpendicularity, the Four Fundamental Subspaces, Normal Equations AᵀAx̂ = Aᵀb, and Gram-Schmidt QR decomposition.
level: Advanced
estimatedTime: 28 min read + interactive lab
interactiveLab:
  defaultMode: 3d
  has3D: true
---

## 1. The Four Fundamental Subspaces & Orthogonal Complements

Every $m \times n$ matrix $A$ divides the vector spaces $\mathbb{R}^n$ and $\mathbb{R}^m$ into two pairs of mutually orthogonal subspaces:

1. **In the domain $\mathbb{R}^n$**:
   $$\text{Row Space } C(A^T) \perp \text{Nullspace } N(A), \qquad \dim C(A^T) + \dim N(A) = r + (n - r) = n$$
2. **In the codomain $\mathbb{R}^m$**:
   $$\text{Column Space } C(A) \perp \text{Left Nullspace } N(A^T), \qquad \dim C(A) + \dim N(A^T) = r + (m - r) = m$$

Every vector $\mathbf{b} \in \mathbb{R}^m$ splits uniquely into an orthogonal sum:
$$\mathbf{b} = \mathbf{p} + \mathbf{e}, \qquad \mathbf{p} \in C(A), \quad \mathbf{e} \in N(A^T)$$

---

## 2. Orthogonal Projection onto Subspaces

When $A\mathbf{x} = \mathbf{b}$ has no exact solution (since $\mathbf{b} \notin C(A)$), we seek the closest vector $\mathbf{p} = A\mathbf{\hat{x}}$ in $C(A)$. Because the residual error $\mathbf{e} = \mathbf{b} - A\mathbf{\hat{x}}$ must be orthogonal to every column of $A$:

$$A^T (\mathbf{b} - A\mathbf{\hat{x}}) = \mathbf{0} \implies A^T A \mathbf{\hat{x}} = A^T \mathbf{b}$$

If the columns of $A$ are linearly independent, $A^T A$ is invertible, yielding:
$$\mathbf{\hat{x}} = (A^T A)^{-1} A^T \mathbf{b}, \qquad \mathbf{p} = P\mathbf{b}, \quad P = A(A^T A)^{-1} A^T$$

All projection matrices satisfy two fundamental algebraic properties:
- **Symmetric**: $P^T = P$
- **Idempotent**: $P^2 = P$

---

## 3. Gram-Schmidt Process and $A = QR$ Decomposition

Gram-Schmidt converts independent columns $\mathbf{a}_1, \dots, \mathbf{a}_n$ into an orthonormal basis $\mathbf{q}_1, \dots, \mathbf{q}_n$ ($Q^T Q = I$):
$$\mathbf{q}_1 = \frac{\mathbf{a}_1}{\|\mathbf{a}_1\|}, \qquad \mathbf{B}_k = \mathbf{a}_k - \sum_{j=1}^{k-1} (\mathbf{q}_j^T \mathbf{a}_k)\mathbf{q}_j, \qquad \mathbf{q}_k = \frac{\mathbf{B}_k}{\|\mathbf{B}_k\|}$$

In matrix form, $A = QR$ where $R$ is upper-triangular:
$$A^T A \mathbf{\hat{x}} = A^T \mathbf{b} \implies R^T Q^T Q R \mathbf{\hat{x}} = R^T Q^T \mathbf{b} \implies R \mathbf{\hat{x}} = Q^T \mathbf{b}$$

> [!TIP]
> **Numerical Advantage**: Solving $R\mathbf{\hat{x}} = Q^T \mathbf{b}$ uses fast back-substitution without explicitly forming $A^T A$, which squares the condition number.
