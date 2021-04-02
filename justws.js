const http = require("http");
const websocket = require("ws");
const server = http.createServer((req, res) => {
  res.end("I am connected");
});
//create ws server
const wss = new websocket.Server({ server });
wss.on("headers", (msg) => {
  console.log(msg);
});
server.listen(5000);
