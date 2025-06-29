import React from 'react';
import Posts from "./posts/Posts";
import AllLikedPostsAndTweets from "./all-likes/AllLikedPostsAndTweets";
import Home from "./home/Home";
import Tweets from "./tweets/Tweets";
import Wallet from "./wallet/Wallet";
import Saves from "./all-save/Saves";
import Following from "./following/Following"

const ProfileRightSide = ({show}) => {
    switch (show) {
        case 'home':
            return <Home/>;
        case 'tweet':
            return <Tweets/>;
        case 'post':
            return <Posts/>;
        case 'wallet':
            return <Wallet/>;
        case 'like':
            return <AllLikedPostsAndTweets/>;
        case 'save':
            return <Saves/>;
        case 'follow':
            return <Following/>;
        default:
            return null;
    }
};
export default ProfileRightSide;