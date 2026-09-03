from app.neural.llm import LocalLLM


class PhysicsExplanationGenerator:

    def __init__(self):
        self.llm = LocalLLM()

    def generate(self, question, problem, result, verification):

        prompt = f"""
Explain the following physics problem clearly and step by step.

Question:
{question}

Parsed Problem:
{problem}

Calculated Result:
{result}

Verification:
{verification}

Explain:
1. The physical principle or formula used.
2. What each variable represents.
3. Substitute the given values.
4. Perform the calculation.
5. State the final answer with the appropriate unit.

Keep the explanation concise and suitable for a student.

Do not invent values or formulas.
"""

        return self.llm.generate(prompt)
