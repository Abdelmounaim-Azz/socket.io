class Namespace {
  constructor(nsId, nsImg, nsTitle, nsEnpoint) {
    this.nsId = nsId;
    this.nsImg = nsImg;
    this.nsTitle = nsTitle;
    this.nsEnpoint = nsEnpoint;
    this.rooms = [];
  }
  addRoom(roomObj) {
    this.rooms.push(roomObj);
  }
}

module.exports = Namespace;
