import React, { useState, useEffect } from 'react';
import WebPlayback from './Playback';
import HomeTab from './HomeTab';
import StatsTab from './StatsTab';
import Playlists from './Playlists';
import Profile from './Profile';


function Home(props) {
    const token = props.token;
    const [profile, setProfile] = useState(null);
    const [imgSrc, setImgSrc] = useState("https://i.scdn.co/image/ab676161000051747baf6a3e4e70248079e48c5a");
    const [homeActive, setHomeActive] = useState(true);
    const [statsActive, setStatsActive] = useState(false);
    const [playlistsActive, setPlaylistsActive] = useState(false);
    const [profileActive, setProfileActive] = useState(false);

    useEffect(() =>{
      async function getProfile(token) {
        const response = await fetch("https://api.spotify.com/v1/me", {method: "GET", headers: { Authorization: 'Bearer ' + token}})
        const json = await response.json()
        setProfile(json);
      }
      getProfile(token)
    }, [token]);

    useEffect(() => {
      console.log(profile)
      if(profile && profile.images && profile.images != ''){
        setImgSrc(profile.images)
      }
    }, [profile]);


    if(token == null || profile == null){
      return <div>Loading!</div>
    }   

    return (
      <div>
        <div className="app">
          <div className="navBar">
            <button className="navButton" onClick={()=> {setHomeActive(true); setPlaylistsActive(false); setStatsActive(false); setProfileActive(false);}}>
              HOME
            </button>
            <button className='navButton' onClick={()=> {setHomeActive(false); setPlaylistsActive(false); setStatsActive(true); setProfileActive(false);}}>
              STATS
            </button>
            <button className='navButton'onClick={()=> {setHomeActive(false); setPlaylistsActive(true); setStatsActive(false); setProfileActive(false);}}>
              PLAYLISTS
            </button>
          </div>
          <div className="profileButton" onClick={()=> {setHomeActive(false); setPlaylistsActive(false); setStatsActive(false); setProfileActive(true);}}>
            <img src={imgSrc} className="profileImage" alt=""/>
            <p className="displayName">{profile.display_name}</p>
          </div>
          <div className="container, Home">
              <HomeTab active={homeActive} token={token}></HomeTab>
              <StatsTab active={statsActive} token={token}></StatsTab>
              <Playlists active={playlistsActive} token={token}></Playlists>
              <Profile active={profileActive} token={token} profile={profile} imgSrc={imgSrc}></Profile>
          </div>
        </div>
        <div className="container">
          {token !== '' && <WebPlayback token={token}/>}
        </div>
      </div>
    );
}

export default Home
