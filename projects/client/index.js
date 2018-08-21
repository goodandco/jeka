const http = require("http");

const PORT = 8888;
const SOKET_URL = "ws://127.0.0.1:1337";


new http.Server(function (req, res) {
  res.end(
    `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Test Websocket</title>
        </head>
        <body>
        </body>
        <script>
          function start (location) {
            const socket = new WebSocket(location);

            socket.onopen = () => {
              console.log("Соединение установлено.");
            };
          
            socket.onclose = event => {
              if (event.wasClean) {
                console.log('Соединение закрыто чисто');
              } else {
                console.log('Обрыв соединения'); 
              }
              
              console.log('Код: ' + event.code + ' причина: ' + event.reason);
              
              setTimeout(() => start(location), 5000);
            };
          
            socket.onmessage = event => {
              console.log("Получены данные " + event.data);
            };
          
            socket.onerror = error => {
              console.log("Ошибка " + error.message);
            };
          }
          
          start("${SOKET_URL}");
          
        </script>
      </html>
    `
  );
}).listen(PORT);

