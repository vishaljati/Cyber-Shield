import { useEffect, useState } from "react";

export default function App() {
  const [trackers, setTrackers] = useState([]);
  
  const loadTrackers = () => {
    chrome.storage.local.get(null, (data) => {
      const trackerList = Object.entries(data)
        .filter(([key, value]) => key.startsWith("tracker_") && value && value.message.isBlocked === false)
        .map(([_, value]) => {
          const payload = value.message
          return {
            tracker: payload.tracker || "Unknown domain",
            category: payload.category || "Unknown",
            risk: payload.risk || "UNKNOWN",
            explanation: payload.explanation || "No explanation available.",
            action: payload.action || "Ask User",
            isBlocked: payload.isBlocked || false,
            isAllowedbyUser: payload.isAllowedbyUser || false

          };
        });

      setTrackers(trackerList);
    });
  };

  useEffect(() => {
    loadTrackers();
    // Live updates when background writes to storage
    chrome.storage.onChanged.addListener(loadTrackers);
    return () => {
      chrome.storage.onChanged.removeListener(loadTrackers);
    };
  }, []);



  const blockTracker = (domain) => {
    if (!chrome?.runtime) return;

    chrome.runtime.sendMessage(
      {
        type: "BLOCK_DOMAIN",
        domain
      },
      (response) => {

        if (response.success || response) {
          setTrackers((prev) =>
            prev.filter((t) => t.tracker !== domain)
          );
        }
      }
    );
  };

  const unblockTracker = (domain) => {
    if (!chrome?.runtime) return;
    chrome.runtime.sendMessage({
      type: "UNBLOCK_TRACKER",
      domain
    },

    );
  };

  const riskStyles = {
    HIGH: {
      border: "border-red-500/40",
      bg: "bg-red-500/10",
      text: "text-red-400"
    },
    MEDIUM: {
      border: "border-yellow-500/40",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400"
    },
    LOW: {
      border: "border-green-500/40",
      bg: "bg-green-500/10",
      text: "text-green-400"
    }
  };


  return (
    <div className="w-full min-h-100 bg-gray-950 text-white p-4">

      <div className="flex items-center gap-2">
        <span className="text-xl">🛡</span>
        <h1 className="text-xl font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] tracking-tight">
          CyberShield
        </h1>
      </div>

      <p className="text-sm text-gray-400 mt-1">
        Privacy protection is active
      </p>


      <div className="mt-4 text-sm text-red-400">
        ⚠ {trackers.length} tracker(s) detected
      </div>


      <div className="mt-3 space-y-3">
        {trackers.map((t, index) => {
          const style = riskStyles[t.risk] || riskStyles.LOW;

          return (
            <div
              key={index}
              className={`rounded-lg border p-3 ${style.bg} ${style.border}`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium truncate">Tracker Domain :{t.tracker}</span>
                <span className={`text-xs font-semibold ${style.text}`}>
                  {t.risk}
                </span>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {t.category} Tracker
              </div>

              <p className="text-sm text-gray-300 mt-2">
                {t.explanation}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => blockTracker(t.tracker)}
                  className="flex-1 rounded bg-red-700 py-1 text-sm hover:bg-red-700"
                >
                  Block
                </button>


                {t.isAllowedbyUser && !t.isBlocked ? (
                  <button
                    className="flex-1 rounded  bg-green-900 py-1 text-sm hover:bg-green-700">
                    Allowed
                  </button>) : (
                  <button
                    onClick={() => unblockTracker(t.tracker)}
                    className="flex-1 rounded bg-gray-700 py-1 text-sm hover:bg-gray-600">
                    Allow Once
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>


      <div className="mt-4 text-center text-xs text-gray-500">
        No personal data collected • Privacy-first
      </div>
    </div>
  );
}
