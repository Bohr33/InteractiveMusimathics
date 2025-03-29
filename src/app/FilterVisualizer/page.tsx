"use client";

import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import { complex, Complex, abs, arg, pi, pow, multiply, add, divide } from "mathjs";

const FilterVisualizer = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  // State for filter coefficients
  const [b, setB] = useState([1, -0.5]); // Numerator (feedforward)
  const [a, setA] = useState([1, .5]);       // Denominator (feedback)

  useEffect(() => {
    const sketch = (p: p5) => {
      let canvas: p5.Renderer;
      let slidersA: p5.Element[] = [];
      let slidersB: p5.Element[] = [];

      let sdistance = 150;

      var sliderB1 : p5.Element;
      var sliderB2 : p5.Element;
      var sliderA1 : p5.Element;
      let sliderA2 : p5.Element;

      p.setup = () => {
        canvas = p.createCanvas(600, 300);
        if (sketchRef.current) {
          canvas.parent(sketchRef.current);
        }

        for(let i = 0; i < 3; i++)
            {
                slidersB[i] = p.createSlider(-1, 1, b[i], 0.01);
                slidersA[i] = p.createSlider(-1, 1, a[i], 0.01);
                slidersB[i].position(200 + sdistance * i, 500);
                slidersA[i].position(200 + sdistance * i, 550);
            }
      };

      p.draw = () => {
        p.background(100);
        drawGraph(p);

        for(let i = 0; i < 3; i++)
            {
                b[i] = slidersB[i].value() as number;
                a[i] = slidersA[i].value() as number;
            }

        // Compute frequency response
        const freqResponse = computeFrequencyResponse(b, a, 256);

        const maxMag = Math.max(...freqResponse.magnitude)

        // Draw amplitude response
        p.stroke(0);
        p.fill(20, 0, 80, 100);
        p.beginShape();

        freqResponse.magnitude.forEach((mag, i) => {           
            let x = p.map(i, 0, freqResponse.magnitude.length, 50, p.width - 50);
            let bottom = p.height - 50;
            let right = p.width - 50;

            const clampedMag = mag/maxMag; // Ensure magnitude doesn't exceed maxMagnitude
             // Map magnitude to Y axis (logarithmic scale, adjusted for amplitude range)
            // Adjusting the scale to make it fit within the canvas height
            let y = p.map(20 *  Math.log10(clampedMag), -40, 0, p.height - 50, 50);
            p.vertex(x, y);
        });

        // Close the shape by adding bottom points
        p.vertex(p.width - 50, p.height - 50);
        p.vertex(50, p.height - 50);
        p.endShape();

        // Draw phase response
        // p.stroke(255, 0, 0);
        // p.beginShape();
        // freqResponse.phase.forEach((phase, i) => {
        //   let x = p.map(i, 0, freqResponse.phase.length, 50, p.width - 50);
        //   let y = p.map(phase, -pi, pi, p.height - 50, 50);
        //   p.vertex(x, y);
        // });
        // p.endShape();
      };
    };

    const p5Instance = new p5(sketch);
    return () => p5Instance.remove();
  }, [b, a]);

  return (
    <div>
      <h1 className="text-xl font-bold">Filter Visualization</h1>
      
      {/* Coefficient Input Fields */}
      <div className="flex space-x-4 my-4">
        <input
          type="text"
          placeholder="b coefficients (comma-separated)"
          className="border p-2"
          value={b.join(",")}
          onChange={(e) => setB(e.target.value.split(",").map(Number))}
        />
        <input
          type="text"
          placeholder="a coefficients (comma-separated)"
          className="border p-2"
          value={a.join(",")}
          onChange={(e) => setA(e.target.value.split(",").map(Number))}
        />
      </div>

      {/* p5.js Sketch */}
      <div ref={sketchRef} />
    </div>
  );
};


const drawGraph = (p: p5) => {
    // Draw X and Y axes
    p.stroke(0);
    p.line(50, p.height - 50, p.width - 50, p.height - 50);  // X Axis (Frequency)
    p.line(50, p.height - 50, 50, 50);  // Y Axis (Magnitude/Phase)
  
    // Draw grid lines (optional)
    const stepX = (p.width - 100) / 10;
    const stepY = (p.height - 100) / 10;
  
    // Draw vertical grid lines
    for (let i = 1; i < 10; i++) {
      p.line(50 + i * stepX, p.height - 50, 50 + i * stepX, 50);
    }
  
    // Draw horizontal grid lines
    for (let i = 1; i < 10; i++) {
      p.line(50, p.height - 50 - i * stepY, p.width - 50, p.height - 50 - i * stepY);
    }
  };

const computeFrequencyResponse = (b: number[], a: number[], numPoints: number) => {
    let magnitude: number[] = [];
    let phase: number[] = [];
  
    for (let i = 0; i < numPoints; i++) {
      // Frequency in radians
      let w = (i / numPoints) * pi;
      
      // Unit circle point (complex exponential)
      let z = complex(Math.cos(w), Math.sin(w));
  
      // Initialize num and den as Complex numbers
      let num = complex(0, 0);
      let den = complex(0, 0);
  
      // Compute numerator: H(z) = sum(b_k * z^(-k))
      for (let idx = 0; idx < b.length; idx++) {
        // num = num.add(complex(b[idx]).mul(z.pow(-idx)));
        let zb = pow(z, -idx) as Complex;
        num = add(num, multiply(zb, complex(b[idx]) )) as Complex;
      }
  
      // Compute denominator: sum(a_k * z^(-k))
      for (let idx = 0; idx < a.length; idx++) {
        let za = pow(z, -idx) as Complex;
        den = add(den, multiply(za, complex(a[idx]) )) as Complex;
      }
  
      // Frequency response H(w) = num / den
      let h = divide(num, den) as number;
  
      // Push magnitude and phase responses
      magnitude.push(abs(h));  // Magnitude response
      phase.push(arg(h));      // Phase response
    }
  
    return { magnitude, phase };
  };

export default FilterVisualizer;
