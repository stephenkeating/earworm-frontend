import React from "react";

const PlaylistForm = (props) => {

  const renderPlaylistFormOptions = () => {
    return props.playlists.map(playlist => <option className='playlist-select-option' value={playlist.name} key={playlist.id}>{playlist.name}</option>)
  }
  
    return (
      <div className='PlaylistForm'>
        <div className='playlist-instructions-header'>
          Select A Playlist
        </div>
        <div className='playlist-instructions-body'>
          Once you press play, you'll have two minutes to guess the title of as many songs as possible.
        </div>
        <select className='playlist-select-dropdown' value={props.selectedPlaylist.name} onChange={(e) => props.selectPlaylist(e.target.value)}>
          <option className='playlist-select-option' defaultValue value='select'>--Select A Playlist--</option>
          {renderPlaylistFormOptions()}
        </select>
        <br></br>
        {props.selectedPlaylist.name 
          ? <button onClick={props.playGame} className='playlist-play-button'>Play!</button> 
          : ''
        }
        
      </div>
    );
  
}

export default PlaylistForm;
