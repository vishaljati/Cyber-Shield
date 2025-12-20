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



/**
 * ============================
 * CONTENT SCRIPT
 * ============================
 * Responsibility:
 * - Observe page-level tracking behavior
 * - Generate privacy-safe signals
 * - Send data to background script
 *
 * NO backend calls
 * NO blocking
 * NO storage
 */

/*
; (function () {
  try {
    const pageDomain = window.location.hostname;
    const trackers = new Set();
    const signals = new Set();

    const isThirdParty = (host) =>
      !host.endsWith(pageDomain) && !pageDomain.endsWith(host);

    // External scripts
    document.querySelectorAll("script[src]").forEach((script) => {
      try {
        const url = new URL(script.src);

        if (isThirdParty(url.hostname)) {
          trackers.add(url.hostname);
          signals.add("third-party");
        }

        if (
          url.hostname.includes("analytics") ||
          url.hostname.includes("googletag") ||
          url.hostname.includes("clarity") ||
          url.hostname.includes("hotjar")
        ) {
          signals.add("analytics");
        }
      } catch {
        // ignore invalid script URL
      }
    });

    // Tracking pixels & tiny images
    document.querySelectorAll("img").forEach((img) => {
      try {
        const width = img.width || img.naturalWidth || 0;
        const height = img.height || img.naturalHeight || 0;
        const style = window.getComputedStyle(img);

        const isTiny = width <= 1 && height <= 1;
        const isHidden = style.display === "none" || style.visibility === "hidden";

        if ((isTiny || isHidden) && img.src) {
          try {
            const url = new URL(img.src, location.href);
            trackers.add(url.hostname);
            signals.add("pixel");
            if (isThirdParty(url.hostname)) {
              signals.add("third-party");
            }
          } catch {
            // ignore bad URLs
          }
        }
      } catch {
        // safely ignore unexpected element errors
      }
    });

    // Iframes with src can also be trackers
    document.querySelectorAll("iframe[src]").forEach((frame) => {
      try {
        const url = new URL(frame.src, location.href);
        if (isThirdParty(url.hostname)) {
          trackers.add(url.hostname);
          signals.add("third-party");
        }
      } catch {
        // ignore invalid urls
      }
    });

    if (trackers.size > 0) {
      chrome.runtime.sendMessage({
        type: "TRACKERS_DETECTED",
        payload: {
          pageDomain,
          trackers: Array.from(trackers),
          signals: Array.from(signals)
        }
      });
    }
  } catch (error) {
    console.warn("CyberShield content script error:", error);
  }
})();
*/
