# 🛡 CyberShield
**AI-powered detection of hidden trackers**

CyberShield is a privacy-focused browser extension that detects, explains, and blocks hidden trackers and surveillance cookies in real time.  
It helps users understand **who is tracking them, why, and what data is being collected** — all in simple, human language.

---

## 🚨 Problem Statement

Modern websites silently track users without clear awareness or consent.

- Hidden third-party trackers monitor browsing behavior  
- Surveillance cookies follow users across multiple sites  
- Users don’t know who is tracking them or why  
- Existing tools block trackers but don’t explain them  

This lack of transparency leads to **loss of privacy, trust, and control**.

---

## 💡 Our Solution

CyberShield exposes invisible tracking and gives control back to users.

It:
- Detects hidden trackers, scripts, and surveillance cookies
- Identifies third-party tracking behavior
- Explains tracker intent using AI
- Allows users to block or allow trackers instantly

Not just blocking — **explaining**.

---

## 🔄 How It Works

1. User opens a website  
2. Browser extension scans scripts, cookies, and network requests  
3. Suspicious tracking behavior is identified  
4. Metadata is sent to the backend  
5. AI analyzes tracker intent  
6. User receives a clear explanation  
7. User chooses to block or allow  

---

## 🔍 Key Feature

**Tracker Explainability**

> “Detects hidden trackers and explains how they silently monitor user behavior.”

---

## 🧩 Browser Extension Architecture

- **Content Script**  
  Scans page elements like scripts, images, iframes

- **Background Script**  
  Observes network requests and cookies

- **Popup UI**  
  Displays tracker details and user actions

---

## 🛠 Tech Stack

### Browser Extension
- Chrome Extension (Manifest V3)
- JavaScript
- Web APIs (cookies, webRequest)

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js

### AI
- Google Gemini API  
  *(Used to explain tracker intent in human-readable language)*

### Database
- MongoDB  
  *(Tracker metadata, categories, user preferences)*

### Security & Privacy
- AES-256 Encryption
- Zero-knowledge, no permanent sensitive data storage

---

## 🏗 System Architecture (High Level)

Website
↓
Browser Extension
↓
Backend API
↓
AI Explanation Engine
↓
User Warning & Control


---

## 🔐 Privacy First

- No passwords collected  
- No personal identifiers stored  
- No browsing history saved  
- Only tracker metadata is analyzed  
- User stays in full control  

CyberShield is built with **privacy by design**.

---

## 🌍 Impact

- Makes invisible tracking visible
- Educates users instead of confusing them
- Reduces silent data surveillance
- Builds trust and transparency online

---

## 👥 Team

**Team Name:** Coders’ Heaven  

- Anushka Sinha  
- Neelabhra De 
- Saheb Sen 
- Vishal Jati  

---

## 🏁 Hackathon Note

This project is built as a **hackathon prototype** focusing on:
- Clear problem definition
- Realistic browser-based detection
- AI-powered explainability
- Strong user impact

---

## 📄 License
MIT License

Contribution by Anushka