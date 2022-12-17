import React from 'react'
import Popup from 'reactjs-popup';
import './popup.css';


const PopUp = () => {
    return(
        <Popup trigger={<button> Trigger</button>} position="right center">
        <div>Popup content here !!</div>
      </Popup>
    )
 
}

export default PopUp
