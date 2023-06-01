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
            console.log('react client has joined.')
            Machine.find({}).exec((err, docs) => {
                if (err) {
                  console.error(err);
                } else {
                  docs.forEach((machine) => {
                    machine.isActive = false;
                    io.to('ui').emit('data', machine);
                  });
                }
            });
        } else {
            socket.disconnect(true);
        }
    });

    socket.on('disconnect', () => {
        Machine.find({ macAddress }).exec((err, docs) => {
            if(docs.length > 0) {
                docs[0].isActive = false;
                io.to('ui').emit('data', docs[0]);
            }
        })
    })

    socket.on('initPerfData', async (data) => {
        macAddress = data.macAddress;
        const mongoResponse = await checkAndAdd(data);
        console.log(mongoResponse);
    });

    socket.on('perfData', (data) => {
        console.log('ping.');
        io.to('ui').emit('data', data);
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