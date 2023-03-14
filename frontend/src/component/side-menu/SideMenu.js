import React, {useState} from "react";
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

    const handleIcon = () =>{
        setIcon(!icon)
        onToggle(!size)
    }

    return(
        <>{ !icon &&
            <div className="side-container">
                <div className="d-grid">
                    <div className="side-menu-icon" onClick={handleIcon}>
                        <MenuIcon/>
                    </div>
                    <div className="side-menu-profile">
                        <div className="side-menu-avatar" >
                            <a href='/profile'><Avatar alt="Remy Sharp" sx={{width: 84, height: 84}}/></a>
                        </div>
                        <div className="side-menu-user-title">
                            Hasan Abasov
                        </div>
                    </div>
                    <Divider variant="middle"/>
                    <div className="side-menu-button">
                        <button>Dashboard</button>
                        <button>Calendar</button>
                        <button>History</button>
                        <button>My Charts</button>
                        <button>My Charts</button>
                        <button>My Charts</button>
                    </div>
                </div>
            </div>}
            { icon &&
                <div className="side-sm-container">
                    <div className="side-sm-menu-icon" onClick={handleIcon}>
                        <MenuOpenIcon/>
                    </div>
                    <div>
                        <IconButton>
                            <AccountCircleIcon/>
                        </IconButton>
                        <IconButton>
                            <DashboardIcon/>
                        </IconButton>
                        <IconButton>
                            <ManageHistoryIcon/>
                        </IconButton>
                        <IconButton>
                            <TimelineIcon/>
                        </IconButton>

                    </div>
                </div>
            }
        </>
    )

}
export default SideMenu;