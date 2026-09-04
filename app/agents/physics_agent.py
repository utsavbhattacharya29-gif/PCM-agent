from app.neural.llm import LocalLLM
from app.neural.physics_parser import PhysicsParser
from app.retrieval.physics_retriever import PhysicsRetriever
from app.symbolic.physics_solver import PhysicsSolver
from app.verification.physics_verifier import PhysicsVerifier
from app.explanation.physics_generator import PhysicsExplanationGenerator


class PhysicsAgent:

    def __init__(self, llm=None):
        self.llm = llm if llm is not None else LocalLLM()
        self.parser = PhysicsParser(self.llm)
        self.retriever = PhysicsRetriever()
        self.solver = PhysicsSolver()
        self.verifier = PhysicsVerifier()
        self.explainer = PhysicsExplanationGenerator()

    def solve(self, question):

        problem = self.parser.parse(question)

        knowledge = self.retriever.search(
            question,
            top_k=3
        )

        result = self.solver.solve(problem)

        verification = self.verifier.verify(
            problem,
            result
        )

        explanation = self.explainer.generate(
            question,
            problem,
            result,
            verification
        )

        return {
            "question": question,
            "problem": problem,
            "retrieved_knowledge": knowledge,
            "result": result,
            "verification": verification,
            "explanation": explanation
        }
