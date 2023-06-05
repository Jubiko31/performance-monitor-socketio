const socketMain = (io, socket) => {
    socket.on('perfData', (data) => {
        console.log(data);
    });
};

module.exports = socketMain;