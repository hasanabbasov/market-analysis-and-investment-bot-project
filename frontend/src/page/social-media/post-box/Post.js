import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './postBox.css'
import {Paper, Avatar} from '@material-ui/core'
import likePhoto from '../../../styles/like.png'
import likebutton from "../../../styles/likebutton.png";
import commentbutton from "../../../styles/comment.png";
import sharebutton from "../../../styles/share.png";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import SendIcon from "@mui/icons-material/Send";


const Post = ({nick, description, like, photo, tweet, postId, tweetId, postComment, followedId, data, comments}) => {

    const [comment, setComment] = useState('');
    const [liked, setLiked] = useState(true)
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [following, setFollowing] = useState([])
    const [followUserMethod, setFollowUserMethod] = useState([])
    const [unFollowUserMethod, setUnFollowUserMethod] = useState([])
    const userId = localStorage.getItem("currentUserId");
    const navigate = useNavigate();
    const isCommentEmpty = comment.trim() === '';
    console.log("following", following)
    console.log("followedId", followedId)

    const getFollowingList = useCallback(() => {
        return Promise.all([
            fetch(`/users/${userId}/following`).then((response) => response.json())
        ]).then(([res]) => {
            setFollowing(res);
            console.log("following: ", res);
        });
    }, [userId, followUserMethod, unFollowUserMethod]);


    useEffect(() => {
        getFollowingList()
    }, [userId])

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
    }

    const followUser = () => {
        fetch(`/users/${userId}/follow/${followedId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((res) => {
                console.log("Success: ", res)
                setFollowUserMethod(res)
                getFollowingList()
            })
            .catch(console.error)
    }

    const unfollowUser = () => {
        fetch(`/users/${userId}/unfollow/${followedId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((res) => {
                console.log("Success: ", res)
                setUnFollowUserMethod(res)
                getFollowingList()
            })
            .catch(console.error)
    }

    return (
        <div>
            <Paper className='post_container'>
                <Grid container spacing={2} style={{display: "flex", alignItems: 'center'}}>
                    {/*TODO*/}
                    <Grid item xs={9} className='post_header'>
                        <div className='post_header_img'>
                            <Avatar className='post_img' src={data?.profileImageUrl ? data?.profileImageUrl : ""}  onClick={() => navigate(`/profile/${data.userId}`)}  />
                        </div>
                        <div className='post_header_text'>
                            {nick}
                        </div>
                    </Grid>
                    <div>
                        {followedId == userId ?
                            <div/> :
                            following.some(follow => follow.userId === followedId) ?
                                <Grid item xs={3} className="post-box-unfollow-botton">
                                    <span style={{paddingRight: "5px", fontSize: "15px"}}
                                          onClick={unfollowUser}>Unfollow</span>
                                    <FollowTheSignsIcon style={{fontSize: "20px"}}/>
                                </Grid> :
                                <Grid item xs={3} className="post-box-follow-botton">
                                    <span style={{paddingRight: "5px", fontSize: "15px"}}
                                          onClick={followUser}>Follow</span>
                                    <FollowTheSignsIcon style={{fontSize: "20px"}}/>
                                </Grid>
                        }
                    </div>

                </Grid>
                <div className='post_description'>
                    {description ? description : tweet}
                </div>
                <div className='post_image'>
                    <img src={photo} width='600px' alt={""}/>
                </div>
                <div className='post_likeCountContainer'>
                    <div className='post_like'>
                        <img className='post_img' src={likePhoto} alt={""}/>
                    </div>
                    <div className='post_likecount'>
                        {like}
                    </div>
                </div>
                <div className='post_likeShare'>
                    {liked ? <div className='post_tab' onClick={sendLikeToDatabase}>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={likebutton} alt={""}/>
                        </div>
                        <div className='post_tabtext'>
                            Like
                        </div>
                    </div> : <div className='post_tab' onClick={sendLikeToDatabase}>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={likePhoto} alt={""}/>
                        </div>
                        <div className='post_tabtext'>
                            Like
                        </div>
                    </div>}


                    <div className='post_tab' onClick={() => setShowCommentBox(!showCommentBox)}
                         style={{cursor: 'pointer'}}>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={commentbutton} alt={""}/>
                        </div>
                        <div className='post_tabtext'>
                            Comment
                        </div>
                    </div>

                    <div className='post_tab'>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={sharebutton} alt={""}/>
                        </div>
                        <div className='post_tabtext'>
                            Share
                        </div>
                    </div>
                </div>
                {
                    showCommentBox && <div className='post-comment-box-background'>
                        <div>
                            {comments ? comments?.map(({comment, nick, profileImageUrl}, index) => (
                                <>
                                    <div className='' style={{display: 'flex', paddingBottom: '15px', paddingTop: '15px'}}>
                                        <div style={{width: '20%', display: 'flex', justifyContent: 'center'}}>
                                            <Avatar src={profileImageUrl ? profileImageUrl : "" }/>
                                        </div>
                                        <div className='test'>
                                            <div style={{
                                                width: '100%',
                                                fontWeight: "bold",
                                                paddingTop: '5px'
                                            }}>{nick}</div>
                                            <div style={{paddingTop: '15px', paddingBottom: '5px'}}
                                                 key={index}>{comment}</div>
                                        </div>
                                    </div>
                                    <div></div>
                                </>
                            )) : <div>Comment yok</div>}
                        </div>
                    </div>
                }
                <div>
                    <div className='upload_top'>
                        <div className='post-comment-avatar-background'>
                            <Avatar src={data?.profileImageUrl ? data?.profileImageUrl : "" }/>
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
    )
        ;
};

export default Post;