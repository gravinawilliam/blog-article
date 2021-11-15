FROM node:14.18-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@8.0.0
RUN npm config set cache /home/node/app/blog-article/.npm-cache --global

RUN mkdir -p /home/node/app/blog-article

USER node

WORKDIR /home/node/app/blog-article
