import React, { Component } from 'react';
import BodyContainer from '../containers/BodyContainer.js';
import earWorm from '../EarWorm3.png'; 
import "typeface-work-sans";
require('typeface-work-sans')

class MainContainer extends Component  {

  // state = {
  //   currentUser: {}
  // }

  

  render (){
    // console.log('main container state:', this.state)
    return(
      <div className='main-container'>
        <div className='logo-bar'>
          <div className='logo-img-div'>
            <img className='logo-img' src={earWorm} alt="earWorm" />
          </div>
          <div className='logo-text'>
            EarWorm
          </div>
        </div>
        <BodyContainer 
          // playGame={this.playGame}
        />
        {/* follow <br> prevents the bottom of the body from sliding below the footer*/}
        <br></br>
        <div className='footer'>
          <div className='footer-text'>
            EarWorm App&nbsp; 
          </div>
          <div className='footer-img-div'>
            <a href="https://thenounproject.com/search/?q=Ear&i=659545" target="_blank" rel="noopener noreferrer">
              <img className='footer-img' src={earWorm} alt="earWorm" />
            </a>
          </div>
          <div className='footer-text'>
            <a href="https://github.com/stephenkeating" target="_blank" rel="noopener noreferrer">&nbsp;by Stephen Keating</a>
          </div>
        </div>
      </div>
    )
  }

}

export default MainContainer;