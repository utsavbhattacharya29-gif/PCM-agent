import json
import re


class PhysicsParser:

    def __init__(self, llm):
        self.llm = llm

    def parse(self, question):

        prompt = f"""
Convert the following physics question into JSON.

Question:
{question}

Return ONLY valid JSON with this structure:

{{
    "operation": "calculate",
    "formula": "",
    "variables": {{}},
    "unknown": ""
}}

Do not include markdown or explanations.
"""

        response = self.llm.generate(prompt)

        try:
            text = response.strip()

            if "```" in text:
                text = re.sub(r"```(?:json)?", "", text).strip()

            problem = json.loads(text)

            if "operation" not in problem:
                raise ValueError("Missing operation")

            if "formula" not in problem:
                raise ValueError("Missing formula")

            if "variables" not in problem:
                problem["variables"] = {}

            if "unknown" not in problem:
                problem["unknown"] = ""

            return problem

        except Exception:
            return self._fallback_parse(question)

    def _fallback_parse(self, question):

        q = question.lower()

        if "force" in q:
            return {
                "operation": "calculate",
                "formula": "F = m*a",
                "variables": {},
                "unknown": "F"
            }

        if "velocity" in q:
            return {
                "operation": "calculate",
                "formula": "v = u + a*t",
                "variables": {},
                "unknown": "v"
            }

        if "kinetic energy" in q:
            return {
                "operation": "calculate",
                "formula": "KE = 0.5*m*v**2",
                "variables": {},
                "unknown": "KE"
            }

        if "potential energy" in q:
            return {
                "operation": "calculate",
                "formula": "PE = m*g*h",
                "variables": {},
                "unknown": "PE"
            }

        if "momentum" in q:
            return {
                "operation": "calculate",
                "formula": "p = m*v",
                "variables": {},
                "unknown": "p"
            }

        if "power" in q:
            return {
                "operation": "calculate",
                "formula": "P = W/t",
                "variables": {},
                "unknown": "P"
            }

        if "pressure" in q:
            return {
                "operation": "calculate",
                "formula": "P = F/A",
                "variables": {},
                "unknown": "P"
            }

        if "current" in q:
            return {
                "operation": "calculate",
                "formula": "I = V/R",
                "variables": {},
                "unknown": "I"
            }

        raise ValueError(
            "Could not determine physics operation or formula"
        )
