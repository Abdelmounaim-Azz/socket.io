function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (newMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newMembers} <span class="glyphicon glyphicon-user"></span>`;
  });
  nsSocket.on("historyEvent", (history) => {
    const messagesUl = document.querySelector("#messages");
    messagesUl.innerHTML = "";
    history.forEach((msg) => {
      const newMsg = buildChat(msg);
      messagesUl.innerHTML += newMsg;
    });
    messagesUl.scrollTo(0, messagesUl.scrollHeight);
  });
  nsSocket.on("updateMembers", (membersCount) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${membersCount} <span class="glyphicon glyphicon-user"></span>`;
  });
  document.querySelector(".current-room").innerHTML = `${roomName}`;
}
