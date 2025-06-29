import React, {useEffect, useState} from 'react';
import './tweets.css'
import {useParams} from "react-router-dom";

import Tweet from "./Tweet";

const Tweets = () => {
    const [tweet, setTweet] = useState('');
    const {userId} = useParams();
    useEffect(() => {
        fetch(`/tweet/allTweet/${userId}`)
            .then((response) => response.json())
            .then(setTweet)
            .catch(console.error)
    },[])
    return (
        <div>
            { tweet && tweet?.map((tweet) =>(
                <Tweet tweet={tweet}/>
            ))
            }
        </div>
    );
};

export default Tweets;