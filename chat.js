const express = require("express");
const socketio = require("socket.io");
const app = express();

app.use(express.static(__dirname + "/public"));

const server = app.listen(5000);
const io = socketio(server, {
  path: "/socket.io",
  serveClient: true,
});
io.of("/user").on("connection", (socket) => {
  console.log("someone connected to usernamespace");
  io.of("/user").emit("user", "welcome to user channel");
});
io.of("/").on("connection", (socket) => {
  socket.emit("msgFromServer", "Welcome to socket.io server");
  socket.on("msgToServer", (data) => {
    console.log(data);
  });
  socket.join("room1");
  socket.to("room1").emit("join", `${socket.id} has just joined room1`);
});
