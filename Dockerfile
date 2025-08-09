FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps
COPY frontend/ .
RUN npm run build

FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

WORKDIR /app
COPY backend/requirements.txt /app/backend/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel --disable-pip-version-check && \
    pip install --no-cache-dir --prefer-binary --no-compile -r /app/backend/requirements.txt

COPY backend/ /app/backend/
RUN mkdir -p /app/backend/static/assets /app/backend/templates
COPY --from=frontend-build /app/frontend/dist/assets /app/backend/static/assets/
COPY --from=frontend-build /app/frontend/dist/itelis.svg /app/backend/static/itelis.svg
COPY --from=frontend-build /app/frontend/dist/index.html /app/backend/templates/index.html
RUN sed -i 's|href="/itelis.svg"|href="/static/itelis.svg"|g' /app/backend/templates/index.html
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput && python manage.py migrate --noinput

CMD ["/bin/sh","-c","gunicorn core.wsgi:application --bind 0.0.0.0:${PORT} --workers 3 --timeout 60"]
