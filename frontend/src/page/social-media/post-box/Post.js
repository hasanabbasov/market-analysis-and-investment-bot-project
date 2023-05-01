import React ,{useState} from 'react';
import './postBox.css'
import { Paper, Avatar } from '@material-ui/core'
import likePhoto from '../../../styles/like.png'
import likebutton from "../../../styles/likebutton.png";
import commentbutton from "../../../styles/comment.png";
import sharebutton from "../../../styles/share.png";
import SendIcon from "@mui/icons-material/Send";


const Post = ({nick, description, like, photo,tweet, postId,tweetId}) => {

    const [comment, setComment] = useState();
    const userId = localStorage.getItem("currentUserId");


    const sendCommentToDatabase = async () =>{
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

        console.log("commentEntity",commentEntity)
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
                        <img className='post_img' src={likePhoto} />
                    </div>
                    <div className='post_likecount'>
                        {like}
                    </div>
                </div>
                <div className='post_likeShare'>
                    <div className='post_tab'>
                        <div className='post_tabfirst'>
                            <img className='post_tabimg' src={likebutton}/>
                        </div>
                        <div className='post_tabtext'>
                            Like
                        </div>
                    </div>

                    <div className='post_tab'>
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
                <div>
                    <div className='upload_top'>
                        <div className='post-comment-avatar-background'>
                            <Avatar/>
                        </div>
                        <div style={{width:'80%'}}>
                            <input className='upload_box' type='text' placeholder='Share comment' onChange={(event) => setComment(event.target.value)}/>
                        </div>
                        <div className='upload_sencIcon' onClick={sendCommentToDatabase}>
                            <SendIcon/>
                        </div>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default Post;