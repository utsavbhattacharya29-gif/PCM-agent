from app.data.loader import DatasetLoader


loader = DatasetLoader()

data = loader.load_math_datasets()

print("Formulas:", len(data["formulas"]))
print("Rules:", len(data["rules"]))
print("Examples:", len(data["examples"]))
print("Concepts:", len(data["concepts"]))
