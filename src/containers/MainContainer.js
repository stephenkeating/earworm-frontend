import React, { Component } from 'react';
import BodyContainer from '../containers/BodyContainer.js';



class MainContainer extends Component  {

  // state = {
  //   currentUser: {}
  // }

  

  render (){
    // console.log('main container state:', this.state)
    return(
      <div className="main-container">
        <h1>
          EarWorm
        </h1>
        
        {/* user component */}
        <BodyContainer 
          // playGame={this.playGame}
        />
        {/* results splash component*/}
      </div>
    )
  }

}

export default MainContainer;