import React from "react";

function PlaylistItem(props){
    return(
        <div className="playlistItem">
            <img src={props.images[0].url} alt="" />
            <p className="playlistName">{props.name}</p>
            <p className="playlistDisplay">{props.owner.display_name}</p>
            <p className="playlistPublic">{props.public ? 'Public' : 'Private'}</p>
            <p className="playlistTracks">{props.tracks.total} tracks</p>
        </div>
    );
}

export default PlaylistItem;