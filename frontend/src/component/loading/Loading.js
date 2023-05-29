import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// Inspired by the former Facebook spinners.
const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#1a90ff',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));

function FacebookCircularProgress(props) {
    const classes = useStylesFacebook();

    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </div>
    );
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const CustomizedProgressBars = ({value}) => {
    const classes = useStyles();
    // console.log("value",value)

    return (
        <>
            {value === "bot" &&
                <div className={classes.root}
                  style={{paddingLeft: '85%', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
                <h1 style={{whiteSpace: 'nowrap', paddingRight: '50px'}}>Yatırım Yapılıyor</h1>
                <FacebookCircularProgress/>
            </div>}
            { value === "analysis" &&
                <div className={classes.root}
                style={{paddingLeft: '40%', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
                <h1 style={{whiteSpace: 'nowrap'}}>Analysis Yapılıyor</h1>
                <FacebookCircularProgress/>
                </div>
            }
            { value === "social" &&
                <div className={classes.root}
                style={{paddingLeft: '25%', display: 'flex', flexWrap: 'nowrap', alignItems: 'center'}}>
                <h1 style={{whiteSpace: 'nowrap', minHeight: '500px'}}>Paylaşımlar yükleniyor
                    <FacebookCircularProgress/></h1>

                </div>
            }
        </>
    );
}
export default CustomizedProgressBars
