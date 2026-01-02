import React from 'react';

export const TrustSafetyIcon = () => {
    const radius = 42.5;
    const circumference = 2 * Math.PI * radius;
    const fillPercentage = 75;
    const offset = circumference - (fillPercentage / 100) * circumference;

    return (
        <svg width="140" height="105" viewBox="0 0 140 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(50 70 52.5)">
                {/* Bottom circle (fully drawn, lighter color) */}
                <circle cx="52" cy="52.5" r={radius} stroke="#C4B5FD" strokeWidth="8"/>
                
                {/* Top circle (interlocking) */}
                <g>
                    {/* Lighter background for the 25% gap */}
                    <circle 
                        cx="88" 
                        cy="52.5" 
                        r={radius} 
                        stroke="#C4B5FD" 
                        strokeWidth="8"
                    />
                    {/* Darker foreground for the 75% fill */}
                    <circle 
                        cx="88" 
                        cy="52.5" 
                        r={radius} 
                        stroke="#A78BFA" 
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 88 52.5)"
                    />
                </g>
            </g>
        </svg>
    );
};
