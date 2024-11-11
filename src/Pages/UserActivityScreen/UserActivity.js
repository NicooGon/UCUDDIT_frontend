import LeftBar from "../../Components/LeftBar/LeftBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "../../Components/Post/Post";
import Comment from "../../Components/Comment/Comment";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserActivity.css";

export default function UserActivity() {
    const { auth0id } = useParams();
    const [myPosts, setMyPosts] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [myLikes, setMyLikes] = useState([]); 
    const [showPosts, setShowPosts] = useState(true);
    const [showLikes, setShowLikes] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        try {
            const postsResponse = await axios.get(`http://localhost:8080/postsByUser`, { params: { auth0id } });
            setMyPosts(postsResponse.data);
            const commentsResponse = await axios.get(`http://localhost:8080/commentsByUser`, { params: { auth0id } });
            setMyComments(commentsResponse.data);
            const userResponse = await axios.get(`http://localhost:8080/userByAuth0id`, { params: { auth0id } });
            setUser(userResponse.data);
            const likesResponse = await axios.get(`http://localhost:8080/likedByUser`, { params: { auth0id, likes:1 } });
            setMyLikes(likesResponse.data);
            console.log("Liked posts response:", likesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (auth0id) {
            fetchData();
        }
    }, [auth0id]);

    const handleShowPosts = () => {
        setShowPosts(true);
        setShowLikes(false);
        setShowComments(false);
    };

    const handleShowLikes = () => {
        setShowPosts(false);
        setShowLikes(true);
        setShowComments(false);
    };

    const handleShowComments = () => {
        setShowPosts(false);
        setShowLikes(false);
        setShowComments(true);
    };

    return (
        <div className="d-flex flex-column flex-md-row">
            <LeftBar />
            <div className="col-12 col-md-10 d-flex flex-column align-items-center border border-secondary text-break" style={{ height: "94.87vh" }} id="container">
                <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
                    <div
                        className="img-fluid rounded-circle border border-white me-5"
                        style={{
                            backgroundImage: `url(${user?.imageUrl || 'default-profile-image.jpg'})`,
                            height: "100px",
                            width: "100px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            flexShrink: 0
                        }}
                    />
                    <label>{user?.name}</label>
                </div>

                <div className="d-flex col-2 justify-content-center align-items-center mb-4">
                    <button 
                        className={`col-12 fs-3 rounded-pill d-flex align-items-center justify-content-center ms-4 ${showPosts ? 'active' : ''}`} 
                        onClick={handleShowPosts}
                    >
                        Posts
                    </button>
                    <button 
                        className={`col-12 fs-3 rounded-pill d-flex align-items-center justify-content-center ms-4 ${showLikes ? 'active' : ''}`} 
                        onClick={handleShowLikes}
                    >
                        Likes
                    </button>
                    <button 
                        className={`col-12 fs-3 rounded-pill d-flex align-items-center justify-content-center ms-4 ${showComments ? 'active' : ''}`} 
                        onClick={handleShowComments}
                    >
                        Comments
                    </button>
                </div>

                {showPosts && (
                    <div className="col-12 col-md-10 d-flex flex-column align-items-center">
                        {myPosts.length === 0 ? (
                            <p>No posts found.</p>
                        ) : (
                            myPosts.map((post) => (
                                <Post
                                    key={post.postId}
                                    postId={post.postId}
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    user={post.user}
                                    likes={post.likes || 0}
                                />
                            ))
                        )}
                    </div>
                )}

                {showComments && (
                    <div className="col-12 col-md-10 d-flex flex-column align-items-center">
                        {myComments.length === 0 ? (
                            <p>No comments found.</p>
                        ) : (
                            myComments.map((comment) => (
                                <Link
                                    to={`/post/${comment.post.postId}`}
                                    key={comment.commentId}
                                    className="col-12 col-md-10 d-flex flex-column align-items-center mb-3"
                                    style={{
                                        textDecoration: 'none', color: 'white'
                                    }}
                                >
                                    <Comment
                                        commentId={comment.commentId}
                                        content={comment.content}
                                        creationDate={comment.creationDate}
                                        user={comment.user}
                                        post={comment.post}
                                    />
                                </Link>
                            ))
                        )}
                    </div>
                )}

                {showLikes && (
                    <div className="col-12 col-md-10 d-flex flex-column align-items-center">
                        {myLikes.length === 0 ? (
                            <p>No liked posts found.</p>
                        ) : (
                            myLikes.map((post) => (
                                <Post
                                    key={post.postId}
                                    postId={post.postId}
                                    title={post.title}
                                    content={post.content}
                                    createdAt={post.createdAt}
                                    user={post.user}
                                    likes={post.likes || 0}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
