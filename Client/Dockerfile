# Etapa 1: Build de la aplicación React con Vite
FROM node:18 AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración primero (para aprovechar cache)
COPY package*.json tsconfig*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Compila el proyecto (typescript + vite)
RUN npm run build

# Etapa 2: Servidor Nginx para producción
FROM nginx:stable-alpine

# Copia el build generado al directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia tu configuración personalizada de Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para servir la app
EXPOSE 80

# Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
