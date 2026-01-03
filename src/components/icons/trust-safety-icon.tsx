import React from 'react';

export const TrustSafetyIcon = () => {
    const radius = 32.5;
    const circumference = 2 * Math.PI * radius;
    const fillPercentage = 75;
    const strokeDashoffset = circumference * (1 - fillPercentage / 100);

    return (
        <svg width="145" height="125" viewBox="0 0 145 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(50 72.5 62.5)">
                {/* Left Circle Group (75% filled) */}
                <g>
                    <circle 
                        cx="51" 
                        cy="62.5" 
                        r={radius} 
                        stroke="#A78BFA" 
                        strokeOpacity="0.3"
                        strokeWidth="12"
                        fill="none"
                    />
                    <circle 
                        cx="51" 
                        cy="62.5" 
                        r={radius} 
                        stroke="#A78BFA" 
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        transform="rotate(-90 51 62.5)"
                    />
                </g>
                
                {/* Right Circle (Unfilled) */}
                <circle 
                    cx="89" 
                    cy="62.5" 
                    r={radius} 
                    stroke="#A78BFA"
                    strokeWidth="12"
                    fill="none"
                />
            </g>
        </svg>
    );
};
