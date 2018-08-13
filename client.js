const http = require("http");

const PORT = 8888;

const js = `
    var socket = new WebSocket("ws://127.0.0.1:1337");

    socket.onopen = function() {
      console.log("Соединение установлено.");
    };
  
    socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };
  
    socket.onmessage = function(event) {
      console.log("Получены данные " + event.data);
    };
  
    socket.onerror = function(error) {
      console.log("Ошибка " + error.message);
    };
`;

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
          ${js}
        </script>
      </html>
    `
  );
}).listen(PORT);

