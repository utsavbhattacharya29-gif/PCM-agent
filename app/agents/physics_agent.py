from app.neural.llm import LocalLLM
from app.neural.physics_parser import PhysicsParser
from app.retrieval.physics_retriever import PhysicsRetriever
from app.symbolic.physics_solver import PhysicsSolver


class PhysicsAgent:

    def __init__(self):
        self.llm = LocalLLM()
        self.parser = PhysicsParser(self.llm)
        self.retriever = PhysicsRetriever()
        self.solver = PhysicsSolver()

    def solve(self, question):

        problem = self.parser.parse(question)

        knowledge = self.retriever.search(
            question,
            top_k=3
        )

        result = self.solver.solve(problem)

        return {
            "question": question,
            "problem": problem,
            "retrieved_knowledge": knowledge,
            "result": result
        }
