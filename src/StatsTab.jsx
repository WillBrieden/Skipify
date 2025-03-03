import React from "react";

function StatsTab(props){
    const token = props.token;
    if(!props.active){
        return null;
    }else{
        return (
            <div>
                Stats Tab!
            </div>
        );
    }
}

export default StatsTab;