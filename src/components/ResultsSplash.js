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


//from old game component:
      // return <div className='times-up'>
        //           <div>
        //             <h1>
        //               Times Up! <br></br>
        //               You correctly guessed {this.state.score} song(s)
        //             </h1>
        //           </div>
        //           <div>
        //             The last track was:
        //             <br></br>
        //             {this.state.gameTracks[this.state.currentTrack].name} by {this.state.gameTracks[this.state.currentTrack].artists}
        //           </div>
        //         </div>