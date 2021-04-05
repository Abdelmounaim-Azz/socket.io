const Namespace = require("../classes/Namespace");
const Room = require("../classes/Room");

let namespaces = [];
let awsNs = new Namespace(
  0,
  "https://media.webteam.puppet.com/uploads/2019/10/Logo-AWS.jpg",
  "aws",
  "/aws"
);
let dockerNs = new Namespace(
  1,
  "https://www.docker.com/sites/default/files/d8/styles/role_icon/public/2019-07/Moby-logo.png?itok=sYH_JEaJ",
  "docker",
  "/docker"
);
let linuxNs = new Namespace(
  2,
  "https://logo-logos.com/wp-content/uploads/2017/07/Linux_Logo_01.jpg",
  "linux",
  "/linux"
);

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
namespaces.push(awsNs, dockerNs, linuxNs);
module.exports = namespaces;
