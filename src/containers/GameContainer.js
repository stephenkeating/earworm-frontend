import React, { Component } from "react";
import TrackPlayer from '../components/TrackPlayer';
import GameTimer from '../components/GameTimer';
import GuessForm from "../components/GuessForm";
import GuessAlgorithm from "../components/GuessAlgorithm";

const BASE_URL = 'https://earworm-backend.herokuapp.com';
const ANSWERS_URL = BASE_URL + '/answers';

class GameContainer extends Component  {

  state = {
    gameTracks: [],
    currentTrack: 0,
    trackGuess: '',
    seconds: 180,
    counterID: '',
    flashMessage: '',
    flashVisible: true,
    flashTimeoutID: ''
  }

  componentDidMount() {
    // filter out tracks with skit in the title
    const filtered = this.props.selectedPlaylist.tracks.filter(track => !track.name.toLowerCase().includes('skit'))
    // Shuffle tracks
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    this.setState({gameTracks: shuffled})
    this.countdownTimer()
  }
  
  // includes the outcome for the track that was playing when time ran out
  componentDidUpdate(prevState) {
    if (prevState.seconds !== this.state.seconds && this.state.seconds <= 0) {
      this.trackOutcome('Time ran out')
      this.props.showResults()
    }
  }
  
  // right now I'm only clearing the final flash message timeout. could throw an error 
  componentWillUnmount() {
    clearInterval(this.state.counterID)
    clearTimeout(this.state.flashTimeoutID)
  }

  // Think about moving the 'answer' post to the end of the game for a one-time create of all outcomes
  trackOutcome = (outcome) => {
    fetch(ANSWERS_URL, {
      method:'POST',
      headers: { 
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': 'https://earworm.netlify.com/'
      },
      body: JSON.stringify({
        game_id: this.props.currentGame.id,
        track_id: this.state.gameTracks[this.state.currentTrack].id,
        outcome: outcome
      })
    })
      .then(r => r.json())
      .then(trackOutcomeObject => this.props.addTrackToTrackOutcomes(trackOutcomeObject))
      .catch(err => console.log(err))
  }

  // Countdown timer (could add minutes if needed. Set at 30 seconds to start)
  countdownTimer = () => {
    // put the ID of the interval into state in order to clear the interval on component unmount
    let counterID = setInterval(() => {
      this.setState(prevState => {
        return { seconds: prevState.seconds - 1 } 
      })
    }, 1000)
    this.setState({counterID})
  }

  showFlashMessage = (message) => {
    this.setState({flashMessage: message, flashVisible: true})
    let flashTimeoutID = setTimeout(() => {
      this.setState({flashVisible: false})
    }, 3000)
    this.setState({flashTimeoutID})
  }

  handleSkip = () => {
    this.trackOutcome('Skipped')
    this.setState({visible: true, currentTrack: this.state.currentTrack + 1, trackGuess: '', seconds: this.state.seconds - 5})
    this.showFlashMessage("SKIPPED: " + this.state.gameTracks[this.state.currentTrack].name + ' by ' + this.state.gameTracks[this.state.currentTrack].artists)
  }

  renderSpotifySongplayer = () => {
    // wait for the gameTracks to load before loading the iframe
    if (this.state.gameTracks[0]) {
      // Grab the current track for the iframe
      let currentTrackSpotifyId = this.state.gameTracks[this.state.currentTrack].spotify_id
      return <TrackPlayer
                currentTrackSpotifyId={currentTrackSpotifyId}
              />
      } 
  }

  handleChange = (value) => {
    this.setState({trackGuess: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.trackGuess.length < 1) {
      this.showFlashMessage("ENTER A GUESS OR SKIP")
    } else {
      let trackName = this.state.gameTracks[this.state.currentTrack].name
      let guess = this.state.trackGuess.replace(/[^\w]/g, '').toLowerCase()
      
      if ( GuessAlgorithm(trackName, guess) ) {
        this.trackOutcome('Earworm!')
        this.setState({currentTrack: this.state.currentTrack + 1, trackGuess: ''})
        this.showFlashMessage("EARWORM! " + trackName + ' by ' + this.state.gameTracks[this.state.currentTrack].artists)
      } else {
        this.setState({ seconds: this.state.seconds - 2})
        this.showFlashMessage("GUESS AGAIN...2 SECS DEDUCTED")
      }
    }
  }

  render (){
    
    return (
      <div className='game'>
        <div className='game-title-div'>
          {this.props.selectedPlaylist.name.toLowerCase()}
        </div>
        <div className={this.state.flashVisible ? 'fadeIn flash-message' : 'fadeOut flash-message'}>
          ▼ PRESS PLAY ▼
        </div>
        {this.renderSpotifySongplayer()}
        
        <GuessForm
          trackGuess={this.state.trackGuess}
          handleChange={this.handleChange}
          handleSkip={this.handleSkip}
          handleSubmit={this.handleSubmit}
        />
        <GameTimer 
          seconds={this.state.seconds}
        />
        <div className={this.state.flashVisible ? 'fadeIn flash-message' : 'fadeOut flash-message'}>
          {this.state.flashMessage}
        </div>
      </div>
    )
  }
}

export default GameContainer;