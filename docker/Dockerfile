# build
FROM node:22-alpine AS build

WORKDIR /workspace

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# stage 2: copy hasil build ke nginx
FROM nginx:1.27-alpine

RUN rm /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=build /workspace/dist/ .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]