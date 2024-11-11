import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeftBar from "../../Components/LeftBar/LeftBar";
import Post from '../../Components/Post/Post';
import { getPostsByTitle } from '../../Axios/axiosPost';

export default function PostsBySearch() {
    const { search} = useParams(); 
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getPostsByTitle(search);
                setPosts(postsData);
            } catch 
            (error) {
                console.error("Error fetching posts:", error);
            }
        };
        if (search) {
            fetchPosts();
        }
    }, [search]);

    return (
        <div className="d-flex flex-column flex-md-row">
            <LeftBar />
            <div className="col-12 col-md-10 d-flex flex-column align-items-center border border-secondary text-break" style={{ height: "94.87vh" }} id="container">
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
