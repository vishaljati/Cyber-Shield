import { useEffect, useState } from "react";

export default function App() {
  const [trackers, setTrackers] = useState([]);

  useEffect(() => {
    
    chrome.runtime.sendMessage(
      { type: "GET_TRACKERS" },
      (response) => {
        if (response && response.trackers) {
          
          const formatted = response.trackers.map((domain) => ({
            tracker: domain,
            category: "Unknown",
            risk: "MEDIUM",
            explanation: "Tracker detected on this website.",
            action: "Block"
          }));

          setTrackers(formatted);
        }
      }
    );
  }, []);

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
    <div className="w-full min-h-[400px] bg-gray-950 text-white p-4">

      <div className="flex items-center gap-2">
        <span className="text-xl">🛡</span>
        <h1 className="text-xl font-bold">CyberShield</h1>
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
                <span className="font-medium">{t.tracker}</span>
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
                <button className="flex-1 rounded bg-red-600 py-1 text-sm hover:bg-red-700">
                  Block
                </button>

                <button className="flex-1 rounded bg-gray-700 py-1 text-sm hover:bg-gray-600">
                  Allow once
                </button>
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
