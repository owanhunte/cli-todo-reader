# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /cli-todos-consumer
COPY . .
RUN npm i
RUN npm i -g .
ENTRYPOINT ["todos-consumer"]