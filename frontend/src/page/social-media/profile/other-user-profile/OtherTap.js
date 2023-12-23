import React from 'react';
import '../Profile.css'

const OtherTap = ({show, setShow}) => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                {show === "home" ? <p className="profile-top-button" onClick={() => setShow("home")}>Home</p> :<p className="profile-tap-title" onClick={() => setShow("home")}>Home</p>}
                {show === "wallet" ? <p className="profile-top-button" onClick={() => setShow("wallet")}>Wallet</p> : <p className="profile-tap-title" onClick={() => setShow("wallet")}>Wallet</p>}
                {show === "follow" ? <p className="profile-top-button" onClick={() => setShow("follow")}>Follow</p> : <p className="profile-tap-title" onClick={() => setShow("follow")}>Follow</p>}
            </div>
        </div>
    );
};

export default OtherTap;