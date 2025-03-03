import React, { useState, useEffect } from 'react';
import WebPlayback from './Playback';
import HomeTab from './HomeTab';
import StatsTab from './StatsTab';
import Playlists from './Playlists';


function Home(props) {
    const token = props.token;
    const [homeActive, setHomeActive] = useState(true);
    const [statsActive, setStatsActive] = useState(false);
    const [playlistsActive, setPlaylistsActive] = useState(false);

    if(token == null){
      return <div>Loading!</div>
    }

    return (
      <div>
        <div className="app">
          <div className="navBar">
            <button className="navButton" onClick={()=> {setHomeActive(true); setPlaylistsActive(false); setStatsActive(false)}}>
              HOME
            </button>
            <button className='navButton' onClick={()=> {setHomeActive(false); setPlaylistsActive(false); setStatsActive(true)}}>
              STATS
            </button>
            <button className='navButton'onClick={()=> {setHomeActive(false); setPlaylistsActive(true); setStatsActive(false)}}>
              PLAYLISTS
            </button>
          </div>
          <div className="container, Home">
              <HomeTab active={homeActive} token={token}></HomeTab>
              <StatsTab active={statsActive} token={token}></StatsTab>
              <Playlists active={playlistsActive} token={token}></Playlists>
          </div>
        </div>
        <div className="container">
          {token !== '' && <WebPlayback token={token}/>}
        </div>
      </div>
    );
}

export default Home
