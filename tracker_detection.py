
#CyberShield – Tracker Detection + AI Explainability


import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

# 🔹 IMPORT AI EXPLAINABILITY
from explainability import explain_tracker



# Helper: Extract domain

def get_domain(url):
    parsed = urlparse(url)
    return parsed.netloc.replace("www.", "")



# Tracker Detection Logic

def detect_trackers(website_url):

    trackers = []
    site_domain = get_domain(website_url)

    try:
        response = requests.get(website_url, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        scripts = soup.find_all("script", src=True)

        for script in scripts:
            script_src = script["src"]
            script_domain = get_domain(script_src)

            if script_domain and script_domain != site_domain:
                trackers.append(script_domain)

    except Exception as e:
        print("Error detecting trackers:", e)

    return list(set(trackers))


# MAIN PIPELINE

if __name__ == "__main__":

    print("\n🛡️ CyberShield – Hidden Tracker Detection\n")

    website = input("Enter website URL (with https://): ")

    detected_trackers = detect_trackers(website)

    if not detected_trackers:
        print("\n✅ No trackers detected")
    else:
        print("\n🔍 Trackers Found & Explained:\n")

        for tracker in detected_trackers:

            # ---- Metadata (NO USER DATA) ----
            tracker_domain = tracker
            tracker_category = "Tracking / Analytics"
            behavior_signals = [
                "third-party script",
                "loads in background"
            ]

            explanation = explain_tracker(
                domain=tracker_domain,
                category=tracker_category,
                behavior_signals=behavior_signals
            )

            print(f"📌 Tracker: {tracker_domain}\n")
            print(f"🧾 Explanation: {explanation}\n")

