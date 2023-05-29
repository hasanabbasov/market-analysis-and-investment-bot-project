import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./sidemenu.css"
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import TimelineIcon from '@mui/icons-material/Timeline';


const SideMenu = ({size, onToggle}) =>{

    const [icon, setIcon] = useState(false);
    const [profile, setProfile] = useState('');
    const userName = localStorage.getItem("currentUserName");
    const userId = localStorage.getItem("currentUserId");
    const navigate = useNavigate();
    // console.log("profile",profile)

    const handleIcon = () =>{
        setIcon(!icon)
        onToggle(!size)
    }

    useEffect(() =>{
        fetch(`/profile/get/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
            })
            .catch(console.error);
    },[userId])

    return(
        <>{ !icon &&
            <div className="side-container">
                <div className="d-grid">
                    <div className="side-menu-icon" onClick={handleIcon}>
                        <MenuOpenIcon style={{color:"white", cursor:'pointer'}}/>
                    </div>
                    <div className="side-menu-profile">
                        <div className="side-menu-avatar" >
                            <Avatar onClick={() => navigate(`/profile/${userId}`)} src={profile.profileImageUrl} alt="Remy Sharp" sx={{width: 84, height: 84}}/>
                        </div>
                        <div className="side-menu-user-title">
                            {userName}
                        </div>
                    </div>
                    <Divider variant="middle"/>
                    <div className="side-menu-button">
                        <button className="side-menu-button-background" onClick={() => navigate("/dashboard")}>
                                Information
                        </button>
                        <button className="side-menu-button-background" onClick={() => navigate("/chart")}>
                            Charts
                        </button>
                        {/*<button className="side-menu-button-background" onClick={() => navigate("/history")}>History</button>*/}
                        <button className="side-menu-button-background" onClick={() => navigate("/analysis")}>Analiz</button>
                        <button className="side-menu-button-background" onClick={() => navigate("/bot")}>Invest Bot</button>
                        {/*<button className="side-menu-button-background" onClick={() => navigate("/news")}>News</button>*/}

                    </div>
                </div>
            </div>}
            { icon &&
                <div className="side-sm-container">
                    <div className="side-sm-menu-icon" onClick={handleIcon}>
                        <MenuIcon style={{color:"white"}}/>
                    </div>
                    <div>
                        <IconButton style={{paddingTop:"40px"}}>
                            <AccountCircleIcon style={{color:"white"}}/>
                        </IconButton>
                        <IconButton style={{paddingTop:"20px"}}>
                            <DashboardIcon style={{color:"white"}}/>
                        </IconButton>
                        <IconButton style={{paddingTop:"20px"}}>
                            <ManageHistoryIcon style={{color:"white"}}/>
                        </IconButton>
                        <IconButton style={{paddingTop:"20px"}}>
                            <TimelineIcon style={{color:"white"}}/>
                        </IconButton>

                    </div>
                </div>
            }
        </>
    )

}
export default SideMenu;