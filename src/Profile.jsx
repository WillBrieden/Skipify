import React from "react";

function Profile(props){
    const token = props.token;
    const profile = props.profile;
    const imgSrc = props.imgSrc;

    if(!props.active){
        return null;
    }else{
        return (
            <div className="profileTab">
                <a className="profileLink" href={profile.external_urls.spotify}><img src={imgSrc} alt="" />
                <h1>{profile.display_name}</h1></a>
                <p className="profileHeader">Country </p>
                <p className="profileInfo">{profile.country}</p>
                <p className="profileHeader">Followers </p>
                <p className="profileInfo">{profile.followers.total}</p>
                <p className="profileHeader">Subscription Type </p>
                <p className="profileInfo">{profile.product}</p>
            </div>
        )
    }
}

export default Profile;