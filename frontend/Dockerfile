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
COPY --from=build /app/dist /app/dist
COPY Caddyfile /etc/caddy/Caddyfile
