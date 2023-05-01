import React from 'react';
import { Avatar } from '@material-ui/core'
import './leftside.css'

const LeftFutureIcon = () => {
    return (
        <div className='imageLayout_container'>
            <div className='imageLayout_imglay'>
                <Avatar/>
            </div>
            <div className='imageLayout_text'>
                Bu bir Deneme Future'dur
            </div>
        </div>
    );
};

export default LeftFutureIcon;