// var sanitizeHTML = function (str) {
//   var temp = document.createElement("li");
//   temp.textContent = str;
//   return temp.innerHTML;
// };
const socket = io("http://localhost:5000");
const socketUser = io("http://localhost:5000/user");
// socketUser.on("connect", () => {
//   console.log(socketUser.id);
// });
socketUser.on("user", (msg) => {
  console.log(msg);
});
socket.on("join", (msg) => {
  console.log(msg);
});
// socket.on("connect", () => {
//   console.log(socket.id);
//   console.log(socket.connected);
// });
socket.on("msgFromServer", (data) => {
  console.log(data);
  socket.emit("msgToServer", "Thanks for the warm welcome.");
});
document.getElementById("msg-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.getElementById("msg-user").value;
  socket.emit("newMsgToServer", { data: message });
});
// socket.on("msgToclients", (msg) => {
//   console.log(msg);
//   document.getElementById("messages").innerHTML += `<li>${sanitizeHTML(
//     msg.data
//   )}</li>`;
// });
//Heart beat mechanism to determin whether we r connected
// socket.on("ping", () => {
//   console.log("ping received from server");
// });
// socket.on("pong", (latency) => {
//   console.log(latency);
//   console.log("Pong sent to the srv");
// });
