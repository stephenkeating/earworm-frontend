import React from "react";

const GuessForm = (props) => {
  
  // Need to implement a focus on the input text area

    return (
     
      <div className='guess-form'>
        <form onSubmit={(e) => props.handleSubmit(e)}>
          <label>
            <input type="text" placeholder='Guess the Title' value={props.trackGuess} onChange={(e) => props.handleChange(e.target.value)} />
          </label>
          <input className='submit-guess-button' type="submit" value="Submit" />
        </form>
        <br></br>
        <button className='skip-button' onClick={props.handleSkip}>Skip (5 second penalty)</button>
      </div>
      
    );
  
}

export default GuessForm;

