from app.neural.llm import LocalLLM
from app.neural.parser import MathParser


llm = LocalLLM()

parser = MathParser(llm)

question = "Find the roots of x^2 + 5x + 6 = 0"

result = parser.parse(question)

print(result)
