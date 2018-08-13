FROM node:10

WORKDIR /usr/src/client-app

COPY . .

RUN npm install

EXPOSE 8888

ENTRYPOINT ["node"]

CMD ["index"]
