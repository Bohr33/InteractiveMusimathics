
"use client"
import { useEffect } from "react";

export default function PhasorPage() {
  useEffect(() => {
    const scriptP5 = document.createElement("script");
    scriptP5.src = "/p5-sketch/p5.js";
    scriptP5.async = true;
    document.body.appendChild(scriptP5);

    const scriptSketch = document.createElement("script");
    scriptSketch.src = "/p5-sketch/sketch.js";
    scriptSketch.async = true;
    document.body.appendChild(scriptSketch);

    return () => {
      // Cleanup: Remove the scripts
      document.body.removeChild(scriptP5);
      document.body.removeChild(scriptSketch);

      // Also remove the canvas to prevent it from persisting across pages
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);

  return (
    <div>
      <h1>Phasor Visualization</h1>
      <div id="p5-container" />
    </div>
  );
}

