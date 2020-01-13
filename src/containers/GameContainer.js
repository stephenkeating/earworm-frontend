import React, { Component } from 'react';
import PlaylistForm from '../components/PlaylistForm.js';
import GuessForm from '../components/GuessForm.js';


class GameContainer extends Component  {

  state = {
    playlists: [],
    selectedPlaylist: {},
    currentTrack: '',
    trackGuess: ''
  }

  componentDidMount() {
    fetch(`http://localhost:3000/playlists`)
    .then(r => r.json())
    .then(playlistsToLoad => this.setState({playlists: playlistsToLoad, selectPlaylist: playlistsToLoad[0]}))
    .catch(err => console.log(err))
  }

  selectPlaylist = (selectedPlaylist) => {
    this.setState({selectedPlaylist: this.state.playlists.find (playlist => playlist.displayName === selectedPlaylist)})
  }

  render (){
    console.log('game container state:', this.state)
    return(
      <div className="game-container">
        <h1>
          (GameContainer.js)
        </h1>
        {!this.props.gameActive 
          ? <PlaylistForm 
            playlists={this.state.playlists}
            selectedPlaylist={this.state.selectedPlaylist}
            selectPlaylist={this.selectPlaylist}
            playGame={this.props.playGame}
          />
          : <GuessForm 
            selectedPlaylist={this.state.selectedPlaylist}
          />
        }
        
      </div>
    )
  }

}

export default GameContainer;