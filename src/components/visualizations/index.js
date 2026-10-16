import { getPhysicsVisualization } from './physics/index.js';
import { getMathVisualization } from './math/index.js';
import { getLinearAlgebraVisualization } from './linearAlgebra/index.js';

/**
 * Universal visualization resolver supporting Physics, Mathematics, and Linear Algebra.
 */
export function getSubjectVisualization(subjectId, topicId, subTopicId) {
  if (subjectId === 'physics') {
    return getPhysicsVisualization(topicId, subTopicId);
  }
  if (subjectId === 'mathematics') {
    return getMathVisualization(topicId, subTopicId);
  }
  if (subjectId === 'linear-algebra') {
    return getLinearAlgebraVisualization(topicId);
  }
  return null;
}

export default getSubjectVisualization;
