import React, {useEffect, useState} from 'react';
import {Avatar, Paper} from "@material-ui/core";
import {useParams} from "react-router-dom";
import Tap from "./OtherTap";
import Grid from "@material-ui/core/Grid";
import InfoBox from "./InfoBox";
import ProfileRightSide from "./OtherRightside";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";

const OtherUserProfile = () => {
    const {userId} = useParams();
    const currentUserId = localStorage.getItem("currentUserId")
    const [userProfileInfo, setUserProfileInfo] = useState('');
    const [userFollowing, setUserFollowing] = useState('');
    const [show, setShow] = useState('home');
    console.log("userFollowing",userFollowing)

    useEffect(() => {
        fetch(`/profile/get/${userId}`)
            .then((response) => response.json())
            .then((res) => setUserProfileInfo(res))
            .catch(console.error)
    },[userId])


    useEffect(() => {
        fetch(`/users/${currentUserId}/following`)
            .then((response) => response.json())
            .then((res) => setUserFollowing(res))
            .catch(console.error)
    },[userId])


    const followUser = () => {
        fetch(`/users/${currentUserId}/follow/${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((res) => {
                console.log("Success: ", res)
            })
    }

    const unfollowUser = () => {
        fetch(`/users/${currentUserId}/unfollow/${userId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((res) => {
                console.log("Success: ", res)
            })
            .catch(console.error)
    }


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
                width: '92%',marginTop:"10px", minHeight: '300px', display: 'flex', justifyContent: 'center'
                , flexDirection: 'column', alignItems: 'center', boxShadow: "0 4px 6px rgba(2, 56, 98, 0.9)"
            }}>
                <Paper style={{width: '100%', height: '255px', boxShadow: "0 4px 6px rgba(2, 56, 98, 0.9)"}}>
                    <img src={userProfileInfo?.backgroundImageUrl} style={{width: '100%', height: '252px'}} alt={""}/>
                    <Avatar src={userProfileInfo?.profileImageUrl}  style={{width: '170px', height: '170px', position: 'absolute', marginTop: '-60px', marginLeft:'50px',boxShadow: "0 4px 6px rgba(2, 56, 98, 0.9)"}}>

                    </Avatar>

                    <div style={{position: 'absolute', marginTop: '30px', paddingLeft: '245px',fontWeight:'bold'}}>{userProfileInfo?.nick}</div>
                    <div style={{position: 'absolute', marginTop: '55px', paddingLeft: '245px',fontWeight:'400',fontSize:"14px"}}>{userProfileInfo?.lastname} <span>{userProfileInfo?.firstname}</span></div>
                    <div style={{position: 'absolute', marginTop: '80px', paddingLeft: '245px',fontWeight:'200',fontSize:"14px"}}>{userProfileInfo?.email}</div>
                    <div style={{position: 'absolute', marginTop: '55px', paddingLeft: '1145px',fontWeight:'400',fontSize:"14px"}}>
                        <div>
                            {userId === currentUserId ?
                                <div/> :
                                userFollowing && userFollowing?.some(follow => follow.userId === userProfileInfo?.userId) ?
                                    <Grid item xs={3} className="post-box-unfollow-botton" style={{paddingLeft:"45px", paddingRight:"45px"}}>
                                    <span style={{paddingRight: "5px", fontSize: "15px"}}
                                          onClick={unfollowUser}>Unfollow</span>
                                        <FollowTheSignsIcon style={{fontSize: "20px"}}/>
                                    </Grid> :
                                    <Grid item xs={3} className="post-box-follow-botton" style={{paddingLeft:"45px", paddingRight:"45px"}}>
                                    <span style={{paddingRight: "5px", fontSize: "15px"}}
                                          onClick={followUser}>Follow</span>
                                        <FollowTheSignsIcon style={{fontSize: "20px"}}/>
                                    </Grid>
                            }
                        </div>
                    </div>
                </Paper>

                <Paper className="profile-tap-background"  style={{width: '100%', height: '50px', marginTop: '140px',marginBottom:"20px" , background:"#2C3E50"}}>
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