from app.verification.verifier import MathVerifier


verifier = MathVerifier()

problem = {
    "operation": "solve_equation",
    "equation": "x**2 + 5*x + 6 = 0",
    "variable": "x"
}

result = [-3, -2]

verification = verifier.verify(
    problem,
    result
)

print(verification.to_dict())
