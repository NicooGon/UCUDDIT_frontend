import React, { useEffect, useState } from 'react';
import LeftBar from '../../Components/LeftBar/LeftBar';
import './MainScreen.css';
import Post from '../../Components/Post/Post';
import CreateUser from '../../Axios/createUser';
import { useAuth0 } from '@auth0/auth0-react';
import getPosts from '../../Axios/getPosts';

export default function MainScreen() {
    const { user } = useAuth0();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await getPosts();
            setPosts(data);
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
                await CreateUser(userData);
            }
        };
        handleLogin(); 
    }, [user]);


    return (
        <div className='d-flex flex-column flex-md-row'>
            <LeftBar />
            <div className='col-12 col-md-10 d-flex flex-column align-items-center border border-secondary text-break' style={{ height: '94.87vh' }} id='container'>
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
        </div>
    );
}
