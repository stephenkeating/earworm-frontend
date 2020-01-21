import React from "react";
import earWorm from '../EarWorm3.png'; 

const Welcome = (props) => {
  
    return (
      <div className='welcome-page'>
        <div className='welcome-logo'>
          <img className='welcome-img' src={earWorm} alt="earWorm" />
        </div>
        <div className='welcome-header' >
          welcome to earworm
        </div>
        <div className='welcome-body' >
          A race against the clock to guess the titles of songs. 
          <br></br>
          Can you place on the leaderboard?
        </div>
        <div className='welcome-body'>
          <button onClick={props.playAgain} className='welcome-play-button'>PLAY</button>
        </div>
      </div>
    );
  
}

export default Welcome;

