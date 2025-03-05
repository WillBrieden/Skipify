import React from "react";

function Profile(props){
    const token = props.token;
    const profile = props.profile;
    const imgSrc = props.imgSrc;

    if(!props.active){
        return null;
    }else{
        return (
            <div>
                <a href={profile.external_urls.spotify}><img src={imgSrc} alt="" />
                <h1>{profile.display_name}</h1></a>
                <p>Country: {profile.country}</p>
                <p>Followers: {profile.followers.total}</p>
                <p>Subscription Type: {profile.product}</p>
            </div>
        )
    }
}

export default Profile;