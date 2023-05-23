import React from 'react';

const Tap = ({show,setShow}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {show === "active" ? <p className="profile-top-button" onClick={() => setShow("active")}>Active Invest</p> :<p style={{cursor:"pointer"}} onClick={() => setShow("active")}>Active Invest</p>}
            {show === "trade" ? <p className="profile-top-button" onClick={() => setShow("trade")}>Active Trade</p> : <p style={{cursor:"pointer"}} onClick={() => setShow("trade")}>Active Trade</p>}
        </div>
    );
};

export default Tap;