import React, { Component } from "react";


class GuessForm extends Component  {

  state = {

  }

  renderSong = () => {
    // Shuffle tracks
    const shuffled = this.props.selectedPlaylist.tracks.sort(() => 0.5 - Math.random());

    // Get sub-array of first 5 elements after shuffling
    let selected = shuffled.slice(0, 5);

    // Grab the first track for MVP. will use other tracks later.
    let track1SpotifyID = selected[0].spotifyId

    return <iframe title="test" src={`https://open.spotify.com/embed/track/${track1SpotifyID}`} width="250" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  }
  

  render (){
    console.log('guess form tracks:', this.props.selectedPlaylist.tracks)
    
    return (
      <div className='GuessForm'>
        <h1>
          (GuessForm.js)
        </h1>
        {this.renderSong()}
        
      </div>
    
    )
  }
}

export default GuessForm;
