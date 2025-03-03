import React from "react";

function Profile(props){
    const token=props.token;
    if(!props.active){
        return null;
    }else{
        return (
            <div>
                My Profile!
            </div>
        )
    }
}

export default Profile;