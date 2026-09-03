from app.retrieval.retriever import MathRetriever


retriever = MathRetriever()

query = "Find the roots of x^2 + 5x + 6 = 0"

results = retriever.search(query, top_k=3)

for result in results:
    print("Score:", result["score"])
    print("Document:", result["document"])
    print()
