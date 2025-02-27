import React from "react";

function StatsTab(props){
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