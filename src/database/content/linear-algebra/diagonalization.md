---
id: diagonalization
title: Matrix Diagonalization & Powers
subtitle: Decomposing A = XΛX⁻¹, fast matrix powers Aᵏ, discrete Fibonacci recurrence, Markov chains, and continuous differential systems du/dt = Au.
level: Advanced
estimatedTime: 26 min read + interactive lab
interactiveLab:
  defaultMode: 3d
  has3D: true
---

## 1. The Diagonalization Theorem

An $n \times n$ matrix $A$ is diagonalizable if and only if it has $n$ linearly independent eigenvectors $\mathbf{x}_1, \dots, \mathbf{x}_n$. Collecting these into the columns of matrix $X$:

$$AX = A\begin{bmatrix} \mathbf{x}_1 & \dots & \mathbf{x}_n \end{bmatrix} = \begin{bmatrix} \lambda_1\mathbf{x}_1 & \dots & \lambda_n\mathbf{x}_n \end{bmatrix} = X \Lambda$$

Because $X$ is invertible:
$$A = X \Lambda X^{-1} \iff \Lambda = X^{-1} A X$$

---

## 2. Fast Matrix Powers & Asymptotic Behavior

To compute $A^k$ for large $k$:
$$A^k = (X \Lambda X^{-1})(X \Lambda X^{-1}) \dots (X \Lambda X^{-1}) = X \Lambda^k X^{-1} = X \begin{bmatrix} \lambda_1^k & 0 & \dots \\ 0 & \lambda_2^k & \dots \\ \vdots & \vdots & \ddots \end{bmatrix} X^{-1}$$

As $k \to \infty$, the vector $\mathbf{u}_k = A^k \mathbf{u}_0$ aligns along the dominant eigenvector $\mathbf{x}_1$ corresponding to $|\lambda_1| > |\lambda_2| \ge \dots$:
- **$|\lambda_{\max}| > 1$**: Exponential growth along dominant axis.
- **$|\lambda_{\max}| < 1$**: Asymptotic decay to the zero vector origin.
- **$\lambda_1 = 1, |\lambda_i| < 1$**: Markov chain steady-state equilibrium.

---

## 3. Continuous Dynamical Systems: $\frac{d\mathbf{u}}{dt} = A\mathbf{u}$

By substituting $\mathbf{u} = X\mathbf{v}$, we uncouple the differential equations:
$$\frac{d\mathbf{u}}{dt} = X \frac{d\mathbf{v}}{dt} = A X \mathbf{v} \implies \frac{d\mathbf{v}}{dt} = X^{-1}AX \mathbf{v} = \Lambda \mathbf{v}$$

This yields $n$ independent scalar solutions $v_i(t) = c_i e^{\lambda_i t}$. Transforming back to original coordinates:
$$\mathbf{u}(t) = e^{At}\mathbf{u}(0) = X e^{\Lambda t} X^{-1}\mathbf{u}(0) = \sum_{i=1}^n c_i e^{\lambda_i t}\mathbf{x}_i$$

> [!NOTE]
> **Stability Criterion**: The origin is asymptotically stable if and only if $\text{Re}(\lambda_i) < 0$ for all eigenvalues.

---

## 4. Multiplicity & Defective Matrices

For each distinct eigenvalue $\lambda$:
- **Algebraic Multiplicity (AM)**: The multiplicity of $\lambda$ as a root of $\det(A - \lambda I) = 0$.
- **Geometric Multiplicity (GM)**: The dimension of the eigenspace $\text{null}(A - \lambda I)$, i.e. the number of independent eigenvectors.

A matrix is diagonalizable if and only if $\text{GM}(\lambda) = \text{AM}(\lambda)$ for every eigenvalue. When $\text{GM} < \text{AM}$, the matrix is **defective** (missing eigenvectors) and can only be reduced to **Jordan Canonical Form** $J = M^{-1}AM$.

---

## 5. Cayley-Hamilton Fast Matrix Powers

Every square matrix satisfies its own characteristic polynomial:
$$p(A) = A^n - \text{tr}(A)A^{n-1} + \dots + (-1)^n \det(A)I = O$$

For any large power $k$, dividing $x^k$ by $p(x)$ gives:
$$x^k = q(x)p(x) + r(x) \implies A^k = r(A)$$
where $\text{deg}(r) < n$. This reduces calculating $A^k$ to evaluating an $(n-1)$-degree polynomial without needing eigenvector inversion!
