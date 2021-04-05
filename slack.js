const express = require("express");
const socketio = require("socket.io");
const app = express();
let namespaces = require("./data/namespaces");
app.use(express.static(__dirname + "/public"));

const server = app.listen(5000);
const io = socketio(server);
const updateUsersInRoom = (endpoint, room) => {
  io.of(endpoint)
    .in(room)
    .clients((error, clients) => {
      io.of(endpoint).in(room).emit("updateMembers", clients.length);
    });
};

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
    const username = nsSocket.handshake.query.username;
    console.log(username);
    nsSocket.emit("nsRoom", namespace.rooms);
    nsSocket.on("joinRoom", (roomTojoin, numUsersCb) => {
      const roomToLeave = Object.keys(nsSocket.rooms)[1];
      nsSocket.leave(roomToLeave);
      updateUsersInRoom(namespace.nsEnpoint, roomToLeave);
      nsSocket.join(roomTojoin);

      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTojoin;
      });
      nsSocket.emit("historyEvent", nsRoom.history);
      updateUsersInRoom(namespace.nsEnpoint, nsRoom.roomTitle);
    });
    nsSocket.on("newMsgToServer", (msg) => {
      const msgObj = {
        data: msg.data,
        date: Date.now(),
        username: "abdelmounaim",
        avatar:
          "https://via.placeholder.com/30?__cf_chl_jschl_tk__=2ca4ff89bcb9b6fb5c3549cc6552f2899202ba98-1617495756-0-Ad1FEU6t5m8GO6ulFdmheWyBGvk8TewhujX_koWhmZbbblDlrpufWObF9CXWIAS5U3oINdpG5PPQM6f3VryKONGhF783cbjXijzhkd6W3AETt74TzDFBiLqxExg8KOf9RRkAoo8fqGoOL9aXtxKKz6ba9xmTx2ssyUjMBb-J2KLZIZRjMrROCJS5SXir461-t7G3ZWn-tYcMgWBOSbYWoXppZjuCkOSPg-9LwHhdbG5uTDBFDMFP4gY_mIVMWq0g2TgGtFLRvv3PhBhGRwG2N4-y3T3BRzOZPi6F430LLf1FF1VckAqX-sX-BIFoMRyKvayxuDh2ESWy-H6UQ-I3b_m0lLyeBICTlhDNjL2xuti3_sAcfbHf1FGG9WibVm8HfA",
      };
      const roomTitle = Object.keys(nsSocket.rooms)[1];
      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle;
      });
      console.log(nsRoom);
      nsRoom.addMessage(msgObj);
      io.of(namespace.nsEnpoint).to(roomTitle).emit("msgToClients", msgObj);
    });
  });
});
