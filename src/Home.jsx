import React, { useState, useEffect } from 'react';
import WebPlayback from './Playback';


function Home(props) {
    const token = props.token;
    if(token == null){
      return <div>Loading!</div>
    }

    return (
      <div>
        <div className="app">
          <div className="navBar">
            <button className="navButton">
              HOME
            </button>
            <button className='navButton'>
              STATS
            </button>
            <button className='navButton'>
              PLAYLISTS
            </button>
          </div>
          <div className="container, Home">
        
          </div>
        </div>
        <div className="container">
          {token !== '' && <WebPlayback token={token}/>}
        </div>
      </div>
    );
}

export default Home
