import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";

function Playlists(props){
    const token = props.token;
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchPlaylists(){
            const response = await fetch("https://api.spotify.com/v1/me/playlists", {method: "GET", headers: { Authorization: 'Bearer ' + token}});
            const json = await response.json();

            setPlaylists(json.items);
        }

        fetchPlaylists();
    });

    if(!props.active){
        return null;
    }else{
        return (
            <div className="playlistsTab">
                {playlists.length ? 
                    playlists.map(playlist => <PlaylistItem images={playlist.images} name={playlist.name} owner={playlist.owner} public={playlist.public} tracks={playlist.tracks} url={playlist.url} uri={playlist.uri}></PlaylistItem> )
                    : 'No Playlists Found'
                }
            </div>
        );
    }
}

export default Playlists;