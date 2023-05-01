import React from 'react';
import './header.css';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import fblogo from "../../styles/logo.png";
import home from "../../styles/home.svg";
import page from "../../styles/pages.svg";
import watch from "../../styles/watch.svg";
import market from "../../styles/market.svg";
import group from "../../styles/groups.svg";
import { Avatar } from '@material-ui/core';
import {useParams} from "react-router-dom";
// import { getImage } from '../../GetImage';
// import { Link } from 'react-router-dom';



const Header = () => {

        const location = useLocation();
        const isChart = location.pathname === '/chart';
        console.log("params", location.pathname)

        const userName = localStorage.getItem("currentUserName");


        return (
            <div className="header-background">
                {/*<div className='header-list'>*/}
                        { userName === null &&
                                <button>
                                        {/*<Link to="/login"/>*/}
                                        <a href='/login'> Log In</a>
                                </button>
                        }
                    { (userName != null && location.pathname != '/social-media') && <div>
                            <button>
                                    <a href='/social-media'>ForYou</a>
                            </button>
                    </div>}

                {/*</div>*/}

                    { location.pathname ==='/social-media' && <div>
                            <Grid container className="navbar__main">
                                    <Grid item xs={3}>
                                            <div className="navbar__leftbar">
                                                    <img className="navbar__logo" src={fblogo} width="40px"/>
                                                    <input className="navbar__search" type="text"
                                                           placeholder="Search Facebook"/>
                                            </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                            <div className="navbar__container">
                                                    <div className="navbar__tabs active">
                                                            <img src={home} height="35px" width="35px"/>
                                                    </div>
                                                    <div className="navbar__tabs">
                                                            <img src={page} height="35px" width="35px"/>
                                                    </div>
                                                    <div className="navbar__tabs">
                                                            <img src={watch} height="35px" width="35px"/>
                                                    </div>
                                                    <div className="navbar__tabs">
                                                            <img src={market} height="35px" width="35px"/>
                                                    </div>
                                                    <div className="navbar__tabs">
                                                            <img src={group} height="35px" width="35px"/>
                                                    </div>
                                            </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                            <div className="navbar__right">
                                                    <div className="navbar__righttab">
                                                            <Avatar className="navbar_rightimg" />
                                                            <div className="navbar__profilename">{userName}</div>
                                                    </div>
                                            </div>
                                    </Grid>
                            </Grid>
                    </div>}
            </div>
        );
}

export default Header;