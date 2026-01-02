import React from 'react';

export const TrustSafetyIcon = () => {
    const radius = 32.5; // for 65px diameter
    const circumference = 2 * Math.PI * radius;
    const fillPercentage = 75;
    const offset = circumference - (fillPercentage / 100) * circumference;

    return (
        <svg width="140" height="105" viewBox="0 0 130 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(50 65 47.5)">
                {/* Left circle (solid) */}
                <circle cx="46" cy="47.5" r={radius} stroke="#A78BFA" strokeWidth="12"/>

                {/* Right circle (interlocking and 75% filled) */}
                <g>
                    {/* Lighter background for the 25% gap */}
                    <circle 
                        cx="84" 
                        cy="47.5" 
                        r={radius} 
                        stroke="#C4B5FD" 
                        strokeWidth="12"
                    />
                    {/* Darker foreground for the 75% fill */}
                    <circle 
                        cx="84" 
                        cy="47.5" 
                        r={radius} 
                        stroke="#A78BFA" 
                        strokeWidth="12"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 84 47.5)"
                    />
                </g>
            </g>
        </svg>
    );
};
