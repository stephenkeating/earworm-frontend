import React, { Component } from 'react';
import GameContainer from '../containers/GameContainer.js';



class MainContainer extends Component  {

  // state = {
  //   currentUser: {},
  //   gameActive: false
  // }

  

  render (){
    // console.log('main container state:', this.state)
    return(
      <div className="main-container">
        <h1>
          EarWorm
        </h1>
        
        {/* user component */}
        <GameContainer 
          // gameActive={this.state.gameActive}
          // playGame={this.playGame}
        />
        {/* results splash component*/}
      </div>
    )
  }

}

export default MainContainer;