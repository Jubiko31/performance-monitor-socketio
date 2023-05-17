const express = require('express');
const cluster = require('cluster');
const net = require('net');
const socketio = require('socket.io')
const socketMain = require('./socketMain')

const PORT = 8181;
const numProcesses = require('os').cpus().length;
const io_redis = require('socket.io-redis');
const farmash = require('farmash');
const { spawn } = require('child_process');

if (cluster.isMaster) {
    let workers = [];
    let spawn = function(i) {
        workers[i] = cluster.fork();
        workers[i].on('exit', function(code, signal) {
            spawn(i);
        });
    };

    for (var i = 0; i < numProcesses; i++) {
        spawn(i);
    }

    const worker_index = (ip, len) => {
        return farmash.fingerprint32(ip) % len;
    }

    const server = net.createServer({ pauseOnConnect: true }, (connection) => {
        let worker = workers[worker_index(connection.remoteAddress, numProcesses)];
        worker.send('sticky-session:connection', connection);
    });
    server.listen(PORT);
    console.log(`Master listening on port ${PORT}`);
} else {
    const server = app.listen(0, 'localhost');
    const io = socketio(server);
    
    io.adapter(io_redis({ host: 'localhost', port: 6379 }));
    io.on('connection', (socket) => {
        socketMain(io.socket);
    });

    process.on('message', (message, connection) => {
        if (message !== 'sticky-session:connection') {
            return;
        }

        server.emit('connection', connection);
        connection.resume();
    });
}
