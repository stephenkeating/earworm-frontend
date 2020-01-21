import React from "react";

const TrackPlayer = (props) => {
  
    return (
      <div className='spotify-player-iframe-div' >
        <div className='spotify-player'>
          <iframe title="spotify-player" src={`https://open.spotify.com/embed/track/${props.currentTrackSpotifyId}`} width="80" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
      </div>
    );
  
}

export default TrackPlayer;

