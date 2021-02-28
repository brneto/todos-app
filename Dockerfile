FROM node:12.2.0
WORKDIR /app
COPY . ./

RUN yarn global add pm2 npm-run-all eslint
RUN yarn

EXPOSE 3000
ENTRYPOINT ["yarn", "start"]
