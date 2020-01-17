import React from 'react';

const GameTimer = (props) => {

    return(
      <div className='game-timer'>
        <h1>
          Seconds Remaining: <br></br>
          { props.seconds < 10 ? `0${ props.seconds }` : props.seconds }
        </h1>
      </div>
    )

}

export default GameTimer;