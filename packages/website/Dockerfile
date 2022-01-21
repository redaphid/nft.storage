FROM node:16-bullseye
WORKDIR /app
RUN git clone https://github.com/redaphid/nft.storage.git .
RUN git checkout simple-dev/proxy
RUN yarn
WORKDIR /app/packages/website
COPY .env.local .
CMD [ "yarn","dev" ]