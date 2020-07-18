FROM node:alpine

COPY ./ /home/node/app
WORKDIR /home/node/app/dist

RUN npm run build
CMD node main.js
