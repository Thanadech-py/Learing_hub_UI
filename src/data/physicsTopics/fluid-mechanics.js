/**
 * Physics Topic: Fluid Mechanics (Statics & Dynamics)
 */
const fluidMechanicsData = {
  id: 'fluid-mechanics',
  title: 'Fluid Mechanics: Statics & Dynamics',
  subtitle:
    'Hydrostatic pressure, Archimedes buoyant force, volumetric continuity, and Bernoulli streamline conservation.',
  level: 'Intermediate',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'Fluid mechanics governs the behavior of liquids and gases at rest (hydrostatics) and in motion (hydrodynamics). In statics, fluids cannot support shear stress, so pressure acts perpendicularly on all immersed surfaces and increases linearly with depth.',
    'In motion, mass conservation guarantees that incompressible flow speeds up through constrictions (Continuity). Energy conservation along streamlines dictates that regions of higher fluid speed experience lower internal static pressure (Bernoulli’s Principle).',
  ],
  keyConcepts: [
    {
      title: "Hydrostatic Pressure & Pascal's Principle",
      content:
        'Pressure increases linearly with depth: P = ρgh. Applied pressure in a confined liquid transmits undiminished in all directions throughout the fluid.',
    },
    {
      title: "Archimedes' Principle & Buoyant Force",
      content:
        'Any submerged body experiences an upward buoyant force equal to the weight of the fluid it displaces: Fb = ρfluid g Vdisp. If Fb > weight, it floats.',
    },
    {
      title: 'Equation of Continuity (Mass Conservation)',
      content:
        'For incompressible flow, volumetric flow rate is constant everywhere: Q = A v = const. Narrowing the pipe cross-section forces fluid to speed up (A1 v1 = A2 v2).',
    },
    {
      title: "Bernoulli's Principle (Energy Conservation)",
      content:
        'Along a streamline, total energy head is invariant: P + ½ρv² + ρgy = const. Higher fluid velocity produces a lower static pressure (generating aerodynamic lift).',
    },
  ],
  equations: [
    {
      name: 'Hydrostatic Pressure & Manometer Difference',
      latex: 'P = \\rho g h, \\quad \\Delta P = (\\gamma_m - \\gamma)h = (\\rho_m - \\rho)gh',
      summary:
        'Calculates hydrostatic gauge pressure at depth h and determines pressure difference across a U-tube manometer filled with manometric liquid of specific weight γm.',
      conditions: [
        'Static fluid in gravitational field g',
        'Incompressible fluid with uniform density ρ',
        'Specific weight γ = ρg',
      ],
      variables: [
        {
          symbol: 'P',
          name: 'Hydrostatic Pressure',
          unit: '\\text{Pa} = \\text{N/m}^2',
          description: 'The internal pressure exerted at depth h by the fluid weight above.',
          connections:
            'Increases linearly with depth h and fluid density ρ. In water (ρ = 10³ kg/m³), pressure rises by approximately 1 atm (~101.3 kPa) for every 10 meters of depth.',
        },
        {
          symbol: '\\Delta P',
          name: 'Differential Pressure',
          unit: '\\text{Pa}',
          description: 'Pressure difference measured across manometer columns.',
          connections:
            'Proportional to height column difference h and the difference in fluid specific weights (γ_m - γ).',
        },
        {
          symbol: '\\rho',
          name: 'Fluid Density',
          unit: '\\text{kg/m}^3 \\; (\\rho_{\\text{water}} = 10^3\\,\\text{kg/m}^3)',
          description: 'Mass density of the fluid.',
          connections:
            'Direct multiplier: mercury (ρ = 13,600 kg/m³) generates 13.6 times more hydrostatic pressure than water for the same column height.',
        },
        {
          symbol: '\\rho_m',
          name: 'Manometer Fluid Density',
          unit: '\\text{kg/m}^3',
          description: 'Mass density of the heavier gauge liquid inside the U-tube manometer (e.g., mercury).',
          connections:
            'Must be greater than the working fluid density ρ for a standard downward U-tube loop.',
        },
        {
          symbol: '\\gamma, \\gamma_m',
          name: 'Specific Weights of Fluid & Manometer Liquid',
          unit: '\\text{N/m}^3',
          description: 'Weight per unit volume of the working fluid (γ = ρg) and manometric fluid (γ_m = ρ_m g).',
          connections:
            'Directly relates elevation head h to pressure via ΔP = (γ_m - γ)h.',
        },
        {
          symbol: 'g',
          name: 'Gravitational Acceleration',
          unit: '\\text{m/s}^2 \\approx 9.81\\,\\text{m/s}^2',
          description: 'Standard acceleration due to gravity.',
          connections:
            'Without gravity (in weightless orbit), hydrostatic pressure P = ρgh vanishes completely.',
        },
        {
          symbol: 'h',
          name: 'Depth or Column Height',
          unit: '\\text{m}',
          description: 'Vertical distance below the free liquid surface or height difference between manometer legs.',
          connections:
            'Directly scales pressure: doubling depth doubles hydrostatic gauge pressure.',
        },
      ],
    },
    {
      name: "Archimedes' Buoyant Force Law",
      latex: 'F_b = \\rho_{\\text{fluid}} g V_{\\text{disp}}',
      summary:
        'Determines the net upward buoyant force acting on a submerged or partially submerged body, equal to the weight of displaced fluid.',
      conditions: ['Body fully or partially immersed in a static fluid', 'Negligible surface tension forces'],
      variables: [
        {
          symbol: 'F_b',
          name: 'Buoyant Force',
          unit: '\\text{N}',
          description: 'The resultant upward vertical force caused by higher pressure on the bottom than on the top of the body.',
          connections:
            'Opposes gravity (mg). If Fb > mg, the object accelerates upward until it floats; if Fb < mg, it sinks to the bottom.',
        },
        {
          symbol: '\\rho_{\\text{fluid}}',
          name: 'Surrounding Fluid Density',
          unit: '\\text{kg/m}^3',
          description: 'Density of the liquid medium.',
          connections:
            'Saltwater (ρ ≈ 1025 kg/m³) provides greater buoyant lift than freshwater (ρ = 1000 kg/m³).',
        },
        {
          symbol: 'g',
          name: 'Gravitational Acceleration',
          unit: '\\text{m/s}^2 \\approx 9.81\\,\\text{m/s}^2',
          description: 'Local gravitational field strength.',
          connections:
            'Multiplies displaced mass (ρ_fluid · V_disp) to give the weight of displaced fluid.',
        },
        {
          symbol: 'V_{\\text{disp}}',
          name: 'Displaced Fluid Volume',
          unit: '\\text{m}^3',
          description: 'The volume of fluid pushed aside by the submerged portion of the object.',
          connections:
            'For fully submerged bodies, V_disp equals the total volume of the body.',
        },
      ],
    },
    {
      name: 'Volumetric Flow Rate & Continuity Equation',
      latex: 'Q = Av, \\quad A_1 v_1 = A_2 v_2',
      summary:
        'Expresses mass conservation for steady incompressible flow through a conduit of variable cross section.',
      conditions: ['Steady, laminar, incompressible flow (constant density ρ)'],
      variables: [
        {
          symbol: 'Q',
          name: 'Volumetric Flow Rate',
          unit: '\\text{m}^3/\\text{s}',
          description: 'The volume of fluid passing through a cross section per second.',
          connections:
            'Invariant along the pipe: volume entering per second must equal volume exiting per second.',
        },
        {
          symbol: 'A, A_1, A_2',
          name: 'Cross-Sectional Areas',
          unit: '\\text{m}^2',
          description: 'The internal areas of the conduit perpendicular to flow at general, inlet (1), and outlet (2) sections.',
          connections:
            'Inversely related to flow speed: v = Q / A. Halving pipe diameter drops area by 4 (A ∝ d²), forcing velocity to increase by a factor of 4!',
        },
        {
          symbol: 'v, v_1, v_2',
          name: 'Fluid Flow Velocities',
          unit: '\\text{m/s}',
          description: 'Mean fluid velocities across the general, inlet (1), and outlet (2) cross sections.',
          connections:
            'Higher in narrow constrictions (Venturi throat): v₂ = v₁ (A₁ / A₂).',
        },
      ],
    },
    {
      name: "Bernoulli's Conservation Equation",
      latex: 'P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g y_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g y_2',
      summary:
        'Expresses conservation of mechanical energy per unit volume along a streamline for inviscid, steady, incompressible flow.',
      conditions: [
        'Steady, laminar streamline flow',
        'Inviscid fluid (zero friction/viscosity)',
        'Incompressible fluid (constant density ρ)',
      ],
      variables: [
        {
          symbol: 'P_1, P_2',
          name: 'Static Fluid Pressures',
          unit: '\\text{Pa}',
          description: 'The thermodynamic static pressures of the fluid at points 1 and 2 along the streamline.',
          connections:
            'In a horizontal pipe (y1 = y2), higher flow speed v2 > v1 forces static pressure P2 to drop: P1 - P2 = ½ρ(v2² - v1²).',
        },
        {
          symbol: '\\rho',
          name: 'Fluid Density',
          unit: '\\text{kg/m}^3',
          description: 'Constant mass density of the incompressible flowing fluid.',
          connections:
            'Scales both the kinetic energy density (½ρv²) and potential energy density (ρgy).',
        },
        {
          symbol: 'v_1, v_2',
          name: 'Streamline Flow Speeds',
          unit: '\\text{m/s}',
          description: 'Local fluid velocities at points 1 and 2.',
          connections:
            'Enters quadratically in the dynamic pressure term (½ρv²).',
        },
        {
          symbol: 'g',
          name: 'Gravitational Acceleration',
          unit: '\\text{m/s}^2',
          description: 'Acceleration due to gravity.',
          connections:
            'Governs hydrostatic pressure changes with elevation y.',
        },
        {
          symbol: 'y_1, y_2',
          name: 'Streamline Elevations',
          unit: '\\text{m}',
          description: 'Vertical heights of points 1 and 2 above a reference datum.',
          connections:
            'Pumping fluid upward to a higher elevation (y₂ > y₁) requires a pressure drop or velocity reduction.',
        },
        {
          symbol: '\\frac{1}{2}\\rho v^2',
          name: 'Dynamic Pressure Head',
          unit: '\\text{Pa}',
          description: 'Kinetic energy per unit volume of moving fluid.',
          connections:
            'Exchanges directly with static pressure. Faster velocity converts static pressure energy into kinetic energy.',
        },
        {
          symbol: '\\rho g y',
          name: 'Hydrostatic Elevation Head',
          unit: '\\text{Pa}',
          description: 'Gravitational potential energy per unit volume at elevation y.',
          connections:
            'Pumping fluid upward to higher elevation y consumes static and dynamic pressure head.',
        },
      ],
    },
    {
      name: "Torricelli's Law of Efflux",
      latex: 'v_{\\text{efflux}} = \\sqrt{2gh}',
      summary:
        'Calculates the discharge velocity of an ideal liquid exiting through a small aperture at depth h below an open surface.',
      conditions: [
        'Open reservoir with surface area much larger than the orifice area (A_top >> A_hole)',
        'Inviscid (non-viscous) and incompressible flow under gravity',
      ],
      variables: [
        {
          symbol: 'v_{\\text{efflux}}',
          name: 'Efflux Velocity',
          unit: '\\text{m/s}',
          description: 'Speed of liquid jet discharging from the orifice.',
          connections: 'Identical to the speed acquired by an object falling freely from rest through height h.',
        },
        {
          symbol: 'h',
          name: 'Liquid Depth Above Orifice',
          unit: '\\text{m}',
          description: 'Vertical distance between the free liquid surface and the orifice center.',
          connections: 'Efflux speed scales with the square root of depth √h.',
        },
      ],
    },
    {
      name: 'Hagen-Poiseuille Viscous Laminar Flow',
      latex: 'Q = \\frac{\\pi R^4 \\Delta P}{8 \\eta L}, \\qquad \\Delta P = Q R_{\\text{hydraulic}}',
      summary:
        'Determines the volumetric flow rate of a viscous Newtonian fluid in laminar pipe flow driven by pressure gradient ΔP.',
      conditions: [
        'Laminar flow (Reynolds number Re < 2000)',
        'Constant cross-section cylindrical pipe of radius R and length L',
        'Newtonian fluid with constant dynamic viscosity η',
      ],
      variables: [
        {
          symbol: 'Q',
          name: 'Volumetric Flow Rate',
          unit: '\\text{m}^3/\\text{s}',
          description: 'Volume of fluid passing per second.',
          connections: 'Extreme 4th-power sensitivity to radius (R⁴); halving pipe radius decreases flow by 16 times!',
        },
        {
          symbol: 'R',
          name: 'Pipe Radius',
          unit: '\\text{m}',
          description: 'Internal radius of the cylindrical tube.',
          connections: 'Primary determinant of hydraulic resistance R_hyd = 8ηL / (πR⁴).',
        },
        {
          symbol: '\\Delta P',
          name: 'Pressure Difference',
          unit: '\\text{Pa}',
          description: 'Driving pressure drop across length L.',
          connections: 'Linearly drives flow rate Q against viscous drag.',
        },
        {
          symbol: '\\eta',
          name: 'Dynamic Viscosity',
          unit: '\\text{Pa}\\cdot\\text{s} = \\text{kg}/(\\text{m}\\cdot\\text{s})',
          description: 'Internal fluid shear resistance (Water ~ 1.0 × 10⁻³ Pa·s at 20°C).',
          connections: 'Inversely proportional to volumetric flow rate Q.',
        },
        {
          symbol: 'L',
          name: 'Pipe Length',
          unit: '\\text{m}',
          description: 'Distance over which pressure drop occurs.',
          connections: 'Longer pipe increases frictional resistance.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Explore the interactive Fluid Mechanics laboratory: (1) Hydrostatic Tank & Buoyancy Chamber with adjustable fluid density and submerged floating masses; and (2) Venturi Tube Flow Chamber showing velocity acceleration through constrictions and live static pressure gauge readouts.',
};

export default fluidMechanicsData;
