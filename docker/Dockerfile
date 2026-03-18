# build
FROM node:24.13.0-alpine AS build

WORKDIR /workspace

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


# stage 2: copy hasil build ke nginx
# FROM nginx:stable-alpine

FROM nginx:1.28.2-alpine

RUN rm /etc/nginx/conf.d/default.conf


# COPY ./dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
COPY --from=build /workspace/dist/ .
COPY nginx.conf /etc/nginx/conf.d/default.conf