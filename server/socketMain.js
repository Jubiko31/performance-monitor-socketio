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

    socket.on('initPerfData', async (data) => {
        macAddress = data.macAddress;
        const mongoResponse = await checkAndAdd(data);
        console.log(mongoResponse);
    });

    socket.on('perfData', (data) => {
        console.log(data);
    });
};

const checkAndAdd = async (data) => {
    try {
        const doc = await Machine.findOne({ macAddress: data.macAddress });
        if (doc === null) {
            let machine = new Machine(data);
            await machine.save();
            return 'added new machine to mongodb 🚀';
        } else {
            return 'found matching machine';
        }
    } catch (error) {
        throw error;
    }
};


module.exports = socketMain;