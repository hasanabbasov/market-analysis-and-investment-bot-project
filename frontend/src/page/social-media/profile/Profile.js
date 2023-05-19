import React, {useState,useEffect} from 'react'
import {useParams} from "react-router-dom";
import {Paper, Avatar} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import InfoBox from "./ProfileInfoBox/InfoBox";
import ProfileRightSide from "./ProfileRightSide";
import Tap from "./Tap";
import Resizer from "react-image-file-resizer";

const Profile = () => {
    const [show, setShow] = useState('home');
    const [user, setUser] = useState('');
    const [profile, setProfile] = useState('');
    const {userId} = useParams();
    const [profilePhoto, setProfilePhoto] = useState('');
    const [backgroundPhoto, setBackgroundPhoto] = useState('');
    console.log("profilePhoto",profilePhoto)
    console.log("backgroundPhoto",backgroundPhoto)

    useEffect(() => {
        fetch(`/users/${userId}`)
            .then((response) => response.json())
            .then(setUser)
            .catch(console.error)
        },[userId])

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const savePhotos = async () => {
        const profilePhotoBase64 = await toBase64(profilePhoto);
        const backgroundPhotoBase64 = await toBase64(backgroundPhoto);

        fetch(`/profile/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId:user.userId ,nick:user.userName , profileImageUrl: profilePhotoBase64, backgroundImageUrl: backgroundPhotoBase64}),}
        )
            .then((response) => response.json())
            .then((res) => console.log("Save Page: ", res) )
            .catch(console.error)

    }

    useEffect(() =>{
        fetch(`/profile/get/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
            })
            .catch(console.error);
    },[])



    return (
        <div style={{
            background: '#F8F9FA',
            margin: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Paper style={{
                width: '90%', padding: '20px', minHeight: '300px', display: 'flex', justifyContent: 'center'
                , flexDirection: 'column', alignItems: 'center'
            }}>
                {!profile && <input type='file' style={{width: '100%', height: '100%', cursor: 'pointer'}}
                        onChange={(e) => setBackgroundPhoto(e.target.files[0])}/>
                }
                <Paper style={{width: '90%', minHeight: '150px'}}>
                    <img src={profile?.backgroundImageUrl} style={{width: '100%', height: '252px',}}/>
                    <Avatar style={{width: '170px', height: '170px', position: 'absolute', marginTop: '-60px', marginLeft:'50px'}}>
                        {!profile ? <input type='file' style={{opacity: 0, width: '100%', height: '100%', cursor: 'pointer'}}
                                onChange={(e) => setProfilePhoto(e.target.files[0])}/> :
                        <img src={profile?.profileImageUrl} style={{width: '90%', height: '90%'}}/>
                        }
                    </Avatar>

                    <div style={{position: 'absolute', marginTop: '30px', paddingLeft: '245px',fontWeight:'bold'}}>{user?.userName}</div>
                </Paper>

                {!profile && <button onClick={savePhotos}>Send</button>}

                <Paper style={{width: '100%', height: '50px', marginTop: '120px'}}>
                    <Tap setShow={(value) => setShow(value)}/>
                </Paper>
            </Paper>

            <div style={{width: '92%', padding:'20px'}}>
                <Grid container>
                    <Grid item xs={4}>
                        <InfoBox/>
                    </Grid>
                    <Grid item xs={8} style={{paddingLeft:'30px'}}>
                        <ProfileRightSide show={show}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


export default Profile