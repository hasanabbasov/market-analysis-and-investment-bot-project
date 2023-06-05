import React,{useState} from 'react';
import { Grid } from '@material-ui/core'
import LeftSide from "../left-side/LeftSide";
import StatusBox from "../status-box/StatusBox";
import SharePost from "../share-post/SharePost";
import PostBox from "../post-box/PostBox";
import RightSide from "../right-side/RightSide";

const Layout = ({combinedData, following, refreshData, setRefreshData}) => {
    return (
        <div className='mainpage_container' style={{background:'#F8F9FA'}}>
            <Grid container>
                <Grid item xs={3}>
                    <LeftSide/>
                </Grid>
                <Grid item xs={6} className='middleContainer'>
                    {/*<StatusBox/>*/}
                    <SharePost  refreshData={refreshData} onRefresh={setRefreshData} />
                    <PostBox  combinedData={combinedData} refreshData={setRefreshData}/>
                </Grid>
                <Grid item xs={3}>
                    <RightSide following={following}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Layout;