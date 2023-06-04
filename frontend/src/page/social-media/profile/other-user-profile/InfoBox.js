import React from 'react';
import {Paper} from '@material-ui/core'

const InfoBox = ({userProfileInfo}) => {
    return (
        <Paper>
            <div>
                <div className='info-box-title-background'>
                    <div className='info-box-title'>Education:</div>
                    <div className='info-box-answer'>{userProfileInfo?.education}</div>
                </div>
                <div className='info-box-title-background'>
                    <div className='info-box-title'>Tweetr:</div>
                    <div className='info-box-answer'>{userProfileInfo?.twitter}</div>
                </div>
                <div className='info-box-title-background'>
                    <div className='info-box-title'>Facebook:</div>
                    <div className='info-box-answer'>{userProfileInfo?.facebook}</div>
                </div>
                <div className='info-box-title-background'>
                    <div className='info-box-title'>Info:</div>
                    <div className='info-box-answer'>{userProfileInfo.info}</div>
                </div>
                <div className='info-box-title-background'>
                    <div className='info-box-title'>Lives in:</div>
                    <div className='info-box-answer'>{userProfileInfo?.live}</div>
                </div>
            </div>
        </Paper>
    );
};

export default InfoBox;