"use client";

import { useEffect } from "react";

export default function DisableZoom() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault(); // Ctrl/Cmd + scroll
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "=")) {
        e.preventDefault(); // Ctrl/Cmd + + or -
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "0") {
        e.preventDefault(); // Ctrl/Cmd + 0
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
