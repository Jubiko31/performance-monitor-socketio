require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const Machine = require('./models/Machine');

const socketMain = (io, socket) => {
    let macAddress;
    socket.on('clientAuth', (authKey) => {
        if(authKey === process.env.AUTH_KEY) {
            socket.join('clients');
        } else if (authKey === process.env.UI_CLIENT_KEY) {
            socket.join('ui');
        } else {
            socket.disconnect(true);
        }
    });

    socket.on('initPerfData', (data) => {
        macAddress = data.macAddress;
    });

    socket.on('perfData', (data) => {
        console.log(data);
    });
};

module.exports = socketMain;