---
id: integration-by-parts
title: Integration by Parts
subtitle: Reversing the product rule, the LIATE priority hierarchy, Tabular DI reduction, and cyclic exponential-trigonometric formulas.
tag: Product Rule Inverse
icon: "🧩"
level: Intermediate
estimatedTime: 30 min read + interactive lab
interactiveLab:
  defaultMode: 2d
  has3D: true
overview:
  - "When an integrand is a product of two algebraically unrelated functions — such as x · eˣ, x² · sin(x), ln(x), or eᵃˣ · cos(bx) — standard u-substitution often fails because neither factor is the derivative of the other."
  - "Integration by Parts (IBP) solves this by inverting the differential Product Rule: d/dx[u · v] = u · dv/dx + v · du/dx. Integrating both sides and rearranging yields ∫ u dv = u · v - ∫ v du."
  - "For damped oscillations and signal analysis involving eᵃˣ multiplied by cos(bx), sin(bx), or tan(bx), applying Integration by Parts twice produces a cyclic integral that resolves algebraically for I."
equations:
  - name: Integration by Parts Formula (Indefinite & Definite)
    latex: "\\int u\\,dv = u\\,v - \\int v\\,du \\qquad \\text{and} \\qquad \\int_a^b u\\,dv = \\Big[u\\,v\\Big]_a^b - \\int_a^b v\\,du"
    summary: Transfers differentiation from a complicated factor u onto a simpler derivative du while integrating dv into v.
    conditions:
      - "u(x) and v(x) must be continuously differentiable"
    variables:
      - symbol: u
        name: Differentiated Factor
        unit: "\\text{chosen via LIATE}"
        description: "The factor selected to be differentiated into du = u'(x) dx."
        connections: "Should become simpler when differentiated (e.g. ln(x) → 1/x, x² → 2x)."
      - symbol: dv
        name: Integrated Differential Factor
        unit: "\\text{differential}"
        description: "The remaining portion of the integrand (including dx) selected to be integrated into v = ∫ dv."
        connections: "Must be readily integrable without exploding in complexity."
      - symbol: "u\\,v"
        name: Boundary Product Term
        unit: "\\text{evaluated product}"
        description: "The already-integrated product term outside the remaining integral."
        connections: "Evaluated directly at limits [a, b] for definite integrals."
  - name: "Exponential-Cosine Reduction Formula: I = ∫ e^(ax) cos(bx) dx"
    latex: "I = \\int e^{ax}\\cos(bx)\\,dx = \\frac{e^{ax}}{a^2 + b^2}\\Big(a\\cos(bx) + b\\sin(bx)\\Big) + C"
    summary: Closed-form antiderivative for the product of an exponential e^(ax) and cosine cos(bx), derived via two cyclic applications of Integration by Parts.
    conditions:
      - "a, b ∈ ℝ with a² + b² ≠ 0"
    variables:
      - symbol: I
        name: Target Cyclic Integral
        unit: "\\text{antiderivative}"
        description: "After applying IBP twice, the original integral I reappears on the right-hand side as -(b²/a²)I, allowing direct algebraic solution for I."
        connections: "Satisfies (1 + b²/a²) I = (e^(ax)/a²)(a cos(bx) + b sin(bx))."
      - symbol: a
        name: Exponential Growth / Damping Rate
        unit: "\\text{rate constant}"
        description: "The coefficient in the exponent e^(ax)."
        connections: "Weights the in-phase cos(bx) component in the numerator and contributes a² to the denominator a² + b²."
      - symbol: b
        name: Angular Frequency
        unit: "\\text{rad / unit } x"
        description: "The frequency inside cos(bx)."
        connections: "Weights the quadrature sin(bx) term in the numerator and contributes b² to the denominator a² + b²."
  - name: "Exponential-Sine Reduction Formula: I = ∫ e^(ax) sin(bx) dx"
    latex: "I = \\int e^{ax}\\sin(bx)\\,dx = \\frac{e^{ax}}{a^2 + b^2}\\Big(a\\sin(bx) - b\\cos(bx)\\Big) + C"
    summary: Closed-form antiderivative for the product of an exponential e^(ax) and sine sin(bx), derived by two cyclic passes of Integration by Parts.
    conditions:
      - "a, b ∈ ℝ with a² + b² ≠ 0"
    variables:
      - symbol: a
        name: Exponential Coefficient
        unit: "\\text{rate constant}"
        description: "Multiplies the primary sin(bx) term in the numerator."
        connections: "Controls envelope growth (a > 0) or damping decay (a < 0)."
      - symbol: "-b\\cos(bx)"
        name: Phase-Shifted Cosine Component
        unit: "\\text{quadrature term}"
        description: "Arises from the first integration pass on sin(bx) (or differentiation pass on sin(bx))."
        connections: "Note the minus sign (-b cos(bx)) compared to +b sin(bx) in the cosine formula."
  - name: "Exponential-Tangent IBP Reduction & Coupled Identity: e^(ax) tan(bx)"
    latex: "\\int e^{ax}\\tan(bx)\\,dx = \\frac{e^{ax}\\tan(bx)}{a} - \\frac{b}{a}\\int e^{ax}\\sec^2(bx)\\,dx \\;\\;\\Longleftrightarrow\\;\\; \\int e^{ax}\\Big(a\\tan(bx) + b\\sec^2(bx)\\Big)\\,dx = e^{ax}\\tan(bx) + C"
    summary: Applying Integration by Parts with u = tan(bx) and dv = e^(ax) dx (where d/dx[tan(bx)] = b sec²(bx)) reduces the integral and yields the exact coupled exponential-tangent identity.
    conditions:
      - "a ≠ 0 and bx ≠ π/2 + kπ (where tan(bx) and sec(bx) have vertical asymptotes)"
    variables:
      - symbol: "u = \\tan(bx)"
        name: Tangent Factor
        unit: "\\text{trig ratio}"
        description: "Differentiates via the quotient rule into du = b sec²(bx) dx = b(1 + tan²(bx)) dx."
        connections: "Because tan''(bx) grows into higher powers of sec(bx), the standalone integral is non-elementary, but pairs with b sec²(bx) to collapse into e^(ax) tan(bx)."
      - symbol: "\\frac{e^{ax}\\tan(bx)}{a}"
        name: Leading IBP Boundary Term
        unit: "u \\cdot v"
        description: "The integrated product u·v obtained on the first pass when dv = e^(ax) dx → v = e^(ax)/a."
        connections: "Rearranging moves -(b/a)∫ e^(ax) sec²(bx) dx to the left side to form the exact product-rule pair."
