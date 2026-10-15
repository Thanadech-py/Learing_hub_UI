/**
 * Linear Algebra Topic: Determinants
 */
const determinantsData = {
  id: 'determinants',
  title: 'Determinants: Area, Volume & Scaling',
  subtitle:
    'Geometric meaning of determinants as area and volume scaling factors, orientation preservation, and invertibility testing.',
  level: 'Intermediate',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'The determinant of a square matrix is a single scalar value that reveals the geometric soul of the transformation. Rather than being just a tedious formula with pluses and minuses, the determinant has a direct physical meaning: it is the factor by which the transformation scales areas in 2D or volumes in 3D!',
    'Consider the unit square spanned by basis vectors î = [1, 0]ᵀ and ĵ = [0, 1]ᵀ, which has an area of 1. When a matrix A = [[a, b], [c, d]] transforms space, the unit square becomes a tilted parallelogram spanned by the columns [a, c]ᵀ and [b, d]ᵀ. The area of this parallelogram is exactly |det(A)| = |ad - bc|.',
    'The sign of the determinant indicates orientation. If det(A) > 0, the space preserves its clockwise/counterclockwise orientation. If det(A) < 0, the space has been flipped inside out (reflected like in a mirror). If det(A) = 0, the space has collapsed into a flat 1D line or point (loss of a dimension), meaning the transformation cannot be inverted!',
  ],
  keyConcepts: [
    {
      title: 'Determinant as Area / Volume Scaling Factor',
      content:
        'Every region in the 2D plane has its area scaled by exactly |det(A)| under linear transformation A. If a circle of area 10 is transformed by a matrix with determinant 3, the resulting ellipse will have area exactly 10 × 3 = 30.',
    },
    {
      title: 'Why det(A) = 0 Means Non-Invertible',
      content:
        'If det(A) = 0, the transformation squashes the entire 2D plane onto a 1D line or a single point (the origin). Because infinite original points are compressed onto the same destination coordinate, information is permanently lost. You cannot un-squash a line back into a 2D plane, which is why a matrix is invertible if and only if det(A) ≠ 0.',
    },
    {
      title: 'Key Determinant Algebraic Properties',
      content:
        '• Multiplicative property: det(AB) = det(A) · det(B) (scaling space by A then by B multiplies their area scaling factors!).\n' +
        '• Transpose property: det(Aᵀ) = det(A).\n' +
        '• Inverse matrix determinant: det(A⁻¹) = 1 / det(A).\n' +
        '• Scalar multiplication: For an n × n matrix, det(c · A) = cⁿ · det(A) (doubling all dimensions of a 2D square multiplies its area by 2² = 4).',
    },
  ],
  equations: [
    {
      name: 'Formula for 2×2 Determinant and Signed Area',
      latex: '\\det(A) = \\det\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix} = ad - bc',
      summary:
        'Computes the signed area of the parallelogram formed by the column vectors of matrix A.',
      conditions: ['A is a 2×2 square matrix'],
      variables: [
        {
          symbol: '\\det(A)',
          name: 'Determinant Value',
          unit: '\\mathbb{R}',
          description: 'The signed area scaling factor. Positive preserves orientation; negative reflects orientation.',
          connections: 'If det(A) = 0, matrix is singular (non-invertible).',
        },
        {
          symbol: 'ad - bc',
          name: 'Cross-Product Formula',
          unit: '\\text{area units}',
          description: 'The algebraic expansion of the 2D determinant.',
          connections: 'Equals the 2D cross product of column 1 and column 2: [a, c]ᵀ × [b, d]ᵀ.',
        },
      ],
    },
    {
      name: 'Determinant Product Theorem',
      latex: '\\det(AB) = \\det(A) \\cdot \\det(B), \\quad \\det(A^{-1}) = \\frac{1}{\\det(A)}',
      summary:
        'Demonstrates that the area scaling of a composite transformation is the product of individual scaling factors.',
      conditions: ['A and B are square n × n matrices with det(A) ≠ 0'],
      variables: [
        {
          symbol: '\\det(AB)',
          name: 'Determinant of Product',
          unit: '\\mathbb{R}',
          description: 'Overall area or volume factor after applying both B and A.',
          connections: 'Proves that even though AB ≠ BA, det(AB) = det(BA) always!',
        },
      ],
    },
  ],
  interactiveGuide:
    'Adjust matrix entries a, b, c, d. Watch the unit square transform into a parallelogram. Notice how its area matches |ad - bc| and watch the color switch when det(A) turns negative (orientation flip) or zero (space collapse).',
};

export default determinantsData;
