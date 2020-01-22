import React, { Component } from "react";
import earWormGreen from '../EarWorm3.png'; 
import earWormRed from '../EarWorm4.png'; 

class ResultsSplash extends Component  {

  state = {
    showForm: true,
    user: '',
    topTenHighScores: []
  }

  componentDidMount(){
    // this.nameInput.focus();
    // this.setState({topTenHighScores: this.props.selectedPlaylist.high_scores.slice(0,10)})
    this.fetchHighScores(this.props.selectedPlaylist.id)
  }
  
  // componentDidUpdate(){
  //   this.fetchHighScores(this.props.selectedPlaylist.id)
  // }

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

  renderHighScores = () => {
    return this.state.topTenHighScores.map(function(highScore, i) {
      return <div className='high-scores-div' key={i}>
                <span className='high-scores-span'>{i + 1}.</span>&nbsp;{ highScore.user} — {highScore.score} 
              </div>; 
    })
  }
  
  handleChange = (value) => {
    this.setState({user: value})
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({showForm: false})
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
      .then(gameObject => this.setState({
        topTenHighScores: [...this.state.topTenHighScores, {user: gameObject.user, score: gameObject.score}].sort(function (a, b) {return b.score - a.score}).slice(0,10)
      }))
      .catch(err => console.log(err))
  }

  calculateGameScore = () => {
    return this.props.trackOutcomes.filter(trackOutcome => trackOutcome.outcome === 'Earworm!').length
  }

  // Called in Component Did Mount with this.props.selectedPlaylist.id
  // this.setState({topTenHighScores: this.props.selectedPlaylist.high_scores.slice(0,10)})
  fetchHighScores = (selectedPlaylistId) => {
    fetch(`http://localhost:3000/playlists/${selectedPlaylistId}`)
      .then(r => r.json())
      .then(playlistObject => this.setState({topTenHighScores: playlistObject.high_scores.slice(0,10)}))
      .catch(err => console.log(err))
  }
  
  // //dont directly mutate state. DRY the filter. think about calculating correct answers on the backend. 
  // // right now this is sorting the answers in each game...
  // renderHighScores = () => {
  //   return this.state.allGames.sort(function(a, b) {
  //     return b.answers.filter(answer => answer.outcome === 'Earworm!').length - a.answers.filter(answer => answer.outcome === 'Earworm!').length
  //   })
  // }
  
  render (){
    // console.log(this.props)
    console.log(this.state)
    // console.log(this.renderHighScores())
    
    return (
      <div className='results-splash'>
        <div className='results-instructions'>
          your score: <span className='score-span'>{this.calculateGameScore()}</span>
        </div>
        {this.renderTrackResults()}
        <div className='save-game-form'>
          <form className={this.state.showForm ? 'null' : 'hide-high-score-form'} onSubmit={(e) => this.handleSubmit(e)}>
            <label>
              <input ref={(input) => { this.nameInput = input; }} type="text" placeholder='Enter Your Name' value={this.state.user} maxLength="10" onChange={(e) => this.handleChange(e.target.value)} />
            </label>
            <input className='submit-results-button' type="submit" value='SUBMIT SCORE'/>
          </form>
          <div className='play-again-button-div'>
            <button className='play-again-button' onClick={this.props.playAgain}>PLAY AGAIN</button>
          </div>
        </div>
        <div className='high-scores-table'>
          <div className='high-scores-header'>
            top scores for {this.props.selectedPlaylist.name}:
          </div>
          {this.renderHighScores()}
        </div>
        <div className='play-again-button-div'>
          <button className='play-again-button' onClick={this.props.playAgain}>PLAY AGAIN</button>
        </div>
      </div>
    )
  }
}

export default ResultsSplash;
