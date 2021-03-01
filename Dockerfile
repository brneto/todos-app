FROM node:12.2.0 AS base

WORKDIR /app/base
COPY . /app/base/
RUN yarn global add pm2@4.3.0 npm-run-all@4.1.5 eslint@7.1.0
RUN yarndocke
EXPOSE 3000

################ IMAGE-STAGE: DEVELOPMENT ##################
FROM base AS dev

EXPOSE 9229

ENV NODE_ENV=development
ENTRYPOINT ["yarn", "start"]

################ IMAGE-STAGE: PRODUCTION ##################
FROM base AS prod

RUN yarn build
WORKDIR /app
RUN mv ./base/package.json ./base/dist/* .
RUN rm -rf ./base
RUN yarn --prod

ENV NODE_ENV=production
ENTRYPOINT ["node", "index.js"]
