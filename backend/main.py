import os
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from r2 import r2_get, r2_put

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://receitas-francamatheus.netlify.app",
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:5500",
    ],
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["*"],
)

DATA_KEY = "data.json"


def _check_api_key(x_api_key: str | None):
    if x_api_key != os.environ["API_KEY"]:
        raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/data")
def get_data():
    data = r2_get(DATA_KEY)
    if data is None:
        return {"categories": [], "recipes": []}
    return data


@app.put("/data")
def put_data(payload: dict, x_api_key: str | None = Header(None)):
    _check_api_key(x_api_key)
    r2_put(DATA_KEY, payload)
    return {"ok": True}
