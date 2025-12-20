"""
AI / ML TASK: Explainability Layer
Purpose: Explain what a web tracker does in simple language
No user data is used. No blocking logic. No fear-mongering.
"""

# Fallback explanation (MANDATORY)

def fallback_explanation():
    return (
        "This tracker supports standard website functionality "
        "and enables common online services in the background."
    )



# AI Explainability Function...

def explain_tracker(domain, category, behavior_signals):
    """
    INPUT:
    - domain (str): tracker domain name
    - category (str): tracker category
    - behavior_signals (list): technical behavior indicators

    OUTPUT:
    - explanation (str): short, neutral explanation (≤ 40 words)
    """

    try:
        explanation = (
            f"This tracker from {domain} is mainly used for {category.lower()} purposes. "
            f"It operates across websites to support common online features."
        )

        # Enforce word limit (≤ 40 words)
        words = explanation.split()
        if len(words) > 40:
            explanation = " ".join(words[:40])

        return explanation

    except Exception:
        # AI failure should NEVER break the app
        return fallback_explanation()



# MAIN RUN (Demo / Test)

if __name__ == "__main__":

    print("\n🤖 Tracker Explainability Layer\n")

    # -------- INPUT (NO USER DATA) --------
    tracker_domain = input("Enter tracker domain: ")
    tracker_category = input("Enter tracker category: ")

    print("\nEnter behavior signals (comma separated):")
    signals_input = input("Example: third-party, cross-site presence\n> ")

    behavior_signals = [s.strip() for s in signals_input.split(",")]

    # -------- PROCESS --------
    explanation = explain_tracker(
        domain=tracker_domain,
        category=tracker_category,
        behavior_signals=behavior_signals
    )

    # -------- OUTPUT --------
    print("\n Tracker Explanation:")
    print(explanation)
