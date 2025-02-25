import React, { useState, useEffect } from 'react';

const track = {
    name: "",
    album: {
        images: [
            {url: ""}
        ]
    },
    artists: [
        {name: ""}
    ]
}

function WebPlayback(props) {
    const [player, setPlayer] = useState(undefined)
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);


    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = props.token;
            
            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 1
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            player.addListener('player_state_changed', (state => {

                if(!state){
                    return;
                }
                
                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                (!state)? setActive(false) : setActive(true)
            })); 


            player.connect();

        };
    }, [props.token]);

    return (
      <>
        <div className="Player" hidden={!is_active}>
           <div className="main-wrapper, Player-wrapper">
                <img src={current_track.album.images[0].url} className="now-playing__cover" alt=""/>
                <div className='Player-text'>
                    <div className="now-playing__side">
                    <div className="now-playing__name, song">
                        {current_track.name}
                    </div>
                    <div className="now-playing__artist, artist">
                        {current_track.artists[0].name}
                    </div>
                    </div>
                    <div className='Player-buttons'>
                        <button className="btn-spotify-player" onClick={() => {player.previousTrack()}}>
                       &lt;&lt;
                    </button>
                    <button className="btn-spotify-player" onClick={() => {player.togglePlay()}}>
                      { is_paused ? 'PLAY' : "PAUSE"}
                    </button>
                    <button className="btn-spotify-player" onClick={() => {player.nextTrack()}}>
                        &gt;&gt;
                    </button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}

export default WebPlayback
