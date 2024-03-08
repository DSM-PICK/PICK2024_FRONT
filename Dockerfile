FROM node:18.12.0

# 작업 디렉터리를 /app으로 설정합니다.
WORKDIR /src

# package.json 및 yarn.lock을 복사합니다.
COPY package*.json yarn.lock ./

# 의존성을 설치합니다.
RUN yarn install

# 앱 소스 코드를 번들합니다.
COPY . .

# Next.js 앱을 빌드합니다.
RUN yarn build

# API URL을 위한 환경 변수를 설정합니다.
ARG BASE_URL
ENV REACT_APP_API_URL $BASE_URL

# Next.js 앱이 실행될 포트를 노출합니다.
EXPOSE 3000

# 앱을 실행합니다.
CMD ["yarn", "dev"]
