export const CustomerSupportIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={`block w-[140px] h-[140px] ${className}`}
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="rotate(50 32 32)">
      {/* OUTER ARC (split in two) */}
      <path
        className="fluid-arc"
        d="M32,10 A22,22 0 0 1 53.66,32"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="fluid-arc"
        d="M32,10 A22,22 0 0 0 10.34,32"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* MIDDLE ARC (split in two) */}
      <path
        className="fluid-arc"
        d="M32,16 A16,16 0 0 1 47.76,32"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
       <path
        className="fluid-arc"
        d="M32,16 A16,16 0 0 0 16.24,32"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* INNER ARC (split in two) */}
      <path
        className="fluid-arc"
        d="M32,22 A10,10 0 0 1 41.85,32"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        className="fluid-arc"
        d="M32,22 A10,10 0 0 0 22.15,32"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  </svg>
);