const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 8080

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

usernames = {}
joined = {}

io.on('connection', (socket) => {
    console.log(`New instance at id ${socket.id}`);
    joined[socket.id] = false

    socket.on("join", (name) => {
        joined[socket.id] = true
        usernames[socket.id] = name
        console.log(`${socket.id} joined as ${usernames[socket.id]}`)
        io.emit("userJoined", name, socket.id)
        io.emit("receive", name, `${socket.id} joined the room`)
    })

    

    socket.on('setName', (name) =>     {
        if (joined[socket.id]) {
            console.log(`${socket.id} set username from ${usernames[socket.id]} to ${name}`)
            io.emit("receive", usernames[socket.id], `Changed name to ${name}`)
            usernames[socket.id] = name
        }
    });

    socket.on("log", (msg) => {
        console.log(msg)
    })

    socket.on("send", (message) => {
        if (joined[socket.id]) {
            console.log(`New message from ${socket.id}: ${message}`)
            io.emit("receive", usernames[socket.id], message)
        }
    })


});
app.use(express.static('public'))

server.listen(process.env.PORT || port, () => console.log('listening on http://localhost:8080') );


// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => { 

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });


 
