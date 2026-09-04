from app.neural.llm import LocalLLM
from app.neural.parser import MathParser
from app.retrieval.retriever import MathRetriever
from app.symbolic.solver import MathSolver
from app.verification.verifier import MathVerifier
from app.verification.validators import validate_problem
from app.explanation.generator import ExplanationGenerator


class MathAgent:

    def __init__(self, llm=None):
        self.llm = llm if llm is not None else LocalLLM()
        self.parser = MathParser(self.llm)
        self.retriever = MathRetriever()
        self.solver = MathSolver()
        self.verifier = MathVerifier()
        self.explainer = ExplanationGenerator(self.llm)

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

        explanation = self.explainer.generate(
            question,
            problem,
            result,
            knowledge,
            verification.to_dict()
        )

        return {
            "question": question,
            "problem": problem,
            "retrieved_knowledge": knowledge,
            "result": result,
            "verification": verification.to_dict(),
            "explanation": explanation
        }
