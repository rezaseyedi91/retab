FROM node:20-alpine

WORKDIR /retab-server

COPY package*.json ./

RUN npm ci


COPY . .

RUN npx prisma generate
EXPOSE 4000

CMD ["sh", "-c", "npx prisma generate && npx tsc &&  node ./dist/index.js"]