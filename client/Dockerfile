FROM node:23-alpine as base

FROM base as dev

WORKDIR /usr/src/client

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

USER node

COPY . .

CMD ["npm","run","dev"]

FROM base as prod

WORKDIR /usr/src/client

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY . .

CMD ["npm","run","build"]

FROM nginx:1.27.4-alpine-slim

RUN rm /etc/nginx/conf.d/default.conf

COPY /nginx/. /etc/nginx/conf.d/

COPY --from=prod /usr/src/client/dist /usr/share/nginx 



