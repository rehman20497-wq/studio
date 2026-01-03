import React from 'react';

export const DigitalOperationsIcon = () => {
    const size = 130;
    const radius = 25; // Slightly larger radius for more overlap
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius;
    const centerOffset = size / 2;
    // The groupOffset is now less than radius * 2, causing the overlap
    const groupOffset = radius * 1.8; 

    const positions = [
        { x: centerOffset - groupOffset / 2, y: centerOffset - groupOffset / 2 },
        { x: centerOffset + groupOffset / 2, y: centerOffset - groupOffset / 2 },
        { x: centerOffset - groupOffset / 2, y: centerOffset + groupOffset / 2 },
        { x: centerOffset + groupOffset / 2, y: centerOffset + groupOffset / 2 },
    ];
    
    // Initial 75% fill for the top-left circle
    const initialFillOffset = circumference * (1 - 0.75);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Circle 1: Top-Left (75% filled by default) */}
            <g className="do-circle-group" id="circle-1">
                <circle cx={positions[0].x} cy={positions[0].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    cx={positions[0].x} cy={positions[0].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} 
                    strokeDashoffset={initialFillOffset} 
                    transform={`rotate(-90 ${positions[0].x} ${positions[0].y})`} 
                    strokeLinecap="round" />
            </g>

            {/* Circle 2: Top-Right (fills on hover) */}
            <g className="do-circle-group" id="circle-2">
                <circle cx={positions[1].x} cy={positions[1].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    className="fluid-arc"
                    style={{ transitionDelay: '0s' }}
                    cx={positions[1].x} cy={positions[1].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={circumference} 
                    transform={`rotate(-90 ${positions[1].x} ${positions[1].y})`} 
                    strokeLinecap="round" />
            </g>

            {/* Circle 3: Bottom-Left (fills on hover) */}
            <g className="do-circle-group" id="circle-3">
                <circle cx={positions[2].x} cy={positions[2].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    className="fluid-arc"
                    style={{ transitionDelay: '0.2s' }}
                    cx={positions[2].x} cy={positions[2].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={circumference} 
                    transform={`rotate(-90 ${positions[2].x} ${positions[2].y})`} 
                    strokeLinecap="round" />
            </g>

            {/* Circle 4: Bottom-Right (fills on hover) */}
            <g className="do-circle-group" id="circle-4">
                <circle cx={positions[3].x} cy={positions[3].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    className="fluid-arc"
                    style={{ transitionDelay: '0.4s' }}
                    cx={positions[3].x} cy={positions[3].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={circumference} 
                    transform={`rotate(-90 ${positions[3].x} ${positions[3].y})`} 
                    strokeLinecap="round" />
            </g>
        </svg>
    );
};