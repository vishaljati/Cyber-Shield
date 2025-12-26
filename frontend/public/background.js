
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.type === "TRACKERS_DETECTED") {
    handleTrackersDetected(message.payload);
  }

  if (message.type === "BLOCK_DOMAIN") {
    applyBlockRule(message.domain)
    .then(() => {
        sendResponse({ success: true });
      })
      .catch(() => {
        sendResponse({ success: false });
      });
     return true;
  }

  if (message.type === "UNBLOCK_TRACKER") {
    removeBlockRule(message.domain);
  }
});


async function handleTrackersDetected({ trackers, pageDomain, signals }) {
let analyzedTrackers = new Set();
  for (const trackerDomain of trackers) {
    
    if (analyzedTrackers.has(trackerDomain)) continue;
    analyzedTrackers.add(trackerDomain);

    const enrichedSignals = await enrichSignals(trackerDomain, signals);

     const result = await sendToBackend({
      trackerDomain,
      pageDomain,
      signals: enrichedSignals
    });
    
    chrome.storage.local.set(
      { [`tracker_${trackerDomain}`]: result }
    );
    

  }
}


async function enrichSignals(trackerDomain, baseSignals) {
  const signals = new Set(baseSignals);

  // Persistent cookies
  const cookies = await chrome.cookies.getAll({ domain: trackerDomain });
  cookies.forEach((c) => {
    if (c.expirationDate) signals.add("persistent-cookie");
  });

  // Cross-site heuristic
  const data = await new Promise((res) =>
    chrome.storage.local.get(["seenTrackers"], res)
  );

  const seen = data.seenTrackers || {};
  if (seen[trackerDomain]) signals.add("cross-site");

  seen[trackerDomain] = true;
  await new Promise((res) =>
    chrome.storage.local.set({ seenTrackers: seen }, res)
  );

  return Array.from(signals);
}

async function sendToBackend({ trackerDomain, pageDomain, signals }) {
  try {
    const res = await fetch("http://localhost:3000/api/v1/analyze/analyze-tracker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackerDomain, pageDomain, signals })
    });

    const result = await res.json();
    return result;

  } catch (err) {
    console.error("Backend call failed", err);
    const fallback = {
      tracker: trackerDomain,
      category: "Unknown",
      risk: "MEDIUM",
      explanation: "Backend unavailable.",
      action: "Ask User"
    };
    return fallback;
  }
}

async function applyBlockRule(domain) {
  const ruleId = generateRuleId(domain);

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [ruleId],
    addRules: [
      {
        id: ruleId,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: domain,
          resourceTypes: ["script", "image", "sub_frame", "xmlhttprequest"]
        }
      }
    ]
  });

  const key = `tracker_${domain}`;
  const stored = await chrome.storage.local.get(key);
  console.log("Stored Key [BG] :",stored[key]);
  
  if (stored[key]) {
    stored[key].message.isBlocked = true;
    stored[key].message.isAllowedbyUser=false;
    await chrome.storage.local.set({
      [key]: stored[key]
    });
  }
}


async function removeBlockRule(domain) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [generateRuleId(domain)]
  });
   const key = `tracker_${domain}`;
   const stored = await chrome.storage.local.get(key);
   if (stored[key]) {
    stored[key].message.isBlocked = false;
    stored[key].message.isAllowedbyUser=true;
    await chrome.storage.local.set({
      [key]: stored[key]
    });
  }
}

function generateRuleId(domain) {
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
