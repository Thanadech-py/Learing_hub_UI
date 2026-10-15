import vectorsData from './vectors.js';
import linearCombinationsData from './linear-combinations.js';
import matricesData from './matrices.js';
import matrixMultiplicationData from './matrix-multiplication.js';
import linearTransformationsData from './linear-transformations.js';
import systemsOfEquationsData from './systems-of-equations.js';
import determinantsData from './determinants.js';
import vectorSpacesData from './vector-spaces.js';
import orthogonalData from './orthogonal.js';
import eigenvaluesData from './eigenvalues-and-eigenvectors.js';

const linearAlgebraTopics = [
  vectorsData,
  linearCombinationsData,
  matricesData,
  matrixMultiplicationData,
  linearTransformationsData,
  systemsOfEquationsData,
  determinantsData,
  vectorSpacesData,
  orthogonalData,
  eigenvaluesData,
];

const linearAlgebraTopicMap = new Map(linearAlgebraTopics.map((t) => [t.id, t]));

export function getLinearAlgebraTopicById(id) {
  return linearAlgebraTopicMap.get(id);
}

export function getAllLinearAlgebraTopics() {
  return linearAlgebraTopics;
}

export default linearAlgebraTopics;
