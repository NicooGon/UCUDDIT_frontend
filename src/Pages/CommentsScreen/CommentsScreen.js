import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../../Components/Post/Post';
import LeftBar from '../../Components/LeftBar/LeftBar';
import './CommentsScreen.css';
import { CreateComment } from '../../Axios/axiosComment';
import { useAuth0 } from '@auth0/auth0-react';
import Comment from '../../Components/Comment/Comment';

export default function CommentsScreen() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const { user, isAuthenticated } = useAuth0();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`http://localhost:8080/commentsByPost?postId=${postId}`);
            setComments(response.data);
        };
        fetchComments();
    }, [postId]);

    useEffect(() => {
        const fetchPostById = async () => {
            const response = await axios.get(`http://localhost:8080/postById?postId=${postId}`);
            setPost(response.data);
        };

        if (postId) {
            fetchPostById();
        }
    }, [postId]);

    const saveComment = (e) => {
        setComment(e.target.value);
    }

    const handleComment = async () => {
        if(isAuthenticated)
        {
            const commentData = {
                user: { auth0id: user.sub },
                post: { postId: postId },
                content: comment,
            };
    
            await CreateComment(commentData);
            setComment('');
            const response = await axios.get(`http://localhost:8080/commentsByPost?postId=${postId}`);
            setComments(response.data);
        }
        else
        {
            alert('You must be logged in to comment');
        }
    }

    return (
        <div className='d-flex flex-column flex-md-row'>
            <LeftBar />
            <div className='col-12 col-md-10 d-flex flex-column align-items-center border border-secondary text-break' style={{ height: '94.87vh' }} id='container'>
                {post ? (
                    <Post
                        postId={post.postId}
                        title={post.title}
                        content={post.content}
                        createdAt={post.createdAt}
                        user={post.user}
                        likes={post.likes}
                    />
                ) : (
                    <p>Loading post...</p>
                )}
                <div className='col-5 rounded-5 border border-secondary ' id='commentContainer'>
                    <input
                        id='commentContent'
                        className='fs-4'
                        placeholder='Add a comment!'
                        value={comment}
                        onChange={saveComment}
                    />
                    <div className='d-flex justify-content-end'>
                        <button
                            id='sendCommentButton'
                            className='btn btn-primary rounded-5 fs-5 me-2'
                            onClick={handleComment}
                        >
                            Comment
                        </button>
                    </div>
                </div>
                {comments.map(comment => {
                    const { commentId, user, content, creationDate } = comment;
                    return (
                        <Comment
                            key={commentId}
                            commentId={commentId}
                            content={content}
                            creationDate={creationDate}
                            user={user}
                        />
                    );
                })}
            </div>
        </div>
    );
}
