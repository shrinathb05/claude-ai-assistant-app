from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import openai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Claude AI Assistant backend is running!"}

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    prompt = data.get("prompt", "")
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        return {"error": "OpenAI API key not set."}
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
            temperature=0.7
        )
        answer = response.choices[0].message["content"]
        return {"response": answer}
    except Exception as e:
        return {"error": str(e)}