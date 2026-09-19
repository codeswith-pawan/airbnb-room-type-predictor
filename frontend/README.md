# Airbnb AI Predictor — Frontend

A React + TypeScript + Tailwind dashboard for the Airbnb `room_type` FastAPI model.

## Setup

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default. The API base URL is read from
`.env` (`VITE_API_URL`), already set to `http://127.0.0.1:8000`.

## Backend CORS

Since the frontend (port 5173) and FastAPI (port 8000) run on different origins,
add CORS middleware to your FastAPI app so the browser will accept the response:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Without this, the "Predict Room Type" request will fail in the browser even
though the API itself works fine (e.g. via `curl` or the FastAPI docs UI).

## Project structure

```
src/
  api/predictRoomType.ts    # fetch() call to POST /predict + health check
  hooks/useApiStatus.ts     # polls the backend for the header's status dot
  utils/validation.ts       # field validation + payload shaping
  types/property.ts         # shared form/request/response types
  components/               # Header, PropertyForm, PredictionCard, HowItWorks, Footer
  App.tsx                   # page layout + state wiring
```

## Build

```bash
npm run build
npm run preview
```
