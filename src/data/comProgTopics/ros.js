/**
 * Com-Prog Topic: ROS & ROS2 (Robot Operating System) (Multi-Page Engineering Hub)
 * Computational graph, nodes, topics, publishers, subscribers, services, actions, DDS middleware, and TF2 transforms.
 */

const foundationsSubPage = {
  id: 'foundations',
  title: 'Architecture & DDS Middleware',
  icon: '🤖',
  tag: 'ROS2 & DDS',
  subtitle:
    'Robot Operating System (ROS / ROS2) architecture, distributed peer-to-peer robotics middleware, Data Distribution Service (DDS), Quality of Service (QoS), and the colcon build tool.',
  estimatedTime: '22 min read + interactive robotics graph lab',
  overview: [
    'Welcome to the ROS & ROS2 Robotics Systems Guide. The Robot Operating System (ROS) is the global standard open-source framework and middleware suite powering autonomous mobile robots, robotic arms, self-driving vehicles, and aerospace exploration systems.',
    'While ROS 1 relied on a centralized master node (roscore), modern ROS 2 is completely decentralized, built on the industrial Data Distribution Service (DDS) standard. DDS provides zero-configuration discovery, real-time deterministic communication, multi-robot network support, and granular Quality of Service (QoS) policies.',
    'A robotics application is structured as a Computational Graph: discrete software processes called Nodes communicate with each other asynchronously via Topics (Publish/Subscribe), synchronously via Services (Request/Response), and preemptively via Actions (Goal/Feedback/Result).',
    'Explore the interactive robotics graph lab below, then navigate through the chapters covering nodes & topics, services & actions, and TF2 coordinate frame transformations!',
  ],
  keyConcepts: [
    {
      title: 'ROS 1 vs ROS 2 Architectural Evolution',
      content:
        'ROS 1 relied on a central master (roscore) as a single point of failure and lacked native real-time or secure networking. ROS 2 replaces roscore with DDS (Data Distribution Service), providing decentralized peer-to-peer discovery, hardware real-time compatibility (RTOS), and encrypted communications (SROS2).',
      exampleLabel: 'ROS2 Decentralized Graph',
      latex:
        '\\text{Node A} \\;\\xleftrightarrow{\\mathtt{DDS\\;Discovery}}\\; \\text{Node B} \\quad (\\text{No roscore required})',
    },
    {
      title: 'Quality of Service (QoS) Profiles',
      content:
        'QoS policies tune message delivery characteristics across unreliable wireless robot networks:\n' +
        '• Reliability: Best Effort (drops packets if delayed, ideal for high-rate LiDAR/camera) vs Reliable (re-transmits packets, ideal for mission-critical commands).\n' +
        '• Durability: Volatile (new subscribers only receive new data) vs Transient Local (latches last message for late-joining subscribers).',
      exampleLabel: 'QoS Reliability Policy Selection',
      latex:
        '\\text{Reliability} = \\begin{cases} \\mathtt{BestEffort} & \\text{for } 30\\text{Hz Camera / LiDAR} \\\\ \\mathtt{Reliable} & \\text{for Nav Goals / Motor Commands} \\end{cases}',
    },
  ],
  equations: [
    {
      name: 'Topic Message Throughput Formula',
      latex: '\\text{Data Rate} = f_{\\text{publish}} \\times \\text{sizeof}(\\text{Message})',
      summary: 'Network bandwidth consumed by a streaming ROS topic (e.g. sensor_msgs/msg/Image).',
      conditions: ['Network bandwidth must exceed total data rate across all active topics'],
      variables: [
        { symbol: 'f_{\\text{publish}}', name: 'Publication Frequency', unit: '\\text{Hz}', description: 'Rate at which node publishes messages (e.g. 30 Hz).', connections: 'Controlled by node timer.' },
        { symbol: '\\text{sizeof}(\\text{Message})', name: 'Serialized Message Size', unit: '\\text{bytes}', description: 'Payload size (e.g. 1920x1080x3 bytes for RGB camera).', connections: 'High data rates require intra-process zero-copy transport.' },
      ],
    },
  ],
  interactiveGuide:
    'Use the interactive ROS graph lab below to inspect Nodes, toggle topic publishers and subscribers, observe live message packet flow, and test service requests in real time.',
};

