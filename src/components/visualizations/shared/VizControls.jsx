import './VizShared.css';

/**
 * Standard playback bar for physics visualizations.
 */
export function PlaybackBar({
  isPlaying,
  onTogglePlay,
  onReset,
  onStep,
  speed = 1,
  onSpeedChange,
  extraControls,
}) {
  return (
    <div className="viz-playback-bar">
      <div className="viz-playback-bar__group">
        <button
          type="button"
          className={`viz-btn viz-btn--primary ${isPlaying ? 'viz-btn--active' : ''}`}
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
        >
          {isPlaying ? (
            <>
              <span className="viz-icon" aria-hidden="true">⏸</span> Pause
            </>
          ) : (
            <>
              <span className="viz-icon" aria-hidden="true">▶</span> Play
            </>
          )}
        </button>

        {onStep && (
          <button
            type="button"
            className="viz-btn viz-btn--secondary"
            onClick={onStep}
            disabled={isPlaying}
            title="Step forward 1 frame"
          >
            <span className="viz-icon" aria-hidden="true">⏯</span> Step
          </button>
        )}

        <button
          type="button"
          className="viz-btn viz-btn--secondary"
          onClick={onReset}
          title="Reset simulation to initial state"
        >
          <span className="viz-icon" aria-hidden="true">↺</span> Reset
        </button>
      </div>

      {onSpeedChange && (
        <div className="viz-playback-bar__group">
          <span className="viz-speed-label">Speed:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              type="button"
              className={`viz-speed-btn ${speed === s ? 'viz-speed-btn--active' : ''}`}
              onClick={() => onSpeedChange(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      )}

      {extraControls && <div className="viz-playback-bar__extra">{extraControls}</div>}
    </div>
  );
}

/**
 * Clean slider row with label, formatted numerical value, unit, and range input.
 */
export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  disabled = false,
  formatValue,
}) {
  const displayVal = formatValue ? formatValue(value) : value;

  return (
    <div className="viz-slider-row">
      <div className="viz-slider-header">
        <span className="viz-slider-label">{label}</span>
        <span className="viz-slider-value">
          {displayVal} <span className="viz-slider-unit">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        className="viz-slider-input"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}

/**
 * Metric readout badge for displaying real-time physics parameters (e.g. Speed, Energy, Force).
 */
export function MetricBadge({ label, value, unit, highlight = false }) {
  return (
    <div className={`viz-metric-badge ${highlight ? 'viz-metric-badge--highlight' : ''}`}>
      <span className="viz-metric-label">{label}</span>
      <span className="viz-metric-val">
        {value} <span className="viz-metric-unit">{unit}</span>
      </span>
    </div>
  );
}
