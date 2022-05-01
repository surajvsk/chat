const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    //res.send('<h1>Hello world</h1>');
});


app.use(express.static(path.join(__dirname, 'public')));

  io.on('connection', socket => {
    socket.on('chat message', (msg,username) => {
      socket.broadcast.emit('chat message', msg,username);
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});