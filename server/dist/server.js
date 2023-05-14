import { createServer } from 'https';
import { readFileSync } from 'fs';
import { SERVER_URL, SERVER_PORT } from './utils/loadEnv.js';
import { mongoConnect } from './utils/mongo.js';
import app from './app.js';
import setupSocket from './routes/socket/socket.route.js';
const server = createServer({
    key: readFileSync('key.pem'),
    cert: readFileSync('cert.pem'),
}, app);
setupSocket(server);
(async function startServer() {
    await mongoConnect();
    server.listen(SERVER_PORT, () => {
        console.log('\x1b[36m', `${SERVER_URL}:${SERVER_PORT}`, '\x1b[0m');
    });
})();
