import json
import re


class MathParser:

    def __init__(self, llm):
        self.llm = llm

    def parse(self, question):

        prompt = f"""
Convert the following secondary-level mathematics question into a structured JSON object.

Question:
{question}

Choose exactly one operation from:
- solve_equation
- simplify
- expand
- factor
- differentiate
- integrate

Return ONLY valid JSON.

For solve_equation use:
{{
    "operation": "solve_equation",
    "equation": "...",
    "variable": "x"
}}

For simplify, expand, factor, differentiate, or integrate use:
{{
    "operation": "...",
    "expression": "...",
    "variable": "x"
}}

Convert mathematical notation into Python/SymPy-compatible notation.

Do not provide explanations.
"""

        response = self.llm.generate(prompt)

        return self._extract_json(response)

    def _extract_json(self, response):

        response = response.strip()

        response = re.sub(
            r"```json\s*|\s*```",
            "",
            response
        ).strip()

        match = re.search(
            r"\{.*\}",
            response,
            re.DOTALL
        )

        if not match:
            raise ValueError(
                "LLM did not return a valid JSON object."
            )

        try:
            return json.loads(match.group())
        except json.JSONDecodeError as error:
            raise ValueError(
                f"Invalid JSON returned by LLM: {response}"
            ) from error
