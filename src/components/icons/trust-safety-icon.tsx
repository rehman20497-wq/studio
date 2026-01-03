import React from 'react';

export const TrustSafetyIcon = () => {
    const radius = 32.5;
    const circumference = 2 * Math.PI * radius;
    const fillPercentage = 75;
    const strokeDashoffset = circumference * (1 - fillPercentage / 100);

    return (
        <svg width="145" height="125" viewBox="0 0 145 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(50 72.5 62.5)">
                {/* Left Circle Group (starts 75% filled) */}
                <g>
                    {/* Background outline for the left circle */}
                    <circle 
                        cx="51" 
                        cy="62.5" 
                        r={radius} 
                        stroke="#A78BFA" 
                        strokeOpacity="0.3"
                        strokeWidth="12"
                        fill="none"
                    />
                    {/* The initially filled 75% part */}
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
                    {/* The part that will animate to fill the rest */}
                    <circle
                        className="fluid-arc-delayed"
                        cx="51"
                        cy="62.5"
                        r={radius}
                        stroke="#A78BFA"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        strokeLinecap="round"
                        transform="rotate(-90 51 62.5) scale(1, -1) translate(0, -125)"
                    />
                </g>
                
                {/* Right Circle Group (starts empty, fills on hover) */}
                <g>
                    {/* Background for the right circle */}
                    <circle 
                        cx="89" 
                        cy="62.5" 
                        r={radius} 
                        stroke="#A78BFA"
                        strokeOpacity="0.3"
                        strokeWidth="12"
                        fill="none"
                    />
                     {/* The animated fill part for the right circle */}
                    <circle
                        className="fluid-arc"
                        cx="89"
                        cy="62.5"
                        r={radius}
                        stroke="#A78BFA"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference}
                        strokeLinecap="round"
                        transform="rotate(-90 89 62.5)"
                    />
                </g>
            </g>
        </svg>
    );
};
