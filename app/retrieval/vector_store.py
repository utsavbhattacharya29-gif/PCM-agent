import faiss
import numpy as np


class VectorStore:

    def __init__(self, dimension):
        self.index = faiss.IndexFlatIP(dimension)
        self.documents = []

    def add(self, embeddings, documents):
        embeddings = np.asarray(embeddings).astype("float32")
        self.index.add(embeddings)
        self.documents.extend(documents)

    def search(self, embedding, top_k=3):
        embedding = np.asarray([embedding]).astype("float32")

        scores, indices = self.index.search(embedding, top_k)

        results = []

        for score, index in zip(scores[0], indices[0]):
            if index != -1:
                results.append({
                    "document": self.documents[index],
                    "score": float(score)
                })

        return results
