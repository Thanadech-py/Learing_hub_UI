import unitsAndMeasurementData from './units-and-measurement.js';
import kinematicsData from './kinematics.js';
import newtonsLawsData from './newtons-laws.js';
import workAndEnergyData from './work-and-energy.js';
import momentumData from './momentum.js';
import circularMotionData from './circular-motion.js';
import elasticityData from './elasticity.js';
import oscillationsData from './oscillations.js';
import wavesData, { waveFoundationsSubPage, soundWavesSubPage } from './waves.js';
import fluidMechanicsData from './fluid-mechanics.js';
import thermodynamicsData from './thermodynamics.js';

const physicsTopics = [
  unitsAndMeasurementData,
  kinematicsData,
  newtonsLawsData,
  workAndEnergyData,
  momentumData,
  circularMotionData,
  elasticityData,
  oscillationsData,
  wavesData,
  fluidMechanicsData,
  thermodynamicsData,
];

const physicsTopicMap = new Map([
  ...physicsTopics.map((topic) => [topic.id, topic]),
  ['wave-foundations', waveFoundationsSubPage],
  ['sound-waves', soundWavesSubPage],
]);

export function getPhysicsTopicById(id) {
  return physicsTopicMap.get(id);
}

export function getAllPhysicsTopics() {
  return physicsTopics;
}

export default physicsTopics;
