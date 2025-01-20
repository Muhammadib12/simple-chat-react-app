import express from 'express';
import { Server as SocketServer } from 'socket.io';
import { createServer } from 'http';
import path from 'path'; // مهم لخدمة الملفات الثابتة
import cors from 'cors';
import { addUser, removeUser, getUser, getUsersInRoom } from './users.js';

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "UPDATE", "DELETE"],
  },
});

// إعداد CORS
app.use(cors());

// خدمة الملفات الثابتة من React
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/build')));

// نقطة النهاية للـ API
io.on('connection', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: user.name, text: message });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
    }
  });
});

// إذا لم يتم العثور على أي مسار، أرسل ملف index.html من React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client',"dist", 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
