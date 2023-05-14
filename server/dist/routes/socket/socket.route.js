import { Server } from 'socket.io';
import { CLIENT_PORT, CLIENT_URL } from '../../utils/loadEnv.js';
const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: `${CLIENT_URL}:${CLIENT_PORT}`,
        },
    });
    io.on('connection', (socket) => {
        console.log('client connected: ', socket.id);
        socket.on('disconnect', (reason) => {
            console.log('client disconnected: ', reason);
        });
        socket.join('clock-room');
    });
    setInterval(() => {
        io.to('clock-room').emit('time', 'msg');
    }, 10000);
};
export default setupSocket;
