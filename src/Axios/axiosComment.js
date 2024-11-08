import axios from "axios";

export async function CreateComment(commentData) {
    const response = await axios.post('http://localhost:8080/comments', commentData);
    return response.data;
}

export async function getCommentsByPost(postId) {
    const response = await axios.get(`http://localhost:8080/commentsByPost?postId=${postId}`);
    return response.data;
}
