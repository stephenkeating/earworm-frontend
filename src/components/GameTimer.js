import React from 'react';

const GameTimer = (props) => {

  let timerWidth = {
    'width': `${(180 - props.seconds)*100/180 + 1}%`
  };

    return(
      <div className='game-timer'>
        <div className='game-timer-text'>
          Time Remaining: { props.seconds < 10 ? `0${ props.seconds }` : props.seconds }
        </div>
        <div className="progress-bar">
          <div className="inside-progress-bar" style={timerWidth}>
          </div>
        </div>
      </div>
    )

}

export default GameTimer;