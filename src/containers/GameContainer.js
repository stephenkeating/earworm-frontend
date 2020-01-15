import React, { Component } from 'react';
import PlaylistForm from '../components/PlaylistForm.js';
import Game from '../components/Game.js';


class GameContainer extends Component  {

  state = {
    playlists: [],
    selectedPlaylist: {}
  }

  componentDidMount() {
    fetch(`http://localhost:3000/playlists`)
    .then(r => r.json())
    // sort playlists by displayName before throwing them into state
    .then(playlistsToLoad => this.setState({playlists: playlistsToLoad.sort((a, b) => a['displayName'].localeCompare(b['displayName']))}))
    .catch(err => console.log(err))
  }

  selectPlaylist = (selectedPlaylist) => {
    this.setState({selectedPlaylist: this.state.playlists.find (playlist => playlist.displayName === selectedPlaylist)})
  }

  render (){
    console.log('game container state:', this.state.playlists)
    return(
      <div className="game-container">
        
        {!this.props.gameActive 
          ? <PlaylistForm 
            playlists={this.state.playlists}
            selectedPlaylist={this.state.selectedPlaylist}
            selectPlaylist={this.selectPlaylist}
            playGame={this.props.playGame}
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