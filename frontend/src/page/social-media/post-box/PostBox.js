import React, { useEffect, useState } from 'react';
import './postBox.css';
import Post from './Post';
import Loading from "../../../component/loading/Loading";

const PostBox = ({ refreshData }) => {
    const [postData, setPostData] = useState([]);
    const [tweetData, setTweetData] = useState([]);
    const [postCommentData, setPostCommentData] = useState([]);
    const [tweetCommentData, setTweetCommentData] = useState([]);
    const [data, setData] = useState([]);

    // console.log("postData",postData)
    // console.log("tweetData",tweetData)
    // console.log("postCommentData",postCommentData)
    // console.log("tweetCommentData",tweetCommentData)
    console.log("data",data)

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
        const fetchData = async () => {
            try {
                const postResponse = await fetch('/post/getPost');
                const postResult = await postResponse.json();
                setPostData(postResult);

                const tweetResponse = await fetch('http://localhost:8080/tweet/allTweet');
                const tweetResult = await tweetResponse.json();
                setTweetData(tweetResult);
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchData();
    }, [refreshData]);

    useEffect(() => {
        if (postData.length > 0) {
            Promise.all(
                postData.map((post) => {
                    const postId = post.postId;
                    return fetch(`http://localhost:8080/comment/getAllComments/${postId}`)
                        .then((response) => response.json())
                        .catch((error) => {
                            console.error('Error: ', error);
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
                            console.error('Error: ', error);
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
        if (Array.isArray(postCommentData) && Array.isArray(tweetCommentData)) {
            const groupedPostComments = groupCommentsByPostId(postCommentData);
            const groupedTweetComments = groupCommentsByTweetId(tweetCommentData);

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

            setData(newData);
        }
    }, [tweetData, postData, postCommentData, tweetCommentData]);

    return (
        <div>
            {data.length > 0 ? (
                data
                    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
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
                            postComment={item.comments}
                        />
                    ))
            ) : (
                <Loading value={"social"}/>
            )}
        </div>
    );
};

export default PostBox;
