import React, { useState/*, useRef*/  } from 'react';
import Socket from './Socketio';
import PhotoProfile from './imgs/usuario.jpg';
import PhotoMore from './imgs/moreoptions.png';
import PhotoNewChat from './imgs/addfriend.png';
import PhotoExit from './imgs/exit.png';

export const InfoMe = ({ myAddress }) => {

    const [friendAddress, setFriendAddress] = useState(""); // address friend
    const [openClose, openRoom] = useState(false);

  return (
    <div className='InfoMe'>
        {
            openClose &&

        <div className='newUser'>
            <form onSubmit={ (e) => {
                e.preventDefault();
                Socket.emit('newChat', myAddress, friendAddress.toUpperCase());
                setFriendAddress("");
            }}>
                <img onClick={ () => {
                    openRoom(false);
                }} src={PhotoExit} alt=""></img>
                <p>Write your friend's address</p>
                <input value={friendAddress} onChange={e => setFriendAddress(e.target.value)} type="text" placeholder='Write an address here'></input>
                <button>Add</button>
            </form>
        </div>
        }
        <div>
            <img src={PhotoProfile} alt=""></img>
        </div>
        <div>
            <p>{myAddress.substring(0,8)+"..."}</p>
        </div>
        <div className='flex'>
            <img onClick={ () => {
                openRoom(true);
            }}src={PhotoNewChat} alt=""></img>
            <img src={PhotoMore} alt=""></img>
        </div>
    </div>
  )
}