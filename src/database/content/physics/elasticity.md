---
id: elasticity
title: "Elasticity & Modulus of Materials"
subtitle: "Stress, strain, Hooke's law in deformable bodies, Young's, shear, and bulk moduli, Poisson's ratio, and thermal stress."
level: Intermediate
estimatedTime: 24 min read + interactive lab
interactiveLab:
  defaultMode: 2d
  has3D: false
overview:
  - "Elasticity is the branch of continuum mechanics that investigates the reversible deformation of solid bodies subjected to external mechanical forces and thermal gradients. In the linear elastic regime, deformation is governed by Hooke's generalized law, where restoring intermolecular forces act as microscopic springs."
  - "Isotropic materials exhibit four fundamental, interrelated mechanical moduli: Young's Modulus (Y or E) for uniaxial tension/compression, Shear Modulus (G or S) for planar angular distortion, Bulk Modulus (B) for all-sided hydrostatic compression, and Poisson's Ratio (ν) describing transverse contraction under axial strain."
  - "Beyond static equilibrium, elastic strain energy density u = 1/2 σ ε quantifies the potential energy stored per unit volume, which dictates dynamic resilience against impact loading and explains thermal stress generated when thermal expansion is constrained."
---

## 1. Engineering Stress & Strain

In continuum mechanics, external forces generate internal restoring stresses distributed across material cross-sections:

$$\sigma = \frac{F_{\perp}}{A}, \qquad \epsilon = \frac{\Delta L}{L_0}$$

Where $\sigma$ is normal stress ($\text{Pa} = \text{N/m}^2$) and $\epsilon$ is dimensionless axial strain.

Within the **proportional limit**, deformation obeys Hooke's Law:

$$\sigma = Y \epsilon \iff \Delta L = \frac{F L_0}{Y A}$$

---

## 2. The Four Fundamental Elastic Moduli

For an isotropic material, the elastic response is completely defined by two independent constants, yielding four interrelated standard engineering moduli:

| Modulus | Symbol | Definition Formula | Deformation Physical Mode |
| :--- | :---: | :---: | :--- |
| **Young's Modulus** | $Y$ | $Y = \frac{\sigma}{\epsilon} = \frac{F/A}{\Delta L/L_0}$ | Uniaxial tension or compression along a single axis |
| **Shear Modulus** | $G$ | $G = \frac{\tau}{\gamma} = \frac{F_{\text{tangential}}/A}{\Delta x/h}$ | Lateral angular shear distortion without volume change |
| **Bulk Modulus** | $B$ | $B = -\frac{\Delta P}{\Delta V / V_0}$ | Omnidirectional hydrostatic compression |
| **Poisson's Ratio** | $\nu$ | $\nu = -\frac{\epsilon_{\text{trans}}}{\epsilon_{\text{axial}}}$ | Transverse lateral contraction under axial stretching |

### Isotropic Moduli Interrelations:

$$Y = 2G(1 + \nu) = 3B(1 - 2\nu) = \frac{9BG}{3B + G}$$

---

## 3. Poisson's Ratio & Volumetric Coupling

When an object is stretched along the $x$-axis, lateral dimensions contract:

$$\epsilon_x = \epsilon, \qquad \epsilon_y = -\nu\epsilon, \qquad \epsilon_z = -\nu\epsilon$$

The fractional volumetric change $\frac{\Delta V}{V_0}$ is given by:

$$\frac{\Delta V}{V_0} \approx \epsilon_x + \epsilon_y + \epsilon_z = \epsilon(1 - 2\nu)$$

- For ideal incompressible materials (such as natural rubber), $\nu \to 0.5$, meaning $\frac{\Delta V}{V_0} \to 0$.
- For cork, $\nu \approx 0$, meaning lateral dimensions do not expand or contract under axial load.
- Structural metals typically exhibit $\nu \approx 0.28 \sim 0.33$.

---

## 4. Elastic Strain Energy Density

The potential energy stored per unit volume under elastic deformation equals the area under the linear stress-strain curve:

$$u = \frac{1}{2}\sigma \epsilon = \frac{\sigma^2}{2Y} = \frac{1}{2}Y\epsilon^2 \quad \left[\text{J/m}^3\right]$$

Total stored strain energy in a prismatic bar:

$$U = u \times \text{Volume} = \frac{1}{2} F \Delta L$$

---

## 5. Coupled Thermal Stress & Constrained Expansion

If a solid rod is heated by $\Delta T$ but held rigidly fixed between immovable walls:

$$\Delta L_{\text{free}} = \alpha L_0 \Delta T, \qquad \Delta L_{\text{mech}} = -\frac{F L_0}{Y A}$$

Since total net deformation is constrained to zero:

$$\Delta L_{\text{net}} = \Delta L_{\text{free}} + \Delta L_{\text{mech}} = 0 \implies \sigma_{\text{th}} = Y \alpha \Delta T$$

The internal compressive force exerted on the wall anchors is:

$$F_{\text{th}} = Y A \alpha \Delta T$$
