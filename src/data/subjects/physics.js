/**
 * Physics — subject definition + topic list.
 *
 * HOW TO EDIT TOPICS
 * - Add, remove, or reorder entries in the `topics` array below.
 * - Each topic needs a unique `id` (lowercase, dashes, used in URLs later),
 *   a `title`, and a short `description`.
 * - `level` is optional: 'Beginner' | 'Intermediate' | 'Advanced'.
 *
 * The Home page card previews the first few topics, and the subject page
 * lists all of them — both update automatically.
 */
const physics = {
  id: 'physics',
  title: 'Physics',
  description:
    'Explore motion, forces, energy, waves, and the laws that govern the universe.',
  icon: 'atom',
  accent: '#38bdf8',
  topics: [
    {
      id: 'units-and-measurement',
      title: 'Basics Physics Knowledge',
      description: 'SI units, dimensions, significant figures, and measurement error.',
      level: 'Beginner',
    },
    {
      id: 'kinematics',
      title: 'Motion',
      description: 'Describe 1D-motion and 2D-Motion with displacement, velocity, and acceleration.',
      level: 'Beginner',
    },
    {
      id: 'newtons-laws',
      title: "Newton's Laws",
      description: 'How forces cause motion: inertia, F = ma, and action–reaction.',
      level: 'Beginner',
    },
    {
      id: 'work-and-energy',
      title: 'Work & Energy',
      description: 'Kinetic and potential energy, work, power, and conservation.',
      level: 'Intermediate',
    },
    {
      id: 'momentum',
      title: 'Momentum',
      description: 'Impulse, collisions, and conservation of linear momentum.',
      level: 'Intermediate',
    },
    {
      id: 'circular-motion',
      title: 'Circular Motion',
      description: 'Angular velocity, centripetal force, and rotating frames.',
      level: 'Intermediate',
    },
    {
      id: 'oscillations',
      title: 'Oscillations',
      description: 'Simple harmonic motion, pendulums, springs, and resonance.',
      level: 'Intermediate',
    },
    {
      id: 'waves',
      title: 'Waves',
      description: 'Wave properties, superposition, interference, and sound.',
      level: 'Advanced',
    },
    {
      id: 'fluid-mechanics',
      title: 'Fluid Mechanics',
      description: 'Hydrostatic pressure, Archimedes buoyant force, volumetric continuity, and Bernoulli principle.',
      level: 'Intermediate',
    },
    {
      id: 'thermodynamics',
      title: 'Heat Transfer & Thermodynamics',
      description: 'Thermal physics, conduction, convection, radiation, ideal gas laws, and the four laws of thermodynamics.',
      level: 'Beginner to Intermediate',
    },
  ],
};

export default physics;
