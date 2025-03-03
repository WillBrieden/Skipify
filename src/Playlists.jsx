import React from "react";

function Playlists(props){
    const token = props.token;
    if(!props.active){
        return null;
    }else{
        return (
            <div>
                Playlists Tab!
            </div>
        );
    }
}

export default Playlists;