

let angle = 0; // Initial angle
let slider; // Slider for controlling the angle

function setup() {
  createCanvas(400, 400);
  slider = createSlider(0, TWO_PI, 0, 0.01); // Range from 0 to 2π
  slider.position(10, height + 10);
}

function draw() {
  background(220);
  
  // Center of the canvas
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Get slider value for angle
  angle = slider.value();
  
  // Compute phasor position
  let radius = 100; // Scale the unit circle
  let x = radius * cos(angle);
  let y = radius * sin(angle);
  
  // Draw unit circle
  stroke(0);
  noFill();
  ellipse(centerX, centerY, radius * 2, radius * 2);
  
  // Draw axes
  stroke(10, 10, 10);
  line(centerX - radius, centerY, centerX + radius, centerY); // X-axis
  line(centerX, centerY - radius, centerX, centerY + radius); // Y-axis
  
  // Draw phasor (arrow)
  stroke(255, 0, 0);
  strokeWeight(3);
  line(centerX, centerY, centerX + x, centerY - y);
  
  //Draw Conjugate
  line(centerX + x, centerY - y, centerX + x*2, centerY)
  
  // Draw moving point
  fill(255, 0, 0);
  ellipse(centerX + x, centerY - y, 8, 8);
  
  
  // Display angle and coordinates
  fill(0);
  noStroke();
  textSize(14);
  text(`θ: ${(angle * 180 / PI).toFixed(1)}°`, 10, 20);
  text(`x: ${x.toFixed(2)/100}`, 10, 40);
  text(`y: ${(-y).toFixed(2)/100}`, 10, 60);
}
