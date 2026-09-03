from .engine import SymbolicEngine


class MathSolver:

    def __init__(self):
        self.engine = SymbolicEngine()

    def solve(self, problem):
        operation = problem["operation"]

        if operation == "solve_equation":
            return self.engine.solve_equation(
                problem["equation"],
                problem["variable"]
            )

        if operation == "simplify":
            return self.engine.simplify(
                problem["expression"]
            )

        if operation == "expand":
            return self.engine.expand(
                problem["expression"]
            )

        if operation == "factor":
            return self.engine.factor(
                problem["expression"]
            )

        raise ValueError(f"Unknown operation: {operation}")
