/**
 * Map risk level to recommended user action
 * This logic MUST stay simple and predictable
 */

export const mapRiskToAction = (risk) => {
    switch (risk) {
        case "HIGH":
            return "Block";

        case "MEDIUM":
            return "Ask User";

        case "LOW":
            return "Allow";

        default:
            // Safety fallback (never block by mistake)
            return "Ask User";
    }
}
