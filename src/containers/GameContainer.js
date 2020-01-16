import React, { Component } from 'react';
import PlaylistForm from '../components/PlaylistForm.js';
import Game from '../components/Game.js';


class GameContainer extends Component  {

  state = {
    playlists: [],
    selectedPlaylist: {},
    gameActive: false,
    currentGame: {}
  }

  componentDidMount() {
    fetch(`http://localhost:3000/playlists`)
    .then(r => r.json())
    // sort playlists by name before throwing them into state
    .then(playlistsToLoad => this.setState({playlists: playlistsToLoad.sort((a, b) => a['name'].localeCompare(b['name']))}))
    .catch(err => console.log(err))
  }

  playGame = () => {
    this.setState({gameActive: !this.state.gameActive})

    fetch(`http://localhost:3000/games`, {
      method:'POST',
      headers: { 
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    })
      .then(r => r.json())
      .then(currentGame => {
        console.log('hi from fetch', currentGame)
        this.setState({currentGame: currentGame}); 
      })
      .catch(err => console.log(err))
  }

  selectPlaylist = (selectedPlaylist) => {
    this.setState({selectedPlaylist: this.state.playlists.find (playlist => playlist.name === selectedPlaylist)})
  }

  render (){
    console.log('game container state:', this.state)
    return(
      <div className="game-container">
        
        {!this.state.gameActive 
          ? <PlaylistForm 
            playlists={this.state.playlists}
            selectedPlaylist={this.state.selectedPlaylist}
            selectPlaylist={this.selectPlaylist}
            playGame={this.playGame}
          />
          : <Game 
            selectedPlaylist={this.state.selectedPlaylist}
          />
        }
        
      </div>
    )
  }

}

export default GameContainer;