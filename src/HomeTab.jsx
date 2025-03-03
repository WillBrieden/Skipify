import React from "react";

function HomeTab(props){
    const token = props.token;
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