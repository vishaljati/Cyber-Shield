# Titan Shield - Browser Security Extension

Advanced security protection for your browser. Titan Shield helps protect your online activities with real-time threat detection and prevention.

## Features

- Real-time URL scanning
- Malware and phishing protection
- Secure browsing experience
- Privacy protection

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/titan-shield.git
   cd titan-shield
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

### `npm run dev`

Runs the extension in development mode with hot-reload.

### `npm run build:extension`

Builds the extension for production to the `dist` folder.

### `npm run package`

Packages the extension for distribution.

## Building for Production

To create a production build:

```bash
npm run build:extension
```

The built files will be in the `dist` directory, ready to be loaded as an unpacked extension in your browser.

## Loading the Extension

1. Open your browser and navigate to `chrome://extensions/` (for Chrome) or `about:debugging#/runtime/this-firefox` (for Firefox)
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist` directory
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
