import React from 'react';
import BitcoinLogo from "../../../styles/bitcoin-logo.png"
// import ETHLogo from "../../../styles/ethereumpow-logo.png"
import './leftside.css'

const LeftFutureIcon = ({logo, text}) => {
    console.log("logo", logo)
    return (
        <div className='imageLayout_container'>
            <div className='imageLayout_imglay'>
                {/*<img src={logo === "BitcoinLogo" ? BitcoinLogo : ETHLogo} style={{width: '35px', height: '35px'}} alt={""}/>*/}
            </div>
            <div className='imageLayout_text'>
                {text}
            </div>
        </div>
    );
};

export default LeftFutureIcon;