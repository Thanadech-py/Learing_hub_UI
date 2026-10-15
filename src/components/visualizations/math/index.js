import NumberSystemsViz from './NumberSystemsViz.jsx';
import AlgebraicExpressionsViz from './AlgebraicExpressionsViz.jsx';
import FunctionsViz from './FunctionsViz.jsx';
import TrigonometryViz from './TrigonometryViz.jsx';
import LimitsViz from './LimitsViz.jsx';
import DerivativesViz from './DerivativesViz.jsx';
import IntegralsViz from './IntegralsViz.jsx';

const mathVizMap = {
  'number-systems': NumberSystemsViz,
  'algebraic-expressions': AlgebraicExpressionsViz,
  functions: FunctionsViz,
  trigonometry: TrigonometryViz,
  limits: LimitsViz,
  derivatives: DerivativesViz,
  integrals: IntegralsViz,
};

export function getMathVisualization(topicId) {
  return mathVizMap[topicId] || null;
}

export default mathVizMap;
