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
import {useParams} from "react-router-dom";
// import { getImage } from '../../GetImage';
// import { Link } from 'react-router-dom';


const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState('');

    const isChart = location.pathname === '/chart';
    console.log("params", location.pathname)

    const userName = localStorage.getItem("currentUserName");
    const userId = localStorage.getItem("currentUserId");
    const navigateToSocialMedia = () => navigate('/social-media');
    const navigateToLogin = () => navigate('/login')

    useEffect(() => {
        fetch(`/profile/get/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setProfile(data);
            })
            .catch(console.error);
    }, [userId])


    return (
        <>
            {(userName != null) &&

                <div className="header-background">
                    <Grid container className="navbar__main">
                        <Grid item xs={3}>
                            <div className="header-left-side-logo" onClick={() => navigate("/dashboard")}>
                                <img className="header-app-logo" src={appLogo} width="40px"
                                     />
                                <p className="website-name">InvestMedia</p>
                                { location.pathname === '/social-media' && <input className="navbar__search" type="text"
                                        placeholder="Search Social Media"/>}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="navbar__container">
                                <div className="header-logo-title">
                                    <DashboardIcon/>
                                    <p style={{paddingLeft:'10px'}} onClick={() => navigate("/dashboard")}>
                                        Dashboard
                                    </p>
                                </div>
                                <div className="header-logo-title">
                                    <ConnectWithoutContactIcon/>
                                    <p style={{paddingLeft:'10px'}} onClick={navigateToSocialMedia}>
                                        Social Media
                                    </p>
                                </div>

                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className="navbar__right">
                                <div className="navbar__righttab">
                                    <Avatar className="header-profile-page" src={profile.profileImageUrl}
                                            onClick={() => navigate(`/profile/${userId}`)}/>
                                    <div
                                        className="navbar__profilename">{userName}</div>
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

            {/*{(location.pathname === '/social-media' && userName != null) &&*/}
            {/*    <div className="header-background">*/}
            {/*        <Grid container className="navbar__main">*/}
            {/*            <Grid item xs={3}>*/}
            {/*                <div className="navbar__leftbar">*/}
            {/*                    <img className="header-app-logo" src={appLogo} width="40px"*/}
            {/*                         onClick={() => navigate("/dashboard")}/>*/}
            {/*                    <input className="navbar__search" type="text"*/}
            {/*                           placeholder="Search Social Media"/>*/}
            {/*                </div>*/}
            {/*            </Grid>*/}
            {/*            <Grid item xs={6}>*/}
            {/*                <div className="navbar__container">*/}
            {/*                    <div className="navbar__tabs active">*/}
            {/*                        <img src={home} height="35px" width="35px"/>*/}
            {/*                    </div>*/}
            {/*                    <div className="navbar__tabs">*/}
            {/*                        <img src={page} height="35px" width="35px"/>*/}
            {/*                    </div>*/}
            {/*                    <div className="navbar__tabs">*/}
            {/*                        <img src={watch} height="35px" width="35px"/>*/}
            {/*                    </div>*/}
            {/*                    <div className="navbar__tabs">*/}
            {/*                        <img src={market} height="35px" width="35px"/>*/}
            {/*                    </div>*/}
            {/*                    <div className="navbar__tabs">*/}
            {/*                        <img src={group} height="35px" width="35px"/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Grid>*/}
            {/*            <Grid item xs={3}>*/}
            {/*                <div className="navbar__right">*/}
            {/*                    <div className="navbar__righttab">*/}
            {/*                        <Avatar className="header-profile-page" src={profile.profileImageUrl}*/}
            {/*                                onClick={() => navigate(`/profile/${userId}`)}/>*/}
            {/*                        <div*/}
            {/*                            className="navbar__profilename">{userName}</div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </div>}*/}

            {/*{(location.pathname === `/profile/${userId}` && userName != null) &&*/}
            {/*    <div className="header-background">*/}
            {/*        <Grid container className="navbar__main">*/}
            {/*            <Grid item xs={3}>*/}
            {/*                <div className="navbar__leftbar">*/}
            {/*                    <img className="header-app-logo" src={appLogo} width="40px"*/}
            {/*                         onClick={() => navigate("/dashboard")}/>*/}
            {/*                </div>*/}
            {/*            </Grid>*/}
            {/*            <Grid item xs={6}>*/}

            {/*            </Grid>*/}
            {/*            <Grid item xs={3}>*/}
            {/*                <div className="navbar__right">*/}
            {/*                    <div className="navbar__righttab">*/}
            {/*                        <div className="back-to-social-media-icon">*/}
            {/*                            <img src={page} height="35px" width="35px"/>*/}
            {/*                        </div>*/}
            {/*                        <div className='back-to-social-media' onClick={() => navigate("/social-media")}>*/}
            {/*                            Back to Main Page*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </div>*/}

            {/*}*/}
        </>
    );
}

export default Header;