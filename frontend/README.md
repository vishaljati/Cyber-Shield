🛡️ CyberShield — AI-Powered Tracker Detection & Blocking

CyberShield is a privacy-focused Chrome extension that detects hidden trackers on websites, explains their intent in simple language, and allows users to block trackers in real time.

Unlike traditional ad-blockers, CyberShield focuses on transparency + user control, not just blind blocking.

🚨 Problem Statement

Modern websites silently track users without clear awareness or consent.

Hidden third-party trackers monitor browsing behavior

Surveillance cookies follow users across websites

Users don’t know who is tracking them or why

Existing tools block trackers but don’t explain them

This leads to loss of privacy, trust, and control.

💡 Our Solution

CyberShield exposes invisible tracking and gives control back to users.

It can:

🔍 Detect hidden third-party trackers

🧠 Explain tracker intent in simple language

🛑 Block trackers instantly from the popup

🟢 Follow Chrome Manifest V3 best practices

Not just blocking — explaining.

🔄 How It Works

User opens a website

Content script scans scripts, iframes, and resources

Tracker domains are detected

Popup UI shows detected trackers

User clicks Block

Background service worker adds a blocking rule

Chrome blocks future requests automatically

🔑 Key Feature: Tracker Explainability

“This tracker monitors browsing behavior across websites to enable targeted advertising.”

CyberShield explains what a tracker does — not just that it exists.

🧩 Architecture Overview

Browser Extension (Manifest V3)

Content Script
Detects third-party trackers on web pages

Background Service Worker
Handles blocking using declarativeNetRequest

Popup UI (React)
Displays tracker details and user actions

🛠 Tech Stack
Frontend (Popup UI)

React.js

Tailwind CSS

Vite

Browser Extension

Chrome Extension (Manifest V3)

Content Scripts

Background Service Worker

Blocking

declarativeNetRequest (MV3-compliant)

Backend / AI (Planned / Integrated Separately)

Node.js

Express.js

Google Gemini API (for explainability)

🔐 Privacy First

No passwords collected

No personal identifiers stored

No browsing history saved

Only tracker metadata is analyzed

CyberShield is built with privacy by design.

🚀 Installation (For Judges / Testing)
Method: Load Unpacked Extension

Clone the repository

git clone <repo-url>


Go to frontend folder

cd frontend


Install dependencies

npm install


Build the extension

npm run build


Open Chrome and go to

chrome://extensions


Enable Developer Mode

Click Load unpacked

Select the frontend/dist folder

Pin CyberShield from the toolbar

✅ Extension is now active.

🧪 How to Test

Open tracker-heavy websites like:

https://medium.com

https://timesofindia.com

https://news.google.com

Steps:

Open the website

Click CyberShield icon

View detected trackers

Click Block

Refresh the page

Tracker requests are blocked

🌍 Impact

Makes invisible tracking visible

Educates users instead of confusing them

Reduces silent data surveillance

Builds trust and transparency online
