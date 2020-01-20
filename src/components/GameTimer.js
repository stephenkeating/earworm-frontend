import React from 'react';

const GameTimer = (props) => {

    return(
      <div className='game-timer'>
          Seconds Remaining: <br></br>
          { props.seconds < 10 ? `0${ props.seconds }` : props.seconds }
      </div>
    )

}

export default GameTimer;