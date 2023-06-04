import React from 'react';
import Home from "./OtherUserProfileMain";
import Tweets from "../tweets/Tweets";
import Posts from "../posts/Posts";
import Wallet from "../wallet/Wallet";
import AllLikedPostsAndTweets from "../all-likes/AllLikedPostsAndTweets";
import Saves from "../all-save/Saves";

const OtherRightside = ({show}) => {
    switch(show) {
        case 'home':
            return <Home/>;
        case 'wallet':
            return <Wallet/>;
        default:
            return null;
    }
};

export default OtherRightside;