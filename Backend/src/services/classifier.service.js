import { AsyncHandler } from '../utils/index.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load known tracker domains (static, in-memory)
const knownTrackersPath = path.join(__dirname, '../data/knownTrackers.json');
const knownTrackers = JSON.parse(fs.readFileSync(knownTrackersPath, 'utf-8'));

const classifierService = AsyncHandler(
  async ({ trackerDomain, pageDomain, signals }) => {
    let category = 'Suspicious';
    let risk = 'MEDIUM';

    const isFirstParty = trackerDomain === pageDomain ? true : false;

    // 1️⃣ Necessary (first-party, no tracking behavior)
    if (
      isFirstParty &&
      !signals.includes('cross-site') &&
      !signals.includes('persistent-cookie')
    ) {
      category = 'Necessary';
      risk = 'LOW';
    }

    // 2️⃣ Known analytics trackers
    else if (
      knownTrackers.analytics.includes(trackerDomain) ||
      signals.includes('analytics')
    ) {
      category = 'Analytics';
      risk = 'MEDIUM';
    }

    // 3️⃣ Known advertising / surveillance trackers
    else if (
      knownTrackers.ads.includes(trackerDomain) ||
      (signals.includes('third-party') &&
        signals.includes('persistent-cookie') &&
        signals.includes('cross-site'))
    ) {
      category = 'Advertising';
      risk = 'HIGH';
    }

    // 4️⃣ Unknown but suspicious behavior
    else if (
      signals.includes('third-party') &&
      signals.includes('persistent-cookie')
    ) {
      category = 'Suspicious';
      risk = 'HIGH';
    }

    return {
      category,
      risk,
    };
  }
);

export { classifierService };
