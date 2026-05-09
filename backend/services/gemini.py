import os
import json
import google.generativeai as genai
import re

from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Helper to obtain the best available model for the free tier.
def get_model():
    # Try the flash model first (cheapest), fall back to pro if unavailable.
    try:
        return genai.GenerativeModel("gemini-1.5-flash")
    except Exception:
        # Fallback to a more widely available model.
        return genai.GenerativeModel("gemini-1.5-pro")

# Initialize a default model instance (will be overridden if needed).
model = get_model()


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

    try:
        response = model.generate_content(prompt)
        text = response.text
    except Exception as e:
        return {"error": f"Model generation failed: {str(e)}"}


    try:
        text = re.sub(r"```json", "", text)
        text = re.sub(r"```", "", text)
        text = text.strip()
        parsed = json.loads(text)
        return parsed

    except:
        return {
            "excuses": [
                {
                    "text": text,
                    "success_probability": "Unknown",
                    "emotional_manipulation": "Unknown",
                    "risk": "Unknown",
                    "lie_detector": "Unknown"
                }
            ]
        }