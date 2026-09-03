class ExplanationGenerator:

    def __init__(self, llm):
        self.llm = llm

    def generate(self, question, problem, result, knowledge, verification):

        knowledge_text = "\n".join(
            item["document"]
            for item in knowledge
        )

        prompt = f"""
You are a mathematics tutor.

Explain the solution to the student's question clearly and step by step.

Student Question:
{question}

Parsed Problem:
{problem}

Verified Result:
{result}

Verification:
{verification}

Relevant Mathematical Knowledge:
{knowledge_text}

Instructions:

1. Explain the mathematical method used.
2. Show the important intermediate steps.
3. Use correct mathematical notation.
4. Keep the explanation appropriate for a secondary-school PCM student.
5. Do not invent calculations.
6. Use the verified result as the final answer.
7. End with a clear final answer.

Return only the explanation.
"""

        return self.llm.generate(prompt)
