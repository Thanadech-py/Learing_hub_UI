import numberSystemsData from './number-systems.js';
import algebraicExpressionsData from './algebraic-expressions.js';
import functionsData from './functions.js';
import trigonometryData from './trigonometry.js';
import limitsData from './limits.js';
import derivativesData from './derivatives.js';
import integralsData from './integrals.js';

const mathTopics = [
  numberSystemsData,
  algebraicExpressionsData,
  functionsData,
  trigonometryData,
  limitsData,
  derivativesData,
  integralsData,
];

const mathTopicMap = new Map(mathTopics.map((t) => [t.id, t]));

export function getMathTopicById(id) {
  return mathTopicMap.get(id);
}

export function getAllMathTopics() {
  return mathTopics;
}

export default mathTopics;
