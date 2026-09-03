from app.symbolic.solver import MathSolver


solver = MathSolver()

problem = {
    "operation": "solve_equation",
    "equation": "2*x + 5 = 15",
    "variable": "x"
}

result = solver.solve(problem)

print(result)
