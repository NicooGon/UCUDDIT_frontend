import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Post from '../../Components/Post/Post';
import axios from 'axios';

export default function PostCommunityScreen() {
    const [posts, setPosts] = useState([]);
    const { community } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/postsByCommunity', { 
                    params: { community } 
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        if (community) {
            fetchPosts();
        }
    }, [community]);

    return (
        <div className='col-12 col-md-10 d-flex flex-column align-items-center text-break mt-5' id='container'>
            {posts.length === 0 ? (
                <p>No posts available for this community.</p>
            ) : (
                posts.map(post => {
                    const { postId, user, title, content, createdAt, likes = 0 } = post;

                    return (
                        <Post
                            key={postId}
                            postId={postId}
                            title={title}
                            content={content}
                            createdAt={createdAt}
                            user={user}
                            likes={likes}
                        />
                    );
                })
            )}
        </div>
    );
}
