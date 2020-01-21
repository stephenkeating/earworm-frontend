import React, { Component } from "react";

class GuessForm extends Component{
  componentDidMount(){
    this.nameInput.focus();
  }

  componentDidUpdate() {
    this.nameInput.focus();
  }
  render() {
  // Need to implement a focus on the input text area

    return (
     
      <div className='guess-form'>
        <form onSubmit={(e) => this.props.handleSubmit(e)}>
          <label>
            <input ref={(input) => { this.nameInput = input; }} type="text" placeholder='Guess the Title' value={this.props.trackGuess} onChange={(e) => this.props.handleChange(e.target.value) } />
          </label>
          <input className='submit-guess-button' type="submit" value="Submit" />
        </form>
        <button className='skip-button' onClick={this.props.handleSkip}>Skip</button>
        <div className='skip-instructions'>
          (5 second penalty)
        </div>
      </div>
      
    );
  }
}

export default GuessForm;

