import React,{useEffect, useState}  from 'react';
import Post from "./Post";

const Posts = () => {

    const [post, setPost] = useState('');
    const userId = localStorage.getItem("currentUserId")
    useEffect(() => {
        fetch(`/post/getPost/${userId}`)
            .then((response) => response.json())
            .then(setPost)
            .catch(console.error)
    },[])
    return (
        <div>
            {
                post && post.map((post) => (
                    <Post post={post}/>
                ))
            }
        </div>
    );
};

export default Posts;