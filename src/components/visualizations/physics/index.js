import UnitsMeasurementViz from './UnitsMeasurementViz.jsx';
import KinematicsViz from './KinematicsViz.jsx';
import NewtonsLawsViz from './NewtonsLawsViz.jsx';
import WorkEnergyViz from './WorkEnergyViz.jsx';
import MomentumViz from './MomentumViz.jsx';
import CircularMotionViz from './CircularMotionViz.jsx';
import OscillationsViz from './OscillationsViz.jsx';
import WavesViz from './WavesViz.jsx';
import ThermodynamicsViz from './ThermodynamicsViz.jsx';
import FluidMechanicsViz from './FluidMechanicsViz.jsx';

const physicsVizMap = {
  'units-and-measurement': UnitsMeasurementViz,
  kinematics: KinematicsViz,
  'newtons-laws': NewtonsLawsViz,
  'work-and-energy': WorkEnergyViz,
  momentum: MomentumViz,
  'circular-motion': CircularMotionViz,
  oscillations: OscillationsViz,
  waves: WavesViz,
  'fluid-mechanics': FluidMechanicsViz,
  thermodynamics: ThermodynamicsViz,
};

export function getPhysicsVisualization(topicId) {
  return physicsVizMap[topicId] || null;
}

export default physicsVizMap;
