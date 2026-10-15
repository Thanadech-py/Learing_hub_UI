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
      title: 'Heat vs. Temperature vs. Internal Energy: The Golden Distinction',
      content:
        'To master thermodynamics, one must rigorously separate three commonly conflated concepts:\n\n' +
        '1. Temperature (T): A macroscopic property that reflects the average microscopic kinetic energy of random particle motion (vibrations in solids, translations in gases). If two bodies have the same temperature, their particles have the same average kinetic energy, and no net heat flows between them.\n\n' +
        '2. Internal Energy (U): The total microscopic energy stored within a system—including the kinetic energy of all vibrating and translating molecules plus the potential energy stored in intermolecular chemical bonds and intermolecular forces. A giant frozen iceberg at 0°C has a lower temperature than a tiny cup of boiling water at 100°C, but the iceberg possesses far MORE total internal energy simply because it contains billions of times more molecules!\n\n' +
        '3. Heat (Q): Energy in transit. Heat is NOT a state property; a system does not "possess" heat. Energy is called heat only while it is flowing across a system boundary due to a temperature gradient. Once the energy enters the receiving system, it becomes internal energy.',
    },
    {
      title: 'The Zeroth Law & The Absolute Temperature Scale (Kelvin)',
      content:
        'The Zeroth Law states: "If system A is in thermal equilibrium with system B, and system B is in thermal equilibrium with system C, then system A is in thermal equilibrium with system C." While this may sound obvious, it provides the fundamental logical basis for all temperature measurement: it guarantees that a calibrated thermometer (system B) can reliably compare the thermal states of any two separate systems without bringing them into direct contact.\n\n' +
        'Why must thermodynamics use the Kelvin scale? Common scales like Celsius and Fahrenheit choose arbitrary reference points (the freezing point of brine or pure water). In equations of state like PV = nRT, plugging in 0°C would incorrectly imply that gas pressure or volume collapses to zero! The Kelvin scale is an absolute thermodynamic scale whose origin (0 K = -273.15°C) corresponds to absolute zero—the theoretical state where classical molecular translational motion ceases completely.',
    },
    {
      title: 'The Three Heat Transfer Mechanisms: Conduction, Convection, & Radiation',
      content:
        'Heat spontaneously migrates from hotter bodies to cooler bodies through three fundamental physical pathways:\n\n' +
        '• Thermal Conduction: Heat transfer through stationary matter via direct microscopic particle collisions and free electron movement. In solids, hot atoms vibrate vigorously and bump into cooler neighbours, transferring kinetic energy along the lattice. In metals, mobile conduction electrons carry heat extremely rapidly, making copper and aluminum excellent thermal conductors. Insulators (such as wood, foam, or glass) lack free electrons and have bonded lattices that hinder vibrational transport.\n\n' +
        '• Thermal Convection: Heat transfer through the macroscopic bulk motion of fluids (liquids and gases). In Natural (Free) Convection, fluid touching a hot surface warms up, expands, becomes less dense, and is pushed upward by buoyant forces; cooler, denser fluid sinks to replace it, establishing a circulating convection cell. In Forced Convection, an external mechanical device (such as a fan, pump, or breeze) accelerates fluid flow across the surface, dramatically boosting the convective heat transfer coefficient h.\n\n' +
        '• Thermal Radiation: Heat transfer through electromagnetic waves emitted by all matter having an absolute temperature greater than 0 K. Unlike conduction and convection, radiation requires NO material medium—it travels through the absolute vacuum of outer space at the speed of light. Governed by the Stefan-Boltzmann law, emitted power scales with the fourth power of absolute temperature (T⁴). Doubling an object’s absolute temperature multiplies its radiated energy by 2⁴ = 16 times!',
    },
    {
      title: 'The First Law: Energy Conservation & Boundary Work in Gases',
      content:
        'The First Law of Thermodynamics is the law of conservation of energy applied to thermal systems: ΔU = Q - W. The change in internal energy (ΔU) of a closed system equals the net heat added to the system (Q) minus the mechanical work done by the system on its surroundings (W).\n\n' +
        'How does an expanding gas do work? Imagine gas enclosed in a cylinder fitted with a frictionless movable piston of cross-sectional area A. The gas exerts pressure P against the piston face, producing an outward force F = P · A. When the gas expands by an infinitesimal displacement dx, the work done is dW = F · dx = (P · A) dx = P · dV. For any macroscopic expansion from volume V₁ to V₂, the total work done is the geometric area beneath the process curve on a Pressure-Volume (P-V) indicator diagram: W = ∫ P dV.\n\n' +
        'When gas particles bounce off a piston face that is retreating outwards, they rebound with less speed, losing microscopic kinetic energy. Thus, when an isolated gas expands and pushes a piston, it cools down because its internal energy is converted into macroscopic mechanical work!',
    },
    {
      title: 'The Four Fundamental Thermodynamic Processes',
      content:
        'When an ideal gas transitions from one state (P₁, V₁, T₁) to another, it typically follows one of four idealized thermodynamic paths:\n\n' +
        '1. Isobaric (Constant Pressure, ΔP = 0): The gas expands or contracts while pressure remains fixed (e.g., a piston loaded with a constant weight). Work done is simply W = P(V₂ - V₁). Heat added raises both the temperature and does boundary work.\n\n' +
        '2. Isochoric / Isovolumetric (Constant Volume, ΔV = 0): The gas is trapped inside a rigid, unyielding container. Because the piston cannot move, the boundary displacement is zero: W = 0! By the First Law, all heat added goes 100% into increasing the internal energy and temperature: ΔU = Q = n Cᵥ ΔT.\n\n' +
        '3. Isothermal (Constant Temperature, ΔT = 0): The gas is in constant contact with a massive thermal reservoir and expands very slowly. Because internal energy of an ideal gas depends solely on temperature, ΔU = 0. Therefore, all heat absorbed is directly converted into boundary work: Q = W = nRT ln(V₂ / V₁). The curve on a P-V diagram is a hyperbola (P ∝ 1/V).\n\n' +
        '4. Adiabatic (Zero Heat Transfer, Q = 0): The cylinder is either heavily thermally insulated, or the expansion/compression occurs so rapidly that heat has no time to flow across the boundary. By the First Law, ΔU = -W. When an adiabatic gas expands and does work, its internal energy plummets and the gas cools down dramatically (PV^γ = constant, where γ = Cₚ/Cᵥ). This is why gas spraying rapidly from an aerosol can feels freezing cold!',
    },
    {
      title: 'The Second Law, Entropy, & The Carnot Limit',
      content:
        'The First Law states that energy is conserved, but it does not specify which direction natural processes can proceed. A cold cup of coffee never spontaneously gathers heat from the room to boil itself, and a dropped egg never spontaneously reassembles its fragments and leaps back onto the table, even though neither event violates energy conservation!\n\n' +
        'The Second Law of Thermodynamics introduces the concept of Entropy (S)—a quantitative measure of molecular disorder, energy dispersal, and the multiplicity of microscopic states. Clausius stated that heat can never spontaneously flow from a colder body to a hotter body without external work. Kelvin and Planck stated that it is impossible to build a cyclic heat engine whose sole effect is to absorb heat from a single thermal reservoir and convert 100% of it into work.\n\n' +
        'In 1824, French engineer Sadi Carnot proved that the maximum theoretical thermal efficiency of ANY heat engine operating between a hot reservoir at T_H and a cold reservoir at T_C is strictly limited to: η_Carnot = 1 - (T_C / T_H). Even under frictionless, perfectly reversible conditions, an engine MUST reject a portion of its heat (Q_C) to the cold sink. To achieve 100% efficiency, one would need a cold sink at absolute zero (T_C = 0 K), which the Third Law of Thermodynamics proves is physically unattainable.',
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
          symbol: 'L',
          name: 'Conduction Path Length (Thickness)',
          unit: '\\text{m}',
          description: 'The thickness of the insulating barrier or length of the conducting rod.',
          connections:
            'Defines thermal resistance R_th = L / (kA). Doubling the insulation thickness halves the steady-state heat loss rate.',
        },
        {
          symbol: 'T_H - T_C',
          name: 'Thermal Driving Potential (Temperature Difference)',
          unit: '\\text{K}',
          description: 'The temperature difference between the hot and cold faces of the material.',
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
          connections:
            'Directly proportional to the convection heat transfer coefficient h, surface area A, and thermal driving head (T_s - T_∞).',
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
          symbol: 'T_s - T_\\infty',
          name: 'Surface-to-Fluid Temperature Gradient',
          unit: '\\text{K}',
          description:
            'The difference between the surface temperature T_s and the free-stream ambient fluid temperature T_∞.',
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
          symbol: 'V_f / V_i',
          name: 'Expansion Ratio',
          unit: '\\text{dimensionless}',
          description: 'The ratio of final volume to initial volume.',
          connections:
            'If V_f > V_i, the ratio is greater than 1, so ln(V_f / V_i) > 0 and the gas does positive work (W > 0). If the gas is compressed (V_f < V_i), the ratio is less than 1, ln(V_f / V_i) < 0, and external work is done ON the gas (W < 0).',
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
      ],
    },
  ],
  interactiveGuide:
    'Explore the 4 interactive laboratories designed to build deep physical intuition from scratch: (1) Microscopic Kinetic Simulator to watch how atomic speeds define heat and pressure; (2) The 3 Heat Transfer Mechanisms with live conduction temperature gradients, fluid convection loops, and Stefan-Boltzmann glowing blackbody radiation; (3) P-V Diagram & 4 Thermodynamic Processes with synchronized cylinder piston and shaded boundary work; and (4) The Carnot Engine Laboratory showing hot/cold heat reservoirs, mechanical work generation, and the fundamental efficiency ceiling.',
};

export default thermodynamicsData;
