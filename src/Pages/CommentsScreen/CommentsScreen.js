import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from '../../Components/Post/Post';
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
        const fetchPostAndComments = async () => {
            try {
                const postResponse = await axios.get('http://localhost:8080/postById', { params: { postId } });
                setPost(postResponse.data);

                const commentsResponse = await axios.get('http://localhost:8080/commentsByPost', { params: { postId } });
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching post or comments:', error);
            }
        };

        if (postId) {
            fetchPostAndComments();
        }
    }, [postId]);

    const handleComment = async () => {
        if (isAuthenticated) {
            if (comment.trim() === '') {
                alert('Content is required!');
                return;
            }

            const commentData = {
                user: { auth0id: user.sub },
                post: { postId },
                content: comment,
            };

            try {
                await CreateComment(commentData);
                setComment('');
                const response = await axios.get('http://localhost:8080/commentsByPost', { params: { postId } });
                setComments(response.data);
            }
            catch (error) {
                console.error('Error posting comment:', error);
            }
        }
        else {
            alert('You must be logged in to comment');
        }
    };

    const saveComment = (e) => {
        setComment(e.target.value);
    };

    const typeInput = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return (

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
            <div className='col-12 col-md-5 rounded-5 border border-secondary ' id='commentContainer'>
                <textarea
                    id='commentContent'
                    className='fs-4 w-100'
                    placeholder='Add a comment!'
                    maxLength={600}
                    value={comment}
                    onChange={saveComment}
                    onInput={typeInput}
                />
                <div className='d-flex justify-content-end'>
                    <button
                        id='sendCommentButton'
                        className='btn btn-primary rounded-5 fs-5 w-auto me-2 mb-2'
                        onClick={handleComment}
                    >
                        Comment
                    </button>
                </div>
            </div>
            {comments.length > 0 ? (
                comments.map((comment) => {
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
                })
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}
