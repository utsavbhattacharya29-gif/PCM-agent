from app.symbolic.engine import SymbolicEngine

engine = SymbolicEngine()

tests = [
    ("solve_equation", engine.solve_equation, "x**2 + 5*x + 6 = 0", "x"),
    ("simplify", engine.simplify, "2*x + 3*x + 5"),
    ("expand", engine.expand, "(x + 2)*(x + 3)"),
    ("factor", engine.factor, "x**2 + 5*x + 6"),
    ("differentiate", engine.differentiate, "x**3 + 2*x", "x"),
    ("integrate", engine.integrate, "x**2", "x")
]

for name, function, *args in tests:
    result = function(*args)
    print(name, "->", result)
