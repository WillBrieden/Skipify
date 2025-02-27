import React from "react";

function HomeTab(props){
    if(!props.active){
        return null;
    }else{
        return (
            <div>
                Home Tab!
            </div>
        );
    }
}

export default HomeTab;