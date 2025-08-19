# ---------- Frontend build ----------
FROM node:18 AS frontend-build
WORKDIR /app/frontend

# Εγκατάσταση deps
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund --legacy-peer-deps

# Κώδικας FE & build (Vite με base:'/static/')
COPY frontend/ .
RUN npm run build
# Παράγει: /app/frontend/dist
#   - assets/ (js, css)
#   - images/, icons, manifest, κ.λπ.
#   - index.html (με refs σε /static/...)


# ---------- Backend runtime ----------
FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Python deps
COPY backend/requirements.txt /app/backend/requirements.txt
RUN python -m pip install --upgrade pip setuptools wheel --disable-pip-version-check && \
    pip install --no-cache-dir --prefer-binary --no-compile -r /app/backend/requirements.txt

# Κώδικας backend
COPY backend/ /app/backend/

# Προετοιμασία φακέλων
RUN mkdir -p /app/backend/static /app/backend/templates

# --- Κρίσιμο σημείο: αντιγράφουμε ΟΛΟ το FE build στα static ---
COPY --from=frontend-build /app/frontend/dist /app/backend/static/
# και κρατάμε το index.html ως template για να σερβίρεται το SPA
RUN cp /app/backend/static/index.html /app/backend/templates/index.html

# Συλλογή static → μεταφέρει από backend/static → backend/staticfiles
WORKDIR /app/backend
RUN python manage.py collectstatic --noinput

# Εκκίνηση: πρώτα migrate, μετά gunicorn
# (DJANGO settings: DEBUG=False, STATIC_URL=/static/, ΧΩΡΙΣ STATICFILES_DIRS σε prod,
#  WhiteNoise ενεργό: middleware + CompressedManifestStaticFilesStorage)
CMD /bin/sh -c "python manage.py migrate --noinput && \
                gunicorn core.wsgi:application --bind 0.0.0.0:${PORT:-8080} --workers 3 --timeout 60"
