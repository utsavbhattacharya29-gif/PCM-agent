from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.routing.router import Router


app = FastAPI(
    title="PCM Agent API",
    description="Mathematics, Physics and Chemistry AI Agent",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


router = Router()


class SolveRequest(BaseModel):
    question: str


@app.get("/")
def root():
    return {
        "status": "online",
        "message": "PCM Agent API is running"
    }


@app.post("/solve")
def solve(request: SolveRequest):
    result = router.solve(request.question)
    return result
