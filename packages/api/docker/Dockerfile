FROM node:16-bullseye
WORKDIR /app

RUN git clone https://github.com/redaphid/nft.storage.git .
RUN git checkout 532a0a69ab5fb9bcc5f6ec86bcbbd424c3a19555
RUN yarn
COPY . .
COPY .env .
WORKDIR /app/packages/api
CMD [ "yarn","miniflare", "--watch", "--debug" ]