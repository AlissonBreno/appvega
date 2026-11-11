FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY web/package.json web/yarn.lock ./web/
COPY mocks ./mocks
COPY app ./app
COPY web ./web

WORKDIR /app/web

RUN yarn install --frozen-lockfile && yarn build

FROM nginx:1.28-alpine

COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/web/dist /usr/share/nginx/html

EXPOSE 80
