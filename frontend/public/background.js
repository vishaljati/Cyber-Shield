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
