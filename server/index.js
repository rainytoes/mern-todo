import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

import Connection from './database/db.js';
import Routes from './routes/route.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Routes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('todoCreated', (todo) => {
    socket.broadcast.emit('todoCreated', todo);
  });

  socket.on('todoUpdated', (todo) => {
    socket.broadcast.emit('todoUpdated', todo);
  });

  socket.on('todoDeleted', (todo) => {
    socket.broadcast.emit('todoDeleted', todo);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

const PORT = 8000;

Connection();

server.listen(PORT, () => console.log(`Server running on PORT ${PORT} with Socket.IO support`));