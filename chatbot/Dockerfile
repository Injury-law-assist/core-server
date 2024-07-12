FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
RUN npm i ts-node -g

COPY . .

CMD ["ts-node","./src/server.ts"]
