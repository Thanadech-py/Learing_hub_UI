import cProgrammingData from './c-programming.js';
import pyProgrammingData from './py-programming.js';

const comProgTopics = [
  pyProgrammingData,
  cProgrammingData,
];

export function getComProgTopicById(id) {
  if (id === 'mcu' || id === 'ros') {
    return null; // Marked as In Development
  }
  return comProgTopics.find((t) => t.id === id) || null;
}

export function getAllComProgTopics() {
  return comProgTopics;
}

export default comProgTopics;
