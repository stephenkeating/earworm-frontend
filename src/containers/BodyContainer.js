import React, { Component } from 'react';
import Welcome from '../components/Welcome.js';
import PlaylistForm from '../components/PlaylistForm.js';
import GameContainer from '../containers/GameContainer.js';
import ResultsSplash from '../components/ResultsSplash';
import earWorm from '../EarWorm3.png'; 

const BASE_URL = 'https://earworm-backend.herokuapp.com';
const PLAYLISTS_URL = BASE_URL + '/playlists';
const GAMES_URL = BASE_URL + '/games';

class BodyContainer extends Component  {

  state = {
    playlists: [],
    selectedPlaylist: {},
    // gameStatus is 'welcome' for loading screen, 'pre' when selecting playlist, 'active' when playing, 'post' when showing results
    gameStatus: 'welcome',
    currentGame: {},
    trackOutcomes: []
  }

  componentDidMount() {
    fetch(PLAYLISTS_URL, {
      'Access-Control-Allow-Origin': 'https://earworm.netlify.com/'
    })
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

    fetch(GAMES_URL, {
      method:'POST',
      headers: { 
        'content-type': 'application/json',
        'accept': 'application/json',
        'Access-Control-Allow-Origin': 'https://earworm.netlify.com/'
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

  handleLogoClick = () => {
    this.setState({gameStatus: 'welcome', trackOutcomes: [], selectedPlaylist: {}})
  }
  
  
  // renders component based on this.state.gameStatus
  // consider implementing a JS Switch
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
    return(
      <div className='main-container'>
        {this.state.gameStatus === 'welcome'
          ? null
          : <div className='logo-bar'>
              <div className='logo-img-div'>
                <img className='logo-img' src={earWorm} alt="earWorm" onClick={this.handleLogoClick}/>
              </div>
              <div className='logo-text'>
                earworm
              </div>
            </div>
        }
        <div className="game-container">
          {this.renderGameStatus()}
        </div>
        {/* the following <br> prevents the bottom of the body from sliding below the footer*/}
        <br></br>
        {this.state.gameStatus === 'welcome'
          ? null
          : <div className='footer'>
              <div className='footer-text'>
                <a href="https://stephenkeating.github.io/keating-portfolio/" target="_blank" rel="noopener noreferrer">CREATED BY STEPHEN KEATING</a>
              </div>
            </div>
        }
      </div>
      
    )
  }

}

export default BodyContainer;