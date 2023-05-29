import React, {useEffect, useState} from 'react';
import './rightSide.css'
import {Avatar} from "@material-ui/core";
import {useNavigate} from 'react-router-dom';

const RightSide = () => {
    const userId =  localStorage.getItem("currentUserId")
    const [following, setFollowing] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`/users/${userId}/following`)
            .then((response) => response.json())
            .then((res) => setFollowing(res))
            .catch(console.error)
    },[])
    // /social-media/user/:userId
    return (
        <div className="rightside_container">
            <div className="rightside_header">
                Contacts
            </div>
            {  following ? following?.map((follow) => (
                <div className="rightside_content">
                    <div className='imageLayout_imglay'>
                        <Avatar/>
                        <div className='popup'>
                            <p><strong style={{paddingRight:'5px'}}>Nick:</strong> {follow.userName}</p>
                            <p><strong style={{paddingRight:'5px'}}>Email:</strong>{follow.email}</p>
                            <button onClick={() => navigate(`/social-media/user/${follow?.userId}`)} style={{background:"#2C3E50", paddingRight:"5px", paddingLeft:"5px", color:"white",fontSize:"10px", cursor:"pointer"}}>Profili Ziyaret et</button>
                        </div>
                    </div>
                    <div className='imageLayout_text'>
                        {follow.userName}
                    </div>
                </div>
            )) :
            <p>Loading..</p>
            }
        </div>
    );
};

export default RightSide;