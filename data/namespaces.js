// Bring in the room class
const Namespace = require("../classes/Namespace");
const Room = require("../classes/Room");

// Set up the namespaces
let namespaces = [];
let awsNs = new Namespace(
  0,
  "aws",
  "https://miro.medium.com/max/1200/1*W02WEmR0_JeJXfLWN2zHwQ.png",
  "/aws"
);
let dockerNs = new Namespace(
  1,
  "docker",
  "https://www.aldakur.net/wp-content/uploads/2017/03/docker-logo.png",
  "/docker"
);
let linuxNs = new Namespace(
  2,
  "linux",
  "https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png",
  "/linux"
);

namespaces.push(awsNs, dockerNs, linuxNs);

// Make the main room and add it to rooms. it will ALWAYS be 0
awsNs.addRoom(new Room(0, "Lambda", "aws"));
awsNs.addRoom(new Room(1, "EC2", "aws"));
awsNs.addRoom(new Room(2, "cloudFront", "aws"));

dockerNs.addRoom(new Room(0, "dockerServer", "docker"));
dockerNs.addRoom(new Room(1, "dockerHub", "docker"));
dockerNs.addRoom(new Room(2, "dockerClient", "docker"));
dockerNs.addRoom(new Room(3, "dockerCompose", "docker"));

linuxNs.addRoom(new Room(0, "Debian", "linux"));
linuxNs.addRoom(new Room(1, "Red Hat", "linux"));
linuxNs.addRoom(new Room(2, "Ubuntu", "linux"));
linuxNs.addRoom(new Room(3, "Mint", "linux"));

module.exports = namespaces;
