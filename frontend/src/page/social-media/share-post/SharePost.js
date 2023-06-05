import React, {useState} from 'react';
import {Paper, Avatar} from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import logoImage from "../../../styles/image.png";
import SendIcon from '@mui/icons-material/Send';
import './sharePost.css'

const SharePost = ({ refreshData,onRefresh, comingFromProfile, mainUserProfileInfo}) => {
    const [showPostDialog, setShowPostDialog] = useState(false);
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const userId = localStorage.getItem("currentUserId");
    const nick = localStorage.getItem("currentUserName");

    const paperStyle = {
        boxShadow: comingFromProfile === "Profile" ? "0px 2px 3px 1px #2C3E50" : "0px 2px 3px 1px #d1e9ff",
        marginTop: "20px"
    };

    const openDialog = async (event) => {
        setShowPostDialog(true)
        const file = event.target.files[0];
        const base64Image = await toBase64(file);
        setImage(base64Image);
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleClose = () => {
        setShowPostDialog(false)
    }

    const sendTweeterToDatabase = () => {
        const tweetEntity = {
            nick: nick,
            userId: userId,
            tweetText: text,
        }
        fetch('http://localhost:8080/tweet/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Değiştirilen satır
            },
            body: JSON.stringify(tweetEntity)
        })
            .then((response) => response.json())
            .then((res) => {
                onRefresh(!refreshData);
                setText('')
            })
            .catch((error) => console.error("Error: ", error))
    }

    const uploadToDataBase = async () => {
        const postEntity = {
            postImgUrl: image,
            description: text,
            userId: userId,
            nick: nick,
            imageUrl: image
        };
        try {
            const response = await fetch('http://localhost:8080/post/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postEntity),
            });

            if (response.ok) {
                alert('Post başarıyla paylaşıldı!');
                setShowPostDialog(false);
                onRefresh(!refreshData);
            } else {
                throw new Error('Post paylaşılırken hata oluştu');
            }
        } catch (error) {
            console.error('Post paylaşılırken hata oluştu:', error);
        }
    }


    return (
        <div>
            <Dialog aria-labelledby="simple-dialog-title" className="upload_dialogbox" open={showPostDialog}>
                <div className="upload_header">
                    <div className="upload_text">Create Post</div>
                    <div className="upload_close"><span onClick={handleClose}>X</span></div>
                </div>
                <input type="text" className="upload_textbox" onChange={(evet) => setText(evet.target.value)}
                       placeholder="What's on your mind"/>
                <img src={image} alt={""}/>
                <input type="button" value="Share Post" onClick={uploadToDataBase} className="upload_button"/>
            </Dialog>
            <Paper className='upload_container' style={paperStyle}>
                <div className='upload_top'>
                    <div>
                        <Avatar className='upload_img' src={mainUserProfileInfo?.profileImageUrl}/>
                    </div>
                    <div style={{width: '88%'}}>
                        <input className='upload_box' type='text' placeholder='Write here for sharing' value={text}
                               onChange={(evet) => setText(evet.target.value)}/>
                    </div>
                    <div className='upload_sencIcon' onClick={sendTweeterToDatabase}>
                        <SendIcon/>
                    </div>
                </div>
                <div className='upload_bottom'>
                    {/*<div className="upload_tabs">*/}
                    {/*    <img src={live} width="30px"/>*/}
                    {/*    <div className="upload_text_share">Live Video</div>*/}
                    {/*</div>*/}
                    <div className="upload_tabs">
                        <label htmlFor="file-upload" className="upload_tabs">
                            <img src={logoImage} width="30px" alt={""}/>
                            <div className="upload_text">Photo/Video</div>
                        </label>
                        <input type="file" id="file-upload" onChange={(event) => openDialog(event)}/>
                    </div>
                    {/*<div className="upload_tabs">*/}
                    {/*    <img src={feeling} width="30px"/>*/}
                    {/*    <div className="upload_text_share">Feeling/Activity</div>*/}
                    {/*</div>*/}

                </div>
            </Paper>
        </div>
    );
};

export default SharePost;