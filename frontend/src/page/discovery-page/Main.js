import React from "react"
import Grid from '@mui/material/Grid';
import LeftSide from "../discovery-page/left-component/Main"
import RightSide from "../discovery-page/right-component/Main"
import DiscoveryPage from "../discovery-page/discovery-page/DiscoveryPage"
import './main.css'
const Main = () => {

    return(
        <Grid className='discovery-main-page' container spacing={3}>
            <Grid item xs={3}>
                <LeftSide/>
            </Grid>
            <Grid item xs={6}>
                <DiscoveryPage/>
            </Grid>
            <Grid item xs={3}>
                <RightSide/>
            </Grid>
        </Grid>
    )
}
export default Main