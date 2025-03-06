import React from "react";

function PlaylistItem(props){
    return(
        <div className="playlistItem">
            <img src={props.images[0].url} alt="" />
            <p>{props.name}</p>
            <p>{props.owner.display_name}</p>
            <p>{props.public ? 'Public' : 'Private'}</p>
            <p>{props.tracks.total} tracks</p>
        </div>
    );
}

export default PlaylistItem;