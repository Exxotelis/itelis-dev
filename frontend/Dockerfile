# -------- Build stage (React/Vite) --------
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# -------- Serve stage (Caddy) --------
FROM caddy:2
WORKDIR /app
# Αντιγράφουμε το compiled build
COPY --from=build /app/dist /app/dist
# Caddyfile με SPA fallback
COPY Caddyfile /etc/caddy/Caddyfile
# Δεν χρειάζεται CMD: το caddy image ξεκινά μόνο του
