FROM node:18.12.1-alpine
WORKDIR /app
RUN apk update && apk upgrade && \
	apk add --no-cache bash git
COPY . .
RUN yarn
EXPOSE 3000
ENTRYPOINT yarn start