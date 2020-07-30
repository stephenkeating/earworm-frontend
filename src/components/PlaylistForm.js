import React, { Component } from "react";

class PlaylistForm extends Component{
  componentDidUpdate(){
    this.selectPlaylist.focus();
  }

  renderPlaylistFormOptions = () => {
    // limiting length of playlist title (currently to 47 chars)
    return this.props.playlists.map(playlist => <option className='playlist-select-option' value={playlist.name} key={playlist.id}>{playlist.name.substring(0,47).toUpperCase()}</option>)
  }

  playlistSelect = () => {
    if (this.props.playlists[0]) {
      return (
        <select ref={(selectPlaylist) => { this.selectPlaylist = selectPlaylist; }} className='playlist-select-dropdown' value={this.props.selectedPlaylist.name} onChange={(e) => this.props.selectPlaylist(e.target.value)}>
          <option className='playlist-select-option' defaultValue value='select'>–&nbsp;SELECT A PLAYLIST&nbsp;–</option>
          {this.renderPlaylistFormOptions()}
        </select>
      )
    } else {
      return "Loading Playlists..."
    }
  }
  
  render() {
    return (
      <div className='PlaylistForm'>
        <div className='playlist-instructions-header'>
          what's your jam?
        </div>
        <div className='playlist-instructions-body'>
          Once you press play, you'll have 3 mins to guess as many titles as possible. Skip if you need to, but it will cost you.
        </div>
        <br></br>
        { this.playlistSelect() }
        <div className='play-again-button-div'>
          {this.props.selectedPlaylist.name 
            ? <button onClick={this.props.playGame} className='playlist-play-button'>PLAY</button> 
            : ''
          }
        </div>
      </div>
    );
  }
}

export default PlaylistForm;
