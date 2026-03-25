from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class Position(BaseModel):
    x: float
    y: float


class NodePayload(BaseModel):
    id: str
    type: str
    position: Position
    data: Dict[str, Any] = Field(default_factory=dict)


class EdgePayload(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelineRequest(BaseModel):
    nodes: List[NodePayload] = Field(default_factory=list)
    edges: List[EdgePayload] = Field(default_factory=list)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelineRequest):
    node_summary = [
        {"id": node.id, "type": node.type, "fields": list(node.data.keys())}
        for node in pipeline.nodes
    ]
    edge_summary = [
        {"id": edge.id, "from": edge.source, "to": edge.target}
        for edge in pipeline.edges
    ]

    return {
        "message": "Pipeline parsed successfully.",
        "counts": {"nodes": len(pipeline.nodes), "edges": len(pipeline.edges)},
        "nodes": node_summary,
        "edges": edge_summary,
    }
