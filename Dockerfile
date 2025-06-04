# Etapa 1: Build del frontend
FROM node:18 AS builder
WORKDIR /app

COPY Client/package*.json Client/tsconfig*.json ./Client/
WORKDIR /app/Client
RUN npm install
COPY Client/ ./
RUN npm run build

# Etapa 2: Servir con Nginxxxxxx
FROM nginx:stable-alpine
COPY --from=builder /app/Client/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
