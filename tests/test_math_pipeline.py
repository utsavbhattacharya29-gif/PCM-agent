from app.neural.llm import LocalLLM
from app.neural.parser import MathParser
from app.symbolic.solver import MathSolver


llm = LocalLLM()
parser = MathParser(llm)
solver = MathSolver()

question = "Find the roots of x^2 + 5*x + 6 = 0"

problem = parser.parse(question)

print("Parsed Problem:")
print(problem)

result = solver.solve(problem)

print("\nSymbolic Result:")
print(result)
