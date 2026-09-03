from app.neural.llm import LocalLLM
from app.neural.parser import MathParser
from app.retrieval.retriever import MathRetriever
from app.symbolic.solver import MathSolver


class MathAgent:

    def __init__(self):
        self.llm = LocalLLM()
        self.parser = MathParser(self.llm)
        self.retriever = MathRetriever()
        self.solver = MathSolver()

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
