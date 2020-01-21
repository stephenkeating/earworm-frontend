import React, { Component } from "react";

class PlaylistForm extends Component{
  componentDidMount(){
    this.selectPlaylist.focus();
  }

  renderPlaylistFormOptions = () => {
    return this.props.playlists.map(playlist => <option className='playlist-select-option' value={playlist.name} key={playlist.id}>{playlist.name}</option>)
  }
  
  render() {
    return (
      <div className='PlaylistForm'>
        <div className='playlist-instructions-header'>
          Select A Playlist
        </div>
        <div className='playlist-instructions-body'>
          Once you press play, you'll have three minutes to guess the title of as many songs as possible.
        </div>
        <select ref={(selectPlaylist) => { this.selectPlaylist = selectPlaylist; }} className='playlist-select-dropdown' value={this.props.selectedPlaylist.name} onChange={(e) => this.props.selectPlaylist(e.target.value)}>
          <option className='playlist-select-option' defaultValue value='select'>--Select A Playlist--</option>
          {this.renderPlaylistFormOptions()}
        </select>
        <br></br>
        {this.props.selectedPlaylist.name 
          ? <button onClick={this.props.playGame} className='playlist-play-button'>PLAY</button> 
          : ''
        }
        
      </div>
    );
  }
}

export default PlaylistForm;
