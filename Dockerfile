FROM node:lts-alpine
WORKDIR /app
RUN apk update && apk upgrade && \
	apk add --no-cache bash git
COPY . .
RUN yarn
EXPOSE 3001
ENTRYPOINT yarn start