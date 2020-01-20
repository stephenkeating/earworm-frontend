import React from 'react';

const GameTimer = (props) => {

  let timerWidth = {
    'width': `${(120 - props.seconds)*100/120 + 1}%`
  };

    return(
      <div className='game-timer'>
        <div className='game-timer-text'>
          Seconds Remaining: { props.seconds < 10 ? `0${ props.seconds }` : props.seconds }
        </div>
        <div className="progress-bar">
          <div className="inside-progress-bar" style={timerWidth}>
          </div>
        </div>
      </div>
    )

}

export default GameTimer;