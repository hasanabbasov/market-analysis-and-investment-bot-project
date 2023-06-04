import React from 'react';

const OtherTap = ({show, setShow}) => {
    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                {show === "home" ? <p className="profile-top-button" onClick={() => setShow("home")}>Home</p> :<p style={{cursor:"pointer"}} onClick={() => setShow("home")}>Home</p>}
                {show === "wallet" ? <p className="profile-top-button" onClick={() => setShow("wallet")}>Cüzdan</p> : <p style={{cursor:"pointer"}} onClick={() => setShow("wallet")}>Cüzdan</p>}
            </div>
        </div>
    );
};

export default OtherTap;