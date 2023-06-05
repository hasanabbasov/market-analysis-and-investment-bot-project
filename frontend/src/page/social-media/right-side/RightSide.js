import React from 'react';
import './rightSide.css'
import {Paper, Avatar} from "@material-ui/core";
import {useNavigate} from 'react-router-dom';

const RightSide = ({following}) => {
    const navigate = useNavigate();

    return (
        <div className="rightside_container">
            <div className="rightside_header">
                Contacts
            </div>
            {  following ? following?.sort((a, b) => b.userId- a.userId).map((follow) => (
                    <Paper className="rightside-contact-paper">
                        <div className="rightside_content">
                            <div className='imageLayout_imglay'>
                                <Avatar src={follow.profileImageUrl}/>
                                <div className='popup'>
                                    <p><span style={{paddingRight: '5px', fontWeight:"500"}}>Nick:</span> {follow.userName}</p>
                                    <p><span style={{paddingRight: '5px', fontWeight:"500"}}>Email:</span>{follow.email}</p>
                                    <button onClick={() => navigate(`/social-media/user/${follow?.userId}`)} style={{
                                        background: "#2C3E50",
                                        paddingRight: "25px",
                                        paddingLeft: "25px",
                                        color: "white",
                                        fontSize: "13px",
                                        cursor: "pointer",
                                        marginLeft:"35px"
                                    }}>Profili Ziyaret et
                                    </button>
                                </div>
                            </div>
                            <div className='imageLayout_text'>
                                {follow.userName}
                            </div>
                        </div>
                    </Paper>
            )) :
            <p>Loading..</p>
            }
        </div>
    );
};

export default RightSide;