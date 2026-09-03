import json
import csv
from pathlib import Path


class DatasetLoader:

    def __init__(self, dataset_root="datasets"):
        self.dataset_root = Path(dataset_root)

    def load_json(self, file_path):
        path = self.dataset_root / file_path

        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)

    def load_csv(self, file_path):
        path = self.dataset_root / file_path

        with open(path, "r", encoding="utf-8") as file:
            return list(csv.DictReader(file))

    def load_txt(self, file_path):
        path = self.dataset_root / file_path

        with open(path, "r", encoding="utf-8") as file:
            return file.read()

    def load_math_datasets(self):
        return {
            "formulas": self.load_json("math/math_formulas.json"),
            "rules": self.load_json("math/math_rules.json"),
            "patterns": self.load_json("math/problem_patterns.json"),
            "procedures": self.load_json("math/solution_procedures.json"),
            "examples": self.load_csv("math/math_examples.csv"),
            "concepts": self.load_txt("math/math_concepts.txt")
    }
