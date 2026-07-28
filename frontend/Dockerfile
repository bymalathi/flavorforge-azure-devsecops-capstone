FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY src ./src
COPY public ./public
COPY index.html ./
COPY vite.config.js ./
COPY eslint.config.js ./

RUN npm run build -- --mode docker


FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

USER nginx

EXPOSE 80