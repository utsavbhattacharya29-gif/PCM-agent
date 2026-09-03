class PhysicsSolver:

    def solve(self, problem):

        formula = problem["formula"]
        variables = problem["variables"]
        unknown = problem["unknown"]

        if formula.replace(" ", "") == "F=m*a":
            return variables["m"] * variables["a"]

        if formula.replace(" ", "") == "v=u+a*t":
            return variables["u"] + variables["a"] * variables["t"]

        if formula.replace(" ", "") == "p=m*v":
            return variables["m"] * variables["v"]

        if formula.replace(" ", "") == "KE=0.5*m*v**2":
            return 0.5 * variables["m"] * variables["v"] ** 2

        if formula.replace(" ", "") == "PE=m*g*h":
            return variables["m"] * variables["g"] * variables["h"]

        if formula.replace(" ", "") == "P=W/t":
            return variables["W"] / variables["t"]

        if formula.replace(" ", "") == "P=F/A":
            return variables["F"] / variables["A"]

        if formula.replace(" ", "") == "I=V/R":
            return variables["V"] / variables["R"]

        raise ValueError(f"Unsupported physics formula: {formula}")
