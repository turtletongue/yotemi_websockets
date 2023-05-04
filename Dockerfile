FROM node:18.12.1-alpine3.17

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock ./

RUN yarn

RUN yarn global add @nestjs/cli

COPY . .

RUN yarn build

RUN chown -R node:node /app

USER node

CMD ["yarn", "start:prod"]