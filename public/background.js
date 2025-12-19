console.log("CyberShield background service worker running");


let latestTrackers = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.type === "TRACKERS_FOUND") {
        latestTrackers = message.trackers;

        console.log("Trackers detected:", latestTrackers);
    }


    if (message.type === "GET_TRACKERS") {
        sendResponse({
            trackers: latestTrackers
        });
    }

    return true;
});
