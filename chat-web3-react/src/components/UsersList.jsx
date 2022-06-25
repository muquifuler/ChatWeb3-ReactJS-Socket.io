import React from 'react';
import PhotoProfile from './imgs/usuario.jpg';

export const UsersList = ({ rooms, idRoom, setIdRoom, setMsjs, setHisAddress }) => {

  return (
    <div className='UsersList'>
        {
            rooms.map((e, i) => 
            <div className={ idRoom === i ? "block_selected" : "block" } key={i} onClick={ (e) => {
                e.preventDefault();
                setIdRoom(i);
                setMsjs(rooms[i].msjs);
                setHisAddress(rooms[i].address1);
            }} id={i}>
                <div>
                    <img src={PhotoProfile} alt=""></img>
                </div>
                <div className='ml-1'>
                    <p>{
                        e.address1.length > 12 ? e.address1.substring(0,12)+"..." : e.address1 
                    }</p>
                    <p>{
                        e.lastMsj.length > 12 ? e.lastMsj.substring(0,12)+"..." : e.lastMsj 
                    }</p>
                </div>
                <div className='time'>
                    <p>8:15 pm</p>
                </div>
            </div>
            )
        }
    </div>
  )
}