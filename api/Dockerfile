FROM node:23.9-alpine AS base 

WORKDIR /usr/src/api

FROM base AS dev

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node

COPY . .

CMD ["npm", "run", "dev"]

FROM base AS prod

WORKDIR /usr/src/api

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev && npm cache clean --force
USER node

COPY . .

CMD ["node", "server.js"]
