import { generateText } from '../config/gemini.config.js';

const sanitizeExplanation = (text) => {
  return text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 250);
};

export const generateExplanation = async ({
  trackerDomain,
  category,
  signals,
}) => {
  const prompt = `You are a cybersecurity assistant.
   Explain what the tracker "${trackerDomain}" does.
   Category: ${category}
   Observed behavior signals: ${signals.join(', ')}
   Rules:
   - Use simple, non-technical language 
   -Explain properly and clearly
   -Within 1 sentence in 15 words
   - Do NOT speculate
   - Do NOT mention AI
   - Do NOT mention user data
   - Do NOT exaggerate risk
   Explain only the likely purpose of this tracker.
`;
  const geminiText = await generateText(prompt);
  if (!geminiText) {
    throw new Error('GEMINI TEXT GENERATION FAILED');
  }

  return sanitizeExplanation(geminiText);
};

export const getFallbackExplanation = (category) => {
  switch (category) {
    case 'Necessary':
      return 'This tracker is required for the website to function properly.';

    case 'Analytics':
      return 'This tracker collects anonymous usage data to analyze website performance.';

    case 'Advertising':
      return 'This tracker follows users across websites to deliver targeted advertisements.';

    case 'Suspicious':
      return 'This tracker shows tracking behavior but its exact purpose is unclear.';

    default:
      return 'This tracker performs tracking-related activity.';
  }
};
