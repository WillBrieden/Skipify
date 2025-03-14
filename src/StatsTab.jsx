import React from "react";

function StatsTab(props){
    const token = props.token;
    if(!props.active){
        return null;
    }else{
        return (
            <div>
                <div className="genreGraph">Graph</div>
                <div className="topArtists">Your Top Artists</div>
                <div className="activeTimes">Listening Time</div>
            </div>
        );
    }
}

export default StatsTab;