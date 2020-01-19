import React, { Component } from "react";

class ResultsSplash extends Component  {

  state = {
    buttonLabel: 'Submit Score',
    user: ''
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  renderTrackResults = () => {
    return this.props.trackOutcomes.map(outcome => {
      return <div className='track-outcome' key={outcome.id}>
        {outcome.outcome} {outcome.track.name} by {outcome.track.artists} 
        </div>
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

  render (){
    return (
      <div className='results-splash'>
        <h1>Here's how you did:</h1>
        {this.renderTrackResults()}
        <div className='save-game-form'>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>
              <input ref={(input) => { this.nameInput = input; }} type="text" placeholder='Enter Your Name' value={this.state.user} onChange={(e) => this.handleChange(e.target.value)} />
            </label>
            <input className='submit-results-button' type="submit" value={this.state.buttonLabel} />
          </form>
          <br></br>
        </div>
        <button className='play-again-button' onClick={this.props.playAgain}>Play Again!</button>
      </div>
    )
  }
}

export default ResultsSplash;
