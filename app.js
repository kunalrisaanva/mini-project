const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const path = require("path");
const  url  = "http://localhost:3000/"

app.use(express.static("public"))

app.get("/",(req,res) => {
    res.sendFile(path.join(__filename,"./public/index.html"));
})

var user = [];

io.on("connection",(socket) => {
    console.log('a user connected');

    socket.on("setUserName",function(data){
        console.log(data + " user connected");

        if(user.indexOf(data) > -1 ){
           socket.emit("user-exists",data+ " user already exist plz try another name ");
        }else{
            user.push(data);
            socket.emit("user",{username:data});
        }
    })
    socket.on("msg",function(data){
        io.sockets.emit("newmsg",data);
    })
})
 



httpServer.listen(3000,()=> console.log(`server is running ${url}`));