import React from 'react';
import './leftside.css'
import LeftFutureIcon from "./LeftFutureIcon";

const LeftSide = () => {
    return (
        <div>
            <LeftFutureIcon logo={"BitcoinLogo"} text={"Filter Bitcoin news."}/>
            <LeftFutureIcon logo={"ETHLogo"} text={"Filter Ethereum news."} />
        </div>
    );
};

export default LeftSide;