FROM node:18
WORKDIR /app

COPY SERVER/package*.json SERVER/tsconfig*.json ./
COPY SERVER/src ./src

RUN npm install
# Install nodemon and ts-node globally
EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "ts-node", "src/index.ts"]
