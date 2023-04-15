import React from 'react';
import './header.css';
// import { Link } from 'react-router-dom';



const Header = () => {
        const userName = localStorage.getItem("currentUserName");
        return (
            <div className="header-background">
                <div className='header-list'>
                        { userName === null &&
                                <button>
                                        {/*<Link to="/login"/>*/}
                                        <a href='/login'> Log In</a>
                                </button>}

                </div>
            </div>
        );
}

export default Header;