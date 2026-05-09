import os
import json
import google.generativeai as genai
import re
from services.scoring import calculate_scores

from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# Helper to obtain the best available model for the free tier.
def get_model():
    # Try the flash model first (cheapest), fall back to pro if unavailable.
    try:
        return genai.GenerativeModel("gemini-1.5-flash")
    except Exception:
        # Fallback to a more widely available model.
        try:
            return genai.GenerativeModel("gemini-1.5-pro")
        except Exception:
            return None

# Initialize a default model instance (will be overridden if needed).
model = get_model()

# Mock excuses for fallback/testing
MOCK_EXCUSES = [
    "My laptop suddenly crashed and I lost all my work files without any backup.",
    "I had a serious family emergency that required my immediate attention and presence.",
    "There was an unexpected internet outage at my place for the entire weekend."
]

def generate_mock_excuse(data):
    """Generate a mock excuse with scoring when API is unavailable"""
    import random
    
    excuse_text = random.choice(MOCK_EXCUSES)
    scores = calculate_scores(excuse_text)
    
    excuses = []
    for i in range(3):
        excuse = random.choice(MOCK_EXCUSES)
        scores = calculate_scores(excuse)
        excuses.append({
            "text": excuse,
            "success_probability": scores["success_probability"],
            "emotional_manipulation": scores["emotional_manipulation"],
            "risk": scores["risk"],
            "lie_detector": scores["lie_detector"]
        })
    
    return {"excuses": excuses}


def generate_excuse(data):

    prompt = f"""
    You are ALIBI OS.

    Generate 3 believable excuses.

    INPUT:
    Assignment: {data['assignment']}
    Deadline: {data['deadline']}
    Situation: {data['situation']}
    Category: {data['category']}
    Mode: {data['mode']}
    Truth Percentage: {data['truthLevel']}

    RETURN STRICT JSON:

    {{
      "excuses":[
        {{
          "text":"",
          "success_probability":"",
          "emotional_manipulation":"",
          "risk":"",
          "lie_detector":""
        }}
      ]
    }}

    Make responses creative and realistic.
    """

    # Use mock if no valid API model
    if not model or not api_key:
        return generate_mock_excuse(data)

    try:
        response = model.generate_content(prompt)
        text = response.text
    except Exception as e:
        # Fallback to mock if API call fails
        return generate_mock_excuse(data)


    try:
        text = re.sub(r"```json", "", text)
        text = re.sub(r"```", "", text)
        text = text.strip()
        parsed = json.loads(text)
        return parsed

    except:
        # Fallback to mock if parsing fails
        return generate_mock_excuse(data)