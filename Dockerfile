FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8080

CMD [ "yarn", "build" ]