const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const sizes = [16, 32, 48, 128];
const outputDir = path.join(__dirname, '../public');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw a simple shield icon
  ctx.fillStyle = '#4F46E5'; // indigo-600
  ctx.fillRect(0, 0, size, size);
  
  // Add a white 'TS' text in the center
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${size * 0.6}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TS', size / 2, size / 2);
  
  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `icon${size}.png`), buffer);
});

console.log('Icons generated successfully!');
