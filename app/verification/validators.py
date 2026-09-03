class ValidationError(Exception):
    pass


def validate_problem(problem):

    if not isinstance(problem, dict):
        raise ValidationError("Problem must be a dictionary.")

    if "operation" not in problem:
        raise ValidationError("Missing operation.")

    operation = problem["operation"]

    valid_operations = {
        "solve_equation",
        "simplify",
        "expand",
        "factor",
        "differentiate",
        "integrate"
    }

    if operation not in valid_operations:
        raise ValidationError(
            f"Unsupported operation: {operation}"
        )

    if operation == "solve_equation":

        if "equation" not in problem:
            raise ValidationError(
                "Missing equation."
            )

        if "variable" not in problem:
            raise ValidationError(
                "Missing variable."
            )

    else:

        if "expression" not in problem:
            raise ValidationError(
                "Missing expression."
            )

        if operation in {
            "differentiate",
            "integrate"
        } and "variable" not in problem:
            raise ValidationError(
                "Missing variable."
            )

    return True
