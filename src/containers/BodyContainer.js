import React, { Component } from 'react';
import PlaylistForm from '../components/PlaylistForm.js';
import GameContainer from '../containers/GameContainer.js';
import ResultsSplash from '../components/ResultsSplash';


class BodyContainer extends Component  {

  state = {
    playlists: [],
    selectedPlaylist: {},
    // gameStatus is 'pre' when selecting playlist, 'active' when playing, 'post' when showing results
    gameStatus: 'pre',
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
      }
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
  
  
  // renders component based on this.state.gameStatus
  renderGameStatus = () => {
    if (this.state.gameStatus === 'pre') {
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
              
            />
    }
  }
  

  render (){
    console.log('game container state:', this.state)
    return(
      <div className="game-container">
        {this.renderGameStatus()}
      </div>
    )
  }

}

export default BodyContainer;