const socket = io("http://localhost:5000");
var sanitizeHTML = function (content) {
  var temp = document.createElement("div");
  temp.classList.add("namespace");
  temp.textContent = content;
  return temp.innerHTML;
};
// const socketAws = io("http://localhost:5000/aws");
// const socketDocker = io("http://localhost:5000/docker");
// const socketLinux = io("http://localhost:5000/linux");
socket.on("nsHomies", (nsData) => {
  const nsDiv = document.querySelector(".namespaces");
  nsData.forEach((el) => {
    nsDiv.innerHTML += `<div class="namespace" ns="${el.endpoint}" ><img class="w-60 h-40" src='${el.img}'/></div>`;
  });
  Array.from(document.getElementsByClassName("namespace")).forEach((el) => {
    el.addEventListener("click", (e) => {
      const nsEndpoint = el.getAttribute("ns");
      console.log(nsEndpoint);
    });
  });
  const nsSocket = io("http://localhost:5000/aws");
  nsSocket.on("nsInfo", (nsRooms) => {
    let rooms = document.querySelector(".room-list");
    nsRooms.map((room) => {
      let icon = room.privateRoom ? "lock" : "globe";
      rooms.innerHTML += `<li class="room">
      <span class="glyphicon glyphicon-${icon}"></span>${room.roomTitle}
    </li>`;
    });
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).map((el) => {
      el.addEventListener("click", (e) => {
        console.log("I have been just clicked", e.target.innerText);
      });
    });
  });
});
document.getElementById("user-input").addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.getElementById("user-message").value;
  socket.emit("newMsgToServer", { data: message });
});
