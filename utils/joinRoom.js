function joinRoom(roomName) {
  nsSocket.emit("joinRoom", roomName, (newMembers) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${newMembers} <span class="glyphicon glyphicon-user"></span>`;
  });
  nsSocket.on("historyEvent", (history) => {
    const chatUI = document.getElementById("messages");
    chatUI.innerHTML = "";
    history.map((msg) => {
      const ui = buildChat(msg);
      const currentMsg = chatUI.innerHTML;
      chatUI.innerHTML = currentMsg + ui;
    });
    chatUI.scrollTo(0, chatUI.scrollHeight);
  });
  nsSocket.on("updateMembers", (membersCount) => {
    document.querySelector(
      ".curr-room-num-users"
    ).innerHTML = `${membersCount} <span class="glyphicon glyphicon-user"></span>`;
  });
  document.querySelector(".current-room").innerHTML = `${roomName}`;
}
