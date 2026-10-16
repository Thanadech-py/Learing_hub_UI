import numberSystemsData from './number-systems.js';
import algebraicExpressionsData from './algebraic-expressions.js';
import functionsData from './functions.js';
import trigonometryData from './trigonometry.js';
import limitsData from './limits.js';
import derivativesData from './derivatives.js';
import integralsData from './integrals.js';
import uSubstitutionData from './u-substitution.js';
import integrationByPartsData from './integration-by-parts.js';
import trigonometricIntegralsData from './trigonometric-integrals.js';
import trigonometricSubstitutionData from './trigonometric-substitution.js';
import partialFractionsData from './partial-fractions.js';
import improperIntegralsData from './improper-integrals.js';
import areaBetweenCurvesData from './area-between-curves.js';
import volumeSolidsRevolutionData from './volume-solids-revolution.js';
import arcLengthSurfaceAreaData from './arc-length-surface-area.js';

// The 7 overarching topics for Mathematics
const mainMathTopics = [
  numberSystemsData,
  algebraicExpressionsData,
  functionsData,
  trigonometryData,
  limitsData,
  derivativesData,
  integralsData,
];

// All topics & sub-topics mapped by ID
const allTopics = [
  ...mainMathTopics,
  uSubstitutionData,
  integrationByPartsData,
  trigonometricIntegralsData,
  trigonometricSubstitutionData,
  partialFractionsData,
  improperIntegralsData,
  areaBetweenCurvesData,
  volumeSolidsRevolutionData,
  arcLengthSurfaceAreaData,
];

const mathTopicMap = new Map(allTopics.map((t) => [t.id, t]));

export function getMathTopicById(id) {
  return mathTopicMap.get(id);
}

export function getAllMathTopics() {
  return mainMathTopics;
}

export default mainMathTopics;
