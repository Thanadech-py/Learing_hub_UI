import { getPhysicsTopicById, getAllPhysicsTopics } from './physicsTopics/index.js';
import { getMathTopicById, getAllMathTopics } from './mathTopics/index.js';
import { getLinearAlgebraTopicById, getAllLinearAlgebraTopics } from './linearAlgebraTopics/index.js';
import { getComProgTopicById, getAllComProgTopics } from './comProgTopics/index.js';

/**
 * Universal topic resolver supporting Physics, Mathematics, Linear Algebra, and Com-Prog.
 */
export function getTopicData(subjectId, topicId) {
  if (subjectId === 'physics') {
    return getPhysicsTopicById(topicId);
  }
  if (subjectId === 'mathematics') {
    return getMathTopicById(topicId);
  }
  if (subjectId === 'linear-algebra') {
    return getLinearAlgebraTopicById(topicId);
  }
  if (subjectId === 'com-prog') {
    return getComProgTopicById(topicId);
  }
  return null;
}

export function getAllTopicsForSubject(subjectId) {
  if (subjectId === 'physics') {
    return getAllPhysicsTopics();
  }
  if (subjectId === 'mathematics') {
    return getAllMathTopics();
  }
  if (subjectId === 'linear-algebra') {
    return getAllLinearAlgebraTopics();
  }
  if (subjectId === 'com-prog') {
    return getAllComProgTopics();
  }
  return [];
}
