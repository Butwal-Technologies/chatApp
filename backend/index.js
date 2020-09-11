const express = require("express");
const { Socket } = require("dgram");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", socket => {
    console.log("user connected :D");
   socket.on("Chat Message",msg => {
       console.log(msg);
    io.emit("Chat Message", msg);
});
});


server.listen(port, () => console.log("server runnin on port"+ port));
