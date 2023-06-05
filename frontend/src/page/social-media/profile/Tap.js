import React from 'react';
import './Profile.css'

const Tap = ({show, setShow}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {show === "home" ? <p className="profile-top-button" onClick={() => setShow("home")}>Home</p> :<p className="profile-tap-title" onClick={() => setShow("home")}>Home</p>}
            {show === "tweet" ? <p className="profile-top-button" onClick={() => setShow("tweet")}>Tweet</p> : <p className="profile-tap-title" onClick={() => setShow("tweet")}>Tweet</p>}
            {show === "post" ? <p className="profile-top-button" onClick={() => setShow("post")}>Post</p> : <p className="profile-tap-title" onClick={() => setShow("post")}>Post</p>}
            {show === "wallet" ? <p className="profile-top-button" onClick={() => setShow("wallet")}>Cüzdan</p> : <p className="profile-tap-title" onClick={() => setShow("wallet")}>Cüzdan</p>}
            {/*<p onClick={() => setShow("like")}>Beğeniler</p>*/}
            {/*{show === "save" ? <p className="profile-top-button" onClick={() => setShow("save")}>Save</p> : <p style={{cursor:"pointer"}} onClick={() => setShow("save")}>Save</p>}*/}
            {show === "follow" ? <p className="profile-top-button" onClick={() => setShow("follow")}>Follow</p> : <p className="profile-tap-title" onClick={() => setShow("follow")}>Follow</p>}
        </div>
    );
};

export default Tap;