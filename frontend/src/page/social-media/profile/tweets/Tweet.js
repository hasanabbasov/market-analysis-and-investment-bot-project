import React from 'react';
import {Avatar, Paper} from "@material-ui/core";
import likePhoto from "../../../../styles/like.png";
import commentbutton from "../../../../styles/comment.png";

const Tweet = ({tweet}) => {
    return (
        <div>
            <Paper className='post_container'>
                <div className='post_header'>
                    <div className='post_header_img'>
                        <Avatar className='post_img'/>
                    </div>
                    <div className='post_header_text'>
                        {tweet.nick}
                    </div>
                </div>
                <div className='post_description'>
                    {tweet.tweetText}
                </div>
                <div className='post_likeCountContainer'>
                    <div className='post_like'>
                        <img className='post_img' src={likePhoto}/>
                    </div>
                    <div className='post_likecount'>
                        {tweet.likes}
                    </div>
                </div>
                <div className='post_likeShare' >
                    {/*<div className='post_tab' onClick={() => setShowCommentBox(!showCommentBox)}*/}
                    <div className='post_tab'
                         style={{cursor: 'pointer'}}>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={commentbutton}/>
                        </div>
                        <div className='post_tabtext'>
                            Comment
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Tweet;