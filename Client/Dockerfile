# Etapa 1: Build
FROM node:18 AS builder

WORKDIR /app

# Copiar configs y lockfile para instalar deps y cachear esta etapa
COPY package*.json package-lock*.json tsconfig*.json ./


RUN npm install

# Copiar el resto del proyecto
COPY . .

# Listar archivos para debug (opcional)
RUN ls -la /app

# Compilar el proyecto
RUN npm run build

# Etapa 2: Servidor Nginxx
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
