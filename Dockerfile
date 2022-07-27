FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE ${API_PORT}

CMD [ "npm", "run", "start:dev"]