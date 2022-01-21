FROM node:16-bullseye
WORKDIR /app
COPY . .
RUN yarn
COPY .env.local .
CMD [ "yarn","dev" ]