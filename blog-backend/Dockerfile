FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "dev"]
