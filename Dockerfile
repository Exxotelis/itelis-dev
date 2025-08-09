# ---------- Build frontend (React/Vite) ----------
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# ---------- Backend (Django) ----------
FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# (ΜΗΝ εγκαθιστάς build-essential αν δεν χρειάζεται να κάνεις compile)
# System deps μόνο αν πραγματικά τα χρειάζεσαι
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates curl && \
    rm -rf /var/lib/apt/lists/*

# Install Python deps (με flags για λιγότερη RAM)
COPY backend/requirements.txt /app/backend/requirements.txt
RUN pip setuptools wheel --disable-pip-version-check && \
    pip install --no-cache-dir --prefer-binary --no-compile -r /app/backend/requirements.txt

# Copy backend code μετά τα deps για καλύτερο cache
COPY backend/ /app/backend/
