import cProgrammingData from './c-programming.js';
import pyProgrammingData from './py-programming.js';
import mcuData from './mcu.js';
import rosData from './ros.js';

const comProgTopics = [
  pyProgrammingData,
  cProgrammingData,
  mcuData,
  rosData,
];

export function getComProgTopicById(id) {
  return comProgTopics.find((t) => t.id === id) || null;
}

export function getAllComProgTopics() {
  return comProgTopics;
}

export default comProgTopics;
