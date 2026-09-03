from app.symbolic.solver import MathSolver

solver = MathSolver()

tests = [
    {
        "operation": "solve_equation",
        "equation": "x**2 + 5*x + 6 = 0",
        "variable": "x"
    },
    {
        "operation": "simplify",
        "expression": "2*x + 3*x + 5"
    },
    {
        "operation": "expand",
        "expression": "(x + 2)*(x + 3)"
    },
    {
        "operation": "factor",
        "expression": "x**2 + 5*x + 6"
    },
    {
        "operation": "differentiate",
        "expression": "x**3 + 2*x",
        "variable": "x"
    },
    {
        "operation": "integrate",
        "expression": "x**2",
        "variable": "x"
    }
]

for problem in tests:
    result = solver.solve(problem)
    print(problem["operation"], "->", result)
