# Comprehensive Calculus Integration Guide: Final Examination Topics

This guide provides exhaustive theoretical foundations, analytical derivations, step-by-step methodologies, governing formulae, and variable breakdowns for all 8 core calculus integration topics.

---

## 1. Indefinite Integrals: Integration by Formula & Substitution

### Theoretical Foundation
An indefinite integral represents the most general antiderivative of a continuous function $f(x)$ on an open interval $I$:
$$\int f(x) \, dx = F(x) + C \quad \iff \quad F'(x) = f(x)$$
Because the derivative of any constant is zero ($\frac{d}{dx} C = 0$), an arbitrary constant of integration $C \in \mathbb{R}$ must always accompany every indefinite integral.

### Standard Integration Formulae Table
- **Power Rule**: $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)$
- **Logarithmic Form**: $\int \frac{1}{x} \, dx = \ln|x| + C$
- **Exponential Forms**: $\int e^{kx} \, dx = \frac{1}{k}e^{kx} + C, \quad \int a^x \, dx = \frac{a^x}{\ln a} + C$
- **Trigonometric Forms**:
  - $\int \sin(kx) \, dx = -\frac{1}{k}\cos(kx) + C$
  - $\int \cos(kx) \, dx = \frac{1}{k}\sin(kx) + C$
  - $\int \sec^2(kx) \, dx = \frac{1}{k}\tan(kx) + C$
  - $\int \csc^2(kx) \, dx = -\frac{1}{k}\cot(kx) + C$
  - $\int \sec(kx)\tan(kx) \, dx = \frac{1}{k}\sec(kx) + C$
  - $\int \csc(kx)\cot(kx) \, dx = -\frac{1}{k}\csc(kx) + C$
- **Inverse Trigonometric Forms**:
  - $\int \frac{1}{\sqrt{a^2 - x^2}} \, dx = \arcsin\left(\frac{x}{a}\right) + C$
  - $\int \frac{1}{a^2 + x^2} \, dx = \frac{1}{a}\arctan\left(\frac{x}{a}\right) + C$
  - $\int \frac{1}{|x|\sqrt{x^2 - a^2}} \, dx = \frac{1}{a}\operatorname{arcsec}\left(\frac{|x|}{a}\right) + C$

### Method of Substitution ($u$-Substitution)
The substitution rule is the integral equivalent of the chain rule from differential calculus:
$$\int f(g(x)) g'(x) \, dx = \int f(u) \, du \quad \text{where } u = g(x), \, du = g'(x)\,dx$$

#### Systematic 4-Step Procedure:
1. **Identify the Inner Kernel**: Select $u = g(x)$ such that its differential multiple $g'(x)\,dx$ appears elsewhere in the integrand.
2. **Compute Differential**: Calculate $du = g'(x) \, dx \implies dx = \frac{du}{g'(x)}$.
3. **Transform the Integrand**: Substitute all occurrences of $x$ and $dx$ so the integral depends entirely on $u$. If algebraic remnants of $x$ persist, express $x = g^{-1}(u)$.
4. **Integrate & Back-Substitute**: Compute the integral in terms of $u$, and replace $u$ with $g(x) + C$.

---

## 2. Techniques of Integration: Integration by Parts & Partial Fractions

### Integration by Parts
Originating from the product rule of differentiation $\frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x)$, integration by parts shifts the differentiation burden:
$$\int u \, dv = u v - \int v \, du$$
For definite integrals:
$$\int_a^b u \, dv = \Big[u(x)v(x)\Big]_a^b - \int_a^b v \, du$$

#### The **LIATE** Selection Hierarchy for $u$:
When choosing which factor to assign to $u$ (to be differentiated) versus $dv$ (to be integrated):
1. **L** - Logarithmic functions ($\ln x, \log_b x$)
2. **I** - Inverse trigonometric functions ($\arctan x, \arcsin x$)
3. **A** - Algebraic / Polynomial functions ($x^n, x^2 + 1$)
4. **T** - Trigonometric functions ($\sin x, \cos x$)
5. **E** - Exponential functions ($e^x, a^x$)

