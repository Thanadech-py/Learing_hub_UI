import VectorsViz from './VectorsViz.jsx';
import LinearCombinationsViz from './LinearCombinationsViz.jsx';
import MatricesViz from './MatricesViz.jsx';
import MatrixMultiplicationViz from './MatrixMultiplicationViz.jsx';
import LinearTransformationsViz from './LinearTransformationsViz.jsx';
import SystemsOfEquationsViz from './SystemsOfEquationsViz.jsx';
import DeterminantsViz from './DeterminantsViz.jsx';
import VectorSpacesViz from './VectorSpacesViz.jsx';
import OrthogonalViz from './OrthogonalViz.jsx';
import EigenvaluesViz from './EigenvaluesViz.jsx';
import DiagonalizationViz from './DiagonalizationViz.jsx';
import SymmetricMatricesViz from './SymmetricMatricesViz.jsx';
import PositiveDefiniteViz from './PositiveDefiniteViz.jsx';
import SvdViz from './SvdViz.jsx';

const linearAlgebraVizMap = {
  vectors: VectorsViz,
  'linear-combinations': LinearCombinationsViz,
  matrices: MatricesViz,
  'matrix-multiplication': MatrixMultiplicationViz,
  'linear-transformations': LinearTransformationsViz,
  'systems-of-equations': SystemsOfEquationsViz,
  determinants: DeterminantsViz,
  'vector-spaces': VectorSpacesViz,
  orthogonal: OrthogonalViz,
  'eigenvalues-and-eigenvectors': EigenvaluesViz,
  diagonalization: DiagonalizationViz,
  'symmetric-matrices': SymmetricMatricesViz,
  'positive-definite': PositiveDefiniteViz,
  svd: SvdViz,
};

export function getLinearAlgebraVisualization(topicId) {
  return linearAlgebraVizMap[topicId] || null;
}

export default linearAlgebraVizMap;
