import React from "react";

const PlaylistForm = (props) => {

  const renderPlaylistFormOptions = () => {
    return props.playlists.map(playlist => <option className='playlist-select-option' value={playlist.name} key={playlist.id}>{playlist.name}</option>)
    
  }
    // console.log('playlist form props:', props)
  
    return (
      <div className='PlaylistForm'>
        <h1>
          Select A Playlist
        </h1>
        <select className='playlist-select-dropdown' value={props.selectedPlaylist.name} onChange={(e) => props.selectPlaylist(e.target.value)}>
          <option className='playlist-select-option' defaultValue value='select'>select</option>
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
