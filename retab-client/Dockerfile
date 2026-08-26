FROM node:20-alpine
WORKDIR /retab-client

COPY package*.json ./
RUN npm ci 


COPY . . 
EXPOSE 8080

CMD [ "npm", "run", "serve" ]

