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
        d="M13 31.5 A20 20 0 0 1 51 31.5"
        stroke="#06B6D4"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M19.5 31.5 A14 14 0 0 1 44.5 31.5"
        stroke="#06B6D4"
        strokeOpacity="0.6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M25 31.5 A8 8 0 0 1 39 31.5"
        stroke="#06B6D4"
        strokeOpacity="0.3"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
