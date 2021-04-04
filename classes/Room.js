class Room {
  constructor(roomId, roomTitle, ns, privateRoom = false) {
    this.roomId = roomId;
    this.roomTitle = roomTitle;
    this.ns = ns;
    this.privateRoom = privateRoom;
    this.history = [];
  }
  addMessage(msg) {
    this.history.push(msg);
  }
  clearHistory() {
    this.history = [];
  }
}

module.exports = Room;
