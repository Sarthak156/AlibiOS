from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.gemini import generate_excuse
from services.pdf import create_report
from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "ALIBI OS ACTIVE"}

@app.post("/generate")
async def generate(data: dict):

    result = generate_excuse(data)

    return {
        "result": result
    }

@app.post("/report")
async def report(data: dict):

    file = create_report(data)

    return FileResponse(
        file,
        media_type='application/pdf',
        filename=file
    )