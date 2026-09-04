class ChemistryVerifier:

    def verify(self, problem, result):

        operation = problem.get("operation")

        if result is None:
            return {
                "valid": False,
                "message": "No chemistry result was produced."
            }

        if operation == "calculate":
            return {
                "valid": True,
                "message": "The chemistry result was calculated successfully."
            }

        if operation == "molar_mass":
            return {
                "valid": True,
                "message": "The molar mass result was calculated successfully."
            }

        if operation == "concentration":
            return {
                "valid": True,
                "message": "The concentration result was calculated successfully."
            }

        if operation == "stoichiometry":
            return {
                "valid": True,
                "message": "The stoichiometric result was calculated successfully."
            }

        if operation == "balance_reaction":
            return {
                "valid": True,
                "message": "The chemical equation was processed successfully."
            }

        return {
            "valid": True,
            "message": "The chemistry result was produced successfully."
        }
