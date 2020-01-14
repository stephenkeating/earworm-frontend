import React, { Component } from "react";


class GuessForm extends Component  {

  state = {
    shuffledArray: [],
    currentTrack: '',
    trackGuess: ''
  }

  componentDidMount() {
    // Shuffle tracks
    const shuffled = this.props.selectedPlaylist.tracks.sort(() => 0.5 - Math.random());
    // Get sub-array of first 5 elements after shuffling
    let selected = shuffled.slice(0, 5);
    this.setState({shuffledArray: selected})

  }

  renderSpotifySong = () => {
    if (this.state.shuffledArray[0]) {

      // Grab the first track for MVP. will use other tracks later.
      let track1SpotifyID = this.state.shuffledArray[0].spotifyId
      console.log(this.state.shuffledArray[0].spotifyName)
      // this.setState({currentTrack: selected[0].spotifyName})
      return <iframe title="test" src={`https://open.spotify.com/embed/track/${track1SpotifyID}`} width="250" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    }
    
  }
  
  handleChange = (value) => {
    this.setState({trackGuess: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.trackGuess)
    console.log(this.state.currentTrack)
    console.log(this.state.currentTrack === this.state.trackGuess)
  }

  render (){
    // console.log('guess form tracks:', this.props.selectedPlaylist.tracks)
    console.log('guess form state:', this.state)
    
    return (
      <div className='GuessForm'>
        <h1>
          (GuessForm.js)
        </h1>
        {this.renderSpotifySong()}
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
