const express = require("express");
const socketio = require("socket.io");
const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(5000);
const io = socketio(server, {
  path: "/socket.io",
  serveClient: true,
});
io.on("connection", (socket) => {
  socket.emit("msgFromServer", "Welcome to socket.io server");
  socket.on("msgToServer", (data) => {
    console.log(data);
  });
  socket.on("newMsgToServer", (msg) => {
    console.log(msg);
    io.emit("msgToclients", { data: msg.data });
  });
});
