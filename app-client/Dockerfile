FROM node:latest AS builder

WORKDIR /app

COPY . .

RUN npm cache clear --force  && \
    npm install && \
    npm run build

FROM nginx:latest

COPY --from=builder /app/dist/* /usr/share/nginx/html/
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf