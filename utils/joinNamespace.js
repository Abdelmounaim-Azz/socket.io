function joinNamespace(nsEndpoint) {
  if (nsSocket) {
    nsSocket.close();
    document
      .querySelector("#user-input")
      .removeEventListener("submit", formSubmission);
  }
  nsSocket = io(`http://localhost:5000${nsEndpoint}`);
  nsSocket.on("nsRoom", (nsRooms) => {
    let rooms = document.querySelector(".room-list");
    rooms.innerHTML = "";
    nsRooms.map((room) => {
      let icon = room.privateRoom ? "lock" : "globe";
      rooms.innerHTML += `<li class="room ">
      <span class="glyphicon glyphicon-${icon}"></span>${room.roomTitle}
    </li>`;
    });
    let roomNodes = document.getElementsByClassName("room");
    Array.from(roomNodes).map((el) => {
      el.addEventListener("click", (e) => {
        console.log("I have been just clicked", e.target.innerText);
        joinRoom(e.target.innerText);
      });
    });
    const topRoomName = document.querySelector(".room").innerText;
    joinRoom(topRoomName);
  });
  nsSocket.on("msgToClients", (msg) => {
    const content = buildChat(msg);
    console.log(content);
    document.querySelector("#messages").innerHTML += content;
  });
  document
    .querySelector(".message-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const message = document.getElementById("user-message").value;
      nsSocket.emit("newMsgToServer", { data: message });
    });
}
function formSubmission(event) {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  nsSocket.emit("newMessageToServer", { data: newMessage });
}
