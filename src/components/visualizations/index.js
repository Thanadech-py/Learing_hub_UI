import { getPhysicsVisualization } from './physics/index.js';
import { getMathVisualization } from './math/index.js';
import { getLinearAlgebraVisualization } from './linearAlgebra/index.js';

/**
 * Universal visualization resolver supporting Physics, Mathematics, and Linear Algebra.
 */
export function getSubjectVisualization(subjectId, topicId) {
  if (subjectId === 'physics') {
    return getPhysicsVisualization(topicId);
  }
  if (subjectId === 'mathematics') {
    return getMathVisualization(topicId);
  }
  if (subjectId === 'linear-algebra') {
    return getLinearAlgebraVisualization(topicId);
  }
  return null;
}

export default getSubjectVisualization;
