# Claude AI Assistant App

This project is a Claude-like AI assistant application built with:

- **FastAPI** for the backend
- **React** for the frontend
- **OpenAI API integration** for intelligent responses

## Features

- Natural language chat interface
- API endpoints for conversation handling
- Modular frontend and backend for easy deployment
- Ready for deployment on Vercel, Render, or Railway

## Project Structure

```
claude-ai-assistant-app/
├── backend/
│   └── main.py
│   └── requirements.txt
├── frontend/
│   └── package.json
│   └── src/
│       └── App.tsx
│       └── index.tsx
├── .gitignore
└── README.md
```

## Getting Started

### Backend

1. Navigate to the `backend` folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to the `frontend` folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```

## Contributing

Issues and pull requests are welcome! See the starter issues for guidance.

## License

MIT