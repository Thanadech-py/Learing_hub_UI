---
id: derivatives
title: Derivatives & Differentiation
subtitle: Instantaneous rates of change, slopes of tangent lines, calculus differentiation rules, and optimization.
level: Intermediate
estimatedTime: 26 min read + interactive lab
interactiveLab:
  defaultMode: 2d
  has3D: true
overview:
  - "Differential calculus is the mathematical study of continuous change. While an average rate of change measures the slope of a secant line between two separate points (Δy / Δx), the derivative determines the instantaneous rate of change at a single exact point."
  - "Geometrically, as the step size h between two points shrinks toward zero, the secant line pivoting through (x, f(x)) converges to the unique Tangent Line. The slope of this tangent line is the derivative f'(x)."
  - "Derivatives are the fundamental engine of physics (velocity is the derivative of position, acceleration is the derivative of velocity), economics (marginal cost), and machine learning (gradient descent optimization)."
equations:
  - name: Definition of Derivative as Limit of Difference Quotient
    latex: "f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x + h) - f(x)}{h}"
    summary: The foundational definition converting secant slopes into the instantaneous slope of the tangent line.
    conditions:
      - "Limit must exist from both left (h → 0⁻) and right (h → 0⁺)"
    variables:
      - symbol: "f'(x)"
        name: Derivative (Instantaneous Rate of Change)
        unit: "\\text{units of } y / \\text{units of } x"
        description: "The slope of the tangent line touching the curve y = f(x) at point x."
        connections: "If f'(x) > 0, function is increasing; if f'(x) < 0, decreasing; if f'(x) = 0, stationary."
      - symbol: h
        name: Horizontal Secant Step Size
        unit: "\\Delta x"
        description: "The horizontal separation between the two points on the secant line."
        connections: "Shrinks infinitesimally toward zero."
      - symbol: "f(x + h) - f(x)"
        name: Vertical Increment (Δy)
        unit: "\\text{units of } y"
        description: "The change in function value over the horizontal increment h."
        connections: "Approaches zero proportionally with h."
  - name: The Chain Rule for Composite Functions
    latex: "\\frac{d}{dx}\\Big[f\\big(g(x)\\big)\\Big] = f'\\big(g(x)\\big) \\cdot g'(x) = \\frac{df}{dg} \\cdot \\frac{dg}{dx}"
    summary: Calculates the rate of change of nested functions by multiplying the outer derivative by the inner derivative.
    conditions:
      - "g must be differentiable at x, and f differentiable at g(x)"
    variables:
      - symbol: "f'(g(x))"
        name: Derivative of Outer Function
        unit: "\\text{rate}"
        description: "Evaluated with the inner function g(x) held as the input argument."
        connections: "Multiplied directly by the velocity of the inner variable."
      - symbol: "g'(x)"
        name: Derivative of Inner Function
        unit: "\\text{rate}"
        description: "The rate at which the inner input changes with respect to x."
        connections: "Acts as an internal gearing ratio scaling the overall rate of change."
keyConcepts:
  - title: The Difference Quotient & Tangent Line Limit
    content: "The average rate of change over an interval of width h is given by the difference quotient: [f(x + h) - f(x)] / h. Taking the limit as h → 0 yields the derivative f'(x) = dy/dx."
  - title: Core Differentiation Rules
    content: "Power Rule: d/dx [xⁿ] = n · xⁿ⁻¹ | Product Rule: d/dx [u·v] = u'·v + u·v' | Quotient Rule: d/dx [u/v] = (u'·v - u·v') / v² | Chain Rule: d/dx [f(g(x))] = f'(g(x)) · g'(x)."
  - title: Optimization & Critical Points (Fermat's Theorem)
    content: "At any local maximum or minimum of a smooth curve, the tangent line becomes horizontal: f'(x) = 0. The Second Derivative Test examines curvature: f''(x) > 0 is concave up (local min); f''(x) < 0 is concave down (local max)."
---

## 1. From Secant Lines to the Tangent Limit

Consider a smooth curve $y = f(x)$ and two points on the curve: $P\big(x, f(x)\big)$ and $Q\big(x + h, f(x + h)\big)$. The slope of the **secant line** passing through $P$ and $Q$ is the difference quotient:

$$m_{\text{sec}} = \frac{\Delta y}{\Delta x} = \frac{f(x + h) - f(x)}{h}$$

As $h \to 0$, point $Q$ slides along the curve toward $P$, and the secant slope approaches the instantaneous **tangent slope**:

$$f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$$

> [!NOTE]
> **Differentiability Implies Continuity**: If $f'(a)$ exists at $x = a$, then $f(x)$ must be continuous at $x = a$. However, the converse is false: $f(x) = |x|$ is continuous at $x = 0$ but has a sharp corner where the left slope ($-1$) and right slope ($+1$) disagree.

---

## 2. Reference Table of Essential Derivatives

| Function Family | $f(x)$ | Derivative $f'(x)$ | Domain / Notes |
| :--- | :--- | :--- | :--- |
| **Power Law** | $x^n$ | $n x^{n-1}$ | Valid for all $n \in \mathbb{R}$ |
| **Exponential** | $e^{ax}$ | $a e^{ax}$ | Eigenfunction of $\frac{d}{dx}$ when $a=1$ |
| **Natural Log** | $\ln(x)$ | $\frac{1}{x}$ | $x > 0$ |
| **Sine** | $\sin(bx)$ | $b\cos(bx)$ | Phase shifts by $+\frac{\pi}{2}$ |
| **Cosine** | $\cos(bx)$ | $-b\sin(bx)$ | Phase shifts by $+\frac{\pi}{2}$ |
| **Tangent** | $\tan(bx)$ | $b\sec^2(bx)$ | $bx \neq \frac{\pi}{2} + k\pi$ |

---

## 3. Worked Example: Second Derivative & Concavity

Find the critical points and classify the local extrema of $f(x) = x^3 - 3x^2 + 1$:

1. **First Derivative (Slope)**:
   $$f'(x) = 3x^2 - 6x = 3x(x - 2) = 0 \implies x = 0 \text{ and } x = 2$$
2. **Second Derivative (Curvature)**:
   $$f''(x) = 6x - 6$$
   - At $x = 0$: $f''(0) = -6 < 0$ (concave down) $\implies$ **Local Maximum** at $(0, 1)$.
   - At $x = 2$: $f''(2) = +6 > 0$ (concave up) $\implies$ **Local Minimum** at $(2, -3)$.
