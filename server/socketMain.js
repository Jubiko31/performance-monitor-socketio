const socketMain = (io, socket) => {
    socket.on('clientAuth', (authKey) => {
        if(authKey === process.env.AUTH_KEY) {
            socket.join('clients');
        } else if (authKey === process.env.UI_CLIENT_KEY) {
            socket.join('ui');
        } else {
            socket.disconnect(true);
        }
    });

    socket.on('perfData', (data) => {
        console.log(data);
    });
};

module.exports = socketMain;