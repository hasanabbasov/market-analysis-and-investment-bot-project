import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './postBox.css'
import {Paper, Avatar} from '@material-ui/core'
import likePhoto from '../../../styles/like.png'
import likebutton from "../../../styles/likebutton.png";
import commentbutton from "../../../styles/comment.png";
import sharebutton from "../../../styles/share.png";
import SendIcon from "@mui/icons-material/Send";


const Post = ({nick, description, like, photo, tweet, postId, tweetId, postComment}) => {

    const [comment, setComment] = useState('');
    const [liked, setLiked] = useState(true)
    const [showCommentBox, setShowCommentBox] = useState(false);
    const userId = localStorage.getItem("currentUserId");
    const isCommentEmpty = comment.trim() === '';

    // console.log("tweetCommentData",tweetCommentData)
    // console.log("postCommentDataVAlla",postCommentData)
    console.log("postComment", postComment)
    console.log("showCommentBox", showCommentBox)


    const sendCommentToDatabase = async () => {
        const commentEntity = {
            postId: postId,
            tweetId: tweetId,
            userId: userId,
            comment: comment,
            nick: nick
        }

        try {
            const response = await fetch('http://localhost:8080/comment/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentEntity),
            })
            if (response.ok) {
                console.log('Comment başarıyla paylaşıldı!');
                // onRefresh(!refreshData);
            } else {
                throw new Error('Comment paylaşılırken hata oluştu');
            }
        } catch (error) {
            console.error('Comment paylaşılırken hata oluştu:', error);
        }

        console.log("commentEntity", commentEntity)
    }

    const sendLikeToDatabase = () => {
        setLiked(!liked)
        if (postId) {
            fetch(`http://localhost:8080/post/update/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
        }

        if (tweetId) {
            fetch(`http://localhost:8080/tweet/update/${tweetId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
        }
        console.log("postId",postId)
        console.log("tweetId",tweetId)
    }

    return (
        <div>
            <Paper className='post_container'>
                <div className='post_header'>
                    <div className='post_header_img'>
                        <Avatar className='post_img'/>
                    </div>
                    <div className='post_header_text'>
                        {nick}
                    </div>
                </div>
                <div className='post_description'>
                    {description ? description : tweet}
                </div>
                <div className='post_image'>
                    <img src={photo} width='600px'/>
                </div>
                <div className='post_likeCountContainer'>
                    <div className='post_like'>
                        <img className='post_img' src={likePhoto}/>
                    </div>
                    <div className='post_likecount'>
                        {like}
                    </div>
                </div>
                <div className='post_likeShare' >
                    {liked ? <div className='post_tab' onClick={sendLikeToDatabase}>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={likebutton}/>
                        </div>
                        <div className='post_tabtext'>
                            Like
                        </div>
                    </div> :  <div className='post_tab' onClick={sendLikeToDatabase}>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={likePhoto}/>
                        </div>
                        <div className='post_tabtext'>
                            Like
                        </div>
                    </div>}



                    <div className='post_tab' onClick={() => setShowCommentBox(!showCommentBox)}
                         style={{cursor: 'pointer'}}>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={commentbutton}/>
                        </div>
                        <div className='post_tabtext'>
                            Comment
                        </div>
                    </div>

                    <div className='post_tab'>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={sharebutton}/>
                        </div>
                        <div className='post_tabtext'>
                            Share
                        </div>
                    </div>
                </div>
                {showCommentBox && <div className='post-comment-box-background'>
                    <div>
                        {postComment ? postComment?.map(({comment, userId}, index) => (
                            <>
                                <div className='' style={{display: 'flex', paddingBottom: '15px', paddingTop: '15px'}}>
                                    <div style={{width: '20%', display: 'flex', justifyContent: 'center'}}>
                                        <Avatar/>
                                    </div>
                                    <div className='test'>
                                        <div style={{
                                            width: '100%',
                                            fontWeight: "bold",
                                            paddingTop: '5px'
                                        }}>{userId}</div>
                                        <div style={{paddingTop: '15px', paddingBottom: '5px'}}
                                             key={index}>{comment}</div>
                                    </div>
                                </div>
                                <div></div>
                            </>
                        )) : <div>Comment yok</div>}
                    </div>
                </div>}
                <div>
                    <div className='upload_top'>
                        <div className='post-comment-avatar-background'>
                            <Avatar/>
                        </div>
                        <div style={{width: '80%'}}>
                            <input className='upload_box' type='text' placeholder='Share comment'
                                   onChange={(event) => setComment(event.target.value)}/>
                        </div>
                        {comment ?
                            <div className='upload_sencIcon' onClick={sendCommentToDatabase}>
                                <SendIcon/>
                            </div> :
                            <div className='upload-send-icon-disable'>
                                <SendIcon/>
                            </div>}
                    </div>

                </div>
            </Paper>
        </div>
    );
};

export default Post;