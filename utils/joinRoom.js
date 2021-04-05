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
    document.querySelector(".current-room").innerHTML = `${roomName}`;
  });
  let searchBox = document.querySelector("#search-box");
  searchBox.addEventListener("input", (e) => {
    let messages = Array.from(document.getElementsByClassName("message-text"));
    let blockMsg = Array.from(document.getElementsByClassName("user-li"));

    messages.map((msg, index) => {
      if (
        msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1
      ) {
        blockMsg[index].style.visibility = "hidden";
      } else {
        blockMsg[index].style.visibility = "visible";
      }
    });
  });
}
