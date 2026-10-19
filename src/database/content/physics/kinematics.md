---
id: kinematics
title: "Motion: 1D & 2D Kinematics"
subtitle: "The geometry of motion without regard to its causes: displacement, velocity, acceleration, and projectile flight."
level: Beginner
estimatedTime: 20 min read + interactive lab
interactiveLab:
  defaultMode: 2d
  has3D: true
overview:
  - "Kinematics provides the mathematical framework to describe how objects move through space over time. By tracking position x(t) or r(t), we derive velocity as the time rate of change of position, and acceleration as the time rate of change of velocity."
  - "Under the fundamental assumption of constant acceleration, calculus yields the four kinematic equations (suvat equations). In two dimensions, Galileo's principle of superposition allows horizontal and vertical motions to be analysed independently."
---

## 1. Differential & Integral Hierarchy of Motion

Position $x(t)$, velocity $v(t)$, and acceleration $a(t)$ are linked directly by differentiation and integration with respect to time $t$:

$$v(t) = \frac{dx}{dt}, \qquad a(t) = \frac{dv}{dt} = \frac{d^2x}{dt^2}$$

Conversely, integrating acceleration and velocity over $[0, t]$ under constant acceleration $a$ produces the **Kinematic (SUVAT) Equations**:

| Equation | Formula | Eliminated Variable |
| :--- | :---: | :---: |
| **Velocity–Time** | $v = v_0 + at$ | Displacement $s$ |
| **Displacement–Time** | $s = v_0 t + \frac{1}{2}at^2$ | Final velocity $v$ |
| **Torricelli's Equation** | $v^2 = v_0^2 + 2as$ | Elapsed time $t$ |
| **Average Velocity** | $s = \frac{1}{2}(v_0 + v)t$ | Acceleration $a$ |

> [!TIP]
> **Choosing the Right Kinematic Equation**: First identify the one variable among $(s, v_0, v, a, t)$ that is neither given nor asked for, then select the row in the table above that eliminates that variable!

---

## 2. Two-Dimensional Projectile Motion

When an object is launched at speed $v_0$ and angle $\theta$ above the horizontal (neglecting air drag), horizontal and vertical components evolve independently:

$$v_{0x} = v_0\cos\theta \quad (a_x = 0), \qquad v_{0y} = v_0\sin\theta \quad (a_y = -g)$$

Eliminating time $t = \frac{x}{v_0\cos\theta}$ gives the **Parabolic Trajectory Equation**:

$$y(x) = x\tan\theta - \frac{g}{2v_0^2\cos^2\theta}x^2$$

- **Time of Flight**: $T = \frac{2v_0\sin\theta}{g}$
- **Maximum Apex Height**: $H = \frac{v_0^2\sin^2\theta}{2g}$
- **Horizontal Range**: $R = \frac{v_0^2\sin(2\theta)}{g}$ (maximized at $\theta = 45^\circ$ on level ground)
