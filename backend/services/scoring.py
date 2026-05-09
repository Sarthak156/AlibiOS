import random

def calculate_scores(text):

    text = text.lower()

    success = 65
    emotional = 40
    suspicion = 20

    if "family" in text:
        emotional += 20
        success += 10

    if "hospital" in text:
        emotional += 35
        suspicion += 20

    if "internet" in text:
        success += 8

    if "laptop" in text:
        success += 10

    if "forgot" in text:
        success -= 25

    success = min(success,95)

    if suspicion < 30:
        lie = "LOW SUSPICION"

    elif suspicion < 60:
        lie = "MODERATE RISK"

    else:
        lie = "FEDERAL INVESTIGATION"

    return {
        "success_probability":f"{success}%",
        "emotional_manipulation":f"{emotional}%",
        "risk":random.choice([
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ]),
        "lie_detector":lie
    }