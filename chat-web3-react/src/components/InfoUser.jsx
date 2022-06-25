import React from 'react';
import PhotoProfile from './imgs/usuario.jpg';
import PhotoMore from './imgs/more.png';

export const InfoUser = ({ hisAddress }) => {

  return (
    <div className='InfoUser'>
        <div>
            <img src={PhotoProfile}></img>
        </div>
        <div className='ml-1'>
            <p>{hisAddress}</p>
        </div>
    </div>
  )
}