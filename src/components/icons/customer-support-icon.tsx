export const CustomerSupportIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className={`block w-[140px] h-[140px] ${className}`}
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="rotate(50 32 32)">
      {/* Background Trace Layer */}
      <g stroke="#a5f3fc" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M32,10 A22,22 0 0 1 53.66,32" />
        <path d="M32,10 A22,22 0 0 0 10.34,32" />
        <path d="M32,16 A16,16 0 0 1 47.76,32" />
        <path d="M32,16 A16,16 0 0 0 16.24,32" />
        <path d="M32,22 A10,10 0 0 1 41.85,32" />
        <path d="M32,22 A10,10 0 0 0 22.15,32" />
      </g>
      
      {/* Animated Fluid Layer */}
      <g className="stroke-theme-primary" strokeWidth="4" fill="none" strokeLinecap="round">
        <path
          className="fluid-arc"
          d="M32,10 A22,22 0 0 1 53.66,32"
          strokeDasharray="47.5"
          strokeDashoffset="47.5"
        />
        <path
          className="fluid-arc"
          d="M32,10 A22,22 0 0 0 10.34,32"
          strokeDasharray="47.5"
          strokeDashoffset="47.5"
        />
        <path
          className="fluid-arc"
          d="M32,16 A16,16 0 0 1 47.76,32"
          strokeDasharray="34.5"
          strokeDashoffset="34.5"
          style={{ transitionDelay: '0.15s' }}
        />
        <path
          className="fluid-arc"
          d="M32,16 A16,16 0 0 0 16.24,32"
          strokeDasharray="34.5"
          strokeDashoffset="34.5"
          style={{ transitionDelay: '0.15s' }}
        />
        <path
          className="fluid-arc"
          d="M32,22 A10,10 0 0 1 41.85,32"
          strokeDasharray="21.6"
          strokeDashoffset="21.6"
          style={{ transitionDelay: '0.3s' }}
        />
        <path
          className="fluid-arc"
          d="M32,22 A10,10 0 0 0 22.15,32"
          strokeDasharray="21.6"
          strokeDashoffset="21.6"
          style={{ transitionDelay: '0.3s' }}
        />
      </g>
    </g>
  </svg>
);
