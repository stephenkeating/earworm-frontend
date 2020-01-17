import React from "react";

const ResultsSplash = (props) => {

  const renderTrackResults = () => {
    return props.trackOutcomes.map(outcome => {
      return <div className='track-outcome' key={outcome.id}>
        {outcome.outcome} {outcome.track.name} by {outcome.track.artists} 
        </div>
    })
  }
  

    return (
      <div className='results-splash'>
        <h1>Here's how you did:</h1>
        {renderTrackResults()}
        <button className='play-again-button' onClick={props.playAgain}>Play Again!</button>
      </div>
    )
  
}

export default ResultsSplash;