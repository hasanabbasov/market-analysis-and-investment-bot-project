import React,{useState} from 'react';
import { Grid } from '@material-ui/core'
import LeftSide from "../left-side/LeftSide";
import StatusBox from "../status-box/StatusBox";
import SharePost from "../share-post/SharePost";
import PostBox from "../post-box/PostBox";
import RightSide from "../right-side/RightSide";

const Layout = () => {
    const [refreshData, setRefreshData] = useState(false);
    // console.log("refreshData",refreshData)
    return (
        <div className='mainpage_container' style={{background:'#F8F9FA'}}>
            <Grid container>
                <Grid item xs={3}>
                    <LeftSide/>
                </Grid>
                <Grid item xs={6} className='middleContainer'>
                    {/*<StatusBox/>*/}
                    <SharePost  refreshData={refreshData} onRefresh={(value) => setRefreshData(value)}/>
                    <PostBox refreshData={refreshData}/>
                </Grid>
                <Grid item xs={3}>
                    <RightSide/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Layout;