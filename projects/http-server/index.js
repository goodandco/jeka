const url = require('url');
const http = require('http');

const WebSocket = require('ws');

const {HTTP_PORT, TCP_PORT, TCP_HOST, TOKEN} = process.env;

const clients = {};

new WebSocket.Server({
  port: TCP_PORT
}).on('connection', ws => {

  const id = Math.random();
  clients[id] = ws;

  ws.on('message', message => {
    for (const key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', () => {
    delete clients[id];
  });

});

http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const {
    token = null,
    phone = null
  } = parsedUrl.query;

  if (token !== TOKEN || !phone) {
    response.end('error');
    return;
  }

  response.end('ok');

  const ws = new WebSocket(`ws://${TCP_HOST}:${TCP_PORT}`);

  ws.on('open', () => {
    ws.send(phone);
  });
}).listen(HTTP_PORT);