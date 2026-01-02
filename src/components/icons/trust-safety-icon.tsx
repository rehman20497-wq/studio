import React from 'react';

export const TrustSafetyIcon = () => {
    const radius = 37.5; // for 75px diameter
    const circumference = 2 * Math.PI * radius;
    const fillPercentage = 75;
    const offset = circumference - (fillPercentage / 100) * circumference;

    return (
        <svg width="140" height="105" viewBox="0 0 140 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(50 70 52.5)">
                {/* Left circle (now solid) */}
                <circle cx="52" cy="52.5" r={radius} stroke="#A78BFA" strokeWidth="10"/>

                {/* Right circle (interlocking and 75% filled) */}
                <g>
                    {/* Lighter background for the 25% gap */}
                    <circle 
                        cx="88" 
                        cy="52.5" 
                        r={radius} 
                        stroke="#C4B5FD" 
                        strokeWidth="10"
                    />
                    {/* Darker foreground for the 75% fill */}
                    <circle 
                        cx="88" 
                        cy="52.5" 
                        r={radius} 
                        stroke="#A78BFA" 
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        transform="rotate(-90 88 52.5)"
                    />
                </g>
            </g>
        </svg>
    );
};
