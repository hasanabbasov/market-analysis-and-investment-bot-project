import React from 'react';
import {Paper} from '@material-ui/core'

const Statuses = ({user, story}) => {
    // console.log("user",user)
    // console.log("story",story)


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