#### Tabular Integration Method:
For integrals of the form $\int P(x) e^{ax} \, dx$, $\int P(x) \sin(ax) \, dx$, or $\int P(x) \cos(ax) \, dx$ where $P(x)$ is a polynomial of degree $n$, alternate signs ($+ / -$) across consecutive derivatives of $P(x)$ paired with successive antiderivatives of $g(x)$.

### Partial Fraction Decomposition
Used to integrate rational functions $\frac{P(x)}{Q(x)}$ where $P$ and $Q$ are polynomials.
1. **Strictly Proper Check**: If $\deg(P) \ge \deg(Q)$, perform polynomial long division first:
   $$\frac{P(x)}{Q(x)} = S(x) + \frac{R(x)}{Q(x)} \quad \text{where } \deg(R) < \deg(Q)$$
2. **Factor $Q(x)$ Completely**: Factor the denominator into linear factors $(ax + b)$ and irreducible quadratic factors $(ax^2 + bx + c)$ over $\mathbb{R}$.
3. **Set Up Decomposition Forms**:
   - Distinct linear factor $(x - r)$: $\frac{A}{x - r}$
   - Repeated linear factor $(x - r)^k$: $\frac{A_1}{x - r} + \frac{A_2}{(x - r)^2} + \dots + \frac{A_k}{(x - r)^k}$
   - Distinct irreducible quadratic $(ax^2 + bx + c)$: $\frac{Bx + C}{ax^2 + bx + c}$
   - Repeated quadratic $(ax^2 + bx + c)^m$: $\sum_{j=1}^m \frac{B_j x + C_j}{(ax^2 + bx + c)^j}$
4. **Solve Coefficients**: Multiply through by $Q(x)$, match coefficients of corresponding powers of $x$, or substitute roots of linear factors (Heaviside cover-up method).

---

## 3. Techniques of Integration: Trigonometric Integrals & Trigonometric Substitution

### Trigonometric Integrals
#### Type A: $\int \sin^m(x) \cos^n(x) \, dx$
- **Case 1: $m$ is odd ($m = 2k + 1$)**: Save $\sin x \, dx$, convert remaining $\sin^{2k}x = (1 - \cos^2 x)^k$, set $u = \cos x, \, du = -\sin x \, dx$.
- **Case 2: $n$ is odd ($n = 2k + 1$)**: Save $\cos x \, dx$, convert remaining $\cos^{2k}x = (1 - \sin^2 x)^k$, set $u = \sin x, \, du = \cos x \, dx$.
- **Case 3: Both $m$ and $n$ are even**: Use half-angle power-reduction identities:
  $$\sin^2 x = \frac{1 - \cos(2x)}{2}, \quad \cos^2 x = \frac{1 + \cos(2x)}{2}, \quad \sin x \cos x = \frac{\sin(2x)}{2}$$

#### Type B: $\int \tan^m(x) \sec^n(x) \, dx$
- **Case 1: $n$ is even ($n = 2k$)**: Save $\sec^2 x \, dx$, convert $\sec^{2k-2}x = (1 + \tan^2 x)^{k-1}$, set $u = \tan x, \, du = \sec^2 x \, dx$.
- **Case 2: $m$ is odd ($m = 2k + 1$)**: Save $\sec x \tan x \, dx$, convert $\tan^{2k}x = (\sec^2 x - 1)^k$, set $u = \sec x, \, du = \sec x \tan x \, dx$.
- **Case 3: $m$ even and $n$ odd**: Convert all to $\sec x$ and apply integration by parts to powers of secant.

