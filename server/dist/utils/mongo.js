import mongoose from 'mongoose';
import { exec } from 'child_process';
import { MONGO_URL, NODE_ENV } from './loadEnv.js';
const DB_URL = MONGO_URL + '/comfy';
mongoose.connection.once('open', () => {
    console.log('mongoDB connection ready');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});
const mongoConnect = async () => {
    if (NODE_ENV === 'development')
        exec('mongod --dbpath "G:/user tools/mongoDB/data"');
    await mongoose.connect(DB_URL);
};
const mongoDisconnect = async () => {
    await mongoose.disconnect();
};
export { DB_URL, mongoConnect, mongoDisconnect };
