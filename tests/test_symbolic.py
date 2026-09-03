from app.symbolic.solver import MathSolver


solver = MathSolver()


problems = [

    {
        "operation": "solve_equation",
        "equation": "2*x + 5 = 15",
        "variable": "x"
    },

    {
        "operation": "simplify",
        "expression": "(x + 2) + (x + 3)"
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
        "expression": "3*x**2",
        "variable": "x"
    }
]


for problem in problems:
    result = solver.solve(problem)
    print(problem["operation"], "->", result)
