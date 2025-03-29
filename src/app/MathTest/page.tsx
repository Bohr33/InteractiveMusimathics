import React from 'react';
import { complex, Complex, add, multiply, divide, abs, arg } from 'mathjs';

const ComplexMathTester = () => {
  // Define some complex numbers for testing
  const z1: Complex = complex(2, 3); // 2 + 3i
  const z2: Complex = complex(1, -4); // 1 - 4i

  // Add, multiply, and divide
  const sum: Complex = add(z1, z2);
  const product: Complex = multiply(z1, z2) as Complex;
  const quotient: Complex = divide(z1, z2) as Complex;

  // Magnitude and phase
  const magnitudeZ1: Complex = abs(z1) as Complex; // Magnitude of z1
  const phaseZ1 = arg(z1);     // Phase of z1 (in radians)

  return (
    <div>
      <h1>Testing Complex Numbers with math.js</h1>
      
      <div>
        <p>
          <strong>Complex Number 1 (z1):</strong> {z1.toString()}
        </p>
        <p>
          <strong>Complex Number 2 (z2):</strong> {z2.toString()}
        </p>
      </div>

      <div>
        <h2>Operations:</h2>
        <p>
          <strong>Sum (z1 + z2):</strong> {sum.toString()}
        </p>
        <p>
          <strong>Product (z1 * z2):</strong> {product.toString()}
        </p>
        <p>
          <strong>Quotient (z1 / z2):</strong> {quotient.toString()}
        </p>
      </div>

      <div>
        <h2>Magnitude and Phase of z1:</h2>
        <p>
          <strong>Magnitude of (z1):</strong> {magnitudeZ1.toString()}
        </p>
        <p>
          <strong>Phase of z1 (radians):</strong> {phaseZ1}
        </p>
      </div>
    </div>
  );
};

export default ComplexMathTester;
