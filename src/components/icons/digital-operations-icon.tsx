import React from 'react';

export const DigitalOperationsIcon = () => {
    const size = 130;
    const circleRadius = size / 4;
    const strokeWidth = 14;
    const innerRadius = circleRadius - strokeWidth / 2;
    const circumference = 2 * Math.PI * innerRadius;
    const fillPercentage = 75;
    const strokeDashoffset = circumference * (1 - fillPercentage / 100);

    const positions = [
        { cx: circleRadius + 5, cy: circleRadius + 5 },
        { cx: size - circleRadius - 5, cy: circleRadius + 5 },
        { cx: circleRadius + 5, cy: size - circleRadius - 5 },
        { cx: size - circleRadius - 5, cy: size - circleRadius - 5 },
    ];

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bottom-left circle */}
            <circle cx={positions[2].cx} cy={positions[2].cy} r={innerRadius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
            {/* Bottom-right circle */}
            <circle cx={positions[3].cx} cy={positions[3].cy} r={innerRadius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
            {/* Top-right circle */}
            <circle cx={positions[1].cx} cy={positions[1].cy} r={innerRadius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
            
            {/* Top-left circle (75% filled) */}
            <g>
                {/* Background ring */}
                <circle cx={positions[0].cx} cy={positions[0].cy} r={innerRadius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                {/* Filled portion */}
                <circle
                    cx={positions[0].cx}
                    cy={positions[0].cy}
                    r={innerRadius}
                    stroke="#34D399"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${positions[0].cx} ${positions[0].cy})`}
                />
            </g>
        </svg>
    );
};
