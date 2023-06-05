import React from 'react';
import './postBox.css';
import Post from './Post';
import Loading from "../../../component/loading/Loading";

const PostBox = ({ refreshData, setRefreshData, combinedData, mainUserProfileInfo }) => {
    return (
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
                            mainUserProfileInfo={mainUserProfileInfo}
                        />
                    ))
            ) : (
                <Loading value={"social"}/>
            )}
        </div>
    );
};

export default PostBox;
