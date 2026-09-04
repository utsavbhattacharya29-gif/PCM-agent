from app.agents.math_agent import MathAgent
from app.agents.physics_agent import PhysicsAgent
from app.agents.chemistry_agent import ChemistryAgent


class Router:

    def __init__(self):
        self.math_agent = MathAgent()
        self.physics_agent = PhysicsAgent()
        self.chemistry_agent = ChemistryAgent()

    def classify(self, question):

        q = question.lower()

        physics_keywords = [
            "force", "mass", "acceleration", "velocity",
            "speed", "momentum", "gravity", "gravitational",
            "kinetic energy", "potential energy", "work",
            "power", "displacement", "newton", "joule",
            "watt", "m/s", "m/s^2", "kg", "friction",
            "pressure", "density", "voltage", "current",
            "resistance", "frequency", "wavelength"
        ]

        chemistry_keywords = [
            "mole", "moles", "molar", "molarity",
            "molality", "molar mass", "element",
            "atomic number", "atomic mass", "compound",
            "chemical", "reaction", "reactant", "product",
            "periodic table", "acid", "base",
            "concentration", "stoichiometry", "oxidation",
            "reduction", "electron", "proton", "neutron",
            "h2o", "co2", "nacl"
        ]

        for keyword in physics_keywords:
            if keyword in q:
                return "physics"

        for keyword in chemistry_keywords:
            if keyword in q:
                return "chemistry"

        return "math"

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
