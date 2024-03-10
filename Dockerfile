FROM node:18.12.0

WORKDIR /src

COPY package*.json yarn.lock ./

RUN rm -rf node_modules && yarn install

COPY . .

RUN yarn build

ARG BASE_URL
ENV REACT_APP_API_URL $BASE_URL

EXPOSE 3000

CMD ["yarn", "dev"]
