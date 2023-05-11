import React,{useState, useEffect} from 'react';
import {Paper} from '@material-ui/core'
import uploadIcon from "../../../styles/upload.png";
import Resizer from 'react-image-file-resizer';
import status1 from "../../../styles/pic2.jpeg";

const Statuses = ({user, story}) => {
    console.log("user",user)
    console.log("story",story)


    return (
        <div>

            { story &&

                <Paper className="statusbar__status">
                    <img src={story} className="status__image" />
                </Paper>

            }



        </div>
    );
};

export default Statuses;