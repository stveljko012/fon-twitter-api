FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY src .

EXPOSE 3000

CMD [ "node", "server.js" ]
