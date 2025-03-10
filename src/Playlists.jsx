import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";

function Playlists(props){
    const fetchBase = "https://api.spotify.com/v1/me/playlists?limit=20"
    const [token, setToken] = useState(props.token);
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchPlaylists(){
            const response = await fetch(fetchBase+'&offset='+offset, {method: "GET", headers: { Authorization: 'Bearer ' + token}});
            const json = await response.json();

            setData(json);
        }
        fetchPlaylists();
    }, [offset]);

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
                    <button className="btn-spotify-playlists" hidden={data.previous == null}onClick={() => {setOffset(offset > 20 ? offset-20 : 0)}}>Prev</button>
                    <p>{data.limit+data.offset > data.total ? data.total : data.limit+data.offset}/{data.total}</p>
                    <button className="btn-spotify-playlists" hidden={data.next == null} onClick={() => {setOffset(offset+20)}}>Next</button>
                </div>
            </div>
        );
    }
}

export default Playlists;