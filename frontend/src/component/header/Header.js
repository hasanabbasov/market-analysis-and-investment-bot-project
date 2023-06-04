import React, {useEffect, useState} from 'react';
import './header.css';
import {useLocation} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Grid from '@material-ui/core/Grid';
import appLogo from "../../styles/LogoWeb.png";
import home from "../../styles/home.svg";
import page from "../../styles/pages.svg";
import watch from "../../styles/watch.svg";
import market from "../../styles/market.svg";
import group from "../../styles/groups.svg";
import {Avatar} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useParams} from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { getImage } from '../../GetImage';
// import { Link } from 'react-router-dom';


const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState('');
    const [AllUserProfile, setAllUserProfile] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showMore, setShowMore] = useState(false)
    console.log("AllUserProfile",AllUserProfile)
    const isChart = location.pathname === '/chart';
    console.log("filteredUsers",filteredUsers)

    const userName = localStorage.getItem("currentUserName");
    const userId = localStorage.getItem("currentUserId");
    const navigateToSocialMedia = () => navigate('/social-media');
    const navigateToLogin = () => navigate('/login')

    const handleClose = () => {
        setShowMore(false);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value.length > 0) {
            const filtered = AllUserProfile.filter(user =>
                user.nick.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
    }

    const handleClick = (userId) => {
        // You can use this userId to navigate to the appropriate profile page
        navigate(`/profile/${userId}`);
        setFilteredUsers([]);
        setSearch("");
    }

    useEffect(() => {
        fetch(`/profile/get/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
            })
            .catch(console.error);
    }, [userId])

    useEffect(() => {
        fetch(`/profile/getAll`)
            .then((response) => response.json())
            .then((data) => {
                setAllUserProfile(data);
            })
            .catch(console.error);
    }, [userId])


    return (
        <>
            {(userName != null) &&

                <div className="header-background">
                    <Grid container className="navbar__main">
                        <Grid item xs={3}>
                            <div className="header-left-side-logo" >
                                <img className="header-app-logo" src={appLogo} width="40px" onClick={() => navigate("/dashboard")}
                                     />
                                <p className="website-name">InvestMedia</p>
                                { location.pathname === '/social-media' &&

                                    <div className="search-container">
                                        <input className="navbar__search" type="text" placeholder="Search Social Media" value={search} onChange={handleSearch} />
                                        {search && filteredUsers.length > 0 && (
                                        <div className="search-results">
                                            {filteredUsers.map(user => (
                                                <div key={user.userId} className="search-result" onClick={() => handleClick(user.userId)}>
                                                    {user.nick}
                                                </div>
                                            ))}
                                        </div>
                                            )}
                                    </div>
                                }
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{display: "flex", alignItems:"center", justifyContent:"center"}}>
                            <div className="navbar__container">
                                <div className="header-logo-title">
                                    <DashboardIcon/>
                                    <p style={{paddingLeft:'10px' , fontSize:"20px"}} onClick={() => navigate("/dashboard")}>
                                        Dashboard
                                    </p>
                                </div>
                                <div className="header-logo-title">
                                    <ConnectWithoutContactIcon/>
                                    <p style={{paddingLeft:'10px',  fontSize:"20px"}} onClick={navigateToSocialMedia}>
                                        Social Media
                                    </p>
                                </div>

                            </div>
                        </Grid>
                        <Grid item xs={3} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div className="header-right">
                                <div className="header-righttab">
                                    <Avatar className="header-profile-page" src={profile.profileImageUrl}
                                            onClick={() => setShowMore(!showMore)}/>
                                    <div
                                        className="navbar-profilename">{userName}
                                    </div>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={showMore}
                                        open={showMore}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem style={{background: "#2C3E50", width:"200px" , paddingLeft:"75px", color:"white"}} onClick={() => navigate(`/profile/${userId}`)}>Profile</MenuItem>
                                        <MenuItem style={{background: "#2C3E50", width:"200px" , paddingLeft:"75px", color:"white", borderTopx: '1px solid #FFFF'}} onClick={() => navigate(`/output`)}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>}

            {(userName === null && location.pathname === '/') &&
                <div className="header-background-social-media">

                    <div className=''>
                        <button className='social-media-botton' onClick={navigateToLogin}>
                            Login
                        </button>
                    </div>
                </div>
            }
        </>
    );
}

export default Header;