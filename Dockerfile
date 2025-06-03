FROM node:18
WORKDIR /app

COPY Server/package*.json Server/tsconfig*.json ./
COPY Server/src ./src

RUN npm install
# Install nodemon and ts-node globally
EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "ts-node", "src/index.ts"]
