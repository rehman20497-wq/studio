import React from 'react';

export const DigitalOperationsIcon = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="14" stroke="#4ADE80" strokeWidth="8"/>
    <circle cx="54" cy="18" r="14" stroke="#4ADE80" strokeWidth="8"/>
    <circle cx="18" cy="54" r="14" stroke="#4ADE80" strokeWidth="8"/>
    <circle cx="54"cy="54" r="14" stroke="#4ADE80" strokeWidth="8"/>
    <path d="M18 18 a 14 14 0 0 1 0 -28 a 14 14 0 0 1 0 28" fill="#4ADE80" stroke="none">
        <animate attributeName="d" from="M18 18 a 14 14 0 0 1 0 -28 a 14 14 0 0 1 0 28" to="M18 18 a 14 14 0 1 1 0 -28 a 14 14 0 0 1 0 28" dur="2s" begin="0s" repeatCount="indefinite" />
    </path>
  </svg>
);
