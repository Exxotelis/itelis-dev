FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt /app/backend/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel --disable-pip-version-check && \
    pip install --no-cache-dir --prefer-binary --no-compile -r /app/backend/requirements.txt

COPY backend/ /app/backend/
RUN mkdir -p /app/backend/static/assets /app/backend/templates
COPY --from=frontend-build /app/frontend/dist/assets /app/backend/static/assets/
COPY --from=frontend-build /app/frontend/dist/index.html /app/backend/templates/index.html

WORKDIR /app/backend
RUN python manage.py collectstatic --noinput && python manage.py migrate --noinput

ENV PORT=8000
CMD ["/bin/sh", "-c", "gunicorn core.wsgi:application --bind 0.0.0.0:${PORT} --workers 3 --timeout 60"]
