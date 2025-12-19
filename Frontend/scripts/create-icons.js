import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [16, 32, 48, 128];
const outputDir = join(__dirname, '../public');

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Create a simple SVG icon
function createSvgIcon(size) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4F46E5"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${size * 0.6}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">TS</text>
</svg>`;
}

sizes.forEach(size => {
  const svg = createSvgIcon(size);
  writeFileSync(join(outputDir, `icon${size}.png`), svg);
});

console.log('Icons created successfully!');
