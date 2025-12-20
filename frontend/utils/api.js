import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/analyze/analyze-tracker";

//Sends tracker signals to backend
export async function analyzeTracker({
  pageDomain,
  trackerDomain,
  signals
}) {
  try {
    const response = await axios.post(
      API_URL,
      {
        trackerDomain,
        pageDomain,
        signals
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 5000
      }
    );

    return response.data;

  } catch (error) {
    console.error("Axios backend error:", error);

    // Safe fallback so extension never crashes
    return {
      tracker: trackerDomain,
      category: "Suspicious",
      risk: "MEDIUM",
      explanation: "Unable to analyze tracker at the moment.",
      action: "Ask User"
    };
  }
}
