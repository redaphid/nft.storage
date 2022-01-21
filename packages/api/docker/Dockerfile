FROM node:16-bullseye
WORKDIR /app

RUN git clone https://github.com/redaphid/nft.storage.git .
RUN git checkout simple-dev/proxy

RUN yarn
# COPY . .
COPY .env .
WORKDIR /app/packages/api
CMD [ "yarn","miniflare", "--watch", "--debug" ]