const nodesAndTopicsSubPage = {
  id: 'nodes-and-topics',
  title: 'Nodes, Topics & Messages',
  icon: '🌐',
  tag: 'Pub/Sub Graph',
  subtitle:
    'The asynchronous Publish/Subscribe paradigm, creating ROS2 nodes (rclpy / rclcpp), topic namespaces, strong message typing, and custom msg definitions.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'In the ROS 2 computational graph, a Node represents an independent executable process responsible for a single task (e.g. reading a sensor, running a path planner, controlling motor wheel speeds).',
    'Nodes communicate asynchronously using Topics following the Publish/Subscribe architectural pattern. A Publisher sends messages to a topic without knowing which nodes will receive them. Subscribers listen to topics and execute callback functions when new messages arrive.',
    'Communication is strongly typed: every topic is bound to a specific Message Definition (e.g. geometry_msgs/msg/Twist for velocity vectors, sensor_msgs/msg/LaserScan for 2D LiDAR scans).',
  ],
  keyConcepts: [
    {
      title: 'Creating a Python ROS2 Node (rclpy)',
      content:
        'Subclass rclpy.node.Node, initialize publishers/subscribers in __init__, and use timers for periodic execution.',
      exampleLabel: 'Minimal Publisher Node Pattern',
      latex:
        '\\mathtt{self.pub = self.create\\_publisher}(Twist, \\text{"/cmd\\_vel"}, 10)',
    },
    {
      title: 'The geometry_msgs/msg/Twist Velocity Vector',
      content:
        'Standard mobile robot velocity command: linear velocity [vx, vy, vz] in m/s and angular velocity [wx, wy, wz] in rad/s. Differential drive robots use linear.x (forward speed) and angular.z (turning speed).',
      exampleLabel: 'Twist Message Structure',
      latex:
        '\\text{Twist} = \\left[ \\vec{v} = (v_x, v_y, v_z), \\; \\vec{\\omega} = (\\omega_x, \\omega_y, \\omega_z) \\right]',
    },
  ],
  equations: [
    {
      name: 'Differential Drive Robot Kinematics (Twist to Wheel Speeds)',
      latex: 'v_{\\text{left}} = v_x - \\frac{L \\cdot \\omega_z}{2}, \\qquad v_{\\text{right}} = v_x + \\frac{L \\cdot \\omega_z}{2}',
      summary: 'Converts target linear velocity vx and angular yaw velocity wz into physical left and right wheel speeds.',
      conditions: ['L is track width (distance between wheels); pure rolling without slip'],
      variables: [
        { symbol: 'v_x', name: 'Forward Linear Velocity', unit: '\\text{m/s}', description: 'Target linear speed from /cmd_vel topic.', connections: 'Twist.linear.x' },
        { symbol: '\\omega_z', name: 'Angular Yaw Velocity', unit: '\\text{rad/s}', description: 'Target turning rate from /cmd_vel topic.', connections: 'Twist.angular.z' },
        { symbol: 'L', name: 'Wheelbase Track Width', unit: '\\text{meters}', description: 'Physical distance between left and right drive wheels.', connections: 'Known from robot URDF.' },
      ],
    },
  ],
};

const servicesAndActionsSubPage = {
  id: 'services-and-actions',
  title: 'Services, Actions & Parameters',
  icon: '🔄',
  tag: 'RPC & Action Goals',
  subtitle:
    'Synchronous Client/Server Services (srv), preemptible long-running Actions with continuous feedback (action), and dynamic node Parameters.',
  estimatedTime: '22 min read + interactive lab',
  overview: [
    'While topics handle continuous one-way streaming data (sensor feeds, telemetry), robotics tasks frequently require two-way remote procedure calls or long-duration goal tracking.',
    'Services (srv) provide synchronous Request/Response communication between a Service Client and a Service Server: the client sends a request and waits for a paired response (e.g. /spawn_robot, /reset_odometry).',
    'Actions (action) are designed for long-duration robotic behaviors (e.g. navigating to a waypoint, grasping an object). An Action Client sends a Goal; the Action Server accepts it, streams continuous Feedback during execution, allows preemptive cancellation, and returns a final Result.',
  ],
  keyConcepts: [
    {
      title: 'Services vs Actions Comparison',
      content:
        '• Service (srv): Fast, instantaneous, blocking request/reply (e.g. calibrate sensors). No progress updates; cannot be canceled.\n' +
        '• Action (action): Long-running, asynchronous, preemptible, sends periodic feedback updates (e.g. Nav2 NavigateToPose).',
      exampleLabel: 'Action Lifecycle Diagram',
      latex:
        '\\text{Send Goal} \\to [\\text{Goal Accepted}] \\to \\text{Stream Feedback} \\dots \\to \\text{Final Result}',
    },
    {
      title: 'Action Definition File (.action Structure)',
      content:
        'Comprises three sections separated by --- lines: Goal definition, Result definition, and Feedback definition.',
      exampleLabel: 'Action Definition Specification',
      latex:
        '[\\text{Goal Definition}] \\; \\mathtt{---} \\; [\\text{Result Definition}] \\; \\mathtt{---} \\; [\\text{Feedback Definition}]',
    },
  ],
  equations: [
    {
      name: 'Action Goal Progress Ratio',
      latex: '\\text{Progress} = \\frac{d_{\\text{traveled}}}{d_{\\text{total}}} = 1 - \\frac{\\|\\mathbf{p}_{\\text{current}} - \\mathbf{p}_{\\text{goal}}\\|}{\\|\\mathbf{p}_{\\text{start}} - \\mathbf{p}_{\\text{goal}}\\|}',
      summary: 'Feedback metric streamed to action client during robotic navigation goal execution.',
      conditions: ['Euclidean distance in global odometry frame'],
      variables: [
        { symbol: '\\mathbf{p}', name: 'Robot Position Coordinate', unit: '\\text{meters (x, y)}', description: 'Current robot 2D/3D location in /map frame.', connections: 'Estimated via TF2.' },
      ],
    },
  ],
};

