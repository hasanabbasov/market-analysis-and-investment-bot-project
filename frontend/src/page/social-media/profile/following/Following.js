import React, {useEffect, useState} from 'react';
import "./profileFollowing.css"
import {useNavigate, useParams} from "react-router-dom";
import {Avatar, Paper} from "@material-ui/core";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import Grid from "@material-ui/core/Grid";

const Following = () => {
    const {userId} = useParams();
    const navigate = useNavigate();
    const currentUserId  = localStorage.getItem("currentUserId")
    const [following, setFollowing] = useState([]);
    console.log("following", following)

    useEffect(() => {
        followingList()
    }, [userId])

    const followingList = () => {
        fetch(`/users/${userId}/following`)
            .then((response) => response.json())
            .then((res) => setFollowing(res))
            .catch(console.error)
    }

    const unfollowUser = (followerId) => {
        fetch(`/users/${userId}/unfollow/${followerId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((res) => {
                console.log("Success: ", res)
            })
            .catch(console.error).finally(followingList)
    }

    return (
        <div>
            {following ? following?.sort((a, b) => b.userId- a.userId).map((follow) => (
                    <Paper className="profile-following-contact-paper">
                        <div className="profile-following-first-background">
                            <div className='imageLayout_imglay'>
                                <Avatar src={follow.profileImageUrl}/>
                            </div>
                            <div className='imageLayout_text'>
                                {follow.userName}
                            </div>
                        </div>
                        { currentUserId != follow?.userId ?
                            <>
                                <button onClick={() => navigate(`/social-media/user/${follow?.userId}`)}
                                        style={{marginRight: "20px"}} className="following-profile-visit">Visit Profile
                                </button>
                                <Grid item xs={3} className="following-unfollow-botton">
                                    <span style={{paddingRight: "5px", fontSize: "15px"}}
                                          onClick={() => unfollowUser(follow?.userId)}>Unfollow</span>
                                    <FollowTheSignsIcon style={{fontSize: "20px"}}/>
                                </Grid></>
                            :
                            <button onClick={() => navigate(`/profile/${follow?.userId}`)}
                                    className="following-profile-visit">Back to Profile page
                            </button>
                        }
                    </Paper>
                )) :
                <p>Loading..</p>
            }
        </div>
    );
};

export default Following;