/**
 * Physics Topic: Elasticity & Modulus of Materials
 * Synthesized directly from Volume 5: Elasticity & Modulus of Materials
 */
const elasticityData = {
  id: 'elasticity',
  title: 'Elasticity & Modulus of Materials',
  subtitle: "Stress, strain, Hooke's law in deformable bodies, Young's, shear, and bulk moduli, Poisson's ratio, and thermal stress.",
  level: 'Intermediate',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'Elasticity is the branch of continuum mechanics that investigates the reversible deformation of solid bodies subjected to external mechanical forces and thermal gradients. In the linear elastic regime, deformation is governed by Hooke’s generalized law, where restoring intermolecular forces act as microscopic springs.',
    'Isotropic materials exhibit four fundamental, interrelated mechanical moduli: Young’s Modulus (Y or E) for uniaxial tension/compression, Shear Modulus (G or S) for planar angular distortion, Bulk Modulus (B) for all-sided hydrostatic compression, and Poisson’s Ratio (ν) describing transverse contraction under axial strain.',
    'Beyond static equilibrium, elastic strain energy density u = 1/2 σ ε quantifies the potential energy stored per unit volume, which dictates dynamic resilience against impact loading and explains thermal stress generated when thermal expansion is constrained.',
  ],
  keyConcepts: [
    {
      title: 'Engineering Stress vs. Strain',
      content:
        'Normal stress σ = F/A measures internal restoring force per unit area (Pa or N/m²). Engineering strain ε = ΔL/L₀ is dimensionless fractional deformation. The proportional limit defines where Hooke’s linear relation holds.',
      latex: '\\sigma = \\frac{F}{A}, \\qquad \\epsilon = \\frac{\\Delta L}{L_0}, \\qquad \\sigma = Y \\epsilon',
    },
    {
      title: 'The Four Fundamental Elastic Moduli',
      content:
        'Young’s modulus Y governs stretching along a single axis; Shear modulus G resists lateral shape distortion without volume change; Bulk modulus B resists volume shrinkage under uniform pressure; Poisson’s ratio ν couples axial elongation with lateral contraction.',
      latex: 'Y = 2G(1 + \\nu) = 3B(1 - 2\\nu)',
    },
    {
      title: "Poisson's Ratio & Volumetric Coupling",
      content:
        'When stretched axially, solids contract laterally. Poisson’s ratio ν = -ε_trans / ε_axial is bounded between 0 and 0.5 for isotropic materials. The fractional volume change is ΔV/V₀ ≈ ε_axial(1 - 2ν). Rubber has ν ≈ 0.4999 (incompressible, ΔV ≈ 0).',
      latex: '\\frac{\\Delta V}{V_0} = \\epsilon_x + \\epsilon_y + \\epsilon_z = \\epsilon_{\\text{axial}}(1 - 2\\nu)',
    },
    {
      title: 'Coupled Thermal Stress',
      content:
        'When a solid rod heated by ΔT is prevented from expanding by rigid boundaries, it develops an internal compressive thermal stress σ_th = Y α ΔT, exerting an immense force F_th = Y A α ΔT on its anchor supports.',
      latex: '\\sigma_{\\text{th}} = Y \\alpha \\Delta T, \\qquad F_{\\text{th}} = Y A \\alpha \\Delta T',
    },
  ],
  equations: [
    {
      name: "Young's Modulus & Hooke's Law in 1D",
      latex: 'Y = \\frac{\\sigma}{\\epsilon} = \\frac{F / A}{\\Delta L / L_0}',
      summary:
        'Defines the tensile or compressive stiffness of a solid material under uniaxial loading.',
      conditions: [
        'Loading must remain within the proportional elastic limit of the material',
        'Material is homogeneous and isotropic',
      ],
      variables: [
        {
          symbol: 'Y',
          name: "Young's Modulus",
          unit: '\\text{Pa} = \\text{N/m}^2',
          description: 'Tensile stiffness of the material (e.g. Steel ~ 200 GPa, Aluminum ~ 70 GPa).',
          connections:
            'Higher values indicate a stiffer material requiring larger forces to achieve the same elongation. Inversely proportional to strain.',
        },
        {
          symbol: 'F',
          name: 'Applied Normal Force',
          unit: '\\text{N}',
          description: 'External tensile or compressive force applied perpendicular to the face.',
          connections: 'Directly scales axial elongation ΔL.',
        },
        {
          symbol: 'A',
          name: 'Cross-Sectional Area',
          unit: '\\text{m}^2',
          description: 'Original cross-sectional area perpendicular to the applied force.',
          connections: 'Larger area reduces normal stress σ = F/A and decreases elongation.',
        },
        {
          symbol: '\\Delta L',
          name: 'Elongation / Compression',
          unit: '\\text{m}',
          description: 'Change in length of the specimen under load.',
          connections: 'Proportional to original length L₀ and applied force F; inversely proportional to Y and A.',
        },
        {
          symbol: 'L_0',
          name: 'Original Length',
          unit: '\\text{m}',
          description: 'Unstressed initial length of the specimen.',
          connections: 'Doubling length doubles elongation under identical applied stress.',
        },
      ],
    },
    {
      name: 'Shear Modulus & Angular Distortion',
      latex: 'G = \\frac{\\tau}{\\gamma} = \\frac{F_{\\text{tangential}} / A}{\\Delta x / h}',
      summary:
        'Quantifies resistance to shear deformation (sliding parallel layers) without volume change.',
      conditions: [
        'Pure shear within the elastic proportional regime',
        'Small angular deformation (tan γ ≈ γ in radians)',
      ],
      variables: [
        {
          symbol: 'G',
          name: 'Shear Modulus (Modulus of Rigidity)',
          unit: '\\text{Pa}',
          description: 'Resistance to shear deformation (typically ~ Y / [2(1+ν)] ≈ 0.38Y for metals).',
          connections: 'Dictates torsional stiffness in rotating drive shafts and bolt shear resistance.',
        },
        {
          symbol: '\\tau',
          name: 'Shear Stress',
          unit: '\\text{Pa}',
          description: 'Tangential force divided by parallel shear surface area.',
          connections: 'Causes angular deflection γ rather than axial stretching.',
        },
        {
          symbol: '\\gamma',
          name: 'Shear Strain (Shear Angle)',
          unit: '\\text{rad}',
          description: 'Angular distortion angle γ = Δx / h in radians.',
          connections: 'Displacement Δx of top surface divided by perpendicular height h.',
        },
      ],
    },
    {
      name: 'Bulk Modulus & Compressibility',
      latex: 'B = -\\frac{\\Delta P}{\\Delta V / V_0}, \\qquad k = \\frac{1}{B}',
      summary:
        'Measures resistance of a substance to uniform hydrostatic compression from all directions.',
      conditions: [
        'Uniform hydrostatic pressure applied from all directions',
        'Negative sign ensures B is positive when pressure increases and volume decreases',
      ],
      variables: [
        {
          symbol: 'B',
          name: 'Bulk Modulus',
          unit: '\\text{Pa}',
          description: 'Resistance to volumetric compression (Water ~ 2.2 GPa, Steel ~ 160 GPa).',
          connections: 'Directly governs seismic acoustic pressure wave speed: v = √(B/ρ).',
        },
        {
          symbol: '\\Delta P',
          name: 'Hydrostatic Pressure Change',
          unit: '\\text{Pa}',
          description: 'Uniform omnidirectional pressure increase (e.g. ocean depth ΔP = ρ g h).',
          connections: 'Forces volumetric contraction of the submerged body.',
        },
        {
          symbol: '\\Delta V / V_0',
          name: 'Fractional Volume Change (Volumetric Strain)',
          unit: '\\text{dimensionless}',
          description: 'Proportional reduction in volume (negative under compression).',
          connections: 'Calculated as -ΔP / B.',
        },
        {
          symbol: 'k',
          name: 'Compressibility',
          unit: '\\text{Pa}^{-1}',
          description: 'Reciprocal of Bulk Modulus (k = 1/B).',
          connections: 'Commonly tabulated in fluid mechanics and chemical engineering.',
        },
      ],
    },
    {
      name: "Poisson's Ratio & Lateral Strain",
      latex: '\\nu = -\\frac{\\epsilon_{\\text{trans}}}{\\epsilon_{\\text{axial}}} = -\\frac{\\Delta d / d_0}{\\Delta L / L_0}',
      summary:
        'Quantifies the ratio of transverse contraction to axial elongation in a stretched solid.',
      conditions: [
        'Uniaxial stress state within the elastic limit',
        'Isotropic material (0 ≤ ν ≤ 0.5; typical structural metals ν ≈ 0.28 - 0.33)',
      ],
      variables: [
        {
          symbol: '\\nu',
          name: "Poisson's Ratio",
          unit: '\\text{dimensionless}',
          description: 'Transverse-to-axial strain ratio (Greek letter nu).',
          connections:
            'When ν = 0.5, material is perfectly incompressible (ΔV = 0). When ν = 0 (cork), lateral dimensions do not change when compressed.',
        },
        {
          symbol: '\\epsilon_{\\text{trans}}',
          name: 'Transverse Strain',
          unit: '\\text{dimensionless}',
          description: 'Fractional change in diameter or lateral width (negative when stretched).',
          connections: 'Directly linked to necking and cross-sectional contraction.',
        },
        {
          symbol: '\\epsilon_{\\text{axial}}',
          name: 'Axial Strain',
          unit: '\\text{dimensionless}',
          description: 'Fractional change in longitudinal length (ΔL / L₀).',
          connections: 'Driven by uniaxial tension or compression.',
        },
      ],
    },
    {
      name: 'Elastic Strain Energy Density',
      latex: 'u = \\frac{1}{2}\\sigma \\epsilon = \\frac{\\sigma^2}{2Y} = \\frac{1}{2}Y \\epsilon^2',
      summary:
        'Calculates the mechanical potential energy stored per unit volume in a deformed elastic medium.',
      conditions: [
        'Linear elastic Hookean response (area under the linear stress-strain curve)',
      ],
      variables: [
        {
          symbol: 'u',
          name: 'Elastic Strain Energy Density',
          unit: '\\text{J/m}^3 = \\text{N/m}^2',
          description: 'Internal stored energy per cubic meter of material.',
          connections: 'Total stored energy U = u × Volume = 1/2 F ΔL.',
        },
        {
          symbol: '\\sigma',
          name: 'Normal Stress',
          unit: '\\text{Pa}',
          description: 'Instantaneous stress acting on the cross section.',
          connections: 'Energy density scales quadratically with stress: u ∝ σ².',
        },
        {
          symbol: '\\epsilon',
          name: 'Axial Strain',
          unit: '\\text{dimensionless}',
          description: 'Deformation strain.',
          connections: 'Energy density scales quadratically with strain: u ∝ ε².',
        },
      ],
    },
    {
      name: 'Coupled Thermal Stress & Constrained Force',
      latex: '\\sigma_{\\text{th}} = Y \\alpha \\Delta T, \\qquad F_{\\text{th}} = Y A \\alpha \\Delta T',
      summary:
        'Calculates thermal stress and exerted reaction force when thermal expansion is completely constrained.',
      conditions: [
        'Rigid constraints prevent free thermal expansion (zero net strain)',
        'Linear coefficient of thermal expansion α is constant over temperature change ΔT',
      ],
      variables: [
        {
          symbol: '\\sigma_{\\text{th}}',
          name: 'Thermal Stress',
          unit: '\\text{Pa}',
          description: 'Compressive stress generated by heating constrained material.',
          connections: 'Independent of rod length L₀; depends solely on Y, α, and ΔT.',
        },
        {
          symbol: 'F_{\\text{th}}',
          name: 'Constrained Reaction Force',
          unit: '\\text{N}',
          description: 'Force exerted on rigid support abutments.',
          connections: 'Can reach hundreds of kilonewtons in civil infrastructure (railroad tracks, bridge joints).',
        },
        {
          symbol: '\\alpha',
          name: 'Linear Thermal Expansion Coefficient',
          unit: '\\text{K}^{-1} = \\text{°C}^{-1}',
          description: 'Fractional change in length per degree of temperature change (Steel ~ 12 × 10⁻⁶ /°C).',
          connections: 'Higher α produces greater thermal stress when constrained.',
        },
        {
          symbol: '\\Delta T',
          name: 'Temperature Change',
          unit: '\\text{K} \\text{ or } ^\\circ\\text{C}',
          description: 'Change in temperature from ambient installation temperature.',
          connections: 'Positive ΔT induces compressive stress; negative ΔT induces tensile stress.',
        },
      ],
    },
    {
      name: 'Equivalent Spring Constant of an Elastic Rod',
      latex: 'k_{\\text{eq}} = \\frac{Y A}{L_0}, \\qquad F = k_{\\text{eq}} \\Delta L',
      summary:
        'Maps continuum elasticity directly to a discrete Hookean spring constant for structural vibration analysis.',
      conditions: [
        'Prismatic rod with constant cross-section A under uniaxial loading',
      ],
      variables: [
        {
          symbol: 'k_{\\text{eq}}',
          name: 'Equivalent Spring Constant',
          unit: '\\text{N/m}',
          description: 'Effective stiffness of the rod modeled as a discrete spring.',
          connections:
            'Combines in series 1/k_eq = 1/k₁ + 1/k₂ for segmented rods or parallel k_eq = k₁ + k₂ for composite reinforced columns.',
        },
      ],
    },
  ],
};

export default elasticityData;
