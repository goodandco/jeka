FROM node:10

WORKDIR /usr/src/jeka

COPY . .

RUN npm install

EXPOSE 4040 8888 1337

ENTRYPOINT ["node"]

CMD ["server"]
