import React, { Component } from "react";

class GuessForm extends Component{
  componentDidMount(){
    this.nameInput.focus();
  }

  componentDidUpdate() {
    this.nameInput.focus();
  }
  render() {

    return (
     
      <div className='guess-form'>
        <form onSubmit={(e) => this.props.handleSubmit(e)}>
          <label>
            <input ref={(input) => { this.nameInput = input; }} type="text" placeholder='Guess the Title' value={this.props.trackGuess} onChange={(e) => this.props.handleChange(e.target.value) } />
          </label>
          <input className='submit-guess-button' type="submit" value="SUBMIT" />
        </form>
        <button className='skip-button' onClick={this.props.handleSkip}>SKIP</button>
        <div className='skip-instructions'>
          (5 second penalty)
        </div>
      </div>
      
    );
  }
}

export default GuessForm;

