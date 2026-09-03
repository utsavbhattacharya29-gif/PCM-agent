import json
import re


class MathParser:

    def __init__(self, llm):
        self.llm = llm

    def parse(self, question):

        prompt = f"""
Determine the mathematical operation requested in this question.

Question:
{question}

Choose exactly one:

solve_equation
simplify
expand
factor
differentiate
integrate

Return ONLY valid JSON in this format:

{{"operation": "operation_name"}}
"""

        response = self.llm.generate(prompt)

        operation = self._extract_json(response)["operation"]

        if operation == "solve_equation":
            return self._parse_equation(question)

        expression = self._extract_expression(question, operation)

        result = {
            "operation": operation,
            "expression": expression
        }

        if operation in {"differentiate", "integrate"}:
            result["variable"] = self._detect_variable(expression)

        else:
            result["variable"] = self._detect_variable(expression)

        return result

    def _parse_equation(self, question):

        equation = self._extract_equation(question)

        variable = self._detect_variable(equation)

        return {
            "operation": "solve_equation",
            "equation": equation,
            "variable": variable
        }

    def _extract_equation(self, question):

        text = question.strip()

        match = re.search(
            r"(.+?)(?:=)(.+)",
            text
        )

        if not match:
            raise ValueError(
                "Could not find an equation containing '='."
            )

        left = match.group(1)
        right = match.group(2)

        left = re.sub(
            r"^(.*?)(solve|find the roots of|find roots of|solve for|determine)\s+",
            "",
            left,
            flags=re.IGNORECASE
        )

        left = self._convert_expression(left)

        right = self._convert_expression(right)

        return f"{left} = {right}"

    def _extract_expression(self, question, operation):

        text = question.strip()

        patterns = {
            "simplify": [
                r"simplify\s+(.+)",
            ],
            "expand": [
                r"expand\s+(.+)",
            ],
            "factor": [
                r"factor(?:ize|ise)?\s+(.+)",
            ],
            "differentiate": [
                r"differentiate\s+(.+)",
                r"derivative\s+of\s+(.+)",
            ],
            "integrate": [
                r"integrate\s+(.+)",
                r"integral\s+of\s+(.+)",
            ]
        }

        for pattern in patterns.get(operation, []):
            match = re.search(
                pattern,
                text,
                flags=re.IGNORECASE
            )

            if match:
                expression = match.group(1).strip()
                return self._convert_expression(expression)

        raise ValueError(
            f"Could not extract expression for operation: {operation}"
        )

    def _convert_expression(self, expression):

        expression = expression.strip()

        expression = expression.replace("^", "**")

        expression = expression.replace("×", "*")

        expression = expression.replace("÷", "/")

        expression = re.sub(
            r"\s+",
            " ",
            expression
        )

        return expression

    def _detect_variable(self, expression):

        variables = re.findall(
            r"\b[a-zA-Z]\b",
            expression
        )

        ignored = {
            "e",
            "E"
        }

        variables = [
            variable
            for variable in variables
            if variable not in ignored
        ]

        if variables:
            return variables[0]

        return "x"

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
