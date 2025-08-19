# ---------- Frontend build ----------
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps
COPY frontend/ .
# Σιγουρέψου ότι στο vite.config.js έχεις base: '/static/'
RUN npm run build

# ---------- Backend runtime image ----------
FROM python:3.11-slim AS backend

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install deps
COPY backend/requirements.txt /app/backend/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel --disable-pip-version-check && \
    pip install --no-cache-dir --prefer-binary --no-compile -r /app/backend/requirements.txt

# Copy backend code
COPY backend/ /app/backend/

# Προετοιμασία φακέλων static/templates
RUN mkdir -p /app/backend/static/assets /app/backend/templates

# Copy FE build → Django static & templates
COPY --from=frontend-build /app/frontend/dist/assets /app/backend/static/assets/
COPY --from=frontend-build /app/frontend/dist/index.html /app/backend/templates/index.html
# (προαιρετικό) Αν το index.html αναφέρει /itelis.svg εκτός assets:
# COPY --from=frontend-build /app/frontend/dist/itelis.svg /app/backend/static/itelis.svg
# RUN sed -i 's|href="/itelis.svg"|href="/static/itelis.svg"|g' /app/backend/templates/index.html

# Collect static (μπορείς και στο runtime αν προτιμάς)
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

# ΠΡΟΤΙΜΟΤΕΡΟ: migrate στο runtime (όχι στο build)
# CMD τρέχουμε migrate και μετά gunicorn
CMD /bin/sh -c "python manage.py migrate --noinput && \
                gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3 --timeout 60"
