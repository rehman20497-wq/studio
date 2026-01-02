import React from 'react';

export const DataAiIcon = () => {
  const outerWidth = 110;
  const outerHeight = 110;
  const outerStroke = 10;
  const outerRadius = 27;

  const innerWidth = 50;
  const innerHeight = 50;
  const innerStroke = 10;
  const innerRadius = 12;

  const innerX = (outerWidth - innerWidth) / 2;
  const innerY = (outerHeight - innerHeight) / 2;

  const outerX = outerStroke / 2;
  const outerY = outerStroke / 2;

  // ✅ Normalized inner rect geometry (used everywhere)
  const innerRect = {
    x: innerX + innerStroke / 2,
    y: innerY + innerStroke / 2,
    width: innerWidth - innerStroke,
    height: innerHeight - innerStroke,
  };

  const outerCircumference =
    2 * ((outerWidth - outerStroke) + (outerHeight - outerStroke));

  const innerCircumference =
    2 * ((innerWidth - innerStroke) + (innerHeight - innerStroke));

  return (
    <div className="relative" style={{ width: outerWidth, height: outerHeight }}>
      <svg
        width={outerWidth}
        height={outerHeight}
        viewBox={`0 0 ${outerWidth} ${outerHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        {/* Static background rectangles */}
        <g className="data-ai-static">
          <rect
            x={outerX}
            y={outerY}
            width={outerWidth - outerStroke}
            height={outerHeight - outerStroke}
            rx={outerRadius}
            stroke="#D9480F"
            strokeWidth={outerStroke}
            fill="none"
          />

          <rect
            {...innerRect}
            rx={innerRadius}
            stroke="#D9480F"
            strokeWidth={innerStroke}
            fill="none"
          />
        </g>

        {/* Animated "snake" paths */}
        <g className="data-ai-snake">
          <rect
            x={outerX}
            y={outerY}
            width={outerWidth - outerStroke}
            height={outerHeight - outerStroke}
            rx={outerRadius}
            stroke="#D9480F"
            strokeWidth={outerStroke}
            fill="none"
            strokeLinecap="round"
            className="snake-path"
            style={{ strokeDasharray: `80 ${outerCircumference}` }}
          />

          <rect
            {...innerRect}
            rx={innerRadius}
            stroke="#D9480F"
            strokeWidth={innerStroke}
            fill="none"
            strokeLinecap="round"
            className="snake-path"
            style={{ strokeDasharray: `60 ${innerCircumference}` }}
          />
        </g>
      </svg>
    </div>
  );
};
