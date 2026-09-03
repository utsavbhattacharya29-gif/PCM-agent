from app.neural.llm import LocalLLM
from app.neural.parser import MathParser
from app.retrieval.retriever import MathRetriever
from app.symbolic.solver import MathSolver
from app.verification.verifier import MathVerifier
from app.verification.validators import validate_problem


class MathAgent:

    def __init__(self):
        self.llm = LocalLLM()
        self.parser = MathParser(self.llm)
        self.retriever = MathRetriever()
        self.solver = MathSolver()
        self.verifier = MathVerifier()

    def solve(self, question):

        problem = self.parser.parse(question)

        validate_problem(problem)

        knowledge = self.retriever.search(
            question,
            top_k=3
        )

        result = self.solver.solve(problem)

        verification = self.verifier.verify(
            problem,
            result
        )

        return {
            "question": question,
            "problem": problem,
            "retrieved_knowledge": knowledge,
            "result": result,
            "verification": verification.to_dict()
        }
