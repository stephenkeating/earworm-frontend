import React, { Component } from 'react';
import Welcome from '../components/Welcome.js';
import PlaylistForm from '../components/PlaylistForm.js';
import GameContainer from '../containers/GameContainer.js';
import ResultsSplash from '../components/ResultsSplash';
import earWorm from '../EarWorm3.png'; 

class BodyContainer extends Component  {

  state = {
    playlists: [],
    selectedPlaylist: {},
    // gameStatus is 'pre' when selecting playlist, 'active' when playing, 'post' when showing results
    gameStatus: 'welcome',
    currentGame: {},
    trackOutcomes: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/playlists`)
    .then(r => r.json())
    // sort playlists by name before throwing them into state
    .then(playlistsToLoad => this.setState({playlists: playlistsToLoad.sort((a, b) => a['name'].localeCompare(b['name']))}))
    .catch(err => console.log(err))
  }
  
  // sent down to PlaylistForm component
  selectPlaylist = (selectedPlaylist) => {
    // prevent the user from breaking the app by going back to the select option in the dropdown
    if (selectedPlaylist !== 'select'){
      this.setState({selectedPlaylist: this.state.playlists.find (playlist => playlist.name === selectedPlaylist)})
    }
  }

  // sent down to PlaylistForm component and starts the game
  playGame = () => {
    this.setState({gameStatus: 'active'})

    fetch(`http://localhost:3000/games`, {
      method:'POST',
      headers: { 
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        playlist_id: this.state.selectedPlaylist.id
      })
    })
      .then(r => r.json())
      .then(currentGame => {this.setState({currentGame: currentGame})})
      .catch(err => console.log(err))
  }

  // sent down to Game component
  showResults = () => {
    this.setState({gameStatus: 'post'})
  }

  addTrackToTrackOutcomes = (trackObject) => {
    this.setState({trackOutcomes: [...this.state.trackOutcomes, trackObject]})
  }

  playAgain = () =>{
    this.setState({gameStatus: 'pre', trackOutcomes: []})
  }
  
  // renders component based on this.state.gameStatus
  renderGameStatus = () => {
    if (this.state.gameStatus === 'welcome') {
      return <Welcome 
              playAgain={this.playAgain}  
            />
    }
    else if (this.state.gameStatus === 'pre') {
      return <PlaylistForm 
            playlists={this.state.playlists}
            selectedPlaylist={this.state.selectedPlaylist}
            selectPlaylist={this.selectPlaylist}
            playGame={this.playGame}
      />
    } else if (this.state.gameStatus === 'active') {
      return <GameContainer 
              selectedPlaylist={this.state.selectedPlaylist}
              currentGame={this.state.currentGame}
              addTrackToTrackOutcomes={this.addTrackToTrackOutcomes}
              showResults={this.showResults}
            />
    } else if (this.state.gameStatus === 'post') {
      return <ResultsSplash
              trackOutcomes={this.state.trackOutcomes}
              currentGame={this.state.currentGame}
              playAgain={this.playAgain}
              selectedPlaylist={this.state.selectedPlaylist}
            />
    }
  }
  

  render (){
    // console.log('game container state:', this.state)
    return(
      <div className='main-container'>
        {this.state.gameStatus === 'welcome'
          ? null
          : <div className='logo-bar'>
              <div className='logo-img-div'>
                <img className='logo-img' src={earWorm} alt="earWorm" />
              </div>
              <div className='logo-text'>
                &nbsp;earworm
              </div>
            </div>
        }
        <div className="game-container">
          {this.renderGameStatus()}
        </div>
        {/* follow <br> prevents the bottom of the body from sliding below the footer*/}
        <br></br>
        {this.state.gameStatus === 'welcome'
          ? null
          : <div className='footer'>
              {/* <div className='footer-text'>
                EarWorm App&nbsp; 
              </div>
              <div className='footer-img-div'>
                <a href="https://thenounproject.com/search/?q=Ear&i=659545" target="_blank" rel="noopener noreferrer">
                  <img className='footer-img' src={earWorm} alt="earWorm" />
                </a>
              </div> */}
              <div className='footer-text'>
                <a href="https://github.com/stephenkeating" target="_blank" rel="noopener noreferrer">CREATED BY STEPHEN KEATING</a>
              </div>
            </div>
        }
      </div>
      
    )
  }

}

export default BodyContainer;