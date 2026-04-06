"""
Plastic Reuse Engine — FastAPI application entry point.

The frontend is served as static files from /app so you can open
http://127.0.0.1:8000/app in any browser without file:// CORS issues.
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.api.routes_analysis import router
from app.core.config import APP_DESCRIPTION, APP_NAME, APP_VERSION, CORS_ORIGINS

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend")

app = FastAPI(
    title=APP_NAME,
    description=APP_DESCRIPTION,
    version=APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="")

# Serve the frontend at /app — avoids file:// CORS restrictions
if os.path.isdir(FRONTEND_DIR):
    app.mount("/app", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")


@app.get("/", tags=["System"])
async def root():
    return {
        "service": APP_NAME,
        "version": APP_VERSION,
        "ui": "http://127.0.0.1:8000/app",
        "docs": "/docs",
        "health": "/health",
    }
