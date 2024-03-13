FROM node:21.5.0

WORKDIR /src

COPY . .

RUN yarn install

RUN yarn build

ARG BASE_URL
ENV REACT_APP_API_URL $BASE_URL

EXPOSE 3000

CMD ["yarn", "dev"]