---

## 1. The LIATE Priority Hierarchy

Choosing the right factor for $u$ is critical. Follow the **LIATE** acronym from top to bottom when selecting $u$:

1. **L — Logarithmic**: $\ln(x), \log_{10}(x)$
2. **I — Inverse Trigonometric**: $\arcsin(x), \arctan(x), \text{arcsec}(x)$
3. **A — Algebraic**: $x^n, 3x^2 - 5x, \sqrt{x}$
4. **T — Trigonometric**: $\sin(bx), \cos(bx), \tan(bx), \sec^2(bx)$
5. **E — Exponential**: $e^{ax}, 2^x$

> [!TIP]
> **Logarithms and Inverse Trig Alone**: When integrating a single function like $\int \ln(x)\,dx$ or $\int \arctan(x)\,dx$, set $u = \ln(x)$ and $dv = 1\,dx$. Differentiating eliminates the transcendental function into a rational expression!

---

## 2. The Tabular $D$–$I$ Method

When $u = x^n$ is a polynomial and $dv$ is an exponential ($e^{ax}$) or sinusoid ($\sin(bx), \cos(bx)$), repeated Integration by Parts can be organized into a clean table with alternating signs:

| Sign | Differentiate ($D$) | Integrate ($I$) | Diagonal Product Term |
| :---: | :---: | :---: | :--- |
| $+$ | $x^2$ | $e^x$ | $+x^2 e^x$ |
| $-$ | $2x$ | $e^x$ | $-2x e^x$ |
| $+$ | $2$ | $e^x$ | $+2 e^x$ |
| $-$ | $0$ | $e^x$ | $\text{Stop } (+ C)$ |

Summing the diagonal products immediately gives:

$$\int x^2 e^x\,dx = \left(x^2 - 2x + 2\right)e^x + C$$

---

## 3. Cyclic Derivation: $I = \int e^{ax}\cos(bx)\,dx$ and $\int e^{ax}\sin(bx)\,dx$

Neither $e^{ax}$ nor $\cos(bx)$ vanishes upon differentiation—instead, $\cos(bx) \to -b\sin(bx) \to -b^2\cos(bx)$ cycles back to the original function after **two passes**:

1. **Pass 1**: Let $u = \cos(bx) \implies du = -b\sin(bx)\,dx$, and $dv = e^{ax}\,dx \implies v = \frac{1}{a}e^{ax}$:
   $$I = \frac{1}{a}e^{ax}\cos(bx) + \frac{b}{a}\int e^{ax}\sin(bx)\,dx$$

2. **Pass 2**: Apply IBP to $\int e^{ax}\sin(bx)\,dx$ with $U = \sin(bx)$ and $dV = e^{ax}\,dx$:
   $$I = \frac{1}{a}e^{ax}\cos(bx) + \frac{b}{a}\left[\frac{1}{a}e^{ax}\sin(bx) - \frac{b}{a}\underbrace{\int e^{ax}\cos(bx)\,dx}_{I}\right]$$

3. **Solve Algebraically for $I$**:
   $$I\left(1 + \frac{b^2}{a^2}\right) = \frac{e^{ax}}{a^2}\Big(a\cos(bx) + b\sin(bx)\Big) \implies I = \frac{e^{ax}}{a^2 + b^2}\Big(a\cos(bx) + b\sin(bx)\Big) + C$$

> [!IMPORTANT]
> **Quick Matrix Determinant Memory Aid**:
> Write the two functions and their derivatives in a $2 \times 2$ matrix:
> $$\frac{e^{ax}}{a^2 + b^2}\det\begin{bmatrix} a & b \\ -\sin(bx) & \cos(bx) \end{bmatrix} = \frac{e^{ax}}{a^2 + b^2}\Big(a\cos(bx) + b\sin(bx)\Big) + C$$

---

## 4. Exponential-Tangent Reduction: $\int e^{ax}\tan(bx)\,dx$

Setting $u = \tan(bx) \implies du = b\sec^2(bx)\,dx$ and $dv = e^{ax}\,dx \implies v = \frac{e^{ax}}{a}$ yields:

$$\int e^{ax}\tan(bx)\,dx = \frac{e^{ax}\tan(bx)}{a} - \frac{b}{a}\int e^{ax}\sec^2(bx)\,dx$$

Multiplying through by $a$ and grouping both integrals on the left produces the exact coupled identity:

$$\int e^{ax}\Big(a\tan(bx) + b\sec^2(bx)\Big)\,dx = e^{ax}\tan(bx) + C$$
