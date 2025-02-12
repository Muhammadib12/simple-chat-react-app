import React from 'react';
import './InfoBar.css';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

function InfoBar({room}) {
  return (
    <div className='infoBar'>
        <div className='leftInnerContainer'>
                <img   className='onlineIcon' src={onlineIcon}  alt="Online Image" />
                <h3>{room}</h3>
        </div>
        <div className='RightInnerContainer'>
                <a href="/"><img src={closeIcon} alt="Close Image" /></a>
        </div>
    </div>
  )
}

export default InfoBar