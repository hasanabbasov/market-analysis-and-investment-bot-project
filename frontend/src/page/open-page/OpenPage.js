import React from 'react';
import './openPage.css'
import BackgroundLogo from '../../styles/background.jpeg'

const OpenPage = () => {
    return (
        <div className="background-image">
            <img src={BackgroundLogo} alt="Background" className="background-image__logo" />
            <h1 style={{color:'yellow'}}>Hoş Geldiniz!</h1>
            <p style={{color:'yellow'}}>Web sitemize hoş geldiniz!</p>
        </div>
    );
};

export default OpenPage;