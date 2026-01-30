"use client";

import { useEffect } from "react";

export default function DisableZoom() {
  useEffect(() => {
    const applyScale = () => {
      // Use devicePixelRatio to understand the browser's zoom level.
      const zoom = window.devicePixelRatio || 1;
      
      // We set a CSS variable to the inverse of the zoom level.
      // If the user zooms in (e.g., to 200%, devicePixelRatio becomes 2),
      // our scale factor becomes 0.5. An element with 'font-size: calc(16px * var(--scale-factor))'
      // will compute to 8px, and when the browser renders it at 200%, it visually appears as 16px.
      document.documentElement.style.setProperty('--scale-factor', `${1 / zoom}`);
    };

    // Apply scale on initial load and whenever the window is resized (which includes zooming).
    window.addEventListener('resize', applyScale);
    applyScale(); // Initial call

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener('resize', applyScale);
    };
  }, []);

  return null;
}
