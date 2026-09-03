import json
import re


class MathParser:

    def __init__(self, llm):
        self.llm = llm

    def parse(self, question):

        prompt = f"""
You are a mathematics problem parser for a secondary-level mathematics tutoring system.

Convert the user's question into exactly one structured JSON object.

Question:
{question}

Choose the operation according to these rules:

1. If the user asks to solve an equation, find roots, find solutions, or determine the value of a variable:
   operation = "solve_equation"

2. If the user asks to simplify an expression:
   operation = "simplify"

3. If the user asks to expand an expression:
   operation = "expand"

4. If the user asks to factorize or factor an expression:
   operation = "factor"

5. If the user asks to differentiate or find a derivative:
   operation = "differentiate"

6. If the user asks to integrate or find an integral:
   operation = "integrate"

For solve_equation, return:
{{
    "operation": "solve_equation",
    "equation": "EXPRESSION = 0",
    "variable": "x"
}}

For all other operations, return:
{{
    "operation": "OPERATION",
    "expression": "SYMPY_COMPATIBLE_EXPRESSION",
    "variable": "x"
}}

Convert mathematical notation into SymPy-compatible Python notation.

Examples:

Question: Solve x^2 + 5*x + 6 = 0
Output:
{{"operation": "solve_equation", "equation": "x**2 + 5*x + 6", "variable": "x"}}

Question: Factor x^2 + 5*x + 6
Output:
{{"operation": "factor", "expression": "x**2 + 5*x + 6", "variable": "x"}}

Question: Simplify 2*x + 3*x
Output:
{{"operation": "simplify", "expression": "2*x + 3*x", "variable": "x"}}

Question: Differentiate x^3 + 2*x
Output:
{{"operation": "differentiate", "expression": "x**3 + 2*x", "variable": "x"}}

Return ONLY valid JSON.
Do not explain your answer.
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
