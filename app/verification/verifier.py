import sympy as sp


class VerificationResult:

    def __init__(self, valid, message):
        self.valid = valid
        self.message = message

    def to_dict(self):
        return {
            "valid": self.valid,
            "message": self.message
        }


class MathVerifier:

    def verify(self, problem, result):

        operation = problem["operation"]

        if operation == "solve_equation":
            return self._verify_equation(
                problem["equation"],
                problem["variable"],
                result
            )

        if operation == "simplify":
            return self._verify_equivalence(
                problem["expression"],
                result
            )

        if operation == "expand":
            return self._verify_equivalence(
                problem["expression"],
                result
            )

        if operation == "factor":
            return self._verify_equivalence(
                problem["expression"],
                result
            )

        if operation == "differentiate":
            return self._verify_derivative(
                problem["expression"],
                problem["variable"],
                result
            )

        if operation == "integrate":
            return self._verify_integral(
                problem["expression"],
                problem["variable"],
                result
            )

        return VerificationResult(
            False,
            f"Unsupported operation: {operation}"
        )

    def _verify_equation(self, equation, variable, result):

        lhs, rhs = equation.split("=")

        symbol = sp.Symbol(variable)

        lhs = sp.sympify(lhs.strip())
        rhs = sp.sympify(rhs.strip())

        equation_expr = lhs - rhs

        for solution in result:

            solution_value = sp.sympify(solution)

            check = sp.simplify(
                equation_expr.subs(symbol, solution_value)
            )

            if check != 0:
                return VerificationResult(
                    False,
                    f"Solution {solution} does not satisfy the equation."
                )

        return VerificationResult(
            True,
            "All returned solutions satisfy the equation."
        )

    def _verify_equivalence(self, expression, result):

        original = sp.sympify(expression)
        calculated = sp.sympify(result)

        difference = sp.simplify(
            original - calculated
        )

        if difference == 0:
            return VerificationResult(
                True,
                "The result is mathematically equivalent to the original expression."
            )

        return VerificationResult(
            False,
            "The returned result is not mathematically equivalent to the original expression."
        )

    def _verify_derivative(self, expression, variable, result):

        symbol = sp.Symbol(variable)

        expected = sp.diff(
            sp.sympify(expression),
            symbol
        )

        calculated = sp.sympify(result)

        if sp.simplify(expected - calculated) == 0:
            return VerificationResult(
                True,
                "The derivative is correct."
            )

        return VerificationResult(
            False,
            "The derivative is incorrect."
        )

    def _verify_integral(self, expression, variable, result):

        symbol = sp.Symbol(variable)

        expected = sp.integrate(
            sp.sympify(expression),
            symbol
        )

        calculated = sp.sympify(result)

        difference = sp.diff(
            calculated - expected,
            symbol
        )

        if sp.simplify(difference) == 0:
            return VerificationResult(
                True,
                "The integral is correct up to an additive constant."
            )

        return VerificationResult(
            False,
            "The integral is incorrect."
        )
