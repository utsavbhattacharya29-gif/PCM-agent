from app.agents.math_agent import MathAgent


agent = MathAgent()

question = "Simplify 2*x + 3*x + 5"

result = agent.solve(question)

print("Question:")
print(result["question"])

print("\nParsed Problem:")
print(result["problem"])

print("\nRetrieved Knowledge:")
for item in result["retrieved_knowledge"]:
    print(item)

print("\nSymbolic Result:")
print(result["result"])

print("\nVerification:")
print(result["verification"])

print("\nExplanation:")
print(result["explanation"])
