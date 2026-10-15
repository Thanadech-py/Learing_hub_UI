import unitsAndMeasurementData from './units-and-measurement.js';
import kinematicsData from './kinematics.js';
import newtonsLawsData from './newtons-laws.js';
import workAndEnergyData from './work-and-energy.js';
import momentumData from './momentum.js';
import circularMotionData from './circular-motion.js';
import oscillationsData from './oscillations.js';
import wavesData from './waves.js';
import thermodynamicsData from './thermodynamics.js';

const physicsTopics = [
  unitsAndMeasurementData,
  kinematicsData,
  newtonsLawsData,
  workAndEnergyData,
  momentumData,
  circularMotionData,
  oscillationsData,
  wavesData,
  thermodynamicsData,
];

const physicsTopicMap = new Map(
  physicsTopics.map((topic) => [topic.id, topic])
);

export function getPhysicsTopicById(id) {
  return physicsTopicMap.get(id);
}

export function getAllPhysicsTopics() {
  return physicsTopics;
}

export default physicsTopics;
