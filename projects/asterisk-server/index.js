const asterisk = require('agi');

const WebSocket = require('ws');

const AGI_PORT = 4537;
const TCP_PORT = 1337;
const TCP_HOST = '127.0.0.1';


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

  ws.on('close', function () {
    delete clients[id];
  });

});

asterisk.createServer(context => {

  context.on('variables', vars => {

    const ws = new WebSocket(`ws://${TCP_HOST}:${TCP_PORT}`);
    ws.on('open', function open() {
      ws.send(vars.agi_uniqueid);
    });
  });

  context.end();

}).listen(AGI_PORT);