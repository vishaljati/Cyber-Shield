(() => {
  try {
   
    const pageDomain = window.location.hostname;
    const trackers = new Set();
    const signals = new Set();
    let messageSent = false;

    const isThirdParty = (host) => !host.endsWith(pageDomain) && !pageDomain.endsWith(host);;

    const addTracker = (host, extraSignals = []) => {
      if (!host) return;
      trackers.add(host);
      extraSignals.forEach((s) => signals.add(s));
    };


    //Scan existing DOM (after load)
    const scanStaticDOM = () => {
      // External scripts
      document.querySelectorAll("script[src]").forEach((script) => {
        try {
          const url = new URL(script.src);
          if (isThirdParty(url.hostname)) {
            addTracker(url.hostname, ["third-party"]);
          }

          if (
            url.hostname.includes("analytics") ||
            url.hostname.includes("googletag") ||
            url.hostname.includes("clarity") ||
            url.hostname.includes("hotjar")
          ) {
            signals.add("analytics");
          }
        } catch (_) {}
      });

      // Tracking pixels (1x1 or invisible images)
      document.querySelectorAll("img[src]").forEach((img) => {
        try {
          const w = img.naturalWidth || img.width;
          const h = img.naturalHeight || img.height;

          if (w <= 1 && h <= 1) {
            const url = new URL(img.src);
            addTracker(url.hostname, ["pixel"]);
            if (isThirdParty(url.hostname)) signals.add("third-party");
          }
        } catch (_) {}
      });

      // Iframes
      document.querySelectorAll("iframe[src]").forEach((iframe) => {
        try {
          const url = new URL(iframe.src);
          if (isThirdParty(url.hostname)) {
            addTracker(url.hostname, ["third-party", "iframe"]);
          }
        } catch (_) {}
      });
    };


     //Send data ONCE to background
    const sendOnce = () => {
      if (messageSent) return;
      if (trackers.size === 0) return;

      messageSent = true;
      chrome.runtime.sendMessage({
        type: "TRACKERS_DETECTED",
        payload: {
          trackers: Array.from(trackers),
          pageDomain,
          signals: Array.from(signals)
        }
      });
    };


    //Delay initial scan (critical)
    setTimeout(() => {
      scanStaticDOM();
      sendOnce();
    }, 4000); 


     //Observe dynamic injections
       
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!node || node.nodeType !== Node.ELEMENT_NODE) return;

          // Direct script injection
          if (node.tagName === "SCRIPT" && node.src) {
            try {
              const url = new URL(node.src);
              if (isThirdParty(url.hostname)) {
                addTracker(url.hostname, ["third-party"]);
              }
            } catch (_) {}
          }

          // Direct iframe injection
          if (node.tagName === "IFRAME" && node.src) {
            try {
              const url = new URL(node.src);
              if (isThirdParty(url.hostname)) {
                addTracker(url.hostname, ["third-party", "iframe"]);
              }
            } catch (_) {}
          }

          // Nested scripts (GTM-style injections)
          if (node.querySelectorAll) {
            node.querySelectorAll("script[src]").forEach((s) => {
              try {
                const url = new URL(s.src);
                if (isThirdParty(url.hostname)) {
                  addTracker(url.hostname, ["third-party"]);
                }
              } catch (_) {}
            });
          }
        });
      });

      // Debounced send after dynamic changes
      clearTimeout(observer._timer);
      observer._timer = setTimeout(sendOnce, 1000);
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  } catch (err) {
    console.warn("CyberShield content script error:", err);
  }
})();


