// Background script for Titan Shield extension
console.log('Titan Shield background script loaded');

// Listen for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('Titan Shield extension installed');
  
  // Set default settings if not already set
  chrome.storage.sync.get(['settings'], (result) => {
    if (!result.settings) {
      chrome.storage.sync.set({
        settings: {
          protectionEnabled: true,
          whitelist: [],
          theme: 'system'
        }
      });
    }
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(['settings'], (result) => {
      sendResponse({ settings: result.settings || {} });
    });
    return true; // Required for async response
  }
});
