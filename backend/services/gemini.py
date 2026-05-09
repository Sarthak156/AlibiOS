import os
import json
import re
import random

import google.generativeai as genai

from dotenv import load_dotenv

from services.scoring import calculate_scores

load_dotenv()

# ==============================
# GEMINI CONFIG
# ==============================

api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    genai.configure(api_key=api_key)


def get_model():

    try:
        return genai.GenerativeModel(
            "gemini-1.5-flash"
        )

    except Exception:

        try:
            return genai.GenerativeModel(
                "gemini-1.5-pro"
            )

        except Exception:
            return None


model = get_model()

# ==============================
# DEFAULT CROSS QUESTIONS
# ==============================

default_questions = [

    {
        "question":
        "Why didn't you inform earlier?",

        "answer":
        "I genuinely thought I could resolve the issue before the deadline."
    },

    {
        "question":
        "Can you provide proof?",

        "answer":
        "Yes, I can share screenshots or supporting details if required."
    },

    {
        "question":
        "How much work had you completed?",

        "answer":
        "Most of the work was already completed. I mainly lost the final files and formatting."
    }
]

# ==============================
# MOCK EXCUSES
# ==============================

MOCK_EXCUSES = [

    "My laptop suddenly crashed and I lost all my work files without any backup.",

    "I had a serious family emergency that required my immediate attention and presence.",

    "There was an unexpected internet outage at my place for the entire weekend.",

    "My submission files became corrupted during export and would not open properly.",

    "I was dealing with a health issue and could not complete the assignment on time."
]

# ==============================
# MOCK GENERATOR
# ==============================

def generate_mock_excuse(data):

    excuses = []

    for i in range(3):

        excuse_text = random.choice(
            MOCK_EXCUSES
        )

        scores = calculate_scores(
            excuse_text
        )

        excuses.append({

            "title":
            f"Emergency Scenario #{i+1}",

            "text":
            excuse_text,

            "success_probability":
            scores["success_probability"],

            "emotional_manipulation":
            scores["emotional_manipulation"],

            "risk":
            scores["risk"],

            "lie_detector":
            scores["lie_detector"],

            "acting_difficulty":
            random.choice([
                "LOW",
                "MEDIUM",
                "HIGH"
            ]),

            "guilt_damage":
            random.choice([
                "LOW",
                "MEDIUM",
                "HIGH",
                "CRITICAL"
            ]),

            "cross_questions":
            default_questions
        })

    return {
        "excuses": excuses
    }

# ==============================
# MAIN GENERATOR
# ==============================

def generate_excuse(data):

    prompt = f"""

You are ALIBI OS.

A classified academic survival AI.

Generate 3 believable student excuses.

RULES:
- realistic
- emotionally intelligent
- believable
- natural sounding
- avoid robotic AI language
- each excuse must feel different
- avoid repetition

INPUT:

Assignment:
{data['assignment']}

Deadline:
{data['deadline']}

Situation:
{data['situation']}

Category:
{data['category']}

Mode:
{data['mode']}

Truth Percentage:
{data['truthLevel']}

Generate EXACTLY 3 excuses.

For EVERY excuse also generate:
- 3 realistic teacher cross-questions
- believable defensive answers

RETURN STRICT JSON:

{{
  "excuses":[
    {{
      "title":"",

      "text":"",

      "success_probability":"",

      "emotional_manipulation":"",

      "risk":"",

      "lie_detector":"",

      "acting_difficulty":"",

      "guilt_damage":"",

      "cross_questions":[
        {{
          "question":"",
          "answer":""
        }}
      ]
    }}
  ]
}}

"""

    # ==============================
    # FALLBACK IF MODEL UNAVAILABLE
    # ==============================

    if not model or not api_key:

        return generate_mock_excuse(
            data
        )

    # ==============================
    # GEMINI REQUEST
    # ==============================

    try:

        response = model.generate_content(
            prompt
        )

        text = response.text

    except Exception as e:

        print("GEMINI ERROR:", e)

        return generate_mock_excuse(
            data
        )

    # ==============================
    # CLEAN RESPONSE
    # ==============================

    try:

        text = re.sub(
            r"```json",
            "",
            text
        )

        text = re.sub(
            r"```",
            "",
            text
        )

        text = text.strip()

        parsed = json.loads(text)

        # ==============================
        # ENSURE REQUIRED FIELDS
        # ==============================

        for excuse in parsed.get(
            "excuses",
            []
        ):

            scores = calculate_scores(
                excuse.get(
                    "text",
                    ""
                )
            )

            excuse[
                "success_probability"
            ] = excuse.get(
                "success_probability",
                scores[
                    "success_probability"
                ]
            )

            excuse[
                "emotional_manipulation"
            ] = excuse.get(
                "emotional_manipulation",
                scores[
                    "emotional_manipulation"
                ]
            )

            excuse[
                "risk"
            ] = excuse.get(
                "risk",
                scores["risk"]
            )

            excuse[
                "lie_detector"
            ] = excuse.get(
                "lie_detector",
                scores[
                    "lie_detector"
                ]
            )

            excuse[
                "acting_difficulty"
            ] = excuse.get(
                "acting_difficulty",
                random.choice([
                    "LOW",
                    "MEDIUM",
                    "HIGH"
                ])
            )

            excuse[
                "guilt_damage"
            ] = excuse.get(
                "guilt_damage",
                random.choice([
                    "LOW",
                    "MEDIUM",
                    "HIGH",
                    "CRITICAL"
                ])
            )

            excuse[
                "cross_questions"
            ] = excuse.get(
                "cross_questions",
                default_questions
            )

        return parsed

    # ==============================
    # JSON FAILSAFE
    # ==============================

    except Exception as e:

        print("JSON PARSE ERROR:", e)

        print(text)

        return generate_mock_excuse(
            data
        )