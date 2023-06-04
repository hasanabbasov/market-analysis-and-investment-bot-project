import React, {useEffect, useState} from 'react';
import {Avatar, Paper} from "@material-ui/core";
import {useParams} from "react-router-dom";
import Tap from "./OtherTap";
import Grid from "@material-ui/core/Grid";
import InfoBox from "./InfoBox";
import ProfileRightSide from "./OtherRightside";

const OtherUserProfile = () => {
    const {userId} = useParams();
    const [userProfileInfo, setUserProfileInfo] = useState('');
    const [show, setShow] = useState('home');
    console.log("userProfileInfo",userProfileInfo)

    useEffect(() => {
        fetch(`/profile/get/${userId}`)
            .then((response) => response.json())
            .then((res) => setUserProfileInfo(res))
            .catch(console.error)
    },[userId])

    // profileImageUrl

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
                <Paper style={{width: '100%', minHeight: '150px'}}>
                    <img src={userProfileInfo?.backgroundImageUrl} style={{width: '100%', height: '260px',}} alt={""}/>
                    <Avatar src={userProfileInfo?.profileImageUrl} style={{width: '170px', height: '170px', position: 'absolute', marginTop: '-60px', marginLeft:'50px'}}>

                    </Avatar>

                    <div style={{position: 'absolute', marginTop: '30px', paddingLeft: '245px',fontWeight:'bold'}}>{userProfileInfo?.nick}</div>
                </Paper>

                <Paper className="profile-tap-background" style={{width: '100%', height: '50px', marginTop: '120px' , background:"rgb(210,211,213)"}}>
                    <Tap show={show} setShow={(value) => setShow(value)}/>
                </Paper>
            </Paper>

            <div style={{width: '92%', padding:'20px'}}>
                <Grid container>
                    <Grid item xs={4}>
                        <InfoBox userProfileInfo={userProfileInfo} />
                    </Grid>
                    <Grid item xs={8} style={{paddingLeft:'30px'}}>
                        <ProfileRightSide show={show}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default OtherUserProfile;