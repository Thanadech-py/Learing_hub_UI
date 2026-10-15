/**
 * Linear Algebra Topic: Vectors
 */
const vectorsData = {
  id: 'vectors',
  title: 'Vectors: Geometry & Algebra',
  subtitle:
    'Arrows in space, ordered lists of numbers, Euclidean norms, dot products, and geometric angle projections.',
  level: 'Beginner',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'Vectors are the fundamental building blocks of linear algebra. In physics, a vector is a geometric arrow possessing both a magnitude (length) and a direction (such as displacement, velocity, or force). In computer science and data science, a vector is an ordered list of numerical features representing high-dimensional data.',
    'Linear algebra bridges these two viewpoints. An algebraic coordinate vector v = [v₁, v₂]ᵀ specifies how many steps to take along each orthogonal basis direction. Two fundamental operations define a vector space: Vector Addition (joining arrows tip-to-tail to form a parallelogram) and Scalar Multiplication (stretching, shrinking, or reversing an arrow).',
    'The Dot Product (inner product) connects vector algebra to Euclidean geometry: it measures the directional alignment of two vectors, calculates projection lengths, and determines whether two vectors are perpendicular (orthogonal).',
  ],
  keyConcepts: [
    {
      title: 'Geometric vs. Algebraic Representation',
      content:
        '• Geometric View: A directed line segment characterized by magnitude ||v|| and direction angle θ. Vectors are translation-invariant—they can be drawn anywhere in space, but standard position roots their tail at the origin (0, 0).\n' +
        '• Algebraic View: An n-tuple column vector v ∈ ℝⁿ. Addition and scalar multiplication are performed element-wise.',
    },
    {
      title: 'Vector Addition & The Parallelogram Law',
      content:
        'To add vectors u and v geometrically, place the tail of v at the tip of u; the vector pointing from the tail of u to the tip of v is u + v. Alternatively, u and v form two adjacent sides of a parallelogram whose main diagonal is the vector sum u + v.',
    },
    {
      title: 'The Dot Product & Orthogonality',
      content:
        'The dot product can be calculated in two equivalent ways:\n' +
        '1. Algebraic formula: u · v = u₁ v₁ + u₂ v₂ + ... + u_n v_n.\n' +
        '2. Geometric formula: u · v = ||u|| · ||v|| · cos(θ).\n\n' +
        'If θ < 90°, cos(θ) > 0, so the dot product is positive (vectors point in a similar direction). If θ = 90°, cos(θ) = 0, so u · v = 0! Two non-zero vectors are perpendicular (orthogonal) if and only if their dot product vanishes.',
    },
  ],
  equations: [
    {
      name: 'Euclidean Vector Norm (Length)',
      latex: '\\|v\\| = \\sqrt{v_1^2 + v_2^2 + \\dots + v_n^2} = \\sqrt{v \\cdot v}',
      summary:
        'Computes the geometric length or magnitude of vector v using the generalized Pythagorean theorem.',
      conditions: ['v ∈ ℝⁿ'],
      variables: [
        {
          symbol: '\\|v\\|',
          name: 'Euclidean L2 Norm (Magnitude)',
          unit: '\\mathbb{R}_{\\ge 0}',
          description: 'The geometric length of the arrow from tail to tip.',
          connections: 'Always non-negative; ||v|| = 0 if and only if v is the zero vector [0, 0, ...]ᵀ.',
        },
        {
          symbol: 'v_i',
          name: 'Vector Component along Axis i',
          unit: '\\mathbb{R}',
          description: 'The orthogonal projection coordinate along the i-th dimension.',
          connections: 'Scaling every component by scalar c scales the norm by |c|: ||c·v|| = |c| · ||v||.',
        },
      ],
    },
    {
      name: 'Dot Product and Cosine Formula',
      latex: 'u \\cdot v = \\sum_{i=1}^n u_i v_i = \\|u\\| \\|v\\| \\cos\\theta',
      summary:
        'Connects the algebraic sum of coordinate products to the geometric angle between two vectors.',
      conditions: ['u, v are non-zero vectors in ℝⁿ'],
      variables: [
        {
          symbol: 'u \\cdot v',
          name: 'Dot Product (Scalar Inner Product)',
          unit: '\\mathbb{R}',
          description: 'A single real scalar measuring directional alignment.',
          connections: 'If u · v = 0, the vectors are orthogonal (perpendicular). If u · v = ||u|| ||v||, vectors are parallel.',
        },
        {
          symbol: '\\theta',
          name: 'Angle Between Vectors',
          unit: '\\text{radians or degrees}',
          description: 'The interior angle formed between u and v in their common 2D plane: θ = arccos( (u·v)/(||u|| ||v||) ).',
          connections: 'Ranges between 0° (parallel) and 180° (anti-parallel).',
        },
      ],
    },
  ],
  interactiveGuide:
    'Drag vector u (cyan) and vector v (purple) around the coordinate plane. Watch the tip-to-tail vector addition u + v update in real time with the live dot product and angle readout.',
};

export default vectorsData;
