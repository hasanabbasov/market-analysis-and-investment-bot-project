import React, {useEffect, useState} from 'react';
import Layout from "./main-page/Layout";
import {useNavigate} from "react-router-dom";

const Index = () => {

    const [combinedData , setCombinedData] = useState([])
    const userId =  localStorage.getItem("currentUserId")
    const [following, setFollowing] = useState('');
    const [refreshData, setRefreshData] = useState(false);

    console.log("combinedData",combinedData)

    console.log("rigtsideFollowinf",following)
    // useEffect(() => {
    //     fetch(`/users/${userId}/following`)
    //         .then((response) => response.json())
    //         .then((res) => setFollowing(res))
    //         .catch(console.error)
    // },[userId, refreshData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postResponse = await fetch('/post/getPost');
                const postResult = await postResponse.json();

                const tweetResponse = await fetch('http://localhost:8080/tweet/allTweet');
                const tweetResult = await tweetResponse.json();

                let combinedData = postResult.concat(tweetResult);

                combinedData.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

                setCombinedData(combinedData);

            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Layout combinedData={combinedData} following={following} refreshData={refreshData} setRefreshData={(value) => setRefreshData(value)}/>
        </div>
    );
};

export default Index;