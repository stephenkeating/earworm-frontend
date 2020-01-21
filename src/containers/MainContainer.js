import React, { Component } from 'react';
import BodyContainer from '../containers/BodyContainer.js';

class MainContainer extends Component  {

  // state = {
  //   currentUser: {}
  // }

  

  render (){
    // console.log('main container state:', this.state)
    return(
      <BodyContainer 
          // playGame={this.playGame}
        />
      
    )
  }

}

export default MainContainer;