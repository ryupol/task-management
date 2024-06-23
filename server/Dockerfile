FROM node:20.14-alpine3.19 as development

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install

COPY . .

RUN yarn build

FROM node:20.14-alpine3.19 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn install --production

COPY --from=development /app/dist ./dist

EXPOSE 8080

CMD ["yarn", "start"]