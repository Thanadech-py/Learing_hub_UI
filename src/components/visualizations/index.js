import { getPhysicsVisualization } from './physics/index.js';
import { getMathVisualization } from './math/index.js';
import { getLinearAlgebraVisualization } from './linearAlgebra/index.js';
import { getComProgVisualization } from './comProg/index.js';

/**
 * Universal visualization resolver supporting Physics, Mathematics, Linear Algebra, and Com-Prog.
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
  if (subjectId === 'com-prog') {
    return getComProgVisualization(topicId, subTopicId);
  }
  return null;
}

export default getSubjectVisualization;
