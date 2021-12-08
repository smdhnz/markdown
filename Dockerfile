FROM node:alpine AS base

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./yarn.lock .
COPY ./index.js .

RUN yarn install


EXPOSE 1234

ENTRYPOINT ["node", "index.js" ]
