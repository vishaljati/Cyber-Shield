import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
fs.ensureDirSync(distDir);

// Clean the dist directory
fs.emptyDirSync(distDir);

// Build the extension
console.log('Building the extension...');
execSync('npm run build:extension', { stdio: 'inherit' });

// Create the extension package
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'manifest.json'), 'utf-8'));

// Update manifest version from package.json
manifest.version = packageJson.version;

// Write updated manifest to dist
fs.writeFileSync(
  path.join(distDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

// Copy icons if they exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (fs.existsSync(iconsDir)) {
  fs.copySync(iconsDir, path.join(distDir, 'icons'));
}

console.log('Extension packaged successfully!');
console.log(`You can now load the extension from: ${distDir}`);
console.log('To load in Chrome:');
console.log('1. Go to chrome://extensions/');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked" and select the dist directory');
