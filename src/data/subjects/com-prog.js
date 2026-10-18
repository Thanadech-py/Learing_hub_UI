/**
 * Com-Prog (Computer Programming) — subject definition + topic list.
 * Synthesized from academic engineering curricula & professional ISO/C/Python specifications.
 */
const comProg = {
  id: 'com-prog',
  title: 'Com-Prog',
  description:
    'Master computer programming fundamentals, W3Schools-style interactive documentation, memory addressing, pointers, data structures, and in-browser code execution.',
  icon: 'code',
  accent: '#fb923c',
  topics: [
    {
      id: 'py-programming',
      title: 'Python Programming',
      description:
        'Complete interactive Python 3 documentation & tutorial handbook: PVM runtime, dynamic typing, control flow, strings, lists/tuples/dicts/sets, comprehensions, functions (LEGB), decorators, OOP dunder protocols, exceptions, and file I/O.',
      level: 'Beginner',
    },
    {
      id: 'c-programming',
      title: 'C Programming',
      description:
        'Complete ISO C99/C11 documentation & tutorial handbook: hardware memory architecture, flowcharts & compilation pipeline, types & operators, loops, 1D/2D arrays, null-terminated strings, pointers, structs/unions, file streams, and dynamic heap allocation.',
      level: 'Intermediate',
    },
    {
      id: 'mcu',
      title: 'Microcontroller',
      description:
        'Embedded C/C++, hardware registers, memory-mapped I/O, GPIO bitwise manipulation, timers, PWM, interrupts, and serial communication buses (UART, I2C, SPI). Currently in development.',
      level: 'Advanced',
      inDevelopment: true,
      status: 'In Development',
    },
    {
      id: 'ros',
      title: 'ROS & ROS2',
      description:
        'Robot Operating System engineering: computational graph, DDS middleware, nodes, topics, publishers, subscribers, services, actions, and TF2 spatial transforms. Currently in development.',
      level: 'Advanced',
      inDevelopment: true,
      status: 'In Development',
    },
  ],
};

export default comProg;
