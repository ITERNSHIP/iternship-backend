FROM node:16.6.0

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env /usr/src/app/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["node", "dist/main"]