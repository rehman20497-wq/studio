export const CustomerSupportIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={`block w-[140px] h-[140px] ${className}`}
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="rotate(50 32 32)">
      <path
        className="customer-support-arc customer-support-arc-color"
        d="M14.5 33 A19 19 0 0 1 49.5 33"
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          strokeDasharray: 104,
          strokeDashoffset: 104,
        }}
      />
      <path
        className="customer-support-arc customer-support-arc-color"
        d="M22 33 A12 12 0 0 1 42 33"
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          strokeDasharray: 63,
          strokeDashoffset: 63,
        }}
      />
      <path
        className="customer-support-arc customer-support-arc-color"
        d="M27.5 33 A6 6 0 0 1 36.5 33"
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          strokeDasharray: 29,
          strokeDashoffset: 29,
        }}
      />
    </g>
  </svg>
);
