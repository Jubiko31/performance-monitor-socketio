import io from 'socket.io-client';

let socket = io.connect('http://localhost:8181');

socket.emit("clientAuth", "sdkmsdsd72g&^f")

export default socket;