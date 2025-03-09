import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";

function Playlists(props){
    const [token, setToken] = useState(props.token);
    const [fetchUrl, setFetchUrl] = useState("https://api.spotify.com/v1/me/playlists");
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchPlaylists(){
            const response = await fetch(fetchUrl, {method: "GET", headers: { Authorization: 'Bearer ' + token}});
            const json = await response.json();

            setData(json);
        }

        fetchPlaylists();
    }, []);

    if(!props.active || data == null){
        return null;
    }else{
        return (
            <div className="playlistsTab">
                {data.items.length ? 
                    data.items.map(playlist => <PlaylistItem images={playlist.images} name={playlist.name} owner={playlist.owner} public={playlist.public} tracks={playlist.tracks} url={playlist.url} uri={playlist.uri}></PlaylistItem> )
                    : 'No Playlists Found'
                }
                <div className="playlistButtons">
                    <button className="btn-spotify-playlists" onClick={() => setFetchUrl(data.previous)}>Prev</button>
                    <p>{data.limit} {data.offset}/{data.total}</p>
                    <button className="btn-spotify-playlists" onClick={() => setFetchUrl(data.next)}>Next</button>
                </div>
            </div>
        );
    }
}

export default Playlists;