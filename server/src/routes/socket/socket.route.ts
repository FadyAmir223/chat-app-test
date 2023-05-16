import { Server } from 'socket.io';

import { CLIENT_PORT, CLIENT_URL } from '../../utils/loadEnv.js';

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: `${CLIENT_URL}:${CLIENT_PORT}`,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('client connected: ', socket.id);

    socket.on('disconnect', (reason) => {
      console.log('client disconnected: ', reason);
    });

    socket.on('join_room', (data) => {
      console.log(data);
      // socket.join(data)
      socket.emit('leave-room', data + '-' + 'hello');
    });

    // socket.to(room).emit('receive_message', {
    //   message: `${username} has joined the chat room`,
    //   username: CHAT_BOT,
    // });

    // socket.emit('receive_message', {
    //   message: `Welcome ${username}`,
    //   username: CHAT_BOT,
    // });

    // let chatRoom = '';
    // let allUsers = [];

    // chatRoom = room;
    // allUsers.push({ id: socket.id, username, room });
    // chatRoomUsers = allUsers.filter((user) => user.room === room);
    // socket.to(room).emit('chatroom_users', chatRoomUsers);
    // socket.emit('chatroom_users', chatRoomUsers);
  });
};

export default setupSocket;
