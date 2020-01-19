import React, { Component } from 'react';
import BodyContainer from '../containers/BodyContainer.js';
import earWorm from '../EarWorm3.png'; 

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
        {/* results splash component*/}
      </div>
    )
  }

}

export default MainContainer;