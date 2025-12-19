console.log("CyberShield content script injected");


const pageDomain = window.location.hostname;


const scripts = Array.from(document.querySelectorAll("script[src]"));

const trackers = scripts
  .map((script) => {
    try {
      const url = new URL(script.src);
      return url.hostname;
    } catch {
      return null;
    }
  })
  .filter(
    (domain) =>
      domain &&
      domain !== pageDomain &&
      !domain.endsWith(pageDomain)
  );


const uniqueTrackers = [...new Set(trackers)];

if (uniqueTrackers.length > 0) {
  chrome.runtime.sendMessage({
    type: "TRACKERS_FOUND",
    trackers: uniqueTrackers,
    pageDomain
  });
}