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
            socket.emit('leave-room', data + '-' + 'hello');
        });
    });
};
export default setupSocket;
