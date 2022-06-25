import React, { useState } from 'react';
import Socket from './Socketio';
import face from './imgs/emoji.png';
import clip from './imgs/attach.png';
import transaction from './imgs/send.png';
import microphone from './imgs/microphone.png';

export const Chat = ({ setRoom, rooms, idRoom, msjs, myAddress}) => {
    
    const [msj, setMsj] = useState("");

    const connectMetamask = (e) => {

    } 

    const send = (e) => {
      e.preventDefault();
      if(msj !== ""){
        const ROOMS = Object.assign({}, rooms);
        ROOMS[idRoom].msjs.push(msj);
        ROOMS[idRoom].msjsOwner.push(myAddress);
        console.log(ROOMS[idRoom].msjsOwner);
        ROOMS[idRoom].lastMsj = msj;
        setRoom(rooms);
        Socket.emit('sendMsj', rooms[idRoom]);
        setMsj("");
      }
    }// hay que sacar la id de su room, con nuestro.room1

    function whoMsj(i){
      let class_ = "";
      rooms[idRoom].msjsOwner[i] === myAddress ? class_ = 'msj-sent' : class_ = 'msj-received';

      return (
        <div className={class_}>
          <p>{msjs[i]}</p>
          <p className='time'>12:23 pm</p>
        </div>
      );
    }

  return (
    <div className='Chat'>
        <div className='messages'>
        {
                idRoom === (-1) && 
                <div className='advice'>
                  <h1>WhatsDapp</h1>
                  <h2>The first blockchain chat</h2>
                  <nav>
                    <h4>Add web3 friends</h4>
                    <h4>Decentralized messages</h4>
                    <h4>Token transactions</h4>
                    <h4>Share web3 statistics</h4>
                    <h4>Create groups and raise funds</h4>
                    <h4>NFT transactions</h4>
                  </nav>
                  <h3>Beta version, official release 09/24/2022</h3>
                  <form onSubmit={connectMetamask}>
                    <button>Connect to BSC Testnet</button>
                    <button>Connect to Rinkeby</button>
                  </form>
                </div>
              }
        {
            msjs.map((e, i) => 
            <div key={i}>
              {whoMsj(i)}
            </div>
            )
        }
        </div>
        <form className='form-send' onSubmit={send}>
            <img src={face} alt=""></img>
            <img src={clip} alt=""></img>
            <img src={transaction} alt=""></img>
            <input value={msj} onChange={e => setMsj(e.target.value)} type="text" placeholder='Write a message here'></input>
            <button>Send</button>
            <img src={microphone} alt=""></img>
        </form>
    </div>
  )
}