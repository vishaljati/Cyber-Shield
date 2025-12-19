console.log("CyberShield background service worker running");

let latestTrackers = [];
let ruleIdCounter = 1; 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  
  if (message.type === "TRACKERS_FOUND") {
    latestTrackers = message.trackers;
    console.log("Trackers detected:", latestTrackers);
  }

  
  if (message.type === "GET_TRACKERS") {
    sendResponse({ trackers: latestTrackers });
  }

  
  if (message.type === "BLOCK_DOMAIN") {
    const domain = message.domain;

    const rule = {
      id: ruleIdCounter++,
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
        addRules: [rule],
        removeRuleIds: []
      },
      () => {
        console.log("Blocking rule added for:", domain);
        sendResponse({ success: true });
      }
    );

    return true; 
  }
});
