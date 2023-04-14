FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /app
COPY . .
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
