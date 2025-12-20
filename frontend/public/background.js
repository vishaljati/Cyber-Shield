console.log("CyberShield background service worker running");

let latestTrackers = [];
const blockedDomains = new Set();

function getRuleId(domain) {
  
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "TRACKERS_FOUND") {
    latestTrackers = message.trackers;
  }

  if (message.type === "GET_TRACKERS") {
    sendResponse({ trackers: latestTrackers });
  }

  if (message.type === "BLOCK_DOMAIN") {
    const domain = message.domain;
    const ruleId = getRuleId(domain);

    const rule = {
      id: ruleId,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: domain,
        resourceTypes: [
          "script",
          "image",
          "xmlhttprequest",
          "sub_frame"
        ]
      }
    };

    chrome.declarativeNetRequest.updateDynamicRules(
      {
        removeRuleIds: [ruleId], 
        addRules: [rule]
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          console.log("Blocking rule added for:", domain);
          sendResponse({ success: true });
        }
      }
    );


    return true;
  }
});

/*import { analyzeTracker } from "../utils/api.js";

// Promisified helpers for chrome APIs (works with callback-style APIs)
function storageGet(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (items) => {
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
      resolve(items);
    });
  });
}

function storageSet(obj) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(obj, () => {
      if (chrome.runtime.lastError) return reject(chrome.runtime.lastError);
      resolve();
    });
  });
}

function getCookies(domain) {
  return new Promise((resolve) => {
    if (!chrome.cookies || !chrome.cookies.getAll) return resolve([]);
    chrome.cookies.getAll({ domain }, (cookies) => resolve(cookies || []));
  });
}

// In-memory cache to avoid duplicate API calls
const analyzedTrackers = new Set();


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) return;

  switch (message.type) {
    case "TRACKERS_DETECTED":
      // Start async processing and keep the message channel alive
      handleTrackersDetected(message.payload).catch((err) => console.error('handleTrackersDetected error:', err));
      sendResponse({ ack: true });
      return true; // keep the service worker alive

    case "BLOCK_TRACKER":
      applyBlockRule(message.domain).catch((err) => console.error('applyBlockRule error:', err));
      sendResponse({ ack: true });
      return true;

    case "UNBLOCK_TRACKER":
      removeBlockRule(message.domain).catch((err) => console.error('removeBlockRule error:', err));
      sendResponse({ ack: true });
      return true;

    default:
      return false;
  }
});

//HANDLE TRACKER DETECTION

async function handleTrackersDetected({ trackers, pageDomain, signals }) {
  for (const trackerDomain of trackers) {
    if (analyzedTrackers.has(trackerDomain)) continue;

    analyzedTrackers.add(trackerDomain);

    try {
      const enrichedSignals = await enrichSignals(trackerDomain, signals);

       await sendToBackend({
        pageDomain,
        trackerDomain,
        signals: enrichedSignals
      });

      // Auto-block if backend recommends blocking
      // if (result && result.action === "Block") {
      //   await applyBlockRule(trackerDomain).catch((err) => console.error('Auto-block failed:', err));
      // }
    } catch (err) {
      console.error('Failed to process tracker', trackerDomain, err);
      // Allow future retries
      analyzedTrackers.delete(trackerDomain);
    }
  }
}



async function enrichSignals(trackerDomain, baseSignals) {
  const signals = new Set(baseSignals);

  try {
    // 1️⃣ Persistent cookie detection
    const cookies = await getCookies(trackerDomain);
    cookies.forEach((cookie) => {
      if (cookie && cookie.expirationDate) {
        signals.add("persistent-cookie");
      }
    });

    // 2️⃣ Cross-site detection (MVP-safe)
    const data = await storageGet(["seenTrackers"]);

    const seenTrackers = data.seenTrackers || {};

    if (seenTrackers[trackerDomain]) {
      signals.add("cross-site");
    }

    seenTrackers[trackerDomain] = true;

    await storageSet({ seenTrackers });
  } catch (err) {
    console.warn('enrichSignals encountered an error:', err);
  }

  return Array.from(signals);
}



async function sendToBackend({ pageDomain, trackerDomain, signals }) {
  try {
    const result = await analyzeTracker({
      pageDomain,
      trackerDomain,
      signals
    });
    
    localStorage.setItem(`tracker_`, result)
    // Store result for popup & dashboard
    // await storageSet({ [`tracker_${trackerDomain}`]: result });

    return result;
  } catch (err) {
    console.error('sendToBackend failed for', trackerDomain, err);
    throw err;
  }
}



function applyBlockRule(domain) {
  const ruleId = generateRuleId(domain);

  return new Promise((resolve) => {
    // Use a stricter urlFilter pattern to match domain hosts: ||domain^
    const rule = {
      id: ruleId,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: `||${domain}^`,
        resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"]
      }
    };

    chrome.declarativeNetRequest.updateDynamicRules({ addRules: [rule], removeRuleIds: [] }, async () => {
      if (chrome.runtime.lastError) {
        console.error('Failed to add block rule for', domain, chrome.runtime.lastError);
        return resolve(false);
      }

      try {
        await persistBlockedDomain(domain);
      } catch {
        // ignore persistence failures
      }

      console.log('Blocking rule added for:', domain);
      resolve(true);
    });
  });
}

function removeBlockRule(domain) {
  const ruleId = generateRuleId(domain);

  return new Promise((resolve) => {
    chrome.declarativeNetRequest.updateDynamicRules({ addRules: [], removeRuleIds: [ruleId] }, async () => {
      if (chrome.runtime.lastError) {
        console.error('Failed to remove block rule for', domain, chrome.runtime.lastError);
        return resolve(false);
      }

      try {
        await unpersistBlockedDomain(domain);
      } catch {
        // ignore persistence failures
      }

      console.log('Blocking rule removed for:', domain);
      resolve(true);
    });
  });
}

/**

async function persistBlockedDomain(domain) {
  try {
    const data = await storageGet(["blockedDomains"]);
    const blockedDomains = data.blockedDomains || [];

    if (!blockedDomains.includes(domain)) {
      blockedDomains.push(domain);
      await storageSet({ blockedDomains });
    }
  } catch (err) {
    console.error('persistBlockedDomain error:', err);
  }
}

async function unpersistBlockedDomain(domain) {
  try {
    const data = await storageGet(["blockedDomains"]);
    const blockedDomains = data.blockedDomains || [];

    const updated = blockedDomains.filter((d) => d !== domain);
    await storageSet({ blockedDomains: updated });
  } catch (err) {
    console.error('unpersistBlockedDomain error:', err);
  }
}



function generateRuleId(domain) {
  // Deterministic rule ID per domain
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
*/