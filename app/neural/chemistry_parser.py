import json
import re


class ChemistryParser:

    def __init__(self, llm):
        self.llm = llm

    def parse(self, question):

        prompt = f"""
You are a chemistry problem parser.

Convert the following chemistry question into JSON.

Question:
{question}

Return ONLY valid JSON with this structure:

{{
    "operation": "calculate",
    "formula": "appropriate formula",
    "variables": {{}},
    "unknown": "unknown variable"
}}

Possible operations:
- calculate
- balance_reaction
- molar_mass
- concentration
- stoichiometry
- identify_element

Do not include explanations.
"""

        response = self.llm.generate(prompt)

        if hasattr(response, "text"):
            response = response.text

        response = response.strip()

        response = re.sub(r"```json", "", response)
        response = re.sub(r"```", "", response)
        response = response.strip()

        try:
            problem = json.loads(response)
        except json.JSONDecodeError:
            match = re.search(r"\{.*\}", response, re.DOTALL)

            if not match:
                raise ValueError(
                    "Could not parse chemistry problem."
                )

            problem = json.loads(match.group())

        return problem
