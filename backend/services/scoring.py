import random


def calculate_scores(excuse_text):

    success = random.randint(60, 95)

    emotional = random.randint(40, 98)

    risk = random.choice([
        "LOW",
        "MEDIUM",
        "HIGH",
        "CRITICAL"
    ])

    suspicion = random.randint(10, 90)

    if "hospital" in excuse_text.lower():
        suspicion += 10

    if "internet" in excuse_text.lower():
        suspicion -= 5

    if suspicion < 30:
        lie = "LOW SUSPICION"

    elif suspicion < 60:
        lie = "MODERATE RISK"

    elif suspicion < 80:
        lie = "HIGHLY SUSPICIOUS"

    else:
        lie = "FEDERAL INVESTIGATION"

    return {
        "success_probability": f"{success}%",
        "emotional_manipulation": f"{emotional}%",
        "risk": risk,
        "lie_detector": lie
    }