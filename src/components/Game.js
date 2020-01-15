import React, { Component } from "react";


class Game extends Component  {

  state = {
    filteredAndShuffledArray: [],
    currentTrack: 0,
    trackGuess: '',
    seconds: 120,
    timerStarted: false,
    score: 0
  }

  componentDidMount() {
    // filter out tracks with skit in the title
    const filtered = this.props.selectedPlaylist.tracks.filter(track => !track.spotifyName.toLowerCase().includes('skit'))
    // Shuffle tracks
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    // Get sub-array of first 5 elements after shuffling. (Decided to use all tracks rather than just 5)
    // let selected = shuffled.slice(0, 10)
    this.setState({filteredAndShuffledArray: shuffled})
    this.startCountdownTimer()
  }

  componentWillUnmount() {
    clearInterval(this.startCountdownTimer)
  }

  // Countdown timer (could add minutes if need. setting at 30 seconds to start)
  startCountdownTimer = () => {
    if (!this.state.timerStarted) {
      this.setState({timerStarted: true})
      setInterval(() => {
        if (this.state.seconds > 0) {
          this.setState(({ seconds: this.state.seconds - 1 }) )
        }
      }, 1000)
    }
  }

  handleSkip = () => {
    alert("Skipped!\nThat song was:\n" + this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName)
      this.setState({currentTrack: this.state.currentTrack + 1, trackGuess: '', seconds: this.state.seconds - 5})
  }
  

  renderSpotifySongplayer = () => {
    // wait for the shuffled array to load before loading the iframe
    if (this.state.filteredAndShuffledArray[0]) {
      // Grab the first track for MVP. will use other tracks later.
      let track1SpotifyID = this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyId
      
      if (this.state.seconds <= 0) {
        return <div className='times-up'>
                  <div>
                    <h1>
                      Times Up! <br></br>
                      You correctly guessed {this.state.score} song(s)
                    </h1>
                  </div>
                  <div>
                    The last track's title was:
                    <br></br>
                    {this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName}
                  </div>
                </div>
        } else {
          return <div className='game-timer-and-iframe'>
                    <h1>
                      Press play and guess the track's title before the timer runs out!
                    </h1>
                    <h1>
                      Seconds Remaining: <br></br>
                      { this.state.seconds < 10 ? `0${ this.state.seconds }` : this.state.seconds }
                    </h1>
                    <div className='spotify-player-iframe' >
                      <iframe title="spotify-player" src={`https://open.spotify.com/embed/track/${track1SpotifyID}`} width="80" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                      <label>
                        <input type="text" placeholder='Guess the Title' value={this.state.trackGuess} onChange={(e) => this.handleChange(e.target.value)} />
                      </label>
                      <input className='submit-button' type="submit" value="Submit" />
                    </form>
                    <br></br>
                    <button className='skip-button' onClick={this.handleSkip}>Skip (5 second penalty)</button>
                  </div>
        }
      } 
  }
  
  handleChange = (value) => {
    this.setState({trackGuess: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Strip punctuation, spaces, and capitalization from track titles and guess to make guessing easier
    let currentTrackSplitAtComma = this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName.split(',')[0].replace(/[^\w]/g, '').toLowerCase()
    let currentTrackBeforeDash = this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName.split('-')[0].replace(/[^\w]/g, '').toLowerCase()
    let currentTrackBeforeParenthesis = this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName.split('(')[0].replace(/[^\w]/g, '').toLowerCase()
    // not working: let currentTrackBetweenParenthesis = this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName.split('(')[0] ? this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName.split('(')[1].replace(/[^\w]/g, '').toLowerCase() : this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName
    let currentTrackBeforePtPeriod = this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName.split('Pt.')[0].replace(/[^\w]/g, '').toLowerCase()
    console.log('winning strings: ', currentTrackSplitAtComma, currentTrackBeforeDash, currentTrackBeforeParenthesis)
    // let currentTrackAfterParenthesis = this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName.split('(')[1].replace(/[^\w]/g, '').toLowerCase()
    let guess = this.state.trackGuess.replace(/[^\w]/g, '').toLowerCase()
    console.log('user\'s guess:', guess)
    if (guess === currentTrackSplitAtComma || guess === currentTrackBeforeDash || guess === currentTrackBeforeParenthesis || guess === currentTrackBeforePtPeriod) {
      alert("You got it!\nThat song was:\n" + this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName)
      this.setState({currentTrack: this.state.currentTrack + 1, trackGuess: '', score: this.state.score + 1})
    } else {
      alert("Guess Again...\n2 seconds deducted")
      this.setState({ seconds: this.state.seconds - 2})
    }
  }

  render (){
    console.log(this.state.filteredAndShuffledArray[this.state.currentTrack] ? this.state.filteredAndShuffledArray[this.state.currentTrack].spotifyName : '')
    return (
      <div className='game'>
        {this.renderSpotifySongplayer()}
      </div>
    )
  }
}

export default Game;
