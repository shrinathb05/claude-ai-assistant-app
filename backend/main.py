from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # in production, replace "*" with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini with API key (stored in backend only)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.get("/")
def read_root():
    return {"message": "Claude/Gemini AI Assistant backend is running!"}

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")

    if not prompt:
        return {"error": "Prompt is required."}

    try:
        model = genai.GenerativeModel("gemini-1.5-flash")  # ✅ Updated model
        response = model.generate_content(prompt)

        return {"response": response.text}
    except Exception as e:
        return {"error": str(e)}
