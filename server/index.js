import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createServer } from "http"; 
import { Server } from 'socket.io';

import Connection from "./database/db.js";
import Route from "./routes/route.js";

const app = express();
const httpServer = createServer(app); 

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Route);


app.get('/',(req,res)=>{
  res.send("hello sunny this is working");
})

const PORT = 8025;

Connection();

httpServer.listen(PORT, () => {

  console.log(`server is running on port ${PORT}`);
});

// Initialize socket.io and attach it to the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

let users = [];

const addUser = (userData, socketId) => {
   
    !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
}

const removeUser = (socketId) => {
  
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
 
    return users.find(user => user.sub === userId);
}

io.on('connection', (socket) => {
    console.log('user connected')
    //connect
    socket.on("addUser", userData => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    })

    //send message
    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        if (user && user.socketId) {
            io.to(user.socketId).emit('getMessage', data);
        } else {
            console.log('User not found for userId:', data.receiverId);
            socket.emit('errorMessage', 'User not found');
        }
    })

    //disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})


