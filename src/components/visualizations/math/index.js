import NumberSystemsViz from './NumberSystemsViz.jsx';
import AlgebraicExpressionsViz from './AlgebraicExpressionsViz.jsx';
import FunctionsViz from './FunctionsViz.jsx';
import TrigonometryViz from './TrigonometryViz.jsx';
import LimitsViz from './LimitsViz.jsx';
import DerivativesViz from './DerivativesViz.jsx';
import IntegralsViz from './IntegralsViz.jsx';
import USubstitutionViz from './USubstitutionViz.jsx';
import IntegrationByPartsViz from './IntegrationByPartsViz.jsx';
import TrigonometricIntegralsViz from './TrigonometricIntegralsViz.jsx';
import TrigonometricSubstitutionViz from './TrigonometricSubstitutionViz.jsx';
import PartialFractionsViz from './PartialFractionsViz.jsx';
import ImproperIntegralsViz from './ImproperIntegralsViz.jsx';
import AreaBetweenCurvesViz from './AreaBetweenCurvesViz.jsx';
import VolumeSolidsRevolutionViz from './VolumeSolidsRevolutionViz.jsx';
import ArcLengthSurfaceAreaViz from './ArcLengthSurfaceAreaViz.jsx';

const mathVizMap = {
  'number-systems': NumberSystemsViz,
  'algebraic-expressions': AlgebraicExpressionsViz,
  functions: FunctionsViz,
  trigonometry: TrigonometryViz,
  limits: LimitsViz,
  derivatives: DerivativesViz,
  integrals: IntegralsViz,
  foundations: IntegralsViz,
  'u-substitution': USubstitutionViz,
  'integration-by-parts': IntegrationByPartsViz,
  'trigonometric-integrals': TrigonometricIntegralsViz,
  'trigonometric-substitution': TrigonometricSubstitutionViz,
  'partial-fractions': PartialFractionsViz,
  'improper-integrals': ImproperIntegralsViz,
  'area-between-curves': AreaBetweenCurvesViz,
  'volume-solids-revolution': VolumeSolidsRevolutionViz,
  'arc-length-surface-area': ArcLengthSurfaceAreaViz,
};

export function getMathVisualization(topicId, subTopicId) {
  if (topicId === 'integrals') {
    if (subTopicId && mathVizMap[subTopicId]) {
      return mathVizMap[subTopicId];
    }
    return IntegralsViz;
  }
  return mathVizMap[topicId] || null;
}

export default mathVizMap;
