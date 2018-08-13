FROM node:10

WORKDIR /usr/src/server-app

COPY . .

RUN npm install

EXPOSE 4040 1337

ENTRYPOINT ["node"]

CMD ["index"]
