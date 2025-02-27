import React from "react";

function Playlists(props){
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