const http = require("http");
const websocket = require("ws");
const server = http.createServer((req, res) => {
  res.end("I am connected");
});
//create ws server
const wss = new websocket.Server({ server });
//see headers before sending req
wss.on("headers", (headers, req) => {
  console.log(headers);
});
//afetr handshake
wss.on("connection", (ws, req) => {
  ws.send("welcome to ws server");
  ws.on("message", (msg) => console.log(msg));
});
server.listen(5000);
