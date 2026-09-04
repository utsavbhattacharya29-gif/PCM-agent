class ChemistryExplanationGenerator:

    def __init__(self, llm=None):

        self.llm = llm

    def generate(
        self,
        question,
        problem,
        result,
        verification
    ):

        if self.llm is None:
            return {
                "explanation":
                f"The chemistry problem was solved using "
                f"the parsed chemical relationship.\n\n"
                f"Given problem: {question}\n"
                f"Result: {result}"
            }

        prompt = f"""
Explain the following chemistry problem step by step.

Question:
{question}

Parsed Problem:
{problem}

Result:
{result}

Verification:
{verification}

Give a clear educational explanation.

Include:
1. The chemistry principle or formula used.
2. The meaning of the given quantities.
3. Substitution of the values.
4. Calculation or reasoning.
5. Final answer.

Return ONLY the explanation text.
"""

        response = self.llm.generate(prompt)

        if hasattr(response, "text"):
            response = response.text

        return {
            "explanation": response.strip()
        }
