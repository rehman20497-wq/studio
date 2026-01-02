export const CustomerSupportIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={`block w-[140px] h-[140px] ${className}`}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Rotate INSIDE, not on SVG */}
    <g transform="rotate(50 32 32)">
      <path
        d="M14 31.5 A19 19 0 0 1 50 31.5"
        stroke="#06B6D4"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M21.5 31.5 A12 12 0 0 1 42.5 31.5"
        stroke="#06B6D4"
        strokeOpacity="0.6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M27 31.5 A6 6 0 0 1 37 31.5"
        stroke="#06B6D4"
        strokeOpacity="0.3"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
