import React from 'react';
import {Avatar, Paper} from "@material-ui/core";
import likePhoto from "../../../../styles/like.png";

const Tweet = ({tweet}) => {
    return (
        <div>
            <Paper className='tweet-container-in-profile' style={{boxShadow:" 0px 2px 3px 1px #2C3E50"}}>
                <div className='post_header'>
                    <div className='post_header_img'>
                        <Avatar className='post_img' src={tweet?.profileImageUrl}/>
                    </div>
                    <div className='post_header_text'>
                        {tweet?.nick}
                    </div>
                </div>
                <div className='post_description' style={{paddingBottom:"25px", fontWeight:"bold"}}>
                    {tweet?.tweetText}
                </div>
                <div className='post_likeCountContainer'>
                    <div className='post_like'>
                        <img className='post_img' src={likePhoto} alt={""}/>
                    </div>
                    <div className='post_likecount'>
                        {tweet?.likes}
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Tweet;