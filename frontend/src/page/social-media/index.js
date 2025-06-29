import React, {useEffect, useState} from 'react';
import Layout from "./main-page/Layout";

const Index = () => {

    const [combinedData , setCombinedData] = useState([])
    const userId =  localStorage.getItem("currentUserId")
    const [following, setFollowing] = useState('');
    const [refreshData, setRefreshData] = useState(false);

    console.log("combinedData",combinedData)

    console.log("rigtsideFollowinf",following)

    const [mainUserProfileInfo, setMainUserProfileInfo] = useState('');

    useEffect(() => {
        fetch(`/profile/get/${userId}`)
            .then((response) => response.json())
            .then(setMainUserProfileInfo)
            .catch(console.error)
    }, [userId, refreshData])

    useEffect(() => {
        fetch(`/users/${userId}/following`)
            .then((response) => response.json())
            .then((res) => setFollowing(res))
            .catch(console.error)
    },[userId, refreshData])


    useEffect(() => {
        const fetchData = async () => {
            try {

                const postResponse = await fetch('/post/getPost?userId=' + userId);
                const postResult = await postResponse.json();

                const tweetResponse = await fetch('http://localhost:8080/tweet/allTweet?userId=' + userId);
                const tweetResult = await tweetResponse.json();

                let combinedData = postResult.concat(tweetResult);

                combinedData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

                setCombinedData(combinedData);

            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, [refreshData]);


    return (
        <div>
            <Layout combinedData={combinedData} following={following} refreshData={refreshData} setRefreshData={(value) => setRefreshData(value)} mainUserProfileInfo={mainUserProfileInfo}/>
        </div>
    );
};

export default Index;