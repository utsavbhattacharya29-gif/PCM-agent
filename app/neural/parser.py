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

        operation = self._extract_json(response)["operation"].strip().lower()

        if operation == "solve_equation":
            return self._parse_equation(question)

        expression = self._extract_expression(
            question,
            operation
        )

        return {
            "operation": operation,
            "expression": expression,
            "variable": self._detect_variable(expression)
        }

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
            r"(.+?)\s*=\s*(.+)",
            text
        )

        if not match:
            raise ValueError(
                "Could not find an equation containing '='."
            )

        left = match.group(1).strip()
        right = match.group(2).strip()

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

        operation_patterns = {
            "simplify": r"^\s*simplify\s+(.+?)\s*$",

            "expand": r"^\s*expand\s+(.+?)\s*$",

            "factor": r"^\s*factor(?:ize|ise)?\s+(.+?)\s*$",

            "differentiate": r"^\s*differentiate\s+(.+?)\s*$",

            "integrate": r"^\s*integrate\s+(.+?)\s*$"
        }

        pattern = operation_patterns.get(operation)

        if pattern:

            match = re.search(
                pattern,
                text,
                flags=re.IGNORECASE
            )

            if match:
                return self._convert_expression(
                    match.group(1)
                )

        # Additional natural-language forms

        alternative_patterns = {
            "factor": [
                r"factor(?:ize|ise)?\s+(?:the\s+)?(.+)",
                r"find\s+the\s+factors\s+of\s+(.+)"
            ],

            "differentiate": [
                r"find\s+the\s+derivative\s+of\s+(.+)",
                r"derivative\s+of\s+(.+)"
            ],

            "integrate": [
                r"find\s+the\s+integral\s+of\s+(.+)",
                r"integral\s+of\s+(.+)"
            ],

            "simplify": [
                r"simplify\s+(?:the\s+)?(.+)"
            ],

            "expand": [
                r"expand\s+(?:the\s+)?(.+)"
            ]
        }

        for pattern in alternative_patterns.get(
            operation,
            []
        ):

            match = re.search(
                pattern,
                text,
                flags=re.IGNORECASE
            )

            if match:
                return self._convert_expression(
                    match.group(1)
                )

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
