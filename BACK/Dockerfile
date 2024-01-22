FROM node:20.11.0-slim

USER root

WORKDIR /home/node/app

COPY --chown=root:root package*.json ./

RUN npm install

COPY --chown=root:root . .

EXPOSE 5000

CMD ["npm", "run", "start:dev"]