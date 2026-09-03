import re
import json


class MathParser:

    def __init__(self, llm):
        self.llm = llm

    def parse(self, question):

        response = self.llm.generate(
            f"""
You are a mathematical problem parser.

Convert the following question into JSON.

Allowed operations:
- solve_equation
- simplify
- expand
- factor
- differentiate
- integrate

JSON format:

{{
    "operation": "...",
    "expression": "...",
    "variable": "x"
}}

For solve_equation, use the key "equation" instead of "expression".

Question:
{question}
"""
        )

        problem = self._parse_llm_response(response)

        operation = problem.get("operation")

        if operation == "solve_equation":
            equation = problem.get("equation")

            if not equation:
                equation = self._extract_expression(
                    question,
                    operation
                )

            variable = problem.get("variable", "x")

            if "=" not in equation:
                equation = equation + " = 0"

            return {
                "operation": operation,
                "equation": equation.strip(),
                "variable": variable
            }

        expression = problem.get("expression")

        if not expression:
            expression = self._extract_expression(
                question,
                operation
            )

        variable = problem.get("variable", "x")

        return {
            "operation": operation,
            "expression": expression.strip(),
            "variable": variable
        }

    def _parse_llm_response(self, response):

        if isinstance(response, dict):
            return response

        text = str(response).strip()

        text = re.sub(
            r"```json\s*",
            "",
            text,
            flags=re.IGNORECASE
        )

        text = re.sub(
            r"```\s*",
            "",
            text
        )

        match = re.search(
            r"\{.*\}",
            text,
            re.DOTALL
        )

        if match:
            try:
                return json.loads(match.group(0))
            except json.JSONDecodeError:
                pass

        operation_match = re.search(
            r'"operation"\s*:\s*"([^"]+)"',
            text
        )

        expression_match = re.search(
            r'"expression"\s*:\s*"([^"]+)"',
            text
        )

        equation_match = re.search(
            r'"equation"\s*:\s*"([^"]+)"',
            text
        )

        variable_match = re.search(
            r'"variable"\s*:\s*"([^"]+)"',
            text
        )

        result = {}

        if operation_match:
            result["operation"] = operation_match.group(1)

        if expression_match:
            result["expression"] = expression_match.group(1)

        if equation_match:
            result["equation"] = equation_match.group(1)

        if variable_match:
            result["variable"] = variable_match.group(1)

        if result:
            return result

        raise ValueError(
            "Could not parse LLM response into a mathematical problem."
        )

    def _extract_expression(self, question, operation):

        text = question.strip()

        if operation == "solve_equation":

            match = re.search(
                r"(?:solve|find\s+the\s+roots?\s+of|find\s+roots?\s+of)\s+(.+)",
                text,
                re.IGNORECASE
            )

            if match:
                expression = match.group(1).strip()

                if "=" not in expression:
                    expression = expression + " = 0"

                return expression

        if operation == "simplify":

            match = re.search(
                r"(?:simplify)\s+(.+)",
                text,
                re.IGNORECASE
            )

            if match:
                return match.group(1).strip()

        if operation == "expand":

            match = re.search(
                r"(?:expand)\s+(.+)",
                text,
                re.IGNORECASE
            )

            if match:
                return match.group(1).strip()

        if operation == "factor":

            match = re.search(
                r"(?:factor|factorize|factorise)\s+(.+)",
                text,
                re.IGNORECASE
            )

            if match:
                return match.group(1).strip()

        if operation == "differentiate":

            match = re.search(
                r"(?:differentiate|derivative\s+of|differentiate\s+the)\s+(.+)",
                text,
                re.IGNORECASE
            )

            if match:
                return match.group(1).strip()

        if operation == "integrate":

            match = re.search(
                r"(?:integrate|integral\s+of|find\s+the\s+integral\s+of)\s+(.+)",
                text,
                re.IGNORECASE
            )

            if match:
                return match.group(1).strip()

        raise ValueError(
            f"Could not extract expression for operation: {operation}"
        )
