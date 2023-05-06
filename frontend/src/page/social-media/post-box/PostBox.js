import React, {useEffect, useState} from 'react';
import './postBox.css'
import Post from "./Post";

const PostBox = ({refreshData}) => {


    const [postData, setPostData] = useState('');
    const [tweetData, setTweetData] = useState('');
    const [postCommentData, setPostCommentData] = useState('');
    const [tweetCommentData, setTweetCommentData] = useState('');
    const [test, setTest] = useState('');
    // const data = [...tweetData, ...postData];
    const [data, setData] = useState([]);

    // Bu fonksiyon, yorumları postId'ye göre gruplandırır
    const groupCommentsByPostId = (comments) => {
        return comments.reduce((acc, comment) => {
            const postId = comment.postId;
            if (!acc[postId]) {
                acc[postId] = [];
            }
            acc[postId].push(comment);
            return acc;
        }, {});
    };

    const groupCommentsByTweetId = (comments) => {
        return comments.reduce((acc, comment) => {
            const tweetId = comment.tweetId;
            if (!acc[tweetId]) {
                acc[tweetId] = [];
            }
            acc[tweetId].push(comment);
            return acc;
        }, {});
    };


    useEffect(() => {
        if (Array.isArray(postCommentData) && Array.isArray(tweetCommentData) && postCommentData.length > 0 || tweetCommentData.length > 0) {
            // Yorumları postId ve tweetId'ye göre gruplandırın
            const groupedPostComments = groupCommentsByPostId(postCommentData);
            const groupedTweetComments = groupCommentsByTweetId(tweetCommentData);

            // Grupları ana veri dizisindeki uygun gönderi ve tweet'lerle birleştirin
            const newData = [...tweetData, ...postData].map((item) => {
                if (item.postId && groupedPostComments[item.postId]) {
                    return {
                        ...item,
                        comments: groupedPostComments[item.postId].map((comment) => ({
                            comment: comment.comment,
                            userId: comment.userId,
                        })),
                    };
                } else if (item.tweetId && groupedTweetComments[item.tweetId]) {
                    return {
                        ...item,
                        comments: groupedTweetComments[item.tweetId].map((comment) => ({
                            comment: comment.comment,
                            userId: comment.userId,
                        })),
                    };
                } else {
                    return item;
                }
            });
            console.log("newData", newData);

            setData(newData); // newData'yı ana veri dizisi olarak ayarlayın
        }
    }, [postCommentData, tweetData, postData, tweetCommentData]);




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

    useEffect(() => {
        if (postData.length > 0) {
            Promise.all(
                postData.map((post) => {
                    const postId = post.postId;
                    return fetch(`http://localhost:8080/comment/getAllComments/${postId}`)
                        .then((response) => response.json())
                        .catch((error) => {
                            console.error("Error: ", error);
                            return [];
                        });
                })
            ).then((allComments) => {
                const filteredComments = allComments.flat().filter((comment) => comment != null);
                setPostCommentData(filteredComments);
            });
        }
    }, [postData]);


    useEffect(() => {
        if (tweetData.length > 0) {
            Promise.all(
                tweetData.map((tweet) => {
                    const tweetId = tweet.tweetId;
                    return fetch(`http://localhost:8080/comment/getAllCommentsTweets/${tweetId}`)
                        .then((response) => response.json())
                        .catch((error) => {
                            console.error("Error: ", error);
                            return [];
                        });
                })
            ).then((allComments) => {
                const filteredComments = allComments.flat().filter((comment) => comment != null);
                setTweetCommentData(filteredComments);
            });
        }
    }, [tweetData]);


    useEffect(() => {
        fetchData();
        // fetchCommentData()
    }, [refreshData]);
    // console.log("commentData",commentData)
    // console.log("postCommentData",postCommentData)
    console.log("tweetCommentData",tweetCommentData)
    console.log("postData",postData)
    // console.log("test",test)
    // const groupedTweetComments = groupCommentsByTweetId(tweetCommentData);

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
                            data={data}
                            postComment ={ data.comments}
                            // postCommentData={postCommentData}
                            // tweetCommentData={tweetCommentData}

                        />
                    ))
            ) : (
                <p>No posts found</p>
            )}
        </div>
    );
};

export default PostBox;