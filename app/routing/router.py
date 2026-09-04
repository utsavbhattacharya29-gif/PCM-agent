from app.neural.llm import LocalLLM
from app.agents.math_agent import MathAgent
from app.agents.physics_agent import PhysicsAgent
from app.agents.chemistry_agent import ChemistryAgent


class Router:

    def __init__(self):
        self.llm = LocalLLM()

        self.math_agent = MathAgent(self.llm)
        self.physics_agent = PhysicsAgent(self.llm)
        self.chemistry_agent = ChemistryAgent(self.llm)

    def classify(self, question):

        prompt = f"""
Classify the following question into exactly one category:

math
physics
chemistry

Question:
{question}

Return only one word: math, physics, or chemistry.
"""

        category = self.llm.generate(prompt).strip().lower()

        if "math" in category:
            return "math"

        if "physics" in category:
            return "physics"

        if "chemistry" in category:
            return "chemistry"

        raise ValueError(
            f"Could not classify question: {question}"
        )

    def solve(self, question):

        subject = self.classify(question)

        if subject == "math":
            result = self.math_agent.solve(question)

        elif subject == "physics":
            result = self.physics_agent.solve(question)

        elif subject == "chemistry":
            result = self.chemistry_agent.solve(question)

        else:
            raise ValueError(
                f"Unsupported subject: {subject}"
            )

        return {
            "subject": subject,
            "question": question,
            "result": result
        }
