FROM node:12.2.0 as base

WORKDIR /app

COPY . /app/
RUN yarn

EXPOSE 3000

################ IMAGE-STAGE: DEVELOPMENT ##################
FROM base as dev
ENTRYPOINT ["yarn", "start"]

################ IMAGE-STAGE: PRODUCTION ##################
FROM base as prod

RUN yarn build
RUN rm -rf /app/src

ENV NODE_ENV=production
ENTRYPOINT ["node", "/app/dist/index.js"]
