import React, { Component } from "react";
import earWormGreen from '../EarWorm3.png'; 
import earWormRed from '../EarWorm4.png'; 

class ResultsSplash extends Component  {

  state = {
    buttonLabel: 'Submit Score',
    user: '',
    allGames: []
  }

  componentDidMount(){
    this.nameInput.focus();
    this.fetchAllGames(this.props.selectedPlaylist.id)
  }

  renderTrackResults = () => {
    function translateOutcome(outcome){
      if (outcome === 'Earworm!') {
        return <img className='results-img' src={earWormGreen} alt="earWorm" />
      } else if (outcome === 'Skipped') {
        return <img className='results-img' src={earWormRed} alt="earWorm" />
      } else {
        return <img className='results-img' src={earWormRed} alt="earWorm" />
      }
    }
    return this.props.trackOutcomes.map(function(outcome, i) {
      return <div className='track-outcome' key={outcome.id}>
                <span className='track-number-span'>{i + 1}.</span>&nbsp;{ translateOutcome(outcome.outcome)} { outcome.track.name} — {outcome.track.artists} 
              </div>; 
    })
  }

  handleChange = (value) => {
    this.setState({user: value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({buttonLabel: 'Edit Name'})
    fetch(`http://localhost:3000/games/${this.props.currentGame.id}`, {
      method:'PUT',
      headers: { 
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.user
      })
    })
      .then(r => r.json())
      .then(gameObject => console.log(gameObject))
      .catch(err => console.log(err))
  }

  calculateGameScore = () => {
    return this.props.trackOutcomes.filter(trackOutcome => trackOutcome.outcome === 'Earworm!').length
  }

  // Called in Component Did Mount with this.props.selectedPlaylist.id. Filtering for the current playlist and where a user submitted a name.
  fetchAllGames = (selectedPlaylistId) => {
    fetch(`http://localhost:3000/games/`)
      .then(r => r.json())
      .then(allGames => this.setState({allGames: allGames.filter(game => game.playlist_id === selectedPlaylistId).filter(game => game.user !== null)}))
      .catch(err => console.log(err))
  }
  
  //dont directly mutate state. DRY the filter. think about calculating correct answers on the backend. 
  // right now this is sorting the answers in each game...
  renderHighScores = () => {
    return this.state.allGames.sort(function(a, b) {
      return b.answers.filter(answer => answer.outcome === 'Earworm!').length - a.answers.filter(answer => answer.outcome === 'Earworm!').length
    })
  }
  
  render (){
    console.log(this.props)
    console.log(this.state)
    console.log(this.renderHighScores())
    
    return (
      <div className='results-splash'>
        <div className='results-instructions'>
          your score: <span className='score-span'>{this.calculateGameScore()}</span>
        </div>
        {this.renderTrackResults()}
        <div className='save-game-form'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>
              <input ref={(input) => { this.nameInput = input; }} type="text" placeholder='Enter Your Name' value={this.state.user} onChange={(e) => this.handleChange(e.target.value)} />
            </label>
            <input className='submit-results-button' type="submit" value={this.state.buttonLabel} />
          </form>
          <button className='play-again-button' onClick={this.props.playAgain}>Play Again!</button>
        </div>
      </div>
    )
  }
}

export default ResultsSplash;
