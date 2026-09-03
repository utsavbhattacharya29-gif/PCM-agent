import sympy as sp


class SymbolicEngine:

    def solve_equation(self, equation, variable):
        lhs, rhs = equation.split("=")

        lhs = sp.sympify(lhs)
        rhs = sp.sympify(rhs)

        symbol = sp.Symbol(variable)

        return sp.solve(sp.Eq(lhs, rhs), symbol)

    def simplify(self, expression):
        return sp.simplify(sp.sympify(expression))

    def expand(self, expression):
        return sp.expand(sp.sympify(expression))

    def factor(self, expression):
        return sp.factor(sp.sympify(expression))

    def differentiate(self, expression, variable):
        expression = sp.sympify(expression)
        symbol = sp.Symbol(variable)

        return sp.diff(expression, symbol)

    def integrate(self, expression, variable):
        expression = sp.sympify(expression)
        symbol = sp.Symbol(variable)

        return sp.integrate(expression, symbol)