const tfAndLaunchSubPage = {
  id: 'tf-and-launch',
  title: 'TF2 Transforms & Launch Files',
  icon: '📐',
  tag: 'Kinematics & Launch',
  subtitle:
    'Spatial coordinate frames with TF2, rigid body homogeneous transformation matrices, robot modeling (URDF), and Python launch file automation.',
  estimatedTime: '24 min read + interactive lab',
  overview: [
    'A robot comprises multiple moving parts: wheels, chassis, camera gimbal, robotic arm joints, and LiDAR sensors. Each sensor observes the world in its own local coordinate frame.',
    'The TF2 (Transform Library) tracks coordinate frames over time in a tree structure: base_link (robot center), odom (wheel odometry), map (global environment), and sensor frames (laser_frame, camera_link).',
    'TF2 allows software to transform a point cloud observed in camera coordinates into global world coordinates seamlessly using 4×4 Homogeneous Transformation Matrices.',
    'Python Launch Files (.launch.py) automate starting complex multi-node systems, remapping topics, configuring parameters, and spawning robot simulation environments with a single command.',
  ],
  keyConcepts: [
    {
      title: 'The Standard Mobile Robot TF Tree',
      content:
        'Standard REP-105 coordinate frame hierarchy:\n' +
        'map → odom → base_footprint → base_link → sensor_frames (lidar, camera).\n' +
        '• odom → base_link: Continuous wheel odometry (drifts over time).\n' +
        '• map → odom: Corrects odometry drift using SLAM or AMCL particle filters.',
      exampleLabel: 'REP-105 Coordinate Frame Tree',
      latex:
        '\\mathtt{map} \\xrightarrow{\\text{SLAM}} \\mathtt{odom} \\xrightarrow{\\text{Encoders}} \\mathtt{base\\_link} \\xrightarrow{\\text{URDF}} \\mathtt{laser\\_frame}',
    },
    {
      title: 'Homogeneous Transformation Matrix (SE(3))',
      content:
        'Combines a 3×3 rotation matrix R and 3×1 translation vector t into a unified 4×4 matrix, allowing coordinate transformations to be chained via simple matrix multiplication.',
      exampleLabel: '4x4 Homogeneous Matrix Form',
      latex:
        'T = \\begin{bmatrix} R_{3 \\times 3} & \\mathbf{t}_{3 \\times 1} \\\\ \\mathbf{0}_{1 \\times 3} & 1 \\end{bmatrix}, \\qquad \\mathbf{p}_{\\text{map}} = T_{\\text{map} \\leftarrow \\text{laser}} \\cdot \\mathbf{p}_{\\text{laser}}',
    },
  ],
  equations: [
    {
      name: 'Homogeneous Coordinate Frame Chain',
      latex: 'T_{A \\to C} = T_{A \\to B} \\times T_{B \\to C}',
      summary: 'Chaining relative transforms through intermediate coordinate frames via matrix multiplication in TF2.',
      conditions: ['All transforms must share synchronized timestamps within TF2 buffer duration'],
      variables: [
        { symbol: 'T_{A \\to C}', name: 'Compounded Transform Matrix', unit: '\\text{SE(3) matrix}', description: 'Direct transformation from frame A to frame C.', connections: 'Computed automatically by tf2_ros::Buffer.' },
      ],
    },
  ],
};

const subPages = [
  foundationsSubPage,
  nodesAndTopicsSubPage,
  servicesAndActionsSubPage,
  tfAndLaunchSubPage,
];

const rosData = {
  id: 'ros',
  title: 'ROS & ROS2',
  subtitle:
    'Robot Operating System engineering: computational graph, DDS middleware, nodes, topics, publishers, subscribers, services, actions, TF2 spatial transforms, and Python launch systems.',
  level: 'Advanced',
  estimatedTime: '4 Connected Chapters (Robotics Systems Syllabus)',
  subPages,
  overview: foundationsSubPage.overview,
  keyConcepts: foundationsSubPage.keyConcepts,
  equations: foundationsSubPage.equations,
  interactiveGuide: foundationsSubPage.interactiveGuide,
};

export default rosData;
