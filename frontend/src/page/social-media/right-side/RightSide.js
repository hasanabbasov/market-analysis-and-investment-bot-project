import React from 'react';
import './rightSide.css'
import {Avatar} from "@material-ui/core";

const RightSide = () => {
    return (
        <div className="rightside_container">
            <div className="rightside_header">
                Contacts
            </div>
            <div className="rightside_content">
                <div className='imageLayout_imglay'>
                    <Avatar/>
                </div>
                <div className='imageLayout_text'>
                    Bu bir Deneme Future'dur
                </div>
            </div>
        </div>
    );
};

export default RightSide;