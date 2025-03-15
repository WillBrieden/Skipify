import React, { useEffect, useState } from "react";

function StatsTab(props){
    const token = props.token;
    const [timeListened, setTimeListened] = useState([0,0,0,0]);

    useEffect(() => {
        async function getStats(){
            const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {method: "GET", headers: { Authorization: 'Bearer ' + token}})
            const json = await response.json()

            console.log(json.items)
            getTimeListened(json.items);
        }

        async function getTimeListened(history){
            var times = timeListened
            var midnight = new Date()
            midnight.setHours(0, 0, 0, 0)
            var sixAM = new Date()
            sixAM.setHours(6, 0, 0, 0)
            var noon = new Date()
            noon.setHours(12, 0, 0, 0)
            var sixPM = new Date()
            sixPM.setHours(18, 0, 0, 0)

            history.forEach((play) => {
                console.log(play.played_at)
                var time = new Date(play.played_at)
                if(time.getTime() <= sixAM.getTime() && time.getTime() > midnight.getTime()){
                    console.log(time.getTime() + ' < ' + sixAM.getTime())
                    times[0]++
                }else if(time.getTime() <= noon.getTime()){
                    console.log(time.getTime() + ' < ' + noon.getTime())
                    times[1]++
                }else if(time.getTime() <= sixPM.getTime()){
                    console.log(time.getTime() + ' < ' + sixPM.getTime())
                    times[2]++
                }else{
                    console.log(time.getTime() + ' < ' + midnight.getTime())
                    times[3]++
                }
            })

            setTimeListened(times)
        }

        getStats()
    });

    if(!props.active){
        return null;
    }else{
        return (
            <div>
                <div className="genreGraph">Graph</div>
                <div className="topArtists">Your Top Artists</div>
                <div className="activeTimes">
                    Listening Time
                    <p>0 - 6 AM : {timeListened[0]}</p>
                    <p>6 AM - 12 PM : {timeListened[1]}</p>
                    <p>12 - 6 PM : {timeListened[2]}</p>
                    <p>6 PM - 12 AM : {timeListened[3]}</p>
                </div>
            </div>
        );
    }
}

export default StatsTab;