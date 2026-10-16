/**
 * Physics Topic: Heat Transfer & Thermodynamics
 *
 * Designed from foundational first-principles for learners encountering
 * thermal physics, heat transfer mechanisms, and thermodynamic laws for the first time.
 */
const thermodynamicsData = {
  id: 'thermodynamics',
  title: 'Heat Transfer & Thermodynamics',
  subtitle:
    'From microscopic atomic vibrations and gas kinetics to macroscopic work, heat transfer mechanisms, and the irreversible arrow of entropy.',
  level: 'Beginner to Intermediate',
  estimatedTime: '35 min read + interactive laboratory',
  overview: [
    'Thermodynamics is the branch of physics that governs the relationships between heat, work, temperature, and energy. While classical mechanics tracks individual macroscopic objects like balls or carts, thermodynamics bridges the gap between the microscopic realm of trillions of jostling atoms and the macroscopic properties we can measure in the laboratory—such as temperature, pressure, volume, and thermal expansion.',
    'A central breakthrough of modern thermal physics is understanding what "Heat" actually is. In everyday conversation, people often say "an object contains a lot of heat." In physics, this is technically incorrect: matter contains internal energy, not heat. Temperature is a measure of the average translational kinetic energy per molecule. Heat (Q) is strictly defined as thermal energy in transit across a boundary driven solely by a temperature difference between two systems.',
    'Whenever a temperature difference exists, energy naturally migrates from higher temperature to lower temperature through three distinct physical mechanisms: Conduction (energy passed via microscopic collisions and free electrons in solids), Convection (energy transported by bulk fluid circulation driven by buoyancy or fans), and Radiation (energy emitted as electromagnetic waves, which requires no material medium and can travel across the absolute vacuum of outer space).',
    'Macroscopic energy conversion is governed by the Four Laws of Thermodynamics. The Zeroth Law defines temperature and thermal equilibrium. The First Law establishes conservation of energy, showing that heat added to a system can either increase its internal energy or perform mechanical work. The Second Law reveals the fundamental asymmetry of nature: while work can be 100% converted into heat, heat can never be completely converted into mechanical work in a cyclic engine without dumping waste heat to a colder sink. The Third Law establishes that absolute zero (0 Kelvin) is an unattainable physical limit.',
  ],
  keyConcepts: [
    {
      title: 'Temperature, Internal Energy & Heat',
      content:
        'Temperature (T) reflects average molecular kinetic energy. Internal energy (U) is total microscopic energy. Heat (Q) is energy in transit solely driven by a temperature difference.',
    },
    {
      title: 'The Zeroth Law & Absolute Temperature',
      content:
        'Thermal equilibrium is transitive (if A=B and B=C, then A=C). Calculations strictly require the absolute Kelvin scale (TK = TC + 273.15) where 0 K represents zero molecular translation.',
    },
    {
      title: 'Conduction, Convection & Radiation',
      content:
        'Conduction transfers heat through atomic lattice collisions. Convection circulates heat via macroscopic fluid flow. Radiation emits electromagnetic waves across vacuum (P ∝ T⁴).',
    },
    {
      title: 'The First Law & Boundary Work',
      content:
        'Energy is conserved: ΔU = Q - W. Expanding gas does work on surroundings (W = ∫ P dV), reducing internal energy and temperature unless heat is added.',
    },
    {
      title: 'The Four Fundamental Gas Processes',
      content:
        'Isobaric (constant P, W = PΔV), Isochoric (constant V, W = 0, ΔU = Q), Isothermal (constant T, ΔU = 0, Q = W), and Adiabatic (insulated Q = 0, PV^γ = const).',
    },
    {
      title: 'The Second Law, Entropy & Carnot Limit',
      content:
        'Entropy increases in spontaneous processes (ΔS ≥ 0). No heat engine can be 100% efficient; maximum reversible efficiency is the Carnot limit: η = 1 - TC / TH.',
    },
  ],
  equations: [
    {
      name: 'Ideal Gas Law (Equation of State)',
      latex: 'PV = nRT = N k_B T',
      summary:
        'Relates the macroscopic thermodynamic state variables (pressure P, volume V, absolute temperature T) to the quantity of gas molecules.',
      conditions: [
        'Gas molecules are treated as point masses with negligible molecular volume',
        'Intermolecular forces between molecules are negligible except during elastic collisions',
        'Temperature T must strictly be expressed in Kelvin (K)',
      ],
      variables: [
        {
          symbol: 'P',
          name: 'Absolute Pressure',
          unit: '\\text{Pa} = \\text{N/m}^2',
          description:
            'The perpendicular force per unit area exerted on container walls by trillions of colliding gas molecules.',
          connections:
            'Proportional to absolute temperature T and number of moles n. Inversely proportional to volume V (Boyle’s Law: halving volume doubles the collision frequency against walls, doubling pressure).',
        },
        {
          symbol: 'V',
          name: 'Volume',
          unit: '\\text{m}^3',
          description: 'The three-dimensional spatial capacity accessible to the enclosed gas molecules.',
          connections:
            'Scales linearly with temperature T at constant pressure (Charles’s Law: heating a flexible balloon causes it to expand). Inversely proportional to pressure P.',
        },
        {
          symbol: 'n',
          name: 'Amount of Substance',
          unit: '\\text{mol}',
          description: 'The quantity of gas measured in moles (where 1 mol = 6.022 × 10²³ molecules).',
          connections:
            'Adding more gas molecules into a fixed volume at fixed temperature increases wall collision frequency, raising pressure proportionally.',
        },
        {
          symbol: 'R',
          name: 'Universal Gas Constant',
          unit: '\\text{J}/(\\text{mol}\\cdot\\text{K})',
          description:
            'The fundamental proportionality constant connecting thermal energy per mole to temperature: R ≈ 8.314 J/(mol·K).',
          connections:
            'Relates to Boltzmann’s constant through Avogadro’s number: R = N_A · k_B.',
        },
        {
          symbol: 'T',
          name: 'Absolute Temperature',
          unit: '\\text{K}',
          description:
            'The thermodynamic temperature measured from absolute zero (T_K = T_C + 273.15).',
          connections:
            'Directly proportional to the average translational kinetic energy of the molecules: E_k,avg = (3/2) k_B T. Doubling T in Kelvin doubles the average kinetic energy and doubles the product P·V.',
        },
        {
          symbol: 'N',
          name: 'Total Number of Molecules',
          unit: '\\text{molecules (dimensionless)}',
          description: 'The total microscopic count of gas particles in the container: N = n · N_A.',
          connections:
            'Pairs with Boltzmann’s constant k_B in the microscopic form PV = N k_B T.',
        },
        {
          symbol: 'k_B',
          name: 'Boltzmann Constant',
          unit: '\\text{J/K}',
          description:
            'The bridge constant between microscopic molecular energy and macroscopic temperature: k_B ≈ 1.3806 × 10⁻²³ J/K.',
          connections:
            'Appears in kinetic theory, statistical entropy (S = k_B ln Ω), and equipartition theorem.',
        },
      ],
    },
    {
      name: 'Sensible Heat & Specific Heat Capacity',
      latex: 'Q = mc\\Delta T = mc(T_f - T_i)',
      summary:
        'Calculates the thermal energy Q transferred into or out of a substance of mass m to produce a temperature change ΔT without a phase transition.',
      conditions: [
        'No phase changes (melting, boiling, sublimation) occur over the temperature interval',
        'Specific heat capacity c remains approximately constant over ΔT',
      ],
      variables: [
        {
          symbol: 'Q',
          name: 'Heat Transferred',
          unit: '\\text{J}',
          description:
            'The quantity of thermal energy transferred across the boundary. Positive (Q > 0) when absorbed by the body, negative (Q < 0) when released.',
          connections:
            'Scales proportionally with mass m, specific heat c, and temperature difference ΔT. If Q is absorbed at constant volume in a gas, it directly equals ΔU.',
        },
        {
          symbol: 'm',
          name: 'Mass',
          unit: '\\text{kg}',
          description: 'The total mass of the substance undergoing heating or cooling.',
          connections:
            'Thermal inertia: a larger mass requires proportionally more energy to change its temperature by the same amount.',
        },
        {
          symbol: 'c',
          name: 'Specific Heat Capacity',
          unit: '\\text{J}/(\\text{kg}\\cdot\\text{K})',
          description:
            'The amount of thermal energy required to raise the temperature of 1 kilogram of a specific substance by 1 Kelvin.',
          connections:
            'Substances with high c (like liquid water, c ≈ 4184 J/kg·K) resist temperature changes and act as massive thermal buffers. Metals have small c (copper c ≈ 385 J/kg·K) and heat up or cool down rapidly.',
        },
        {
          symbol: '\\Delta T',
          name: 'Temperature Change',
          unit: '\\text{K} \\text{ or } ^\\circ\\text{C}',
          description: 'The net difference between final temperature and initial temperature: T_f - T_i.',
          connections:
            'Because 1 Kelvin step is identical in size to 1 Celsius degree step, ΔT is numerically identical whether calculated in Kelvin or Celsius.',
        },
        {
          symbol: 'T_i, T_f',
          name: 'Initial and Final Temperatures',
          unit: '\\text{K} \\text{ or } ^\\circ\\text{C}',
          description: 'The starting temperature T_i before heating/cooling and ending temperature T_f.',
          connections:
            'When T_f > T_i, ΔT > 0 and heat Q > 0 is absorbed by the substance.',
        },
      ],
    },
    {
      name: 'First Law of Thermodynamics (Energy Conservation)',
      latex: '\\Delta U = Q - W',
      summary:
        'States that the internal energy change of a closed system is the net result of heat absorbed minus mechanical work performed by the system.',
      conditions: [
        'Applies to closed systems (no mass exchange across boundaries)',
        'Sign convention: Q > 0 into system, W > 0 done BY system on surroundings',
      ],
      variables: [
        {
          symbol: '\\Delta U',
          name: 'Change in Internal Energy',
          unit: '\\text{J}',
          description:
            'The net change in the total microscopic kinetic and potential energies stored inside the system: U_final - U_initial.',
          connections:
            'For an ideal gas, U depends exclusively on temperature (ΔU = n Cᵥ ΔT). In any cyclic process returning to its starting state, the net change over the full cycle is identically zero (∮ dU = 0).',
        },
        {
          symbol: 'Q',
          name: 'Net Heat Added',
          unit: '\\text{J}',
          description: 'Thermal energy transferred into the system through the boundary.',
          connections:
            'If Q > 0, heat flows in, tending to increase internal energy or enable work output. In adiabatic processes, Q = 0, so ΔU = -W.',
        },
        {
          symbol: 'W',
          name: 'Boundary Work Done by System',
          unit: '\\text{J}',
          description:
            'Mechanical work executed by the expanding fluid against external resisting forces: W = ∫ P dV.',
          connections:
            'If the gas expands (ΔV > 0), W > 0 and the system spends internal energy. If the surroundings compress the gas (ΔV < 0), W < 0, meaning work is done ON the gas, raising its internal energy.',
        },
      ],
    },
    {
      name: "Fourier's Law of 1D Thermal Conduction",
      latex: '\\dot{Q} = \\frac{Q}{t} = -kA \\frac{dT}{dx} = \\frac{kA(T_H - T_C)}{L}',
      summary:
        'Quantifies the steady-state conductive heat transfer rate through a slab of cross-sectional area A and thickness L separating temperatures T_H and T_C.',
      conditions: [
        'Steady-state thermal conditions (temperature at any point along the slab is constant in time)',
        'One-dimensional heat flow perpendicular to cross-sectional area A',
        'Uniform, isotropic thermal conductivity k across the material',
      ],
      variables: [
        {
          symbol: '\\dot{Q}',
          name: 'Conductive Heat Transfer Rate (Heat Flux Power)',
          unit: '\\text{W} = \\text{J/s}',
          description: 'The quantity of thermal energy conducted through the material per second.',
          connections:
            'Increases linearly with thermal conductivity k, surface area A, and temperature difference (T_H - T_C). Decreases inversely with wall thickness L.',
        },
        {
          symbol: 'Q, t',
          name: 'Conducted Heat Energy & Time Interval',
          unit: '\\text{J}, \\; \\text{s}',
          description: 'Total thermal energy Q transferred over elapsed time t (Q̇ = Q / t).',
          connections:
            'In steady state, total heat conducted grows linearly with time: Q = Q̇ · t.',
        },
        {
          symbol: 'k',
          name: 'Thermal Conductivity',
          unit: '\\text{W}/(\\text{m}\\cdot\\text{K})',
          description:
            'The intrinsic physical property of a material measuring its ability to conduct heat.',
          connections:
            'Excellent conductors: Copper (k ≈ 398 W/m·K), Aluminum (k ≈ 205 W/m·K). Thermal insulators: Glass (k ≈ 0.8 W/m·K), Wood (k ≈ 0.15 W/m·K), Aerogel (k ≈ 0.02 W/m·K).',
        },
        {
          symbol: 'A',
          name: 'Cross-Sectional Conduction Area',
          unit: '\\text{m}^2',
          description: 'The area of the slab normal to the direction of heat flow.',
          connections:
            'Doubling the wall or bar area doubles the number of parallel microscopic heat conduction paths, doubling heat flow rate.',
        },
        {
          symbol: 'dT / dx',
          name: 'Spatial Temperature Gradient',
          unit: '\\text{K/m}',
          description: 'Rate of change of temperature with respect to distance x along the heat flow path.',
          connections:
            'The minus sign in -kA(dT/dx) reflects the Second Law: heat flows spontaneously downhill from higher to lower temperature (where dT/dx < 0).',
        },
        {
          symbol: 'L',
          name: 'Conduction Path Length (Thickness)',
          unit: '\\text{m}',
          description: 'The thickness of the insulating barrier or length of the conducting rod.',
          connections:
            'Defines thermal resistance R_th = L / (kA). Doubling the insulation thickness halves the steady-state heat loss rate.',
        },
        {
          symbol: 'T_H, T_C',
          name: 'Hot and Cold Face Temperatures',
          unit: '\\text{K}',
          description: 'Temperatures at the hot boundary (T_H) and cold boundary (T_C), creating driving potential ΔT = T_H - T_C.',
          connections:
            'Acts analogously to electric voltage in Ohm’s law (ΔV = I·R ↔ ΔT = Q_dot · R_th). Without a temperature difference (T_H = T_C), conduction ceases completely.',
        },
      ],
    },
    {
      name: "Newton's Law of Cooling (Convective Heat Transfer)",
      latex: '\\dot{Q} = h A (T_s - T_\\infty)',
      summary:
        'Calculates the convective heat transfer rate between a solid surface at temperature T_s and an adjacent moving fluid at bulk temperature T_∞.',
      conditions: [
        'Fluid is in fluid-dynamic contact with the solid boundary',
        'Applies to both natural (buoyancy-driven) and forced (fan/pump-driven) convection',
      ],
      variables: [
        {
          symbol: '\\dot{Q}',
          name: 'Convective Heat Rate',
          unit: '\\text{W} = \\text{J/s}',
          description: 'The rate of energy transferred from the surface into the flowing fluid.',          
          connections:'Directly proportional to the convection heat transfer coefficient h, surface area A, and thermal driving head (T_s - T_∞).',
        },
        {
          symbol: 'h',
          name: 'Convective Heat Transfer Coefficient',
          unit: '\\text{W}/(\\text{m}^2\\cdot\\text{K})',
          description:
            'A parameter capturing fluid velocity, viscosity, thermal conductivity, and boundary-layer geometry.',
          connections:
            'Not a pure material constant, but a flow-dependent coefficient: Natural convection in air has h ≈ 5 - 25 W/m²·K; Forced airflow (fan cooling a computer CPU) boosts h to 50 - 250 W/m²·K; Forced liquid water cooling reaches 1,000 - 15,000 W/m²·K.',
        },
        {
          symbol: 'A',
          name: 'Exposed Surface Area',
          unit: '\\text{m}^2',
          description: 'The total surface area of the solid in contact with the fluid.',
          connections:
            'This is why radiators, heatsinks, and car engines use thin protruding fins: adding fins multiplies the effective area A by 5× to 20×, massively accelerating heat dissipation without changing overall volume.',
        },
        {
          symbol: 'T_s, T_\\infty',
          name: 'Surface & Ambient Fluid Temperatures',
          unit: '\\text{K}',
          description:
            'The solid boundary temperature T_s and the free-stream ambient fluid temperature T_∞ far from the surface.',
          connections:
            'As heat transfers, if the fluid is not continuously renewed or the surface cools down, (T_s - T_∞) decays exponentially toward zero (thermal equilibrium).',
        },
      ],
    },
    {
      name: 'Stefan-Boltzmann Law of Thermal Radiation',
      latex: 'P_{\\text{net}} = \\epsilon \\sigma A \\left(T^4 - T_{\\text{env}}^4\\right)',
      summary:
        'Calculates the net thermal radiation power exchanged between an object at absolute temperature T and its surrounding environment at T_env.',
      conditions: [
        'Temperatures T and T_env must strictly be in Kelvin (K)',
        'Object has gray-body emissivity ε approximately independent of wavelength',
      ],
      variables: [
        {
          symbol: 'P_{\\text{net}}',
          name: 'Net Radiated Power',
          unit: '\\text{W}',
          description:
            'The net rate of electromagnetic radiant energy emitted (P_emit - P_absorb). If T > T_env, the body net radiates energy and cools down.',
          connections:
            'Governed by the profound fourth-power dependence (T⁴). At room temperature, radiation is moderate; at high temperatures (incandescent filament, flame, star), radiation utterly dominates conduction and convection.',
        },
        {
          symbol: '\\epsilon',
          name: 'Surface Emissivity',
          unit: '\\text{dimensionless (0 to 1)}',
          description:
            'The ratio of radiant energy emitted by the surface relative to an ideal blackbody at the same temperature.',
          connections:
            'An ideal blackbody (perfect emitter and absorber) has ε = 1.0. Polished, shiny metals (like chrome or gold foil on spacecraft) have ε ≈ 0.02 - 0.05, reflecting 95%+ of incoming radiation and emitting almost nothing. Matte black soot has ε ≈ 0.98.',
        },
        {
          symbol: '\\sigma',
          name: 'Stefan-Boltzmann Constant',
          unit: '\\text{W}/(\\text{m}^2\\cdot\\text{K}^4)',
          description:
            'Fundamental physical constant of nature: σ = 2π⁵ k_B⁴ / (15 c² h³) ≈ 5.67037 × 10⁻⁸ W/(m²·K⁴).',
          connections:
            'Derived from quantum mechanics and Planck’s blackbody radiation law integrated across all photon wavelengths from zero to infinity.',
        },
        {
          symbol: 'A',
          name: 'Radiating Surface Area',
          unit: '\\text{m}^2',
          description: 'Total exterior surface area of the emitting body.',
          connections:
            'Radiated power scales linearly with surface area A (for example, a star with twice the radius has 4× the surface area and radiates 4× the power at the same temperature).',
        },
        {
          symbol: 'T',
          name: 'Absolute Temperature of Body',
          unit: '\\text{K}',
          description: 'The surface temperature of the radiating object in Kelvin.',
          connections:
            'Because of T⁴, increasing T from 300 K (room temp) to 600 K (327°C) increases emitted radiation by (600/300)⁴ = 2⁴ = 16-fold! Increasing to 1200 K increases it by 4⁴ = 256-fold.',
        },
        {
          symbol: 'T_{\\text{env}}',
          name: 'Ambient Environment Temperature',
          unit: '\\text{K}',
          description: 'The absolute temperature of the surrounding enclosing walls or sky in Kelvin.',
          connections:
            'Represents incoming thermal radiation absorbed by the object from its environment. If T = T_env, P_net = 0, representing radiative thermal equilibrium.',
        },
      ],
    },
    {
      name: 'Reversible Isothermal Gas Expansion Work',
      latex: 'W = nRT \\ln\\left(\\frac{V_f}{V_i}\\right) = nRT \\ln\\left(\\frac{P_i}{P_f}\\right)',
      summary:
        'Calculates the mechanical boundary work performed by an ideal gas during a quasi-static expansion or compression held at constant temperature T.',
      conditions: [
        'Temperature T remains strictly constant throughout the process (in contact with a thermal bath)',
        'Ideal gas behavior holds (P = nRT / V)',
        'Quasi-static, reversible process with no internal friction or turbulence',
      ],
      variables: [
        {
          symbol: 'W',
          name: 'Isothermal Boundary Work',
          unit: '\\text{J}',
          description:
            'The total mechanical work performed by the gas as its boundary expands from initial volume V_i to final volume V_f.',
          connections:
            'Equal to the shaded area under the hyperbolic curve P = nRT/V on a P-V diagram. Because ΔU = 0 for an isothermal process of an ideal gas, the heat absorbed from the thermal reservoir exactly equals the work performed: Q = W.',
        },
        {
          symbol: 'n',
          name: 'Number of Moles',
          unit: '\\text{mol}',
          description: 'Quantity of enclosed ideal gas.',
          connections:
            'Scales the isothermal work output linearly.',
        },
        {
          symbol: 'R',
          name: 'Universal Gas Constant',
          unit: '\\text{J}/(\\text{mol}\\cdot\\text{K})',
          description: 'Ideal gas proportionality constant: R ≈ 8.314 J/(mol·K).',
          connections:
            'Combines with n and T to set the constant product PV = nRT along the isotherm.',
        },
        {
          symbol: 'T',
          name: 'Constant Isothermal Temperature',
          unit: '\\text{K}',
          description: 'Absolute temperature maintained by the thermal reservoir during expansion or compression.',
          connections:
            'Higher isothermal temperature shifts the hyperbola upward on the P-V diagram, yielding greater work for the same volume ratio.',
        },
        {
          symbol: 'V_i, V_f',
          name: 'Initial and Final Volumes',
          unit: '\\text{m}^3',
          description: 'The starting volume V_i and ending volume V_f of the gas cylinder.',
          connections:
            'If V_f > V_i, ln(V_f / V_i) > 0 and the gas does positive work (W > 0). If compressed (V_f < V_i), ln(V_f / V_i) < 0 and work is done ON the gas (W < 0).',
        },
        {
          symbol: 'P_i, P_f',
          name: 'Initial and Final Pressures',
          unit: '\\text{Pa}',
          description: 'The starting absolute pressure P_i and ending pressure P_f.',
          connections:
            'By Boyle’s Law at constant T, P_i V_i = P_f V_f, so the volume ratio V_f / V_i equals the inverse pressure ratio P_i / P_f.',
        },
      ],
    },
    {
      name: 'Carnot Maximum Thermal Efficiency',
      latex: '\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = \\frac{T_H - T_C}{T_H} = \\frac{W_{\\text{net}}}{Q_H}',
      summary:
        'The maximum theoretical efficiency that ANY cyclic heat engine can possibly achieve when operating between a high-temperature heat source T_H and low-temperature sink T_C.',
      conditions: [
        'Cycle is completely reversible (frictionless, no turbulence, infinitesimal temperature differences across heat exchanges)',
        'Temperatures T_H and T_C must strictly be in absolute units (Kelvin)',
      ],
      variables: [
        {
          symbol: '\\eta_{\\text{Carnot}}',
          name: 'Carnot Thermal Efficiency',
          unit: '\\text{dimensionless (0 to 1, or percentage)}',
          description:
            'The fraction of absorbed thermal energy Q_H that is converted into useful mechanical work W_net.',
          connections:
            'Sets the insurmountable thermodynamic upper ceiling for all real heat engines (steam turbines, gasoline engines, gas turbines). Real engines typically achieve only 50% - 70% of their theoretical Carnot efficiency due to irreversibility, viscous friction, and rapid heat leakage.',
        },
        {
          symbol: 'T_H',
          name: 'Hot Reservoir Absolute Temperature',
          unit: '\\text{K}',
          description: 'The absolute temperature of the heat source supplying thermal energy Q_H.',
          connections:
            'Maximizing efficiency requires driving T_H as high as metallurgical materials allow (e.g., advanced ceramic coatings in modern jet turbine blades operating above 1500 K).',
        },
        {
          symbol: 'T_C',
          name: 'Cold Reservoir Absolute Temperature',
          unit: '\\text{K}',
          description: 'The absolute temperature of the environmental cold sink receiving waste heat Q_C.',
          connections:
            'Usually constrained by the local ambient environment (cooling river water, cooling towers, or ambient air at ~300 K). To reach η = 1.0 (100% efficiency), T_C would need to be 0 Kelvin, which is ruled out by the Third Law of Thermodynamics.',
        },
        {
          symbol: 'W_{\\text{net}}',
          name: 'Net Mechanical Work Output per Cycle',
          unit: '\\text{J}',
          description:
            'The useful shaft work produced in one full cycle: W_net = Q_H - Q_C, representing the enclosed area of the cycle on a P-V diagram.',
          connections:
            'Directly scales with the heat input Q_H and the temperature span (T_H - T_C).',
        },
        {
          symbol: 'Q_H',
          name: 'Heat Absorbed from Hot Reservoir',
          unit: '\\text{J}',
          description: 'Total thermal energy input drawn from the high-temperature source per cycle.',
          connections:
            'Divides W_net to define thermal efficiency η = W_net / Q_H.',
        },
      ],
    },
    {
      name: 'Thermal Conduction in Radial Geometries (Cylinder & Sphere)',
      latex: '\\text{Cylinder: } \\frac{Q}{t} = \\frac{2\\pi k L(T_1 - T_2)}{\\ln(r_2/r_1)}, \\quad \\text{Sphere: } \\frac{Q}{t} = 4\\pi k(T_1 - T_2)\\left[\\frac{r_1 r_2}{r_2 - r_1}\\right]',
      summary:
        'Calculates conductive heat flux through radial walls (such as insulated steam pipes and spherical storage tanks).',
      conditions: ['Steady-state radial heat conduction', 'Uniform thermal conductivity k'],
      variables: [
        {
          symbol: 'Q/t',
          name: 'Radial Heat Transfer Rate',
          unit: '\\text{W (J/s)}',
          description: 'Power transmitted radially outward from inner radius r1 to outer radius r2.',
          connections:
            'In cylindrical pipes, heat loss drops logarithmically with insulation thickness r2/r1.',
        },
        {
          symbol: 'k',
          name: 'Thermal Conductivity',
          unit: '\\text{W}/(\\text{m}\\cdot\\text{K})',
          description: 'Thermal conductivity of the cylindrical or spherical insulation shell.',
          connections:
            'Directly proportional to radial heat transfer rate.',
        },
        {
          symbol: 'L',
          name: 'Cylinder Length',
          unit: '\\text{m}',
          description: 'Axial length of the cylindrical pipe.',
          connections:
            'Heat loss from a pipe scales linearly with pipe length L.',
        },
        {
          symbol: 'T_1, T_2',
          name: 'Inner and Outer Wall Temperatures',
          unit: '\\text{K}',
          description: 'Temperatures at the inner radius r₁ and outer radius r₂.',
          connections:
            'Drives radial heat conduction proportionally to (T₁ - T₂).',
        },
        {
          symbol: 'r_1, r_2',
          name: 'Inner and Outer Radii',
          unit: '\\text{m}',
          description: 'The geometric boundary radii of the cylinder or sphere.',
          connections:
            'Increasing outer radius r2 adds insulation thickness (r₂ - r₁).',
        },
      ],
    },
    {
      name: 'Molar Heat Capacities & Ratio γ',
      latex: '\\Delta U = n C_v \\Delta T, \\quad C_p - C_v = R, \\quad \\gamma = \\frac{C_p}{C_v}',
      summary:
        'Relates internal energy change to constant-volume molar heat capacity Cv, and defines constant-pressure capacity Cp and adiabatic index γ.',
      conditions: [
        'Monatomic gas: Cv = (3/2)R, Cp = (5/2)R, γ = 5/3 ≈ 1.67',
        'Diatomic gas: Cv = (5/2)R, Cp = (7/2)R, γ = 7/5 = 1.40',
      ],
      variables: [
        {
          symbol: '\\Delta U',
          name: 'Internal Energy Change',
          unit: '\\text{J}',
          description: 'Change in total microscopic thermal energy of the ideal gas.',
          connections:
            'Equals n C_v ΔT for ANY ideal gas process (isobaric, isochoric, isothermal, or adiabatic), because internal energy of an ideal gas is a function of temperature alone.',
        },
        {
          symbol: 'n',
          name: 'Number of Moles',
          unit: '\\text{mol}',
          description: 'Amount of gas in moles.',
          connections:
            'Scales internal energy change linearly.',
        },
        {
          symbol: '\\Delta T',
          name: 'Temperature Change',
          unit: '\\text{K}',
          description: 'Change in absolute temperature of the gas.',
          connections:
            'Zero temperature change (ΔT = 0) guarantees zero internal energy change (ΔU = 0).',
        },
        {
          symbol: 'C_v',
          name: 'Molar Heat Capacity at Constant Volume',
          unit: '\\text{J}/(\\text{mol}\\cdot\\text{K})',
          description: 'Heat required per mole to raise temperature by 1 K at constant volume.',
          connections:
            'Directly dictates internal energy for any process: ΔU = n Cv ΔT.',
        },
        {
          symbol: 'C_p',
          name: 'Molar Heat Capacity at Constant Pressure',
          unit: '\\text{J}/(\\text{mol}\\cdot\\text{K})',
          description: 'Heat required per mole at constant pressure, accounting for expansion work: Cp = Cv + R.',
          connections:
            'Always larger than Cv by exactly universal gas constant R (Mayer’s relation).',
        },
        {
          symbol: 'R',
          name: 'Universal Gas Constant',
          unit: '\\text{J}/(\\text{mol}\\cdot\\text{K})',
          description: 'Fundamental molar gas constant R ≈ 8.314 J/(mol·K).',
          connections:
            'Represents the extra expansion work per mole per Kelvin done at constant pressure: C_p - C_v = R.',
        },
        {
          symbol: '\\gamma',
          name: 'Heat Capacity Ratio (Adiabatic Index)',
          unit: '\\text{dimensionless}',
          description: 'The ratio γ = Cp / Cv governing sound speed and adiabatic processes.',
          connections:
            '1.67 for noble gases (monatomic), 1.40 for air/nitrogen (diatomic).',
        },
      ],
    },
    {
      name: 'Reversible Adiabatic Process & Expansion Work',
      latex: 'P_1 V_1^\\gamma = P_2 V_2^\\gamma, \\quad T_1 V_1^{\\gamma-1} = T_2 V_2^{\\gamma-1}, \\quad W = \\frac{P_2 V_2 - P_1 V_1}{1 - \\gamma} = \\frac{nR(T_2 - T_1)}{1 - \\gamma}',
      summary:
        'Governs thermally insulated (Q = 0) expansion and compression of ideal gases and computes boundary work.',
      conditions: ['Reversible adiabatic (isentropic) process', 'Ideal gas with constant γ'],
      variables: [
        {
          symbol: 'P_1, P_2',
          name: 'Initial and Final Pressures',
          unit: '\\text{Pa}',
          description: 'Absolute gas pressures at state 1 and state 2.',
          connections:
            'Drops more rapidly during adiabatic expansion than during isothermal expansion because both volume increases and temperature drops.',
        },
        {
          symbol: 'V_1, V_2',
          name: 'Initial and Final Volumes',
          unit: '\\text{m}^3',
          description: 'Gas volumes at state 1 and state 2.',
          connections:
            'Raised to the power γ in P V^γ = const and power (γ - 1) in T V^(γ-1) = const.',
        },
        {
          symbol: 'T_1, T_2',
          name: 'Initial and Final Absolute Temperatures',
          unit: '\\text{K}',
          description: 'Kelvin temperatures at state 1 and state 2.',
          connections:
            'Adiabatic compression (V₂ < V₁) sharply raises temperature (T₂ > T₁), which is how a Diesel engine ignites fuel without spark plugs.',
        },
        {
          symbol: 'n, R',
          name: 'Moles of Gas & Universal Gas Constant',
          unit: '\\text{mol}, \\; \\text{J}/(\\text{mol}\\cdot\\text{K})',
          description: 'Amount of gas n and gas constant R ≈ 8.314 J/(mol·K).',
          connections:
            'Links P₂V₂ - P₁V₁ to nR(T₂ - T₁) via the Ideal Gas Law.',
        },
        {
          symbol: 'W',
          name: 'Adiabatic Boundary Work',
          unit: '\\text{J}',
          description: 'Mechanical work done during adiabatic expansion.',
          connections:
            'Since Q = 0, First Law gives W = -ΔU = -n Cv (T2 - T1). Expanding gas cools dramatically.',
        },
        {
          symbol: '\\gamma',
          name: 'Adiabatic Exponent',
          unit: '\\text{dimensionless}',
          description: 'Ratio of specific heats Cp / Cv.',
          connections:
            'Makes adiabatic curves steeper on a P-V diagram than isothermal curves (P ∝ V^(-γ) vs P ∝ V^(-1)).',
        },
      ],
    },
    {
      name: 'Thermodynamic Entropy Definition',
      latex: '\\Delta S = \\int \\frac{dQ}{T}',
      summary:
        'Defines the macroscopic change in entropy as the integral of reversible heat transfer divided by absolute temperature.',
      conditions: ['Reversible path integration', 'T must strictly be in Kelvin (K)'],
      variables: [
        {
          symbol: '\\Delta S',
          name: 'Entropy Change',
          unit: '\\text{J/K}',
          description: 'The fundamental quantitative measure of thermal energy dispersal and microscopic state multiplicity.',
          connections:
            'For isolated systems, ΔS ≥ 0 (Second Law of Thermodynamics). For a reversible isothermal process, ΔS = Q / T.',
        },
        {
          symbol: 'dQ',
          name: 'Infinitesimal Reversible Heat Transfer',
          unit: '\\text{J}',
          description: 'Differential amount of thermal energy added reversibly to the system.',
          connections:
            'Positive when heat enters the system (increasing entropy); negative when heat leaves (decreasing system entropy).',
        },
        {
          symbol: 'T',
          name: 'Absolute Temperature',
          unit: '\\text{K}',
          description: 'Kelvin temperature at which the heat transfer dQ occurs.',
          connections:
            'Adding the same amount of heat dQ at a lower temperature T produces a larger entropy increase than at a higher temperature.',
        },
      ],
    },
    {
      name: 'Refrigerators & Heat Pumps Coefficient of Performance (C.O.P.)',
      latex: '\\text{COP}_{\\text{ref}} = \\frac{Q_2}{W} = \\frac{Q_2}{Q_1 - Q_2}, \\quad \\text{COP}_{\\text{hp}} = \\frac{Q_1}{W} = \\frac{Q_1}{Q_1 - Q_2}',
      summary:
        'Measures thermal efficiency for cooling (refrigerators, extracting heat Q2 from cold space) and heating (heat pumps, delivering heat Q1 to warm space).',
      conditions: ['Cyclic refrigeration or heat pump cycle', 'W = Q1 - Q2 is input shaft work'],
      variables: [
        {
          symbol: '\\text{COP}_{\\text{ref}}',
          name: 'Refrigerator Coefficient of Performance',
          unit: '\\text{dimensionless}',
          description: 'Heat extracted from the cold compartment per unit of work consumed.',
          connections:
            'Higher COP reduces electricity consumption: COP_hp = COP_ref + 1.',
        },
        {
          symbol: '\\text{COP}_{\\text{hp}}',
          name: 'Heat Pump Coefficient of Performance',
          unit: '\\text{dimensionless}',
          description: 'Heat delivered to the indoor space per unit of electrical work.',
          connections:
            'Always exceeds 1.0 (typically 3.0 to 4.5), delivering much more heat energy than direct resistive electric heating!',
        },
        {
          symbol: 'Q_1, Q_2',
          name: 'Hot & Cold Reservoir Heat Transfers',
          unit: '\\text{J}',
          description: 'Q1 is heat discharged to the hot sink; Q2 is heat absorbed from the cold source.',
          connections:
            'Energy conservation ensures Q1 = Q2 + W.',
        },
        {
          symbol: 'W',
          name: 'Work Input to Compressor',
          unit: '\\text{J}',
          description: 'External mechanical or electrical work required to drive heat from cold to hot: W = Q₁ - Q₂.',
          connections:
            'Without work input (W = 0), heat cannot flow spontaneously from a cold reservoir to a hot reservoir (Clausius statement of the Second Law).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Explore the 4 interactive laboratories designed to build deep physical intuition from scratch: (1) Microscopic Kinetic Simulator to watch how atomic speeds define heat and pressure; (2) The 3 Heat Transfer Mechanisms with live conduction temperature gradients, fluid convection loops, and Stefan-Boltzmann glowing blackbody radiation; (3) P-V Diagram & 4 Thermodynamic Processes with synchronized cylinder piston and shaded boundary work; and (4) The Carnot Engine Laboratory showing hot/cold heat reservoirs, mechanical work generation, and the fundamental efficiency ceiling.',
};

export default thermodynamicsData;
