// Lightweight inline SVG icons so the project has no icon-library dependency.
const common = {
  width: 32,
  height: 32,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const icons = {
  atom: (
    <svg {...common}>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  ),
  sigma: (
    <svg {...common}>
      <path d="M18 5H6l6 7-6 7h12" />
    </svg>
  ),
  matrix: (
    <svg {...common}>
      <path d="M7 4H4v16h3" />
      <path d="M17 4h3v16h-3" />
      <circle cx="9" cy="9" r="0.9" fill="currentColor" />
      <circle cx="15" cy="9" r="0.9" fill="currentColor" />
      <circle cx="9" cy="15" r="0.9" fill="currentColor" />
      <circle cx="15" cy="15" r="0.9" fill="currentColor" />
    </svg>
  ),
  code: (
    <svg {...common}>
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
      <path d="M13.5 4l-3 16" />
    </svg>
  ),
};

export default function SubjectIcon({ name }) {
  return icons[name] ?? null;
}
