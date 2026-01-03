import React from 'react';

export const TrustSafetyIcon = () => {
    const radius = 32.5;
    const circumference = 2 * Math.PI * radius;

    return (
        <svg width="145" height="125" viewBox="0 0 145 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(50 72.5 62.5)">
                {/* Circles with classes for hover animation */}
                <circle 
                    className="fluid-arc"
                    cx="51" 
                    cy="62.5" 
                    r={radius} 
                    stroke="#A78BFA"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    transform="rotate(-90 51 62.5)"
                />
                <circle 
                    className="fluid-arc delay-150"
                    cx="89" 
                    cy="62.5" 
                    r={radius} 
                    stroke="#A78BFA"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    transform="rotate(-90 89 62.5)"
                />
            </g>
        </svg>
    );
};
