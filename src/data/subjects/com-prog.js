/**
 * Com-Prog (Computer Programming) — subject definition + topic list.
 * Synthesized from academic engineering curricula & professional ISO/C/Python specifications.
 */
const comProg = {
  id: 'com-prog',
  title: 'Com-Prog',
  description:
    'Master computer programming fundamentals, systems architecture, memory addressing, hardware registers, and robotics middleware.',
  icon: 'code',
  accent: '#fb923c',
  topics: [
    {
      id: 'py-programming',
      title: 'Python Programming',
      description:
        'PVM runtime, dynamic typing, comprehensions, decorators, object-oriented dunder protocols, and robust systems architecture.',
      level: 'Beginner',
    },
    {
      id: 'c-programming',
      title: 'C Programming',
      description:
        'Hardware architecture, compilation pipeline, pointers, memory addressing, structs, file I/O, dynamic heap memory, and safe systems programming.',
      level: 'Intermediate',
    },
    {
      id: 'mcu',
      title: 'Microcontroller',
      description:
        'Embedded C/C++, hardware registers, memory-mapped I/O, GPIO bitwise manipulation, timers, PWM, interrupts, and serial communication buses (UART, I2C, SPI).',
      level: 'Advanced',
    },
    {
      id: 'ros',
      title: 'ROS & ROS2',
      description:
        'Robot Operating System engineering: computational graph, DDS middleware, nodes, topics, publishers, subscribers, services, actions, and TF2 spatial transforms.',
      level: 'Advanced',
    },
  ],
};

export default comProg;
