import { db } from '../database/client.js';
import { getPhysicsTopicById, getAllPhysicsTopics } from './physicsTopics/index.js';
import { getMathTopicById, getAllMathTopics } from './mathTopics/index.js';
import { getLinearAlgebraTopicById, getAllLinearAlgebraTopics } from './linearAlgebraTopics/index.js';
import { getComProgTopicById, getAllComProgTopics } from './comProgTopics/index.js';

/**
 * Universal topic resolver supporting Physics, Mathematics, Linear Algebra, and Com-Prog.
 * Queries the Markdown + YAML mini-database (`src/database/content/`) first and merges
 * with legacy JS definitions for 100% backward compatibility.
 */
export function getTopicData(subjectId, topicId) {
  let legacyTopic = null;
  if (subjectId === 'physics') {
    legacyTopic = getPhysicsTopicById(topicId);
  } else if (subjectId === 'mathematics') {
    legacyTopic = getMathTopicById(topicId);
  } else if (subjectId === 'linear-algebra') {
    legacyTopic = getLinearAlgebraTopicById(topicId);
  } else if (subjectId === 'com-prog') {
    legacyTopic = getComProgTopicById(topicId);
  }

  // If topic is explicitly disabled (e.g. mcu / ros "In Development"), return null
  if (!legacyTopic && (topicId === 'mcu' || topicId === 'ros')) {
    return null;
  }

  return db.resolveTopicWithDb(legacyTopic, subjectId, topicId);
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
