const express = require("express");
const socketio = require("socket.io");
const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(5000);
const io = socketio(server);
io.on("connection", (socket) => {
  socket.emit("msgFromServer", "Welcome to socket.io server");
  socket.on("msgToServer", (data) => {
    console.log(data);
  });
});
