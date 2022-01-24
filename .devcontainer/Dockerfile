# To build and run:
#docker build -t visualizer:node16 .
#docker run --rm -p 3000:3000 --name visualizer -d visualizer:node16
################ STAGE: DEV ##################
ARG VARIANT=alpine3.14
FROM node:16.10-${VARIANT} AS dev

RUN apk add --no-cache zsh=5.8-r2 git=2.32.0-r0 openssh=8.6_p1-r3 curl=7.79.1-r0
RUN su -c "sh -c $(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" node
RUN su -c "sed -i 's/^ZSH_THEME=\"robbyrussell\"/ZSH_THEME=\"strug\"/' /home/node/.zshrc" node
RUN sh -c "yarn global add ynpx"

################ STAGE: BUILD ##################
FROM node:16.10-${VARIANT} AS build

WORKDIR /base
COPY public public/
COPY .env package.json yarn.lock ./
RUN yarn

COPY src src/
RUN yarn test --coverage --watchAll=false
RUN yarn build

WORKDIR /app
RUN mv /base/build ./
RUN yarn add serve

################ STAGE: DEPLOY ##################
FROM node:16.10-slim

WORKDIR /opt/booking
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/

EXPOSE 3000/tcp

ENTRYPOINT ["node", "./node_modules/serve/bin/serve.js", "-s", "build"]
