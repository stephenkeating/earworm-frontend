import React from "react";

const PlaylistForm = (props) => {

  const renderPlaylistFormOptions = () => {
    return props.playlists.map(playlist => <option className='playlist-select-option' value={playlist.displayName} key={playlist.id}>{playlist.displayName}</option>)
    
  }
    console.log('playlist form props:', props)
  
    return (
      <div className='PlaylistForm'>
        <h1>
          PlaylistForm
        </h1>
        <select className='playlist-select-dropdown' value={props.selectedPlaylist.displayName} onChange={(e) => props.selectPlaylist(e.target.value)}>
          <option className='playlist-select-option' defaultValue value='select'>select</option>
          {renderPlaylistFormOptions()}
        </select>
        <br></br>
        {props.selectedPlaylist.displayName 
          ? <button onClick={props.playGame} className='playlist-play-button'>Play!</button> 
          : 'Select A Playlist'
        }
        
      </div>
    );
  
}

export default PlaylistForm;
