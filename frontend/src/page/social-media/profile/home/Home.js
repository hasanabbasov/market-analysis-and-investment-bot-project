import React, {useState} from 'react';
import './home.css'
import SharePost from "../../share-post/SharePost";
import PostBox from "../../post-box/PostBox";


const Home = () => {
    const [refreshData, setRefreshData] = useState(false);
    return (
        <div >
            <SharePost refreshData={refreshData} onRefresh={(value) => setRefreshData(value)}/>
            <PostBox refreshData={refreshData}/>
        </div>
    );
};

export default Home;