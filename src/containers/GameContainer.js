import React, { Component } from "react";
import TrackPlayer from '../components/TrackPlayer';
import GameTimer from '../components/GameTimer';
import GuessForm from "../components/GuessForm";
import distance from 'jaro-winkler';

class GameContainer extends Component  {

  state = {
    gameTracks: [],
    currentTrack: 0,
    trackGuess: '',
    seconds: 3,
    counterID: '',
    flashMessage: ''
  }

  componentDidMount() {
    // filter out tracks with skit in the title
    const filtered = this.props.selectedPlaylist.tracks.filter(track => !track.name.toLowerCase().includes('skit'))
    // Shuffle tracks
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    // Get sub-array of first 5 elements after shuffling. (Decided to use all tracks rather than just 5)
    // let selected = shuffled.slice(0, 10)
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
  
  componentWillUnmount() {
    clearInterval(this.state.counterID)
  }

  // Think about moving the 'answer' post to the end of the game for a one-time create of all outcomes
  trackOutcome = (outcome) => {
    fetch(`http://localhost:3000/answers`, {
      method:'POST',
      headers: { 
        'content-type': 'application/json',
        'accept': 'application/json'
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

  handleSkip = () => {
    this.trackOutcome('Skipped')
    this.setState({flashMessage: ("Skipped! That song was: " + this.state.gameTracks[this.state.currentTrack].name + ' by ' + this.state.gameTracks[this.state.currentTrack].artists)})
    // alert("Skipped!\nThat song was:\n" + this.state.gameTracks[this.state.currentTrack].name)
    this.setState({currentTrack: this.state.currentTrack + 1, trackGuess: '', seconds: this.state.seconds - 5})
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
    // Strip punctuation, spaces, and capitalization from track titles and guess to make guessing easier
    let currentTrackSplitAtComma = this.state.gameTracks[this.state.currentTrack].name.split(',')[0].replace(/[^\w]/g, '').toLowerCase()
    let currentTrackBeforeDash = this.state.gameTracks[this.state.currentTrack].name.split('-')[0].replace(/[^\w]/g, '').toLowerCase()
    let currentTrackBeforeParenthesis = this.state.gameTracks[this.state.currentTrack].name.split('(')[0].replace(/[^\w]/g, '').toLowerCase()
    // not working: let currentTrackBetweenParenthesis = this.state.gameTracks[this.state.currentTrack].name.split('(')[1] ? this.state.gameTracks[this.state.currentTrack].name.split('(')[1].replace(/[^\w]/g, '').toLowerCase() : this.state.gameTracks[this.state.currentTrack].name
    let currentTrackBeforePtPeriod = this.state.gameTracks[this.state.currentTrack].name.split('Pt.')[0].replace(/[^\w]/g, '').toLowerCase()
    // console.log('winning strings: ', currentTrackSplitAtComma, currentTrackBeforeDash, currentTrackBeforeParenthesis)
    // let currentTrackAfterParenthesis = this.state.gameTracks[this.state.currentTrack].name.split('(')[1].replace(/[^\w]/g, '').toLowerCase()
    let guess = this.state.trackGuess.replace(/[^\w]/g, '').toLowerCase()
    let jarowBeforePunctuationScore = distance(this.state.trackGuess.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), this.state.gameTracks[this.state.currentTrack].name.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), { caseSensitive: false })
    // console.log(jarowBeforePunctuationScore)
    let jarowWholeStringScore = distance(this.state.trackGuess, this.state.gameTracks[this.state.currentTrack].name, { caseSensitive: false })
    // console.log(jarowWholeStringScore)
    // console.log('user\'s guess:', guess)
    if (guess === currentTrackSplitAtComma
      || guess === currentTrackBeforeDash 
      || guess === currentTrackBeforeParenthesis 
      || guess === currentTrackBeforePtPeriod 
      || jarowBeforePunctuationScore > .9
      || jarowWholeStringScore > .85) {
      this.trackOutcome('Earworm!')
      // alert("You got it!\nThat song was:\n" + this.state.gameTracks[this.state.currentTrack].name + ' by ' + this.state.gameTracks[this.state.currentTrack].artists)
      this.setState({flashMessage: ("You got it! That song was: " + this.state.gameTracks[this.state.currentTrack].name + ' by ' + this.state.gameTracks[this.state.currentTrack].artists)})
      this.setState({currentTrack: this.state.currentTrack + 1, trackGuess: ''})
    } else {
      // alert("Guess Again...\n2 seconds deducted")
      this.setState({flashMessage: ("Guess Again...2 seconds deducted")})
      this.setState({ seconds: this.state.seconds - 2})
    }
  }

  render (){
    // console.log(this.state.gameTracks[this.state.currentTrack] ? this.state.gameTracks[this.state.currentTrack].name : '')
    // console.log(this.state.gameTracks[this.state.currentTrack] ? this.state.gameTracks[this.state.currentTrack] : '')
    // console.log(this.props.currentGame)
    return (
      <div className='game'>
        <h1>
          Press play and guess the track's title before the timer runs out!
        </h1>
        <GameTimer 
          seconds={this.state.seconds}
        />
        {this.renderSpotifySongplayer()}
        <GuessForm
          trackGuess={this.state.trackGuess}
          handleChange={this.handleChange}
          handleSkip={this.handleSkip}
          handleSubmit={this.handleSubmit}
        />
        <br></br>
        <div className='flash-message'>
          {this.state.flashMessage}
        </div>
      </div>
    )
  }
}

export default GameContainer;

// Testing of various jaro-winkler scores:
  // console.log(distance(guess, this.state.gameTracks[this.state.currentTrack].name.replace(/[^\w]/g, ''), { caseSensitive: false })) 
  // console.log(distance(this.state.trackGuess, this.state.gameTracks[this.state.currentTrack].name.replace(/[^\w]/g, ''), { caseSensitive: false })) 
  // console.log(distance(guess, this.state.gameTracks[this.state.currentTrack].name, { caseSensitive: false })) 
  // console.log(distance(this.state.trackGuess, this.state.gameTracks[this.state.currentTrack].name, { caseSensitive: false })) 
  // console.log(distance(this.state.trackGuess, this.state.gameTracks[this.state.currentTrack].name, { caseSensitive: false })) 
  // console.log(distance(this.state.trackGuess.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), this.state.gameTracks[this.state.currentTrack].name.split('(')[0].split('-')[0].replace(/[^\w]/g, ''), { caseSensitive: false })) 