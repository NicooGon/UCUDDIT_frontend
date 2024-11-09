import LeftBar from "../../Components/LeftBar/LeftBar";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from "../../Components/Post/Post";
import Comment from "../../Components/Comment/Comment";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserActivity.css";

export default function UserActivity({user:postUser}) {
    const { user } = useAuth0();
    const { name } = useParams();
    const [myPosts, setMyPosts] = useState([]);
    const [myComments, setMyComments] = useState([]);
    const [showPosts, setShowPosts] = useState(true);
    const [showLikes, setShowLikes] = useState(false);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        const fetchPostByUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/postsByUser`, { params: { name } });
                setMyPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        fetchPostByUser();
    }, [name]);

    useEffect(() => {
        const fetchCommentsByUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/commentsByUser`, { params: { name } });
                setMyComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchCommentsByUser();
    }, [name]);

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
                            backgroundImage: `url(${user?.picture})`,
                            height: "100px",
                            width: "100px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    <label>{user?.name}</label>
                </div>

                <div className="d-flex col-2 justify-content-center align-items-center mb-4">
                    <button className="col-12 fs-3 rounded-pill d-flex align-items-center justify-content-center ms-4" onClick={handleShowPosts}>
                        Posts
                    </button>
                    <button className="col-12 fs-3 rounded-pill d-flex align-items-center justify-content-center ms-4" onClick={handleShowLikes}>
                        Likes
                    </button>
                    <button className="col-12 fs-3 rounded-pill d-flex align-items-center justify-content-center ms-4" onClick={handleShowComments}>
                        Comments
                    </button>
                </div>

                {showPosts && (
                    <div className="col-12 col-md-10 d-flex flex-column align-items-center">
                        {myPosts.length === 0 ? (
                            <p>No posts found.</p>
                        ) : (
                            myPosts.map((post) => {
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
                )}

                {showComments && (
                    <div className="col-12 col-md-10 d-flex flex-column align-items-center">
                        {myComments.length === 0 ? (
                            <p>No comments found.</p>
                        ) : (
                            myComments.map((comment) => {
                                const { commentId, user, content, creationDate, post } = comment;
                                return (
                                    <Link
                                        to={`/post/${post.postId}`}
                                        key={commentId}
                                        className="col-12 col-md-10 d-flex flex-column align-items-center mb-3"
                                        style={{
                                            textDecoration: 'none', color: 'white'
                                        }}
                                    >
                                        <Comment
                                            commentId={commentId}
                                            content={content}
                                            creationDate={creationDate}
                                            user={user}
                                            post={post}
                                        />
                                    </Link>
                                );
                            })
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
