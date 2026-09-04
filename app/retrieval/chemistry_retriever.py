from app.data.loader import DatasetLoader
from app.retrieval.embeddings import EmbeddingModel
from app.retrieval.vector_store import VectorStore


class ChemistryRetriever:

    def __init__(self):

        loader = DatasetLoader()
        data = loader.load_chemistry_datasets()

        self.documents = []

        for formula in data["formulas"]:
            self.documents.append(str(formula))

        for rule in data["reaction_rules"]:
            self.documents.append(str(rule))

        for example in data["examples"]:
            self.documents.append(str(example))

        for element in data["periodic_table"]:
            self.documents.append(str(element))

        self.documents.append(data["concepts"])

        self.embedding_model = EmbeddingModel()

        embeddings = self.embedding_model.encode(
            self.documents
        )

        self.vector_store = VectorStore(
            embeddings.shape[1]
        )

        self.vector_store.add(
            embeddings,
            self.documents
        )

    def search(self, query, top_k=3):

        query_embedding = self.embedding_model.encode(
            [query]
        )[0]

        return self.vector_store.search(
            query_embedding,
            top_k
        )
