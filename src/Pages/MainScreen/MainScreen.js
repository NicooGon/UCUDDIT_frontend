import React, { useEffect, useState } from 'react';
import './MainScreen.css';
import Post from '../../Components/Post/Post';
import { CreateUser } from '../../Axios/axiosUser';
import { useAuth0 } from '@auth0/auth0-react';
import { getPosts } from '../../Axios/axiosPost';

export default function MainScreen() {
    const { user } = useAuth0();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
            }
            catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const handleLogin = async () => {
            if (user) {
                const userData = {
                    auth0id: user.sub,
                    name: user.name,
                    email: user.email,
                    imageUrl: user.picture,
                };

                try {
                    await CreateUser(userData);
                }
                catch (error) {
                    console.error("Error creating user:", error);
                }
            }
        };

        handleLogin();
    }, [user]);

    return (

        <div className='col-12 col-md-10 d-flex flex-column align-items-center border border-secondary text-break mt-5' id='container'>
            {posts.map(post => {
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
            })}

        </div>

    );
}
