import React from 'react';
import Home from "./OtherUserProfileMain";
import Wallet from "./OtherWallet";
import Following from "../following/Following";

const OtherRightside = ({show}) => {
    switch (show) {
        case 'home':
            return <Home/>;
        case 'wallet':
            return <Wallet/>;
        case 'follow':
            return <Following/>;
        default:
            return null;
    }
};

export default OtherRightside;