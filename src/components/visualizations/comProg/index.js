import CProgrammingViz from './CProgrammingViz.jsx';
import PythonProgrammingViz from './PythonProgrammingViz.jsx';
import McuViz from './McuViz.jsx';
import RosViz from './RosViz.jsx';
import IntegratedIDE from './IntegratedIDE.jsx';

export { IntegratedIDE, CProgrammingViz, PythonProgrammingViz, McuViz, RosViz };

export function getComProgVisualization(topicId, subTopicId) {
  if (topicId === 'c-programming') {
    return CProgrammingViz;
  }
  if (topicId === 'py-programming') {
    return PythonProgrammingViz;
  }
  if (topicId === 'mcu') {
    return McuViz;
  }
  if (topicId === 'ros') {
    return RosViz;
  }
  return null;
}

export default getComProgVisualization;
