import { useState, useEffect } from 'react';
import '../shared/VizShared.css';
import { MetricBadge, SliderControl } from '../shared/VizControls.jsx';

/**
 * Interactive ROS & ROS2 Computational Graph 2D Visualizer
 * Visualizes decentralized nodes, publish/subscribe topics,
 * DDS message streaming, and robot velocity vectors.
 */
export default function RosViz() {
  const [linearX, setLinearX] = useState(0.8);
  const [angularZ, setAngularZ] = useState(0.4);
  const [pubFreq, setPubFreq] = useState(20); // Hz
  const [packetPhase, setPacketPhase] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setPacketPhase((p) => (p + 0.05) % 1);
    }, 40);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="viz-container">
      <header className="viz-header">
        <div className="viz-header__title-block">
          <h3 className="viz-header__title">ROS 2 Computational Graph & DDS Pipeline</h3>
          <span className="viz-header__tag">DDS Peer-to-Peer</span>
        </div>
      </header>

      {/* Real-time Metrics Bar */}
      <div className="viz-metrics-bar">
        <MetricBadge
          label="Active Topic"
          value="/cmd_vel"
          highlight
        />
        <MetricBadge
          label="Publish Frequency"
          value={pubFreq}
          unit="Hz"
        />
        <MetricBadge
          label="linear.x"
          value={linearX.toFixed(2)}
          unit="m/s"
        />
        <MetricBadge
          label="angular.z"
          value={angularZ.toFixed(2)}
          unit="rad/s"
        />
        <MetricBadge
          label="QoS Reliability"
          value="Reliable"
        />
      </div>

      {/* Visual Graph Area */}
      <div className="viz-canvas-area" style={{ minHeight: '360px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '720px', position: 'relative' }}>
          <svg viewBox="0 0 700 240" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {/* Publisher Node 1: /teleop_keyboard */}
            <g transform="translate(60, 40)">
              <rect x="0" y="0" width="160" height="60" rx="12" fill="rgba(56, 189, 248, 0.18)" stroke="#38bdf8" strokeWidth="2" />
              <text x="80" y="28" fill="#f8fafc" fontSize="13" fontWeight="700" textAnchor="middle">/teleop_twist</text>
              <text x="80" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle">Node (Publisher)</text>
            </g>

            {/* Publisher Node 2: /nav2_planner */}
            <g transform="translate(60, 140)">
              <rect x="0" y="0" width="160" height="60" rx="12" fill="rgba(167, 139, 250, 0.18)" stroke="#a78bfa" strokeWidth="2" />
              <text x="80" y="28" fill="#f8fafc" fontSize="13" fontWeight="700" textAnchor="middle">/nav2_controller</text>
              <text x="80" y="48" fill="#94a3b8" fontSize="10" textAnchor="middle">Node (Publisher)</text>
            </g>

            {/* Central Topic Pipeline: /cmd_vel */}
            <g transform="translate(280, 85)">
              <rect x="0" y="0" width="140" height="70" rx="14" fill="rgba(245, 158, 11, 0.22)" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="70" y="30" fill="#facc15" fontSize="13" fontWeight="800" textAnchor="middle">/cmd_vel</text>
              <text x="70" y="50" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">geometry_msgs/Twist</text>
            </g>

            {/* Subscriber Node: /diff_drive_controller */}
            <g transform="translate(480, 85)">
              <rect x="0" y="0" width="160" height="70" rx="12" fill="rgba(74, 222, 128, 0.18)" stroke="#4ade80" strokeWidth="2" />
              <text x="80" y="32" fill="#f8fafc" fontSize="12" fontWeight="700" textAnchor="middle">/diff_drive_controller</text>
              <text x="80" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle">Node (Subscriber)</text>
            </g>

            {/* Connecting pipes */}
            {/* From teleop to /cmd_vel */}
            <path d="M 220 70 L 280 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
            {/* From nav2 to /cmd_vel */}
            <path d="M 220 170 L 280 120" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
            {/* From /cmd_vel to diff_drive */}
            <path d="M 420 120 L 480 120" stroke="#f59e0b" strokeWidth="3" />

            {/* Animated Message Packets flowing along pipeline */}
            {isActive && (
              <>
                <circle
                  cx={220 + packetPhase * 60}
                  cy={70 + packetPhase * 50}
                  r="6"
                  fill="#38bdf8"
                />
                <circle
                  cx={420 + packetPhase * 60}
                  cy={120}
                  r="7"
                  fill="#facc15"
                />
              </>
            )}
          </svg>

          {/* Real-time Message JSON payload preview */}
          <div
            style={{
              background: 'rgba(8, 13, 25, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '0.85rem 1.25rem',
              fontFamily: 'monospace',
              fontSize: '0.84rem',
              color: '#cbd5e1',
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            <span>
              <strong style={{ color: '#facc15' }}>geometry_msgs/msg/Twist:</strong> &#123; linear: &#123; x: {linearX.toFixed(2)}, y: 0.0, z: 0.0 &#125;, angular: &#123; z: {angularZ.toFixed(2)} &#125; &#125;
            </span>
            <span style={{ fontSize: '0.74rem', color: '#4ade80' }}>&bull; Live DDS Stream</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="viz-controls-panel">
        <div className="viz-sliders-grid">
          <SliderControl
            label="Linear Forward Speed (linear.x)"
            value={linearX}
            min={-1.5}
            max={2.0}
            step={0.1}
            unit=" m/s"
            onChange={setLinearX}
          />
          <SliderControl
            label="Angular Yaw Turning (angular.z)"
            value={angularZ}
            min={-2.0}
            max={2.0}
            step={0.1}
            unit=" rad/s"
            onChange={setAngularZ}
          />
          <SliderControl
            label="Publication Rate"
            value={pubFreq}
            min={5}
            max={50}
            step={5}
            unit=" Hz"
            onChange={setPubFreq}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className={`viz-btn ${isActive ? 'viz-btn--primary' : 'viz-btn--secondary'}`}
            onClick={() => setIsActive((v) => !v)}
          >
            {isActive ? '⏸ Pause Graph Stream' : '▶ Resume Graph Stream'}
          </button>
          <button
            type="button"
            className="viz-btn viz-btn--secondary"
            onClick={() => {
              setLinearX(0);
              setAngularZ(0);
            }}
          >
            🛑 Emergency Stop (linear.x = 0, angular.z = 0)
          </button>
        </div>
      </div>
    </div>
  );
}
