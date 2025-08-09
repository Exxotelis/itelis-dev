FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps

COPY frontend/ .
RUN node -v && npm -v && npm run build --verbose || (echo "---- NPM DEBUG LOGS ----" && ls -la /root/.npm/_logs || true && cat /root/.npm/_logs/*-debug-*.log || true && exit 1)


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
COPY --from=frontend-build /app/frontend/dist/index.html /app/backend/templates/index.html

WORKDIR /app/backend
RUN python manage.py collectstatic --noinput && python manage.py migrate --noinput

CMD ["/bin/sh","-c","gunicorn core.wsgi:application --bind 0.0.0.0:${PORT} --workers 3 --timeout 60"]
