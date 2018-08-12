const url = require('url');
const http = require('http');

const WebSocket = require('ws');

const HTTP_PORT = 4040;
const TCP_PORT = 1337;
const TCP_HOST = '127.0.0.1';

const clients = {};

new WebSocket.Server({
  port: TCP_PORT
}).on('connection', function(ws) {

  const id = Math.random();
  clients[id] = ws;

  ws.on('message', function(message) {
    for (const key in clients) {
      clients[key].send(message);
    }
  });

  ws.on('close', function() {
    delete clients[id];
  });

});

http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true);
const {
  token = null,
  phone = null
} = parsedUrl.query;

if (!token || !phone) {
  response.end('error');
  return;
}

response.end('ok');

const ws = new WebSocket(`ws://${TCP_HOST}:${TCP_PORT}`);

ws.on('open', function open() {
  ws.send(phone);
});
}).listen(HTTP_PORT);