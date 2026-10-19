---
id: vectors
title: Vectors in 2D & 3D Space
subtitle: Geometric arrows, ordered coordinate tuples, Euclidean norm, dot product projections, and 3D cross products.
level: Beginner
estimatedTime: 22 min read + interactive 3D lab
interactiveLab:
  defaultMode: 3d
  has3D: true
---

## 1. Three Perspectives on a Vector

In linear algebra, physics, and computer graphics, a vector $\vec{v} \in \mathbb{R}^n$ is understood through three unified viewpoints:

| Perspective | Representation | Core Meaning |
| :--- | :---: | :--- |
| **Physics / Geometric** | Directed arrow $\vec{v}$ | Defined by magnitude $\|\vec{v}\|$ and direction in space; free to translate. |
| **Computer Science** | Ordered array `[vx, vy, vz]` | A fixed-length list of floating-point coordinates where index position matters. |
| **Mathematician** | Element of $\mathbb{R}^n$ | Any object supporting vector addition $\vec{u} + \vec{v}$ and scalar multiplication $c\vec{v}$. |

$$\vec{v} = \begin{bmatrix} v_x \\ v_y \\ v_z \end{bmatrix} = v_x\hat{i} + v_y\hat{j} + v_z\hat{k}, \qquad \|\vec{v}\| = \sqrt{v_x^2 + v_y^2 + v_z^2}$$

---

## 2. Dot Product vs. Cross Product in $\mathbb{R}^3$

Given $\vec{a} = \begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix}$ and $\vec{b} = \begin{bmatrix} 1 \\ -1 \\ 4 \end{bmatrix}$:

1. **Scalar Dot Product ($\vec{a} \cdot \vec{b}$)** — measures directional alignment and orthogonal projection:
   $$\vec{a} \cdot \vec{b} = (2)(1) + (3)(-1) + (1)(4) = 2 - 3 + 4 = 3$$
2. **Vector Cross Product ($\vec{a} \times \vec{b}$)** — produces a vector orthogonal to both $\vec{a}$ and $\vec{b}$:
   $$\vec{a} \times \vec{b} = \det\begin{bmatrix} \hat{i} & \hat{j} & \hat{k} \\ 2 & 3 & 1 \\ 1 & -1 & 4 \end{bmatrix} = \begin{bmatrix} 13 \\ -7 \\ -5 \end{bmatrix}$$

> [!IMPORTANT]
> **Orthogonality Test**: Two non-zero vectors $\vec{a}$ and $\vec{b}$ are strictly perpendicular ($\theta = 90^\circ$) if and only if $\vec{a} \cdot \vec{b} = 0$.
