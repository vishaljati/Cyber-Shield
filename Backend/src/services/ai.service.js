import { generateText } from "../config/gemini.config.js"

//Build a strict prompt to avoid hallucinations
const buildPrompt = ({ trackerDomain, category, signals }) => {
  return `
   You are a cybersecurity assistant.
   Explain what the tracker "${trackerDomain}" does.
   Category: ${category}
   Observed behavior signals: ${signals.join(", ")}
   Rules:
   - Use simple, non-technical language
   - Max 2 sentences
   - Do NOT speculate
   - Do NOT mention AI
   - Do NOT mention user data
   - Do NOT exaggerate risk
   Explain only the likely purpose of this tracker.
`;
}

//Ensure explanation is safe & short
const sanitizeExplanation = (text) => {
  return text
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 250);
}

export const generateExplanation = async ({ trackerDomain, category, signals }) => {
  const prompt = buildPrompt(trackerDomain, category, signals);

  const geminiText = await generateText(prompt)
  console.log("aiService ",geminiText);

  return sanitizeExplanation(geminiText)

}


export const getFallbackExplanation = (category) => {

  switch (category) {
    case "Necessary":
      return "This tracker is required for the website to function properly."

    case "Analytics":
      return "This tracker collects anonymous usage data to analyze website performance."

    case "Advertising":
      return "This tracker follows users across websites to deliver targeted advertisements."

    case "Suspicious":
      return "This tracker shows tracking behavior but its exact purpose is unclear."


    default:
      return "This tracker performs tracking-related activity."
  }


}







