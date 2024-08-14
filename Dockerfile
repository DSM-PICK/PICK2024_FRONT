FROM node:21.5.0

WORKDIR /user/src/app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

ARG NEXT_PUBLIC_API_KEY
ENV NEXT_PUBLIC_API_KEY=${NEXT_PUBLIC_API_KEY}

ARG NEXT_PUBLIC_FILE_APP
ENV NEXT_PUBLIC_FILE_APP=${NEXT_PUBLIC_FILE_APP}
EXPOSE 3000

CMD ["yarn", "dev"]
