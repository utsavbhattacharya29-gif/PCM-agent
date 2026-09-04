from app.neural.llm import LocalLLM
from app.neural.chemistry_parser import ChemistryParser
from app.retrieval.chemistry_retriever import ChemistryRetriever
from app.symbolic.chemistry_solver import ChemistrySolver
from app.verification.chemistry_verifier import ChemistryVerifier
from app.explanation.chemistry_generator import ChemistryExplanationGenerator


class ChemistryAgent:

    def __init__(self):

        self.llm = LocalLLM()

        self.parser = ChemistryParser(
            self.llm
        )

        self.retriever = ChemistryRetriever()

        self.solver = ChemistrySolver()

        self.verifier = ChemistryVerifier()

        self.explainer = ChemistryExplanationGenerator(
            self.llm
        )

    def solve(self, question):

        problem = self.parser.parse(
            question
        )

        knowledge = self.retriever.search(
            question,
            top_k=3
        )

        result = self.solver.solve(
            problem
        )

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
