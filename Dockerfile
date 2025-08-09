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
    PYTHONUNBUFFERED=1

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python deps
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --upgrade pip && pip install -r backend/requirements.txt

# Copy backend code
COPY backend/ ./backend/

# Copy React build into Django (assets -> static, index -> templates)
# - assets θα τα σερβίρει το WhiteNoise
# - index.html θα το σερβίρει TemplateView ως SPA
RUN mkdir -p backend/static/assets backend/templates && \
    true

COPY --from=frontend-build /app/frontend/dist/assets ./backend/static/assets/
COPY --from=frontend-build /app/frontend/dist/index.html ./backend/templates/index.html

# Collect static & run migrations at build time
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput && \
    python manage.py migrate --noinput

# Run with Gunicorn
ENV PORT=8000
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:${PORT}", "--workers", "3"]
