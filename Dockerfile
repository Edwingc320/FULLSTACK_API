FROM node:18

WORKDIR /app

# Copiar sólo package.json, lockfile y tsconfig(s)
COPY Client/package*.json Client/tsconfig*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente (src)
COPY Client/src ./src

# Exponer el puerto que usa el backend
EXPOSE 3000

# Ejecutar el backend con ts-node
CMD ["npx", "--exec", "ts-node", "src/types/index.ts"]
