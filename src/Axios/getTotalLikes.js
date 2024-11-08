import axios from "axios";

export default async function getTotalLikes(postId) {
    const response = await axios.get(`http://localhost:8080/likes/${postId}`); 
    return response.data; 
}
