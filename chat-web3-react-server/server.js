const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const servidor = http.createServer(express());

const io = socketio(servidor,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

let users = 0;

io.on('connection', socket => {

    users++;

    /*
        Setear conversaciones o sea chats nuevos segun información de 
        blockchain
        llamar 'newChat'
    */

    console.log(`Connected: ${socket.id}`);
    console.log(`Users online: ${users}`);
    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.id}`);
        users--;
    });
/*
    socket.on('setId', (i) => {
        io.to(room0).emit('getId', i);
    });
*/

    socket.on('sendMsj', (room) => {
        let newRoom = {
            address0: room.address1,
            address1: room.address0,
            room0: room.room1,
            room1: room.room0,
            msjs: room.msjs,
            msjsOwner: room.msjsOwner,
            lastMsj: room.lastMsj,
        }
        io.to(room.room1).emit('getMsj', newRoom);
    });
/*
    socket.on('sendMsj2', (room, idRoom, roomMsj) => {
        console.log(roomMsj);
        io.to(room.room0).to(room.room1).emit('receiveMsj', room, idRoom, roomMsj);
    });

    socket.on('getRoom', (room, id) => {
        io.to(room.room0).emit('getMsjs', room, id);
    });
*/
    socket.on('newChat', (address0, address1) => {

        let room = {
            address0,
            address1,
            room0: address0+""+address1,
            room1: address1+""+address0,
            msjs: ["Nuevo chat creado!"],
            msjsOwner: ["0x00000000000"],
            lastMsj: "Nuevo chat creado!",
        }

        socket.join(room.room0);
        console.log("join: "+room.room0)
        io.to(room.room0).emit("setRoom", room);
        //io.to(room.room1).emit("setRoom", room, false);// si es false tiene que joiner en la room
    });
/*
    socket.on('joinRoom', (room) => {
        socket.join(room.room1);
        io.to(room.room1).emit("setRoom", room, true);
    });*/
/*
    socket.on('loadChats', (address0, address1) => {
        for(let i=0; i<chats.length; i++){
            if(address0 == chats[i].address0){
                socket.join(chats[i].room);
            }
        }
        chats.push(chat);
        let ultPos = chats.length-1;

        chats[ultPos].address0 = address0;
        chats[ultPos].address1 = address1;
        chats[ultPos].room0 = address0+""+address1;
        chats[ultPos].room1 = address1+""+address0;
        chats[ultPos].lastMsj = chats[ultPos].msjs[chats[ultPos].msjs.length-1];

        socket.join(chats[ultPos].room);
        io.to(chats[ultPos].room).emit("setRoom", chats[ultPos]);
    });
*/
});

servidor.listen(3002, () => console.log("Servidor inicializado"));
