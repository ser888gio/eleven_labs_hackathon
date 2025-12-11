from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for bios
# In a real app, use a database (Redis, Postgres, etc.)
bios = {}

class BioUpdate(BaseModel):
    bio: str
    session_id: Optional[str] = "default"

@app.get("/")
def read_root():
    return {"message": "ElevenLabs Hackathon Backend is running"}

@app.post("/")
@app.post("/webhook/bio")
def receive_bio(data: BioUpdate):
    """
    Endpoint for n8n to send the generated bio.
    """
    print(f"Received bio for session {data.session_id}: {data.bio[:50]}...")
    bios[data.session_id] = data.bio
    return {"status": "success", "message": "Bio received"}

@app.get("/bio/{session_id}")
def get_bio(session_id: str):
    """
    Endpoint for frontend to poll for the bio.
    """
    bio = bios.get(session_id)
    if not bio:
        return {"status": "pending", "bio": None}
    return {"status": "complete", "bio": bio}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
