FROM node:12.2.0 as base

WORKDIR /app

COPY . /app/
RUN yarn

################ NEW IMAGE: DEVELOPMENT ##################
FROM base as dev
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
