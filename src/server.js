const http = require('http');

const express = require('express');

const app = express();

const server = http.createServer(app);

const io = require ('socket.io')(server);

const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.use(express.static(`${__dirname}/../client`));

console.log(`Listening on 127.0.0.1: ${port}`);


const onJoined = (sock) => {
};

io.sockets.on('connection', (socket) => {

 
  onJoined(socket);
  socket.on('disconnect', () => {
    socket.leave('room');
  });
});
server.listen(port);


