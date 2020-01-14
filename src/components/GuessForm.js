import React, { Component } from "react";


class GuessForm extends Component  {

  state = {
    shuffledArray: [],
    currentTrack: 0,
    trackGuess: ''
  }

  componentDidMount() {
    // Shuffle tracks
    const shuffled = this.props.selectedPlaylist.tracks.sort(() => 0.5 - Math.random());
    // Get sub-array of first 5 elements after shuffling
    let selected = shuffled.slice(0, 5);
    this.setState({shuffledArray: selected})

  }

  renderSpotifySongplayer = () => {
    // wait for the shuffled array to load before loading the iframe
    if (this.state.shuffledArray[0]) {
      // Grab the first track for MVP. will use other tracks later.
      let track1SpotifyID = this.state.shuffledArray[this.state.currentTrack].spotifyId
      
      return <div className='spotify-player-div'>
              Press play to start the timer! <br></br>
              <iframe className='spotify-player-iframe' title="spotify-player" src={`https://open.spotify.com/embed/track/${track1SpotifyID}`} width="80" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              </div>
      } else {
      return <div>'Loading!'</div>
    }
    
  }
  
  handleChange = (value) => {
    this.setState({trackGuess: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.trackGuess)
    // console.log(this.state.shuffledArray[0].spotifyName.replace(/[^\w]/g, '').toLowerCase() === this.state.trackGuess.replace(/[^\w]/g, '').toLowerCase())
    if (this.state.shuffledArray[0].spotifyName.replace(/[^\w]/g, '').toLowerCase() === this.state.trackGuess.replace(/[^\w]/g, '').toLowerCase()) {
      alert("You win!")
    } else {
      alert("Guess Again...")
    }
  }

  render (){
    // console.log('guess form tracks:', this.props.selectedPlaylist.tracks)
    console.log('guess form state:', this.state)
    
    // if (document.querySelector('button')) {
    //   document.querySelector('button').click()
    // }
    return (
      <div className='GuessForm'>
        <h1>
          (GuessForm.js)
        </h1>
        {this.renderSpotifySongplayer()}
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          <input type="text" placeholder='Guess the Title' value={this.state.trackGuess} onChange={(e) => this.handleChange(e.target.value)} />
        </label>
        <input className='submit-button' type="submit" value="Submit" />
      </form>
      </div>
    
    )
  }
}

export default GuessForm;
