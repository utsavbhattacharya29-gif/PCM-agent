import sympy as sp
import re


class ChemistrySolver:

    def solve(self, problem):

        operation = problem.get("operation")

        if operation == "calculate":
            return self._calculate(problem)

        if operation == "molar_mass":
            return self._molar_mass(problem)

        if operation == "concentration":
            return self._calculate(problem)

        if operation == "stoichiometry":
            return self._calculate(problem)

        if operation == "balance_reaction":
            return self._balance_reaction(problem)

        if operation == "identify_element":
            return self._identify_element(problem)

        raise ValueError(
            f"Unsupported chemistry operation: {operation}"
        )

    def _calculate(self, problem):

        formula = problem["formula"]
        variables = problem.get("variables", {})
        unknown = problem.get("unknown")

        formula = self._normalize_formula(formula)

        substitutions = {}

        for name, value in variables.items():
            normalized_name = self._normalize_variable(name)

            substitutions[
                sp.Symbol(normalized_name)
            ] = value

        if "=" in formula:

            lhs, rhs = formula.split("=", 1)

            lhs = sp.sympify(lhs.strip())
            rhs = sp.sympify(rhs.strip())

            equation = sp.Eq(lhs, rhs)

            equation = equation.subs(substitutions)

            unknown_symbol = sp.Symbol(
                self._normalize_variable(unknown)
            )

            solutions = sp.solve(
                equation,
                unknown_symbol
            )

            if not solutions:
                raise ValueError(
                    f"Could not solve for {unknown}"
                )

            result = solutions[0]

        else:

            expression = sp.sympify(formula)

            expression = expression.subs(
                substitutions
            )

            unknown_symbol = sp.Symbol(
                self._normalize_variable(unknown)
            )

            if unknown_symbol not in expression.free_symbols:
                result = expression
            else:
                solutions = sp.solve(
                    expression,
                    unknown_symbol
                )

                if not solutions:
                    raise ValueError(
                        f"Could not solve for {unknown}"
                    )

                result = solutions[0]

        if result.is_Integer:
            return int(result)

        if result.is_Float:
            return float(result)

        return result

    def _molar_mass(self, problem):

        formula = problem.get("formula")

        if not formula:
            raise ValueError(
                "Chemical formula is required for molar mass."
            )

        return self._calculate_molar_mass(formula)

    def _calculate_molar_mass(self, formula):

        atomic_masses = {
            "H": 1.008,
            "He": 4.003,
            "Li": 6.94,
            "Be": 9.012,
            "B": 10.81,
            "C": 12.011,
            "N": 14.007,
            "O": 15.999,
            "F": 18.998,
            "Ne": 20.180,
            "Na": 22.990,
            "Mg": 24.305,
            "Al": 26.982,
            "Si": 28.085,
            "P": 30.974,
            "S": 32.06,
            "Cl": 35.45,
            "Ar": 39.948,
            "K": 39.098,
            "Ca": 40.078
        }

        tokens = re.findall(
            r"([A-Z][a-z]?)(\d*)",
            formula
        )

        total = 0.0

        for element, count in tokens:

            if element not in atomic_masses:
                raise ValueError(
                    f"Unknown element: {element}"
                )

            count = int(count) if count else 1

            total += (
                atomic_masses[element] * count
            )

        return total

    def _balance_reaction(self, problem):

        from sympy import Matrix

        reaction = problem.get("reaction")

        if not reaction:
            raise ValueError(
                "Reaction is required."
            )

        reactants, products = reaction.split(
            "->"
        )

        reactants = [
            r.strip()
            for r in reactants.split("+")
        ]

        products = [
            p.strip()
            for p in products.split("+")
        ]

        all_compounds = reactants + products

        elements = set()
        parsed = []

        for compound in all_compounds:

            composition = {}

            for element, count in re.findall(
                r"([A-Z][a-z]?)(\d*)",
                compound
            ):

                count = int(count) if count else 1

                composition[element] = (
                    composition.get(element, 0)
                    + count
                )

                elements.add(element)

            parsed.append(composition)

        elements = list(elements)

        matrix = []

        for element in elements:

            row = []

            for i, composition in enumerate(parsed):

                value = composition.get(
                    element,
                    0
                )

                if i >= len(reactants):
                    value = -value

                row.append(value)

            matrix.append(row)

        nullspace = Matrix(matrix).nullspace()

        if not nullspace:
            raise ValueError(
                "Could not balance reaction."
            )

        vector = nullspace[0]

        lcm = sp.ilcm(
            *[
                term.q
                for term in vector
            ]
        )

        coefficients = [
            int(term * lcm)
            for term in vector
        ]

        from math import gcd
        from functools import reduce

        divisor = reduce(
            gcd,
            coefficients
        )

        coefficients = [
            c // divisor
            for c in coefficients
        ]

        left_coefficients = coefficients[
            :len(reactants)
        ]

        right_coefficients = coefficients[
            len(reactants):
        ]

        left = " + ".join(
            f"{c}{compound}"
            for c, compound in zip(
                left_coefficients,
                reactants
            )
        )

        right = " + ".join(
            f"{c}{compound}"
            for c, compound in zip(
                right_coefficients,
                products
            )
        )

        return f"{left} -> {right}"

    def _identify_element(self, problem):

        atomic_number = problem.get(
            "atomic_number"
        )

        elements = {
            1: "H",
            2: "He",
            3: "Li",
            4: "Be",
            5: "B",
            6: "C",
            7: "N",
            8: "O",
            9: "F",
            10: "Ne",
            11: "Na",
            12: "Mg",
            13: "Al",
            14: "Si",
            15: "P",
            16: "S",
            17: "Cl",
            18: "Ar",
            19: "K",
            20: "Ca"
        }

        return elements.get(
            atomic_number,
            "Unknown"
        )

    def _normalize_variable(self, name):

        replacements = {
            "H+": "H",
            "OH-": "OH",
            "pH": "pH",
            "pOH": "pOH"
        }

        return replacements.get(
            name,
            name
        )

    def _normalize_formula(self, formula):

        formula = formula.replace(
            "H+",
            "H"
        )

        formula = formula.replace(
            "OH-",
            "OH"
        )

        formula = formula.replace(
            "^",
            "**"
        )

        formula = formula.replace(
            "log10",
            "sp.log"
        )

        return formula
