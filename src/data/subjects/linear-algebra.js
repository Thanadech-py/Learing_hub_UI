/**
 * Linear Algebra — subject definition + topic list.
 * See physics.js for how to edit topics (same format in every subject file).
 */
const linearAlgebra = {
  id: 'linear-algebra',
  title: 'Linear Algebra',
  description: 'See vectors, matrices, and transformations come alive in space.',
  icon: 'matrix',
  accent: '#34d399',
  topics: [
    {
      id: 'vectors',
      title: 'Vectors',
      description: 'What vectors are: arrows, lists of numbers, magnitude.',
      level: 'Beginner',
    },
    {
      id: 'linear-combinations',
      title: 'Linear Combinations',
      description: 'Operation of linear Algebra.',
      level: 'Beginner',
    },
    {
      id: 'matrices',
      title: 'Matrices',
      description: 'Matrix notation, types of matrices, and basic operations.',
      level: 'Beginner',
    },
    {
      id: 'matrix-multiplication',
      title: 'Matrix Multiplication',
      description: 'Multiplying matrices as composing transformations.',
      level: 'Intermediate',
    },
    {
      id: 'linear-transformations',
      title: 'Linear Transformations',
      description: 'Rotations, scaling, shears, and how matrices move space.',
      level: 'Intermediate',
    },
    {
      id: 'systems-of-equations',
      title: 'Systems of Linear Equations',
      description: 'Gaussian elimination, row echelon form, and solutions.',
      level: 'Intermediate',
    },
    {
      id: 'determinants',
      title: 'Determinants',
      description: 'How transformations scale area and volume.',
      level: 'Intermediate',
    },
    {
      id: 'vector-spaces',
      title: 'Vector Spaces',
      description: 'Span, basis, dimension, and linear independence.',
      level: 'Advanced',
    },
    {
      id: 'orthogonal',
      title: 'Projection & least Square',
      description: 'Show how to solve the system, when Ax=b has no solution.'
    },
    {
      id: 'eigenvalues-and-eigenvectors',
      title: 'Eigenvalues & Eigenvectors',
      description: 'Directions that only stretch under a transformation.',
      level: 'Advanced',
    },
  ],
};

export default linearAlgebra;
