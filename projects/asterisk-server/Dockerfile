FROM node:10

WORKDIR /usr/src/asterisk-server-app

COPY . .

RUN npm install

ENTRYPOINT ["node"]

CMD ["index"]
