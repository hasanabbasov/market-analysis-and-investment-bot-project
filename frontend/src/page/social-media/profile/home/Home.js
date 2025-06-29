import React, {useEffect, useState} from 'react';
import './home.css'
import SharePost from "../../share-post/SharePost";
import PostBox from "../../post-box/PostBox";
import Post from "../../post-box/Post";
import Loading from "../../../../component/loading/Loading";
import {useParams} from "react-router-dom";


const Home = () => {
    const [refreshData, setRefreshData] = useState(false);
    const [combinedData , setCombinedData] = useState([]);
    const comingFromProfile = "Profile";
    const {userId} = useParams();
    console.log("combinedDataInProfile: ", combinedData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await fetch(`/post/getPost/${userId}`);
                const postResult = await postResponse.json();

                const tweetResponse = await fetch(`/tweet/allTweet/${userId}`);
                const tweetResult = await tweetResponse.json();

                let combinedData = postResult.concat(tweetResult);

                // Tarihlerine göre sırala (en yeniden en eskiye)
                combinedData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

                setCombinedData(combinedData);  // birleştirilmiş ve sıralanmış veriyi duruma ayarla

            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, [refreshData]);

    return (
        <div>
            <SharePost refreshData={refreshData} onRefresh={(value) => setRefreshData(value)} comingFromProfile={comingFromProfile}/>

            <div>
                {combinedData.length > 0 ? (
                    combinedData
                        .map((item) => (
                            <Post
                                nick={item.nick}
                                description={item.description}
                                like={item.likes}
                                followedId={item?.userId}
                                tweet={item.tweetText}
                                postId={item.postId}
                                tweetId={item.tweetId}
                                photo={item.postImgUrl}
                                data={item}
                                comments={item.comments}
                                setRefreshData={setRefreshData}
                                refreshData={refreshData}
                                comingFromProfile={comingFromProfile}
                            />
                        ))
                ) : (
                    <Loading value={"social"}/>
                )}
            </div>
        </div>
    );
};

export default Home;