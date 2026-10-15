/**
 * Mathematics — subject definition + topic list.
 * See physics.js for how to edit topics (same format in every subject file).
 */
const mathematics = {
  id: 'mathematics',
  title: 'Mathematics',
  description:
    'Build intuition for functions, calculus, and the patterns behind numbers.',
  icon: 'sigma',
  accent: '#a78bfa',
  topics: [
    {
      id: 'number-systems',
      title: 'Number Systems',
      description: 'Natural, integer, rational, real, and complex numbers.',
      level: 'Beginner',
    },
    {
      id: 'algebraic-expressions',
      title: 'Algebraic Expressions',
      description: 'Simplifying, factoring, and solving equations and inequalities.',
      level: 'Beginner',
    },
    {
      id: 'functions',
      title: 'Functions',
      description: 'Domain, range, composition, inverses, and graphing.',
      level: 'Beginner',
    },
    {
      id: 'trigonometry',
      title: 'Trigonometry',
      description: 'The unit circle, sine, cosine, tangent, and identities.',
      level: 'Intermediate',
    },
    {
      id: 'limits',
      title: 'Limits',
      description: 'Approaching values, continuity, and limits at infinity.',
      level: 'Intermediate',
    },
    {
      id: 'derivatives',
      title: 'Derivatives',
      description: 'Rates of change, tangent lines, and differentiation rules.',
      level: 'Intermediate',
    },
    {
      id: 'integrals',
      title: 'Integrals',
      description: 'Area under curves, antiderivatives, and the fundamental theorem.',
      level: 'Advanced',
    },
  ],
};

export default mathematics;
