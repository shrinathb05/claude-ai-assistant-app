from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import google.generativeai as genai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini with API key
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
        model = genai.GenerativeModel("gemini-pro")  # use "gemini-1.5-pro" if enabled
        response = model.generate_content(prompt)

        # Extract response text
        return {"response": response.text}
    except Exception as e:
        return {"error": str(e)}
