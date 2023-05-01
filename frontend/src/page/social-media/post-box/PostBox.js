import React, {useEffect, useState} from 'react';
import './postBox.css'
import Post from "./Post";

const PostBox = ({refreshData}) => {


    const [postData, setPostData] = useState('');
    const [tweetData, setTweetData] = useState('');
    const [postCommentData, setPostCommentData] = useState('');
    const [tweetCommentData, setTweetCommentData] = useState('');
    const data = [...tweetData, ...postData];

    const fetchData = async () => {
        try {
            const postResponse = await fetch('/post/getPost');
            const postResult = await postResponse.json();
            setPostData(postResult);

            const tweetResponse = await fetch('http://localhost:8080/tweet/allTweet');
            const tweetResult = await tweetResponse.json();
            setTweetData(tweetResult);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    //TODO
    // burada tum commentleri cekmeye calisicagiz
    // useEffect(() => {
    //     if (postData.length >=1) {
    //         postData.map((post) => {
    //             const postId = post.postId;
    //
    //         })
    //     }
    //     fetch(`http://localhost:8080/comment/getAllComments/${16}`)
    //         .then((response) => response.json())
    //         .then((res) => {
    //             console.log("res", res)
    //             setPostCommentData(res);
    //         }).catch((error) => {
    //         console.error("Error: ", error)
    //     })
    // },[])

    const fetchCommentData = async () => {
        try {
            console.log("hellooo1")
                // console.log("hellooo")
                // const postId = post.postId;
                // const commentResponse =  fetch(`http://localhost:8080/comment/getAllComments/${postId}`);
                // const commentResult =  commentResponse.json();
                // setPostCommentData(commentResult);
            //      useEffect(() => {
            //          postData.map((post) =>{
            //
            //              const postId = post.postId;
            //          fetch(`http://localhost:8080/comment/getAllComments/${postId}`)
            //              .then((response) => response.json())
            //              .then((res) => {
            //                  console.log("res", res)
            //                  setPostCommentData(res);
            //              }).catch((error) => {
            //                  console.error("Error: " ,error)
            //          })
            //      }, [])
            // })


            // tweetData.map((tweet) =>{
            //     const tweetId = tweet.postId;
            //     const commentResponse =  fetch(`http://localhost:8080/getAllComments/${tweetId}`);
            //     const commentResult =  commentResponse.json();
            //     setTweetCommentData(commentResult);
            // })


        } catch (error) {
            console.error("Error: ", error)
        }
    }

    useEffect(() => {
        fetchData();
        // fetchCommentData()
    }, [refreshData]);
    // console.log("commentData",commentData)
    console.log("postCommentData",postCommentData)
    console.log("tweetCommentData",tweetCommentData)

    return (
        <div>
            { data.length > 0 ? (
                data
                    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                    .map((data) => (
                        <Post
                            nick={data.nick}
                            description={data.description}
                            like={data.likes}
                            // key={data.postId || data.tweetId}
                            tweet={data.tweetText}
                            postId={data.postId}
                            tweetId={data.tweetId}
                            photo={data.postImgUrl}
                        />
                    ))
            ) : (
                <p>No posts found</p>
            )}
        </div>
    );
};

export default PostBox;