### Trigonometric Substitution
Eliminates radicals of quadratic forms by geometric right-triangle parametrization:
| Radical Form | Substitution | Differential | Identity Simplification | Reference Triangle |
|---|---|---|---|---|
| $\sqrt{a^2 - x^2}$ | $x = a \sin\theta, \; \theta \in [-\frac{\pi}{2}, \frac{\pi}{2}]$ | $dx = a \cos\theta \, d\theta$ | $\sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta$ | $\text{opp} = x, \, \text{hyp} = a, \, \text{adj} = \sqrt{a^2 - x^2}$ |
| $\sqrt{a^2 + x^2}$ | $x = a \tan\theta, \; \theta \in (-\frac{\pi}{2}, \frac{\pi}{2})$ | $dx = a \sec^2\theta \, d\theta$ | $\sqrt{a^2 + a^2\tan^2\theta} = a\sec\theta$ | $\text{opp} = x, \, \text{adj} = a, \, \text{hyp} = \sqrt{a^2 + x^2}$ |
| $\sqrt{x^2 - a^2}$ | $x = a \sec\theta, \; \theta \in [0, \frac{\pi}{2}) \cup [\pi, \frac{3\pi}{2})$ | $dx = a \sec\theta\tan\theta \, d\theta$ | $\sqrt{a^2\sec^2\theta - a^2} = a\tan\theta$ | $\text{hyp} = x, \, \text{adj} = a, \, \text{opp} = \sqrt{x^2 - a^2}$ |

---

## 4. Definite Integral & Fundamental Theorem of Calculus (FTC)

### Riemann Sum Definition
The definite integral represents the signed net area between $y = f(x)$ and the $x$-axis on $[a, b]$:
$$\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x, \quad \Delta x = \frac{b - a}{n}, \quad x_i = a + i\Delta x$$

### Fundamental Theorem of Calculus: Part 1 (Rate of Accumulation)
If $f$ is continuous on $[a, b]$, the accumulation function $g(x) = \int_a^x f(t) \, dt$ is continuous on $[a, b]$, differentiable on $(a, b)$, and:
$$\frac{d}{dx} \left[ \int_a^x f(t) \, dt \right] = f(x)$$
With general functional limits by the Leibniz Chain Rule:
$$\frac{d}{dx} \left[ \int_{u(x)}^{v(x)} f(t) \, dt \right] = f(v(x)) \cdot v'(x) - f(u(x)) \cdot u'(x)$$

