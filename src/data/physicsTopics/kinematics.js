/**
 * Physics Topic: Motion (Kinematics in 1D and 2D)
 */
const kinematicsData = {
  id: 'kinematics',
  title: 'Motion: 1D & 2D Kinematics',
  subtitle: 'The geometry of motion without regard to its causes: displacement, velocity, acceleration, and projectile flight.',
  level: 'Beginner',
  estimatedTime: '20 min read + interactive lab',
  overview: [
    'Kinematics provides the mathematical framework to describe how objects move through space over time. By tracking position x(t) or r(t), we derive velocity as the time rate of change of position, and acceleration as the time rate of change of velocity.',
    'Under the fundamental assumption of constant acceleration, calculus yields the four kinematic equations (suvat equations). In two dimensions, Galileo’s principle of superposition allows horizontal and vertical motions to be analysed independently.',
  ],
  keyConcepts: [
    {
      title: 'Displacement vs. Distance',
      content:
        'Distance is a scalar quantity measuring the total path length traversed regardless of direction. Displacement (Δx or Δr) is a vector pointing from the initial coordinate to the final coordinate. An object running in a full 400 m loop covers 400 m of distance but has 0 m of displacement.',
    },
    {
      title: 'Velocity vs. Speed & Acceleration',
      content:
        'Speed is the scalar rate of distance accumulation. Velocity is the vector rate of displacement change (v = dx/dt). Acceleration (a = dv/dt) occurs whenever velocity changes in magnitude, direction, or both. A car moving at constant speed around a curved track is accelerating because its velocity direction is continuously turning.',
    },
    {
      title: '2D Projectile Independence',
      content:
        'A projectile flying in a uniform gravitational field experiences zero horizontal acceleration (ax = 0) and constant downward vertical acceleration (ay = -g). Because orthogonal vector components are mathematically independent, horizontal velocity vx remains constant throughout flight while vertical velocity vy changes linearly.',
    },
  ],
  equations: [
    {
      name: 'First Kinematic Equation (Velocity-Time Relation)',
      latex: 'v = v_0 + at',
      summary:
        'Calculates final velocity after an elapsed time t under constant acceleration.',
      conditions: ['Acceleration a must remain constant over the time interval t'],
      variables: [
        {
          symbol: 'v',
          name: 'Final Velocity',
          unit: '\\text{m/s}',
          description: 'The instantaneous velocity of the body at the conclusion of elapsed time t.',
          connections:
            'Grows linearly with elapsed time t if acceleration a is positive. If acceleration is zero, v = v0 identically (uniform motion). If a < 0 (deceleration), v decreases until stopping or reversing direction.',
        },
        {
          symbol: 'v_0',
          name: 'Initial Velocity',
          unit: '\\text{m/s}',
          description: 'The velocity of the body at timestamp t = 0.',
          connections:
            'Sets the vertical intercept on a velocity-time graph. All subsequent velocity changes (at) are added directly onto this baseline.',
        },
        {
          symbol: 'a',
          name: 'Constant Acceleration',
          unit: '\\text{m/s}^2',
          description: 'The constant rate at which velocity changes per second.',
          connections:
            'Represents the slope of the v-t graph. If acceleration doubles, the change in velocity (v - v0) accumulated over the same time window doubles.',
        },
        {
          symbol: 't',
          name: 'Elapsed Time',
          unit: '\\text{s}',
          description: 'The time duration over which acceleration operates.',
          connections:
            'Directly multiplies acceleration. Longer exposure to acceleration yields proportionally larger changes in velocity.',
        },
      ],
    },
    {
      name: 'Second Kinematic Equation (Displacement-Time Relation)',
      latex: '\\Delta x = v_0 t + \\frac{1}{2}at^2',
      summary:
        'Computes total displacement resulting from initial velocity combined with uniform acceleration over time t.',
      conditions: ['Acceleration a must be constant', '1D straight-line motion'],
      variables: [
        {
          symbol: '\\Delta x',
          name: 'Displacement',
          unit: '\\text{m}',
          description: 'The net vector change in position (x_final - x_initial).',
          connections:
            'Composed of two additive terms: the linear drift (v0 · t) and the quadratic accelerated gain (½ a t²). Over short times, v0 · t dominates; over long times, t² causes the quadratic term to overwhelm the displacement.',
        },
        {
          symbol: 'v_0',
          name: 'Initial Velocity',
          unit: '\\text{m/s}',
          description: 'The starting speed and direction along the motion axis.',
          connections:
            'Connected linearly to Δx through time t. If an object starts from rest (v0 = 0), displacement reduces purely to Δx = ½at².',
        },
        {
          symbol: 'a',
          name: 'Constant Acceleration',
          unit: '\\text{m/s}^2',
          description: 'The uniform rate of acceleration.',
          connections:
            'Connected quadratically through time: doubling acceleration doubles the curvature of the position-time parabola.',
        },
        {
          symbol: 't',
          name: 'Elapsed Time',
          unit: '\\text{s}',
          description: 'The duration of motion.',
          connections:
            'Possesses quadratic influence (t²) on the acceleration term. If time triples under constant acceleration, the distance covered purely from acceleration increases by 3² = 9 times!',
        },
      ],
    },
    {
      name: 'Third Kinematic Equation (Torricelli’s Timeless Formula)',
      latex: 'v^2 = v_0^2 + 2a\\Delta x',
      summary:
        'Relates final velocity directly to displacement without requiring knowledge of elapsed time.',
      conditions: ['Constant acceleration', 'Eliminates time variable t via substitution'],
      variables: [
        {
          symbol: 'v',
          name: 'Final Velocity',
          unit: '\\text{m/s}',
          description: 'The velocity after traversing displacement Δx.',
          connections:
            'Squared in the equation. Doubling the terminal speed requires 4 times the stopping or accelerating distance for the same acceleration magnitude.',
        },
        {
          symbol: 'v_0',
          name: 'Initial Velocity',
          unit: '\\text{m/s}',
          description: 'Starting velocity entering the displacement window.',
          connections:
            'Appears squared. Highly relevant for vehicle braking distances: doubling cruising speed quadruples the required braking distance.',
        },
        {
          symbol: 'a',
          name: 'Acceleration',
          unit: '\\text{m/s}^2',
          description: 'Constant acceleration along the displacement vector.',
          connections:
            'Inversely connected to displacement Δx for a given velocity change: a = (v² - v0²) / (2Δx). Greater deceleration stops an object in shorter distance.',
        },
        {
          symbol: '\\Delta x',
          name: 'Displacement',
          unit: '\\text{m}',
          description: 'Distance traversed during acceleration.',
          connections:
            'Directly scales the energy-equivalent quantity 2aΔx, corresponding directly to the work-energy theorem (W = F·d = m·a·d = ½mv² - ½mv0²).',
        },
      ],
    },
    {
      name: '2D Projectile Range & Max Height',
      latex: 'R = \\frac{v_0^2 \\sin(2\\theta)}{g}, \\quad H = \\frac{v_0^2 \\sin^2\\theta}{2g}',
      summary:
        'Predicts total horizontal flight distance (Range R) and peak vertical summit (Height H) on level terrain.',
      conditions: ['Launch and landing at identical elevations (y0 = y_landing = 0)', 'Negligible atmospheric drag'],
      variables: [
        {
          symbol: 'R',
          name: 'Horizontal Range',
          unit: '\\text{m}',
          description: 'The total horizontal distance covered before striking the ground.',
          connections:
            'Proportional to v0² and sin(2θ). Maximised at θ = 45° where sin(2·45°) = sin(90°) = 1. Complementary launch angles (e.g. 30° and 60°) achieve the exact same range.',
        },
        {
          symbol: 'H',
          name: 'Maximum Apex Height',
          unit: '\\text{m}',
          description: 'The highest vertical altitude reached along the parabolic flight path.',
          connections:
            'Proportional to sin²θ. Increases monotonically as launch angle θ approaches 90° (vertical launch), at which point H = v0² / (2g) and R = 0.',
        },
        {
          symbol: 'v_0',
          name: 'Launch Speed',
          unit: '\\text{m/s}',
          description: 'The muzzle speed of the projectile at release.',
          connections:
            'Has quadratic impact on both range R and height H. Doubling launch speed quadruples both the maximum altitude and the horizontal landing distance!',
        },
        {
          symbol: '\\theta',
          name: 'Launch Angle',
          unit: '^\\circ \\text{ or radians}',
          description: 'The elevation angle above the horizontal plane.',
          connections:
            'Partitions initial velocity into vx = v0 cosθ and vy = v0 sinθ. Balances time of flight (governed by vy) against horizontal travel speed (governed by vx).',
        },
        {
          symbol: 'g',
          name: 'Gravitational Acceleration',
          unit: '\\text{m/s}^2 \\approx 9.8\\,\\text{m/s}^2',
          description: 'Downward gravitational acceleration near Earth’s surface.',
          connections:
            'Inversely proportional to both R and H. On the Moon where g is 1/6th of Earth, projectiles travel 6 times further and 6 times higher for the same launch speed.',
        },
      ],
    },
  ],
  interactiveGuide:
    'Start with the 1D Linear Motion Lab to explore straight-line position, velocity, and acceleration with synchronized live graphs. Then progress to the 2D Projectile Cannon Lab to see how 1D horizontal motion and 1D vertical motion combine independently in two dimensions.',
};

export default kinematicsData;
