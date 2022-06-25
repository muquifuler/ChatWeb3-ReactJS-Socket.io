// Todo los datos desde la gente que agregas hasta tus convesaciones con ellos,
// se guardan en la blockchain a cambio de una pequeña cantidad de gas
// deberás pulsar en -> Guardar datos para guardar el estado actual del chat

// Las transacciones de tokens o NFT no hace falta guardarlas esas si se quedan hechas

import React, { useState } from 'react';
import Socket from './components/Socketio';
import './App.css';
import { InfoMe } from './components/InfoMe';
import { InfoUser } from './components/InfoUser';
import { UsersList } from './components/UsersList';
import { Chat } from './components/Chat';

function App() {

  const [a, setA] = useState(""); //

  const [address, setAddress] = useState("0xC0527FD0C6b743439e06a4d40c9f6E880F871354".toUpperCase()); 

  const [rooms, setRoom] = useState([]);
  const [idRoom, setIdRoom] = useState(-1);

  const [msjs, setMsjs] = useState([]);
  const [hisAddress, setHisAddress] = useState("");

  Socket.on('setRoom', (room) => {
    setRoom([...rooms, room]);
  })

  Socket.on('getMsj', (newRoom) => {
    const ROOMS = Object.assign({}, rooms);

    for(let i=0; i<rooms.length; i++){
        if(ROOMS[i].room0 === newRoom.room0){
          ROOMS[i].msjs = newRoom.msjs;
          ROOMS[i].msjsOwner = newRoom.msjsOwner;
          setRoom(rooms);
          if(i === idRoom){
            setMsjs(newRoom.msjs);
          }                                                      // El problema es que me carga los mensajes si o si independitemente de en que chat este
                                                                // , con esto se soluciona pero idRoom aqui llega con el puto valor anterior WTF
        }
    }
  })


  const set = (e) => {
    e.preventDefault();
    setAddress(a);
    setA("");
  }

  return (
      <div className="App">
          <div className='locura'>
            <form onSubmit={set}>
              <p value={address}> </p>
              <input value={a} onChange={e => setA(e.target.value)} type="text"/>
              <button>Send</button>
            </form>
          </div>
          <>
            <div className='izq'>
              <InfoMe myAddress={address}/>
              <UsersList rooms={rooms} idRoom={idRoom} setIdRoom={setIdRoom} setMsjs={setMsjs} setHisAddress={setHisAddress}/>
            </div>
            <div className='der'>
              <InfoUser hisAddress={hisAddress} />
              <Chat setRoom={setRoom} rooms={rooms} idRoom={idRoom} msjs={msjs} myAddress={address} />
            </div>
          </>
      </div>
  );
}

export default App;
