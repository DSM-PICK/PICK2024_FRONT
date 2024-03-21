FROM node:21.5.0

WORKDIR /user/src/app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

ARG BASE_URL
ENV NEXT_PUBLIC_API_KEY $BASE_URL


EXPOSE 3000

CMD ["yarn", "dev"]
