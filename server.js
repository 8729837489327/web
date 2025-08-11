const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve files from public folder

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('login', (username) => {
    socket.username = username;
    io.emit('message', { user: 'Server', text: `${username} joined the chat` });
  });

  socket.on('message', (text) => {
    if (!socket.username) return; // ignore if not logged in
    io.emit('message', { user: socket.username, text });
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('message', { user: 'Server', text: `${socket.username} left the chat` });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
