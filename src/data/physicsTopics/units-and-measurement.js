/**
 * Physics Topic: Units & Measurement (Basics Physics Knowledge)
 */
const unitsAndMeasurementData = {
  id: 'units-and-measurement',
  title: 'Basics Physics Knowledge: Units & Measurement',
  subtitle: 'The quantitative foundation of physical laws: SI base units, dimensional consistency, and precision.',
  level: 'Beginner',
  estimatedTime: '15 min read + interactive lab',
  overview: [
    'Physics is an empirical science rooted in quantitative measurement. Every physical law is expressed as a mathematical relationship between physical quantities. To make these measurements universal and reproducible, scientists standardise units and rely on dimensional analysis.',
    'A measurement is meaningless without both a numerical value and an associated physical unit. Furthermore, dimensional homogeneity dictates that in any valid physical equation, every term must possess identical physical dimensions.',
  ],
  keyConcepts: [
    {
      title: 'Base Quantities vs. Derived Quantities',
      content:
        'The International System of Units (SI) defines seven fundamental base quantities: Length (meter, m), Mass (kilogram, kg), Time (second, s), Electric Current (ampere, A), Thermodynamic Temperature (kelvin, K), Amount of Substance (mole, mol), and Luminous Intensity (candela, cd). All other mechanical quantities (velocity, force, work, momentum) are derived combinations of length, mass, and time.',
    },
    {
      title: 'Dimensional Analysis & Homogeneity',
      content:
        'Dimensions are denoted using brackets [ ]. Length is [L], Mass is [M], and Time is [T]. Any term added, subtracted, or equated must have identical dimensions. For example, in s = ut + ½at², [ut] = (LT⁻¹)(T) = L and [½at²] = (LT⁻²)(T²) = L. This is an indispensable tool for verifying theoretical derivations.',
    },
    {
      title: 'Measurement Precision & Error Analysis',
      content:
        'No measurement is absolute. Instrumental precision depends on least count (the smallest increment a tool can resolve). Errors are classified into systematic errors (calibration bias, zero errors) and random errors (thermal fluctuations, visual parallax). Percentage error benchmarks experimental fidelity.',
    },
  ],
  equations: [
    {
      name: 'Dimensional Formula for Force',
      latex: '[F] = [m][a] = [M][L][T]^{-2}',
      summary:
        'Determines the physical dimensionality of force by multiplying mass dimensions by acceleration dimensions.',
      conditions: ['Valid in classical Newtonian mechanics in all coordinate systems'],
      variables: [
        {
          symbol: '[F]',
          name: 'Dimension of Force',
          unit: '\\text{kg}\\cdot\\text{m/s}^2 \\text{ (Newton, N)}',
          description: 'The composite dimension representing mechanical action that induces acceleration on a mass.',
          connections:
            'Directly proportional to mass [M] and length [L], and inversely proportional to the square of time [T]². If length scale doubles while mass and time are constant, the required force doubles.',
        },
        {
          symbol: '[m]',
          name: 'Dimension of Mass',
          unit: '\\text{kg}',
          description: 'The base dimension [M] representing the quantity of matter and inertial resistance to acceleration.',
          connections:
            'Appears with power +1. Holding acceleration constant, doubling the mass demands twice the dimensional force magnitude.',
        },
        {
          symbol: '[a]',
          name: 'Dimension of Acceleration',
          unit: '\\text{m/s}^2 = [L][T]^{-2}',
          description: 'The rate of change of velocity with respect to time.',
          connections:
            'Decomposed into length [L] divided by time squared [T]². The inverse square time dependence reflects two successive time derivatives (position → velocity → acceleration).',
        },
      ],
    },
    {
      name: 'Percentage Error Formula',
      latex: '\\delta = \\frac{|x_{\\text{m}} - x_{\\text{a}}|}{x_{\\text{a}}} \\times 100\\%',
      summary:
        'Quantifies the experimental discrepancy between an observed measurement and the accepted reference value as a percentage.',
      conditions: ['Applicable when an accepted or theoretical standard value is available', 'x_{accepted} ≠ 0'],
      variables: [
        {
          symbol: '\\delta',
          name: 'Relative Percentage Error',
          unit: '\\% \\text{ (dimensionless)}',
          description: 'The normalised metric of measurement accuracy. A lower value indicates higher experimental fidelity.',
          connections:
            'Directly proportional to the absolute difference |x_measured - x_accepted|. Inversely proportional to x_accepted: a 1 mm error on a 10 mm piece is 10%, but on a 1000 mm piece is only 0.1%.',
        },
        {
          symbol: 'x_{\\text{m}}',
          name: 'Measured Value',
          unit: '\\text{Any unit (must match accepted)}',
          description: 'The raw value recorded during physical measurement with an instrument.',
          connections:
            'As x_measured approaches x_accepted, the numerator approaches 0, driving error δ to 0%. If x_measured is systematically larger, a positive bias exists.',
        },
        {
          symbol: 'x_{\\text{a}}',
          name: 'Theoretical Value',
          unit: '\\text{Same unit as measured}',
          description: 'The established theoretical, standard, or calibrated benchmark value.',
          connections:
            'Acts as the normalizing denominator. Dictates the scale: larger accepted quantities can absorb larger absolute deviations while retaining low relative error.',
        },
      ],
    },
    {
      name: 'Vernier Caliper Least Count',
      latex: '\\text{LC} = 1\\,\\text{MSD} - 1\\,\\text{VSD} = \\frac{\\text{Smallest Main Scale Division}}{\\text{Total Number of Vernier Divisions}}',
      summary:
        'Calculates the minimum resolution that a Vernier caliper can measure with certainty.',
      conditions: ['Valid for standard vernier scales where n vernier divisions equal (n - 1) main scale divisions'],
      variables: [
        {
          symbol: '\\text{LC}',
          name: 'Least Count',
          unit: '\\text{mm or cm}',
          description: 'The smallest measurable increment the instrument can resolve without estimation.',
          connections:
            'Inversely proportional to the total number of vernier divisions. Increasing vernier divisions from 10 to 50 improves resolution by a factor of 5 (e.g. from 0.1 mm to 0.02 mm).',
        },
        {
          symbol: '\\text{MSD}',
          name: 'Main Scale Division',
          unit: '\\text{mm}',
          description: 'The physical spacing between two adjacent graduations on the fixed ruler.',
          connections:
            'Directly scales the base unit of the instrument. Standard metric calipers use 1 mm.',
        },
        {
          symbol: '\\text{VSD}',
          name: 'Vernier Scale Division',
          unit: '\\text{mm}',
          description: 'The slightly narrower spacing between graduations on the sliding vernier plate.',
          connections:
            'Designed to be slightly smaller than 1 MSD. The differential (MSD - VSD) generates the optical coincidence that enables sub-millimeter readings.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive lab below to practice reading a virtual Vernier Caliper in real time, inspect the alignment between main scale and vernier lines, and explore dimensional homogeneity across common physical laws.',
};

export default unitsAndMeasurementData;
