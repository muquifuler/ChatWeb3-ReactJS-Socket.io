import io from 'socket.io-client';

let socket = io("//localhost:3002");

export default socket;