### Fundamental Theorem of Calculus: Part 2 (Evaluation Theorem)
If $f$ is continuous on $[a, b]$ and $F$ is any antiderivative of $f$ ($F' = f$):
$$\int_a^b f(x) \, dx = F(b) - F(a) = \Big[F(x)\Big]_a^b$$

### Key Algebraic Properties
1. Linearity: $\int_a^b [c_1 f(x) + c_2 g(x)] \, dx = c_1 \int_a^b f(x)\,dx + c_2 \int_a^b g(x)\,dx$
2. Additivity: $\int_a^b f(x) \, dx = \int_a^c f(x) \, dx + \int_c^b f(x) \, dx$
3. Inversion of Limits: $\int_b^a f(x) \, dx = -\int_a^b f(x) \, dx$
4. Mean Value Theorem for Integrals: $\exists c \in [a, b]$ such that $f(c) = f_{\text{avg}} = \frac{1}{b - a}\int_a^b f(x) \, dx$.

---

## 5. Improper Integrals

### Type I: Infinite Intervals of Integration
- **Upper Infinite Bound**: $\int_a^\infty f(x) \, dx = \lim_{t \to \infty} \int_a^t f(x) \, dx$
- **Lower Infinite Bound**: $\int_{-\infty}^b f(x) \, dx = \lim_{t \to -\infty} \int_t^b f(x) \, dx$
- **Both Infinite Bounds**: $\int_{-\infty}^\infty f(x) \, dx = \int_{-\infty}^c f(x) \, dx + \int_c^\infty f(x) \, dx$ (converges only if both limits converge independently).
- **The $p$-Integral Test (Type I)**:
  $$\int_1^\infty \frac{1}{x^p} \, dx = \begin{cases} \frac{1}{p - 1} & \text{if } p > 1 \quad (\text{Convergent}) \\ \text{Diverges} & \text{if } p \le 1 \end{cases}$$

### Type II: Discontinuous Integrands (Vertical Asymptotes)
- **Discontinuity at Upper Bound $b$**: $\int_a^b f(x) \, dx = \lim_{t \to b^-} \int_a^t f(x) \, dx$
- **Discontinuity at Lower Bound $a$**: $\int_a^b f(x) \, dx = \lim_{t \to a^+} \int_t^b f(x) \, dx$
- **Interior Discontinuity at $c \in (a, b)$**: $\int_a^b f(x) \, dx = \lim_{t \to c^-} \int_a^t f(x) \, dx + \lim_{s \to c^+} \int_s^b f(x) \, dx$.
- **The $p$-Integral Test (Type II)**:
  $$\int_0^1 \frac{1}{x^p} \, dx = \begin{cases} \frac{1}{1 - p} & \text{if } p < 1 \quad (\text{Convergent}) \\ \text{Diverges} & \text{if } p \ge 1 \end{cases}$$

### Comparison Tests
For continuous functions $0 \le f(x) \le g(x)$ for all $x \ge a$:
1. If $\int_a^\infty g(x) \, dx$ converges, then $\int_a^\infty f(x) \, dx$ converges.
2. If $\int_a^\infty f(x) \, dx$ diverges, then $\int_a^\infty g(x) \, dx$ diverges.

---

## 6. Applications of Integration: Area Between Curves

### Vertical Slicing ($x$-Integration)
When the bounding curves are given explicitly as $y = f(x)$ and $y = g(x)$ where $f(x) \ge g(x)$ across $x \in [a, b]$:
$$A = \int_a^b \Big[ f(x) - g(x) \Big] \, dx = \int_a^b \Big( y_{\text{top}} - y_{\text{bottom}} \Big) \, dx$$

#### Multiple Intersections & Absolute Difference:
When curves cross each other at points $c_1, c_2 \in (a, b)$, partition the integral where $f(x) - g(x)$ changes sign:
$$A = \int_a^b |f(x) - g(x)| \, dx = \int_a^c [f(x) - g(x)] \, dx + \int_c^b [g(x) - f(x)] \, dx$$

### Horizontal Slicing ($y$-Integration)
When curves are more naturally expressed as $x = f(y)$ and $x = g(y)$ with $f(y) \ge g(y)$ across $y \in [c, d]$:
$$A = \int_c^d \Big[ f(y) - g(y) \Big] \, dy = \int_c^d \Big( x_{\text{right}} - x_{\text{left}} \Big) \, dy$$
*Rule of thumb*: Use horizontal slicing if vertical lines intersect a single curve more than once or if solving for $y$ yields messy piecewise square roots.

---

## 7. Applications of Integration: Volume of Solids of Revolution

### Method 1: Disk Method (Cross-Sections Perpendicular to Axis, No Hole)
When rotating a continuous region bounded by $y = R(x) \ge 0$ around a horizontal axis:
$$V = \pi \int_a^b [R(x)]^2 \, dx$$
For rotation around a horizontal line $y = k$:
$$V = \pi \int_a^b |R(x) - k|^2 \, dx$$

### Method 2: Washer Method (Cross-Sections Perpendicular to Axis, Inner & Outer Radii)
When rotating a region bounded between outer curve $R(x)$ and inner curve $r(x)$ around the $x$-axis:
$$V = \pi \int_a^b \left( [R(x)]^2 - [r(x)]^2 \right) \, dx$$
- Cross-sectional area of each annular washer: $A(x) = \pi R_{\text{outer}}^2 - \pi r_{\text{inner}}^2$.
- For rotation around $y = k$:
  $$V = \pi \int_a^b \left( [R_{\text{outer}}(x) - k]^2 - [r_{\text{inner}}(x) - k]^2 \right) \, dx$$

### Method 3: Cylindrical Shells Method (Cylindrical Slices Parallel to Axis of Rotation)
When rotating a region about a vertical axis (e.g., the $y$-axis $x = 0$):
$$V = 2\pi \int_a^b (\text{radius}) \cdot (\text{height}) \, dx = 2\pi \int_a^b x \cdot [f(x) - g(x)] \, dx$$
- For rotation about vertical line $x = h$:
  $$V = 2\pi \int_a^b |x - h| \cdot [f(x) - g(x)] \, dx$$
- For rotation about horizontal axis using $y$-integration:
  $$V = 2\pi \int_c^d y \cdot [f(y) - g(y)] \, dy$$

#### Decision Matrix: Disk/Washer vs. Shells:
| Axis of Rotation | Slices Perpendicular to Axis | Slices Parallel to Axis |
|---|---|---|
| Horizontal (e.g. $x$-axis, $y = k$) | **Disk / Washer** in $dx$ | **Cylindrical Shells** in $dy$ |
| Vertical (e.g. $y$-axis, $x = h$) | **Disk / Washer** in $dy$ | **Cylindrical Shells** in $dx$ |

---

## 8. Applications of Integration: Arc Length & Surface of Revolution

### Arc Length of a Curve
The length $L$ of a smooth curve $y = f(x)$ on $[a, b]$ is obtained by integrating infinitesimal Pythagorean hypotenuses $ds$:
$$ds = \sqrt{dx^2 + dy^2} = \sqrt{1 + \left(\frac{dy}{dx}\right)^2} \, dx$$
$$L = \int_a^b \sqrt{1 + [f'(x)]^2} \, dx$$

#### Alternative Parameter Representations:
- Function of $y$: $x = g(y), \, y \in [c, d] \implies L = \int_c^d \sqrt{1 + [g'(y)]^2} \, dy$
- Parametric curve $x = x(t), y = y(t), \, t \in [t_1, t_2]$:
  $$L = \int_{t_1}^{t_2} \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$

### Area of Surface of Revolution
When an arc segment of length $ds$ is revolved $360^\circ$ around an axis at radius $r$, it sweeps an infinitesimal truncated conical frustum of lateral area $dS = 2\pi r \, ds$:
- **Rotation about $x$-axis** (radius $r = y = f(x)$):
  $$S = 2\pi \int_a^b f(x) \sqrt{1 + [f'(x)]^2} \, dx = 2\pi \int_a^b y \, ds$$
- **Rotation about $y$-axis** (radius $r = x$):
  $$S = 2\pi \int_a^b x \sqrt{1 + [f'(x)]^2} \, dx = 2\pi \int_a^b x \, ds$$
- **Parametric Rotation about $x$-axis**:
  $$S = 2\pi \int_{t_1}^{t_2} y(t) \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2} \, dt$$

---

### Variable Reference & Unit Analysis

| Symbol | Mathematical / Physical Meaning | Standard Dimension / Unit | Role in Governing Equations |
|---|---|---|---|
| $x, y, t$ | Independent spatial coordinates and parameter | $[\text{m}]$ or dimensionless | Integration bounds and curve domain |
| $f(x), g(x)$ | Curve boundary functions | $[\text{m}]$ or function value | Function heights defining integrand envelopes |
| $A$ | Enclosed planar area | $[\text{m}^2]$ | Integral of vertical/horizontal differentials $\int (y_1 - y_2)dx$ |
| $V$ | Enclosed 3D solid volume | $[\text{m}^3]$ | Integrated cross-sectional disk/shell volume $\int \pi R^2 dx$ |
| $L$ | Arc length of 1D curve in plane | $[\text{m}]$ | Integral of Euclidean line element $\int \sqrt{1 + (y')^2}dx$ |
| $S$ | Surface area of 3D shell | $[\text{m}^2]$ | Integrated circular frustum ribbons $\int 2\pi r \, ds$ |
| $ds$ | Differential arc element | $[\text{m}]$ | $\sqrt{1 + (f'(x))^2}\,dx$ |
| $R(x), r(x)$ | Outer and inner radius of revolution | $[\text{m}]$ | Distance from curve to rotational axis |
| $h(x)$ | Height of cylindrical shell | $[\text{m}]$ | Differential cylinder height $[f(x) - g(x)]$ |
| $C$ | Constant of integration | Same as $F(x)$ | Unspecified constant offset for antiderivative family |
