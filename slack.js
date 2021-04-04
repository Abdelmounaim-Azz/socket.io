const express = require("express");
const socketio = require("socket.io");
const app = express();
let namespaces = require("./data/namespaces");
app.use(express.static(__dirname + "/public"));

const server = app.listen(5000);
const io = socketio(server);

io.of("/").on("connection", (socket) => {
  let nsData = namespaces.map((namespace) => {
    return {
      img: namespace.nsImg,
      endpoint: namespace.nsEnpoint,
    };
  });
  socket.emit("nsHomies", nsData);
});
namespaces.forEach((namespace) => {
  io.of(namespace.nsEnpoint).on("connection", (nsSocket) => {
    console.log(`${nsSocket.id} has just joined ${namespace.nsEnpoint}`);
    nsSocket.emit("nsInfo", namespace.rooms);
  });
});
