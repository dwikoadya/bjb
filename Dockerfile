FROM node:12-alpine AS builder

RUN apk add --update --no-cache \
    bash=5.0.11-r1 \
    && rm -rf /var/cache/apk/*

ARG ENV_GROUP
RUN mkdir web-areon

WORKDIR /web-areon

COPY ./package*.json ./

RUN echo "${ENV_GROUP}" > /web-areon/.env

RUN npm install -g node-prune@latest \
    && npm install -g serve@latest \
    && npm install --production \
    && npm prune --production \
    && npm audit fix

COPY . ./

RUN npm run build --production \
    && /usr/local/bin/node-prune

# docker build multi stage
FROM node:12-alpine

RUN npm install -g serve@latest

COPY --from=builder /web-areon/build ./build
COPY --from=builder /web-areon/node_modules ./node_modules
COPY --from=builder /web-areon/public ./public
COPY --from=builder /web-areon/src ./src
COPY --from=builder /web-areon/.env ./.env
COPY --from=builder /web-areon/index.js ./index.js
COPY --from=builder /web-areon/jsconfig.json ./jsconfig.json
COPY --from=builder /web-areon/package.json ./package.json

EXPOSE 3000

CMD ["serve", "-s", "build", "-p", "3000"]
