import React from 'react';

export const DigitalOperationsIcon = () => {
    const size = 130;
    const radius = 22;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius;
    const centerOffset = size / 2;
    const groupOffset = radius + strokeWidth / 2 + 5;

    const positions = [
        { x: centerOffset - groupOffset, y: centerOffset - groupOffset },
        { x: centerOffset + groupOffset, y: centerOffset - groupOffset },
        { x: centerOffset - groupOffset, y: centerOffset + groupOffset },
        { x: centerOffset + groupOffset, y: centerOffset + groupOffset },
    ];

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <g className="do-circle-group" id="circle-1" style={{ transformOrigin: `${positions[0].x}px ${positions[0].y}px` }}>
                <circle cx={positions[0].x} cy={positions[0].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    className="fluid-arc"
                    style={{ transitionDelay: '0s' }}
                    cx={positions[0].x} cy={positions[0].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={circumference} transform={`rotate(-90 ${positions[0].x} ${positions[0].y})`} strokeLinecap="round" />
            </g>
            <g className="do-circle-group" id="circle-2" style={{ transformOrigin: `${positions[1].x}px ${positions[1].y}px` }}>
                <circle cx={positions[1].x} cy={positions[1].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    className="fluid-arc"
                    style={{ transitionDelay: '0.2s' }}
                    cx={positions[1].x} cy={positions[1].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={circumference} transform={`rotate(-90 ${positions[1].x} ${positions[1].y})`} strokeLinecap="round" />
            </g>
            <g className="do-circle-group" id="circle-3" style={{ transformOrigin: `${positions[2].x}px ${positions[2].y}px` }}>
                <circle cx={positions[2].x} cy={positions[2].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    className="fluid-arc"
                    style={{ transitionDelay: '0.4s' }}
                    cx={positions[2].x} cy={positions[2].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={circumference} transform={`rotate(-90 ${positions[2].x} ${positions[2].y})`} strokeLinecap="round" />
            </g>
            <g className="do-circle-group" id="circle-4" style={{ transformOrigin: `${positions[3].x}px ${positions[3].y}px` }}>
                <circle cx={positions[3].x} cy={positions[3].y} r={radius} stroke="#A7F3D0" strokeWidth={strokeWidth} />
                <circle
                    className="fluid-arc"
                    style={{ transitionDelay: '0.6s' }}
                    cx={positions[3].x} cy={positions[3].y} r={radius} stroke="#34D399" strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={circumference} transform={`rotate(-90 ${positions[3].x} ${positions[3].y})`} strokeLinecap="round" />
            </g>
        </svg>
    );
};
