/**
 * Com-Prog (Computer Programming) — subject definition + topic list.
 * See physics.js for how to edit topics (same format in every subject file).
 */
const comProg = {
  id: 'com-prog',
  title: 'Com-Prog',
  description:
    'Learn computer programming fundamentals, from variables to algorithms.',
  icon: 'code',
  accent: '#fb923c',
  topics: [
    {
      id: 'py-programming',
      title: 'Python-Programming',
      description: 'Explain how to use Python syntax',
      level: 'Beginner',
    },
    {
      id: 'c-programming',
      title: 'C-Programming',
      description: 'Explain how to use C syntax',
      level: 'Intermediate', 
    },
    {
      id: 'mcu',
      title: 'Microcontroller',
      description: 'Explain how to use C++ for Microcontroller',
      level: 'Advanced',
    },
    {
      id: 'ros',
      title: 'ROS & ROS2',
      description: 'Explain how to use Robot Operating system',
      level: 'Advanced',
    },
  ],
};

export default comProg;
