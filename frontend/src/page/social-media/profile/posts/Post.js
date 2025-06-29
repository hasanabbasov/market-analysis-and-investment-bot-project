import React from 'react';
import {Avatar, Paper} from "@material-ui/core";
import likePhoto from "../../../../styles/like.png";

const Post = ({post}) => {
    return (
        <div>
            <Paper className='post-container-in-profile' style={{boxShadow:" 0px 2px 3px 1px #2C3E50"}}>
                <div className='post_header'>
                    <div className='post_header_img'>
                        <Avatar className='post_img' src={post?.profileImageUrl}/>
                    </div>
                    <div className='post_header_text'>
                        {post.nick}
                    </div>
                </div>
                <div className='post_description' style={{paddingBottom:"25px" , fontWeight:"bold"}}>
                    {post.description}
                </div>
                <div className='post_image'>
                    <img src={post.postImgUrl} width='600px' alt={""}/>
                </div>
                <div className='post_likeCountContainer'>
                    <div className='post_like'>
                        <img className='post_img' src={likePhoto} alt={""}/>
                    </div>
                    <div className='post_likecount'>
                        {post.likes}
                    </div>
                </div>
            </Paper>
            
        </div>
    );
};

export default Post;