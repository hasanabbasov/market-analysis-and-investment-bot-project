import React, {useState} from 'react';
import SideMenu from '../../component/side-menu/SideMenu'
import './main.css'
import Grid from '@mui/material/Grid';

const Main = () => {
    const [sizes, setSize] = useState(false)

    const SideMenuBackground = (sizes) => {
        switch (sizes) {
            case false:
                return (<Grid item xs={2}><SideMenu size={sizes} onToggle={(newSize) => setSize(newSize)}/></Grid>);
            default:
                return (<Grid item xs={0.5}><SideMenu size={sizes} onToggle={(newSize) => setSize(newSize)}/></Grid>);
        }};

    return (
        <Grid container spacing={2}>
            <>{SideMenuBackground(sizes)}</>
            <>
                <Grid item>Hello11</Grid>
            </>
        </Grid>
    );
};

export default Main;