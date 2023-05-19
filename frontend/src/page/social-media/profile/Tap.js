import React from 'react';

const Tap = ({setShow}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <p onClick={() => setShow("home")}>Home</p>
            <p onClick={() => setShow("tweet")}>Tweet</p>
            <p onClick={() => setShow("post")}>Post</p>
            <p onClick={() => setShow("wallet")}>Cüzdan</p>
            {/*<p onClick={() => setShow("like")}>Beğeniler</p>*/}
            <p onClick={() => setShow("save")}>Save</p>
        </div>
    );
};

export default Tap;