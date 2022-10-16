FROM node:16.15-alpine3.15

WORKDIR /app
COPY package.json yarn.lock /app

RUN yarn

COPY . /app

RUN yarn build

RUN yarn prisma:generate
RUN yarn migrate:latest

EXPOSE 3333

CMD ["yarn", "start"]
