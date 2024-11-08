import axios from "axios";

export default async function getPostById(postId) {
    const response = await axios.get(`http://localhost:8080/postById?postId=${postId}`);
    return response.data;
}
