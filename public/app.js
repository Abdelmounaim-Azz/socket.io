const socket = io("http://localhost:5000");
let nsSocket = "";
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
  let nsDiv = document.querySelector(".namespaces");
  nsDiv.innerHTML = "";
  nsData.forEach((el) => {
    nsDiv.innerHTML += `<div class="namespace" ns="${el.endpoint}" ><img class="w-60 h-40" src='${el.img}'/></div>`;
  });
  Array.from(document.getElementsByClassName("namespace")).forEach((el) => {
    el.addEventListener("click", (e) => {
      const nsEndpoint = el.getAttribute("ns");
      joinNamespace(nsEndpoint);
    });
  });
  joinNamespace("/aws");
});
