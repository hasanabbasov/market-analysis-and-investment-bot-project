import React, {useState} from "react";
import { Link } from "react-router-dom";
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
    const userName = localStorage.getItem("currentUserId");


    console.log("test" , localStorage.getItem("currentUserName"))
    const handleIcon = () =>{
        setIcon(!icon)
        onToggle(!size)
    }

    return(
        <>{ !icon &&
            <div className="side-container">
                <div className="d-grid">
                    <div className="side-menu-icon" onClick={handleIcon}>
                        <MenuOpenIcon style={{color:"white"}}/>
                    </div>
                    <div className="side-menu-profile">
                        <div className="side-menu-avatar" >
                            <a href='/profile'><Avatar alt="Remy Sharp" sx={{width: 84, height: 84}}/></a>
                        </div>
                        <div className="side-menu-user-title">
                            {userName}
                        </div>
                    </div>
                    <Divider variant="middle"/>
                    <div className="side-menu-button">
                        <button className="side-menu-button-background">
                            <Link to="/dashboard">
                                Dashboard
                            </Link>
                        </button>
                        <button>
                            <Link to="/chart">
                            Charts
                            </Link>
                        </button>
                        <button>History</button>
                        <button>Analiz</button>
                        <button>Invest Bot</button>
                        <button>News</button>

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