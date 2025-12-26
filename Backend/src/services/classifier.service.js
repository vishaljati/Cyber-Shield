import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knownTrackers = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../data/knownTrackers.json"),
    "utf-8"
  )
);

const classifierService = ({ trackerDomain, pageDomain, signals }) => {
  const domain = trackerDomain.toLowerCase();
  const signalSet = new Set(signals);

  let category = "";
  let action = ""
  let risk = "";
  let explanation = "";


  if (knownTrackers[domain]) {
    const known = knownTrackers[domain];
    return {
      category: known.category,
      risk: known.risk,
      explanation: known.explanation,
      action: known.action,
    }
  }
  if (domain.includes(pageDomain)) {
    return {
      category: "Necessary",
      risk: "LOW",
       explanation:"First-party resource required for site functionality.",
      action: "Allow",
    }
  }

  if (
    signalSet.has("third-party") ||
    signalSet.has("pixel") ||
    signalSet.has("cross-site")
  ) {

    category = "Advertising";
    risk = "HIGH";
    action = "Block";
    
  }

  else if (
    knownTrackers.analytics.includes(trackerDomain) ||
    signals.includes('analytics')
  ) {
    category = 'Analytics';
    risk = 'MEDIUM';

  }


  else if (
    signalSet.has("analytics")
  ) {
      category = "Analytics";
      risk = "MEDIUM";
 
  }


  else if (
    signalSet.has("iframe")
  ) {
    category = "Suspicious";
    risk = "MEDIUM";
  }


  return {
    category,
    risk,
    explanation,
    action,
  };
}


export { classifierService };
