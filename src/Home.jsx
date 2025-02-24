import React, { useState, useEffect } from 'react';
import WebPlayback from './Playback';


function Home(props) {
    const token = props.token;
    if(token == null){
      return <div>Loading!</div>
    }

    return (
      <>
        <div className="container, Home">
          {token !== '' && <WebPlayback token={token}/>}
        </div>
      </>
    );
}

export default Home
