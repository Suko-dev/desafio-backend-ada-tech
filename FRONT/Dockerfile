FROM node:16.20.2-bullseye

USER root

WORKDIR /home/node/client

COPY --chown=root:root package*.json ./

RUN npm install

COPY --chown=root:root . .

EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]