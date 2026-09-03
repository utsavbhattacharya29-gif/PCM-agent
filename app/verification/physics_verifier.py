class PhysicsVerifier:

    def verify(self, problem, result):

        formula = problem["formula"]
        variables = problem["variables"]
        unknown = problem["unknown"]

        try:
            if formula.replace(" ", "") == "F=m*a":
                expected = variables["m"] * variables["a"]

            elif formula.replace(" ", "") == "v=u+a*t":
                expected = variables["u"] + variables["a"] * variables["t"]

            elif formula.replace(" ", "") == "p=m*v":
                expected = variables["m"] * variables["v"]

            elif formula.replace(" ", "") == "KE=0.5*m*v**2":
                expected = 0.5 * variables["m"] * variables["v"] ** 2

            elif formula.replace(" ", "") == "PE=m*g*h":
                expected = variables["m"] * variables["g"] * variables["h"]

            elif formula.replace(" ", "") == "P=W/t":
                expected = variables["W"] / variables["t"]

            elif formula.replace(" ", "") == "P=F/A":
                expected = variables["F"] / variables["A"]

            elif formula.replace(" ", "") == "I=V/R":
                expected = variables["V"] / variables["R"]

            else:
                return {
                    "valid": False,
                    "message": f"Unsupported formula: {formula}"
                }

            valid = abs(float(result) - float(expected)) < 1e-9

            if valid:
                return {
                    "valid": True,
                    "message": "The physics result is correct."
                }

            return {
                "valid": False,
                "message": f"Expected {expected}, but got {result}."
            }

        except Exception as e:
            return {
                "valid": False,
                "message": f"Verification failed: {str(e)}"
            }
