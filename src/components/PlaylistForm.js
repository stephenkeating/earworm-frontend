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
          what's your jam?
        </div>
        <div className='playlist-instructions-body'>
          Once you press play, you'll have 3 mins to guess as many titles as possible. Skip if you need to, but it will cost you.
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
